// ---------- Game: scenes, transitions, main loop ----------
const game = {
  view: 'loading',      // what is drawn & updated: title | overworld | battle
  locked: false,        // true while a transition plays
  party: [],            // the player's team (max 6), first one leads
  coins: 0,
  balls: 0,
  runner: new Runner(), // transitions
  fade: 0, wipe: 0, white: 0, t: 0,
};

function* flashScreen(times) {
  for (let i = 0; i < times; i++) { game.white = 1; yield* wait(4); game.white = 0; yield* wait(4); }
}

function startEncounter(species = 'amperite') {
  game.locked = true;
  game.runner.run((function* () {
    music.play('battle');
    yield* flashScreen(3);
    yield* tween(24, k => { game.wipe = k; });
    const L = lead().level;
    battle.start(species, Math.max(2, rnd(L - 2, L)));
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
    music.play('overworld');
    if (result === 'lose') overworld.say(`Otuksesi lepäsivät ${CENTER_NAME}ssa ja ovat taas täysissä voimissa.`);
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
    const starter = game.party[0];
    overworld.say(`Tervetuloa Puskametsään! Kumppanisi on DUCKONDA.` +
      (starter.shiny ? ' Vau, se on KIILTÄVÄ! Sellainen on vain joka kymmenennellä.' : '') +
      ` Kävele puskissa, niin villejä otuksia hyppää esiin. Voitoista saa kolikoita, ja ${CENTER_NAME}sta voi ostaa palloja otusten nappaamiseen.`);
    yield* tween(20, k => { game.fade = 1 - k; });
    game.fade = 0;
  })());
}

// ---------- Title screen ----------
const title = {
  update() { if (take('a')) startGame(); },
  draw() {
    for (let y = 0; y < H; y += TILE) for (let x = 0; x < W; x += TILE) {
      const edge = y === 0 || y >= H - TILE;
      drawFrame(IMG.tiles, edge ? 5 : ((x * 7 + y * 3) % 5 === 0 ? 1 : 0), 16, 16, x, y);
    }
    drawTextCenter(ctx, 'LEGENDS', W / 2 + 1, 21, '#1e4a22', 1);
    drawTextCenter(ctx, 'LEGENDS', W / 2, 20, '#ffffff', 1);
    drawTextCenter(ctx, 'VEYLORA', W / 2 + 2, 32, '#1e4a22', 3);
    drawTextCenter(ctx, 'VEYLORA', W / 2, 30, '#f4df1a', 3);
    fillEllipse(W / 2, 108, 30, 6, 'rgba(30,74,34,0.35)');
    const bob = Math.floor(game.t / 30) % 2;
    ctx.drawImage(IMG.moi, 0, 0, 32, 32, W / 2 - 32, 50 + bob, 64, 64);
    if (Math.floor(game.t / 30) % 2 === 0) {
      drawBox(W / 2 - 34, 122, 68, 17);
      drawTextCenter(ctx, 'PAINA Z', W / 2, 127);
    }
  },
};

const SCENES = { title, overworld, battle };

function update() {
  game.t++;
  if (!game.locked && SCENES[game.view]) SCENES[game.view].update();
  game.runner.update();
  clearPressed();
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
  // starter: DUCKONDA (only obtainable here), 1 in 10 is shiny
  const starter = makeMon('duckonda', 5);
  starter.shiny = Math.random() < SPECIES.duckonda.shinyChance;
  game.party = [starter];
  overworld.init();
  game.view = 'title';
  lastTime = performance.now();
  requestAnimationFrame(frame);
}).catch(err => showError(err.message + '\nAvaa index.html samasta kansiosta, jossa moi.png ja sprites-kansio ovat.'));
