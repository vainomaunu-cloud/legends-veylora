// ---------- Overworld: maps, walking, bushes, healing center ----------
// T tree  . grass  , grass2  = path  * flowers / small mushrooms  B bush  S sign
// H healing center (HOITOLA, 3x3 tiles)  D center door  P start  M big glowing mushroom
// X exit to another map (see `warps`)
const CENTER_NAME = 'HOITOLA';
const BALL_NAME = 'PYYDYSPALLO';
const BALL_PRICE = 50;

const MAPS = {
  forest: {
    name: 'PUSKAMETSÄ',
    tiles: 'tiles', rustle: 'bushRustle', shade: '#2a6a30', music: 'overworld',
    rows: [
      'TTTTTTTTTTTTTTTTTTXTTTTTTTTT',
      'TTTTTTTTTTTTTTTTTT=TTTTTTTTT',
      'TT..,....TT.......=..*...TTT',
      'TT.BBBBB..T..BBBB.=..BBBB.TT',
      'TT.BBBBBB...BBBBBB=.BBBBBBTT',
      'TT..BBBBB...BBBBBB=..BBBBBTT',
      'TT...BBB.....BBBB.=..BBB..TT',
      'TT..*.....=========.......TT',
      'TT........=.HHH..=..*.....TT',
      'TT....S====.HHH..=........TT',
      'TT...,....=.HDH..==========X',
      'TT..*.....=......=....,...TT',
      'X===========P=====........TT',
      'TT..T.......=......T......TT',
      'TT.BBBBB....=...........BBTT',
      'TT.BBBBBBB..=..BBBBBB..BBBTT',
      'TT..BBBBBB..=..BBBBBBB.BBBTT',
      'TT...BBBB.*.=...BBBBB...BBTT',
      'TT....,.....=.....,...*...TT',
      'TTTTTTTTTTTT=TTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTXTTTTTTTTTTTTTTT',
    ],
    // chance per step in a bush
    encounters: [
      { species: 'ampereem', chance: 0.05 },
      { species: 'amperite', chance: 0.15 },
      { species: 'golbug', chance: 0.08 },
      { species: 'zubug', chance: 0.15 },
    ],
    warps: {
      '12,20': { to: 'hyujal', x: 12, y: 2, dir: 'down' },
      '27,10': { to: 'sea', x: 1, y: 10, dir: 'right' },
      '18,0': { to: 'snow', x: 12, y: 18, dir: 'up' },
      '0,12': { to: 'town', x: 28, y: 10, dir: 'left' },
    },
    sign: 'PUSKAMETSÄ\nPuskissa piileskelee AMPERITEja, ZUBUGeja, GOLBUGeja ja harvinaisia AMPEREEMeja. ' + CENTER_NAME + ' parantaa ja myy palloja. Etelään: HYUJAL METSÄ. Pohjoiseen: SNOW MOUNTAIN. Länteen: VEYLORAN KYLÄ.',
  },
  // a small village west of PUSKAMETSÄ: five houses, bushes (with creatures), flowers and a pond
  // K house (3x3, sprites/houses.png)  O house door (talk with Z)  ~ pond water  (Y wooden fence, unused now)
  town: {
    name: 'VEYLORAN KYLÄ',
    tiles: 'tilesTown', rustle: 'bushRustle', shade: '#2a6a30', music: 'overworld',
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TT.*.....*........*.......*.TT',
      'TT..KKK......KKK......KKK...TT',
      'TT..KKK...,..KKK...,..KKK...TT',
      'TT..KOK.*....KOK..*...KOK..*TT',
      'TT...=........=........=....TT',
      'TT...===================.BBBTT',
      'TTBBBBBB...=....BBBBB...BBBBTT',
      'TTBBBBB....=S...............TT',
      'X============================X',
      'TTBBB..,...=.........,..BBBBTT',
      'TTBBBB.....=...~~~~.*....BBBTT',
      'TT..KKK....=..~~~~~...KKK...TT',
      'TT..KKK..,.=..~~~~....KKK...TT',
      'TT..KOK.*..=.......*..KOK...TT',
      'TT...=.....=.BBBBBB....=...*TT',
      'TT.*.===================....TT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
    ],
    // chance per step in a village bush
    encounters: [
      { species: 'hummird', chance: 0.15 },
      { species: 'squishroom', chance: 0.15 },
      { species: 'siniramen', chance: 0.15 },
      { species: 'hummirding', chance: 0.05 },
      { species: 'poltearamen', chance: 0.05 },
    ],
    warps: {
      '29,10': { to: 'forest', x: 1, y: 12, dir: 'right' },
      '0,10': { to: 'farm', x: 28, y: 10, dir: 'left' },
    },
    // what is said at each house door (x,y of the O tile)
    houseTexts: {
      '5,5': 'Kylän vanhin avaa oven: "Tervetuloa VEYLORAN KYLÄÄN! Puskametsän puskissa piileskelee otuksia, joten pidä palloja aina mukana."',
      '14,5': 'Ovi on lukossa. Ikkunasta näkyy hyllyllinen kiiltäviä PYYDYSPALLOJA...',
      '23,5': 'Lapsi kurkistaa ovelta: "Isona minusta tulee maailman paras otuskouluttaja! Oletko jo käynyt REGI TEMPPELISSÄ?"',
      '5,15': 'Kalastaja vilkuttaa ovelta: "Tässä lammessa ei asu otuksia. SAARIMERELLÄ nappaa paljon paremmin!"',
      '23,15': 'Puutarhuri huikkaa: "Kylän puskiin on muuttanut HUMMIRDeja, SQUISHROOMeja ja jopa ramen-otuksia! Varo kun kuljet niiden läpi."',
    },
    sign: 'VEYLORAN KYLÄ\nPieni kylä PUSKAMETSÄN länsipuolella. Kylän puskissa piileskelee HUMMIRDeja, SQUISHROOMeja, SINIRAMENeja ja harvinaisia HUMMIRDINGeja ja POLTEARAMENeja. Itään: PUSKAMETSÄ. Länteen: MAATILA.',
  },
  // a farm west of VEYLORAN KYLÄ: a red barn, a corn field, a fenced cow pen with wandering cows and the farmer's house
  // N barn (4x3, sprites/barn.png, roof reaches one row up)  B corn (CORIL, CORNECHAUN and CORNELIVA hide in it)  M hay bale
  // Y fence  K/O farmer's house and its door
  farm: {
    name: 'MAATILA',
    tiles: 'tilesFarm', rustle: 'cornRustle', shade: '#2a6a30', music: 'overworld',
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TT......,......YYYYYYYYYYYY.TT',
      'TT.*.......*...Y..........Y.TT',
      'TT..NNNN.......Y..........Y*TT',
      'TT..NNNN.M.....Y..........Y.TT',
      'TTM.NNNN.MM....Y..........Y.TT',
      'TT...==......*.Y..........Y.TT',
      'TT*..=......,..YYYYY.YYYYYY.TT',
      'TT...=........S.....=.......TT',
      'TT===========================X',
      'TT...............=.......,..TT',
      'TT.BBBBBBBBBB.*..=.*.......*TT',
      'TT.BBBBBBBBBB....=...KKK....TT',
      'TT.BBBBBBBBBB..*.=...KKK....TT',
      'TT.BBBBBBBBBB....=...KOK....TT',
      'TT.BBBBBBBBBB..,.=....=...*.TT',
      'TT...............======.....TT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
    ],
    // chance per step in the corn field
    encounters: [
      { species: 'coril', chance: 0.30 },
      { species: 'cornechaun', chance: 0.10 },
      { species: 'corneliva', chance: 0.05 },
      { species: 'scarghost', chance: 0.10 },
    ],
    warps: { '29,10': { to: 'town', x: 1, y: 10, dir: 'right' } },
    // cows wander inside the pen (inner area of the fence)
    cows: [{ x: 18, y: 4 }, { x: 23, y: 5 }, { x: 19, y: 7 }],
    cowPen: { x0: 16, y0: 3, x1: 25, y1: 7 },
    barnText: 'Navetan iso ovi narisee... Sisällä tuoksuu heinä, ja parvella on pinottuja heinäpaaleja. Lehmät viettävät päivät ulkona aitauksessa.',
    houseTexts: {
      '22,15': 'Maanviljelijä tervehtii ovelta: "Tervetuloa MAATILALLE! Maissi kasvaa hyvin tänä vuonna, ja lehmät antavat parasta maitoa koko VEYLORASSA!"',
    },
    sign: 'MAATILA\nNavetta, maissipelto ja lehmäaitaus. Maississa piileskelee CORILeja, CORNECHAUNeja, harvinaisia CORNELIVOja ja kummitteleva SCARGHOST! Aitaukseen pääsee portista. Itään: VEYLORAN KYLÄ.',
  },
  hyujal: {
    name: 'HYUJAL METSÄ',
    tiles: 'tilesHyujal', rustle: 'bushRustleHyujal', shade: '#3a1d6e', glow: true, music: 'hyujal',
    rows: [
      'TTTTTTTTTTTTXTTTTTTTTTTT',
      'TTTTTTTTTTTT=TTTTTTTTTTT',
      'TT..*.....,.=..*.....,TT',
      'TT.BBB......=.....BBB.TT',
      'TT.BBBB..M..=..M..BBBBTT',
      'TT..BB......=......BB.TT',
      'TT....*....S=...*.....TT',
      'TT.,........=........,TT',
      'TT...M......=.......M.TT',
      'TT......=========.....TT',
      'TT.BBBB.=.......=.BBBBTT',
      'TTBBBBBB=.......=BBBBBTT',
      'TT.BBBB.=.*...*.=.BBB.TT',
      'TT..M...=.......=...M.TT',
      'TT......=========.....TT',
      'TT..*...,.......*...,.TT',
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTTTTTTTTTTTTT',
    ],
    encounters: [
      { species: 'squishroom', chance: 0.2 },
      { species: 'shroocid', chance: 0.15 },
      { species: 'psistiel', chance: 0.10 },
      { species: 'psiduocipe', chance: 0.05 },
      { species: 'eyevil', chance: 0.30 },
      { species: 'eyebaldon', chance: 0.10 },
    ],
    warps: { '12,0': { to: 'forest', x: 12, y: 18, dir: 'up' } },
    sign: 'HYUJAL METSÄ\nPuut ja sienet hohtavat... Liilojen puskien seassa piileskelee SQUISHROOMeja, myrkyllisiä SHROOCIDeja ja salaperäisiä PSISTIELejä. Varjoissa vaanii EYEVILejä ja niiden isoja EYEBALDONeja, ja joskus harvoin näkyy jopa PSIDUOCIPE!',
  },
  // snowy forest north of PUSKAMETSÄ (no creatures yet)
  snow: {
    name: 'SNOW MOUNTAIN',
    tiles: 'tilesSnow', rustle: 'bushRustleSnow', shade: '#2f5a3a', music: 'overworld', snowfall: true,
    rows: [
      'TTTTTTTTTTTTXTTTTTTTTTTTTT',
      'TTTTTTTTTTTT==TTTTTTTTTTTT',
      'TTT....,....==....,....TTT',
      'TT..T.......==........T.TT',
      'TT....BBBB..==..BBBB....TT',
      'TT...BBBBBB.==.BBBBBB...TT',
      'TT...BBBBBB.==.BBBBBB...TT',
      'TT....BBBB..==..BBBB....TT',
      'TT..........==....S.....TT',
      'TTT.....T...==...T.....TTT',
      'TT....,.....==.....,....TT',
      'TT..BBB.....==.....BBB..TT',
      'TT.BBBBB....==....BBBBB.TT',
      'TT..BBB..T..==..T..BBB..TT',
      'TT..........==..........TT',
      'TT...*....T.==.T....*...TT',
      'TTTT........==........TTTT',
      'TTTTTT......==......TTTTTT',
      'TTTTTTTTTTT.==.TTTTTTTTTTT',
      'TTTTTTTTTTTTXTTTTTTTTTTTTT',
    ],
    encounters: [
      { species: 'binchulin', chance: 0.30 },
      { species: 'overchill', chance: 0.10 },
      { species: 'underchill', chance: 0.03 },
      { species: 'siniramen', chance: 0.15 },
      { species: 'poltearamen', chance: 0.05 },
    ],
    npcs: ['guardian'],   // the TEMPLE GUARDIAN blocks the way up until beaten
    warps: {
      '12,19': { to: 'forest', x: 18, y: 1, dir: 'down' },
      '12,0': { to: 'temple', x: 11, y: 21, dir: 'up' },
    },
    sign: 'SNOW MOUNTAIN\nKylmä tuuli puhaltaa vuorelta... Lumisissa puskissa piileskelee BINCHULCINeja, OVERCHILLejä ja harvinaisia UNDERCHILLejä. Lumessa höyryävät myös SINIRAMENit ja kuumat POLTEARAMENit. Polku ylös vie REGI TEMPPELIIN.',
  },
  // purple-pink temple on top of SNOW MOUNTAIN: no bushes, no creatures, just statues
  // T wall (drawn as bricks, not trees)  A statue (2 tiles wide, AA)  E empty pedestal (EE)  M brazier with a pink flame  * glowing rune
  temple: {
    name: 'REGI TEMPPELI',
    tiles: 'tilesTemple', rustle: 'bushRustle', shade: '#2e1248', music: 'hyujal', walls: true, sparkle: true,
    // statues in reading order (left to right, top to bottom); each shows that creature in violet stone
    statues: ['psistiel', 'psiduocipe', 'moonorg', 'ampereem', 'duckonda', 'hummirding', 'underchill', 'serpenalge', 'golbug'],
    // the three regis on the far pedestals (EE), left to right; walk into one to battle it (level 50)
    regis: ['regismile', 'regiacid', 'regipsy'],
    rows: [
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'TT....................TT',
      'TT...EE....EE....EE...TT',   // three empty pedestals at the far end
      'TT....................TT',
      'TT....................TT',
      'TT.M.AA....AA....AA.M.TT',
      'TT.........==.........TT',
      'TT...*.....==.....*...TT',
      'TT.........==.........TT',
      'TT..AA.....==.....AA..TT',
      'TT.........==.........TT',
      'TT.M.......==.......M.TT',
      'TT.........==.........TT',
      'TT..AA.....==.....AA..TT',
      'TT.........==.........TT',
      'TT...*.....==.....*...TT',
      'TT.........==.........TT',
      'TT..AA.....==.....AA..TT',
      'TT.......S.==.........TT',
      'TT.M.......==.......M.TT',
      'TTTTTTTTTTT==TTTTTTTTTTT',
      'TTTTTTTTTTTXTTTTTTTTTTTT',
    ],
    encounters: [],
    warps: { '11,22': { to: 'snow', x: 12, y: 1, dir: 'down' } },
    sign: 'REGI TEMPPELI\nVanha violetti temppeli vuoren huipulla. Patsaat esittävät metsien, vuorten ja meren otuksia. Perällä kolme jalustaa odottaa yhä patsaitaan... Täällä on hiljaista: ei puskia eikä villejä otuksia.',
  },
  // ~ water (fish here with F)  # bridge left-right  | bridge up-down  T palm
  // Q beach kiosk (3x2 tiles)  R kiosk counter (talk here)
  sea: {
    name: 'SAARIMERI',
    tiles: 'tilesSea', rustle: 'bushRustle', shade: '#2f7cc4', music: 'overworld', treeGround: 2, exitTile: 17, miniBg: '#3e9be0',
    palmBirds: { species: 'hummird', chance: 0.5 },   // each palm has a HUMMIRD on top with this chance (new roll every visit)
    rows: [
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '======~~~~~~~~~~~~~~~~~~~~~~~~',
      '=T==T=~~~~======~~~~=======~~~',
      '======~~~~=..T.=~~~~=.*..T=~~~',
      '======####=....=####=...,.=~~~',
      '=QQQ==~~~~=.,..=~~~~=.T...=~~~',
      '=QRQ==~~~~======~~~~=======~~~',
      '======~~~~~~~|~~~~~~=======~~~',
      '====S=~~~~~~~|~~~~~~~~~~~~~~~~',
      'X:::==~~~~~~~|~~~~~~~~~~~~~~~~',
      '======~~~~~~~|~~~~~~~~~~~~~~~~',
      '=T====~~~~~~~=======~~~~~~~~~~',
      '======~~~~~~~=.*.T.=~~~~~~~~~~',
      '==*===~~~~~~~=..S..=~~~~~~~~~~',
      'T====T~~~~~~~=,..T.=~~~~~~~~~~',
      '======~~~~~~~=======~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    ],
    encounters: [],   // no creatures here yet
    fishing: [        // chance per cast
      { species: 'algish', chance: 0.40 },
      { species: 'moonorg', chance: 0.15 },
      { species: 'serpenalge', chance: 0.10 },
    ],
    warps: { '0,10': { to: 'forest', x: 26, y: 10, dir: 'left' } },
    signs: {
      '4,9': 'SAARIMERI\nRantakioskista saa palloja. Kalasta menemällä veden eteen ja painamalla F. Polku vasemmalle vie PUSKAMETSÄÄN.',
      '16,14': 'PIKKUSAARI\nVedessä uiskentelee ALGISHeja, MOONORGeja ja harvinaisia SERPENALGEja. Kalasta F:llä!',
    },
  },
};

for (const [id, m] of Object.entries(MAPS)) {
  m.id = id;
  m.w = m.rows[0].length; m.h = m.rows.length;
  m.rows.forEach((row, i) => { if (row.length !== m.w) throw new Error(`Kartan ${id} rivi ${i} on väärän pituinen`); });
  m.treeRows = buildTreeRows(m);
  for (let y = m.h - 1; y >= 0; y--) for (let x = m.w - 1; x >= 0; x--) {
    const ch = m.rows[y][x];
    if (ch === 'P') m.spawn = { x, y };
    if (ch === 'D') m.door = { x, y };
    if (ch === 'H') m.center = { x, y };   // ends at the top-left H
    if (ch === 'Q') m.kiosk = { x, y };    // ends at the top-left Q
  }
  // houses: the top-left K of each 3x3 house block; roof colour (red, blue, green, orange, purple) in reading order
  m.houses = [];
  for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) {
    const isHouse = (cx, cy) => cy >= 0 && cx >= 0 && 'KO'.includes(m.rows[cy][cx]);
    if (m.rows[y][x] === 'K' && !isHouse(x - 1, y) && !isHouse(x, y - 1)) m.houses.push({ x, y, style: m.houses.length % 5 });
  }
  // barns: the top-left N of each 4x3 barn block
  m.barns = [];
  for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) {
    if (m.rows[y][x] === 'N' && m.rows[y][x - 1] !== 'N' && (y === 0 || m.rows[y - 1][x] !== 'N')) m.barns.push({ x, y });
  }
  // statues: each "AA" pair is one statue (species from m.statues in reading order), "EE" an empty pedestal
  m.statueList = [];
  let n = 0;
  for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) {
    const ch = m.rows[y][x];
    if (ch === 'A' && m.rows[y][x - 1] !== 'A') {
      const list = m.statues || ['psistiel'];
      m.statueList.push({ x, y, species: list[n++ % list.length] });
    }
    if (ch === 'E' && m.rows[y][x - 1] !== 'E') {
      const regis = m.regis || [];
      m.statueList.push({ x, y, species: null, regi: regis[m.statueList.filter(s => s.regi).length] || null });
    }
  }
}

const TILE_INDEX = { '.': 0, ',': 1, '=': 2, 'P': 2, 'X': 2, '*': 3, 'B': 6, 'M': 7, 'S': 9, 'H': 0, 'D': 0, '~': 13, '#': 15, '|': 16, 'Q': 2, 'R': 2, ':': 17, 'A': 0, 'E': 0, 'K': 0, 'O': 0, 'Y': 15, 'N': 0 };
const WALL_FACE = 11, WALL_TOP = 12;   // maps with walls: true (REGI TEMPPELI) draw T as bricks
// wooden fence Y (tiles_farm.png / tiles_town.png): a post plus rails towards each neighbouring fence tile
const FENCE_POST = 15, FENCE_LEFT = 16, FENCE_RIGHT = 17, FENCE_UP = 18, FENCE_DOWN = 19;
const WATER = '~';
const GREAT_NAME = 'GREAT PALLO';
const GREAT_PRICE = 75;
const MASTER_NAME = 'MASTER PALLO';
const MASTER_PRICE = 1000;
// every kind of ball: where it is counted in `game`, its price, how much better it catches, its sprite
const BALL_TYPES = [
  { key: 'balls', name: BALL_NAME, short: 'PYYDYS', price: BALL_PRICE, mult: 1, img: 'ball' },
  { key: 'greatBalls', name: GREAT_NAME, short: 'GREAT', price: GREAT_PRICE, mult: 2, img: 'greatBall' },
  { key: 'masterBalls', name: MASTER_NAME, short: 'MASTER', price: MASTER_PRICE, mult: 5, img: 'masterBall' },
];
const ballType = key => BALL_TYPES.find(b => b.key === key);
const totalBalls = () => BALL_TYPES.reduce((n, b) => n + game[b.key], 0);
const BUSH_FRONT = 10, TREE_A = 11, TREE_B = 12;
const SOLID = new Set(['T', 'S', 'H', 'D', 'M', '~', 'Q', 'R', 'A', 'E', 'K', 'O', 'Y', 'N']);
const DIR_ROW = { down: 0, up: 1, left: 2, right: 3 };
const WALK_SPEED = 1.5;        // pixels per frame (16 px tile = about 11 frames)
const TREE_LIFT = 6;           // trees are drawn this many px up so the rows overlap

// ---------- minimap ----------
const MINI_R = 25;       // radius in screen pixels
const MINI_SCALE = 2;    // screen pixels per map tile (smaller = shows more of the map)
// colour of each map character on the minimap; per-map overrides in MINI_COLORS_MAP
const MINI_COLORS = {
  '.': '#7cc453', ',': '#7cc453', '*': '#8ccf62', 'P': '#e2c489', '=': '#e2c489', ':': '#e2c489', 'X': '#e2c489',
  'T': '#2a6a30', 'B': '#3f9a44', 'S': '#8a5a2c', 'H': '#2f8f9d', 'D': '#2f8f9d', 'M': '#3fb8ff',
  '~': '#3e9be0', '#': '#c68a4a', '|': '#c68a4a', 'Q': '#2fb5b5', 'R': '#2fb5b5',
};
const MINI_COLORS_MAP = {
  hyujal: { '.': '#6b4f9e', ',': '#6b4f9e', '*': '#8e6cc4', '=': '#5a5f8c', 'X': '#5a5f8c', 'T': '#4a2580', 'B': '#9a62e0' },
  sea: { '=': '#f2db9a', '*': '#f2db9a', '.': '#8ed45a', ',': '#8ed45a', 'T': '#3fa34a' },
  snow: { '.': '#eef4fb', ',': '#eef4fb', '*': '#ffffff', '=': '#b4c4d8', 'X': '#b4c4d8', 'T': '#2f5a3a', 'B': '#5f8a6a' },
  town: { 'K': '#d8483a', 'O': '#8a5a2c', 'Y': '#c68a4a', '~': '#3e9be0', 'B': '#3f9a44' },
  farm: { 'N': '#c8382e', 'B': '#d8c040', 'M': '#e8c860', 'Y': '#c68a4a', 'K': '#d8483a', 'O': '#8a5a2c' },
  temple: { '.': '#c89ad8', ',': '#c89ad8', '*': '#ff9cf2', '=': '#6a2a8e', 'X': '#6a2a8e', 'T': '#2e1248', 'A': '#8752b4', 'E': '#b48ad4', 'M': '#ff7ad8', 'S': '#5a3a78' },
};

function buildMinimap(m) {
  const c = document.createElement('canvas');
  c.width = m.w; c.height = m.h;
  const g = c.getContext('2d');
  const colors = { ...MINI_COLORS, ...(MINI_COLORS_MAP[m.id] || {}) };
  for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) {
    g.fillStyle = colors[m.rows[y][x]] || '#555';
    g.fillRect(x, y, 1, 1);
  }
  return c;
}

// filled circle drawn row by row, so the edge stays pixel-sharp
function scanCircle(g, cx, cy, r, color) {
  if (color) g.fillStyle = color;
  for (let dy = -r; dy <= r; dy++) {
    const hw = Math.floor(Math.sqrt(r * r - dy * dy) + 0.5);
    g.fillRect(cx - hw, cy + dy, hw * 2 + 1, 1);
  }
}

// A list menu that shows 8 rows at a time, with EDELLISET / SEURAAVAT to turn pages.
// Returns the index in `rows`, or -1 when cancelled with X.
function* pagedChoose(rows, x, y, w, perPage = 8) {
  let page = 0;
  const pages = Math.max(1, Math.ceil(rows.length / perPage));
  while (true) {
    const start = page * perPage;
    const shown = rows.slice(start, start + perPage);
    const opts = [...shown];
    if (page > 0) opts.push('EDELLISET');
    if (page < pages - 1) opts.push('SEURAAVAT');
    const i = yield* menuBox.choose(opts, x, y, w);
    if (i < 0) return -1;
    if (i < shown.length) return start + i;
    if (opts[i] === 'EDELLISET') page--; else page++;
  }
}

function rollEncounter(list) {
  let r = Math.random();
  for (const e of list) { if (r < e.chance) return e.species; r -= e.chance; }
  return null;
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lead = () => game.party.find(m => m.hp > 0) || game.party[0];

// Staggered forest: odd rows are shifted half a tile inside runs of trees.
// Returns, per row, the x pixel positions of the trees to draw.
function buildTreeRows(m) {
  const out = [];
  if (m.walls) return m.rows.map(() => []);   // walls are ground tiles, no trees
  for (let y = 0; y < m.h; y++) {
    const xs = [], row = m.rows[y];
    let x = 0;
    while (x < m.w) {
      if (row[x] !== 'T') { x++; continue; }
      const x0 = x;
      while (x < m.w && row[x] === 'T') x++;
      const x1 = x - 1;
      if (y % 2 === 0 || x0 === x1) { for (let i = x0; i <= x1; i++) xs.push(i * TILE); }
      else {
        xs.push(x0 * TILE);
        for (let i = x0; i < x1; i++) xs.push(i * TILE + 8);
        xs.push(x1 * TILE);
      }
    }
    out.push(xs);
  }
  return out;
}

// ---------- people standing on the maps (MAPS[...].npcs) ----------
const GUARDIAN_NAME = 'TEMPPELIN VARTIJA';
const NPCS = {
  // stands in the snow path right below the way up to REGI TEMPPELI; steps aside once beaten
  guardian: {
    sprite: 'guardian',
    pos: () => (game.guardianBeaten ? { x: 13, y: 1, dir: 'left' } : { x: 12, y: 1, dir: 'down' }),
    *talk() {
      if (game.guardianBeaten) {
        yield* textBox.say(`${GUARDIAN_NAME}: Mene vain. Regit odottavat REGI TEMPPELIN perällä.`);
        return;
      }
      yield* textBox.say(`${GUARDIAN_NAME}: Seis! Ylhäällä on REGI TEMPPELI.`);
      yield* textBox.say(`${GUARDIAN_NAME}: Sisään pääsee vain se, joka voittaa minut. Taistellaan!`);
      startEncounter(null, 'trainer', {
        enemy: {
          name: GUARDIAN_NAME, reward: 500,
          team: [{ species: 'psistiel', level: 35 }, { species: 'shroocid', level: 35 }],
          *onWin() {
            game.guardianBeaten = true;
            yield* textBox.say(`${GUARDIAN_NAME}: Olet vahva! REGI TEMPPELI on nyt avoinna sinulle.`);
          },
        },
      });
    },
  },
};

const overworld = {
  map: MAPS.forest,
  player: null,
  rustles: [],
  runner: new Runner(),
  t: 0,
  stepsSinceBattle: 0,
  showWallet: false,
  banner: null,

  init() {
    this.map = MAPS.forest;
    const s = this.map.spawn;
    this.player = { tx: s.x, ty: s.y, dir: 'up', moving: false, offset: 0, steps: 0, turnDelay: 0, justWalked: false };
  },

  tileAt(x, y) {
    const m = this.map;
    if (x < 0 || y < 0 || x >= m.w || y >= m.h) return 'T';
    return m.rows[y][x];
  },

  enterMap(id, x, y, dir) {
    this.map = MAPS[id];
    this.rustles = [];
    this.fishing = null;
    Object.assign(this.player, { tx: x, ty: y, dir, moving: false, offset: 0, justWalked: false });
    this.banner = { text: this.map.name, t: 0 };
    this.rollPalmBirds();
    // cows in the farm pen: tile position, pixel position, where they are walking to
    this.cows = (this.map.cows || []).map(c => ({ x: c.x, y: c.y, px: c.x * TILE, py: c.y * TILE, tx: c.x, ty: c.y, dir: Math.random() < 0.5 ? 'left' : 'right', wait: rnd(30, 150), eat: 0 }));
  },

  cowAt(x, y) { return (this.cows || []).find(c => (c.x === x && c.y === y) || (c.tx === x && c.ty === y)); },

  // cows amble around inside their pen now and then, and sometimes put their heads down to eat
  updateCows() {
    const pen = this.map.cowPen, p = this.player;
    for (const c of this.cows || []) {
      if (c.px !== c.tx * TILE || c.py !== c.ty * TILE) {          // walking one tile, slowly
        c.px += Math.sign(c.tx * TILE - c.px) * 0.5; c.py += Math.sign(c.ty * TILE - c.py) * 0.5;
        if (c.px === c.tx * TILE && c.py === c.ty * TILE) { c.x = c.tx; c.y = c.ty; }
        continue;
      }
      if (c.eat > 0) c.eat--;
      if (--c.wait > 0) continue;
      c.wait = rnd(60, 220);
      if (Math.random() < 0.35) { c.eat = rnd(60, 140); continue; }   // graze for a while
      const dir = ['up', 'down', 'left', 'right'][rnd(0, 3)];
      const nx = c.x + DIRS[dir][0], ny = c.y + DIRS[dir][1];
      if (dir === 'left' || dir === 'right') c.dir = dir;
      const inPen = pen && nx >= pen.x0 && nx <= pen.x1 && ny >= pen.y0 && ny <= pen.y1;
      const blocked = !inPen || SOLID.has(this.tileAt(nx, ny)) || this.cowAt(nx, ny) || (p.tx === nx && p.ty === ny)
        || (p.moving && p.tx + DIRS[p.dir][0] === nx && p.ty + DIRS[p.dir][1] === ny);
      if (!blocked) { c.tx = nx; c.ty = ny; }
    }
  },

  *cowTalk() {
    yield* textBox.say(['Muuuu!', 'Lehmä märehtii tyytyväisenä.', 'Muu? Lehmä katsoo sinua suurilla silmillään.', 'Lehmä heilauttaa häntäänsä. Muuuu!'][rnd(0, 3)]);
  },

  // which palms have a HUMMIRD sitting on top (rolled again every time you come to the map)
  rollPalmBirds() {
    const m = this.map;
    this.birds = null;
    if (!m.palmBirds) return;
    this.birds = new Set();
    for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) {
      if (m.rows[y][x] === 'T' && Math.random() < m.palmBirds.chance) this.birds.add(`${x},${y}`);
    }
    if (!this.birds.size) {   // always at least one bird on the beach
      const palms = [];
      for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) if (m.rows[y][x] === 'T') palms.push(`${x},${y}`);
      if (palms.length) this.birds.add(palms[rnd(0, palms.length - 1)]);
    }
  },

  // after losing a battle: wake up at the center door
  respawnAtCenter() {
    const d = MAPS.forest.door;
    this.enterMap('forest', d.x, d.y + 1, 'up');
    this.banner = null;
  },

  say(text) { this.runner.run(textBox.say(text)); },

  update() {
    this.t++;
    for (const r of this.rustles) r.t++;
    this.rustles = this.rustles.filter(r => r.t < 18);
    if (this.banner && ++this.banner.t > 170) this.banner = null;
    this.updateCows();
    if (this.runner.busy) { this.runner.update(); return; }

    const p = this.player;
    if (p.moving) {
      p.offset += WALK_SPEED;
      if (p.offset < TILE) return;   // (offset may overshoot 16 slightly; it is reset below)
      p.moving = false; p.offset = 0;
      p.tx += DIRS[p.dir][0]; p.ty += DIRS[p.dir][1];
      p.justWalked = true;
      if (this.onStep()) return;   // battle or map change started
    }

    if (take('a')) { this.interact(); return; }
    if (take('f')) { this.runner.run(this.fish()); return; }

    const d = heldDir();
    if (!d) { p.justWalked = false; p.turnDelay = 0; return; }
    if (d !== p.dir) {
      p.dir = d;
      if (!p.justWalked) { p.turnDelay = 6; return; }   // tap = just turn around
    }
    if (p.turnDelay > 0) { p.turnDelay--; return; }
    const nx = p.tx + DIRS[d][0], ny = p.ty + DIRS[d][1];
    const npc = this.npcAt(nx, ny);
    if (npc) { this.runner.run(npc.talk()); return; }               // walked into someone: they talk
    if (this.cowAt(nx, ny)) { this.runner.run(this.cowTalk()); return; }   // bumped into a cow
    const regi = this.regiAt(nx, ny);
    if (regi) { this.runner.run(this.regiTouch(regi)); return; }    // touched a regi on its pedestal
    if (!SOLID.has(this.tileAt(nx, ny))) { p.moving = true; p.offset = 0; p.steps++; }
    else if (this.birds && this.birds.has(`${nx},${ny}`)) {   // walked into a palm with a HUMMIRD on it
      this.birds.delete(`${nx},${ny}`);
      startEncounter(this.map.palmBirds.species, 'palm');
    }
  },

  onStep() {
    const p = this.player;
    const warp = this.map.warps[`${p.tx},${p.ty}`];
    if (warp) { warpTo(warp); return true; }
    this.stepsSinceBattle++;
    if (this.tileAt(p.tx, p.ty) !== 'B') return false;
    this.rustles.push({ x: p.tx, y: p.ty, t: 0 });
    const species = this.stepsSinceBattle > 2 && rollEncounter(this.map.encounters);
    if (species) {
      this.stepsSinceBattle = 0;
      startEncounter(species);
      return true;
    }
    return false;
  },

  // the person standing on this tile on the current map, if any
  npcAt(x, y) {
    for (const id of this.map.npcs || []) {
      const n = NPCS[id], at = n.pos();
      if (at.x === x && at.y === y) return n;
    }
    return null;
  },

  // the regi (still on its pedestal) covering this tile, if any
  regiAt(x, y) {
    if (this.tileAt(x, y) !== 'E') return null;
    const s = (this.map.statueList || []).find(q => q.regi && q.y === y && (q.x === x || q.x + 1 === x));
    return s && !game.regisCaught.includes(s.regi) ? s.regi : null;
  },

  *regiTouch(regi) {
    yield* textBox.say(`${SPECIES[regi].name} tuijottaa sinua kivijalustaltaan...`);
    startEncounter(regi, 'regi', { level: 50, regi: true });
  },

  interact() {
    const p = this.player;
    const fx = p.tx + DIRS[p.dir][0], fy = p.ty + DIRS[p.dir][1];
    const npc = this.npcAt(fx, fy);
    if (npc) { this.runner.run(npc.talk()); return; }
    const regi = this.regiAt(fx, fy);
    if (regi) { this.runner.run(this.regiTouch(regi)); return; }
    const tile = this.tileAt(fx, fy);
    if (tile === 'S') this.say((this.map.signs && this.map.signs[`${fx},${fy}`]) || this.map.sign);
    if (tile === 'O') this.say((this.map.houseTexts && this.map.houseTexts[`${fx},${fy}`]) || 'Ovi on lukossa.');
    if (tile === 'N') this.say(this.map.barnText || 'Navetan ovi on kiinni.');
    if (this.cowAt(fx, fy)) this.runner.run(this.cowTalk());
    if (tile === 'D') this.runner.run(this.centerVisit());
    if (tile === 'R') this.runner.run(this.kioskVisit());
  },

  // ----- fishing: face the water and press F -----
  *fish() {
    const p = this.player;
    const fx = p.tx + DIRS[p.dir][0], fy = p.ty + DIRS[p.dir][1];
    if (this.tileAt(fx, fy) !== WATER) {
      yield* textBox.say('Kalastaaksesi mene veden eteen ja paina F.');
      return;
    }
    this.fishing = { x: fx, y: fy, t: 0, bite: false };
    yield* textBox.say('Heitit siiman veteen...', { auto: 20 });
    const waitFrames = rnd(100, 200);
    for (let i = 0; i < waitFrames; i++) { this.fishing.t++; yield; }
    const species = rollEncounter(this.map.fishing || []);
    if (species) {
      this.fishing.bite = true;
      yield* textBox.say('Jokin nappasi!', { auto: 20 });
      this.fishing = null;
      startEncounter(species, 'fish');
      return;
    }
    yield* textBox.say('Mikään ei näykkinyt...');
    this.fishing = null;
  },

  // one round of a ball shop: pick a ball, confirm, pay. Returns true when the player leaves (POISTU / X).
  *buyBall(keys, question) {
    const types = keys.map(ballType);
    textBox.show(question);
    const c = yield* menuBox.choose([...types.map(b => `${b.name} ${b.price}`), 'POISTU'], 122, 30, 114);
    const b = types[c];
    if (!b) return true;
    if (game.coins < b.price) {
      yield* textBox.say(`${b.name} maksaa ${b.price} kolikkoa. Sinulla on vain ${game.coins}.`);
      return false;
    }
    const better = { 2: ' Se nappaa kaksi kertaa paremmin!', 5: ' Se nappaa viisi kertaa paremmin!' }[b.mult] || '';
    textBox.show(`Ostatko ${b.name}N ${b.price} kolikolla?${better}`);
    const yes = yield* menuBox.choose(['KYLLÄ', 'EI'], 176, 78, 60);
    if (yes === 0) {
      game.coins -= b.price;
      game[b.key]++;
      yield* textBox.say(`Ostit ${b.name}N!`);
    }
    return false;
  },

  // ----- beach kiosk shop -----
  *kioskVisit() {
    this.showWallet = true;
    yield* textBox.say('Tervetuloa RANTAKIOSKILLE!');
    while (!(yield* this.buyBall(['balls', 'greatBalls', 'masterBalls'], 'Mitä saisi olla?')));
    textBox.hide();
    yield* textBox.say('Kiitos ja hyviä kalastushetkiä!');
    this.showWallet = false;
    saveGame.save(true);
  },

  *centerVisit() {
    this.showWallet = true;
    yield* textBox.say(`Tervetuloa ${CENTER_NAME}an!`);
    while (true) {
      textBox.show('Miten voin auttaa?');
      const c = yield* menuBox.choose(['PARANNA', 'OSTA PALLO', 'TIIMI', 'KOKOELMA', 'PC', 'POISTU'], 146, 30, 90);
      if (c === 0) {
        textBox.hide();
        yield* flashScreen(2);
        healParty();
        yield* textBox.say('Otuksesi ovat taas täysissä voimissa!');
      } else if (c === 1) {
        while (!(yield* this.buyBall(['balls', 'masterBalls'], 'Minkä pallon haluat?')));
      } else if (c === 2) {
        textBox.show('Kuka johtaa tiimiä?');
        const opts = game.party.map(m => `${m.name}${m.shiny ? '★' : ''} LV${m.level} ${m.hp}/${m.maxHp}`);
        const i = yield* menuBox.choose(opts, 40, 8, 160);
        if (i > 0) {
          const [m] = game.party.splice(i, 1);
          game.party.unshift(m);
          yield* textBox.say(`${m.name} johtaa nyt tiimiä.`);
        }
      } else if (c === 3) {
        // KOKOELMA: its own screen with sprite cards (js/dex.js); wait until it is closed
        // the SHINY CHARM does not need the regis: count only the species it needs
        const need = charmSpecies(), have = need.filter(id => game.caught.includes(id)).length;
        textBox.hide();
        this.showWallet = false;
        dexScreen.open();
        while (dexScreen.isOpen) yield;
        for (const k in held) held[k] = false;   // the key that closed it must not also press the menu
        this.showWallet = true;
        if (!game.shinyCharm && have === need.length) {   // complete already (e.g. from an older save): hand it out now
          game.shinyCharm = true;
          yield* flashScreen(2);
          yield* textBox.say('KOKOELMASSASI on nyt KAIKKI otukset! Sait SHINY CHARMin!');
          yield* textBox.say('Kiiltäviä otuksia näkee nyt useammin: 1/125 (ennen 1/200).');
        } else if (!game.shinyCharm) {
          yield* textBox.say(`Nappaa tai kehitä jokaista otusta vähintään yksi, niin saat SHINY CHARMin (${have}/${need.length}). Regejä ei tarvita! Sen kanssa kiiltäviä näkee useammin.`);
        }
      } else if (c === 4) {
        this.showWallet = false;
        yield* this.pcMenu();
        this.showWallet = true;
      } else {
        break;
      }
    }
    textBox.hide();
    yield* textBox.say('Tervetuloa uudelleen!');
    this.showWallet = false;
    saveGame.save(true);
  },

  // ----- PC: store creatures you don't want in the team -----
  // the PC is its own screen (js/pcscreen.js); wait here until it is closed
  *pcMenu() {
    textBox.hide();
    pcScreen.open();
    while (pcScreen.isOpen) yield;
    for (const k in held) held[k] = false;   // the key that closed it must not also press the menu
  },

  draw() {
    const m = this.map, p = this.player, tiles = IMG[m.tiles];
    const px = p.tx * TILE + (p.moving ? DIRS[p.dir][0] * p.offset : 0);
    const py = p.ty * TILE + (p.moving ? DIRS[p.dir][1] * p.offset : 0);
    const camX = Math.round(clamp(px + 8 - W / 2, 0, m.w * TILE - W));
    const camY = Math.round(clamp(py + 8 - H / 2, 0, m.h * TILE - H));
    const x0 = Math.floor(camX / TILE), y0 = Math.floor(camY / TILE);
    const y1 = y0 + Math.ceil(H / TILE) + 1, x1 = x0 + Math.ceil(W / TILE);

    // ground layer
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const ch = this.tileAt(tx, ty);
        const sx = tx * TILE - camX, sy = ty * TILE - camY;
        if (ch === 'T' && m.walls) {   // brick face where a wall meets the floor, dark top elsewhere
          drawFrame(tiles, this.tileAt(tx, ty + 1) === 'T' ? WALL_TOP : WALL_FACE, 16, 16, sx, sy);
          continue;
        }
        if (ch === 'T') {
          if (this.tileAt(tx, ty + 1) === 'T') { ctx.fillStyle = m.shade; ctx.fillRect(sx, sy, TILE, TILE); }
          else drawFrame(tiles, m.treeGround || 0, 16, 16, sx, sy);
          continue;
        }
        if (ch === 'Y') {   // fence: grass, then the rails towards neighbouring fence tiles, then the post on top
          drawFrame(tiles, 0, 16, 16, sx, sy);
          if (this.tileAt(tx, ty - 1) === 'Y') drawFrame(tiles, FENCE_UP, 16, 16, sx, sy);
          if (this.tileAt(tx, ty + 1) === 'Y') drawFrame(tiles, FENCE_DOWN, 16, 16, sx, sy);
          if (this.tileAt(tx - 1, ty) === 'Y') drawFrame(tiles, FENCE_LEFT, 16, 16, sx, sy);
          if (this.tileAt(tx + 1, ty) === 'Y') drawFrame(tiles, FENCE_RIGHT, 16, 16, sx, sy);
          drawFrame(tiles, FENCE_POST, 16, 16, sx, sy);
          continue;
        }
        if (ch === WATER) {
          drawFrame(tiles, 13 + (Math.floor((this.t + (tx + ty) * 7) / 45) % 2), 16, 16, sx, sy);
          this.drawFoam(tx, ty, sx, sy);
          continue;
        }
        const rustle = ch === 'B' && this.rustles.find(r => r.x === tx && r.y === ty);
        if (rustle) { drawFrame(IMG[m.rustle], Math.floor(rustle.t / 6) % 3, 16, 16, sx, sy); continue; }
        let idx = TILE_INDEX[ch];
        if (ch === '*') idx = 3 + (Math.floor(this.t / 40) % 2);
        if (ch === 'M') idx = 7 + (Math.floor((this.t + tx * 13) / 36) % 2);
        if (ch === 'X' && m.exitTile) idx = m.exitTile;
        drawFrame(tiles, idx, 16, 16, sx, sy);
      }
    }

    // objects, row by row so lower things overlap higher ones
    const playerRow = Math.floor((py + 8) / TILE);
    for (let ty = y0 - 1; ty <= y1 + 1; ty++) {
      if (ty < 0 || ty >= m.h) continue;
      for (const x of m.treeRows[ty]) {
        if (x - camX < -16 || x - camX > W) continue;
        const v = ((x >> 3) * 7 + ty * 3) % 3 === 0 ? TREE_B : TREE_A;
        drawFrame(tiles, v, 16, 16, x - camX, ty * TILE - TREE_LIFT - camY);
        if (this.birds && x % TILE === 0 && this.birds.has(`${x / TILE},${ty}`)) {   // HUMMIRD perched on the palm
          const bob = Math.floor((this.t + x) / 24) % 2;
          drawFrame(IMG.hummirdSmall, bob, 16, 16, x - camX + 1, ty * TILE - TREE_LIFT - camY - 9 - bob);
        }
      }
      if (m.center && ty === m.center.y + 2) ctx.drawImage(IMG.center, m.center.x * TILE - camX, m.center.y * TILE - camY);
      if (m.kiosk && ty === m.kiosk.y + 1) ctx.drawImage(IMG.kiosk, m.kiosk.x * TILE - camX, m.kiosk.y * TILE - camY);
      for (const h of m.houses) if (ty === h.y + 2) drawFrame(IMG.houses, h.style, 48, 48, h.x * TILE - camX, h.y * TILE - camY);
      for (const b of m.barns) if (ty === b.y + 2) ctx.drawImage(IMG.barn, b.x * TILE - camX, (b.y - 1) * TILE - camY);   // roof reaches one row up
      for (const c of this.cows || []) {
        if (Math.floor((c.py + 8) / TILE) !== ty) continue;
        const walking = c.px !== c.tx * TILE || c.py !== c.ty * TILE;
        const frame = (c.dir === 'left' ? 2 : 0) + (c.eat > 0 && !walking ? 1 : 0);
        const bob = walking ? Math.floor(this.t / 8) % 2 : 0;
        drawFrame(IMG.cow, frame, 16, 16, Math.round(c.px) - camX, Math.round(c.py) - camY - 2 - bob);
      }
      for (const s of m.statueList) if (s.y === ty) this.drawStatue(s, s.x * TILE - camX, ty * TILE - camY);
      for (const id of m.npcs || []) {
        const n = NPCS[id], at = n.pos();
        if (at.y === ty) drawFrame(IMG[n.sprite], DIR_ROW[at.dir] * 3, 16, 16, at.x * TILE - camX, ty * TILE - camY - 4);
      }
      if (ty === playerRow) this.drawPlayer(px - camX, py - camY, camX, camY);
    }
    if (this.fishing) this.drawFishing(px - camX, py - camY, camX, camY);
    this.drawExitArrows(camX, camY);

    if (m.glow) this.drawGlow();
    if (m.sparkle) this.drawGlow(['#ff9cf2', '#ffe0fa'], 0);
    if (m.snowfall) this.drawSnowfall();
    if (!menuBox.active) this.drawMinimap(px, py);

    if (this.banner) this.drawBanner();
    if (this.showWallet) {
      drawBox(4, 4, 92, 54);
      drawText(ctx, 'KOLIKOT', 10, 9); drawTextRight(ctx, String(game.coins), 90, 9);
      drawText(ctx, 'PALLOT', 10, 21); drawTextRight(ctx, String(game.balls), 90, 21);
      drawText(ctx, 'GREAT', 10, 33, '#2f7acb'); drawTextRight(ctx, String(game.greatBalls), 90, 33);
      drawText(ctx, 'MASTER', 10, 45, '#8a3aae'); drawTextRight(ctx, String(game.masterBalls), 90, 45);
    }
    textBox.draw();
    menuBox.draw();
  },

  // ----- round minimap in the top-right corner -----
  // one pixel per tile, drawn 2x around the player and cut to a circle
  drawMinimap(px, py) {
    const m = this.map, R = MINI_R, S = MINI_SCALE, size = R * 2 + 1;
    if (!m.mini) m.mini = buildMinimap(m);
    if (!this.miniCanvas) {
      this.miniCanvas = document.createElement('canvas');
      this.miniCanvas.width = this.miniCanvas.height = size;
    }
    const g = this.miniCanvas.getContext('2d');
    g.imageSmoothingEnabled = false;
    g.globalCompositeOperation = 'source-over';
    g.fillStyle = m.miniBg || (MINI_COLORS_MAP[m.id] || {}).T || MINI_COLORS.T;   // outside the map: forest / sea
    g.fillRect(0, 0, size, size);
    const ptx = (px + 8) / TILE, pty = (py + 8) / TILE;
    g.drawImage(m.mini, Math.round(R - ptx * S), Math.round(R - pty * S), m.w * S, m.h * S);
    // exits blink yellow, the player is a red dot in the middle
    if (Math.floor(this.t / 20) % 2 === 0) {
      g.fillStyle = '#f4df1a';
      for (const key of Object.keys(m.warps)) {
        const [x, y] = key.split(',').map(Number);
        g.fillRect(Math.round(R + (x + 0.5 - ptx) * S) - 1, Math.round(R + (y + 0.5 - pty) * S) - 1, 3, 3);
      }
    }
    g.fillStyle = '#ffffff'; g.fillRect(R - 2, R - 2, 5, 5);
    g.fillStyle = '#e04838'; g.fillRect(R - 1, R - 1, 3, 3);
    // cut to a circle (crisp pixel edge); the mask must be drawn in one go for destination-in
    if (!this.miniMask) {
      this.miniMask = document.createElement('canvas');
      this.miniMask.width = this.miniMask.height = size;
      scanCircle(this.miniMask.getContext('2d'), R, R, R, '#000');
    }
    g.globalCompositeOperation = 'destination-in';
    g.drawImage(this.miniMask, 0, 0);
    g.globalCompositeOperation = 'source-over';
    // frame
    const cx = W - R - 5, cy = R + 5;
    scanCircle(ctx, cx, cy, R + 2, '#283040');
    scanCircle(ctx, cx, cy, R + 1, '#c8d0e0');
    ctx.drawImage(this.miniCanvas, cx - R, cy - R);
  },

  // small bouncing arrows on every exit, pointing out of the map, so the way onward is easy to see
  drawExitArrows(camX, camY) {
    const m = this.map, bounce = Math.floor(this.t / 15) % 2;
    for (const key of Object.keys(m.warps)) {
      const [x, y] = key.split(',').map(Number);
      const dir = x === 0 ? 'left' : x === m.w - 1 ? 'right' : y === 0 ? 'up' : 'down';
      const [dx, dy] = DIRS[dir];
      const cx = x * TILE - camX + 8 + dx * bounce * 2, cy = y * TILE - camY + 8 + dy * bounce * 2;
      // arrow: a 7px wide triangle pointing in dir, dark outline then white fill
      for (const [col, grow] of [['#283040', 1], ['#ffffff', 0]]) {
        ctx.fillStyle = col;
        for (let i = 0; i <= 3; i++) {
          const half = 3 - i + grow;
          const along = i - 1;   // distance from the arrow's back towards its tip
          if (dx) ctx.fillRect(cx + dx * along, cy - half, 1, half * 2 + 1);
          else ctx.fillRect(cx - half, cy + dy * along, half * 2 + 1, 1);
        }
      }
    }
  },

  // light foam where water meets land (bridges count as water)
  drawFoam(tx, ty, sx, sy) {
    const m = this.map, t = this.t;
    const land = (x, y) => x >= 0 && y >= 0 && x < m.w && y < m.h && !'~#|'.includes(m.rows[y][x]);
    const wave = Math.floor(t / 30) % 2;
    ctx.fillStyle = '#d8f4ff';
    if (land(tx, ty - 1)) for (let i = wave; i < 16; i += 3) ctx.fillRect(sx + i, sy, 2, 1);
    if (land(tx, ty + 1)) for (let i = 1 - wave; i < 16; i += 3) ctx.fillRect(sx + i, sy + 15, 2, 1);
    if (land(tx - 1, ty)) for (let i = wave; i < 16; i += 3) ctx.fillRect(sx, sy + i, 1, 2);
    if (land(tx + 1, ty)) for (let i = 1 - wave; i < 16; i += 3) ctx.fillRect(sx + 15, sy + i, 1, 2);
  },

  // fishing line from the player's hand to a bobbing float on the water
  drawFishing(psx, psy, camX, camY) {
    const f = this.fishing, p = this.player;
    const hand = { down: [11, 10], up: [4, 2], left: [2, 6], right: [13, 6] }[p.dir];
    const hx = psx + hand[0], hy = psy - 4 + hand[1];
    const bob = f.bite ? 3 : Math.round(Math.sin(f.t / 9) * 1.2);
    const bx = f.x * TILE - camX + 8, by = f.y * TILE - camY + 8 + bob;
    ctx.fillStyle = '#e8e8e8';
    const n = Math.max(Math.abs(bx - hx), Math.abs(by - hy));
    for (let i = 0; i <= n; i++) {
      const k = i / n, sag = Math.sin(k * Math.PI) * 4;
      ctx.fillRect(Math.round(hx + (bx - hx) * k), Math.round(hy + (by - hy) * k + sag), 1, 1);
    }
    // rings on the water and the red-white float
    if (f.t % 60 < 30) { ctx.fillStyle = 'rgba(216,244,255,0.8)'; ctx.fillRect(bx - 4, by + 3, 9, 1); }
    ctx.fillStyle = '#e04838'; ctx.fillRect(bx - 1, by - 2, 3, 2);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(bx - 1, by, 3, 2);
  },

  // gently falling snow (SNOW MOUNTAIN)
  drawSnowfall() {
    const t = this.t;
    ctx.fillStyle = 'rgba(200,220,255,0.10)';
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 46; i++) {
      const speed = 0.35 + (i % 4) * 0.12;
      const x = ((i * 61 + t * 0.18 * (1 + i % 3) + Math.sin(t / 45 + i) * 6) % (W + 10) + W + 10) % (W + 10) - 5;
      const y = ((i * 37 + t * speed) % (H + 10)) - 5;
      ctx.fillStyle = i % 3 ? 'rgba(255,255,255,0.95)' : 'rgba(160,182,215,0.85)';   // some greyish flakes so they show on the snow
      const s = i % 6 === 0 ? 2 : 1;
      ctx.fillRect(Math.round(x), Math.round(y), s, s);
    }
  },

  // floating glowing specks (HYUJAL METSÄ)
  drawGlow(colors = ['#9fe3ff', '#e3b5ff'], dim = 0.16) {
    if (dim) { ctx.fillStyle = `rgba(30,0,70,${dim})`; ctx.fillRect(0, 0, W, H); }
    const t = this.t;
    for (let i = 0; i < 26; i++) {
      const x = ((i * 53 + t * (0.15 + (i % 3) * 0.08) + Math.sin(t / 70 + i) * 14) % (W + 20) + W + 20) % (W + 20) - 10;
      const y = ((i * 37 - t * (0.1 + (i % 4) * 0.05) + Math.cos(t / 55 + i * 2) * 10) % (H + 20) + H + 20) % (H + 20) - 10;
      ctx.globalAlpha = 0.45 + 0.55 * Math.abs(Math.sin(t / 30 + i));
      ctx.fillStyle = colors[i % 2];
      ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
      if (i % 5 === 0) { ctx.globalAlpha *= 0.4; ctx.fillRect(Math.round(x) - 1, Math.round(y), 3, 1); ctx.fillRect(Math.round(x), Math.round(y) - 1, 1, 3); }
    }
    ctx.globalAlpha = 1;
  },

  // ----- REGI TEMPPELI statues: your creature sprite turned to violet stone, on a pedestal (2 tiles wide) -----
  // Made with blend modes only (no pixel reading), so it also works when the game is opened as a file.
  statueImg(species) {
    this.statueCache = this.statueCache || {};
    if (this.statueCache[species]) return this.statueCache[species];
    const src = IMG[SPECIES[species].sprites.front];
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const g = c.getContext('2d');
    g.imageSmoothingEnabled = false;
    g.drawImage(src, 0, 0, 32, 32, 0, 0, 32, 32);
    g.globalCompositeOperation = 'color';           // keep the light and dark of the sprite, take the violet colour
    g.fillStyle = '#9a5ccc'; g.fillRect(0, 0, 32, 32);
    g.globalCompositeOperation = 'multiply';        // darker stone so it stands out from the light floor
    g.fillStyle = '#9468c4'; g.fillRect(0, 0, 32, 32);
    g.globalCompositeOperation = 'destination-in';  // back to the creature's shape
    g.drawImage(src, 0, 0, 32, 32, 0, 0, 32, 32);
    return (this.statueCache[species] = c);
  },

  drawStatue(s, sx, sy) {
    const sp = s.species ? SPECIES[s.species] : null;
    if (s.species && !sp) return;
    // pedestal: 28x10 block in the lower part of the two tiles
    const px = sx + 2, py = sy + 5;
    ctx.fillStyle = '#2a1240'; ctx.fillRect(px, py, 28, 10);
    ctx.fillStyle = '#b48ad4'; ctx.fillRect(px + 1, py + 1, 26, 3);
    ctx.fillStyle = '#6a3a94'; ctx.fillRect(px + 1, py + 4, 26, 5);
    ctx.fillStyle = '#ff9cf2'; ctx.fillRect(px + 1, py + 5, 26, 1);
    ctx.fillStyle = 'rgba(42,18,64,0.35)'; ctx.fillRect(px + 1, py + 10, 26, 2);   // shadow on the floor
    if (s.regi && !game.regisCaught.includes(s.regi)) {   // a regi waits on the pedestal, floating gently in a pink aura
      const rs = SPECIES[s.regi];
      const bob = Math.round(Math.sin(this.t / 30 + s.x) * 1.5);
      const pulse = 0.25 + 0.15 * Math.sin(this.t / 20 + s.x);
      ctx.fillStyle = `rgba(255,156,242,${pulse})`;
      ctx.fillRect(px + 3, py - 30, 22, 30); ctx.fillRect(px + 6, py - 33, 16, 36);
      const feet = 30 - Math.round((rs.feetY || 0) / 2);
      const blink = (this.t + s.x * 37) % 220 < 8;
      drawFrame(IMG[blink ? rs.sprites.blink : rs.sprites.front], 0, 32, 32, sx, py + 1 - feet + bob - 2);
      return;
    }
    if (!sp) {   // empty pedestal: a faint pink glow where a statue will stand some day
      ctx.globalAlpha = 0.45 + 0.35 * Math.sin(this.t / 25 + s.x);
      ctx.fillStyle = '#ff9cf2'; ctx.fillRect(px + 8, py + 2, 12, 1);
      ctx.fillStyle = '#ffe0fa'; ctx.fillRect(px + 12, py + 2, 4, 1);
      ctx.globalAlpha = 1;
      return;
    }
    // the creature stands on top (AMPEREEM's feet are on row 30; feetY = how much higher, in 2x pixels)
    const feet = 30 - Math.round((sp.feetY || 0) / 2);
    ctx.drawImage(this.statueImg(s.species), sx, py + 1 - feet);
  },

  // area name that slides in from the top for a moment
  drawBanner() {
    const b = this.banner, w = textWidth(b.text) * 2 + 24;
    const k = b.t < 15 ? b.t / 15 : b.t > 150 ? 1 - (b.t - 150) / 20 : 1;
    const y = Math.round(-30 + 36 * k);
    drawBox(W / 2 - w / 2, y, w, 26);
    drawTextCenter(ctx, b.text, W / 2, y + 6, '#283040', 2);
  },

  drawPlayer(sx, sy, camX, camY) {
    const p = this.player;
    const col = p.moving && p.offset < 8 ? (p.steps % 2 ? 1 : 2) : 0;
    drawFrame(IMG.player, DIR_ROW[p.dir] * 3 + col, 16, 16, sx, sy - 4);
    // front leaves of the bush the player stands in
    const px = sx + camX, py = sy + camY;
    const cover = (p.moving && (p.dir === 'left' || p.dir === 'right'))
      ? [[p.tx, p.ty], [p.tx + DIRS[p.dir][0], p.ty]]
      : [[Math.floor((px + 8) / TILE), Math.floor((py + 8) / TILE)]];
    for (const [tx, ty] of cover) {
      if (this.tileAt(tx, ty) === 'B') drawFrame(IMG[this.map.tiles], BUSH_FRONT, 16, 16, tx * TILE - camX, ty * TILE - camY);
    }
  },
};

// walk through an exit into another map (fade out -> switch -> fade in, then show the area name)
function warpTo(w) {
  game.locked = true;
  game.runner.run((function* () {
    yield* tween(14, k => { game.fade = k; });
    overworld.enterMap(w.to, w.x, w.y, w.dir);
    music.play(overworld.map.music);
    overworld.stepsSinceBattle = 0;
    clearPressed();
    game.locked = false;
    yield* tween(14, k => { game.fade = 1 - k; });
    game.fade = 0;
    saveGame.save();
  })());
}
