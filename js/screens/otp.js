// Écran OTP (otp.html) — simulation : tout code non vide est accepté.

function setupVerify() {
  document.getElementById('otp-verify-btn').addEventListener('click', () => {
    const code = document.getElementById('otp-code').value.trim();
    const errorEl = document.getElementById('otp-error');

    if (!code) {
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;
    window.location.href = 'kyc.html';
  });
}

function setupResend() {
  document.getElementById('otp-resend-link').addEventListener('click', (e) => {
    e.preventDefault();
    const toast = document.getElementById('otp-toast');
    toast.hidden = false;
    setTimeout(() => { toast.hidden = true; }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupVerify();
  setupResend();
});
