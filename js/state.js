// Gestion d'état simple via localStorage — pas de backend, pas de session serveur.
const STATE_PREFIX = 'senoupay_';

function setState(key, value) {
  localStorage.setItem(STATE_PREFIX + key, JSON.stringify(value));
}

function getState(key) {
  const raw = localStorage.getItem(STATE_PREFIX + key);
  return raw ? JSON.parse(raw) : null;
}

function clearState() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(STATE_PREFIX))
    .forEach((k) => localStorage.removeItem(k));
}
