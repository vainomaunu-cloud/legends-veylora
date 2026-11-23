// ---------- HOITOLAN PC: its own screen with the team on the left and the PC box on the right ----------
// Drag a creature onto another one and they swap places (PC <-> team, or inside the team / box).
// Dropping on an empty slot moves it there. Tapping works too: tap one, then tap where it goes.
// Keyboard: arrows move the cursor, Z / Enter picks up and puts down, X cancels, Esc closes.
window.pcOpen = false;

const PC_COLS = 6, PC_ROWS = 5, PC_PER_BOX = PC_COLS * PC_ROWS;

const pcScreen = {
  el: null,
  isOpen: false,
  page: 0,
  sel: null,                   // picked creature {area, i}
  cur: { area: 'team', i: 0 }, // keyboard cursor
  msg: '',
  drag: null,

  pages() { return Math.max(1, Math.ceil((game.pc.length + 1) / PC_PER_BOX)); },
  monAt(s) { return s.area === 'team' ? game.party[s.i] : game.pc[s.i]; },

  open() {
    this.isOpen = window.pcOpen = true;
    for (const k in held) held[k] = false;
    dirStack.length = 0;
    this.page = 0; this.sel = null; this.cur = { area: 'team', i: 0 };
    this.msg = 'Raahaa otus toisen päälle, niin ne vaihtavat paikkaa.';
    this.render();
    this.el.style.display = 'flex';
  },

  close() {
    this.isOpen = window.pcOpen = false;
    this.endDrag();
    this.el.style.display = 'none';
  },

  // move / swap the creature in slot a to slot b
  move(a, b) {
    if (a.area === b.area && a.i === b.i) return;
    const A = this.monAt(a), B = this.monAt(b);
    if (!A) return;
    const list = s => (s.area === 'team' ? game.party : game.pc);
    if (a.area === b.area) {                       // reorder inside the team or the box
      const l = list(a);
      if (B) { l[a.i] = B; l[b.i] = A; this.msg = `${A.name} ja ${B.name} vaihtoivat paikkaa.`; }
      else { l.splice(a.i, 1); l.push(A); this.msg = `${A.name} siirrettiin.`; }
      return;
    }
    if (B) {                                       // PC <-> team swap
      list(a)[a.i] = B; list(b)[b.i] = A;
      const out = a.area === 'team' ? A : B, inn = a.area === 'team' ? B : A;
      healMon(out);
      this.msg = `${inn.name} tuli tiimiin ja ${out.name} meni PC:hen.`;
    } else if (b.area === 'team') {                // PC -> empty team slot
      if (game.party.length >= 6) { this.msg = 'Tiimi on täynnä.'; return; }
      game.pc.splice(a.i, 1); game.party.push(A);
      this.msg = `${A.name} liittyi tiimiin! (${game.party.length}/6)`;
    } else {                                       // team -> empty box slot
      if (game.party.length <= 1) { this.msg = 'Tiimiin pitää jäädä vähintään yksi otus.'; return; }
      game.party.splice(a.i, 1); healMon(A); game.pc.push(A);
      this.msg = `${A.name} talletettiin PC:hen ja parannettiin.`;
    }
  },

  // release a creature for good (asked first with "Haluatko vapauttaa tämän otuksen?")
  release(s) {
    const m = this.monAt(s);
    this.confirm = null; this.sel = null;
    if (!m) return;
    if (s.area === 'team' && game.party.length <= 1) { this.msg = 'Tiimiin pitää jäädä vähintään yksi otus.'; return; }
    (s.area === 'team' ? game.party : game.pc).splice(s.i, 1);
    this.msg = `${m.name} vapautettiin. Hei hei, ${m.name}!`;
  },

  askRelease() {
    if (!this.sel || !this.monAt(this.sel)) return;
    this.confirm = this.sel;
    this.confirmYes = false;   // EI is chosen first, so a stray key press never releases anything
    this.render();
  },

  // tap (or Z) on a slot
  tap(s) {
    if (!this.sel) {
      if (this.monAt(s)) { this.sel = s; this.msg = `${this.monAt(s).name} valittu. Valitse paikka, johon se siirretään, tai paina Vapauta (V).`; }
    } else {
      if (this.sel.area === s.area && this.sel.i === s.i) this.msg = 'Valinta peruttu.';
      else this.move(this.sel, s);
      this.sel = null;
    }
    this.render();
  },

  slotHtml(area, i) {
    const m = area === 'team' ? game.party[i] : game.pc[i];
    const cls = ['pcSlot', area === 'team' ? 'pcTeam' : 'pcCell'];
    if (this.sel && this.sel.area === area && this.sel.i === i) cls.push('sel');
    if (this.cur.area === area && this.cur.i === i) cls.push('cur');
    if (!m) cls.push('empty');
    let inner = '';
    if (m) {
      const key = spriteKey(m, SPECIES[m.species].sprites.front);
      const src = IMG[key] ? IMG[key].src : '';
      inner = `<img src="${src}" alt="" draggable="false">`;
      if (area === 'team') {
        const f = m.hp / m.maxHp;
        const color = f > 0.5 ? '#48c050' : f > 0.2 ? '#e8b830' : '#e04838';
        inner += `<div class="pcTInfo"><div class="pcTName">${m.name}${m.shiny ? '<span class="pcStar">★</span>' : ''}</div>
          <div class="pcTLv">LV ${m.level}</div><div class="pcBar"><div style="width:${Math.round(f * 100)}%;background:${color}"></div></div></div>`;
      } else if (m.shiny) inner += '<span class="pcStar pcCellStar">★</span>';
    }
    return `<div class="${cls.join(' ')}" data-area="${area}" data-i="${i}">${inner}</div>`;
  },

  render() {
    if (this.page >= this.pages()) this.page = this.pages() - 1;
    const team = Array.from({ length: 6 }, (_, i) => this.slotHtml('team', i)).join('');
    const base = this.page * PC_PER_BOX;
    const box = Array.from({ length: PC_PER_BOX }, (_, i) => this.slotHtml('pc', base + i)).join('');
    const c = this.monAt(this.sel || this.cur);
    const info = c ? `${c.name}${c.shiny ? ' ★' : ''} · LV ${c.level} · HP ${c.hp}/${c.maxHp}` : '';
    const releaseBtn = this.sel && c ? ' <button type="button" class="pcRelease" data-release>Vapauta</button>' : '';
    const r = this.confirm && this.monAt(this.confirm);
    const confirmBox = r ? `
        <div class="pcConfirm"><div class="pcAsk">
          <div class="pcAskTitle">Haluatko vapauttaa tämän otuksen?</div>
          <div class="pcAskMon"><img src="${IMG[spriteKey(r, SPECIES[r.species].sprites.front)].src}" alt="">
            <b>${r.name}${r.shiny ? ' ★' : ''}</b> LV ${r.level}</div>
          <div class="pcAskNote">Vapautettua otusta ei saa takaisin.${SPECIES[r.species].legendary ? ' Se ei palaa REGI TEMPPELIIN.' : ''}</div>
          <div class="pcAskBtns"><button type="button" data-yes class="${this.confirmYes ? 'on' : ''}">KYLLÄ</button>
            <button type="button" data-no class="${this.confirmYes ? '' : 'on'}">EI</button></div>
        </div></div>` : '';
    const many = this.pages() > 1;
    this.el.innerHTML = `
      <div class="pcWin" role="dialog" aria-label="PC">
        <div class="pcHead"><span>💻 ${CENTER_NAME}N PC</span><button type="button" data-close>Sulje ✕</button></div>
        <div class="pcMain">
          <div class="pcCol"><div class="pcLabel">TIIMI ${game.party.length}/6</div>${team}</div>
          <div class="pcCol">
            <div class="pcLabel pcBoxHead">
              ${many ? '<button type="button" data-page="-1">◀</button>' : ''}
              <span>LAATIKKO ${many ? `${this.page + 1}/${this.pages()}` : ''} · ${game.pc.length} otusta</span>
              ${many ? '<button type="button" data-page="1">▶</button>' : ''}
            </div>
            <div class="pcGrid">${box}</div>
          </div>
        </div>
        <div class="pcInfo">${info || '&nbsp;'}${releaseBtn}</div>
        <div class="pcMsg">${this.msg}</div>
        ${confirmBox}
      </div>`;
  },

  // ----- dragging with mouse or finger -----
  slotFromPoint(x, y) {
    const el = document.elementFromPoint(x, y);
    const s = el && el.closest('.pcSlot');
    return s ? { area: s.dataset.area, i: +s.dataset.i } : null;
  },

  endDrag() {
    if (this.drag && this.drag.ghost) this.drag.ghost.remove();
    this.drag = null;
    document.querySelectorAll('.pcSlot.over').forEach(e => e.classList.remove('over'));
  },

  setup() {
    const el = document.createElement('div');
    el.id = 'pcScreen';
    el.style.display = 'none';
    document.body.appendChild(el);
    this.el = el;

    el.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) { this.close(); return; }
      if (e.target.closest('[data-release]')) { this.askRelease(); return; }
      if (e.target.closest('[data-yes]')) { this.release(this.confirm); this.render(); return; }
      if (e.target.closest('[data-no]')) { this.confirm = null; this.sel = null; this.msg = 'Otusta ei vapautettu.'; this.render(); return; }
      const p = e.target.closest('[data-page]');
      if (p) {
        this.page = (this.page + +p.dataset.page + this.pages()) % this.pages();
        if (this.cur.area === 'pc') this.cur = { area: 'pc', i: this.page * PC_PER_BOX };
        this.render();
      }
    });

    el.addEventListener('pointerdown', e => {
      e.stopPropagation();
      const slotEl = e.target.closest('.pcSlot');
      if (!slotEl || this.confirm) return;
      e.preventDefault();
      const s = { area: slotEl.dataset.area, i: +slotEl.dataset.i };
      this.drag = { from: s, x: e.clientX, y: e.clientY, moved: false, ghost: null, id: e.pointerId };
    });

    addEventListener('pointermove', e => {
      const d = this.drag;
      if (!d || e.pointerId !== d.id) return;
      if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8 && this.monAt(d.from)) {
        d.moved = true;
        this.sel = null;
        const src = el.querySelector(`.pcSlot[data-area="${d.from.area}"][data-i="${d.from.i}"] img`);
        const g = document.createElement('img');
        g.src = src ? src.src : '';
        g.className = 'pcGhost';
        document.body.appendChild(g);
        d.ghost = g;
        if (src) src.parentElement.classList.add('lifted');
      }
      if (d.moved) {
        d.ghost.style.left = e.clientX + 'px';
        d.ghost.style.top = e.clientY + 'px';
        el.querySelectorAll('.pcSlot.over').forEach(x => x.classList.remove('over'));
        const t = this.slotFromPoint(e.clientX, e.clientY);
        if (t) el.querySelector(`.pcSlot[data-area="${t.area}"][data-i="${t.i}"]`).classList.add('over');
      }
    });

    addEventListener('pointerup', e => {
      const d = this.drag;
      if (!d || e.pointerId !== d.id) return;
      const moved = d.moved;
      this.endDrag();
      const t = this.slotFromPoint(e.clientX, e.clientY);
      if (moved) {
        if (t) { this.cur = t; this.move(d.from, t); }
        this.render();
      } else if (t && t.area === d.from.area && t.i === d.from.i) {
        this.cur = t;
        this.tap(t);
      }
    });
    addEventListener('pointercancel', () => { if (this.drag) { this.endDrag(); this.render(); } });

    addEventListener('keydown', e => {
      if (!this.isOpen) return;
      e.preventDefault();
      if (e.repeat && (e.code === 'KeyZ' || e.code === 'Enter' || e.code === 'Space')) return;
      if (this.confirm) {   // "Haluatko vapauttaa tämän otuksen?": arrows pick KYLLÄ / EI, Z confirms, X / Esc = EI
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code)) { this.confirmYes = !this.confirmYes; this.render(); }
        else if (e.code === 'KeyZ' || e.code === 'Enter' || e.code === 'Space') {
          if (this.confirmYes) this.release(this.confirm); else { this.confirm = null; this.sel = null; this.msg = 'Otusta ei vapautettu.'; }
          this.render();
        } else if (e.code === 'KeyX' || e.code === 'Escape' || e.code === 'Backspace') { this.confirm = null; this.sel = null; this.msg = 'Otusta ei vapautettu.'; this.render(); }
        return;
      }
      const c = this.cur;
      const base = this.page * PC_PER_BOX;
      if (e.code === 'Escape') { this.close(); return; }
      if (e.code === 'KeyV' || e.code === 'Delete') { this.askRelease(); return; }
      if (e.code === 'KeyX' || e.code === 'Backspace') {
        if (this.sel) { this.sel = null; this.msg = 'Valinta peruttu.'; this.render(); } else this.close();
        return;
      }
      if (e.code === 'KeyZ' || e.code === 'Enter' || e.code === 'Space') { this.tap(c); return; }
      if (c.area === 'team') {
        if (e.code === 'ArrowUp') c.i = (c.i + 5) % 6;
        else if (e.code === 'ArrowDown') c.i = (c.i + 1) % 6;
        else if (e.code === 'ArrowRight') this.cur = { area: 'pc', i: base + Math.min(c.i, PC_ROWS - 1) * PC_COLS };
        else return;
      } else {
        const local = c.i - base, col = local % PC_COLS, row = Math.floor(local / PC_COLS);
        if (e.code === 'ArrowUp') c.i = base + ((row + PC_ROWS - 1) % PC_ROWS) * PC_COLS + col;
        else if (e.code === 'ArrowDown') c.i = base + ((row + 1) % PC_ROWS) * PC_COLS + col;
        else if (e.code === 'ArrowLeft') {
          if (col > 0) c.i--; else this.cur = { area: 'team', i: row };
        } else if (e.code === 'ArrowRight') {
          if (col < PC_COLS - 1) c.i++;
          else if (this.pages() > 1) {           // next box
            this.page = (this.page + 1) % this.pages();
            c.i = this.page * PC_PER_BOX + row * PC_COLS;
          }
        } else return;
      }
      this.render();
    });

    const style = document.createElement('style');
    style.textContent = `
      #pcScreen { position: fixed; inset: 0; z-index: 950; background: #10121c; align-items: center; justify-content: center;
                  --s: clamp(34px, min(9.5vh, 8.5vw), 62px); user-select: none; -webkit-user-select: none; }
      #pcScreen .pcWin { position: relative; box-sizing: border-box; padding: 10px 14px; background: #1d2030; color: #e6e9f2;
                  border: 2px solid #48a0c8; border-radius: 10px; font: 14px system-ui, sans-serif;
                  box-shadow: 0 10px 40px rgba(0,0,0,.6); max-width: 98vw; max-height: 98vh; overflow: auto; }
      #pcScreen .pcHead { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 17px; margin-bottom: 8px; gap: 16px; }
      #pcScreen button { font: 600 13px system-ui, sans-serif; color: #fff; background: #3a4260; border: 1px solid #6a74a0;
                  border-radius: 6px; padding: 4px 10px; cursor: pointer; }
      #pcScreen .pcMain { display: flex; gap: 14px; align-items: flex-start; }
      #pcScreen .pcCol { display: flex; flex-direction: column; gap: 4px; }
      #pcScreen .pcLabel { color: #f4df1a; font-size: 12px; font-weight: 700; letter-spacing: .05em; height: 24px; display: flex; align-items: center; gap: 8px; }
      #pcScreen .pcBoxHead { justify-content: space-between; }
      #pcScreen .pcBoxHead button { padding: 1px 8px; }
      #pcScreen .pcSlot { box-sizing: border-box; height: var(--s); border-radius: 6px; background: #2a2f44; border: 2px solid #3a4060;
                  position: relative; display: flex; align-items: center; cursor: grab; touch-action: none; }
      #pcScreen .pcSlot.empty { background: #22263a; border-style: dashed; cursor: default; }
      #pcScreen .pcTeam { width: calc(var(--s) * 3.4); gap: 6px; padding-right: 6px; }
      #pcScreen .pcCell { width: var(--s); justify-content: center; }
      #pcScreen .pcGrid { display: grid; grid-template-columns: repeat(${PC_COLS}, var(--s)); gap: 4px;
                  background: #1a3a4a; padding: 6px; border-radius: 8px; border: 2px solid #2d6a84; }
      #pcScreen .pcGrid .pcSlot { background: #234c5e; border-color: #2f6378; }
      #pcScreen .pcGrid .pcSlot.empty { background: #1e4252; }
      #pcScreen .pcSlot img { width: calc(var(--s) - 6px); height: calc(var(--s) - 6px); image-rendering: pixelated; flex: none; pointer-events: none; }
      #pcScreen .pcSlot.cur { border-color: #f4df1a !important; border-style: solid; }
      #pcScreen .pcSlot.sel { background: #5a4a7a !important; border-color: #e8b830 !important; }
      #pcScreen .pcSlot.over { border-color: #6fe07a !important; border-style: solid; background: #2f5a3a !important; }
      #pcScreen .pcSlot.lifted img { opacity: .3; }
      #pcScreen .pcTInfo { min-width: 0; flex: 1; line-height: 1.15; }
      #pcScreen .pcTName { font-weight: 700; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      #pcScreen .pcTLv { font-size: 11px; color: #9aa3b5; }
      #pcScreen .pcBar { height: 4px; background: #3a3f55; border-radius: 2px; margin-top: 2px; overflow: hidden; }
      #pcScreen .pcBar div { height: 100%; }
      #pcScreen .pcStar { color: #e8b830; margin-left: 3px; }
      #pcScreen .pcCellStar { position: absolute; top: 0; right: 2px; font-size: 11px; }
      #pcScreen .pcInfo { margin-top: 8px; font-weight: 700; min-height: 26px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
      #pcScreen .pcRelease { background: #8a2a3a; border-color: #d06070; padding: 3px 10px; }
      #pcScreen .pcConfirm { position: absolute; inset: 0; background: rgba(10,10,20,.72); display: flex; align-items: center; justify-content: center; border-radius: 8px; }
      #pcScreen .pcAsk { background: #262a3c; border: 2px solid #d06070; border-radius: 10px; padding: 14px 18px; text-align: center; max-width: 90%; }
      #pcScreen .pcAskTitle { font-weight: 700; font-size: 16px; margin-bottom: 8px; }
      #pcScreen .pcAskMon { display: flex; align-items: center; justify-content: center; gap: 8px; }
      #pcScreen .pcAskMon img { width: 48px; height: 48px; image-rendering: pixelated; }
      #pcScreen .pcAskNote { font-size: 12px; color: #9aa3b5; margin: 6px 0 10px; }
      #pcScreen .pcAskBtns { display: flex; gap: 10px; justify-content: center; }
      #pcScreen .pcAskBtns button { min-width: 80px; padding: 7px 12px; font-size: 14px; }
      #pcScreen .pcAskBtns button.on { outline: 2px solid #f4df1a; }
      #pcScreen .pcAskBtns [data-yes] { background: #8a2a3a; border-color: #d06070; }
      #pcScreen .pcMsg { color: #9aa3b5; font-size: 12px; min-height: 16px; margin-top: 2px; }
      .pcGhost { position: fixed; z-index: 960; width: 56px; height: 56px; image-rendering: pixelated; pointer-events: none;
                 transform: translate(-50%, -50%) scale(1.15); filter: drop-shadow(0 4px 6px rgba(0,0,0,.6)); }`;
    document.head.appendChild(style);
  },
};

pcScreen.setup();
