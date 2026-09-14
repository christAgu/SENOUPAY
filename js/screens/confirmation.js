// Écran Confirmation (confirmation.html) — récapitulatif du transfert simulé.

function maskIban(iban) {
  const cleaned = iban.replace(/\s/g, '');
  if (cleaned.length < 8) return iban;
  const last3 = cleaned.slice(-3);
  return `${cleaned.slice(0, 4)} •••• •••• •••• •••• •••• ${last3}`;
}

function renderRecap() {
  const transfer = getState('last_transfer');

  if (!transfer) {
    window.location.href = 'home.html';
    return;
  }

  document.getElementById('confirmation-recap').innerHTML = `
    <div class="recap-row">
      <span class="recap-label">Montant envoyé</span>
      <span class="recap-value">${formatXof(transfer.amountXof)}</span>
    </div>
    <div class="recap-row">
      <span class="recap-label">Montant reçu</span>
      <span class="recap-value">${formatEur(transfer.amountEur)}</span>
    </div>
    <div class="recap-row">
      <span class="recap-label">Bénéficiaire</span>
      <span class="recap-value">${transfer.beneficiaryName}</span>
    </div>
    <div class="recap-row">
      <span class="recap-label">IBAN</span>
      <span class="recap-value">${maskIban(transfer.iban)}</span>
    </div>
    <div class="recap-row">
      <span class="recap-label">Opérateur</span>
      <span class="recap-value">${transfer.operator}</span>
    </div>
    <div class="recap-row">
      <span class="recap-label">Référence</span>
      <span class="recap-value">${transfer.reference}</span>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderRecap);
