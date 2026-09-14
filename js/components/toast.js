// Toast utility — vanilla equivalent of useToast hook.

let toastViewport = null;

function ensureToastViewport() {
  if (toastViewport) return toastViewport;
  toastViewport = document.createElement('div');
  toastViewport.className = 'calc-toast-viewport';
  toastViewport.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastViewport);
  return toastViewport;
}

function useToast() {
  function toast({ title, description, duration = 3000 }) {
    const viewport = ensureToastViewport();
    const el = document.createElement('div');
    el.className = 'calc-toast';
    el.setAttribute('role', 'status');
    el.textContent = description ? `${title} — ${description}` : title;
    viewport.appendChild(el);

    const dismiss = () => {
      el.classList.add('calc-toast--out');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };

    const timer = window.setTimeout(dismiss, duration);
    el.addEventListener('click', () => {
      window.clearTimeout(timer);
      dismiss();
    });
  }

  return { toast };
}
