// ---------- Hidden admin panel ----------
// Opens with the code: write it in the "Koodi" field next to the save button and press Enter,
// or type it anywhere on a keyboard (or tap the save text 5 times for a code box).
// Only a hash of the code is stored here, so the code itself is not in the source.
window.adminOpen = false;
const ADMIN_HASH = '5f58e7b4';
const codeHash = s => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };

const admin = {
  el: null,

  toggle() {
    window.adminOpen = !window.adminOpen;
    if (window.adminOpen) {
      for (const k in held) held[k] = false;   // let go of any game keys
      dirStack.length = 0;
      this.render();
      this.el.style.display = 'block';
    } else {
      this.el.style.display = 'none';
      if (saveGame.canSave()) saveGame.save();
    }
  },

  msg(text) { const m = this.el.querySelector('#admMsg'); if (m) m.textContent = text; },

  // after any change: refresh the panel and keep the save up to date
  changed(text) {
    this.render();
    if (saveGame.canSave()) saveGame.save();
    this.msg(text);
  },

  render() {
    const p = game.party;
    const speciesOpts = Object.keys(SPECIES).map(id => `<option value="${id}">${SPECIES[id].name}</option>`).join('');
    const mapOpts = Object.keys(MAPS).map(id => `<option value="${id}"${overworld.map.id === id ? ' selected' : ''}>${MAPS[id].name}</option>`).join('');
    const team = p.map((m, i) => `
      <div class="admRow">
        <b>${m.name}${m.shiny ? ' ★' : ''}</b> LV <input type="number" min="1" max="100" value="${m.level}" data-lv="${i}" style="width:52px">
        ${m.hp}/${m.maxHp} HP
        <button data-act="setlv" data-i="${i}">Aseta taso</button>
        <button data-act="shiny" data-i="${i}">${m.shiny ? 'Tavallinen' : 'Kiiltävä'}</button>
        <button data-act="lead" data-i="${i}"${i === 0 ? ' disabled' : ''}>Johtajaksi</button>
        <button data-act="remove" data-i="${i}"${p.length <= 1 ? ' disabled' : ''}>Poista</button>
      </div>`).join('') || '<div class="admRow">(ei otuksia – aloita peli ensin)</div>';
    this.el.innerHTML = `
      <div class="admHead"><span>⚙ ADMIN</span><button data-act="close">Sulje ✕</button></div>
      <div id="admMsg" class="admMsg"></div>

      <h4>Kolikot ja pallot</h4>
      <div class="admRow">Kolikot <b>${game.coins}</b>
        <button data-act="coins" data-n="100">+100</button><button data-act="coins" data-n="1000">+1000</button>
        <input type="number" min="0" id="admCoins" value="${game.coins}" style="width:80px"><button data-act="setcoins">Aseta</button></div>
      <div class="admRow">PYYDYSPALLOT <b>${game.balls}</b>
        <button data-act="balls" data-n="1">+1</button><button data-act="balls" data-n="10">+10</button><button data-act="balls" data-n="99">+99</button></div>
      <div class="admRow">GREAT PALLOT <b>${game.greatBalls}</b>
        <button data-act="great" data-n="1">+1</button><button data-act="great" data-n="10">+10</button><button data-act="great" data-n="99">+99</button></div>
      <div class="admRow">ULTRA PALLOT <b>${game.ultraBalls}</b>
        <button data-act="ultra" data-n="1">+1</button><button data-act="ultra" data-n="10">+10</button><button data-act="ultra" data-n="99">+99</button></div>
      <div class="admRow">MASTER PALLOT <b>${game.masterBalls}</b>
        <button data-act="master" data-n="1">+1</button><button data-act="master" data-n="10">+10</button><button data-act="master" data-n="99">+99</button></div>

      <h4>Tiimi (${p.length}/6)</h4>
      ${team}
      <div class="admRow"><button data-act="heal">Paranna koko tiimi</button></div>

      <h4>Lisää otus tiimiin</h4>
      <div class="admRow"><select id="admSpecies">${speciesOpts}</select>
        LV <input type="number" min="1" max="100" value="10" id="admLevel" style="width:52px">
        <label><input type="checkbox" id="admShiny"> kiiltävä</label>
        <button data-act="add"${p.length >= 6 ? ' disabled' : ''}>Lisää</button></div>

      <h4>Siirry alueelle</h4>
      <div class="admRow"><select id="admMap">${mapOpts}</select><button data-act="warp">Siirry</button></div>

      <h4>Kokoelma ja SHINY CHARM</h4>
      <div class="admRow">Napattu <b>${catchableSpecies().filter(id => game.caught.includes(id)).length}/${catchableSpecies().length}</b>
        · SHINY CHARM <b>${game.shinyCharm ? 'ON (1/100)' : 'EI (1/150)'}</b> · BEAST CHARM <b>${game.beastCharm ? 'ON' : 'EI'}</b></div>
      <div class="admRow"><button data-act="catchall">Merkitse kaikki napatuiksi</button>
        <button data-act="charm">${game.shinyCharm ? 'Poista' : 'Anna'} SHINY CHARM</button>
        <button data-act="beastcharm">${game.beastCharm ? 'Poista' : 'Anna'} BEAST CHARM</button>
        <button data-act="resetdex">Tyhjennä kokoelma</button></div>

      <h4>REGI TEMPPELI</h4>
      <div class="admRow">MEGA GRAVENDER <b>${game.megaBossBeaten ? 'voitettu' : game.bossQuest ? 'kirkko auki' : 'ei aloitettu'}</b> <button data-act="bossReset">Palauta pomo</button>
        · Mega-kehitys <b>${(game.megaNextAt || 0) > Date.now() ? 'odottaa' : 'valmis'}</b> <button data-act="megaReady">Mega valmiiksi</button></div>
      <div class="admRow">TYHJÄT TM:T <b>${game.emptyTMs}</b> <button data-act="tms" data-n="1">+1</button><button data-act="tms" data-n="5">+5</button>
        · FALSE SWIPE TM <b>${game.falseSwipeTM ? 'on' : 'ei'}</b> <button data-act="fstm">${game.falseSwipeTM ? 'Poista' : 'Anna'}</button></div>
      <div class="admRow">REGI SHARDIT <b>${game.shards.length}/${SHARD_TOTAL}${game.shardsGiven ? ', annettu' : ''}</b>
        <button data-act="shards">Kaikki shardit</button><button data-act="shardsReset">Palauta shardit</button></div>
      <div class="admRow">Napatut regit <b>${game.regisCaught.map(id => SPECIES[id].name).join(', ') || '-'}</b>
        <button data-act="regis"${game.regisCaught.length ? '' : ' disabled'}>Palauta regit jalustoille</button></div>

      <h4>Muuta</h4>
      <div class="admRow"><button data-act="save">Tallenna nyt</button>
        <button data-act="battle">Aloita taistelu</button> <select id="admFoe">${speciesOpts}</select>
        <label><input type="checkbox" id="admFoeShiny"> kiiltävä</label></div>
    `;
  },

  act(a, btn) {
    const i = +btn.dataset.i, n = +btn.dataset.n;
    const ow = game.view === 'overworld' && !game.locked;
    switch (a) {
      case 'close': this.toggle(); return;
      case 'coins': game.coins += n; return this.changed(`+${n} kolikkoa`);
      case 'setcoins': game.coins = Math.max(0, parseInt(this.el.querySelector('#admCoins').value, 10) || 0); return this.changed('Kolikot asetettu');
      case 'balls': game.balls += n; return this.changed(`+${n} ${BALL_NAME}A`);
      case 'great': game.greatBalls += n; return this.changed(`+${n} ${GREAT_NAME}A`);
      case 'ultra': game.ultraBalls += n; return this.changed(`+${n} ${ULTRA_NAME}A`);
      case 'master': game.masterBalls += n; return this.changed(`+${n} ${MASTER_NAME}A`);
      case 'heal': healParty(); return this.changed('Tiimi parannettu');
      case 'setlv': {
        const m = game.party[i]; if (!m) return;
        const L = Math.max(1, Math.min(100, parseInt(this.el.querySelector(`[data-lv="${i}"]`).value, 10) || m.level));
        m.level = L; m.xp = xpForLevel(L); calcStats(m); m.hp = m.maxHp;
        return this.changed(`${m.name} on nyt tasolla ${L}`);
      }
      case 'shiny': { const m = game.party[i]; if (!m) return; if (!m.shiny && !hasShinyArt(m.species)) return this.msg(`${m.name}: kiiltävää kuvaa ei vielä ole`); m.shiny = !m.shiny; return this.changed(`${m.name}: ${m.shiny ? 'kiiltävä' : 'tavallinen'}`); }
      case 'lead': { const [m] = game.party.splice(i, 1); game.party.unshift(m); return this.changed(`${m.name} johtaa tiimiä`); }
      case 'remove': { if (game.party.length <= 1) return; const [m] = game.party.splice(i, 1); return this.changed(`${m.name} poistettu`); }
      case 'add': {
        if (game.party.length >= 6) return this.msg('Tiimi on täynnä (6)');
        const sp = this.el.querySelector('#admSpecies').value;
        const L = Math.max(1, Math.min(100, parseInt(this.el.querySelector('#admLevel').value, 10) || 5));
        const m = makeMon(sp, L); m.shiny = this.el.querySelector('#admShiny').checked && hasShinyArt(sp);
        game.party.push(m);
        return this.changed(`${m.name}${m.shiny ? ' ★' : ''} LV${L} lisätty`);
      }
      case 'warp': {
        if (!ow) return this.msg('Siirtyminen onnistuu vain kävellessä (ei taistelussa).');
        const id = this.el.querySelector('#admMap').value, m = MAPS[id];
        const spot = { forest: m.spawn, hyujal: { x: 12, y: 2 }, sea: { x: 2, y: 10 }, snow: { x: 12, y: 17 }, temple: { x: 11, y: 20 }, space: { x: 9, y: 21 }, duo: { x: 2, y: 11 }, grave: { x: 2, y: 16 }, town: { x: 27, y: 10 }, farm: { x: 27, y: 10 } }[id] || m.spawn || { x: 1, y: 1 };
        overworld.enterMap(id, spot.x, spot.y, 'down');
        music.play(m.music);
        return this.changed(`Siirrytty: ${m.name}`);
      }
      case 'catchall': game.caught = catchableSpecies(); game.shinyCharm = true; game.beastCharm = true; return this.changed('Kaikki merkitty napatuiksi, SHINY CHARM ja BEAST CHARM annettu');
      case 'charm': game.shinyCharm = !game.shinyCharm; return this.changed(`SHINY CHARM ${game.shinyCharm ? 'annettu' : 'poistettu'}`);
      case 'beastcharm': game.beastCharm = !game.beastCharm; return this.changed(`BEAST CHARM ${game.beastCharm ? 'annettu' : 'poistettu'}`);
      case 'resetdex': game.caught = []; game.shinyCharm = false; game.beastCharm = false; return this.changed('Kokoelma tyhjennetty');
      case 'save': return this.msg(saveGame.save(true) ? 'Tallennettu' : 'Tallennus onnistuu vain kävellessä.');
      case 'battle': {
        if (!ow) return this.msg('Taistelun voi aloittaa vain kävellessä.');
        if (!game.party.some(m => m.hp > 0)) healParty();
        const foe = this.el.querySelector('#admFoe').value, shiny = this.el.querySelector('#admFoeShiny').checked;
        this.toggle();
        // regis fight like on their pedestals (level 50); the only way to meet a shiny regi
        startEncounter(foe, SPECIES[foe].legendary ? 'regi' : 'bush',
          { ...(SPECIES[foe].legendary ? { regi: true, level: 50 } : {}), ...(shiny ? { shiny: true } : {}) });
        return;
      }
      case 'regis': game.regisCaught = []; return this.changed('Regit palautettu jalustoille');
      case 'bossReset': game.bossQuest = false; game.megaBossBeaten = false; return this.changed('MEGA GRAVENDER palautettu torniin');
      case 'megaReady': game.megaNextAt = 0; return this.changed('Mega-kehityksen odotus nollattu');
      case 'tms': game.emptyTMs += n; return this.changed(`+${n} TYHJÄ TM`);
      case 'fstm': game.falseSwipeTM = !game.falseSwipeTM; return this.changed(`FALSE SWIPE TM ${game.falseSwipeTM ? 'annettu' : 'poistettu'}`);
      case 'shards': game.shards = Object.values(MAPS).filter(q => q.shard).map(q => q.id); return this.changed('Kaikki REGI SHARDIT kerätty');
      case 'shardsReset': game.shards = []; game.shardsGiven = false; return this.changed('REGI SHARDIT palautettu kartoille');
    }
  },

  setup() {
    const el = document.createElement('div');
    el.id = 'admin';
    el.style.display = 'none';
    document.body.appendChild(el);
    this.el = el;
    el.addEventListener('click', e => { const b = e.target.closest('button[data-act]'); if (b && !b.disabled) this.act(b.dataset.act, b); });
    el.addEventListener('pointerdown', e => e.stopPropagation());
    const style = document.createElement('style');
    style.textContent = `
      #admin { position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 1000;
               width: min(560px, 94vw); max-height: 88vh; overflow: auto; box-sizing: border-box; padding: 12px 16px;
               background: #1d2030; color: #e6e9f2; border: 2px solid #5a6488; border-radius: 10px;
               font: 14px system-ui, sans-serif; box-shadow: 0 10px 40px rgba(0,0,0,.6); touch-action: auto; user-select: text; }
      #admin h4 { margin: 12px 0 6px; color: #f4df1a; font-size: 13px; letter-spacing: .05em; text-transform: uppercase; }
      #admin .admHead { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 16px; }
      #admin .admRow { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 4px 0; }
      #admin button { font: 600 13px system-ui, sans-serif; color: #fff; background: #3a4260; border: 1px solid #6a74a0;
                      border-radius: 6px; padding: 4px 9px; cursor: pointer; }
      #admin button:hover { background: #4a5478; }
      #admin button:disabled { opacity: .4; cursor: default; }
      #admin input, #admin select { font: 13px system-ui, sans-serif; background: #12141e; color: #e6e9f2;
                                    border: 1px solid #4a5170; border-radius: 5px; padding: 3px 5px; }
      #admin .admMsg { min-height: 18px; color: #7ee08a; font-size: 13px; margin-top: 4px; }`;
    document.head.appendChild(style);

    // keyboard: typing the code anywhere (outside text fields) opens / closes the panel
    let typed = '';
    addEventListener('keydown', e => {
      if (e.code === 'Escape' && window.adminOpen) { this.toggle(); return; }
      if (e.repeat || e.key.length !== 1 || e.target.closest && e.target.closest('input, textarea, select')) return;
      typed = (typed + e.key.toLowerCase()).slice(-24);
      for (let i = 0; i < typed.length; i++) {
        if (codeHash(typed.slice(i)) === ADMIN_HASH) { typed = ''; e.preventDefault(); this.toggle(); return; }
      }
    });

    // the "Koodi" field on the page (next to the save button): write the code and press Enter / OK
    const form = document.getElementById('codeForm'), field = document.getElementById('codeInput');
    if (form && field) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const ok = codeHash(field.value.trim().toLowerCase()) === ADMIN_HASH;
        if (ok) {
          field.value = '';
          field.blur();   // the arrow keys / Z control the game again
          if (!window.adminOpen) this.toggle();
        } else {          // wrong: keep the text so it can be fixed, and flash the border red
          field.classList.add('bad'); setTimeout(() => field.classList.remove('bad'), 900);
        }
      });
      field.addEventListener('keydown', e => e.stopPropagation());       // typing here never moves the player
      form.addEventListener('pointerdown', e => e.stopPropagation());    // the field and OK are not game controls
    }

    // phones: 5 quick taps on the text next to the save button show a small code box
    const tapZone = document.getElementById('saveMsg');
    let taps = [];
    if (tapZone) tapZone.addEventListener('pointerdown', e => e.stopPropagation());   // not a game control
    if (tapZone) tapZone.addEventListener('click', () => {
      const now = Date.now();
      taps = taps.filter(t => now - t < 2500).concat(now);
      if (taps.length >= 5) { taps = []; this.askCode(); }
    });
  },

  askCode() {
    if (window.adminOpen || document.getElementById('codeBox')) return;
    const box = document.createElement('div');
    box.id = 'codeBox';
    box.innerHTML = `
      <form class="codeForm">
        <input type="password" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="go" aria-label="Koodi" placeholder="Koodi">
        <button type="submit">OK</button><button type="button" data-x>✕</button>
        <div class="codeMsg"></div>
      </form>`;
    document.body.appendChild(box);
    const input = box.querySelector('input'), msg = box.querySelector('.codeMsg');
    const close = () => box.remove();
    box.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      if (codeHash(input.value.trim().toLowerCase()) === ADMIN_HASH) { close(); this.toggle(); }
      else { msg.textContent = 'Väärä koodi'; input.select(); }
    });
    box.querySelector('[data-x]').addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    box.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Escape') close(); });   // keys go to the box, not the game
    box.addEventListener('pointerdown', e => e.stopPropagation());
    setTimeout(() => input.focus(), 30);
  },
};

(function codeBoxStyle() {
  const style = document.createElement('style');
  style.textContent = `
    #codeBox { position: fixed; inset: 0; z-index: 1001; background: rgba(8,8,14,.5); display: flex; align-items: center; justify-content: center; }
    #codeBox .codeForm { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 12px; background: #1d2030;
      border: 2px solid #5a6488; border-radius: 10px; width: min(300px, 90vw); box-sizing: border-box; }
    #codeBox input { flex: 1; min-width: 0; font: 16px system-ui, sans-serif; padding: 7px 9px; border-radius: 6px;
      border: 1px solid #4a5170; background: #12141e; color: #e6e9f2; }
    #codeBox button { font: 600 14px system-ui, sans-serif; color: #fff; background: #3a4260; border: 1px solid #6a74a0;
      border-radius: 6px; padding: 7px 11px; cursor: pointer; }
    #codeBox .codeMsg { width: 100%; min-height: 16px; color: #e08a8a; font: 13px system-ui, sans-serif; }
    #saveMsg { min-width: 60px; min-height: 22px; display: inline-block; }`;
  document.head.appendChild(style);
})();

admin.setup();
