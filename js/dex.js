// ---------- KOKOELMA: a grid of cards with the creature sprites, opened from the HOITOLA menu ----------
// Caught (or evolved into) species show their sprite and name; the others are a dark silhouette "???".
// Tap / Z on a card shows details: big sprite (and the shiny one), stats, moves, evolution and where to find it.
// Keyboard: arrows move, Z / Enter opens and closes details, X / Esc goes back / closes.
window.dexOpen = false;

const DEX_STATS = [['hp', 'HP'], ['atk', 'HYÖKKÄYS'], ['def', 'PUOLUSTUS'], ['spa', 'ERIKOISHYÖKK.'], ['spd', 'ERIKOISPUOL.'], ['spe', 'NOPEUS']];

const dexScreen = {
  el: null,
  isOpen: false,
  cur: 0,          // card under the cursor
  detail: null,    // species id shown in the detail view
  shinyView: false,

  list() { return catchableSpecies(); },
  has(id) { return game.caught.includes(id); },
  cols() {
    const grid = this.el.querySelector('.dexGrid');
    if (!grid) return 5;
    return getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  },

  open() {
    this.isOpen = window.dexOpen = true;
    for (const k in held) held[k] = false;
    dirStack.length = 0;
    this.detail = null; this.shinyView = false;
    this.render();
    this.el.style.display = 'flex';
  },

  close() {
    this.isOpen = window.dexOpen = false;
    this.el.style.display = 'none';
  },

  img(id, shiny = false) {
    const key = (shiny ? 'shiny_' : '') + SPECIES[id].sprites.front;
    return IMG[key] ? IMG[key].src : '';
  },

  // where the species lives: bushes / fishing / palms / pedestals, per map
  whereFound(id) {
    const out = [];
    for (const m of Object.values(MAPS)) {
      for (const e of m.encounters || []) if (e.species === id) out.push(`${m.name}: ${m.encounterTiles ? 'kivellä' : 'puskat'} ${String(+(e.chance * 100).toFixed(1)).replace('.', ',')} %`);
      for (const e of m.fishing || []) if (e.species === id) out.push(`${m.name}: kalastus ${Math.round(e.chance * 100)} %`);
      for (const e of (m.wanderers && m.wanderers.species) || []) if (e.species === id) out.push(`${m.name}: vaeltaa kartalla`);
      if (m.palmBirds && m.palmBirds.species === id) out.push(`${m.name}: palmujen päällä`);
      if ((m.regis || []).includes(id)) out.push(`${m.name}: jalustalla (LV50)`);
    }
    return out;
  },

  evolution(id) {
    const sp = SPECIES[id], parts = [];
    const from = Object.keys(SPECIES).find(k => SPECIES[k].evolveTo === id);
    if (from) parts.push(`Kehittyy ${SPECIES[from].name}ista tasolla ${SPECIES[from].evolveAt}`);
    if (sp.evolveTo) parts.push(`Kehittyy ${SPECIES[sp.evolveTo].name}iksi tasolla ${sp.evolveAt}`);
    return parts;
  },

  difficulty(r) { return r >= 0.6 ? 'helppo' : r >= 0.45 ? 'keskitaso' : r >= 0.3 ? 'vaikea' : r >= 0.2 ? 'hyvin vaikea' : 'erittäin vaikea'; },

  render() {
    const all = this.list(), got = all.filter(id => this.has(id)).length;
    const need = charmSpecies(), have = need.filter(id => this.has(id)).length;
    const charm = game.shinyCharm ? '<span class="dexCharm on">✦ SHINY CHARM</span>' : `<span class="dexCharm">SHINY CHARM ${have}/${need.length}</span>`;
    const beasts = beastCharmSpecies(), gotBeasts = beasts.filter(id => this.has(id)).length;
    const beastCharm = game.beastCharm ? '<span class="dexCharm on">✦ BEAST CHARM</span>' : `<span class="dexCharm">BEAST CHARM ${gotBeasts}/${beasts.length}</span>`;
    const cards = all.map((id, i) => {
      const known = this.has(id), sp = SPECIES[id];
      return `<button type="button" class="dexCard${known ? '' : ' unknown'}${i === this.cur ? ' cur' : ''}${sp.legendary ? ' regi' : ''}" data-i="${i}">
          <span class="dexNo">#${String(i + 1).padStart(2, '0')}</span>
          <img src="${this.img(id)}" alt="" draggable="false">
          <span class="dexName">${known ? sp.name : '???'}</span>
        </button>`;
    }).join('');
    this.el.innerHTML = `
      <div class="dexWin" role="dialog" aria-label="KOKOELMA">
        <div class="dexHead">
          <div><div class="dexTitle">📖 KOKOELMA</div><div class="dexSub">Napattu ${got}/${all.length} · ${charm} · ${beastCharm}</div></div>
          <button type="button" data-close>Sulje ✕</button>
        </div>
        <div class="dexBar"><div style="width:${Math.round(got / all.length * 100)}%"></div></div>
        <div class="dexGrid">${cards}</div>
        ${this.detail ? this.detailHtml(this.detail) : ''}
      </div>`;
    const c = this.el.querySelector('.dexCard.cur');
    if (c && !this.detail) c.scrollIntoView({ block: 'nearest' });
  },

  detailHtml(id) {
    const sp = SPECIES[id], i = this.list().indexOf(id), known = this.has(id);
    if (!known) {
      return `<div class="dexDetail"><div class="dexCardBig">
          <button type="button" class="dexBack" data-back>← Takaisin</button>
          <div class="dexBigImg unknown"><img src="${this.img(id)}" alt=""></div>
          <div class="dexBigName">#${String(i + 1).padStart(2, '0')} ???</div>
          <p class="dexNote">Et ole vielä napannut tätä otusta. Nappaa tai kehitä se, niin näet sen tiedot!</p>
        </div></div>`;
    }
    const stats = DEX_STATS.map(([k, label]) => `
        <div class="dexStat"><span>${label}</span><b>${sp.base[k]}</b><div class="dexStatBar"><div style="width:${Math.min(100, Math.round(sp.base[k] / 130 * 100))}%"></div></div></div>`).join('');
    const moves = sp.moves.map(m => `<span class="dexMove">${MOVES[m].name}</span>`).join('');
    const where = this.whereFound(id);
    const evo = this.evolution(id);
    const shinyOk = !!IMG['shiny_' + sp.sprites.front];
    return `<div class="dexDetail"><div class="dexCardBig">
        <button type="button" class="dexBack" data-back>← Takaisin</button>
        <div class="dexBigImg${this.shinyView ? ' shiny' : ''}"><img src="${this.img(id, this.shinyView)}" alt="${sp.name}"></div>
        ${shinyOk ? `<button type="button" class="dexShinyBtn" data-shiny>${this.shinyView ? 'Näytä tavallinen' : '✦ Näytä kiiltävä'}</button>` : ''}
        <div class="dexBigName">#${String(i + 1).padStart(2, '0')} ${sp.name}${sp.legendary ? ' <span class="dexTag">REGI</span>' : ''}</div>
        <div class="dexSection"><h5>Ominaisuudet</h5>${stats}</div>
        <div class="dexSection"><h5>Liikkeet</h5><div class="dexMoves">${moves}</div></div>
        ${evo.length ? `<div class="dexSection"><h5>Kehitys</h5>${evo.map(t => `<div class="dexLine">${t}</div>`).join('')}</div>` : ''}
        <div class="dexSection"><h5>Mistä löytää</h5>${where.length ? where.map(t => `<div class="dexLine">${t}</div>`).join('') : '<div class="dexLine">Vain kehittämällä</div>'}</div>
        <div class="dexSection dexSmall">Voitosta ${sp.coins || 0} kolikkoa · nappaus: ${this.difficulty(sp.catchRate)}</div>
      </div></div>`;
  },

  showDetail(i) {
    const id = this.list()[i];
    if (!id) return;
    this.cur = i; this.detail = id; this.shinyView = false;
    this.render();
  },

  setup() {
    const el = document.createElement('div');
    el.id = 'dexScreen';
    el.style.display = 'none';
    document.body.appendChild(el);
    this.el = el;
    el.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) { this.close(); return; }
      if (e.target.closest('[data-back]')) { this.detail = null; this.render(); return; }
      if (e.target.closest('[data-shiny]')) { this.shinyView = !this.shinyView; this.render(); return; }
      const card = e.target.closest('.dexCard');
      if (card) { this.showDetail(+card.dataset.i); return; }
      if (e.target === el || e.target.classList.contains('dexDetail')) {   // tap outside: back / close
        if (this.detail) { this.detail = null; this.render(); } else this.close();
      }
    });
    el.addEventListener('pointerdown', e => e.stopPropagation());
    addEventListener('keydown', e => {
      if (!this.isOpen) return;
      e.preventDefault();
      if (e.repeat && ['KeyZ', 'Enter', 'Space'].includes(e.code)) return;
      const back = ['KeyX', 'Escape', 'Backspace'].includes(e.code), ok = ['KeyZ', 'Enter', 'Space'].includes(e.code);
      if (this.detail) {
        if (back || ok) { this.detail = null; this.render(); }
        else if (e.code === 'KeyS') { this.shinyView = !this.shinyView; this.render(); }
        else if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {   // flip to the next / previous species
          const n = this.list().length;
          this.showDetail((this.cur + (e.code === 'ArrowRight' ? 1 : n - 1)) % n);
        }
        return;
      }
      if (back) { this.close(); return; }
      if (ok) { this.showDetail(this.cur); return; }
      const n = this.list().length, cols = this.cols();
      if (e.code === 'ArrowRight') this.cur = (this.cur + 1) % n;
      else if (e.code === 'ArrowLeft') this.cur = (this.cur + n - 1) % n;
      else if (e.code === 'ArrowDown') this.cur = Math.min(n - 1, this.cur + cols);
      else if (e.code === 'ArrowUp') this.cur = Math.max(0, this.cur - cols);
      else return;
      this.render();
    });

    const style = document.createElement('style');
    style.textContent = `
      #dexScreen { position: fixed; inset: 0; z-index: 950; background: #10121c; align-items: center; justify-content: center; user-select: none; -webkit-user-select: none; }
      #dexScreen .dexWin { position: relative; box-sizing: border-box; width: min(760px, 98vw); max-height: 96vh; display: flex; flex-direction: column;
        padding: 12px 14px; background: linear-gradient(#22263a, #1a1d2c); color: #e6e9f2; border: 3px solid #d84a3a; border-radius: 14px;
        font: 14px system-ui, sans-serif; box-shadow: 0 10px 40px rgba(0,0,0,.6); }
      #dexScreen button { font: 600 13px system-ui, sans-serif; color: #fff; background: #3a4260; border: 1px solid #6a74a0; border-radius: 6px; padding: 5px 10px; cursor: pointer; }
      #dexScreen .dexHead { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
      #dexScreen .dexTitle { font-weight: 800; font-size: 20px; letter-spacing: .04em; }
      #dexScreen .dexSub { font-size: 13px; color: #b8c0d4; margin-top: 2px; }
      #dexScreen .dexCharm { color: #f4df1a; font-weight: 700; }
      #dexScreen .dexCharm.on { text-shadow: 0 0 6px #ffe14a; }
      #dexScreen .dexBar { height: 6px; background: #2e3348; border-radius: 3px; margin: 8px 0 10px; overflow: hidden; flex: none; }
      #dexScreen .dexBar div { height: 100%; background: linear-gradient(90deg, #48c050, #f4df1a); }
      #dexScreen .dexGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 8px; overflow-y: auto; padding: 2px 4px 4px; -webkit-overflow-scrolling: touch; }
      #dexScreen .dexCard { position: relative; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 6px 4px 8px;
        background: radial-gradient(circle at 50% 40%, #3a4566, #262c42); border: 2px solid #3a4260; border-radius: 10px; }
      #dexScreen .dexCard:hover { border-color: #8a94c0; }
      #dexScreen .dexCard.cur { border-color: #f4df1a; box-shadow: 0 0 0 2px rgba(244,223,26,.35); }
      #dexScreen .dexCard.regi { background: radial-gradient(circle at 50% 40%, #5a3a7a, #2e2244); }
      #dexScreen .dexCard img { width: 64px; height: 64px; image-rendering: pixelated; }
      #dexScreen .dexCard.unknown img, #dexScreen .dexBigImg.unknown img { filter: brightness(0); opacity: .55; }
      #dexScreen .dexCard.unknown { background: #1e2232; }
      #dexScreen .dexNo { position: absolute; top: 4px; left: 6px; font-size: 11px; color: #8a94b0; font-weight: 700; }
      #dexScreen .dexName { font-weight: 700; font-size: 12px; letter-spacing: .03em; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      #dexScreen .dexDetail { position: absolute; inset: 0; background: rgba(10,10,20,.78); display: flex; align-items: center; justify-content: center; border-radius: 12px; padding: 8px; }
      #dexScreen .dexCardBig { position: relative; width: min(420px, 100%); max-height: 100%; overflow-y: auto; box-sizing: border-box; padding: 14px 16px;
        background: linear-gradient(#2a3048, #1e2234); border: 2px solid #f4df1a; border-radius: 12px; text-align: center; -webkit-overflow-scrolling: touch; }
      #dexScreen .dexBack { position: absolute; top: 10px; left: 10px; }
      #dexScreen .dexBigImg { margin: 18px auto 4px; width: 140px; height: 140px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
        background: radial-gradient(circle, #4a5680 0%, #2a3048 70%); }
      #dexScreen .dexBigImg.shiny { background: radial-gradient(circle, #8a7a30 0%, #2a3048 70%); }
      #dexScreen .dexBigImg img { width: 128px; height: 128px; image-rendering: pixelated; }
      #dexScreen .dexShinyBtn { margin: 4px 0; background: #6a5a1e; border-color: #e8c84a; }
      #dexScreen .dexBigName { font-weight: 800; font-size: 20px; margin: 6px 0 8px; }
      #dexScreen .dexTag { font-size: 11px; background: #8a4ac0; border-radius: 4px; padding: 1px 6px; vertical-align: middle; }
      #dexScreen .dexSection { text-align: left; margin-top: 10px; }
      #dexScreen .dexSection h5 { margin: 0 0 4px; color: #f4df1a; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; }
      #dexScreen .dexStat { display: grid; grid-template-columns: 110px 34px 1fr; align-items: center; gap: 6px; font-size: 12px; margin: 2px 0; }
      #dexScreen .dexStat b { text-align: right; }
      #dexScreen .dexStatBar { height: 6px; background: #3a3f55; border-radius: 3px; overflow: hidden; }
      #dexScreen .dexStatBar div { height: 100%; background: linear-gradient(90deg, #48a0f0, #48c050); }
      #dexScreen .dexMoves { display: flex; flex-wrap: wrap; gap: 4px; }
      #dexScreen .dexMove { background: #3a4260; border-radius: 4px; padding: 2px 7px; font-size: 12px; font-weight: 600; }
      #dexScreen .dexLine { font-size: 13px; margin: 2px 0; }
      #dexScreen .dexSmall { font-size: 12px; color: #9aa3b5; }
      #dexScreen .dexNote { color: #b8c0d4; }
      @media (max-width: 480px) {   /* phones: three small cards per row */
        #dexScreen .dexWin { padding: 10px 8px; }
        #dexScreen .dexGrid { grid-template-columns: repeat(auto-fill, minmax(82px, 1fr)); gap: 6px; }
        #dexScreen .dexCard img { width: 52px; height: 52px; }
        #dexScreen .dexName { font-size: 11px; }
        #dexScreen .dexStat { grid-template-columns: 96px 30px 1fr; }
      }`;
    document.head.appendChild(style);
  },
};

dexScreen.setup();
