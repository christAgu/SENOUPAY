// Formatage partagé des montants et dates — utilisé par tous les écrans qui affichent du XOF/EUR.

function formatEur(amount) {
  return amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function formatXof(amount) {
  return amount.toLocaleString('fr-FR') + ' XOF';
}
