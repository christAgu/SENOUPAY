// Écran KYC (kyc.html) — simulation instantanée, pas de vraie capture de document.
// TODO: intégrer un vrai provider KYC (Sumsub/Onfido) une fois choisi

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('kyc-start-btn').addEventListener('click', () => {
    setState('kyc_status', 'approved');
    window.location.href = 'home.html';
  });
});
