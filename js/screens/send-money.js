// Écran Envoyer de l'argent (send-money.html) — accessible sans authentification,
// pour permettre à un visiteur de tester la fonctionnalité d'envoi de bout en bout.
// Le header et le calculateur (avec bascule XOF/EUR) sont gérés par js/components/header.js
// et js/components/amount-swap.js (partagés entre écrans).

function prefillAmountFromLanding(updateFromXof) {
  const prefill = getState('senoupay_prefill_amount_xof');
  if (prefill) {
    document.getElementById('send-money-amount-xof').value = prefill;
    updateFromXof();
    // On efface la clé pour ne pas la réappliquer sur une visite ultérieure.
    setState('senoupay_prefill_amount_xof', null);
  }
}

function setupContinueButton() {
  document.getElementById('send-money-continue-btn').addEventListener('click', () => {
    const input = document.getElementById('send-money-amount-xof');
    const amountXof = parseFloat(input.value) || 0;
    if (amountXof <= 0) return;

    setState('senoupay_transfer_amount_xof', {
      amountXof,
      amountEur: convertXofToEur(amountXof),
    });
    window.location.href = 'beneficiary.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const { updateFromXof } = bindAmountSwap('send-money-amount-xof', 'send-money-amount-eur', 'send-money-swap-btn');
  prefillAmountFromLanding(updateFromXof);
  setupContinueButton();
});
