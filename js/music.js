// ---------- Chiptune music (Web Audio) ----------
// Two original 8-bar loops in an old handheld style: pulse-wave lead + harmony, triangle bass, noise drums.
// Notes are written in eighth notes: 'C5' = note, '-' = hold the previous note, '.' = rest.
// Drums: k = kick, s = snare, h = hi-hat.

const TRACKS = {
  // calm, cheerful forest theme (C major)
  overworld: {
    bpm: 126,
    lead: [
      'G4 C5 E5 - D5 C5 D5 -', 'E5 - A5 - G5 E5 C5 -', 'F5 - E5 D5 C5 - A4 -', 'B4 C5 D5 - G4 - - -',
      'G4 C5 E5 - D5 C5 D5 -', 'E5 - G5 - B5 - G5 -', 'A5 - G5 F5 E5 - D5 -', 'C5 - - - - - . .',
    ],
    harmony: [
      '. E4 . G4 . E4 . G4', '. C4 . E4 . C4 . E4', '. A3 . C4 . A3 . C4', '. B3 . D4 . B3 . D4',
      '. E4 . G4 . E4 . G4', '. G3 . B3 . G3 . B3', '. A3 . C4 . B3 . D4', '. E4 . G4 . E4 . C4',
    ],
    bass: [
      'C3 - G2 - C3 - G2 -', 'A2 - E2 - A2 - E2 -', 'F2 - C3 - F2 - C3 -', 'G2 - D3 - G2 - B2 -',
      'C3 - G2 - C3 - G2 -', 'E2 - B2 - E2 - B2 -', 'F2 - C3 - G2 - D3 -', 'C3 - G2 - C3 - . .',
    ],
    drums: [
      'k h s h k h s h', 'k h s h k h s h', 'k h s h k h s h', 'k h s h k h s h',
      'k h s h k h s h', 'k h s h k h s h', 'k h s h k h s h', 'k h s h k s s s',
    ],
  },
  // slow, mysterious theme for the glowing HYUJAL METSÄ (D minor): soft lead with echo, shimmering arpeggios
  hyujal: {
    bpm: 92,
    echo: true,
    drumVol: 0.45,
    voices: {
      lead: { wave: 'pulse12', vol: 0.20, legato: 0.98 },
      harmony: { wave: 'triangle', vol: 0.16, legato: 0.85 },
    },
    lead: [
      'D5 - - - F5 - E5 -', 'D5 - - - A4 - - -', 'C5 - D5 - E5 - G5 -', 'E5 - - - - - . .',
      'A5 - - - G5 - F5 -', 'G5 - - - D5 - - -', 'E5 - F5 - E5 - C#5 -', 'D5 - - - - - . .',
    ],
    harmony: [
      'D4 F4 A4 D5 A4 F4 D4 F4', 'A#3 D4 F4 A#4 F4 D4 A#3 D4', 'C4 E4 G4 C5 G4 E4 C4 E4', 'A3 C4 E4 A4 E4 C4 A3 C4',
      'D4 F4 A4 D5 A4 F4 D4 F4', 'G3 A#3 D4 G4 D4 A#3 G3 A#3', 'A3 C#4 E4 A4 E4 C#4 A3 C#4', 'A3 C#4 E4 A4 E4 C#4 A3 E4',
    ],
    bass: [
      'D3 - - - - - - -', 'A#2 - - - - - - -', 'C3 - - - - - - -', 'A2 - - - - - - -',
      'D3 - - - - - - -', 'G2 - - - - - - -', 'A2 - - - - - - -', 'A2 - - - A2 - - -',
    ],
    drums: [
      'k . . h . . h .', '. . . h . . h .', 'k . . h . . h .', '. . . h . . h h',
      'k . . h . . h .', '. . . h . . h .', 'k . . h . . h .', '. . . h . h h h',
    ],
  },
  // fast, tense battle theme (A minor)
  battle: {
    bpm: 168,
    lead: [
      'A4 - C5 - E5 - A5 -', 'G5 F5 E5 - C5 - A4 -', 'B4 - D5 - G5 - F5 E5', 'E5 - - - G#4 - B4 -',
      'A5 - G5 A5 E5 - C5 -', 'F5 - A5 - C6 - A5 -', 'B5 - G5 - D5 - B4 -', 'G#5 - E5 - B4 - G#4 -',
    ],
    harmony: [
      'A3 C4 E4 C4 A3 C4 E4 C4', 'F3 A3 C4 A3 F3 A3 C4 A3', 'G3 B3 D4 B3 G3 B3 D4 B3', 'E3 G#3 B3 G#3 E3 G#3 B3 G#3',
      'A3 C4 E4 C4 A3 C4 E4 C4', 'F3 A3 C4 A3 F3 A3 C4 A3', 'G3 B3 D4 B3 G3 B3 D4 B3', 'E3 G#3 B3 G#3 E3 G#3 B3 G#3',
    ],
    bass: [
      'A2 A3 A2 A3 A2 A3 A2 A3', 'F2 F3 F2 F3 F2 F3 F2 F3', 'G2 G3 G2 G3 G2 G3 G2 G3', 'E2 E3 E2 E3 E2 E3 E2 E3',
      'A2 A3 A2 A3 A2 A3 A2 A3', 'F2 F3 F2 F3 F2 F3 F2 F3', 'G2 G3 G2 G3 G2 G3 G2 G3', 'E2 E3 E2 E3 E2 E3 E2 E3',
    ],
    drums: [
      'k h s h k k s h', 'k h s h k k s h', 'k h s h k k s h', 'k h s h k k s h',
      'k h s h k k s h', 'k h s h k k s h', 'k h s h k k s h', 'k s s s s s s s',
    ],
  },
};

// instrument settings: wave shape and volume
const VOICES = {
  lead: { wave: 'pulse25', vol: 0.30, legato: 0.92 },
  harmony: { wave: 'pulse12', vol: 0.11, legato: 0.8 },
  bass: { wave: 'triangle', vol: 0.55, legato: 0.95 },
};

const NOTE_INDEX = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };
function noteFreq(name) {
  const m = /^([A-G]#?)(\d)$/.exec(name);
  const midi = (+m[2] + 1) * 12 + NOTE_INDEX[m[1]];
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// turn the bar strings into per-step arrays and check every channel has the same length
for (const [name, t] of Object.entries(TRACKS)) {
  for (const ch of ['lead', 'harmony', 'bass', 'drums']) t[ch] = t[ch].join(' ').split(/\s+/);
  t.length = t.lead.length;
  for (const ch of ['harmony', 'bass', 'drums']) {
    if (t[ch].length !== t.length) throw new Error(`Musiikki ${name}: kanavan ${ch} pituus ${t[ch].length} ≠ ${t.length}`);
  }
}

const music = {
  ctx: null, master: null, waves: {}, noise: null,
  track: null, current: null, step: 0, nextTime: 0,
  muted: false, volume: 0.22,

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : this.volume;
    this.master.connect(this.ctx.destination);
    // echo bus (used by tracks with echo: true)
    this.echoIn = this.ctx.createGain();
    const delay = this.ctx.createDelay(1), feedback = this.ctx.createGain(), wet = this.ctx.createGain();
    delay.delayTime.value = 0.33; feedback.gain.value = 0.38; wet.gain.value = 0.4;
    this.echoIn.connect(delay); delay.connect(feedback); feedback.connect(delay); delay.connect(wet); wet.connect(this.master);
    // pulse waves with 25 % and 12.5 % duty, like old handheld consoles
    for (const [key, duty] of [['pulse25', 0.25], ['pulse12', 0.125]]) {
      const n = 40, real = new Float32Array(n), imag = new Float32Array(n);
      for (let k = 1; k < n; k++) {
        real[k] = Math.sin(2 * Math.PI * k * duty) / (k * Math.PI);
        imag[k] = (1 - Math.cos(2 * Math.PI * k * duty)) / (k * Math.PI);
      }
      this.waves[key] = this.ctx.createPeriodicWave(real, imag);
    }
    // white noise for drums
    const len = this.ctx.sampleRate;
    this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    setInterval(() => this.tick(), 25);
  },

  play(name) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (this.current === name) return;
    this.current = name;
    this.track = TRACKS[name];
    this.step = 0;
    this.nextTime = this.ctx.currentTime + 0.1;
  },

  stop() { this.track = null; this.current = null; },

  toggleMute() {
    this.muted = !this.muted;
    try { localStorage.setItem('veylora-mute', this.muted ? '1' : '0'); } catch (e) { /* storage blocked */ }
    if (this.master) this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
  },

  // schedule a little ahead of time so timers never cause gaps
  tick() {
    if (!this.track || !this.ctx || this.ctx.state !== 'running') return;
    const t = this.track, eighth = 60 / t.bpm / 2;
    if (this.nextTime < this.ctx.currentTime - 0.5) this.nextTime = this.ctx.currentTime + 0.05;   // after a pause
    while (this.nextTime < this.ctx.currentTime + 0.15) {
      this.playStep(t, this.step, this.nextTime, eighth);
      this.step = (this.step + 1) % t.length;
      this.nextTime += eighth;
    }
  },

  playStep(t, i, time, eighth) {
    for (const ch of ['lead', 'harmony', 'bass']) {
      const tok = t[ch][i];
      if (tok === '-' || tok === '.') continue;
      let holds = 1;
      while (t[ch][(i + holds) % t.length] === '-' && holds < t.length) holds++;
      this.tone((t.voices && t.voices[ch]) || VOICES[ch], noteFreq(tok), time, holds * eighth, t.echo && ch !== 'bass');
    }
    const dr = t.drums[i];
    if (dr === 'k') this.kick(time);
    else if (dr === 's') this.snare(time);
    else if (dr === 'h') this.hat(time);
  },

  tone(v, freq, time, length, echo) {
    const c = this.ctx, osc = c.createOscillator(), g = c.createGain();
    if (v.wave === 'triangle') osc.type = 'triangle'; else osc.setPeriodicWave(this.waves[v.wave]);
    osc.frequency.value = freq;
    const end = time + length * v.legato;
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(v.vol, time + 0.005);
    g.gain.linearRampToValueAtTime(v.vol * 0.6, Math.max(time + 0.01, end - 0.02));
    g.gain.linearRampToValueAtTime(0, end);
    osc.connect(g).connect(this.master);
    if (echo) g.connect(this.echoIn);
    osc.start(time); osc.stop(end + 0.01);
  },

  noiseHit(time, length, vol, filterType, freq) {
    const c = this.ctx, src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = this.noise;
    f.type = filterType; f.frequency.value = freq;
    g.gain.setValueAtTime(vol * this.drumVol(), time);
    g.gain.exponentialRampToValueAtTime(0.001, time + length);
    src.connect(f).connect(g).connect(this.master);
    src.start(time, Math.random() * 0.5); src.stop(time + length);
  },
  kick(time) {
    const c = this.ctx, osc = c.createOscillator(), g = c.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
    g.gain.setValueAtTime(0.7 * this.drumVol(), time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
    osc.connect(g).connect(this.master);
    osc.start(time); osc.stop(time + 0.13);
  },
  drumVol() { return (this.track && this.track.drumVol) || 1; },
  snare(time) { this.noiseHit(time, 0.12, 0.35, 'highpass', 1200); },
  hat(time) { this.noiseHit(time, 0.035, 0.12, 'highpass', 7000); },
};

try { music.muted = localStorage.getItem('veylora-mute') === '1'; } catch (e) { /* storage blocked */ }

// browsers only allow sound after the player presses something
addEventListener('keydown', e => {
  music.init();
  if (music.ctx && music.ctx.state === 'suspended' && !document.hidden) music.ctx.resume();
  if (e.code === 'KeyM') music.toggleMute();
});
// pause the music while the tab is hidden
document.addEventListener('visibilitychange', () => {
  if (!music.ctx) return;
  if (document.hidden) music.ctx.suspend(); else music.ctx.resume();
});
