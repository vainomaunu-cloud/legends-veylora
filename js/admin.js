// ---------- Hidden admin panel ----------
// Open/close by holding the keys 1, 8 and 7 down at the same time (number row or numpad).
// Not mentioned anywhere on the page.
window.adminOpen = false;

const admin = {
  el: null,
  held: new Set(),

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
        · SHINY CHARM <b>${game.shinyCharm ? 'ON (1/75)' : 'EI (1/100)'}</b></div>
      <div class="admRow"><button data-act="catchall">Merkitse kaikki napatuiksi</button>
        <button data-act="charm">${game.shinyCharm ? 'Poista' : 'Anna'} SHINY CHARM</button>
        <button data-act="resetdex">Tyhjennä kokoelma</button></div>

      <h4>Muuta</h4>
      <div class="admRow"><button data-act="save">Tallenna nyt</button>
        <button data-act="battle">Aloita taistelu</button> <select id="admFoe">${speciesOpts}</select></div>
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
      case 'heal': healParty(); return this.changed('Tiimi parannettu');
      case 'setlv': {
        const m = game.party[i]; if (!m) return;
        const L = Math.max(1, Math.min(100, parseInt(this.el.querySelector(`[data-lv="${i}"]`).value, 10) || m.level));
        m.level = L; m.xp = xpForLevel(L); calcStats(m); m.hp = m.maxHp;
        return this.changed(`${m.name} on nyt tasolla ${L}`);
      }
      case 'shiny': { const m = game.party[i]; if (!m) return; m.shiny = !m.shiny; return this.changed(`${m.name}: ${m.shiny ? 'kiiltävä' : 'tavallinen'}`); }
      case 'lead': { const [m] = game.party.splice(i, 1); game.party.unshift(m); return this.changed(`${m.name} johtaa tiimiä`); }
      case 'remove': { if (game.party.length <= 1) return; const [m] = game.party.splice(i, 1); return this.changed(`${m.name} poistettu`); }
      case 'add': {
        if (game.party.length >= 6) return this.msg('Tiimi on täynnä (6)');
        const sp = this.el.querySelector('#admSpecies').value;
        const L = Math.max(1, Math.min(100, parseInt(this.el.querySelector('#admLevel').value, 10) || 5));
        const m = makeMon(sp, L); m.shiny = this.el.querySelector('#admShiny').checked;
        game.party.push(m);
        return this.changed(`${m.name}${m.shiny ? ' ★' : ''} LV${L} lisätty`);
      }
      case 'warp': {
        if (!ow) return this.msg('Siirtyminen onnistuu vain kävellessä (ei taistelussa).');
        const id = this.el.querySelector('#admMap').value, m = MAPS[id];
        const spot = { forest: m.spawn, hyujal: { x: 12, y: 2 }, sea: { x: 2, y: 10 }, snow: { x: 12, y: 17 }, temple: { x: 11, y: 17 } }[id] || m.spawn || { x: 1, y: 1 };
        overworld.enterMap(id, spot.x, spot.y, 'down');
        music.play(m.music);
        return this.changed(`Siirrytty: ${m.name}`);
      }
      case 'catchall': game.caught = catchableSpecies(); game.shinyCharm = true; return this.changed('Kaikki merkitty napatuiksi, SHINY CHARM annettu');
      case 'charm': game.shinyCharm = !game.shinyCharm; return this.changed(`SHINY CHARM ${game.shinyCharm ? 'annettu' : 'poistettu'}`);
      case 'resetdex': game.caught = []; game.shinyCharm = false; return this.changed('Kokoelma tyhjennetty');
      case 'save': return this.msg(saveGame.save(true) ? 'Tallennettu' : 'Tallennus onnistuu vain kävellessä.');
      case 'battle': {
        if (!ow) return this.msg('Taistelun voi aloittaa vain kävellessä.');
        if (!game.party.some(m => m.hp > 0)) healParty();
        this.toggle();
        startEncounter(this.el.querySelector('#admFoe').value);
        return;
      }
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

    // secret: 1 + 8 + 7 held at the same time
    const digit = code => ({ Digit1: '1', Numpad1: '1', Digit8: '8', Numpad8: '8', Digit7: '7', Numpad7: '7' })[code];
    addEventListener('keydown', e => {
      const d = digit(e.code);
      if (!d || e.repeat) { if (e.code === 'Escape' && window.adminOpen) this.toggle(); return; }
      this.held.add(d);
      if (this.held.has('1') && this.held.has('8') && this.held.has('7')) {
        this.held.clear();
        e.preventDefault();
        this.toggle();
      }
    });
    addEventListener('keyup', e => { const d = digit(e.code); if (d) this.held.delete(d); });
    addEventListener('blur', () => this.held.clear());
  },
};

admin.setup();
