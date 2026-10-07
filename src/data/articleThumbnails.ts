// High-fidelity, lightweight 16:9 vector illustrations matching ClickForNothing aesthetic
export function getArticleThumbnailSvg(slug: string): string {
  // 1. Featured Article: Retro CRT computer monitor with pink smiley, lava lamp, coffee mug
  if (slug === 'top-useless-websites-of-all-time') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#181028"/>
          <stop offset="50%" stop-color="#2c1654"/>
          <stop offset="100%" stop-color="#110726"/>
        </linearGradient>
        <radialGradient id="screen-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#4c1d95" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#1e1035" stop-opacity="0.95"/>
        </radialGradient>
        <linearGradient id="lava-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff007f"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#crt-bg)"/>
      <!-- Desk line -->
      <line x1="0" y1="188" x2="400" y2="188" stroke="#3b1d6b" stroke-width="4"/>
      <rect x="0" y="190" width="400" height="35" fill="#130924"/>

      <!-- Lava Lamp (Right) -->
      <g transform="translate(320, 75)">
        <path d="M12 25 C12 10 28 10 28 25 L34 85 C36 95 4 95 6 85 Z" fill="#2d124d" stroke="#f43f5e" stroke-width="1.5"/>
        <path d="M15 35 C15 25 25 25 25 35 L30 80 C31 88 9 88 10 80 Z" fill="url(#lava-grad)" opacity="0.85"/>
        <ellipse cx="20" cy="50" rx="5" ry="7" fill="#fbbf24"/>
        <ellipse cx="19" cy="68" rx="7" ry="9" fill="#f43f5e"/>
        <!-- Cap and base -->
        <path d="M14 25 L26 25 L24 16 L16 16 Z" fill="#9ca3af"/>
        <path d="M5 86 L35 86 L37 105 L3 105 Z" fill="#4b5563"/>
      </g>

      <!-- Coffee Mug (Middle Right) -->
      <g transform="translate(262, 138)">
        <rect x="5" y="10" width="36" height="36" rx="4" fill="#fdfaf3" stroke="#e5e7eb" stroke-width="1.5"/>
        <path d="M41 18 C50 18 50 38 41 38" fill="none" stroke="#fdfaf3" stroke-width="4" stroke-linecap="round"/>
        <rect x="9" y="24" width="28" height="12" rx="2" fill="#18181b"/>
        <text x="11" y="32" font-family="'Lilita One', sans-serif" font-size="5" fill="#f20caf" font-weight="bold">INTERNET</text>
        <text x="11" y="35" font-family="'Lilita One', sans-serif" font-size="4" fill="#fbbf24">FOREVER</text>
      </g>

      <!-- Retro CRT Computer Monitor (Center Left) -->
      <g transform="translate(115, 30)">
        <!-- CRT Outer Casing -->
        <rect x="0" y="0" width="145" height="125" rx="18" fill="#e2d9cc" stroke="#09080c" stroke-width="4"/>
        <rect x="6" y="6" width="133" height="113" rx="14" fill="#f3ede2"/>
        <rect x="15" y="15" width="115" height="92" rx="12" fill="#2d2238" stroke="#09080c" stroke-width="3"/>
        <rect x="18" y="18" width="109" height="86" rx="10" fill="url(#screen-glow)"/>
        
        <!-- Pink Pixel Smiley Face on Screen -->
        <rect x="42" y="44" width="10" height="16" rx="4" fill="#f20caf"/>
        <rect x="75" y="44" width="10" height="16" rx="4" fill="#f20caf"/>
        <path d="M40 70 Q 64 88 88 70" fill="none" stroke="#f20caf" stroke-width="6" stroke-linecap="round"/>

        <!-- CRT Controls & Vents -->
        <circle cx="116" cy="112" r="3" fill="#09080c"/>
        <circle cx="125" cy="112" r="2.5" fill="#f43f5e"/>
        <!-- Stand -->
        <path d="M50 125 L35 152 L110 152 L95 125 Z" fill="#d6cbbe" stroke="#09080c" stroke-width="3"/>
        <!-- Keyboard -->
        <path d="M15 155 L130 155 L125 170 L20 170 Z" fill="#e2d9cc" stroke="#09080c" stroke-width="2.5"/>
        <line x1="28" y1="162" x2="118" y2="162" stroke="#9ca3af" stroke-width="2"/>
      </g>

      <!-- Books on Left -->
      <g transform="translate(30, 120)">
        <rect x="0" y="42" width="65" height="16" rx="2" fill="#3b82f6" stroke="#09080c" stroke-width="2"/>
        <rect x="5" y="24" width="55" height="16" rx="2" fill="#ec4899" stroke="#09080c" stroke-width="2"/>
        <rect x="12" y="8" width="45" height="14" rx="2" fill="#eab308" stroke="#09080c" stroke-width="2"/>
      </g>
    </svg>`;
  }

  // 2. Doge over rainbow in space
  if (slug === 'internet-time-wasters-guide') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="space-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0b0f19"/>
          <stop offset="100%" stop-color="#1e1b4b"/>
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#space-bg)"/>
      <!-- Stars -->
      <circle cx="45" cy="40" r="1.5" fill="#ffffff" opacity="0.8"/>
      <circle cx="95" cy="85" r="1.2" fill="#fde047" opacity="0.9"/>
      <circle cx="160" cy="30" r="2" fill="#ffffff"/>
      <circle cx="320" cy="50" r="1.8" fill="#ffffff"/>
      <circle cx="350" cy="140" r="1.5" fill="#fde047"/>
      <circle cx="70" cy="170" r="1.5" fill="#ffffff"/>
      <polygon points="340,30 342,35 347,37 342,39 340,44 338,39 333,37 338,35" fill="#ffffff" opacity="0.9"/>

      <!-- Curving Rainbow Trail -->
      <path d="M-20 180 C 80 180, 130 110, 240 100" fill="none" stroke="#ef4444" stroke-width="10"/>
      <path d="M-20 188 C 80 188, 130 118, 240 108" fill="none" stroke="#f97316" stroke-width="10"/>
      <path d="M-20 196 C 80 196, 130 126, 240 116" fill="none" stroke="#eab308" stroke-width="10"/>
      <path d="M-20 204 C 80 204, 130 134, 240 124" fill="none" stroke="#22c55e" stroke-width="10"/>
      <path d="M-20 212 C 80 212, 130 142, 240 132" fill="none" stroke="#3b82f6" stroke-width="10"/>
      <path d="M-20 220 C 80 220, 130 150, 240 140" fill="none" stroke="#a855f7" stroke-width="10"/>

      <!-- Doge Character Flying -->
      <g transform="translate(190, 50)">
        <!-- Doge body -->
        <ellipse cx="70" cy="60" rx="35" ry="24" fill="#fbbf24" stroke="#09080c" stroke-width="3"/>
        <!-- Back paws -->
        <ellipse cx="38" cy="74" rx="10" ry="6" fill="#f59e0b" stroke="#09080c" stroke-width="2.5"/>
        <ellipse cx="52" cy="78" rx="9" ry="5" fill="#f59e0b" stroke="#09080c" stroke-width="2.5"/>
        <!-- Front paws outstretched -->
        <ellipse cx="98" cy="66" rx="14" ry="7" fill="#fbbf24" stroke="#09080c" stroke-width="2.5" transform="rotate(15 98 66)"/>
        <!-- Head -->
        <ellipse cx="90" cy="42" rx="26" ry="24" fill="#fbbf24" stroke="#09080c" stroke-width="3"/>
        <!-- Ears -->
        <polygon points="76,22 68,6 88,14" fill="#d97706" stroke="#09080c" stroke-width="2.5"/>
        <polygon points="98,20 114,8 108,24" fill="#d97706" stroke="#09080c" stroke-width="2.5"/>
        <!-- White muzzle -->
        <ellipse cx="96" cy="48" rx="15" ry="12" fill="#fef08a"/>
        <!-- Cute nose & mouth -->
        <ellipse cx="102" cy="44" rx="4" ry="3" fill="#09080c"/>
        <path d="M102 47 Q 106 52 110 49" fill="none" stroke="#09080c" stroke-width="2" stroke-linecap="round"/>
        <!-- Eyes -->
        <circle cx="84" cy="38" r="4" fill="#09080c"/>
        <circle cx="83" cy="36" r="1.5" fill="#ffffff"/>
        <circle cx="98" cy="36" r="3.5" fill="#09080c"/>
        <circle cx="97" cy="35" r="1.2" fill="#ffffff"/>
      </g>
    </svg>`;
  }

  // 3. Cute pets laughing on warm yellow
  if (slug === 'funniest-useless-websites-for-boredom') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="225" fill="#fef3c7"/>
      <!-- Little sparkles -->
      <polygon points="60,40 62,45 67,47 62,49 60,54 58,49 53,47 58,45" fill="#fbbf24"/>
      <polygon points="340,50 342,55 347,57 342,59 340,64 338,59 333,57 338,55" fill="#f59e0b"/>
      <polygon points="200,30 202,34 206,36 202,38 200,42 198,38 194,36 198,34" fill="#f43f5e"/>

      <!-- Group of 3 cute animals -->
      <!-- Left: White Puppy -->
      <g transform="translate(100, 80)">
        <ellipse cx="40" cy="65" rx="32" ry="35" fill="#ffffff" stroke="#09080c" stroke-width="3"/>
        <path d="M14 42 C6 30 10 70 20 68" fill="#e2e8f0" stroke="#09080c" stroke-width="3"/>
        <circle cx="28" cy="60" r="4" fill="#09080c"/>
        <circle cx="52" cy="60" r="4" fill="#09080c"/>
        <ellipse cx="40" cy="68" rx="4.5" ry="3.5" fill="#09080c"/>
        <!-- Tongue -->
        <path d="M37 72 Q 40 82 43 72" fill="#f43f5e" stroke="#09080c" stroke-width="2"/>
      </g>

      <!-- Center: Gray Kitty -->
      <g transform="translate(170, 60)">
        <ellipse cx="35" cy="55" rx="28" ry="30" fill="#94a3b8" stroke="#09080c" stroke-width="3"/>
        <!-- Cat ears -->
        <polygon points="12,34 18,10 32,28" fill="#cbd5e1" stroke="#09080c" stroke-width="3"/>
        <polygon points="38,28 52,10 58,34" fill="#cbd5e1" stroke="#09080c" stroke-width="3"/>
        <circle cx="24" cy="50" r="3.5" fill="#09080c"/>
        <circle cx="46" cy="50" r="3.5" fill="#09080c"/>
        <polygon points="33,56 37,56 35,59" fill="#f43f5e"/>
        <!-- Whiskers -->
        <line x1="8" y1="54" x2="2" y2="52" stroke="#09080c" stroke-width="2"/>
        <line x1="8" y1="58" x2="2" y2="60" stroke="#09080c" stroke-width="2"/>
        <line x1="62" y1="54" x2="68" y2="52" stroke="#09080c" stroke-width="2"/>
        <line x1="62" y1="58" x2="68" y2="60" stroke="#09080c" stroke-width="2"/>
      </g>

      <!-- Right: Shiba Inu -->
      <g transform="translate(235, 80)">
        <ellipse cx="40" cy="65" rx="30" ry="32" fill="#fbbf24" stroke="#09080c" stroke-width="3"/>
        <polygon points="20,40 28,18 38,36" fill="#d97706" stroke="#09080c" stroke-width="3"/>
        <polygon points="46,36 56,18 64,40" fill="#d97706" stroke="#09080c" stroke-width="3"/>
        <ellipse cx="40" cy="70" rx="14" ry="11" fill="#fef08a"/>
        <circle cx="30" cy="60" r="3.5" fill="#09080c"/>
        <circle cx="50" cy="60" r="3.5" fill="#09080c"/>
        <ellipse cx="40" cy="66" rx="4" ry="3" fill="#09080c"/>
        <path d="M37 70 Q 40 76 43 70" fill="none" stroke="#09080c" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>`;
  }

  // 4. Wireframe Earth with retro pixel cursor
  if (slug === 'weirdest-corners-of-the-internet') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="225" fill="#09090b"/>
      <!-- Grid lines background -->
      <line x1="50" y1="0" x2="50" y2="225" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="150" y1="0" x2="150" y2="225" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="250" y1="0" x2="250" y2="225" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="350" y1="0" x2="350" y2="225" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- Glowing Wireframe Globe -->
      <g transform="translate(140, 30)">
        <circle cx="80" cy="80" r="70" fill="#0f172a" stroke="#06b6d4" stroke-width="3"/>
        <!-- Latitudes and longitudes -->
        <ellipse cx="80" cy="80" rx="70" ry="24" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3"/>
        <ellipse cx="80" cy="80" rx="70" ry="50" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3"/>
        <ellipse cx="80" cy="80" rx="35" ry="70" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
        <line x1="10" y1="80" x2="150" y2="80" stroke="#38bdf8" stroke-width="1.5"/>
        <line x1="80" y1="10" x2="80" y2="150" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Continents blobs in neon cyan/purple -->
        <path d="M45 55 Q 60 40 85 50 Q 80 75 55 70 Z" fill="#22c55e" opacity="0.6"/>
        <path d="M90 90 Q 115 80 125 105 Q 105 120 90 105 Z" fill="#22c55e" opacity="0.6"/>
      </g>
      <!-- Big Pixel Cursor Arrow -->
      <g transform="translate(230, 110)">
        <polygon points="0,0 0,38 10,28 18,46 25,43 17,25 30,25" fill="#ffffff" stroke="#09080c" stroke-width="3"/>
      </g>
    </svg>`;
  }

  // 5. Pink retro cassette tape
  if (slug === 'rise-of-internet-sound-buttons') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cassette-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e1035"/>
          <stop offset="100%" stop-color="#3b1d6b"/>
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#cassette-bg)"/>
      <!-- Pink Cassette Shell -->
      <g transform="translate(100, 35)">
        <rect x="0" y="0" width="200" height="135" rx="14" fill="#f43f5e" stroke="#09080c" stroke-width="4"/>
        <rect x="6" y="6" width="188" height="123" rx="10" fill="#fb7185"/>
        <!-- Cassette Label -->
        <rect x="25" y="16" width="150" height="80" rx="8" fill="#fdf2f8" stroke="#09080c" stroke-width="2.5"/>
        <text x="35" y="38" font-family="'Lilita One', sans-serif" font-size="11" fill="#be185d" font-weight="bold">INTERNET</text>
        <text x="35" y="52" font-family="'Lilita One', sans-serif" font-size="11" fill="#be185d" font-weight="bold">SOUND BUTTONS</text>
        <!-- Spool Window -->
        <rect x="42" y="60" width="116" height="30" rx="6" fill="#18181b" stroke="#09080c" stroke-width="2"/>
        <circle cx="68" cy="75" r="10" fill="#ffffff" stroke="#09080c" stroke-width="2"/>
        <circle cx="68" cy="75" r="5" fill="#18181b"/>
        <circle cx="132" cy="75" r="10" fill="#ffffff" stroke="#09080c" stroke-width="2"/>
        <circle cx="132" cy="75" r="5" fill="#18181b"/>
        <!-- Bottom Trapezoid Cutout -->
        <path d="M40 135 L60 102 L140 102 L160 135 Z" fill="#fda4af" stroke="#09080c" stroke-width="3"/>
        <circle cx="75" cy="118" r="4" fill="#09080c"/>
        <circle cx="125" cy="118" r="4" fill="#09080c"/>
      </g>
    </svg>`;
  }

  // 6. Isometric house on floating island
  if (slug === 'why-useless-websites-matter') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#bae6fd"/>
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#sky-grad)"/>
      <!-- Isometric Floating Block -->
      <g transform="translate(200, 110)">
        <!-- Top grass surface -->
        <polygon points="0,-45 90,0 0,45 -90,0" fill="#4ade80" stroke="#16a34a" stroke-width="3"/>
        <!-- Earth sides -->
        <polygon points="-90,0 0,45 0,90 -90,45" fill="#b45309" stroke="#78350f" stroke-width="2.5"/>
        <polygon points="0,45 90,0 90,45 0,90" fill="#92400e" stroke="#78350f" stroke-width="2.5"/>
        <!-- Cute Little House -->
        <g transform="translate(-25, -55)">
          <polygon points="0,0 30,-12 30,22 0,34" fill="#fed7aa" stroke="#09080c" stroke-width="2"/>
          <polygon points="30,-12 60,0 60,34 30,22" fill="#fdba74" stroke="#09080c" stroke-width="2"/>
          <polygon points="0,0 30,-22 60,0 30,-12" fill="#ef4444" stroke="#09080c" stroke-width="2"/>
          <!-- Door & window -->
          <rect x="8" y="14" width="10" height="16" fill="#78350f"/>
          <rect x="40" y="8" width="10" height="10" fill="#67e8f9" stroke="#09080c" stroke-width="1.5"/>
        </g>
        <!-- Isometric Trees -->
        <g transform="translate(35, -25)">
          <cylinder x="0" y="0" />
          <polygon points="0,0 8,-4 8,8 0,12" fill="#78350f"/>
          <circle cx="4" cy="-14" r="16" fill="#15803d" stroke="#09080c" stroke-width="2"/>
        </g>
        <g transform="translate(-50, -15)">
          <circle cx="4" cy="-10" r="14" fill="#22c55e" stroke="#09080c" stroke-width="2"/>
        </g>
      </g>
    </svg>`;
  }

  // 7. "Do Nothing Today" Retro Window Dialog
  if (slug === 'the-art-of-doing-nothing-online') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloud-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#60a5fa"/>
          <stop offset="100%" stop-color="#93c5fd"/>
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#cloud-sky)"/>
      <!-- Soft Clouds in Background -->
      <circle cx="70" cy="180" r="45" fill="#ffffff" opacity="0.6"/>
      <circle cx="120" cy="170" r="55" fill="#ffffff" opacity="0.6"/>
      <circle cx="320" cy="60" r="35" fill="#ffffff" opacity="0.5"/>
      <circle cx="350" cy="70" r="45" fill="#ffffff" opacity="0.5"/>
      <!-- Retro Windows Dialog Box -->
      <g transform="translate(120, 45)">
        <rect x="0" y="0" width="165" height="135" rx="8" fill="#f8fafc" stroke="#09080c" stroke-width="4" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.2))"/>
        <!-- Title bar -->
        <path d="M0 8 C 0 3, 3 0, 8 0 L 157 0 C 162 0, 165 3, 165 8 L 165 26 L 0 26 Z" fill="#6366f1"/>
        <text x="10" y="18" font-family="'Lilita One', sans-serif" font-size="10" fill="#ffffff">ClickForNothing OS</text>
        <rect x="145" y="6" width="14" height="14" rx="2" fill="#ef4444" stroke="#09080c" stroke-width="1.5"/>
        <text x="149" y="17" font-family="sans-serif" font-size="9" fill="#ffffff" font-weight="bold">×</text>
        <!-- Content -->
        <text x="25" y="65" font-family="'Lilita One', sans-serif" font-size="17" fill="#09080c" font-weight="bold">Do Nothing</text>
        <text x="45" y="90" font-family="'Lilita One', sans-serif" font-size="17" fill="#f20caf" font-weight="bold">Today</text>
        <!-- Button -->
        <rect x="35" y="102" width="95" height="20" rx="6" fill="#e2e8f0" stroke="#09080c" stroke-width="1.5"/>
        <text x="65" y="115" font-family="sans-serif" font-size="9" fill="#09080c" font-weight="bold">OK (Relax)</text>
      </g>
      <!-- Pixel Cursor -->
      <g transform="translate(260, 145)">
        <polygon points="0,0 0,32 8,24 14,38 20,35 14,21 24,21" fill="#ffffff" stroke="#09080c" stroke-width="2.5"/>
      </g>
    </svg>`;
  }

  // 8. Smiling Purple Ringed Planet
  if (slug === 'interactive-art-on-the-web') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="planet-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f0926"/>
          <stop offset="100%" stop-color="#1e1035"/>
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#planet-bg)"/>
      <!-- Stars and sparkles -->
      <circle cx="60" cy="50" r="1.5" fill="#ffffff"/>
      <circle cx="100" cy="180" r="2" fill="#f472b6"/>
      <circle cx="320" cy="40" r="2" fill="#fde047"/>
      <circle cx="340" cy="170" r="1.5" fill="#ffffff"/>
      <!-- Smiling Planet -->
      <g transform="translate(180, 110)">
        <!-- Back ring -->
        <path d="M-90 -15 C -90 -45, 90 -45, 90 -15" fill="none" stroke="#f472b6" stroke-width="8" stroke-linecap="round"/>
        <!-- Planet body -->
        <circle cx="0" cy="0" r="50" fill="#a855f7" stroke="#09080c" stroke-width="3.5"/>
        <circle cx="-15" cy="-8" r="4.5" fill="#09080c"/>
        <circle cx="15" cy="-8" r="4.5" fill="#09080c"/>
        <path d="M-12 10 Q 0 22 12 10" fill="none" stroke="#09080c" stroke-width="3" stroke-linecap="round"/>
        <!-- Cheek blush -->
        <circle cx="-25" cy="5" r="6" fill="#f472b6" opacity="0.6"/>
        <circle cx="25" cy="5" r="6" fill="#f472b6" opacity="0.6"/>
        <!-- Front ring -->
        <path d="M-90 -15 C -90 25, 90 25, 90 -15" fill="none" stroke="#f472b6" stroke-width="8" stroke-linecap="round"/>
        <path d="M-85 -15 C -85 20, 85 20, 85 -15" fill="none" stroke="#fdf2f8" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>`;
  }

  // 9. Comfy Egg Character on Couch Watching TV
  if (slug === 'how-useless-websites-reduce-stress') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="room-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4c1d95"/>
          <stop offset="100%" stop-color="#2e1065"/>
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#room-bg)"/>
      <rect x="0" y="180" width="400" height="45" fill="#1e1035"/>
      <!-- Picture frame on wall -->
      <rect x="50" y="30" width="30" height="40" rx="3" fill="#fbbf24" stroke="#09080c" stroke-width="2"/>
      <rect x="270" y="30" width="45" height="35" rx="4" fill="#09080c" stroke="#f43f5e" stroke-width="2"/>
      <rect x="286" y="44" width="4" height="6" fill="#f43f5e"/>
      <rect x="296" y="44" width="4" height="6" fill="#f43f5e"/>
      <path d="M288 56 Q 293 60 298 56" fill="none" stroke="#f43f5e" stroke-width="2"/>

      <!-- Comfy Red Couch -->
      <g transform="translate(130, 95)">
        <rect x="0" y="25" width="140" height="65" rx="16" fill="#e11d48" stroke="#09080c" stroke-width="3"/>
        <rect x="-10" y="35" width="22" height="45" rx="10" fill="#be123c" stroke="#09080c" stroke-width="2.5"/>
        <rect x="128" y="35" width="22" height="45" rx="10" fill="#be123c" stroke="#09080c" stroke-width="2.5"/>
        <!-- Egg Character Lounging -->
        <ellipse cx="65" cy="40" rx="32" ry="26" fill="#fef08a" stroke="#09080c" stroke-width="3"/>
        <!-- Sleeping / Chill Eyes -->
        <path d="M52 38 Q 57 44 62 38" fill="none" stroke="#09080c" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M68 38 Q 73 44 78 38" fill="none" stroke="#09080c" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="48" cy="44" r="4" fill="#f472b6" opacity="0.6"/>
        <circle cx="82" cy="44" r="4" fill="#f472b6" opacity="0.6"/>
        <!-- Popcorn Bowl -->
        <rect x="95" y="45" width="20" height="22" rx="4" fill="#ffffff" stroke="#09080c" stroke-width="2"/>
        <circle cx="100" cy="42" r="4" fill="#fde047"/>
        <circle cx="106" cy="40" r="5" fill="#fde047"/>
        <circle cx="112" cy="43" r="4" fill="#fde047"/>
      </g>
    </svg>`;
  }

  // 10. Useless Websites Signpost on sunny meadow
  if (slug === 'best-useless-websites-of-all-time') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="meadow-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#bae6fd"/>
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#meadow-sky)"/>
      <!-- Soft Hills -->
      <circle cx="70" cy="280" r="140" fill="#4ade80"/>
      <circle cx="280" cy="270" r="160" fill="#22c55e"/>
      <!-- Wooden Signpost -->
      <g transform="translate(130, 45)">
        <!-- Post -->
        <rect x="65" y="30" width="14" height="120" rx="3" fill="#92400e" stroke="#09080c" stroke-width="2.5"/>
        <!-- Sign 1: USELESS WEBSITES -->
        <polygon points="10,25 125,25 135,45 125,65 10,65 0,45" fill="#fef08a" stroke="#09080c" stroke-width="3"/>
        <text x="16" y="44" font-family="'Lilita One', sans-serif" font-size="11" fill="#09080c" font-weight="bold">USELESS</text>
        <text x="16" y="58" font-family="'Lilita One', sans-serif" font-size="11" fill="#09080c" font-weight="bold">WEBSITES</text>
        <!-- Sign 2: THIS WAY -->
        <polygon points="15,75 120,75 130,92 120,110 15,110 5,92" fill="#fbbf24" stroke="#09080c" stroke-width="3"/>
        <text x="22" y="96" font-family="'Lilita One', sans-serif" font-size="12" fill="#09080c" font-weight="bold">THIS WAY →</text>
      </g>
    </svg>`;
  }

  // 11. Pixel Dino on sunny beach
  if (slug === 'psychology-behind-useless-websites') {
    return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="225" fill="#fef9c3"/>
      <!-- Ocean and beach -->
      <rect x="0" y="160" width="400" height="25" fill="#38bdf8"/>
      <rect x="0" y="185" width="400" height="40" fill="#fde047"/>
      <!-- Palm Tree (Left) -->
      <g transform="translate(60, 60)">
        <path d="M20 125 Q 35 60 25 20" fill="none" stroke="#92400e" stroke-width="6"/>
        <ellipse cx="20" cy="20" rx="25" ry="10" fill="#16a34a" transform="rotate(-30 20 20)"/>
        <ellipse cx="30" cy="18" rx="25" ry="10" fill="#22c55e" transform="rotate(20 30 18)"/>
        <ellipse cx="10" cy="26" rx="22" ry="9" fill="#15803d" transform="rotate(-70 10 26)"/>
      </g>
      <!-- Green Pixel Dino Jumping (Right) -->
      <g transform="translate(200, 75)">
        <!-- Dino body -->
        <rect x="30" y="30" width="40" height="45" rx="8" fill="#4ade80" stroke="#09080c" stroke-width="3"/>
        <!-- Head -->
        <rect x="50" y="10" width="35" height="28" rx="6" fill="#4ade80" stroke="#09080c" stroke-width="3"/>
        <circle cx="72" cy="20" r="3" fill="#09080c"/>
        <!-- Arms -->
        <rect x="65" y="42" width="12" height="6" rx="2" fill="#22c55e" stroke="#09080c" stroke-width="2"/>
        <!-- Legs -->
        <rect x="36" y="75" width="8" height="20" rx="3" fill="#22c55e" stroke="#09080c" stroke-width="2"/>
        <rect x="56" y="75" width="8" height="20" rx="3" fill="#22c55e" stroke="#09080c" stroke-width="2"/>
        <!-- Spikes -->
        <polygon points="30,35 20,40 30,45" fill="#16a34a"/>
        <polygon points="30,50 20,55 30,60" fill="#16a34a"/>
        <!-- Tiny love heart -->
        <path d="M85 0 C 85 -8, 75 -8, 75 0 C 75 10, 85 16, 85 16 C 85 16, 95 10, 95 0 C 95 -8, 85 -8, 85 0 Z" fill="#f43f5e"/>
      </g>
    </svg>`;
  }

  // 12-24. Deterministic theme illustrations for remaining articles
  const paletteIndex = Math.abs(slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 6;
  const themes = [
    { bg: '#fdf2f8', accent: '#ec4899', sub: '#be185d', tag: 'CREATIVE' },
    { bg: '#eff6ff', accent: '#3b82f6', sub: '#1d4ed8', tag: 'EXPERIMENT' },
    { bg: '#fef3c7', accent: '#f59e0b', sub: '#b45309', tag: 'INTERNET' },
    { bg: '#f3e8ff', accent: '#a855f7', sub: '#7e22ce', tag: 'HISTORY' },
    { bg: '#ecfdf5', accent: '#10b981', sub: '#047857', tag: 'DESIGN' },
    { bg: '#fff1f2', accent: '#f43f5e', sub: '#be123c', tag: 'CULTURE' },
  ];
  const t = themes[paletteIndex];

  return `<svg viewBox="0 0 400 225" class="art-thumb-svg" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="225" fill="${t.bg}"/>
    <!-- Decorative geometric background patterns -->
    <circle cx="340" cy="40" r="70" fill="${t.accent}" opacity="0.12"/>
    <circle cx="60" cy="190" r="90" fill="${t.sub}" opacity="0.1"/>
    <!-- Central Modern Tech Badge / Card -->
    <g transform="translate(130, 48)">
      <rect x="0" y="0" width="140" height="120" rx="18" fill="#ffffff" stroke="#09080c" stroke-width="3" filter="drop-shadow(0 6px 14px rgba(0,0,0,0.06))"/>
      <rect x="16" y="20" width="108" height="44" rx="8" fill="${t.bg}" stroke="${t.accent}" stroke-width="2"/>
      <!-- Window dots -->
      <circle cx="28" cy="30" r="3" fill="${t.accent}"/>
      <circle cx="38" cy="30" r="3" fill="#fde047"/>
      <circle cx="48" cy="30" r="3" fill="#86efac"/>
      <!-- Fun Icon Inside -->
      <rect x="28" y="44" width="60" height="6" rx="3" fill="${t.sub}" opacity="0.7"/>
      <rect x="28" y="53" width="40" height="4" rx="2" fill="#94a3b8"/>
      <!-- Tag Pill -->
      <rect x="26" y="80" width="88" height="22" rx="11" fill="${t.accent}"/>
      <text x="70" y="95" font-family="'Lilita One', sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">${t.tag}</text>
    </g>
  </svg>`;
}
