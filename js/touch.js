// ---------- On-screen controls for phones and tablets ----------
// The buttons send the same key events as a keyboard, so the rest of the game does not need to know.

const isTouchDevice = (window.matchMedia && matchMedia('(any-pointer: coarse)').matches) || navigator.maxTouchPoints > 0;

function sendKey(code, down) {
  dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { code }));
}

function setupTouch() {
  document.body.classList.add('touch');

  // D-pad: one finger can slide between directions
  const pad = document.getElementById('dpad');
  const parts = { up: pad.querySelector('.up'), down: pad.querySelector('.down'), left: pad.querySelector('.left'), right: pad.querySelector('.right') };
  const codes = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' };
  let padPointer = null, padDir = null;
  const setDir = dir => {
    if (dir === padDir) return;
    if (padDir) { sendKey(codes[padDir], false); parts[padDir].classList.remove('on'); }
    padDir = dir;
    if (padDir) { sendKey(codes[padDir], true); parts[padDir].classList.add('on'); }
  };
  const dirFrom = e => {
    const r = pad.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < 14) return null;               // dead zone in the middle
    return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
  };
  pad.addEventListener('pointerdown', e => {
    e.preventDefault();
    padPointer = e.pointerId;
    try { pad.setPointerCapture(e.pointerId); } catch (err) { /* not a real pointer */ }
    setDir(dirFrom(e));
  });
  pad.addEventListener('pointermove', e => { if (e.pointerId === padPointer) setDir(dirFrom(e)); });
  const padEnd = e => { if (e.pointerId === padPointer) { padPointer = null; setDir(null); } };
  pad.addEventListener('pointerup', padEnd);
  pad.addEventListener('pointercancel', padEnd);

  // A, B, fishing and music buttons
  for (const btn of document.querySelectorAll('#buttons .btn')) {
    const code = btn.dataset.key;
    let pointer = null;
    btn.addEventListener('pointerdown', e => {
      e.preventDefault();
      pointer = e.pointerId;
      try { btn.setPointerCapture(e.pointerId); } catch (err) { /* not a real pointer */ }
      btn.classList.add('on');
      sendKey(code, true);
    });
    const end = e => {
      if (e.pointerId !== pointer) return;
      pointer = null;
      btn.classList.remove('on');
      sendKey(code, false);
    };
    btn.addEventListener('pointerup', end);
    btn.addEventListener('pointercancel', end);
  }

  // no long-press menus, double-tap zoom or pinch on the game
  addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('touchmove', e => { if (!e.target.closest('#inventory, #admin, #pcScreen, #nameDlg')) e.preventDefault(); }, { passive: false });

  // iPhones/iPads only allow sound to start inside a touch: unlock it on the first touch
  const unlock = () => {
    if (typeof music === 'undefined') return;
    music.init();
    if (music.ctx && music.ctx.state !== 'running') music.ctx.resume();
  };
  addEventListener('touchend', unlock, { passive: true });
  addEventListener('pointerup', unlock);
}

if (isTouchDevice) setupTouch();

// Canvas size: keep whole-pixel scaling, and on touch screens leave room for the buttons
function fitCanvasTouch() {
  const dpr = window.devicePixelRatio || 1;
  let availW = innerWidth, availH = innerHeight - 120;   // room for the save button and help line
  if (document.body.classList.contains('touch')) {
    // while typing (code field, game name) the phone keyboard makes the page short: that is not a turn
    // to landscape, so keep the layout as it is, or the field would jump away and the keyboard close
    const typing = document.activeElement && /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if (typing && fitCanvasTouch.done) return;
    fitCanvasTouch.done = true;
    const portrait = innerHeight >= innerWidth;
    document.body.classList.toggle('portrait', portrait);
    if (portrait) { availW = innerWidth - 16; availH = innerHeight - 250; }   // save button + controls below the game
    else { availW = innerWidth - 2 * 190; availH = innerHeight - 16; }          // buttons beside the game
  }
  let s = Math.floor(Math.min(availW * dpr / W, availH * dpr / H));
  // small phones: allow a non-whole scale rather than a tiny picture
  let cssW = s >= 1 ? W * s / dpr : 0;
  if (document.body.classList.contains('touch') && cssW < availW * 0.8) {
    const k = Math.min(availW / W, availH / H);
    cssW = W * k;
  }
  if (!cssW) cssW = W;
  canvas.style.width = cssW + 'px';
  canvas.style.height = (cssW * H / W) + 'px';
}
removeEventListener('resize', fitCanvas);
addEventListener('resize', fitCanvasTouch);
addEventListener('orientationchange', () => setTimeout(fitCanvasTouch, 200));
// when typing ends the keyboard closes: fit the game again (resizes were skipped while typing)
document.addEventListener('focusout', () => setTimeout(fitCanvasTouch, 300));
fitCanvasTouch();
