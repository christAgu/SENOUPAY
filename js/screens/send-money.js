// Écran Envoyer de l'argent (send-money.html) — accessible sans authentification.

function updateEurPreview() {
  const input = document.getElementById('send-money-amount-xof');
  const preview = document.getElementById('send-money-amount-eur');
  const amountXof = parseFloat(input.value) || 0;
  preview.textContent = formatEur(convertXofToEur(amountXof));
}

function prefillAmountFromLanding() {
  const prefill = getState('prefill_amount_xof');
  if (prefill) {
    document.getElementById('send-money-amount-xof').value = prefill;
    updateEurPreview();
    setState('prefill_amount_xof', null);
  }
}

function setupContinueButton() {
  document.getElementById('send-money-continue-btn').addEventListener('click', () => {
    const input = document.getElementById('send-money-amount-xof');
    const amountXof = parseFloat(input.value) || 0;
    if (amountXof <= 0) return;

    setState('transfer_amount_xof', {
      amountXof,
      amountEur: convertXofToEur(amountXof),
    });
    window.location.href = 'beneficiary.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('send-money-amount-xof').addEventListener('input', updateEurPreview);
  prefillAmountFromLanding();
  setupContinueButton();
});
