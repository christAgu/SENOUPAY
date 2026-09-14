// Écran Home / Dashboard (home.html)

document.addEventListener('DOMContentLoaded', () => {
  const user = getState('user');
  const welcomeEl = document.getElementById('home-welcome');

  if (user && user.identifier) {
    welcomeEl.textContent = `Bonjour, ${user.identifier}`;
  }

  document.getElementById('home-send-btn').addEventListener('click', () => {
    window.location.href = 'send-money.html';
  });
});
