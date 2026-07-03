// Bouton de bascule entre les deux champs du calculateur : par défaut on saisit le montant XOF
// et l'EUR est calculé, un clic sur le bouton inverse (on saisit l'EUR et le XOF est calculé).
// Le bloc actif est aussi déplacé en haut dans le DOM ; AutoAnimate (CDN, chargé en module ES)
// anime cet échange de position automatiquement — plus besoin de gérer le fondu/order en CSS.
const autoAnimateReady = import('https://cdn.jsdelivr.net/npm/@formkit/auto-animate@0.9.0/index.min.js')
  .then((mod) => mod.autoAnimate)
  .catch(() => null);

function bindAmountSwap(xofInputId, eurInputId, swapBtnId) {
  const xofInput = document.getElementById(xofInputId);
  const eurInput = document.getElementById(eurInputId);
  const swapBtn = document.getElementById(swapBtnId);
  const xofPanel = xofInput.closest('.amount-panel');
  const eurPanel = eurInput.closest('.amount-panel');
  const swapWrap = swapBtn.closest('.amount-swap-wrap');
  const panelsWrap = swapBtn.closest('.amount-panels');

  autoAnimateReady.then((autoAnimate) => {
    if (autoAnimate) autoAnimate(panelsWrap, { duration: 300 });
  });

  let direction = 'xofToEur';

  function updateFromXof() {
    const amount = parseFloat(xofInput.value) || 0;
    eurInput.value = amount > 0 ? convertXofToEur(amount) : '';
  }

  function updateFromEur() {
    const amount = parseFloat(eurInput.value) || 0;
    xofInput.value = amount > 0 ? convertEurToXof(amount) : '';
  }

  xofInput.addEventListener('input', () => {
    if (direction === 'xofToEur') updateFromXof();
  });

  eurInput.addEventListener('input', () => {
    if (direction === 'eurToXof') updateFromEur();
  });

  swapBtn.addEventListener('click', () => {
    direction = direction === 'xofToEur' ? 'eurToXof' : 'xofToEur';
    xofInput.readOnly = direction === 'eurToXof';
    eurInput.readOnly = direction === 'xofToEur';
    swapBtn.classList.toggle('amount-swap-btn--flipped');

    // Réordonne réellement les blocs dans le DOM : AutoAnimate observe ce changement
    // sur panelsWrap et anime le déplacement + la taille automatiquement.
    const topPanel = direction === 'eurToXof' ? eurPanel : xofPanel;
    const bottomPanel = direction === 'eurToXof' ? xofPanel : eurPanel;
    panelsWrap.appendChild(topPanel);
    panelsWrap.appendChild(swapWrap);
    panelsWrap.appendChild(bottomPanel);

    if (direction === 'eurToXof') {
      eurInput.focus();
    } else {
      xofInput.focus();
    }
  });

  updateFromXof();
  return { updateFromXof, updateFromEur };
}
