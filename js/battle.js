// ---------- Species, moves ----------
const SPECIES = {
  amperite: {
    name: 'AMPERITE',
    base: { hp: 39, atk: 45, def: 40, spa: 50, spd: 45, spe: 65 },
    moves: ['electroball', 'tackle'],
    xpYield: 50,
    coins: 25,
    catchRate: 0.7,
    evolveAt: 8, evolveTo: 'ampereem',
    feetY: 6,   // sprite's feet are 3 px higher than AMPEREEM's -> push it down 6 px (2x) onto the platform
    sprites: { front: 'amperite', blink: 'amperiteBlink', hurt: 'amperiteHurt', attack: 'amperiteAttack', back: 'amperiteBack', backAttack: 'amperiteBackAttack' },
  },
  ampereem: {
    name: 'AMPEREEM',
    base: { hp: 60, atk: 65, def: 55, spa: 85, spd: 65, spe: 85 },
    moves: ['thunderbolt', 'electroball', 'tackle'],
    xpYield: 120,
    coins: 50,
    catchRate: 0.35,
    sprites: { front: 'moi', blink: 'moiBlink', hurt: 'moiHurt', attack: 'moiAttack', back: 'moiBack', backAttack: 'moiBackAttack' },
  },
  zubug: {
    name: 'ZUBUG',
    base: { hp: 40, atk: 45, def: 35, spa: 55, spd: 40, spe: 60 },
    moves: ['bugbuzz', 'stickyweb'],
    xpYield: 55,
    coins: 25,
    catchRate: 0.7,
    evolveAt: 10, evolveTo: 'golbug',
    feetY: 10,
    sprites: { front: 'zubug', blink: 'zubugBlink', hurt: 'zubugHurt', attack: 'zubugAttack', back: 'zubugBack', backAttack: 'zubugBackAttack' },
  },
  golbug: {
    name: 'GOLBUG',
    base: { hp: 65, atk: 70, def: 60, spa: 80, spd: 60, spe: 75 },
    moves: ['airslash', 'bugbuzz', 'stickyweb'],
    xpYield: 125,
    coins: 50,
    catchRate: 0.35,
    feetY: 8,
    sprites: { front: 'golbug', blink: 'golbugBlink', hurt: 'golbugHurt', attack: 'golbugAttack', back: 'golbugBack', backAttack: 'golbugBackAttack' },
  },
  squishroom: {
    name: 'SQUISHROOM',
    base: { hp: 55, atk: 45, def: 50, spa: 60, spd: 55, spe: 50 },
    moves: ['mudshot', 'fairywind', 'gigadrain'],
    xpYield: 70,
    coins: 30,          // for winning
    catchCoins: 30,     // for catching
    catchRate: 0.5,
    feetY: 10,
    sprites: { front: 'squishroom', blink: 'squishroomBlink', hurt: 'squishroomHurt', attack: 'squishroomAttack', back: 'squishroomBack', backAttack: 'squishroomBackAttack' },
  },
  shroocid: {
    name: 'SHROOCID',
    base: { hp: 60, atk: 70, def: 60, spa: 65, spd: 55, spe: 45 },
    moves: ['poisonjab', 'ironhead', 'sludgewave'],
    xpYield: 75,
    coins: 20,          // for winning
    catchCoins: 20,     // for catching
    catchRate: 0.5,
    feetY: 6,
    sprites: { front: 'shroocid', blink: 'shroocidBlink', hurt: 'shroocidHurt', attack: 'shroocidAttack', back: 'shroocidBack', backAttack: 'shroocidBackAttack' },
  },
  // HYUJAL METSÄ bushes
  psistiel: {
    name: 'PSISTIEL',
    base: { hp: 55, atk: 60, def: 50, spa: 85, spd: 65, spe: 75 },
    moves: ['psistrike', 'psychic', 'ironhead'],
    xpYield: 80, coins: 30, catchRate: 0.45, feetY: 0,
    evolveAt: 20, evolveTo: 'psiduocipe',
    sprites: { front: 'psistiel', blink: 'psistielBlink', hurt: 'psistielHurt', attack: 'psistielAttack', back: 'psistielBack', backAttack: 'psistielBackAttack' },
  },
  // PSISTIEL evolves at level 20 (and learns PSYCHO CUT); also 5 % in HYUJAL METSÄ bushes
  psiduocipe: {
    name: 'PSIDUOCIPE',
    base: { hp: 75, atk: 90, def: 70, spa: 110, spd: 85, spe: 95 },
    moves: ['psychocut', 'psistrike', 'psychic', 'ironhead'],
    xpYield: 165, coins: 55, catchRate: 0.25, feetY: 0,
    sprites: { front: 'psiduocipe', blink: 'psiduocipeBlink', hurt: 'psiduocipeHurt', attack: 'psiduocipeAttack', back: 'psiduocipeBack', backAttack: 'psiduocipeBackAttack' },
  },
  // SAARIMERI fishing
  algish: {
    name: 'ALGISH',
    base: { hp: 45, atk: 50, def: 45, spa: 40, spd: 45, spe: 55 },
    moves: ['poisonjab', 'sleeppowder'],
    xpYield: 55, coins: 25, catchRate: 0.7,
    evolveAt: 12, evolveTo: 'serpenalge',
    feetY: 4,
    sprites: { front: 'algish', blink: 'algishBlink', hurt: 'algishHurt', attack: 'algishAttack', back: 'algishBack', backAttack: 'algishBackAttack' },
  },
  serpenalge: {
    name: 'SERPENALGE',
    base: { hp: 70, atk: 80, def: 60, spa: 70, spd: 60, spe: 70 },
    moves: ['crunch', 'flamethrower', 'poisonjab', 'sleeppowder'],
    xpYield: 130, coins: 50, catchRate: 0.35, feetY: -2,
    sprites: { front: 'serpenalge', blink: 'serpenalgeBlink', hurt: 'serpenalgeHurt', attack: 'serpenalgeAttack', back: 'serpenalgeBack', backAttack: 'serpenalgeBackAttack' },
  },
  moonorg: {
    name: 'MOONORG',
    base: { hp: 60, atk: 70, def: 55, spa: 75, spd: 55, spe: 60 },
    moves: ['darkpulse', 'crunch', 'poisonjab'],
    xpYield: 90, coins: 35, catchRate: 0.45, feetY: -2,
    sprites: { front: 'moonorg', blink: 'moonorgBlink', hurt: 'moonorgHurt', attack: 'moonorgAttack', back: 'moonorgBack', backAttack: 'moonorgBackAttack' },
  },
  // SNOW MOUNTAIN bushes (files: binchulin.png, overchill.png, underchill.png)
  binchulin: {
    name: 'BINCHULCIN',
    base: { hp: 45, atk: 45, def: 45, spa: 55, spd: 45, spe: 50 },
    moves: ['icecreamthrow', 'blizzard'],
    xpYield: 55, coins: 15, catchRate: 0.7,
    evolveAt: 9, evolveTo: 'overchill',
    feetY: 14,
    sprites: { front: 'binchulin', blink: 'binchulinBlink', hurt: 'binchulinHurt', attack: 'binchulinAttack', back: 'binchulinBack', backAttack: 'binchulinBackAttack' },
  },
  overchill: {
    name: 'OVERCHILL',
    base: { hp: 60, atk: 65, def: 60, spa: 70, spd: 60, spe: 60 },
    moves: ['icefang', 'icecreamthrow', 'blizzard'],
    xpYield: 100, coins: 35, catchRate: 0.45,
    evolveAt: 16, evolveTo: 'underchill',
    feetY: 4,
    sprites: { front: 'overchill', blink: 'overchillBlink', hurt: 'overchillHurt', attack: 'overchillAttack', back: 'overchillBack', backAttack: 'overchillBackAttack' },
  },
  underchill: {
    name: 'UNDERCHILL',
    base: { hp: 80, atk: 85, def: 75, spa: 85, spd: 70, spe: 65 },
    moves: ['ironhead', 'icefang', 'icecreamthrow', 'blizzard'],
    xpYield: 170, coins: 55, catchRate: 0.25, feetY: 2,
    sprites: { front: 'underchill', blink: 'underchillBlink', hurt: 'underchillHurt', attack: 'underchillAttack', back: 'underchillBack', backAttack: 'underchillBackAttack' },
  },
  // SAARIMERI: sits on top of beach palms, bump into the palm to fight it
  hummird: {
    name: 'HUMMIRD',
    base: { hp: 45, atk: 55, def: 40, spa: 50, spd: 40, spe: 80 },
    moves: ['airslash', 'tackle'],
    xpYield: 60, coins: 20, catchRate: 0.6,
    evolveAt: 14, evolveTo: 'hummirding',
    feetY: 2,
    sprites: { front: 'hummird', blink: 'hummirdBlink', hurt: 'hummirdHurt', attack: 'hummirdAttack', back: 'hummirdBack', backAttack: 'hummirdBackAttack' },
  },
  // only by evolving HUMMIRD (never sits on the palms)
  hummirding: {
    name: 'HUMMIRDING',
    base: { hp: 65, atk: 80, def: 60, spa: 75, spd: 60, spe: 105 },
    moves: ['twister', 'airslash', 'tackle'],
    xpYield: 130, coins: 45, catchRate: 0.3, feetY: 16,
    evolveOnly: true,   // not needed for the SHINY CHARM (it can't be caught in the wild)
    sprites: { front: 'hummirding', blink: 'hummirdingBlink', hurt: 'hummirdingHurt', attack: 'hummirdingAttack', back: 'hummirdingBack', backAttack: 'hummirdingBackAttack' },
  },
  // the starter: never appears in bushes, 1 in 10 is shiny
  duckonda: {
    name: 'DUCKONDA',
    base: { hp: 50, atk: 55, def: 45, spa: 65, spd: 50, spe: 60 },
    moves: ['firespin', 'flamethrower', 'flametornado'],
    xpYield: 65,
    coins: 0,
    catchRate: 0,
    shinyChance: 1 / 10,
    feetY: 8,
    sprites: { front: 'duckonda', blink: 'duckondaBlink', hurt: 'duckondaHurt', attack: 'duckondaAttack', back: 'duckondaBack', backAttack: 'duckondaBackAttack' },
  },
};

const MOVES = {
  thunderbolt: { id: 'thunderbolt', name: 'THUNDERBOLT', power: 90, acc: 100, pp: 10, special: true, paralyze: 0.1, anim: 'thunder' },
  electroball: { id: 'electroball', name: 'ELECTROBALL', power: 60, powerText: '40-150', acc: 100, pp: 20, special: true, anim: 'electro' },
  tackle: { id: 'tackle', name: 'TACKLE', power: 40, acc: 95, pp: 35, special: false, anim: 'tackle' },
  bugbuzz: { id: 'bugbuzz', name: 'BUG BUZZ', power: 90, acc: 100, pp: 10, special: true, anim: 'buzz' },
  stickyweb: { id: 'stickyweb', name: 'STICKY WEB', power: 0, powerText: '-', acc: 95, pp: 20, special: true, slow: true, anim: 'web' },
  airslash: { id: 'airslash', name: 'AIR SLASH', power: 75, acc: 95, pp: 15, special: true, flinch: 0.3, anim: 'slash' },
  mudshot: { id: 'mudshot', name: 'MUD SHOT', power: 55, acc: 95, pp: 15, special: true, slowAfter: true, anim: 'mud' },
  fairywind: { id: 'fairywind', name: 'FAIRY WIND', power: 40, acc: 100, pp: 30, special: true, anim: 'fairy' },
  gigadrain: { id: 'gigadrain', name: 'GIGA DRAIN', power: 75, acc: 100, pp: 10, special: true, drain: 0.5, anim: 'drain' },
  poisonjab: { id: 'poisonjab', name: 'POISON JAB', power: 80, acc: 100, pp: 20, special: false, poison: 0.3, anim: 'jab' },
  ironhead: { id: 'ironhead', name: 'IRON HEAD', power: 80, acc: 100, pp: 15, special: false, flinch: 0.3, anim: 'iron' },
  sludgewave: { id: 'sludgewave', name: 'SLUDGE WAVE', power: 95, acc: 100, pp: 10, special: true, poison: 0.1, anim: 'sludge' },
  firespin: { id: 'firespin', name: 'FIRE SPIN', power: 35, acc: 85, pp: 15, special: true, trap: true, anim: 'firespin' },
  flamethrower: { id: 'flamethrower', name: 'FLAMETHROWER', power: 90, acc: 100, pp: 15, special: true, burn: 0.1, anim: 'flamethrower' },
  flametornado: { id: 'flametornado', name: 'FLAME TORNADO', power: 100, acc: 90, pp: 5, special: true, burn: 0.3, anim: 'flametornado' },
  psistrike: { id: 'psistrike', name: 'PSI STRIKE', power: 100, acc: 100, pp: 10, special: true, anim: 'psistrike' },
  psychic: { id: 'psychic', name: 'PSYCHIC', power: 90, acc: 100, pp: 10, special: true, anim: 'psychic' },
  psychocut: { id: 'psychocut', name: 'PSYCHO CUT', power: 70, acc: 100, pp: 20, special: false, highCrit: true, anim: 'psychocut' },
  crunch: { id: 'crunch', name: 'CRUNCH', power: 80, acc: 100, pp: 15, special: false, anim: 'crunch' },
  darkpulse: { id: 'darkpulse', name: 'DARK PULSE', power: 80, acc: 100, pp: 15, special: true, flinch: 0.2, anim: 'darkpulse' },
  icecreamthrow: { id: 'icecreamthrow', name: 'ICE CREAM THROW', power: 65, acc: 95, pp: 15, special: true, slowChance: 0.3, anim: 'icecream' },
  twister: { id: 'twister', name: 'TWISTER', power: 70, acc: 100, pp: 15, special: true, flinch: 0.2, anim: 'twister' },
  blizzard: { id: 'blizzard', name: 'BLIZZARD', power: 110, acc: 70, pp: 5, special: true, anim: 'blizzard' },
  icefang: { id: 'icefang', name: 'ICE FANG', power: 65, acc: 95, pp: 15, special: false, flinch: 0.1, anim: 'icefang' },
  sleeppowder: { id: 'sleeppowder', name: 'SLEEP POWDER', power: 0, powerText: '-', acc: 75, pp: 15, special: true, sleep: true, anim: 'powder' },
};
// used automatically when every move is out of PP
const STRUGGLE = { name: 'RIMPUILU', power: 35, acc: 100, pp: 0, left: 0, special: false, anim: 'tackle', struggle: true };

const xpForLevel = L => L ** 3;

function calcStats(m) {
  const L = m.level, base = SPECIES[m.species].base;
  m.maxHp = Math.floor(2 * base.hp * L / 100) + L + 10;
  for (const s of ['atk', 'def', 'spa', 'spd', 'spe']) m[s] = Math.floor(2 * base[s] * L / 100) + 5;
}

const newMove = id => ({ ...MOVES[id], left: MOVES[id].pp });

function makeMon(species, level) {
  const sp = SPECIES[species];
  const m = { species, name: sp.name, level, xp: xpForLevel(level), status: null, moves: sp.moves.map(newMove) };
  calcStats(m);
  m.hp = m.maxHp;
  return m;
}

// ELECTROBALL hits harder the faster the user is compared to the target
function movePower(move, att, def) {
  if (move.id !== 'electroball') return move.power;
  const r = speedOf(att) / Math.max(1, speedOf(def));
  return r >= 4 ? 150 : r >= 3 ? 120 : r >= 2 ? 80 : r >= 1 ? 60 : 40;
}

function healMon(m) {
  m.hp = m.maxHp;
  m.status = null;
  m.moves.forEach(mv => { mv.left = mv.pp; });
}

function healParty() {
  for (const m of game.party) healMon(m);
}

function calcDamage(att, def, move) {
  const A = move.special ? att.spa : att.atk * (att.status === 'brn' ? 0.5 : 1);   // burn halves physical attacks
  const D = move.special ? def.spd : def.def;
  let dmg = Math.floor(Math.floor(Math.floor(2 * att.level / 5 + 2) * movePower(move, att, def) * A / D) / 50) + 2;
  const crit = Math.random() < (move.highCrit ? 1 / 8 : 1 / 16);   // PSYCHO CUT crits twice as often
  if (crit) dmg = Math.floor(dmg * 1.5);
  dmg = Math.max(1, Math.floor(dmg * (0.85 + Math.random() * 0.15)));
  return { dmg, crit };
}

// speStage: -1..-3 from STICKY WEB (reset every battle)
const SHINY_CHANCE = 1 / 100;
const SHINY_CHANCE_CHARM = 1 / 75;   // with the SHINY CHARM
const shinyChance = () => (game.shinyCharm ? SHINY_CHANCE_CHARM : SHINY_CHANCE);
// every species that can be caught (the starter can only be chosen, not caught)
const catchableSpecies = () => Object.keys(SPECIES).filter(id => id !== 'duckonda' && !SPECIES[id].evolveOnly);
const FIRE = ['#fff06a', '#ffb43d', '#ff7a2a', '#dd3d3d'];
// shiny creatures use the 'shiny_' version of every sprite
const spriteKey = (mon, key) => (mon.shiny ? 'shiny_' + key : key);

const speedOf =m => m.spe * (m.status === 'par' ? 0.5 : 1) * 2 / (2 - (m.speStage || 0));

// ---------- Battle scene ----------
// battle background colours per map
const BATTLE_BG = {
  forest: { sky: '#e4f2d0', far: '#b2dc98', near: '#95ca7c', ground: '#bfe39a', speck: '#a9d684', platDark: '#7fb85a', plat: '#98cf6c' },
  snow: { sky: '#e8f0fa', far: '#c8d8ea', near: '#a8c0d8', ground: '#f4f8fc', speck: '#d4e0ee', platDark: '#b8c8dc', plat: '#dfeaf5' },
  sea: { sky: '#d6efff', far: '#a6d6f2', near: '#86c4ec', ground: '#62b2e8', speck: '#8ccaf2', platDark: '#cbaa5e', plat: '#f2db9a' },
  hyujal: { sky: '#d8c6f2', far: '#b08ee0', near: '#9470d0', ground: '#b39ae2', speck: '#9f82d6', platDark: '#7a52b8', plat: '#9a78da', glow: true },
};
const FOE_POS = { x: 150, y: 4 };
const ME_POS = { x: 28, y: 48 };

function newVisual(pos) {
  return { x: pos.x, y: pos.y, dx: 0, dy: 0, show: true, pose: 'idle', sink: 0, scale: 1, blink: 0, blinkT: rnd(60, 200), hpShown: 0 };
}

const battle = {
  runner: new Runner(),
  t: 0, shake: 0, flash: 0, dark: 0,
  fx: [], bolt: null, menu: null, result: null,

  start(foeSpecies, foeLevel, from = 'bush') {
    this.from = from;
    this.me = game.party.find(m => m.hp > 0);
    this.foe = makeMon(foeSpecies, foeLevel);
    this.foe.shiny = Math.random() < shinyChance();
    for (const m of game.party) { m.speStage = 0; m.flinch = false; m.trapTurns = 0; }
    this.tint = 0; this.tintRGB = null;
    this.thrown = null; this.parts = null; this.waves = null; this.webFx = null; this.slashes = null;
    this.evo = null;
    this.meV = newVisual(ME_POS);
    this.foeV = newVisual(FOE_POS);
    this.meV.hpShown = this.me.hp;
    this.foeV.hpShown = this.foe.hp;
    this.xpShown = this.me.xp;
    this.trainer = { x: 240, show: true };
    this.showFoeInfo = false; this.showMeInfo = false;
    this.fx = []; this.bolt = null; this.ball = null; this.menu = null; this.result = null;
    this.shake = this.flash = this.dark = 0;
    this.runAttempts = 0;
    this.runner = new Runner();
    this.runner.run(this.main());
  },

  addFx(key, cx, cy, frames, scale = 1) {
    const img = IMG[key], fw = img.height, fh = img.height;
    this.fx.push({ img, fw, fh, frames, t: 0, x: cx - fw * scale / 2, y: cy - fh * scale / 2, scale });
  },

  // ----- the whole fight as one script -----
  *sendOut() {
    const mv = this.meV;
    yield* textBox.say(`Mene, ${this.me.name}!`, { auto: 6, keep: true });
    Object.assign(mv, newVisual(ME_POS), { show: true, scale: 0.1, hpShown: this.me.hp });
    this.xpShown = this.me.xp;
    this.addFx('spark', mv.x + 32, mv.y + 36, [0, 0, 1, 1, 2, 2, 2], 2);
    yield* tween(14, k => { mv.scale = 0.1 + 0.9 * k; });
    mv.scale = 1;
    this.showMeInfo = true;
    yield* wait(10);
    textBox.hide();
  },

  *main() {
    const foe = this.foe, fv = this.foeV;
    fv.x = -64; this.meV.show = false;
    yield* tween(48, k => {
      fv.x = Math.round(-64 + (FOE_POS.x + 64) * k);
      this.trainer.x = Math.round(240 - (240 - 36) * k);
    });
    this.showFoeInfo = true;
    if (foe.shiny) {
      for (let i = 0; i < 5; i++) {
        this.addFx('spark', fv.x + 32 + rnd(-26, 26), fv.y + 32 + rnd(-24, 20), [0, 0, 1, 1, 2, 2]);
        yield* wait(6);
      }
    }
    yield* textBox.say(this.from === 'fish' ? `Villi ${foe.name} nousi vedestä!` : this.from === 'palm' ? `Villi ${foe.name} syöksyi alas palmusta!` : `Villi ${foe.name} hyppäsi esiin pusikosta!`);
    if (foe.shiny) yield* textBox.say(`Vau! Se on KIILTÄVÄ ${foe.name}! Sellaisen näkee vain kerran sadasta.`);
    yield* tween(18, k => { this.trainer.x = Math.round(36 - 110 * k); });
    this.trainer.show = false;
    yield* this.sendOut();

    while (true) {
      let me = this.me;
      const choice = yield* this.chooseMain();
      let myMove = null;
      if (choice === 2) {
        // switch to another team member; the switch uses up this turn and the foe attacks the newcomer
        if (!(yield* this.switchMon())) continue;
        me = this.me;
      } else if (choice === 1) {
        if (game.balls + game.greatBalls <= 0) { yield* textBox.say(`Sinulla ei ole yhtään palloa! Osta niitä ${CENTER_NAME}sta tai rantakioskista.`); continue; }
        let great = game.balls <= 0;
        if (game.balls > 0 && game.greatBalls > 0) {   // both kinds: let the player pick
          textBox.show('Mikä pallo?', 0, 136);
          const pick = yield* menuBox.choose([`PYYDYS X${game.balls}`, `GREAT X${game.greatBalls}`], 136, 112, 104);
          textBox.hide();
          if (pick < 0) continue;
          great = pick === 1;
        }
        if (yield* this.throwBall(great)) { this.result = 'catch'; return; }
      } else if (choice === 3) {
        this.runAttempts++;
        if (Math.random() < 0.5 + 0.25 * this.runAttempts) {
          yield* textBox.say('Pääsit turvallisesti pakoon!');
          this.result = 'run';
          return;
        }
        yield* textBox.say('Et päässyt pakoon!');
      } else if (me.moves.every(m => m.left <= 0)) {
        yield* textBox.say(`${me.name}lla ei ole voimia jäljellä!`);
        myMove = STRUGGLE;
      } else {
        myMove = yield* this.chooseMove();
        if (!myMove) continue;
      }

      const foeMove = this.pickFoeMove();
      const turns = [];
      if (myMove) {
        const meFirst = speedOf(me) > speedOf(foe) || (speedOf(me) === speedOf(foe) && Math.random() < 0.5);
        if (meFirst) turns.push([me, foe, myMove], [foe, me, foeMove]);
        else turns.push([foe, me, foeMove], [me, foe, myMove]);
      } else {
        turns.push([foe, me, foeMove]);
      }
      me.flinch = foe.flinch = false;
      for (const [a, d, m] of turns) {
        yield* this.useMove(a, d, m);
        if (foe.hp <= 0) { yield* this.win(); return; }
        if (me.hp <= 0) {
          if (!(yield* this.myFainted())) { this.result = 'lose'; return; }
          break;   // a fresh team member came out; the fainted one's turn is lost
        }
      }
      const end = yield* this.endOfTurn();
      if (end === 'win') { yield* this.win(); return; }
      if (end === 'lose') { this.result = 'lose'; return; }
    }
  },

  // poison, burn and FIRE SPIN damage at the end of every turn
  *endOfTurn() {
    for (const mine of [true, false]) {
      const m = mine ? this.me : this.foe, v = mine ? this.meV : this.foeV;
      const name = mine ? m.name : 'Villi ' + m.name;
      const effects = [];
      if (m.status === 'psn') effects.push(['psn', m.maxHp / 8, `${name} kärsii myrkystä!`]);
      if (m.status === 'brn') effects.push(['brn', m.maxHp / 16, `${name} kärsii palovammasta!`]);
      if (m.trapTurns > 0) effects.push(['trap', m.maxHp / 8, `Tulipyörre polttaa: ${name}!`]);
      for (const [kind, dmg, text] of effects) {
        if (m.hp <= 0) break;
        yield* (kind === 'psn' ? this.poisonFx(v) : this.burnFx(v));
        m.hp = Math.max(0, m.hp - Math.max(1, Math.floor(dmg)));
        yield* this.drainHp(v, m);
        yield* textBox.say(text);
        if (kind === 'trap' && --m.trapTurns === 0 && m.hp > 0) yield* textBox.say(`${name} pääsi irti tulipyörteestä!`);
      }
      if (this.foe.hp <= 0) return 'win';
      if (this.me.hp <= 0) return (yield* this.myFainted()) ? 'switch' : 'lose';
    }
    return null;
  },

  // VAIHDA: pick a team member to send out instead; returns false if cancelled
  *switchMon() {
    const party = game.party;
    if (!party.some(m => m !== this.me && m.hp > 0)) {
      yield* textBox.say('Tiimissäsi ei ole ketään muuta, joka jaksaa taistella!');
      return false;
    }
    while (true) {
      textBox.show('Kenet lähetät taisteluun?', 0, 136);
      const labels = party.map(m => `${m.name}${m.shiny ? '★' : ''} ${m.hp}/${m.maxHp}`);
      const i = yield* menuBox.choose(labels, 64, 4, 172);
      textBox.hide();
      if (i < 0) return false;
      const m = party[i];
      if (m === this.me) { yield* textBox.say(`${m.name} on jo taistelussa!`); continue; }
      if (m.hp <= 0) { yield* textBox.say(`${m.name} on uupunut eikä jaksa taistella.`); continue; }
      // call the current one back
      const old = this.me, mv = this.meV;
      old.speStage = 0; old.trapTurns = 0; old.flinch = false;
      yield* textBox.say(`Tule takaisin, ${old.name}!`, { auto: 6, keep: true });
      this.addFx('spark', mv.x + 32, mv.y + 36, [0, 0, 1, 1, 2, 2]);
      yield* tween(12, k => { mv.scale = 1 - 0.9 * k; });
      mv.show = false; mv.scale = 1;
      this.showMeInfo = false;
      textBox.hide();
      yield* wait(8);
      this.me = m;
      m.speStage = 0; m.trapTurns = 0; m.flinch = false;
      yield* this.sendOut();
      return true;
    }
  },

  // returns true if another team member was sent out
  *myFainted() {
    yield* this.faint(this.meV);
    this.showMeInfo = false;
    yield* textBox.say(`${this.me.name} uupui!`);
    const next = game.party.find(m => m.hp > 0);
    if (!next) {
      yield* textBox.say(`Kiidätit otuksesi ${CENTER_NAME}an...`);
      return false;
    }
    this.me = next;
    yield* this.sendOut();
    return true;
  },

  // ----- catching -----
  // GREAT PALLO doubles the catch chance
  *throwBall(great) {
    if (great) game.greatBalls--; else game.balls--;
    const foe = this.foe, fv = this.foeV;
    yield* textBox.say(`Heitit ${great ? GREAT_NAME : BALL_NAME}N!`, { auto: 4, keep: true });
    const sx = 40, sy = 100, tx = fv.x + 32, ty = fv.y + 30;
    this.thrown = { x: sx, y: sy, f: 0, img: great ? IMG.greatBall : IMG.ball };
    yield* tween(22, k => {
      this.thrown.x = sx + (tx - sx) * k;
      this.thrown.y = sy + (ty - sy) * k - Math.sin(k * Math.PI) * 40;
      this.thrown.f = Math.floor(k * 12) % 3;
    });
    this.flash = 3;
    this.addFx('spark', tx, ty, [0, 0, 1, 1, 2, 2]);
    yield* tween(10, k => { fv.scale = 1 - k; });
    fv.show = false; fv.scale = 1;
    const floor = fv.y + 54;
    yield* tween(10, k => { this.thrown.y = ty + (floor - ty) * k * k; this.thrown.f = 0; });
    yield* wait(16);

    const sp = SPECIES[foe.species];
    let p = sp.catchRate * (1 - (2 / 3) * foe.hp / foe.maxHp) * (foe.status ? 1.5 : 1) * (great ? 2 : 1);
    const caught = Math.random() < Math.min(1, p);
    const wobbles = caught ? 3 : rnd(0, 2);
    for (let i = 0; i < wobbles; i++) {
      this.thrown.f = 1; yield* wait(8);
      this.thrown.f = 2; yield* wait(8);
      this.thrown.f = 0; yield* wait(18);
    }
    if (caught) {
      for (let i = 0; i < 3; i++) this.addFx('spark', this.thrown.x + rnd(-10, 10), this.thrown.y + rnd(-10, 4), [0, 1, 2, 2]);
      yield* wait(12);
      this.showFoeInfo = false;
      yield* textBox.say(`Napattu! Villi ${foe.name} jäi kiinni!`);
      const caughtMon = { ...foe, moves: foe.moves.map(m => ({ ...m })) };
      this.thrown = null;
      if (game.party.length < 6) {
        game.party.push(caughtMon);
        yield* textBox.say(`${foe.name} liittyi tiimiisi! (${game.party.length}/6)`);
      } else {   // team is full: straight to the PC in the HOITOLA
        caughtMon.hp = caughtMon.maxHp; caughtMon.status = null;
        game.pc.push(caughtMon);
        yield* textBox.say(`Tiimisi on täynnä, joten ${foe.name} lähetettiin ${CENTER_NAME}N PC:hen.`);
      }
      yield* this.registerCatch(foe.species);
      if (sp.catchCoins) {
        game.coins += sp.catchCoins;
        yield* textBox.say(`Sait ${sp.catchCoins} kolikkoa nappaamisesta! Kolikoita yhteensä: ${game.coins}.`);
      }
      return true;
    }
    this.thrown = null;
    this.addFx('spark', tx, ty, [0, 0, 1, 1, 2, 2], 2);
    fv.show = true; fv.scale = 0.1;
    yield* tween(10, k => { fv.scale = 0.1 + 0.9 * k; });
    fv.scale = 1;
    yield* textBox.say(['Voi ei! Se karkasi pallosta!', 'Melkein! Se pääsi irti!', 'Argh! Niin lähellä!'][wobbles]);
    return false;
  },

  // KOKOELMA: remember a new species, and hand out the SHINY CHARM when every species has been caught
  *registerCatch(species) {
    if (!game.caught.includes(species)) {
      game.caught.push(species);
      const all = catchableSpecies();
      yield* textBox.say(`${SPECIES[species].name} lisättiin KOKOELMAAN! (${game.caught.filter(id => all.includes(id)).length}/${all.length})`);
    }
    if (!game.shinyCharm && catchableSpecies().every(id => game.caught.includes(id))) {
      game.shinyCharm = true;
      this.flash = 8;
      for (let i = 0; i < 6; i++) { this.addFx('spark', rnd(40, 200), rnd(20, 90), [0, 0, 1, 1, 2, 2]); yield* wait(5); }
      yield* textBox.say('Olet napannut KAIKKI otukset! Sait SHINY CHARMin!');
      yield* textBox.say('Kiiltäviä otuksia näkee nyt useammin: 1/75 (ennen 1/100).');
    }
  },

  *chooseMain() {
    this.menu = { type: 'main', index: this.lastMain || 0 };
    textBox.show(`Mitä ${this.me.name} tekee?`, 0, 136);
    while (true) {
      if (take('up')) this.menu.index = (this.menu.index + 3) % 4;
      if (take('down')) this.menu.index = (this.menu.index + 1) % 4;
      if (take('a')) {
        this.lastMain = this.menu.index;
        this.menu = null; textBox.hide();
        return this.lastMain;
      }
      yield;
    }
  },

  *chooseMove() {
    const moves = this.me.moves;
    this.menu = { type: 'moves', index: this.lastMove || 0 };
    while (true) {
      if (take('up')) this.menu.index = (this.menu.index + moves.length - 1) % moves.length;
      if (take('down')) this.menu.index = (this.menu.index + 1) % moves.length;
      if (take('b')) { this.menu = null; return null; }
      if (take('a')) {
        this.lastMove = this.menu.index;
        const m = moves[this.menu.index];
        this.menu = null;
        if (m.left > 0) return m;
        yield* textBox.say('Liikkeellä ei ole PP:tä jäljellä!');
        this.menu = { type: 'moves', index: this.lastMove };
      }
      yield;
    }
  },

  pickFoeMove() {
    const usable = this.foe.moves.filter(m => m.left > 0);
    if (!usable.length) return STRUGGLE;
    return usable[rnd(0, usable.length - 1)];
  },

  *useMove(att, def, move) {
    const mine = att === this.me;
    const av = mine ? this.meV : this.foeV, dv = mine ? this.foeV : this.meV;
    const who = mine ? att.name : `Villi ${att.name}`;
    const target = mine ? `Villi ${def.name}` : def.name;
    if (att.status === 'slp') {   // asleep: 1-3 turns
      if (--att.sleepTurns > 0) {
        yield* this.sleepFx(av);
        yield* textBox.say(`${who} nukkuu syvässä unessa.`);
        return;
      }
      att.status = null;
      yield* textBox.say(`${who} heräsi!`);
    }
    if (att.status === 'par' && Math.random() < 0.25) {
      yield* textBox.say(`${who} on halvaantunut! Se ei pysty liikkumaan!`);
      return;
    }
    if (att.flinch) {
      att.flinch = false;
      yield* textBox.say(`${who} säpsähti eikä pystynyt liikkumaan!`);
      return;
    }
    if (!move.struggle) move.left--;
    yield* textBox.say(`${who} käytti ${move.name}!`, { auto: 14, keep: true });
    if (Math.random() * 100 >= move.acc) {
      yield* textBox.say('Mutta se meni ohi!');
      return;
    }
    if (move.sleep) {   // SLEEP POWDER: no damage, puts the target to sleep
      yield* this.animPowder(av, dv);
      if (def.status) yield* textBox.say('Mutta se ei tehonnut!');
      else {
        def.status = 'slp';
        def.sleepTurns = rnd(2, 4);   // counts down when it tries to act: sleeps 1-3 turns
        yield* this.sleepFx(dv);
        yield* textBox.say(`${target} nukahti!`);
      }
      textBox.hide();
      return;
    }
    if (move.slow) {   // STICKY WEB: no damage, lowers speed
      yield* this.animWeb(av, dv);
      if ((def.speStage || 0) <= -3) { yield* textBox.say('Kohteen nopeus ei voi laskea enempää!'); }
      else {
        def.speStage = (def.speStage || 0) - 1;
        yield* textBox.say(`${target} tarttui verkkoon! Sen nopeus laski!`);
      }
      textBox.hide();
      return;
    }
    const { dmg, crit } = calcDamage(att, def, move);
    if (move.anim === 'thunder') yield* this.animThunder(av, dv);
    else if (move.anim === 'electro') yield* this.animElectro(av, dv);
    else if (move.anim === 'buzz') yield* this.animBuzz(av, dv);
    else if (move.anim === 'slash') yield* this.animSlash(av, dv);
    else if (move.anim === 'mud') yield* this.animMud(av, dv);
    else if (move.anim === 'fairy') yield* this.animFairy(av, dv);
    else if (move.anim === 'drain') yield* this.animGiga(av, dv);
    else if (move.anim === 'jab') yield* this.animJab(av, dv, mine ? 1 : -1);
    else if (move.anim === 'iron') { av.white = true; yield* this.animTackle(av, dv, mine ? 1 : -1); av.white = false; }
    else if (move.anim === 'sludge') yield* this.animSludge(av, dv);
    else if (move.anim === 'firespin') yield* this.animFireSpin(av, dv);
    else if (move.anim === 'flamethrower') yield* this.animFlamethrower(av, dv);
    else if (move.anim === 'flametornado') yield* this.animFlameTornado(av, dv);
    else if (move.anim === 'psistrike') yield* this.animPsiStrike(av, dv);
    else if (move.anim === 'psychic') yield* this.animPsychic(av, dv);
    else if (move.anim === 'psychocut') yield* this.animPsychoCut(av, dv);
    else if (move.anim === 'crunch') yield* this.animCrunch(av, dv, mine ? 1 : -1);
    else if (move.anim === 'darkpulse') yield* this.animDarkPulse(av, dv);
    else if (move.anim === 'icecream') yield* this.animIceCream(av, dv);
    else if (move.anim === 'blizzard') yield* this.animBlizzard(av, dv);
    else if (move.anim === 'twister') yield* this.animTwister(av, dv);
    else if (move.anim === 'icefang') yield* this.animCrunch(av, dv, mine ? 1 : -1, true);
    else yield* this.animTackle(av, dv, mine ? 1 : -1);
    if (move.flinch && Math.random() < move.flinch) def.flinch = true;
    def.hp = Math.max(0, def.hp - dmg);
    yield* this.hurt(dv);
    yield* this.drainHp(dv, def);
    if (crit) yield* textBox.say('Kriittinen osuma!');
    if (def.hp > 0 && move.paralyze && !def.status && Math.random() < move.paralyze) {
      def.status = 'par';
      this.flash = 3;
      yield* textBox.say(`${target} halvaantui! Se ei ehkä pysty liikkumaan!`);
    }
    if (def.hp > 0 && move.burn && !def.status && Math.random() < move.burn) {
      def.status = 'brn';
      yield* this.burnFx(dv);
      yield* textBox.say(`${target} sai palovamman!`);
    }
    if (def.hp > 0 && move.trap && !(def.trapTurns > 0)) {
      def.trapTurns = rnd(4, 5);
      yield* textBox.say(`${target} jäi tulipyörteen vangiksi!`);
    }
    if (def.hp > 0 && move.poison && !def.status && Math.random() < move.poison) {
      def.status = 'psn';
      yield* this.poisonFx(dv);
      yield* textBox.say(`${target} myrkyttyi!`);
    }
    if (def.hp > 0 && move.slowAfter && (def.speStage || 0) > -3) {
      def.speStage = (def.speStage || 0) - 1;
      yield* textBox.say(`${target} on mudan peitossa! Sen nopeus laski!`);
    }
    if (def.hp > 0 && move.slowChance && Math.random() < move.slowChance && (def.speStage || 0) > -3) {
      def.speStage = (def.speStage || 0) - 1;
      yield* textBox.say(`${target} on jäätelön peitossa! Sen nopeus laski!`);
    }
    if (move.drain && att.hp < att.maxHp) {
      att.hp = Math.min(att.maxHp, att.hp + Math.max(1, Math.floor(dmg * move.drain)));
      yield* this.drainHp(av, att);
      yield* textBox.say(`${who} imi voimaa kohteesta!`);
    }
    textBox.hide();
  },

  // ----- animations -----
  // small coloured squares flying from one creature to another; parts are drawn every frame
  *animParticles(from, to, opts) {
    const sx = from.x + 32, sy = from.y + 32, tx = to.x + 32, ty = to.y + 34;
    const { count, gap, dur, arc = 0, swirl = 0, colors, size } = opts;
    const total = gap * (count - 1) + dur;
    for (let i = 0; i <= total; i++) {
      this.parts = [];
      for (let n = 0; n < count; n++) {
        const k = (i - n * gap) / dur;
        if (k < 0 || k > 1) continue;
        const wob = Math.sin(k * Math.PI * 4 + n) * swirl * (1 - k);
        this.parts.push({
          x: sx + (tx - sx) * k + wob,
          y: sy + (ty - sy) * k - Math.sin(k * Math.PI) * arc + Math.cos(k * Math.PI * 4 + n) * swirl * (1 - k),
          c: colors[n % colors.length], s: size,
        });
        if (Math.abs(k - 1) < 1 / dur) this.shake = 3;
      }
      yield;
    }
    this.parts = null;
  },

  *animMud(av, dv) {
    av.pose = 'attack';
    yield* this.animParticles(av, dv, { count: 4, gap: 5, dur: 18, arc: 16, colors: ['#6b4119', '#8a5a2c'], size: 5 });
    av.pose = 'idle';
    this.addFx('hit', dv.x + 32, dv.y + 36, [0, 0, 1, 1, 1]);
    this.shake = 6;
    yield* wait(6);
  },

  *animFairy(av, dv) {
    av.pose = 'attack';
    yield* this.animParticles(av, dv, { count: 12, gap: 2, dur: 24, swirl: 10, colors: ['#ffb3ff', '#ffffff', '#e3b5ff'], size: 2 });
    av.pose = 'idle';
    for (let i = 0; i < 14; i++) {   // little pink burst on the target
      this.parts = [];
      for (let n = 0; n < 8; n++) {
        const a = n * Math.PI / 4, r = 4 + i * 1.6;
        this.parts.push({ x: dv.x + 32 + Math.cos(a) * r, y: dv.y + 34 + Math.sin(a) * r, c: n % 2 ? '#ffffff' : '#ffb3ff', s: 2 });
      }
      yield;
    }
    this.parts = null;
    this.shake = 4;
  },

  // ----- fire -----
  // little flames flickering up around a burning creature
  *burnFx(v) {
    for (let i = 0; i < 22; i++) {
      this.parts = [];
      for (let n = 0; n < 7; n++) {
        const k = ((i + n * 3) % 14) / 14;
        this.parts.push({ x: v.x + 14 + n * 6 + Math.sin(i / 2 + n) * 2, y: v.y + 58 - k * 30, c: FIRE[(n + (k > 0.5 ? 2 : 0)) % FIRE.length], s: k < 0.5 ? 4 : 2 });
      }
      yield;
    }
    this.parts = null;
  },

  // FIRE SPIN: a ring of fire spins round the target
  *animFireSpin(av, dv) {
    av.pose = 'attack';
    yield* this.animParticles(av, dv, { count: 6, gap: 2, dur: 14, arc: 8, colors: FIRE, size: 3 });
    av.pose = 'idle';
    const cx = dv.x + 32, cy = dv.y + 36;
    for (let i = 0; i < 44; i++) {
      this.parts = [];
      for (let n = 0; n < 16; n++) {
        const a = n * Math.PI / 8 + i * 0.32, r = 24 - i * 0.2;
        const h = Math.sin(a * 2 + i * 0.2) * 6;
        this.parts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.45 + h - (n % 3) * 4, c: FIRE[n % FIRE.length], s: n % 2 ? 4 : 3 });
      }
      if (i % 8 === 0) this.shake = 2;
      yield;
    }
    this.parts = null;
  },

  // FLAMETHROWER: a thick stream of fire, then a burst on the target
  *animFlamethrower(av, dv) {
    av.pose = 'attack';
    yield* this.animParticles(av, dv, { count: 26, gap: 1, dur: 16, arc: 4, swirl: 3, colors: ['#fff06a', '#ffb43d', '#ff7a2a', '#dd3d3d'], size: 5 });
    av.pose = 'idle';
    this.shake = 8;
    for (let i = 0; i < 14; i++) {
      this.parts = [];
      for (let n = 0; n < 12; n++) {
        const a = n * Math.PI / 6, r = 4 + i * 1.7;
        this.parts.push({ x: dv.x + 32 + Math.cos(a) * r, y: dv.y + 36 + Math.sin(a) * r * 0.8, c: FIRE[n % FIRE.length], s: 4 });
      }
      yield;
    }
    this.parts = null;
  },

  // FLAME TORNADO: the screen glows red and a spinning column of fire swallows the target
  *animFlameTornado(av, dv) {
    av.pose = 'attack';
    yield* tween(10, k => { this.tint = 0.4 * k; });
    const cx = dv.x + 32, baseY = dv.y + 62;
    for (let i = 0; i < 56; i++) {
      this.parts = [];
      const grow = Math.min(1, i / 16);
      for (let n = 0; n < 34; n++) {
        const h = ((n * 7 + i * 3) % 64) / 64;              // 0 = bottom, 1 = top
        const r = (4 + h * 20) * grow, a = n * 0.9 + i * 0.4;
        this.parts.push({
          x: cx + Math.cos(a) * r,
          y: baseY - h * 72 * grow + Math.sin(a) * r * 0.22,
          c: h > 0.75 ? '#fff06a' : h > 0.45 ? '#ffb43d' : h > 0.2 ? '#ff7a2a' : '#dd3d3d',
          s: h < 0.5 ? 4 : 3,
        });
      }
      if (i % 5 === 0) this.shake = 4;
      if (i === 28) this.flash = 3;
      yield;
    }
    this.parts = null;
    av.pose = 'idle';
    yield* tween(10, k => { this.tint = 0.4 * (1 - k); });
    this.tint = 0;
  },

  // ----- psychic, dark, crunch, sleep -----
  // rings of light that shrink onto (in = true) or grow out of a point
  ringFrame(cx, cy, i, n, colors, grow, maxR = 30) {
    this.parts = [];
    for (let k = 0; k < 3; k++) {
      let f = ((i + k * (n / 3)) % n) / n;
      if (!grow) f = 1 - f;
      const r = 3 + f * maxR;
      for (let a = 0; a < Math.PI * 2; a += 0.22) this.parts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.8, c: colors[k % colors.length], s: 2 });
    }
  },

  // PSI STRIKE: the screen turns pink-violet and rings collapse onto the target, then a burst
  *animPsiStrike(av, dv) {
    av.pose = 'attack';
    this.tintRGB = '170,60,190';
    yield* tween(8, k => { this.tint = 0.35 * k; });
    const cx = dv.x + 32, cy = dv.y + 34;
    for (let i = 0; i < 40; i++) { this.ringFrame(cx, cy, i, 20, ['#ffd6ff', '#e9b9ef', '#ffffff'], false); if (i % 10 === 0) this.shake = 3; yield; }
    this.parts = null;
    this.flash = 4; this.shake = 10;
    this.addFx('spark', cx, cy, [0, 0, 1, 1, 2, 2], 2);
    av.pose = 'idle';
    yield* tween(8, k => { this.tint = 0.35 * (1 - k); });
    this.tint = 0; this.tintRGB = null;
    yield* wait(6);
  },

  // PSYCHIC: waves pulse out of the target and it wobbles in the air
  *animPsychic(av, dv) {
    av.pose = 'attack';
    const cx = dv.x + 32, cy = dv.y + 34;
    for (let i = 0; i < 44; i++) {
      this.ringFrame(cx, cy, i, 22, ['#c78bff', '#ffd6ff'], true, 26);
      dv.dx = Math.round(Math.sin(i / 2) * 3);
      dv.dy = Math.round(Math.cos(i / 3) * 2) - 2;
      yield;
    }
    dv.dx = dv.dy = 0;
    this.parts = null;
    av.pose = 'idle';
    this.shake = 6;
    yield* wait(6);
  },

  // PSYCHO CUT: the sky turns violet and two glowing pink crescent blades slice across the target
  *animPsychoCut(av, dv) {
    av.pose = 'attack';
    this.tintRGB = '170,60,190';
    yield* tween(6, k => { this.tint = 0.25 * k; });
    const cx = dv.x + 32, cy = dv.y + 34;
    for (const flip of [1, -1]) {
      const rot = flip > 0 ? -0.7 : Math.PI + 0.7;
      for (let i = 0; i < 16; i++) {
        const k = i / 15;
        const ox = (k - 0.5) * 70 * flip, oy = (k - 0.5) * 36;
        this.parts = [];
        for (let tr = 0; tr < 3; tr++) {   // the blade and two fading copies behind it
          const bx = cx + ox - tr * 7 * flip, by = cy + oy - tr * 3.6;
          for (let a = -1.2; a <= 1.2; a += 0.1) {
            const R = 15 - tr * 2, w = Math.cos(a) * 3;
            for (let t = 0; t <= w; t += 1.5) {
              this.parts.push({
                x: bx + Math.cos(a + rot) * (R - t), y: by + Math.sin(a + rot) * (R - t) * 0.9,
                c: tr ? (tr === 1 ? '#e9b9ef' : '#c78bff') : t < 1 ? '#ffffff' : '#ff9cf2', s: tr ? 1 : 2,
              });
            }
          }
        }
        if (i === 8) { this.addFx('hit', cx + rnd(-4, 4), cy + rnd(-4, 4), [0, 0, 1, 1, 1]); this.shake = 6; this.flash = 2; }
        yield;
      }
    }
    this.parts = null;
    av.pose = 'idle';
    yield* tween(6, k => { this.tint = 0.25 * (1 - k); });
    this.tint = 0; this.tintRGB = null;
    yield* wait(6);
  },

  // DARK PULSE: dark rings travel from the user to the target under a gloomy sky
  *animDarkPulse(av, dv) {
    av.pose = 'attack';
    this.tintRGB = '30,0,50';
    yield* tween(8, k => { this.tint = 0.45 * k; });
    const sx = av.x + 32, sy = av.y + 30, tx = dv.x + 32, ty = dv.y + 34;
    for (let i = 0; i < 36; i++) {
      this.parts = [];
      for (let n = 0; n < 3; n++) {
        const k = (i - n * 7) / 22;
        if (k < 0 || k > 1) continue;
        const cx = sx + (tx - sx) * k, cy = sy + (ty - sy) * k, r = 4 + k * 10;
        for (let a = 0; a < Math.PI * 2; a += 0.25) this.parts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, c: n % 2 ? '#6a2a9a' : '#2a1040', s: 2 });
      }
      if (i % 6 === 0) this.shake = 2;
      yield;
    }
    this.parts = null;
    av.pose = 'idle';
    this.shake = 8;
    yield* tween(8, k => { this.tint = 0.45 * (1 - k); });
    this.tint = 0; this.tintRGB = null;
  },

  // CRUNCH: a lunge, then two rows of fangs snap shut on the target
  *animCrunch(av, dv, dir, icy = false) {
    yield* tween(5, k => { av.dx = Math.round(10 * dir * k); av.dy = Math.round(-4 * dir * k); });
    const cx = dv.x + 32, cy = dv.y + 34;
    const edge = icy ? '#2a5a8a' : '#283040', tooth = icy ? '#bff4ff' : '#ffffff';
    for (let i = 0; i <= 12; i++) {
      const gap = 22 - Math.min(i, 8) * 2.5;
      this.parts = [];
      for (let n = -3; n <= 3; n++) {
        const x = cx + n * 6;
        for (const [y0, sgn] of [[cy - gap, 1], [cy + gap, -1]]) {
          this.parts.push({ x, y: y0, c: edge, s: 5 });
          this.parts.push({ x, y: y0, c: tooth, s: 3 });
          this.parts.push({ x, y: y0 + sgn * 4, c: tooth, s: 2 });
        }
      }
      if (icy && i >= 8) {   // ice shards burst out when the fangs meet
        for (let n = 0; n < 8; n++) {
          const a = n * Math.PI / 4, r = (i - 7) * 5;
          this.parts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, c: n % 2 ? '#ffffff' : '#7fdfff', s: 2 });
        }
      }
      if (i === 8) { this.shake = 10; this.flash = 2; }
      yield;
    }
    this.parts = null;
    yield* tween(6, k => { av.dx = Math.round(10 * dir * (1 - k)); av.dy = Math.round(-4 * dir * (1 - k)); });
    av.dx = av.dy = 0;
  },

  // ICE CREAM THROW: a three-colour scoop flies in an arc and splats on the target
  *animIceCream(av, dv) {
    av.pose = 'attack';
    const sx = av.x + 32, sy = av.y + 20, tx = dv.x + 32, ty = dv.y + 30;
    for (let i = 0; i <= 22; i++) {
      const k = i / 22, x = sx + (tx - sx) * k, y = sy + (ty - sy) * k - Math.sin(k * Math.PI) * 34;
      this.parts = [];
      // cone + three scoops
      this.parts.push({ x, y: y + 5, c: '#c89a5a', s: 4 }, { x, y: y + 8, c: '#a87a3a', s: 2 });
      this.parts.push({ x: x - 2, y: y + 1, c: '#a8e6b0', s: 4 }, { x: x + 2, y: y + 1, c: '#f0a090', s: 4 }, { x, y: y - 2, c: '#7a8cf0', s: 4 });
      yield;
    }
    av.pose = 'idle';
    this.shake = 8;
    for (let i = 0; i < 14; i++) {   // splat
      this.parts = [];
      for (let n = 0; n < 12; n++) {
        const a = n * Math.PI / 6, r = 3 + i * 1.6;
        this.parts.push({ x: tx + Math.cos(a) * r, y: ty + Math.sin(a) * r * 0.7, c: ['#a8e6b0', '#f0a090', '#7a8cf0', '#ffffff'][n % 4], s: 3 });
      }
      yield;
    }
    this.parts = null;
  },

  // BLIZZARD: the screen goes icy blue and a storm of snow blows across, hammering the target
  *animBlizzard(av, dv) {
    av.pose = 'attack';
    this.tintRGB = '200,230,255';
    yield* tween(8, k => { this.tint = 0.45 * k; });
    const dir = dv.x > av.x ? 1 : -1;
    for (let i = 0; i < 54; i++) {
      this.parts = [];
      for (let n = 0; n < 60; n++) {
        const x = ((n * 53 + i * (6 + (n % 4))) % (W + 40)) - 20;
        const y = (n * 29 + i * 2 + Math.sin(i / 4 + n) * 6) % 112;
        this.parts.push({ x: dir > 0 ? x : W - x, y, c: n % 3 ? '#ffffff' : '#bff4ff', s: n % 5 ? 2 : 3 });
      }
      if (i % 6 === 0) { this.shake = 4; dv.dx = rnd(-2, 2); }
      yield;
    }
    dv.dx = 0;
    this.parts = null;
    av.pose = 'idle';
    yield* tween(8, k => { this.tint = 0.45 * (1 - k); });
    this.tint = 0; this.tintRGB = null;
  },

  // TWISTER: a spinning whirlwind of air and leaves lifts the target
  *animTwister(av, dv) {
    av.pose = 'attack';
    const cx = dv.x + 32, baseY = dv.y + 62;
    for (let i = 0; i < 48; i++) {
      this.parts = [];
      const grow = Math.min(1, i / 14);
      for (let n = 0; n < 28; n++) {
        const h = ((n * 9 + i * 4) % 64) / 64;
        const r = (3 + h * 18) * grow, a = n * 1.1 + i * 0.5;
        this.parts.push({ x: cx + Math.cos(a) * r, y: baseY - h * 70 * grow + Math.sin(a) * r * 0.25, c: n % 3 === 0 ? '#7ad86a' : n % 2 ? '#ffffff' : '#bff0e8', s: 2 });
      }
      dv.dy = -Math.round(Math.sin(Math.min(1, i / 30) * Math.PI) * 6);
      if (i % 8 === 0) this.shake = 3;
      yield;
    }
    dv.dy = 0;
    this.parts = null;
    av.pose = 'idle';
    this.shake = 6;
  },

  // SLEEP POWDER: pale powder drifts down onto the target
  *animPowder(av, dv) {
    av.pose = 'attack';
    const cx = dv.x + 32, top = dv.y - 6;
    for (let i = 0; i < 46; i++) {
      this.parts = [];
      for (let n = 0; n < 16; n++) {
        const k = ((i * 1.5 + n * 9) % 60) / 60;
        this.parts.push({ x: cx - 24 + n * 3 + Math.sin(i / 6 + n) * 4, y: top + k * 56, c: n % 3 ? '#cdeedd' : '#a8c8ff', s: 2 });
      }
      yield;
    }
    this.parts = null;
    av.pose = 'idle';
  },

  // three Z's floating up from a sleeping creature
  *sleepFx(v) {
    for (let i = 0; i < 40; i++) {
      this.parts = [];
      for (let n = 0; n < 3; n++) {
        const k = ((i + n * 13) % 40) / 40;
        this.parts.push({ x: v.x + 40 + n * 4 + k * 8, y: v.y + 20 - k * 22, c: '#ffffff', t: 'Z' });
      }
      yield;
    }
    this.parts = null;
  },

  // purple bubbles rising from a poisoned creature
  *poisonFx(v) {
    for (let i = 0; i < 24; i++) {
      this.parts = [];
      for (let n = 0; n < 6; n++) {
        const k = ((i + n * 4) % 24) / 24;
        this.parts.push({ x: v.x + 16 + n * 6 + Math.sin(i / 3 + n) * 2, y: v.y + 56 - k * 40, c: n % 2 ? '#b04fd8' : '#e39bff', s: k < 0.5 ? 3 : 2 });
      }
      yield;
    }
    this.parts = null;
  },

  *animJab(av, dv, dir) {
    yield* this.animTackle(av, dv, dir);
    for (let i = 0; i < 12; i++) {   // purple spikes on the target
      this.parts = [];
      for (let n = 0; n < 6; n++) {
        const a = n * Math.PI / 3 + 0.3, r = 6 + i * 1.5;
        this.parts.push({ x: dv.x + 32 + Math.cos(a) * r, y: dv.y + 34 + Math.sin(a) * r, c: n % 2 ? '#e39bff' : '#8a2fb8', s: 3 });
      }
      yield;
    }
    this.parts = null;
  },

  *animSludge(av, dv) {
    av.pose = 'attack';
    yield* tween(8, k => { this.dark = 0.35 * k; });
    yield* this.animParticles(av, dv, { count: 14, gap: 2, dur: 20, arc: 10, swirl: 8, colors: ['#8a2fb8', '#b04fd8', '#5e1f86'], size: 5 });
    av.pose = 'idle';
    this.shake = 8;
    for (let i = 0; i < 14; i++) {   // splash
      this.parts = [];
      for (let n = 0; n < 10; n++) {
        const a = n * Math.PI / 5, r = 4 + i * 1.8;
        this.parts.push({ x: dv.x + 32 + Math.cos(a) * r, y: dv.y + 40 + Math.sin(a) * r * 0.6, c: n % 2 ? '#b04fd8' : '#e39bff', s: 4 });
      }
      yield;
    }
    this.parts = null;
    yield* tween(8, k => { this.dark = 0.35 * (1 - k); });
    this.dark = 0;
  },

  // GIGA DRAIN: green glow on the target, then life orbs float back to the user
  *animGiga(av, dv) {
    av.pose = 'attack';
    for (let i = 0; i < 18; i++) {
      this.parts = [];
      for (let n = 0; n < 10; n++) {
        const a = n * Math.PI / 5 + i * 0.15, r = 18 - i * 0.8;
        this.parts.push({ x: dv.x + 32 + Math.cos(a) * r, y: dv.y + 34 + Math.sin(a) * r, c: n % 2 ? '#d4ffd4' : '#5ee05e', s: 3 });
      }
      if (i % 6 === 0) this.shake = 3;
      yield;
    }
    av.pose = 'idle';
    yield* this.animParticles(dv, av, { count: 7, gap: 3, dur: 22, swirl: 6, colors: ['#8cff8c', '#d4ffd4'], size: 3 });
  },
  *animTackle(av, dv, dir) {
    yield* tween(6, k => { av.dx = Math.round(-5 * dir * k); });
    yield* tween(5, k => { av.dx = Math.round(-5 * dir + 29 * dir * k); av.dy = Math.round(-8 * dir * k); });
    this.addFx('hit', dv.x + 32, dv.y + 34, [0, 0, 0, 1, 1, 1, 1, 1]);
    this.shake = 8;
    yield* tween(8, k => { av.dx = Math.round(24 * dir * (1 - k)); av.dy = Math.round(-8 * dir * (1 - k)); });
    av.dx = av.dy = 0;
    yield* wait(4);
  },

  *animThunder(av, dv) {
    av.pose = 'attack';
    for (let i = 0; i < 4; i++) {
      this.addFx('spark', av.x + 32 + rnd(-24, 24), av.y + 30 + rnd(-20, 16), [0, 0, 1, 1, 2, 2]);
      yield* wait(6);
    }
    yield* tween(10, k => { this.dark = 0.5 * k; });
    const cx = dv.x + 32, cy = dv.y + 36;
    this.bolt = { x: cx, y: cy, t: 0 };
    for (let i = 0; i < 36; i++) {
      this.bolt.t = i;
      if (i % 9 === 0) this.flash = 3;
      if (i % 12 === 4) this.addFx('spark', cx + rnd(-8, 8), cy + rnd(-8, 8), [0, 0, 1, 1, 2, 2, 2]);
      this.shake = 2;
      yield;
    }
    this.bolt = null;
    this.addFx('spark', cx, cy, [0, 0, 0, 1, 1, 1, 2, 2, 2], 2);
    av.pose = 'idle';
    yield* tween(10, k => { this.dark = 0.5 * (1 - k); });
    this.dark = 0;
  },

  *animElectro(av, dv) {
    av.pose = 'attack';
    const sx = av.x + 32, sy = av.y + 24, tx = dv.x + 32, ty = dv.y + 36;
    this.ball = { x: sx, y: sy, s: 0.5, t: 0 };
    yield* tween(16, k => { this.ball.s = 0.5 + 1.5 * k; this.ball.t++; });
    av.pose = 'idle';
    yield* tween(18, k => {
      this.ball.x = sx + (tx - sx) * k;
      this.ball.y = sy + (ty - sy) * k - Math.sin(k * Math.PI) * 18;
      this.ball.t++;
    });
    this.ball = null;
    this.addFx('spark', tx, ty, [0, 0, 1, 1, 2, 2, 2], 2);
    this.shake = 8; this.flash = 2;
    yield* wait(8);
  },

  *animBuzz(av, dv) {
    av.pose = 'attack';
    this.waves = { sx: av.x + 32, sy: av.y + 30, tx: dv.x + 32, ty: dv.y + 34, t: 0 };
    for (let i = 0; i < 40; i++) { this.waves.t = i; if (i % 4 === 0) this.shake = 2; yield; }
    this.waves = null;
    av.pose = 'idle';
    this.shake = 6;
    yield* wait(6);
  },

  *animWeb(av, dv) {
    const sx = av.x + 32, sy = av.y + 28, tx = dv.x + 32, ty = dv.y + 36;
    this.webFx = { x: sx, y: sy, s: 0.4, a: 1 };
    yield* tween(18, k => {
      this.webFx.x = sx + (tx - sx) * k;
      this.webFx.y = sy + (ty - sy) * k - Math.sin(k * Math.PI) * 20;
      this.webFx.s = 0.4 + 1.6 * k;
    });
    this.shake = 3;
    yield* wait(24);
    yield* tween(10, k => { this.webFx.a = 1 - k; });
    this.webFx = null;
  },

  *animSlash(av, dv) {
    av.pose = 'attack';
    const sx = av.x + 32, sy = av.y + 30, tx = dv.x + 32, ty = dv.y + 34;
    const dir = tx > sx ? 1 : -1;
    for (let i = 0; i <= 26; i++) {
      this.slashes = [0, 10].map((d, n) => {
        const k = (i - d) / 16;
        if (k < 0 || k > 1) return null;
        return { x: sx + (tx - sx) * k, y: sy + (ty - sy) * k + (n ? 6 : -6), dir };
      }).filter(Boolean);
      if (i === 16 || i === 26) { this.addFx('hit', tx + rnd(-6, 6), ty + rnd(-6, 6), [0, 0, 1, 1, 1]); this.shake = 6; }
      yield;
    }
    this.slashes = null;
    av.pose = 'idle';
    yield* wait(6);
  },

  *evolve(me) {
    const from = SPECIES[me.species], to = SPECIES[from.evolveTo];
    yield* textBox.say(`Mitä? ${from.name} kehittyy!`);
    this.showMeInfo = false;
    this.meV.show = false;
    const sk = key => spriteKey(me, key);
    this.evo = { key: sk(from.sprites.front), white: false };
    yield* tween(20, k => { this.dark = 0.85 * k; });
    yield* wait(20);
    let gap = 26;
    for (let n = 0; n < 16; n++) {
      this.evo = { key: sk((n % 2 ? to : from).sprites.front), white: true };
      yield* wait(gap);
      gap = Math.max(3, Math.floor(gap * 0.8));
    }
    me.species = from.evolveTo;
    me.name = to.name;
    const oldMax = me.maxHp;
    calcStats(me);
    me.hp += me.maxHp - oldMax;
    this.meV.hpShown = me.hp;
    this.evo = { key: sk(to.sprites.front), white: false };
    this.flash = 10;
    yield* wait(20);
    yield* textBox.say(`Onneksi olkoon! ${from.name} kehittyi ${to.name}iksi!`);
    for (const id of to.moves) {
      if (me.moves.some(m => m.id === id)) continue;
      me.moves.unshift(newMove(id));
      yield* textBox.say(`${to.name} oppi uuden liikkeen: ${MOVES[id].name}!`);
    }
    yield* tween(15, k => { this.dark = 0.85 * (1 - k); });
    this.dark = 0;
    this.evo = null;
    this.meV.show = true;
  },

  *hurt(v) {
    v.pose = 'hurt';
    for (let i = 0; i < 6; i++) { v.show = !v.show; yield* wait(4); }
    v.show = true;
    v.pose = 'idle';
  },

  *drainHp(v, m) {
    const from = v.hpShown, to = m.hp;
    yield* tween(Math.max(8, Math.min(40, Math.abs(from - to) * 3)), k => { v.hpShown = from + (to - from) * k; });
    v.hpShown = to;
  },

  *faint(v) {
    yield* tween(18, k => { v.sink = Math.round(64 * k); });
    v.show = false; v.sink = 0;
  },

  *win() {
    yield* this.faint(this.foeV);
    this.showFoeInfo = false;
    yield* textBox.say(`Villi ${this.foe.name} uupui!`);
    const me = this.me;
    let remaining = Math.floor(SPECIES[this.foe.species].xpYield * this.foe.level / 7);
    yield* textBox.say(`${me.name} sai ${remaining} kokemuspistettä!`, { auto: 6, keep: true });
    while (remaining > 0) {
      const next = xpForLevel(me.level + 1);
      const step = Math.min(remaining, next - me.xp);
      const from = me.xp;
      yield* tween(Math.max(10, Math.min(40, step)), k => { this.xpShown = from + step * k; });
      me.xp += step; remaining -= step; this.xpShown = me.xp;
      if (me.xp >= next) {
        const oldMax = me.maxHp;
        me.level++;
        calcStats(me);
        me.hp += me.maxHp - oldMax;
        this.meV.hpShown = me.hp;
        this.flash = 4;
        yield* textBox.say(`${me.name} nousi tasolle ${me.level}!`, { keep: true });
      }
    }
    yield* wait(10);
    textBox.hide();
    const coins = SPECIES[this.foe.species].coins;
    game.coins += coins;
    yield* textBox.say(`Sait ${coins} kolikkoa! Kolikoita yhteensä: ${game.coins}.`);
    const sp = SPECIES[me.species];
    if (sp.evolveTo && me.level >= sp.evolveAt) yield* this.evolve(me);
    this.result = 'win';
  },

  // ----- per-frame -----
  update() {
    this.t++;
    for (const v of [this.meV, this.foeV]) {
      if (v.blink > 0) v.blink--;
      else if (--v.blinkT <= 0) { v.blink = 8; v.blinkT = rnd(90, 240); }
    }
    for (const f of this.fx) f.t++;
    this.fx = this.fx.filter(f => f.t < f.frames.length);
    if (this.shake > 0) this.shake--;
    if (this.flash > 0) this.flash--;
    this.runner.update();
    if (!this.runner.busy && this.result) { const r = this.result; this.result = null; endBattle(r); }
  },

  drawBackground() {
    const c = BATTLE_BG[overworld.map.id] || BATTLE_BG.forest;
    ctx.fillStyle = c.sky; ctx.fillRect(0, 0, W, 112);
    for (let i = 0; i < 17; i++) fillEllipse(i * 15 - 2, 44 + (i % 3) * 3, 11, 11, c.far);
    for (let i = 0; i < 14; i++) fillEllipse(i * 18 + 6, 52 + (i % 2) * 3, 10, 9, c.near);
    ctx.fillStyle = c.ground; ctx.fillRect(0, 56, W, 56);
    ctx.fillStyle = c.speck;
    for (let i = 0; i < 36; i++) {
      const x = (i * 53 + 7) % W, y = 60 + (i * 29) % 48;
      ctx.fillRect(x, y, 1, 2); ctx.fillRect(x + 2, y, 1, 2); ctx.fillRect(x + 1, y + 1, 1, 1);
    }
    if (c.glow) {   // twinkling blue / lilac lights in the purple forest
      for (let i = 0; i < 18; i++) {
        if (Math.floor(this.t / 20 + i * 1.7) % 3 === 0) continue;
        ctx.fillStyle = i % 2 ? '#9fe3ff' : '#f0c8ff';
        ctx.fillRect((i * 71 + 13) % W, 6 + (i * 23) % 50, 1, 1);
      }
    }
    fillEllipse(182, 67, 46, 9, c.platDark); fillEllipse(182, 66, 45, 8, c.plat);
    fillEllipse(62, 109, 56, 11, c.platDark); fillEllipse(62, 108, 55, 10, c.plat);
  },

  drawMoi(v, front) {
    if (!v.show) return;
    const sp = SPECIES[(front ? this.foe : this.me).species], spr = sp.sprites;
    let key = front ? spr.front : spr.back;
    if (v.pose === 'attack') key = front ? spr.attack : spr.backAttack;
    else if (v.pose === 'hurt' && front) key = spr.hurt;
    else if (front && v.blink > 0) key = spr.blink;
    key = spriteKey(front ? this.foe : this.me, key);
    const bob = v.pose === 'idle' && v.scale === 1 && Math.floor((this.t + (front ? 0 : 16)) / 32) % 2 ? 1 : 0;
    const size = Math.round(64 * v.scale);
    const x = v.x + v.dx + (64 - size) / 2;
    const y = v.y + v.dy + (64 - size) + bob + v.sink + (sp.feetY || 0);
    if (v.sink) { ctx.save(); ctx.beginPath(); ctx.rect(v.x - 16, 0, 96, v.y + 62); ctx.clip(); }
    ctx.drawImage(v.white ? makeWhite(key) : IMG[key], 0, 0, 32, 32, Math.round(x), Math.round(y), size, size);
    if (v.sink) ctx.restore();
  },

  drawInfo() {
    const me = this.me, foe = this.foe;
    if (this.showFoeInfo) {
      drawBox(6, 6, 104, 30);
      const fx = drawText(ctx, foe.name, 12, 11);
      if (foe.shiny) drawText(ctx, '★', fx + 3, 11, '#e8b830');
      if (foe.status) drawTag(8, 38, foe.status);   // under the box (long names leave no room inside)
      drawTextRight(ctx, 'LV' + foe.level, 104, 11);
      drawText(ctx, 'HP', 12, 24, '#c07020');
      const f = this.foeV.hpShown / foe.maxHp;
      drawBar(26, 26, 76, f, hpColor(f));
    }
    if (this.showMeInfo) {
      drawBox(126, 70, 110, 41);
      const mx = drawText(ctx, me.name, 132, 75);
      if (me.shiny) drawText(ctx, '★', mx + 3, 75, '#e8b830');
      if (me.status) drawTag(128, 59, me.status);   // above the box
      drawTextRight(ctx, 'LV' + me.level, 230, 75);
      drawText(ctx, 'HP', 132, 86, '#c07020');
      const f = this.meV.hpShown / me.maxHp;
      drawBar(146, 88, 84, f, hpColor(f));
      drawTextRight(ctx, `${Math.ceil(this.meV.hpShown)}/${me.maxHp}`, 230, 94);
      drawText(ctx, 'XP', 132, 102, '#3878c8');
      const lo = xpForLevel(me.level), hi = xpForLevel(me.level + 1);
      drawBar(146, 104, 84, (this.xpShown - lo) / (hi - lo), '#48a0f0');
    }
  },

  drawMenu() {
    if (!this.menu) return;
    if (this.menu.type === 'main') {
      drawBox(136, 112, 104, 48);
      drawText(ctx, 'TAISTELE', 158, 115);
      drawText(ctx, 'PALLO', 158, 125); drawTextRight(ctx, 'X' + (game.balls + game.greatBalls), 230, 125, '#586070');
      drawText(ctx, 'VAIHDA', 158, 135);
      drawText(ctx, 'PAKENE', 158, 145);
      drawText(ctx, '►', 147, 115 + this.menu.index * 10, '#e04838');
    } else {
      drawBox(0, 112, 152, 48);
      const n = this.me.moves.length, y0 = n > 3 ? 116 : n > 2 ? 117 : 121, dy = n > 3 ? 10 : n > 2 ? 12 : 16;
      this.me.moves.forEach((m, i) => drawText(ctx, m.name, 22, y0 + i * dy, m.left > 0 ? '#283040' : '#98a0b0'));
      drawText(ctx, '►', 11, y0 + this.menu.index * dy, '#e04838');
      const m = this.me.moves[this.menu.index];
      drawBox(152, 112, 88, 48);
      drawText(ctx, 'PP', 161, 121); drawTextRight(ctx, `${m.left}/${m.pp}`, 231, 121);
      drawText(ctx, 'VOIMA', 161, 137); drawTextRight(ctx, m.powerText || String(m.power), 231, 137);
    }
  },

  draw() {
    ctx.save();
    if (this.shake > 0) ctx.translate(rnd(-2, 2), rnd(-1, 1));
    this.drawBackground();
    if (this.dark > 0) { ctx.fillStyle = `rgba(16,16,48,${this.dark})`; ctx.fillRect(-4, -4, W + 8, H + 8); }
    if (this.tint > 0) { ctx.fillStyle = `rgba(${this.tintRGB || '150,30,0'},${this.tint})`; ctx.fillRect(-4, -4, W + 8, H + 8); }
    if (this.trainer.show) ctx.drawImage(IMG.trainerBack, 0, 0, 32, 32, this.trainer.x, 48, 64, 64);
    this.drawMoi(this.foeV, true);
    this.drawMoi(this.meV, false);
    if (this.bolt) {
      const b = this.bolt;
      for (let y = b.y - 64, s = 0; y > -64; y -= 64, s++) {
        drawFrame(IMG.thunderbolt, (Math.floor(b.t / 2) + s) % 3, 16, 32, b.x - 16 + ((b.t * 7 + s * 3) % 5) - 2, y, 2);
      }
    }
    if (this.ball) {
      const b = this.ball, size = Math.round(16 * b.s);
      ctx.drawImage(IMG.electroball, (Math.floor(b.t / 3) % 2) * 16, 0, 16, 16, Math.round(b.x - size / 2), Math.round(b.y - size / 2), size, size);
    }
    if (this.waves) {
      const w = this.waves;
      for (let n = 0; n < 3; n++) {
        const k = (w.t - n * 8) / 24;
        if (k < 0 || k > 1) continue;
        const cx = w.sx + (w.tx - w.sx) * k, cy = w.sy + (w.ty - w.sy) * k, r = 3 + k * 10;
        ctx.fillStyle = n % 2 ? '#ffffff' : '#d8f7a0';
        for (let a = 0; a < Math.PI * 2; a += 0.12) ctx.fillRect(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), 1, 1);
      }
    }
    if (this.webFx) {
      const f = this.webFx, size = Math.round(32 * f.s);
      ctx.globalAlpha = f.a;
      ctx.drawImage(IMG.web, Math.round(f.x - size / 2), Math.round(f.y - size / 2), size, size);
      ctx.globalAlpha = 1;
    }
    if (this.slashes) {
      for (const s of this.slashes) {
        ctx.save();
        ctx.translate(Math.round(s.x), Math.round(s.y));
        ctx.scale(-s.dir, 1);
        ctx.drawImage(IMG.slash, -16, -16);
        ctx.restore();
      }
    }
    if (this.parts) {
      for (const p of this.parts) {
        if (p.t) { drawText(ctx, p.t, Math.round(p.x), Math.round(p.y), p.c); continue; }
        ctx.fillStyle = p.c; ctx.fillRect(Math.round(p.x - p.s / 2), Math.round(p.y - p.s / 2), p.s, p.s);
      }
    }
    if (this.thrown) drawFrame(this.thrown.img, this.thrown.f, 16, 16, Math.round(this.thrown.x - 8), Math.round(this.thrown.y - 8));
    for (const f of this.fx) drawFrame(f.img, f.frames[f.t], f.fw, f.fh, f.x, f.y, f.scale);
    if (this.evo) {
      const img = this.evo.white ? makeWhite(this.evo.key) : IMG[this.evo.key];
      ctx.drawImage(img, 0, 0, 32, 32, W / 2 - 32, 30, 64, 64);
    }
    ctx.restore();
    this.drawInfo();
    textBox.draw();
    this.drawMenu();
    menuBox.draw();
    if (this.flash > 0) { ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(0, 0, W, H); }
  },
};

function drawTag(x, y, status) {
  ctx.fillStyle = { psn: '#a040d0', brn: '#e8662a', slp: '#6a7a98' }[status] || '#e8b830';
  ctx.fillRect(x, y, 19, 9);
  drawText(ctx, status.toUpperCase(), x + 2, y + 1, '#ffffff');
}
