// Écran Bénéficiaire (beneficiary.html) — formulaire + validation + enregistrement du transfert.

let transferData = null;

function renderAmountBanner() {
  transferData = getState('transfer_amount_xof');
  const banner = document.getElementById('amount-banner');

  if (!transferData || !transferData.amountXof) {
    window.location.href = 'send-money.html';
    return;
  }

  banner.innerHTML = `
    <p class="amount-banner-label">Montant à envoyer</p>
    <p class="amount-banner-value">${formatXof(transferData.amountXof)} → ${formatEur(transferData.amountEur)}</p>
  `;
}

function getSelectedOperator() {
  const selected = document.querySelector('input[name="operator"]:checked');
  return selected ? selected.value : '';
}

function isFormValid() {
  const requiredIds = [
    'beneficiary-name', 'beneficiary-iban', 'beneficiary-bic',
    'beneficiary-address', 'beneficiary-city', 'beneficiary-postal',
    'beneficiary-country', 'beneficiary-relation', 'beneficiary-purpose',
  ];

  const allFilled = requiredIds.every((id) => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== '';
  });

  const operator = getSelectedOperator();
  const mobileNumber = document.getElementById('mobile-money-number').value.trim();

  return allFilled && operator && mobileNumber !== '';
}

function updateSubmitButton() {
  document.getElementById('beneficiary-submit-btn').disabled = !isFormValid();
}

function setupOperatorSelection() {
  const options = document.querySelectorAll('.radio-option');
  const mobileField = document.getElementById('mobile-money-field');

  options.forEach((option) => {
    option.addEventListener('click', () => {
      options.forEach((o) => o.classList.remove('is-selected'));
      option.classList.add('is-selected');
      option.querySelector('input').checked = true;
      mobileField.hidden = false;
      updateSubmitButton();
    });
  });
}

function setupFormValidation() {
  const form = document.getElementById('beneficiary-form');
  const fields = form.querySelectorAll('input, select');

  fields.forEach((field) => {
    field.addEventListener('input', updateSubmitButton);
    field.addEventListener('change', updateSubmitButton);
  });
}

function setupSubmit() {
  document.getElementById('beneficiary-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const reference = 'SP-' + Date.now();
    const transfer = {
      amountXof: transferData.amountXof,
      amountEur: transferData.amountEur,
      beneficiaryName: document.getElementById('beneficiary-name').value.trim(),
      iban: document.getElementById('beneficiary-iban').value.trim(),
      operator: getSelectedOperator(),
      mobileMoneyNumber: document.getElementById('mobile-money-number').value.trim(),
      reference,
    };

    setState('last_transfer', transfer);

    const history = getState('transaction_history') || [];
    history.unshift({
      amountXof: transfer.amountXof,
      amountEur: transfer.amountEur,
      timestamp: Date.now(),
      status: 'En cours',
      reference,
    });
    setState('transaction_history', history);

    window.location.href = 'confirmation.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAmountBanner();
  setupOperatorSelection();
  setupFormValidation();
  setupSubmit();
});
