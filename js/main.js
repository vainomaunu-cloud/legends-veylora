// ---------- Game: scenes, transitions, main loop ----------
const game = {
  view: 'loading',      // what is drawn & updated: title | overworld | battle
  locked: false,        // true while a transition plays
  party: [],            // the player's team (max 6), first one leads
  coins: 0,
  balls: 0,
  greatBalls: 0,
  ultraBalls: 0,
  masterBalls: 0,
  caught: [],           // species caught at least once (KOKOELMA)
  pc: [],               // creatures stored in the HOITOLA PC
  shinyCharm: false,
  beastCharm: false,    // every ULTRA PETO caught: shiny ULTRA PEDOT 1/125
  regisCaught: [],      // regis caught from their pedestals (they don't come back)
  shards: [],           // REGI SHARDs picked up (ids of the maps they lay on)
  shardsGiven: false,   // the shards were given to the WORMHOLE KEEPER: the wormhole is open
  runner: new Runner(), // transitions
  fade: 0, wipe: 0, white: 0, t: 0,
};

function* flashScreen(times) {
  for (let i = 0; i < times; i++) { game.white = 1; yield* wait(4); game.white = 0; yield* wait(4); }
}

// wild creature levels per area (min, max), no matter how strong your own team is
const WILD_LEVELS = {
  forest: [2, 9],     // PUSKAMETSÄ
  hyujal: [6, 14],    // HYUJAL METSÄ
  sea: [9, 18],       // SAARIMERI (beach, palms and fishing)
  snow: [18, 26],     // SNOW MOUNTAIN
  town: [3, 10],      // VEYLORAN KYLÄ
  farm: [4, 12],      // MAATILA (corn field)
  space: [30, 40],    // MADONREIKÄ (ULTRA PEDOT)
};

function wildLevel() {
  const [lo, hi] = WILD_LEVELS[overworld.map.id] || WILD_LEVELS.forest;
  return rnd(lo, hi);
}

// opts: { level, regi, enemy, shiny } (see battle.start)
function startEncounter(species = 'amperite', from = 'bush', opts = {}) {
  game.locked = true;
  game.runner.run((function* () {
    music.play('battle');
    yield* flashScreen(3);
    yield* tween(24, k => { game.wipe = k; });
    battle.start(species, opts.level || wildLevel(), from, opts);
    game.view = 'battle';
    game.locked = false;
    yield* tween(16, k => { game.wipe = 1 - k; });
    game.wipe = 0;
  })());
}

function endBattle(result) {
  game.locked = true;
  game.runner.run((function* () {
    yield* tween(20, k => { game.fade = k; });
    if (result === 'lose') { healParty(); overworld.respawnAtCenter(); }
    overworld.stepsSinceBattle = 0;
    textBox.hide();
    clearPressed();
    game.view = 'overworld';
    game.locked = false;
    music.play(overworld.map.music);
    if (result === 'lose') overworld.say(`Otuksesi lepäsivät ${CENTER_NAME}ssa ja ovat taas täysissä voimissa.`);
    yield* tween(20, k => { game.fade = 1 - k; });
    game.fade = 0;
    saveGame.save(true);
  })());
}

// a brand new game: DUCKONDA (only obtainable here), 1 in 10 is shiny
// older games stay saved; this one gets its own name in the list
function newGame(name = saveGame.defaultName()) {
  saveGame.create(name);
  const starter = makeMon('duckonda', 5);
  starter.shiny = Math.random() < SPECIES.duckonda.shinyChance;
  game.party = [starter];
  game.coins = 0; game.balls = 0; game.greatBalls = 0; game.ultraBalls = 0; game.masterBalls = 0;
  game.caught = []; game.shinyCharm = false; game.beastCharm = false; game.pc = [];
  game.regisCaught = []; game.shards = []; game.shardsGiven = false;
  overworld.init();
  startGame();
}

// continue one of the games saved in this browser
function continueGame(slot) {
  game.locked = true;
  saveGame.use(slot);
  game.runner.run((function* () {
    yield* tween(20, k => { game.fade = k; });
    if (!saveGame.apply(slot.data)) { game.locked = false; game.fade = 0; newGame(); return; }
    music.play(overworld.map.music);
    game.view = 'overworld';
    game.locked = false;
    yield* tween(20, k => { game.fade = 1 - k; });
    game.fade = 0;
  })());
}

function startGame() {
  game.locked = true;
  game.runner.run((function* () {
    music.play('overworld');
    yield* tween(20, k => { game.fade = k; });
    game.view = 'overworld';
    game.locked = false;
    saveGame.save();
    const starter = game.party[0];
    overworld.say(`Tervetuloa Puskametsään! Kumppanisi on DUCKONDA.` +
      (starter.shiny ? ' Vau, se on KIILTÄVÄ! Sellainen on vain joka kymmenennellä.' : '') +
      ` Kävele puskissa, niin villejä otuksia hyppää esiin. Voitoista saa kolikoita, ja ${CENTER_NAME}sta voi ostaa palloja otusten nappaamiseen.`);
    yield* tween(20, k => { game.fade = 1 - k; });
    game.fade = 0;
  })());
}

// ---------- Title screen ----------
// modes: 'main' (JATKA / UUSI PELI), 'list' (pick a game), 'slot' (JATKA / NIMEÄ / POISTA / TAKAISIN),
// 'delete' (are you sure?), 'naming' (the name dialog is open)
const TITLE_PER_PAGE = 4;
const SLOT_OPTIONS = ['JATKA', 'NIMEÄ', 'POISTA', 'TAKAISIN'];
const shortDate = t => { const d = new Date(t); return `${d.getDate()}.${d.getMonth() + 1}. ${clockTime(t)}`; };

const title = {
  mode: 'main',
  index: 0,          // main menu / slot menu / delete cursor
  pick: 0,           // selected game in the list
  games: [],
  enter() { this.refresh(); this.mode = 'main'; this.index = 0; this.pick = 0; },
  refresh() {
    this.games = saveGame.list();
    if (this.pick >= this.games.length) this.pick = Math.max(0, this.games.length - 1);
  },
  startNew() {
    this.mode = 'naming'; this.namingFrom = 'main';
    askName('Anna uudelle pelille nimi', saveGame.defaultName(), name => {
      if (name) newGame(name); else this.mode = 'main';
    });
  },
  update() {
    const m = this.mode, g = this.games[this.pick];
    if (m === 'naming') return;
    if (m === 'main') {
      if (!this.games.length) { if (take('a')) this.startNew(); return; }
      if (take('up') || take('down')) this.index ^= 1;
      if (take('a')) {
        if (this.index === 1) this.startNew();
        else { this.mode = 'list'; this.pick = 0; }
      }
    } else if (m === 'list') {
      const n = this.games.length;
      if (take('up')) this.pick = (this.pick + n - 1) % n;
      if (take('down')) this.pick = (this.pick + 1) % n;
      if (take('left')) this.pick = Math.max(0, this.pick - TITLE_PER_PAGE);
      if (take('right')) this.pick = Math.min(n - 1, this.pick + TITLE_PER_PAGE);
      if (take('b')) { this.mode = 'main'; this.index = 0; }
      if (take('a')) { this.mode = 'slot'; this.index = 0; }
    } else if (m === 'slot') {
      if (take('up')) this.index = (this.index + 3) % 4;
      if (take('down')) this.index = (this.index + 1) % 4;
      if (take('b')) { this.mode = 'list'; return; }
      if (take('a')) {
        if (this.index === 0) continueGame(g);
        else if (this.index === 1) {
          this.mode = 'naming'; this.namingFrom = 'slot';
          askName('Uusi nimi pelille', g.name, name => {
            if (name) saveGame.rename(g.id, name);
            this.refresh(); this.mode = 'slot';
          });
        } else if (this.index === 2) { this.mode = 'delete'; this.index = 1; }   // default to EI
        else this.mode = 'list';
      }
    } else if (m === 'delete') {
      if (take('left') || take('right') || take('up') || take('down')) this.index ^= 1;
      if (take('b')) { this.mode = 'slot'; this.index = 2; return; }
      if (take('a')) {
        if (this.index === 0) {
          saveGame.remove(g.id);
          this.refresh();
          this.mode = this.games.length ? 'list' : 'main';
          this.index = 0;
        } else { this.mode = 'slot'; this.index = 2; }
      }
    }
  },
  draw() {
    // the title picture (96x48) at 3x: sky above it, centred so both side creatures show
    ctx.fillStyle = '#aeecec';
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(IMG.titleArt, 0, 0, 96, 48, (W - 288) / 2, H - 144, 288, 144);
    drawTextCenter(ctx, 'LEGENDS', W / 2 + 1, 5, '#2a1e4a', 1);
    drawTextCenter(ctx, 'LEGENDS', W / 2, 4, '#ffffff', 1);
    drawTextCenter(ctx, 'VEYLORA', W / 2 + 2, 14, '#2a1e4a', 3);
    drawTextCenter(ctx, 'VEYLORA', W / 2, 12, '#f4df1a', 3);
    if (['list', 'slot', 'delete'].includes(this.mode) || (this.mode === 'naming' && this.namingFrom === 'slot')) {
      this.drawList();
      return;
    }
    if (this.games.length) {
      drawBox(36, 110, 168, 44);
      drawText(ctx, 'JATKA', 86, 116); drawText(ctx, 'UUSI PELI', 86, 130);
      drawText(ctx, '►', 76, 116 + this.index * 14, '#e04838');
      const n = this.games.length;
      drawTextCenter(ctx, `${n} ${n === 1 ? 'PELI' : 'PELIÄ'} TALLESSA`, W / 2, 143, '#586070');
    } else if (Math.floor(game.t / 30) % 2 === 0) {
      drawBox(W / 2 - 34, 122, 68, 17);
      drawTextCenter(ctx, document.body.classList.contains('touch') ? 'PAINA A' : 'PAINA Z', W / 2, 127);
    }
  },

  // the list of saved games, with the game menu / delete question on top
  drawList() {
    drawBox(6, 4, 228, 152);
    drawTextCenter(ctx, 'VALITSE PELI', W / 2, 10, '#c07020');
    const n = this.games.length, page = Math.floor(this.pick / TITLE_PER_PAGE), pages = Math.ceil(n / TITLE_PER_PAGE);
    for (let r = 0; r < TITLE_PER_PAGE; r++) {
      const i = page * TITLE_PER_PAGE + r, g = this.games[i];
      if (!g) break;
      const y = 24 + r * 28;
      if (i === this.pick) {
        ctx.fillStyle = '#e8ecf4'; ctx.fillRect(12, y - 3, 216, 25);
        drawText(ctx, '►', 15, y + 4, '#e04838');
      }
      drawText(ctx, g.name, 26, y);
      drawTextRight(ctx, shortDate(g.data.time), 224, y, '#8890a0');
      drawText(ctx, saveGame.summary(g.data), 26, y + 11, '#586070');
    }
    drawTextCenter(ctx, pages > 1 ? `SIVU ${page + 1}/${pages}  (VASEN/OIKEA)` : 'B: TAKAISIN', W / 2, 140, '#8890a0');
    if (this.mode === 'slot' || (this.mode === 'naming')) {
      // beside the chosen game, on the right where its date is
      const r = this.pick % TITLE_PER_PAGE, by = r < 2 ? 24 + r * 28 + 22 : 24 + r * 28 - 60;
      drawBox(156, by, 72, 58);
      SLOT_OPTIONS.forEach((s, i) => drawText(ctx, s, 170, by + 6 + i * 12, i === 2 ? '#c03828' : '#283040'));
      drawText(ctx, '►', 161, by + 6 + this.index * 12, '#e04838');
    } else if (this.mode === 'delete') {
      const g = this.games[this.pick];
      drawBox(20, 54, 200, 54);
      drawTextCenter(ctx, `POISTETAANKO ${g.name}?`, W / 2, 60);
      drawTextCenter(ctx, 'SITÄ EI VOI PALAUTTAA.', W / 2, 72, '#c03828');
      drawText(ctx, 'KYLLÄ', 84, 90); drawText(ctx, 'EI', 138, 90);
      drawText(ctx, '►', this.index === 0 ? 76 : 130, 90, '#e04838');
    }
  },
};

const SCENES = { title, overworld, battle };

function update() {
  game.t++;
  if (!game.locked && SCENES[game.view]) SCENES[game.view].update();
  game.runner.update();
  clearPressed();
  // quiet autosave every 10 seconds while walking around
  if (game.t % 600 === 0 && !overworld.runner.busy) saveGame.save();
  if (saveGame.flash > 0) saveGame.flash--;
}

function render() {
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  if (SCENES[game.view]) SCENES[game.view].draw();
  if (game.wipe > 0) {
    ctx.fillStyle = '#101018';
    for (let i = 0; i < 8; i++) {   // shutter bars closing from both sides
      const y = i * (H / 8);
      const w = Math.round(W * game.wipe);
      if (i % 2) ctx.fillRect(W - w, y, w, H / 8); else ctx.fillRect(0, y, w, H / 8);
    }
  }
  if (saveGame.flash > 0 && game.view === 'overworld' && !textBox.visible) {
    const w = textWidth('TALLENNETTU') + 12;
    drawBox(W - w - 4, H - 19, w, 15);
    drawText(ctx, 'TALLENNETTU', W - w + 2, H - 15, '#2f8a3a');
  }
  if (game.fade > 0) { ctx.fillStyle = `rgba(0,0,0,${game.fade})`; ctx.fillRect(0, 0, W, H); }
  if (game.white > 0) { ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(0, 0, W, H); }
}

const STEP = 1000 / 60;
let lastTime = 0, acc = 0;
function frame(now) {
  acc += Math.min(250, now - lastTime);
  lastTime = now;
  while (acc >= STEP) { update(); acc -= STEP; }
  render();
  requestAnimationFrame(frame);
}

function showError(msg) { document.getElementById('error').textContent = msg; }
addEventListener('error', e => showError('Virhe: ' + e.message));

loadAssets().then(() => {
  overworld.init();
  title.enter();
  game.view = 'title';
  lastTime = performance.now();
  requestAnimationFrame(frame);
}).catch(err => showError(err.message + '\nAvaa index.html samasta kansiosta, jossa moi.png ja sprites-kansio ovat.'));
