// Écran Landing (index.html) — calculateur public + transactions récentes.

// TODO: remplacer par un flux d'activité agrégé réel une fois le backend connecté
const ANONYMOUS_TRANSACTIONS = [
  { amountXof: 50000, relativeTime: 'il y a 2 heures' },
  { amountXof: 120000, relativeTime: 'il y a 5 heures' },
  { amountXof: 75000, relativeTime: 'il y a 1 jour' },
].map((tx) => ({ ...tx, amountEur: convertXofToEur(tx.amountXof) }));

function formatRelativeTime(timestamp) {
  const diffMs = Date.now() - timestamp;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `il y a ${Math.max(1, diffMin)} minute${diffMin > 1 ? 's' : ''}`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  const diffDays = Math.floor(diffHours / 24);
  return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
}

function setupConversion() {
  const xofInput = document.getElementById('landing-amount-xof');
  const eurPreview = document.getElementById('landing-amount-eur');

  function updatePreview() {
    const amountXof = parseFloat(xofInput.value) || 0;
    eurPreview.textContent = formatEur(convertXofToEur(amountXof));
  }

  xofInput.addEventListener('input', updatePreview);
  updatePreview();
}

function setupSendButton() {
  document.getElementById('landing-send-btn').addEventListener('click', () => {
    const input = document.getElementById('landing-amount-xof');
    const amount = parseFloat(input.value) || 0;
    if (amount > 0) {
      setState('prefill_amount_xof', amount);
    }
    window.location.href = 'send-money.html';
  });
}

function renderRecentTransactions() {
  const container = document.getElementById('recent-transactions');
  const history = getState('transaction_history');

  let entries;
  if (history && history.length > 0) {
    entries = history.slice(0, 3).map((tx) => ({
      amountXof: tx.amountXof,
      amountEur: tx.amountEur,
      relativeTime: formatRelativeTime(tx.timestamp),
      status: tx.status || 'En cours',
    }));
  } else {
    entries = ANONYMOUS_TRANSACTIONS.map((tx) => ({
      ...tx,
      status: 'Terminé',
      anonymous: true,
    }));
  }

  container.innerHTML = entries.map((tx) => {
    const amountLine = tx.anonymous
      ? `Un envoi de ${formatXof(tx.amountXof)} → ${formatEur(tx.amountEur)}`
      : `${formatXof(tx.amountXof)} → ${formatEur(tx.amountEur)}`;
    return `
    <div class="transaction-card card--flat">
      <p class="transaction-amount">${amountLine}</p>
      <p class="transaction-meta">
        <span class="badge badge-${tx.status === 'En cours' ? 'warning' : 'success'}">${tx.status}</span>
        <span>${tx.relativeTime}</span>
      </p>
    </div>
  `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  setupConversion();
  setupSendButton();
  renderRecentTransactions();
});
