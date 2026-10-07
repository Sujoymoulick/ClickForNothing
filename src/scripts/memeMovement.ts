/**
 * Autonomous Random Floating Meme Physics Engine
 * 
 * Implements organic, continuous wander animations for meme faces and decorative glyphs.
 * - Random target positions within safe zones
 * - Smooth lerp interpolation + delta time
 * - Mouse proximity influence (repulsion/attraction)
 * - Bounce and rotation variations
 * - Respects prefers-reduced-motion, document.hidden & IntersectionObserver viewport visibility
 * - Re-clamps boundaries on window resize
 */

interface MemeEntity {
  el: HTMLElement;
  role: string;
  speed: number;
  baseRot: number;
  currentX: number;
  currentY: number;
  currentRot: number;
  targetX: number;
  targetY: number;
  targetRot: number;
  timer: number;
  nextChangeTime: number;
  maxTravelX: number;
  maxTravelY: number;
  maxRot: number;
  wobbleSpeed: number;
  wobblePhase: number;
}

export function initMemeMovement() {
  const container = document.querySelector('[data-meme-stage]') as HTMLElement;
  if (!container) return;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotionQuery.matches) {
    return; // Honor reduced-motion preference
  }

  const items = Array.from(container.querySelectorAll('.floating-item')) as HTMLElement[];
  if (!items.length) return;

  let mouseX = -9999;
  let mouseY = -9999;
  let isMouseActive = false;
  let mouseIdleTimer = 0;
  let animFrameId = 0;
  let lastTimestamp = 0;
  let isRunning = false;
  let inView = true;

  // Track viewport dimensions to dynamically calculate wander bounds
  let stageWidth = window.innerWidth;

  function updateStageDimensions() {
    stageWidth = window.innerWidth;
  }

  // Create entity state wrappers
  const entities: MemeEntity[] = items.map((el, i) => {
    const role = el.getAttribute('data-role') || 'deco';
    const speed = parseFloat(el.getAttribute('data-speed') || '1.0');
    const baseRot = parseFloat(el.getAttribute('data-rot') || '0');

    // Role-specific wander boundaries
    let maxTravelX = 45; // default px
    let maxTravelY = 55;
    let maxRot = 12; // degrees

    if (role === 'pepe') {
      maxTravelX = 35;
      maxTravelY = 40;
      maxRot = 6;
    } else if (role === 'trollface') {
      maxTravelX = 60;
      maxTravelY = 50;
      maxRot = 15;
    } else if (role === 'doge') {
      maxTravelX = 40;
      maxTravelY = 50;
      maxRot = 10;
    } else if (role === 'small-face') {
      maxTravelX = 50;
      maxTravelY = 60;
      maxRot = 14;
    } else if (role === 'star' || role === 'dot') {
      maxTravelX = 65;
      maxTravelY = 65;
      maxRot = 25;
    }

    // Adapt bounds for smaller screens
    if (stageWidth < 768) {
      maxTravelX *= 0.45;
      maxTravelY *= 0.45;
    }

    return {
      el,
      role,
      speed,
      baseRot,
      currentX: 0,
      currentY: 0,
      currentRot: baseRot,
      targetX: (Math.random() - 0.5) * maxTravelX * 2,
      targetY: (Math.random() - 0.5) * maxTravelY * 2,
      targetRot: baseRot + (Math.random() - 0.5) * maxRot * 2,
      timer: 0,
      nextChangeTime: 2.5 + Math.random() * 3.5, // 2.5s - 6s
      maxTravelX,
      maxTravelY,
      maxRot,
      wobbleSpeed: 0.8 + Math.random() * 0.8,
      wobblePhase: i * 0.7,
    };
  });

  // Pick a fresh random wander target for element
  function pickNewTarget(e: MemeEntity) {
    e.targetX = (Math.random() - 0.5) * 2 * e.maxTravelX;
    e.targetY = (Math.random() - 0.5) * 2 * e.maxTravelY;
    e.targetRot = e.baseRot + (Math.random() - 0.5) * 2 * e.maxRot;
    e.timer = 0;
    e.nextChangeTime = (2.2 + Math.random() * 3.2) / e.speed;
  }

  // Pointer tracking for subtle proximity repulsion
  function onPointerMove(evt: MouseEvent | PointerEvent) {
    if (!inView || !isRunning) return;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    isMouseActive = true;
    if (mouseIdleTimer) window.clearTimeout(mouseIdleTimer);
    mouseIdleTimer = window.setTimeout(() => {
      isMouseActive = false;
    }, 1800);
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  function onResize() {
    updateStageDimensions();
    for (const e of entities) {
      if (stageWidth < 768) {
        e.maxTravelX = Math.min(e.maxTravelX, 20);
        e.maxTravelY = Math.min(e.maxTravelY, 25);
      }
      pickNewTarget(e);
    }
  }

  window.addEventListener('resize', onResize, { passive: true });

  // Main animation physics tick
  function tick(timestamp: number) {
    if (!isRunning || !inView || document.visibilityState === 'hidden') return;

    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1); // Clamp to avoid huge jumps on tab switch
    lastTimestamp = timestamp;

    const timeSec = timestamp * 0.001;

    for (let i = 0; i < entities.length; i++) {
      const e = entities[i];
      e.timer += dt;

      if (e.timer >= e.nextChangeTime) {
        pickNewTarget(e);
      }

      // Smooth damped lerp interpolation toward random target
      const lerpFactor = Math.min(1, dt * 1.5 * e.speed);
      e.currentX += (e.targetX - e.currentX) * lerpFactor;
      e.currentY += (e.targetY - e.currentY) * lerpFactor;
      e.currentRot += (e.targetRot - e.currentRot) * lerpFactor;

      // Add gentle autonomous harmonic wave drift (bouncing/floating)
      const driftX = Math.sin(timeSec * e.wobbleSpeed + e.wobblePhase) * 6;
      const driftY = Math.cos(timeSec * (e.wobbleSpeed * 0.85) + e.wobblePhase) * 8;

      let finalX = e.currentX + driftX;
      let finalY = e.currentY + driftY;
      let finalRot = e.currentRot;

      // Mouse Proximity Reaction: gentle interactive nudge if pointer is nearby
      if (isMouseActive) {
        const rect = e.el.getBoundingClientRect();
        const centerX = rect.left + rect.width * 0.5;
        const centerY = rect.top + rect.height * 0.5;
        const dx = centerX - mouseX;
        const dy = centerY - mouseY;
        const distSq = dx * dx + dy * dy;
        const radius = 180;

        if (distSq < radius * radius && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius) * 28; // Subtle nudge up to 28px
          finalX += (dx / dist) * force;
          finalY += (dy / dist) * force;
          finalRot += (dx > 0 ? 1 : -1) * force * 0.2;
        }
      }

      // Apply 3D transform for maximum hardware acceleration
      e.el.style.transform = `translate3d(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px, 0) rotate(${finalRot.toFixed(2)}deg)`;
    }

    animFrameId = window.requestAnimationFrame(tick);
  }

  function start() {
    if (isRunning || !inView || reducedMotionQuery.matches || document.visibilityState === 'hidden') return;
    isRunning = true;
    lastTimestamp = 0;
    animFrameId = window.requestAnimationFrame(tick);
  }

  function stop() {
    isRunning = false;
    if (animFrameId) {
      window.cancelAnimationFrame(animFrameId);
      animFrameId = 0;
    }
  }

  // IntersectionObserver to pause loop when scrolled out of view
  let observer: IntersectionObserver | null = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        if (inView) {
          start();
        } else {
          stop();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(container);
  } else {
    start();
  }

  // Lifecycle listeners
  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      stop();
    } else {
      start();
    }
  }

  document.addEventListener('visibilitychange', onVisibilityChange);

  // Reduced motion dynamic listener
  const onMotionChange = (evt: MediaQueryListEvent) => {
    if (evt.matches) {
      stop();
      for (const e of entities) {
        e.el.style.transform = `rotate(${e.baseRot}deg)`;
      }
    } else {
      start();
    }
  };
  reducedMotionQuery.addEventListener('change', onMotionChange);

  // Return cleanup handle
  return () => {
    stop();
    observer?.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    reducedMotionQuery.removeEventListener('change', onMotionChange);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', onResize);
  };
}
