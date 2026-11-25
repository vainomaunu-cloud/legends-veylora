// ---------- Saving: the games are stored in this browser (localStorage) ----------
// Saved automatically after battles, area changes, the HOITOLA / kiosk, every few seconds while walking,
// and when the page is closed or hidden. Each browser/device has its own saves.
// There can be many games, each with its own name; UUSI PELI never removes the old ones.
const SAVE_KEY = 'veylora-save-v1';        // the old single save: moved into the list on first load
const SLOTS_KEY = 'veylora-slots-v1';      // list of games: [{ id, name, time }]
const slotKey = id => 'veylora-slot-' + id;
const NAME_MAX = 12;

const validSave = d => (d && d.v === 1 && Array.isArray(d.party) && d.party.length ? d : null);

const saveGame = {
  flash: 0,          // frames to show "TALLENNETTU"
  slotId: null,      // the game being played
  slotName: '',

  slots() {
    try { const l = JSON.parse(localStorage.getItem(SLOTS_KEY)); return Array.isArray(l) ? l : []; } catch (e) { return []; }
  },
  writeSlots(l) { try { localStorage.setItem(SLOTS_KEY, JSON.stringify(l)); } catch (e) { /* storage blocked */ } },

  // the save from before there were several games becomes "PELI 1"
  migrate() {
    try {
      if (localStorage.getItem(SLOTS_KEY)) return;
      const old = validSave(JSON.parse(localStorage.getItem(SAVE_KEY)));
      if (!old) return;
      const id = this.newId();
      localStorage.setItem(slotKey(id), JSON.stringify(old));
      this.writeSlots([{ id, name: 'PELI 1', time: old.time || Date.now() }]);
      localStorage.removeItem(SAVE_KEY);
    } catch (e) { /* storage blocked */ }
  },

  newId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); },

  // all games that can be continued, newest first: [{ id, name, time, data }]
  list() {
    return this.slots()
      .map(s => ({ ...s, data: this.load(s.id) }))
      .filter(s => s.data)
      .sort((a, b) => (b.data.time || 0) - (a.data.time || 0));
  },

  exists() { return this.list().length > 0; },

  load(id = this.slotId) {
    if (!id) return null;
    try { return validSave(JSON.parse(localStorage.getItem(slotKey(id)))); } catch (e) { return null; }
  },

  // start a new, empty game in the list
  create(name) {
    const id = this.newId();
    this.slotId = id; this.slotName = name;
    this.writeSlots([...this.slots(), { id, name, time: Date.now() }]);
  },

  rename(id, name) {
    this.writeSlots(this.slots().map(s => (s.id === id ? { ...s, name } : s)));
    if (id === this.slotId) this.slotName = name;
  },

  remove(id) {
    this.writeSlots(this.slots().filter(s => s.id !== id));
    try { localStorage.removeItem(slotKey(id)); } catch (e) { /* storage blocked */ }
  },

  // continue this game
  use(slot) { this.slotId = slot.id; this.slotName = slot.name; },

  // a free default name: PELI 1, PELI 2, ...
  defaultName() {
    const names = new Set(this.slots().map(s => s.name));
    let n = 1; while (names.has('PELI ' + n)) n++;
    return 'PELI ' + n;
  },

  // only while walking around: never in the middle of a battle or a transition
  canSave() { return game.view === 'overworld' && !game.locked && game.party.length > 0; },

  save(show = false) {
    if (!this.canSave() || !this.slotId) return false;
    const p = overworld.player;
    const pack = m => ({
      species: m.species, level: m.level, xp: m.xp, hp: m.hp, status: m.status || null, sleepTurns: m.sleepTurns || 0, shiny: !!m.shiny,
      moves: m.moves.map(x => ({ id: x.id, left: x.left })),
    });
    const d = {
      v: 1, time: Date.now(),
      party: game.party.map(pack),
      pc: game.pc.map(pack),
      coins: game.coins, balls: game.balls, greatBalls: game.greatBalls, ultraBalls: game.ultraBalls, masterBalls: game.masterBalls,
      caught: game.caught, shinyCharm: game.shinyCharm,
      guardianBeaten: game.guardianBeaten, regisCaught: game.regisCaught, shards: game.shards, shardsGiven: game.shardsGiven,
      map: overworld.map.id, x: p.tx, y: p.ty, dir: p.dir,
    };
    try { localStorage.setItem(slotKey(this.slotId), JSON.stringify(d)); } catch (e) { return false; }
    // keep the game in the list (it may have been removed in another tab)
    const l = this.slots();
    const s = l.find(x => x.id === this.slotId);
    if (s) s.time = d.time; else l.push({ id: this.slotId, name: this.slotName, time: d.time });
    this.writeSlots(l);
    if (show) this.flash = 90;
    showSaveMsg(`${this.slotName}: tallennettu klo ${clockTime(d.time)}`);
    return true;
  },

  // put a save back into the game; skips anything that no longer exists in the code
  apply(d) {
    const party = d.party.map(restoreMon).filter(Boolean);
    game.pc = (Array.isArray(d.pc) ? d.pc : []).map(restoreMon).filter(Boolean);
    if (!party.length) return false;
    game.party = party;
    game.coins = Math.max(0, d.coins | 0);
    game.balls = Math.max(0, d.balls | 0);
    game.greatBalls = Math.max(0, d.greatBalls | 0);
    game.ultraBalls = Math.max(0, d.ultraBalls | 0);
    game.masterBalls = Math.max(0, d.masterBalls | 0);
    // older saves have no collection yet: start it from the team (the starter does not count)
    game.caught = (Array.isArray(d.caught) ? d.caught : party.map(m => m.species)).filter(id => SPECIES[id] && id !== 'duckonda');
    // evolving counts too: forms already evolved in the team or the PC (from before this rule) join the collection
    const owned = [...party, ...game.pc].map(m => m.species).filter(id => catchableSpecies().includes(id));
    game.caught = [...new Set([...game.caught, ...owned])];
    game.shinyCharm = !!d.shinyCharm;
    game.guardianBeaten = !!d.guardianBeaten;
    game.regisCaught = (Array.isArray(d.regisCaught) ? d.regisCaught : []).filter(id => SPECIES[id]);
    game.shards = (Array.isArray(d.shards) ? d.shards : []).filter(id => typeof id === 'string');
    game.shardsGiven = !!d.shardsGiven;
    const map = MAPS[d.map] ? d.map : 'forest';
    const m = MAPS[map];
    let x = d.x | 0, y = d.y | 0;
    if (x < 0 || y < 0 || x >= m.w || y >= m.h || SOLID.has(m.rows[y][x]) || m.warps[`${x},${y}`]) {
      ({ x, y } = MAPS.forest.spawn);   // a bad spot (map was edited): back to the start
      overworld.enterMap('forest', x, y, 'up');
    } else {
      overworld.enterMap(map, x, y, DIRS[d.dir] ? d.dir : 'down');
    }
    return true;
  },

  // short text for the title screen, e.g. "DUCKONDA LV7 · 3 OTUSTA"
  summary(d) {
    const lead = d.party[0];
    const sp = SPECIES[lead.species];
    return `${sp ? sp.name : '?'}${lead.shiny ? '★' : ''} LV${lead.level}  ${d.party.length} ${d.party.length === 1 ? 'OTUS' : 'OTUSTA'}`;
  },
};

function restoreMon(s) {
  if (!s || !SPECIES[s.species]) return null;
  const m = makeMon(s.species, Math.max(1, s.level | 0));
  m.xp = Math.max(xpForLevel(m.level), s.xp | 0);
  m.hp = Math.max(0, Math.min(m.maxHp, s.hp | 0));
  m.status = ['par', 'psn', 'brn', 'slp'].includes(s.status) ? s.status : null;
  if (m.status === 'slp') m.sleepTurns = Math.max(1, s.sleepTurns | 0) || 2;
  m.shiny = !!s.shiny;
  const moves = (s.moves || []).filter(x => MOVES[x.id]).map(x => ({ ...MOVES[x.id], left: Math.max(0, Math.min(MOVES[x.id].pp, x.left | 0)) }));
  if (moves.length) m.moves = moves;
  return m;
}

// ---------- the "Tallenna" button on the page ----------
const clockTime = t => new Date(t).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });

function showSaveMsg(text, bad = false) {
  const el = document.getElementById('saveMsg');
  if (!el) return;
  el.textContent = text;
  el.classList.toggle('bad', bad);
}

(function setupSaveButton() {
  const btn = document.getElementById('saveBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.blur();   // so Space / Enter keep controlling the game, not the button
    if (game.view === 'title' || !game.party.length) { showSaveMsg('Aloita tai jatka peliä ensin.', true); return; }
    if (game.view === 'battle') { showSaveMsg('Taistelun aikana ei voi tallentaa. Peli tallentuu taistelun jälkeen.', true); return; }
    if (game.locked) { showSaveMsg('Odota hetki ja yritä uudelleen.', true); return; }
    if (!saveGame.save(true)) showSaveMsg('Tallennus ei onnistunut (selain estää tallennuksen?).', true);
  });
  // keep touches on the button from reaching the game controls
  btn.addEventListener('pointerdown', e => e.stopPropagation());
  saveGame.migrate();
  const last = saveGame.list()[0];
  if (last) showSaveMsg(`Viimeksi tallennettu: ${last.name} klo ${clockTime(last.data.time)}`);
})();

// ---------- naming a game: a small dialog with a text field (works with phone keyboards too) ----------
window.nameOpen = false;
const NAME_OK = /[A-Z0-9ÄÖÅ .,!?:'\-\/()+%]/;

function askName(title, initial, done) {
  window.nameOpen = true;
  for (const k in held) held[k] = false;
  dirStack.length = 0;
  const el = document.createElement('div');
  el.id = 'nameDlg';
  el.innerHTML = `
    <form class="nameBox">
      <label for="nameInput">${title}</label>
      <input id="nameInput" type="text" maxlength="${NAME_MAX}" autocomplete="off" spellcheck="false" enterkeyhint="done">
      <div class="nameHint">Enintään ${NAME_MAX} merkkiä: kirjaimet, numerot ja välilyönti.</div>
      <div class="nameBtns"><button type="button" data-cancel>Peruuta</button><button type="submit">OK</button></div>
    </form>`;
  document.body.appendChild(el);
  const input = el.querySelector('input');
  input.value = initial;
  const clean = s => [...s.toUpperCase()].filter(c => NAME_OK.test(c)).join('').replace(/\s+/g, ' ').slice(0, NAME_MAX);
  input.addEventListener('input', () => {
    const c = clean(input.value);
    if (c !== input.value) input.value = c;
  });
  const finish = name => {
    el.remove();
    window.nameOpen = false;
    done(name);
  };
  el.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    finish(clean(input.value).trim() || initial);
  });
  el.querySelector('[data-cancel]').addEventListener('click', () => finish(null));
  el.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Escape') finish(null); });
  el.addEventListener('pointerdown', e => e.stopPropagation());
  setTimeout(() => { input.focus(); input.select(); }, 30);
}

(function nameDlgStyle() {
  const style = document.createElement('style');
  style.textContent = `
    #nameDlg { position: fixed; inset: 0; z-index: 980; background: rgba(8,8,14,.6); display: flex; align-items: center; justify-content: center; }
    #nameDlg .nameBox { width: min(340px, 92vw); box-sizing: border-box; padding: 16px; background: #1d2030; color: #e6e9f2;
                 border: 2px solid #f4df1a; border-radius: 10px; font: 14px system-ui, sans-serif; display: grid; gap: 10px;
                 box-shadow: 0 10px 40px rgba(0,0,0,.6); }
    #nameDlg label { font-weight: 700; font-size: 16px; }
    #nameDlg input { font: 700 20px monospace; letter-spacing: .08em; padding: 8px 10px; border-radius: 6px; border: 2px solid #6a74a0;
                 background: #f8f8f0; color: #283040; text-transform: uppercase; }
    #nameDlg .nameHint { font-size: 12px; color: #9aa3b5; }
    #nameDlg .nameBtns { display: flex; justify-content: flex-end; gap: 8px; }
    #nameDlg button { font: 600 14px system-ui, sans-serif; color: #fff; background: #3a4260; border: 1px solid #6a74a0;
                 border-radius: 6px; padding: 7px 16px; cursor: pointer; }
    #nameDlg button[type=submit] { background: #3f8a3c; border-color: #6fc06a; }`;
  document.head.appendChild(style);
})();

// save when the page is closed, reloaded or put in the background
addEventListener('pagehide', () => saveGame.save());
document.addEventListener('visibilitychange', () => { if (document.hidden) saveGame.save(); });
