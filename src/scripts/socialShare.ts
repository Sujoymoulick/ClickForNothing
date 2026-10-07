/**
 * Social Sharing and Clipboard Utilities for ClickForNothing
 */

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall back to execCommand
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    textArea.remove();
    return successful;
  } catch {
    return false;
  }
}

let toastTimer: number | null = null;

export function showToast(message = 'Link copied to clipboard! 🚀', duration = 2500): void {
  let toast = document.querySelector('.cfn-toast') as HTMLElement | null;
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'cfn-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimer !== null) {
    clearTimeout(toastTimer);
  }

  toastTimer = window.setTimeout(() => {
    toast?.classList.remove('show');
    toastTimer = null;
  }, duration);
}

export function openShareWindow(shareUrl: string, platform: string): void {
  const width = 600;
  const height = 480;
  const left = Math.max(0, (window.innerWidth - width) / 2 + (window.screenX || window.screenLeft || 0));
  const top = Math.max(0, (window.innerHeight - height) / 2 + (window.screenY || window.screenTop || 0));
  const features = `width=${width},height=${height},left=${left},top=${top},location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes`;

  const win = window.open(shareUrl, `cfn_share_${platform}`, features);
  if (win) {
    win.focus();
  } else {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }
}

export function buildShareUrl(platform: string, options: { url: string; title?: string; text?: string }): string {
  const url = encodeURIComponent(options.url || window.location.href);
  const text = options.text || options.title || 'Check out ClickForNothing!';
  const encodedText = encodeURIComponent(text);
  const title = encodeURIComponent(options.title || options.text || '');

  switch (platform.toLowerCase()) {
    case 'twitter':
    case 'x':
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    case 'whatsapp':
      return `https://api.whatsapp.com/send?text=${encodedText}%20${url}`;
    case 'reddit':
      return `https://reddit.com/submit?url=${url}&title=${title}`;
    default:
      return options.url;
  }
}

export function triggerShare(platform: string, options: { url: string; title?: string; text?: string }, buttonEl?: HTMLElement | null): void {
  if (platform === 'copy') {
    copyToClipboard(options.url).then((ok) => {
      if (ok) {
        const toastMsg = buttonEl?.getAttribute('data-copied-toast') ||
                         buttonEl?.closest('[data-share-container]')?.getAttribute('data-copied-toast') ||
                         'Link copied to clipboard! 🚀';
        showToast(toastMsg);
        if (buttonEl) {
          buttonEl.classList.add('copied');
          const originalText = buttonEl.getAttribute('data-original-text') || buttonEl.textContent;
          if (!buttonEl.getAttribute('data-original-text') && originalText) {
            buttonEl.setAttribute('data-original-text', originalText);
          }
          const copiedLabel = buttonEl.getAttribute('data-copied-text') || '✅ Copied!';
          if (buttonEl.classList.contains('share-btn') || buttonEl.classList.contains('share-button') || buttonEl.classList.contains('copy-btn')) {
            buttonEl.textContent = copiedLabel;
          }
          setTimeout(() => {
            buttonEl.classList.remove('copied');
            const orig = buttonEl.getAttribute('data-original-text');
            if (orig) {
              buttonEl.textContent = orig;
            }
          }, 2000);
        }
      }
    });
    return;
  }

  const shareUrl = buildShareUrl(platform, options);
  if (shareUrl) {
    openShareWindow(shareUrl, platform);
  }
}

export function initSocialShareButtons(containerSelector = '.share-buttons, [data-share-container]'): void {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container) => {
    const buttons = container.querySelectorAll<HTMLElement>('.share-button, .share-btn');

    buttons.forEach((btn) => {
      if (btn.dataset.shareBound === 'true') return;
      btn.dataset.shareBound = 'true';

      btn.addEventListener('click', (e) => {
        const platform = btn.dataset.platform ||
          (btn.classList.contains('twitter-btn') ? 'twitter' :
           btn.classList.contains('facebook-btn') ? 'facebook' :
           btn.classList.contains('whatsapp-btn') ? 'whatsapp' :
           btn.classList.contains('reddit-btn') ? 'reddit' :
           btn.classList.contains('copy-btn') ? 'copy' : '');

        if (!platform) return;

        e.preventDefault();

        const parentContainer = btn.closest<HTMLElement>('[data-share-container]') || (container as HTMLElement);
        const url = parentContainer.dataset.url || window.location.href;
        const title = parentContainer.dataset.title || document.title;
        const text = parentContainer.dataset.text || title;

        triggerShare(platform, { url, title, text }, btn);
      });
    });
  });
}
