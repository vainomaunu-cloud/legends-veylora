// ---------- Download and install (buttons under the game) ----------
// ⬇ Lataa peli: the whole game as a ZIP from GitHub; unzip it and open index.html (works without internet).
// 📲 Asenna: install the game as an app. Chrome / Edge / Android offer it themselves (beforeinstallprompt);
// on iPhone / iPad the button explains how to add it to the home screen. Hidden once the game runs as an app.
(function () {
  const btn = document.getElementById('installBtn');
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // the service worker only works over http(s), not when index.html is opened as a file
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  if (!btn || standalone) return;

  let prompt = null;
  addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    prompt = e;
    btn.hidden = false;
  });
  addEventListener('appinstalled', () => { btn.hidden = true; prompt = null; });
  if (ios && location.protocol.startsWith('http')) btn.hidden = false;

  btn.addEventListener('click', async () => {
    btn.blur();   // so Space / Enter keep controlling the game
    if (prompt) {
      prompt.prompt();
      await prompt.userChoice;
      prompt = null;
      btn.hidden = true;
    } else if (ios) {
      alert('Asenna peli iPhonelle tai iPadille:\n1. Napauta Safarin Jaa-painiketta (neliö ja nuoli ylös).\n2. Valitse "Lisää Koti-valikkoon".\n3. Napauta "Lisää". Peli tulee kotinäytölle omaksi sovellukseksi.');
    }
  });
  btn.addEventListener('pointerdown', e => e.stopPropagation());
})();
