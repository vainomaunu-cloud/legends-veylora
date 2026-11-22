// ---------- Overworld: maps, walking, bushes, healing center ----------
// T tree  . grass  , grass2  = path  * flowers / small mushrooms  B bush  S sign
// H healing center (HOITOLA, 3x3 tiles)  D center door  P start  M big glowing mushroom
// X exit to another map (see `warps`)
const CENTER_NAME = 'HOITOLA';
const BALL_NAME = 'PYYDYSPALLO';
const BALL_PRICE = 50;

const MAPS = {
  forest: {
    name: 'PUSKAMETSÄ',
    tiles: 'tiles', rustle: 'bushRustle', shade: '#2a6a30',
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TT..,....TT.......,..*...TTT',
      'TT.BBBBB..T..BBBB....BBBB.TT',
      'TT.BBBBBB...BBBBBB..BBBBBBTT',
      'TT..BBBBB...BBBBBB...BBBBBTT',
      'TT...BBB.....BBBB....BBB..TT',
      'TT..*.....========........TT',
      'TT........=.HHH..=..*.....TT',
      'TT....S====.HHH..=........TT',
      'TT...,....=.HDH..======...TT',
      'TT..*.....=......=....,...TT',
      'TT........==P=====........TT',
      'TT..T.......=......T......TT',
      'TT.BBBBB....=...........BBTT',
      'TT.BBBBBBB..=..BBBBBB..BBBTT',
      'TT..BBBBBB..=..BBBBBBB.BBBTT',
      'TT...BBBB.*.=...BBBBB...BBTT',
      'TT....,.....=.....,...*...TT',
      'TTTTTTTTTTTT=TTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTXTTTTTTTTTTTTTTT',
    ],
    // chance per step in a bush
    encounters: [
      { species: 'ampereem', chance: 0.05 },
      { species: 'amperite', chance: 0.15 },
      { species: 'golbug', chance: 0.08 },
      { species: 'zubug', chance: 0.15 },
    ],
    warps: { '12,20': { to: 'hyujal', x: 12, y: 2, dir: 'down' } },
    sign: 'PUSKAMETSÄ\nPuskissa piileskelee AMPERITEja, ZUBUGeja, GOLBUGeja ja harvinaisia AMPEREEMeja. ' + CENTER_NAME + ' parantaa ja myy palloja. Etelään: HYUJAL METSÄ.',
  },
  hyujal: {
    name: 'HYUJAL METSÄ',
    tiles: 'tilesHyujal', rustle: 'bushRustleHyujal', shade: '#3a1d6e', glow: true,
    rows: [
      'TTTTTTTTTTTTXTTTTTTTTTTT',
      'TTTTTTTTTTTT=TTTTTTTTTTT',
      'TT..*.....,.=..*.....,TT',
      'TT.BBB......=.....BBB.TT',
      'TT.BBBB..M..=..M..BBBBTT',
      'TT..BB......=......BB.TT',
      'TT....*....S=...*.....TT',
      'TT.,........=........,TT',
      'TT...M......=.......M.TT',
      'TT......=========.....TT',
      'TT.BBBB.=.......=.BBBBTT',
      'TTBBBBBB=.......=BBBBBTT',
      'TT.BBBB.=.*...*.=.BBB.TT',
      'TT..M...=.......=...M.TT',
      'TT......=========.....TT',
      'TT..*...,.......*...,.TT',
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTTTTTTTTTTTTT',
    ],
    encounters: [
      { species: 'squishroom', chance: 0.2 },
      { species: 'shroocid', chance: 0.15 },
    ],
    warps: { '12,0': { to: 'forest', x: 12, y: 18, dir: 'up' } },
    sign: 'HYUJAL METSÄ\nPuut ja sienet hohtavat... Liilojen puskien seassa piileskelee SQUISHROOMeja ja myrkyllisiä SHROOCIDeja.',
  },
};

for (const [id, m] of Object.entries(MAPS)) {
  m.id = id;
  m.w = m.rows[0].length; m.h = m.rows.length;
  m.rows.forEach((row, i) => { if (row.length !== m.w) throw new Error(`Kartan ${id} rivi ${i} on väärän pituinen`); });
  m.treeRows = buildTreeRows(m);
  for (let y = m.h - 1; y >= 0; y--) for (let x = m.w - 1; x >= 0; x--) {
    const ch = m.rows[y][x];
    if (ch === 'P') m.spawn = { x, y };
    if (ch === 'D') m.door = { x, y };
    if (ch === 'H') m.center = { x, y };   // ends at the top-left H
  }
}

const TILE_INDEX = { '.': 0, ',': 1, '=': 2, 'P': 2, 'X': 2, '*': 3, 'B': 6, 'M': 7, 'S': 9, 'H': 0, 'D': 0 };
const BUSH_FRONT = 10, TREE_A = 11, TREE_B = 12;
const SOLID = new Set(['T', 'S', 'H', 'D', 'M']);
const DIR_ROW = { down: 0, up: 1, left: 2, right: 3 };
const WALK_SPEED = 1.5;        // pixels per frame (16 px tile = about 11 frames)
const TREE_LIFT = 6;           // trees are drawn this many px up so the rows overlap

function rollEncounter(list) {
  let r = Math.random();
  for (const e of list) { if (r < e.chance) return e.species; r -= e.chance; }
  return null;
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lead = () => game.party.find(m => m.hp > 0) || game.party[0];

// Staggered forest: odd rows are shifted half a tile inside runs of trees.
// Returns, per row, the x pixel positions of the trees to draw.
function buildTreeRows(m) {
  const out = [];
  for (let y = 0; y < m.h; y++) {
    const xs = [], row = m.rows[y];
    let x = 0;
    while (x < m.w) {
      if (row[x] !== 'T') { x++; continue; }
      const x0 = x;
      while (x < m.w && row[x] === 'T') x++;
      const x1 = x - 1;
      if (y % 2 === 0 || x0 === x1) { for (let i = x0; i <= x1; i++) xs.push(i * TILE); }
      else {
        xs.push(x0 * TILE);
        for (let i = x0; i < x1; i++) xs.push(i * TILE + 8);
        xs.push(x1 * TILE);
      }
    }
    out.push(xs);
  }
  return out;
}

const overworld = {
  map: MAPS.forest,
  player: null,
  rustles: [],
  runner: new Runner(),
  t: 0,
  stepsSinceBattle: 0,
  showWallet: false,
  banner: null,

  init() {
    this.map = MAPS.forest;
    const s = this.map.spawn;
    this.player = { tx: s.x, ty: s.y, dir: 'up', moving: false, offset: 0, steps: 0, turnDelay: 0, justWalked: false };
  },

  tileAt(x, y) {
    const m = this.map;
    if (x < 0 || y < 0 || x >= m.w || y >= m.h) return 'T';
    return m.rows[y][x];
  },

  enterMap(id, x, y, dir) {
    this.map = MAPS[id];
    this.rustles = [];
    Object.assign(this.player, { tx: x, ty: y, dir, moving: false, offset: 0, justWalked: false });
    this.banner = { text: this.map.name, t: 0 };
  },

  // after losing a battle: wake up at the center door
  respawnAtCenter() {
    const d = MAPS.forest.door;
    this.enterMap('forest', d.x, d.y + 1, 'up');
    this.banner = null;
  },

  say(text) { this.runner.run(textBox.say(text)); },

  update() {
    this.t++;
    for (const r of this.rustles) r.t++;
    this.rustles = this.rustles.filter(r => r.t < 18);
    if (this.banner && ++this.banner.t > 170) this.banner = null;
    if (this.runner.busy) { this.runner.update(); return; }

    const p = this.player;
    if (p.moving) {
      p.offset += WALK_SPEED;
      if (p.offset < TILE) return;   // (offset may overshoot 16 slightly; it is reset below)
      p.moving = false; p.offset = 0;
      p.tx += DIRS[p.dir][0]; p.ty += DIRS[p.dir][1];
      p.justWalked = true;
      if (this.onStep()) return;   // battle or map change started
    }

    if (take('a')) { this.interact(); return; }

    const d = heldDir();
    if (!d) { p.justWalked = false; p.turnDelay = 0; return; }
    if (d !== p.dir) {
      p.dir = d;
      if (!p.justWalked) { p.turnDelay = 6; return; }   // tap = just turn around
    }
    if (p.turnDelay > 0) { p.turnDelay--; return; }
    const nx = p.tx + DIRS[d][0], ny = p.ty + DIRS[d][1];
    if (!SOLID.has(this.tileAt(nx, ny))) { p.moving = true; p.offset = 0; p.steps++; }
  },

  onStep() {
    const p = this.player;
    const warp = this.map.warps[`${p.tx},${p.ty}`];
    if (warp) { warpTo(warp); return true; }
    this.stepsSinceBattle++;
    if (this.tileAt(p.tx, p.ty) !== 'B') return false;
    this.rustles.push({ x: p.tx, y: p.ty, t: 0 });
    const species = this.stepsSinceBattle > 2 && rollEncounter(this.map.encounters);
    if (species) {
      this.stepsSinceBattle = 0;
      startEncounter(species);
      return true;
    }
    return false;
  },

  interact() {
    const p = this.player;
    const tile = this.tileAt(p.tx + DIRS[p.dir][0], p.ty + DIRS[p.dir][1]);
    if (tile === 'S') this.say(this.map.sign);
    if (tile === 'D') this.runner.run(this.centerVisit());
  },

  *centerVisit() {
    this.showWallet = true;
    yield* textBox.say(`Tervetuloa ${CENTER_NAME}an!`);
    while (true) {
      textBox.show('Miten voin auttaa?');
      const c = yield* menuBox.choose(['PARANNA', 'OSTA PALLO', 'TIIMI', 'POISTU'], 146, 54, 90);
      if (c === 0) {
        textBox.hide();
        yield* flashScreen(2);
        healParty();
        yield* textBox.say('Otuksesi ovat taas täysissä voimissa!');
      } else if (c === 1) {
        if (game.coins < BALL_PRICE) {
          yield* textBox.say(`${BALL_NAME} maksaa ${BALL_PRICE} kolikkoa. Sinulla on vain ${game.coins}.`);
          continue;
        }
        textBox.show(`Ostatko ${BALL_NAME}N ${BALL_PRICE} kolikolla?`);
        const yes = yield* menuBox.choose(['KYLLÄ', 'EI'], 176, 78, 60);
        if (yes === 0) {
          game.coins -= BALL_PRICE;
          game.balls++;
          yield* textBox.say(`Ostit ${BALL_NAME}N! Sillä voi napata villejä otuksia.`);
        }
      } else if (c === 2) {
        textBox.show('Kuka johtaa tiimiä?');
        const opts = game.party.map(m => `${m.name}${m.shiny ? '★' : ''} LV${m.level} ${m.hp}/${m.maxHp}`);
        const i = yield* menuBox.choose(opts, 40, 8, 160);
        if (i > 0) {
          const [m] = game.party.splice(i, 1);
          game.party.unshift(m);
          yield* textBox.say(`${m.name} johtaa nyt tiimiä.`);
        }
      } else {
        break;
      }
    }
    textBox.hide();
    yield* textBox.say('Tervetuloa uudelleen!');
    this.showWallet = false;
  },

  draw() {
    const m = this.map, p = this.player, tiles = IMG[m.tiles];
    const px = p.tx * TILE + (p.moving ? DIRS[p.dir][0] * p.offset : 0);
    const py = p.ty * TILE + (p.moving ? DIRS[p.dir][1] * p.offset : 0);
    const camX = Math.round(clamp(px + 8 - W / 2, 0, m.w * TILE - W));
    const camY = Math.round(clamp(py + 8 - H / 2, 0, m.h * TILE - H));
    const x0 = Math.floor(camX / TILE), y0 = Math.floor(camY / TILE);
    const y1 = y0 + Math.ceil(H / TILE) + 1, x1 = x0 + Math.ceil(W / TILE);

    // ground layer
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const ch = this.tileAt(tx, ty);
        const sx = tx * TILE - camX, sy = ty * TILE - camY;
        if (ch === 'T') {
          if (this.tileAt(tx, ty + 1) === 'T') { ctx.fillStyle = m.shade; ctx.fillRect(sx, sy, TILE, TILE); }
          else drawFrame(tiles, 0, 16, 16, sx, sy);
          continue;
        }
        const rustle = ch === 'B' && this.rustles.find(r => r.x === tx && r.y === ty);
        if (rustle) { drawFrame(IMG[m.rustle], Math.floor(rustle.t / 6) % 3, 16, 16, sx, sy); continue; }
        let idx = TILE_INDEX[ch];
        if (ch === '*') idx = 3 + (Math.floor(this.t / 40) % 2);
        if (ch === 'M') idx = 7 + (Math.floor((this.t + tx * 13) / 36) % 2);
        drawFrame(tiles, idx, 16, 16, sx, sy);
      }
    }

    // objects, row by row so lower things overlap higher ones
    const playerRow = Math.floor((py + 8) / TILE);
    for (let ty = y0 - 1; ty <= y1 + 1; ty++) {
      if (ty < 0 || ty >= m.h) continue;
      for (const x of m.treeRows[ty]) {
        if (x - camX < -16 || x - camX > W) continue;
        const v = ((x >> 3) * 7 + ty * 3) % 3 === 0 ? TREE_B : TREE_A;
        drawFrame(tiles, v, 16, 16, x - camX, ty * TILE - TREE_LIFT - camY);
      }
      if (m.center && ty === m.center.y + 2) ctx.drawImage(IMG.center, m.center.x * TILE - camX, m.center.y * TILE - camY);
      if (ty === playerRow) this.drawPlayer(px - camX, py - camY, camX, camY);
    }

    if (m.glow) this.drawGlow();

    if (this.banner) this.drawBanner();
    if (this.showWallet) {
      drawBox(4, 4, 92, 30);
      drawText(ctx, 'KOLIKOT', 10, 9); drawTextRight(ctx, String(game.coins), 90, 9);
      drawText(ctx, 'PALLOT', 10, 21); drawTextRight(ctx, String(game.balls), 90, 21);
    }
    textBox.draw();
    menuBox.draw();
  },

  // floating glowing specks (HYUJAL METSÄ)
  drawGlow() {
    ctx.fillStyle = 'rgba(30,0,70,0.16)';
    ctx.fillRect(0, 0, W, H);
    const t = this.t;
    for (let i = 0; i < 26; i++) {
      const x = ((i * 53 + t * (0.15 + (i % 3) * 0.08) + Math.sin(t / 70 + i) * 14) % (W + 20) + W + 20) % (W + 20) - 10;
      const y = ((i * 37 - t * (0.1 + (i % 4) * 0.05) + Math.cos(t / 55 + i * 2) * 10) % (H + 20) + H + 20) % (H + 20) - 10;
      ctx.globalAlpha = 0.45 + 0.55 * Math.abs(Math.sin(t / 30 + i));
      ctx.fillStyle = i % 2 ? '#9fe3ff' : '#e3b5ff';
      ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
      if (i % 5 === 0) { ctx.globalAlpha *= 0.4; ctx.fillRect(Math.round(x) - 1, Math.round(y), 3, 1); ctx.fillRect(Math.round(x), Math.round(y) - 1, 1, 3); }
    }
    ctx.globalAlpha = 1;
  },

  // area name that slides in from the top for a moment
  drawBanner() {
    const b = this.banner, w = textWidth(b.text) * 2 + 24;
    const k = b.t < 15 ? b.t / 15 : b.t > 150 ? 1 - (b.t - 150) / 20 : 1;
    const y = Math.round(-30 + 36 * k);
    drawBox(W / 2 - w / 2, y, w, 26);
    drawTextCenter(ctx, b.text, W / 2, y + 6, '#283040', 2);
  },

  drawPlayer(sx, sy, camX, camY) {
    const p = this.player;
    const col = p.moving && p.offset < 8 ? (p.steps % 2 ? 1 : 2) : 0;
    drawFrame(IMG.player, DIR_ROW[p.dir] * 3 + col, 16, 16, sx, sy - 4);
    // front leaves of the bush the player stands in
    const px = sx + camX, py = sy + camY;
    const cover = (p.moving && (p.dir === 'left' || p.dir === 'right'))
      ? [[p.tx, p.ty], [p.tx + DIRS[p.dir][0], p.ty]]
      : [[Math.floor((px + 8) / TILE), Math.floor((py + 8) / TILE)]];
    for (const [tx, ty] of cover) {
      if (this.tileAt(tx, ty) === 'B') drawFrame(IMG[this.map.tiles], BUSH_FRONT, 16, 16, tx * TILE - camX, ty * TILE - camY);
    }
  },
};

// walk through an exit into another map (fade out -> switch -> fade in, then show the area name)
function warpTo(w) {
  game.locked = true;
  game.runner.run((function* () {
    yield* tween(14, k => { game.fade = k; });
    overworld.enterMap(w.to, w.x, w.y, w.dir);
    overworld.stepsSinceBattle = 0;
    clearPressed();
    game.locked = false;
    yield* tween(14, k => { game.fade = 1 - k; });
    game.fade = 0;
  })());
}
