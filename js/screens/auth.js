// Écran Auth (auth.html) — pas de vraie distinction login/register, juste un changement de libellé.
// Aucune validation serveur : on vérifie seulement que les champs ne sont pas vides.

let authMode = 'register'; // 'register' | 'login'

function updateAuthMode() {
  const title = document.getElementById('auth-title');
  const toggleText = document.getElementById('auth-toggle-text');
  const toggleLink = document.getElementById('auth-toggle-link');
  const continueBtn = document.getElementById('auth-continue-btn');

  if (authMode === 'register') {
    title.textContent = 'Créer un compte';
    toggleText.textContent = 'Déjà un compte ?';
    toggleLink.textContent = 'Se connecter';
    continueBtn.textContent = 'Continuer';
  } else {
    title.textContent = 'Se connecter';
    toggleText.textContent = 'Pas encore de compte ?';
    toggleLink.textContent = 'Créer un compte';
    continueBtn.textContent = 'Continuer';
  }
}

function setupToggle() {
  document.getElementById('auth-toggle-link').addEventListener('click', (e) => {
    e.preventDefault();
    authMode = authMode === 'register' ? 'login' : 'register';
    updateAuthMode();
  });
}

function setupContinue() {
  document.getElementById('auth-continue-btn').addEventListener('click', () => {
    const identifier = document.getElementById('auth-identifier').value.trim();
    const password = document.getElementById('auth-password').value.trim();
    const errorEl = document.getElementById('auth-error');

    if (!identifier || !password) {
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;

    setState('senoupay_user', { identifier });
    window.location.href = 'otp.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateAuthMode();
  setupToggle();
  setupContinue();
});
