// Écran Landing (index.html).
// Le header, le calculateur (avec bascule XOF/EUR) et le formatage sont gérés par
// js/components/header.js, js/components/amount-swap.js et js/format.js (partagés entre écrans).

function setupSendButton() {
  // Un visiteur non connecté peut tester directement la fonctionnalité d'envoi :
  // pas de redirection vers auth.html, on va droit sur l'écran d'envoi.
  document.getElementById('landing-send-btn').addEventListener('click', () => {
    const input = document.getElementById('landing-amount-xof');
    const amount = parseFloat(input.value) || 0;
    if (amount > 0) {
      setState('senoupay_prefill_amount_xof', amount);
    }
    window.location.href = 'send-money.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindAmountSwap('landing-amount-xof', 'landing-amount-eur', 'landing-swap-btn');
  setupSendButton();
});
