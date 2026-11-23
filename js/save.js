// ---------- Saving: the game is stored in this browser (localStorage) ----------
// Saved automatically after battles, area changes, the HOITOLA / kiosk, every few seconds while walking,
// and when the page is closed or hidden. Each browser/device has its own save.
const SAVE_KEY = 'veylora-save-v1';

const saveGame = {
  flash: 0,          // frames to show "TALLENNETTU"

  exists() { return !!this.load(); },

  load() {
    try {
      const d = JSON.parse(localStorage.getItem(SAVE_KEY));
      return d && d.v === 1 && Array.isArray(d.party) && d.party.length ? d : null;
    } catch (e) { return null; }
  },

  // only while walking around: never in the middle of a battle or a transition
  canSave() { return game.view === 'overworld' && !game.locked && game.party.length > 0; },

  save(show = false) {
    if (!this.canSave()) return false;
    const p = overworld.player;
    const d = {
      v: 1, time: Date.now(),
      party: game.party.map(m => ({
        species: m.species, level: m.level, xp: m.xp, hp: m.hp, status: m.status || null, shiny: !!m.shiny,
        moves: m.moves.map(x => ({ id: x.id, left: x.left })),
      })),
      coins: game.coins, balls: game.balls, greatBalls: game.greatBalls,
      map: overworld.map.id, x: p.tx, y: p.ty, dir: p.dir,
    };
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); } catch (e) { return false; }
    if (show) this.flash = 90;
    showSaveMsg('Tallennettu klo ' + clockTime(d.time));
    return true;
  },

  clear() { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* storage blocked */ } },

  // put a save back into the game; skips anything that no longer exists in the code
  apply(d) {
    const party = d.party.map(restoreMon).filter(Boolean);
    if (!party.length) return false;
    game.party = party;
    game.coins = Math.max(0, d.coins | 0);
    game.balls = Math.max(0, d.balls | 0);
    game.greatBalls = Math.max(0, d.greatBalls | 0);
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
  m.status = ['par', 'psn', 'brn'].includes(s.status) ? s.status : null;
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
  const old = saveGame.load();
  if (old) showSaveMsg('Viimeksi tallennettu klo ' + clockTime(old.time));
})();

// save when the page is closed, reloaded or put in the background
addEventListener('pagehide', () => saveGame.save());
document.addEventListener('visibilitychange', () => { if (document.hidden) saveGame.save(); });
