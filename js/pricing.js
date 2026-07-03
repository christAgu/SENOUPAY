// Calcul de conversion XOF <-> EUR — aperçu local uniquement pour ce prototype.
// La vraie source de vérité sera backend/src/modules/pricing/pricing.service.ts une fois le backend connecté.
const FIXED_RATE_XOF_PER_EUR = 655.957;
const DEFAULT_SPREAD_PERCENT = 0.02;

function convertXofToEur(amountXof, spreadPercent = DEFAULT_SPREAD_PERCENT) {
  const raw = amountXof / FIXED_RATE_XOF_PER_EUR;
  const afterSpread = raw * (1 - spreadPercent);
  return Math.round(afterSpread * 100) / 100;
}

// Inverse de convertXofToEur — utilisée par le bouton de bascule des deux champs.
function convertEurToXof(amountEur, spreadPercent = DEFAULT_SPREAD_PERCENT) {
  const beforeSpread = amountEur / (1 - spreadPercent);
  return Math.round(beforeSpread * FIXED_RATE_XOF_PER_EUR * 100) / 100;
}
