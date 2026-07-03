// Rendu du header partagé — évite de dupliquer le markup logo + navigation sur chaque écran.
// Chaque page définit `window.SENOU_HEADER_OPTIONS` avant ce script :
//   { showBack: true }                      -> flèche de retour vers index.html
//   { ctaHtml: '<a href="..." class="header-cta">Se connecter</a>' } -> bouton à droite
function renderHeader(options = {}) {
  const { showBack = false, ctaHtml = '' } = options;
  const el = document.getElementById('app-header');
  if (!el) return;

  el.innerHTML = `
    <div class="header-bar">
      <div class="header-bar-inner">
        ${showBack ? '<a href="index.html" class="header-back" aria-label="Retour">&larr;</a>' : '<span class="header-spacer"></span>'}
        <div class="brand-lockup">
          <img src="assets/logo/senou-pay-mark.svg" alt="" width="30" height="30" class="brand-mark">
          <span class="brand-name">Senou Pay</span>
        </div>
        ${ctaHtml || '<span class="header-spacer"></span>'}
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => renderHeader(window.SENOU_HEADER_OPTIONS || {}));
