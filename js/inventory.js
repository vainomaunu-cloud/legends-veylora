// ---------- Reppu (inventory): balls and the team, from the button under the game ----------
// Shows only the team, not the creatures stored in the PC.
window.invOpen = false;

const inventory = {
  el: null,

  open() {
    window.invOpen = true;
    for (const k in held) held[k] = false;   // let go of any game keys
    dirStack.length = 0;
    this.render();
    this.el.style.display = 'flex';
  },

  close() {
    window.invOpen = false;
    this.el.style.display = 'none';
  },

  render() {
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const statusName = { par: 'Halvaantunut', psn: 'Myrkytetty', brn: 'Palovamma', slp: 'Nukkuu' };
    let team;
    if (!game.party.length) {
      team = '<p class="invNote">Aloita tai jatka peliä nähdäksesi tiimisi.</p>';
    } else {
      team = game.party.map(m => {
        const sp = SPECIES[m.species];
        const key = spriteKey(m, sp.sprites.front);
        const img = IMG[key] ? IMG[key].src : '';
        const f = m.hp / m.maxHp;
        const color = f > 0.5 ? '#48c050' : f > 0.2 ? '#e8b830' : '#e04838';
        const next = xpForLevel(m.level + 1), lo = xpForLevel(m.level);
        const moves = m.moves.map(x => `<span class="invMove">${esc(x.name)} <small>${x.left}/${x.pp}</small></span>`).join('');
        return `
          <div class="invMon">
            <img src="${img}" alt="${esc(m.name)}">
            <div class="invInfo">
              <div class="invName">${esc(m.name)}${m.shiny ? ' <span class="invStar">★</span>' : ''} <span class="invLv">LV ${m.level}</span>
                ${m.status ? `<span class="invStatus">${statusName[m.status] || m.status}</span>` : ''}</div>
              <div class="invBar"><div style="width:${Math.round(f * 100)}%;background:${color}"></div></div>
              <div class="invSmall">HP ${m.hp}/${m.maxHp} · XP ${m.xp - lo}/${next - lo}</div>
              <div class="invMoves">${moves}</div>
            </div>
          </div>`;
      }).join('');
    }
    this.el.innerHTML = `
      <div class="invBox" role="dialog" aria-label="Reppu">
        <div class="invHead"><span>🎒 Reppu</span><button type="button" data-close>Sulje ✕</button></div>
        <div class="invItems">
          <div class="invItem"><img src="sprites/ball.png" class="invBall" alt=""> PYYDYSPALLOT <b>${game.balls}</b></div>
          <div class="invItem"><img src="sprites/great_ball.png" class="invBall" alt=""> GREAT PALLOT <b>${game.greatBalls}</b></div>
          <div class="invItem"><img src="sprites/ultra_ball.png" class="invBall" alt=""> ULTRA PALLOT <b>${game.ultraBalls}</b></div>
          <div class="invItem"><img src="sprites/master_ball.png" class="invBall" alt=""> MASTER PALLOT <b>${game.masterBalls}</b></div>
          ${game.shards.length || game.shardsGiven ? `<div class="invItem"><img src="sprites/regi_shard.png" class="invBall" alt=""> REGI SHARDIT <b>${game.shardsGiven ? "annettu" : game.shards.length + "/" + SHARD_TOTAL}</b></div>` : ""}
          <div class="invItem">🪙 KOLIKOT <b>${game.coins}</b></div>
        </div>
        <h4>Tiimi (${game.party.length}/6)</h4>
        ${team}
      </div>`;
  },

  setup() {
    const el = document.createElement('div');
    el.id = 'inventory';
    el.style.display = 'none';
    document.body.appendChild(el);
    this.el = el;
    el.addEventListener('click', e => {
      if (e.target === el || e.target.closest('[data-close]')) this.close();   // backdrop or close button
    });
    el.addEventListener('pointerdown', e => e.stopPropagation());
    addEventListener('keydown', e => {
      if (window.invOpen && (e.code === 'Escape' || e.code === 'KeyX')) { e.preventDefault(); this.close(); }
    });
    const btn = document.getElementById('invBtn');
    if (btn) {
      btn.addEventListener('click', () => { btn.blur(); if (window.pcOpen || window.dexOpen) return; window.invOpen ? this.close() : this.open(); });
      btn.addEventListener('pointerdown', e => e.stopPropagation());
    }
    const style = document.createElement('style');
    style.textContent = `
      #inventory { position: fixed; inset: 0; z-index: 900; background: rgba(8,8,14,.55);
                   align-items: center; justify-content: center; touch-action: auto; }
      #inventory .invBox { width: min(460px, 94vw); max-height: 88vh; overflow: auto; box-sizing: border-box; padding: 12px 16px;
                   background: #1d2030; color: #e6e9f2; border: 2px solid #c68a4a; border-radius: 10px;
                   font: 14px system-ui, sans-serif; box-shadow: 0 10px 40px rgba(0,0,0,.6); -webkit-overflow-scrolling: touch; }
      #inventory .invHead { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 17px; }
      #inventory button { font: 600 13px system-ui, sans-serif; color: #fff; background: #3a4260; border: 1px solid #6a74a0;
                   border-radius: 6px; padding: 5px 10px; cursor: pointer; }
      #inventory h4 { margin: 14px 0 6px; color: #f4df1a; font-size: 13px; letter-spacing: .05em; text-transform: uppercase; }
      #inventory .invItems { display: grid; gap: 6px; margin-top: 10px; }
      #inventory .invItem { display: flex; align-items: center; gap: 8px; background: #262a3c; border-radius: 6px; padding: 6px 10px; }
      #inventory .invItem b { margin-left: auto; font-size: 16px; }
      #inventory .invBall { width: 16px; height: 16px; object-fit: none; object-position: 0 0; image-rendering: pixelated; transform: scale(1.5); }
      #inventory .invMon { display: flex; gap: 10px; align-items: center; background: #262a3c; border-radius: 8px; padding: 6px 8px; margin: 6px 0; }
      #inventory .invMon img { width: 64px; height: 64px; image-rendering: pixelated; flex: none; background: #30364c; border-radius: 6px; }
      #inventory .invInfo { flex: 1; min-width: 0; }
      #inventory .invName { font-weight: 700; }
      #inventory .invStar { color: #e8b830; }
      #inventory .invLv { color: #9aa3b5; font-weight: 600; margin-left: 4px; }
      #inventory .invStatus { background: #5a4a7a; border-radius: 4px; padding: 0 5px; font-size: 11px; margin-left: 4px; }
      #inventory .invBar { height: 6px; background: #3a3f55; border-radius: 3px; margin: 4px 0; overflow: hidden; }
      #inventory .invBar div { height: 100%; }
      #inventory .invSmall { font-size: 12px; color: #9aa3b5; }
      #inventory .invMoves { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
      #inventory .invMove { background: #333a52; border-radius: 4px; padding: 1px 6px; font-size: 11px; }
      #inventory .invMove small { color: #9aa3b5; }
      #inventory .invNote { color: #9aa3b5; }`;
    document.head.appendChild(style);
  },
};

inventory.setup();
