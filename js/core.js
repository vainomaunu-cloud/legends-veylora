// ---------- Core: screen, assets, input, scripts, UI helpers ----------
const W = 240, H = 160, TILE = 16;
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function fitCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const s = Math.max(1, Math.floor(Math.min(innerWidth * dpr / W, (innerHeight - 70) * dpr / H)));
  canvas.style.width = (W * s / dpr) + 'px';
  canvas.style.height = (H * s / dpr) + 'px';
}
addEventListener('resize', fitCanvas);
fitCanvas();

// ---------- Assets (edit these PNGs in Photoshop, then reload the page) ----------
const SPRITES = {
  amperite: 'moi 1st evo.png',            // 32x32 AMPERITE front (your original)
  amperiteBlink: 'sprites/amperite_blink.png',
  amperiteHurt: 'sprites/amperite_hurt.png',
  amperiteAttack: 'sprites/amperite_attack.png',
  amperiteBack: 'sprites/amperite_back.png',
  amperiteBackAttack: 'sprites/amperite_back_attack.png',
  electroball: 'sprites/electroball.png', // 2 frames 16x16
  zubug: 'zubug.png',                     // 32x32 ZUBUG front (your original)
  zubugBlink: 'sprites/zubug_blink.png',
  zubugHurt: 'sprites/zubug_hurt.png',
  zubugAttack: 'sprites/zubug_attack.png',
  zubugBack: 'sprites/zubug_back.png',
  zubugBackAttack: 'sprites/zubug_back_attack.png',
  golbug: 'golbug.png',                   // 32x32 GOLBUG front (your original)
  golbugBlink: 'sprites/golbug_blink.png',
  golbugHurt: 'sprites/golbug_hurt.png',
  golbugAttack: 'sprites/golbug_attack.png',
  golbugBack: 'sprites/golbug_back.png',
  golbugBackAttack: 'sprites/golbug_back_attack.png',
  squishroom: 'squishroom.png',           // 32x32 SQUISHROOM front (your original)
  squishroomBlink: 'sprites/squishroom_blink.png',
  squishroomHurt: 'sprites/squishroom_hurt.png',
  squishroomAttack: 'sprites/squishroom_attack.png',
  squishroomBack: 'sprites/squishroom_back.png',
  squishroomBackAttack: 'sprites/squishroom_back_attack.png',
  duckonda: 'duckonda.png',               // 32x32 DUCKONDA front (your original, starter only)
  duckondaBlink: 'sprites/duckonda_blink.png',
  duckondaHurt: 'sprites/duckonda_hurt.png',
  duckondaAttack: 'sprites/duckonda_attack.png',
  duckondaBack: 'sprites/duckonda_back.png',
  duckondaBackAttack: 'sprites/duckonda_back_attack.png',
  shroocid: 'shroocid.png',              // 32x32 SHROOCID front (your original)
  shroocidBlink: 'sprites/shroocid_blink.png',
  shroocidHurt: 'sprites/shroocid_hurt.png',
  shroocidAttack: 'sprites/shroocid_attack.png',
  shroocidBack: 'sprites/shroocid_back.png',
  shroocidBackAttack: 'sprites/shroocid_back_attack.png',
  web: 'sprites/web.png',               // 32x32 STICKY WEB
  slash: 'sprites/slash.png',             // 32x32 AIR SLASH crescent
  tilesSea: 'sprites/tiles_sea.png',      // SAARIMERI tiles (13-14 water, 15-16 bridges, 11-12 palms)
  kiosk: 'sprites/kiosk.png',             // 48x32 beach kiosk
  greatBall: 'sprites/great_ball.png',    // 3 frames 16x16 GREAT PALLO
  center: 'sprites/center.png',          // 48x48 healing center building (HOITOLA)
  ball: 'sprites/ball.png',               // 3 frames 16x16 catch ball (upright, tilt L, tilt R)
  moi: 'moi.png',                         // 32x32 AMPEREEM front (your original)
  moiBlink: 'sprites/moi_blink.png',      // 32x32 front, eyes closed
  moiHurt: 'sprites/moi_hurt.png',        // 32x32 front, > < face
  moiAttack: 'sprites/moi_attack.png',    // 32x32 front, charging
  moiBack: 'sprites/moi_back.png',        // 32x32 back (player side)
  moiBackAttack: 'sprites/moi_back_attack.png',
  player: 'sprites/player.png',           // 16x16 frames, 3 cols x 4 rows (down, up, left, right)
  trainerBack: 'sprites/trainer_back.png',// 32x32
  tiles: 'sprites/tiles.png',             // 16x16 tiles in one row
  bushRustle: 'sprites/bush_rustle.png',  // 3 frames 16x16
  tilesHyujal: 'sprites/tiles_hyujal.png',        // HYUJAL METSÄ tiles (same order as tiles.png)
  bushRustleHyujal: 'sprites/bush_rustle_hyujal.png',
  thunderbolt: 'sprites/thunderbolt.png', // 3 frames 16x32
  spark: 'sprites/spark.png',             // 3 frames 32x32
  hit: 'sprites/hit.png',                 // 2 frames 32x32
};
// Shiny forms (your "kiiltävä ..." files) + their animation frames: key = 'shiny_' + normal key
const SHINY_FILES = {
  moi: 'kiiltävä ampereem.png', amperite: 'kiiltävä amperite.png', zubug: 'kiiltävä zubug.png',
  golbug: 'kiiltävä golbug.png', squishroom: 'kiiltävä squishroom.png', shroocid: 'kiiltävä shroocid.png',
  duckonda: 'duckonda kiiltävä.png',
};
for (const [k, file] of Object.entries(SHINY_FILES)) {
  SPRITES['shiny_' + k] = file;
  for (const [suffix, name] of [['Blink', 'blink'], ['Hurt', 'hurt'], ['Attack', 'attack'], ['Back', 'back'], ['BackAttack', 'back_attack']]) {
    SPRITES['shiny_' + k + suffix] = `sprites/shiny_${k}_${name}.png`;
  }
}

const IMG = {};

function loadAssets() {
  return Promise.all(Object.entries(SPRITES).map(([key, src]) => new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => { IMG[key] = im; resolve(); };
    im.onerror = () => reject(new Error('Kuvaa ei löytynyt: ' + src));
    im.src = src;
  })));
}

// White silhouette of a sprite (used by the evolution animation)
const WHITE = {};
function makeWhite(key) {
  if (WHITE[key]) return WHITE[key];
  const c = document.createElement('canvas');
  c.width = IMG[key].width; c.height = IMG[key].height;
  const g = c.getContext('2d');
  g.drawImage(IMG[key], 0, 0);
  g.globalCompositeOperation = 'source-atop';
  g.fillStyle = '#ffffff';
  g.fillRect(0, 0, c.width, c.height);
  return (WHITE[key] = c);
}

// Draw frame `i` of a sheet laid out in columns of fw x fh.
function drawFrame(img, i, fw, fh, x, y, scale = 1, cols = 0) {
  const per = cols || Math.floor(img.width / fw);
  const sx = (i % per) * fw, sy = Math.floor(i / per) * fh;
  ctx.drawImage(img, sx, sy, fw, fh, Math.round(x), Math.round(y), fw * scale, fh * scale);
}

// ---------- Input ----------
const KEYMAP = {
  ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
  KeyZ: 'a', Enter: 'a', Space: 'a', KeyX: 'b', Escape: 'b', Backspace: 'b', KeyF: 'f',
};
const held = {}, pressed = {};
const dirStack = [];
let tapDir = null;   // a direction tapped this frame (even if already released)
addEventListener('keydown', e => {
  const k = KEYMAP[e.code];
  if (!k) return;
  e.preventDefault();
  if (!held[k]) {
    pressed[k] = true;
    if (k in DIRS) {
      const i = dirStack.indexOf(k);
      if (i >= 0) dirStack.splice(i, 1);
      dirStack.push(k);
      tapDir = k;
    }
  }
  held[k] = true;
});
addEventListener('keyup', e => {
  const k = KEYMAP[e.code];
  if (!k) return;
  held[k] = false;
  const i = dirStack.indexOf(k);
  if (i >= 0) dirStack.splice(i, 1);
});
addEventListener('blur', () => { for (const k in held) held[k] = false; dirStack.length = 0; });

function heldDir() { return dirStack.length ? dirStack[dirStack.length - 1] : tapDir; }
function take(k) { if (pressed[k]) { pressed[k] = false; return true; } return false; }
function clearPressed() { for (const k in pressed) pressed[k] = false; tapDir = null; }

const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// ---------- Scripts: generators that run one step per frame ----------
class Runner {
  constructor() { this.tasks = []; }
  run(gen) { this.tasks.push(gen); return gen; }
  update() { this.tasks = this.tasks.filter(t => !t.next().done); }
  get busy() { return this.tasks.length > 0; }
}
function* wait(frames) { for (let i = 0; i < frames; i++) yield; }
function* tween(frames, fn) { for (let i = 1; i <= frames; i++) { fn(i / frames); yield; } }
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// ---------- Drawing helpers ----------
function fillEllipse(cx, cy, rx, ry, color) {
  ctx.fillStyle = color;
  for (let dy = -ry; dy <= ry; dy++) {
    const hw = Math.round(rx * Math.sqrt(1 - (dy / (ry + 0.5)) ** 2));
    ctx.fillRect(cx - hw, cy + dy, hw * 2, 1);
  }
}

function drawBox(x, y, w, h, fill = '#f8f8f0') {
  ctx.fillStyle = '#283040';
  ctx.fillRect(x + 1, y, w - 2, h);
  ctx.fillRect(x, y + 1, w, h - 2);
  ctx.fillStyle = '#c8d0e0';
  ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
  ctx.fillStyle = fill;
  ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
}

function hpColor(frac) { return frac > 0.5 ? '#48c050' : frac > 0.2 ? '#e8b830' : '#e04838'; }

function drawBar(x, y, w, frac, color) {
  ctx.fillStyle = '#283040';
  ctx.fillRect(x - 1, y - 1, w + 2, 5);
  ctx.fillStyle = '#586070';
  ctx.fillRect(x, y, w, 3);
  const fw = Math.max(0, Math.min(w, Math.ceil(w * frac)));
  ctx.fillStyle = color;
  ctx.fillRect(x, y, fw, 3);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillRect(x, y, fw, 1);
}

// ---------- Pop-up list menu ----------
const menuBox = {
  active: null,
  // returns the chosen index, or -1 if cancelled with X
  *choose(options, x, y, w) {
    const m = { options, index: 0, x, y, w };
    this.active = m;
    while (true) {
      if (take('up')) m.index = (m.index + options.length - 1) % options.length;
      if (take('down')) m.index = (m.index + 1) % options.length;
      if (take('a')) { this.active = null; return m.index; }
      if (take('b')) { this.active = null; return -1; }
      yield;
    }
  },
  draw() {
    const m = this.active;
    if (!m) return;
    drawBox(m.x, m.y, m.w, 10 + m.options.length * 12);
    m.options.forEach((s, i) => drawText(ctx, s, m.x + 16, m.y + 6 + i * 12));
    drawText(ctx, '►', m.x + 6, m.y + 6 + m.index * 12, '#e04838');
  },
};

// ---------- Text box (bottom of the screen) ----------
const textBox = {
  lines: [], chars: 0, total: 0, waiting: false, visible: false, blink: 0, x: 0, w: W,
  *say(text, opts = {}) {
    const auto = opts.auto || 0;          // >0: continue by itself after N frames
    this.x = opts.x || 0; this.w = opts.w || W;
    const lines = wrapText(text, this.w - 20);
    this.visible = true;
    for (let p = 0; p < lines.length; p += 2) {
      this.lines = lines.slice(p, p + 2);
      this.total = this.lines.join('').length;
      this.chars = 0;
      this.waiting = false;
      while (this.chars < this.total) {
        if (take('a')) this.chars = this.total;
        else this.chars += held.a ? 2 : 1;
        yield;
      }
      if (auto && p + 2 >= lines.length) { yield* wait(auto); break; }
      this.waiting = true;
      while (!take('a')) yield;
      this.waiting = false;
    }
    if (!opts.keep) this.visible = false;
  },
  // show text instantly and keep it up (e.g. as a prompt next to a menu)
  show(text, x = 0, w = W) {
    this.visible = true; this.x = x; this.w = w;
    this.lines = wrapText(text, w - 20).slice(0, 2); this.chars = 999; this.waiting = false;
  },
  hide() { this.visible = false; this.lines = []; },
  draw() {
    if (!this.visible) return;
    drawBox(this.x, 112, this.w, 48);
    let left = this.chars;
    this.lines.forEach((line, i) => {
      const part = line.slice(0, Math.max(0, left));
      left -= line.length;
      drawText(ctx, part, this.x + 10, 121 + i * 16);
    });
    this.blink++;
    if (this.waiting && (this.blink >> 4) % 2 === 0) drawText(ctx, '▼', this.x + this.w - 14, 147, '#e04838');
  },
};
