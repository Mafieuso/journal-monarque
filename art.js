/* Illustrations SVG originales (aucun visuel officiel). Chaque bannière = fond (ciel/étoiles/brume) + motif. */
const ART = (() => {
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const spin = (dur, cx = 0, cy = 0, rev = false) =>
    `<animateTransform attributeName="transform" type="rotate" from="${rev?360:0} ${cx} ${cy}" to="${rev?0:360} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>`;

  function ridge(r, y, amp, fill, depth, W = 1600) {
    let d = `M-50,${y + 400} L-50,${y}`, x = -50;
    while (x < W + 80) { x += 50 + r() * 90; d += ` L${x.toFixed(0)},${(y - r() * amp).toFixed(0)}`; }
    return `<g data-depth="${depth}"><path d="${d} L${W + 80},${y + 400}Z" fill="${fill}"/></g>`;
  }
  function stars(r, n) {
    let s = '';
    for (let i = 0; i < n; i++) s += `<circle class="star" cx="${(r() * 1600).toFixed(0)}" cy="${(r() * 420).toFixed(0)}" r="${(0.5 + r() * 1.4).toFixed(1)}" style="animation-delay:${(r() * 6).toFixed(1)}s"/>`;
    return s;
  }
  function wisteria(r, side) {
    let s = '';
    for (let k = 0; k < 7; k++) {
      const x = side === 'l' ? 20 + k * 55 + r() * 30 : 1580 - k * 55 - r() * 30;
      const len = 120 + r() * 220;
      s += `<g class="sway" style="animation-delay:${(-r() * 8).toFixed(1)}s"><path d="M${x},-10 Q${x + 10},${len / 2} ${x + (r() - .5) * 30},${len}" stroke="#2b1c3a" stroke-width="2" fill="none"/>`;
      for (let j = 0; j < 14; j++) s += `<ellipse cx="${(x + (r() - .5) * 26 + 4).toFixed(0)}" cy="${(20 + j * len / 15).toFixed(0)}" rx="${(7 - j * .25).toFixed(1)}" ry="${(11 - j * .35).toFixed(1)}" fill="hsl(${265 + r() * 25} ${45 + r() * 20}% ${34 + r() * 14}%)" opacity=".85"/>`;
      s += '</g>';
    }
    return `<g data-depth="1.8">${s}</g>`;
  }
  function torii(x, y, s, col = '#0a0610') {
    return `<g transform="translate(${x},${y}) scale(${s})" fill="${col}">
      <path d="M-170,-210 Q0,-170 170,-210 L190,-235 Q0,-195 -190,-235Z"/>
      <rect x="-150" y="-185" width="300" height="14"/>
      <rect x="-120" y="-175" width="24" height="260"/><rect x="96" y="-175" width="24" height="260"/>
      <rect x="-12" y="-195" width="24" height="26"/></g>`;
  }
  function base(tint, seed, extras = '') {
    const r = rng(seed);
    return `<defs>
      <linearGradient id="sky${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050309"/><stop offset=".55" stop-color="${tint}"/><stop offset="1" stop-color="#0b0810"/></linearGradient>
      <radialGradient id="glow${seed}"><stop offset="0" stop-color="#c9a8ff" stop-opacity=".55"/><stop offset="1" stop-color="#c9a8ff" stop-opacity="0"/></radialGradient>
      <filter id="blur${seed}"><feGaussianBlur stdDeviation="22"/></filter></defs>
      <rect width="1600" height="900" fill="url(#sky${seed})"/>
      <g data-depth=".1">${stars(r, 90)}</g>${extras}`;
  }
  function mist() {
    return `<g data-depth=".5" opacity=".55">${[0, 1, 2].map(i =>
      `<ellipse class="cloud" cx="${300 + i * 500}" cy="${520 + i * 40}" rx="420" ry="46" fill="#6b4a8f" opacity=".28" filter="url(#mblur)" style="animation-delay:${-i * 11}s"/>`).join('')}</g>
      <defs><filter id="mblur"><feGaussianBlur stdDeviation="30"/></filter></defs>`;
  }

  /* ---- motifs ---- */
  const M = {};
  M.moon = (o = {}) => {
    const r = rng(o.seed || 7);
    return `<g data-depth=".25"><circle cx="${o.mx || 1050}" cy="${o.my || 300}" r="240" fill="url(#glow${o.seed || 7})" class="pulse"/>
      <circle cx="${o.mx || 1050}" cy="${o.my || 300}" r="118" fill="#eadff7"/>
      <circle cx="${(o.mx || 1050) - 30}" cy="${(o.my || 300) - 20}" r="22" fill="#cdbfe0" opacity=".6"/><circle cx="${(o.mx || 1050) + 36}" cy="${(o.my || 300) + 34}" r="14" fill="#cdbfe0" opacity=".6"/>
      <circle cx="${o.mx || 1050}" cy="${o.my || 300}" r="118" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3"/></g>
      ${mist()}${ridge(r, 600, 120, '#150e22', .6)}${ridge(r, 690, 140, '#0d0816', 1)}
      ${o.gate === false ? '' : `<g data-depth="1.2">${torii(430, 700, 1.1)}</g>`}
      ${o.sword ? `<g data-depth="1.2"><g transform="translate(800,0)"><polygon points="0,170 14,560 0,640 -14,560" fill="#efe3ff"/><polygon points="0,170 14,560 0,640" fill="#b99aea"/><ellipse cx="0" cy="400" rx="60" ry="260" fill="#a77cf0" opacity=".25" class="pulse"/></g></g>` : ''}
      ${ridge(r, 790, 90, '#06030b', 1.8)}${wisteria(r, 'r')}${o.wis === false ? '' : wisteria(r, 'l')}`;
  };
  M.circle = (o = {}) => {
    const c = o.color || '#a97cff';
    let ticks = '';
    for (let i = 0; i < 72; i++) { const a = i * 5 * Math.PI / 180, l = i % 6 ? 10 : 22;
      ticks += `<line x1="${Math.cos(a) * 262}" y1="${Math.sin(a) * 262}" x2="${Math.cos(a) * (262 + l)}" y2="${Math.sin(a) * (262 + l)}"/>`; }
    const tri = rot => { const p = [0, 1, 2].map(i => { const a = (i * 120 + rot) * Math.PI / 180; return `${Math.cos(a) * 190},${Math.sin(a) * 190}`; }); return `<polygon points="${p.join(' ')}"/>`; };
    return `<g transform="translate(800,380)" fill="none" stroke="${c}" stroke-width="2">
      <circle r="300" opacity=".15" class="pulse"/>
      <g opacity=".85">${spin(120)}${ticks}<circle r="262" stroke-width="3"/></g>
      <g opacity=".7" stroke-dasharray="4 10">${spin(60, 0, 0, true)}<circle r="226"/></g>
      <g opacity=".9">${spin(90)}${tri(-90)}${tri(90)}</g>
      <circle r="120" opacity=".5"/><circle r="56" stroke-dasharray="2 6"/>
      <circle r="14" fill="${c}" stroke="none" class="pulse"/><circle r="70" fill="${c}" stroke="none" opacity=".12" class="pulse"/></g>`;
  };
  M.eye = () => {
    let frag = '';
    const r = rng(3);
    for (let i = 0; i < 40; i++) frag += `<rect class="rise" x="${(r() * 1600).toFixed(0)}" y="${(300 + r() * 380).toFixed(0)}" width="${(2 + r() * 3).toFixed(0)}" height="${(10 + r() * 22).toFixed(0)}" fill="#b99aea" style="animation-delay:${(-r() * 10).toFixed(1)}s"/>`;
    return `<g>${frag}</g><g transform="translate(800,360)">
      <path d="M-380,0 Q0,-230 380,0 Q0,230 -380,0Z" fill="#0a0610" stroke="#a97cff" stroke-width="3"/>
      <circle r="132" fill="#3a1766"/><circle r="132" fill="none" stroke="#c9a8ff" stroke-width="2" stroke-dasharray="3 7">${spin(40)}</circle>
      <circle r="92" fill="#1d0b35" stroke="#a97cff" stroke-width="1.5"/><circle r="44" fill="#000"/>
      <circle cx="-30" cy="-30" r="12" fill="#fff" opacity=".8"/>
      <ellipse rx="380" ry="230" fill="none" stroke="#a97cff" opacity=".2" class="pulse"/></g>`;
  };
  M.layers = () => `<g data-depth=".4">
      <rect y="0" width="1600" height="300" fill="#243a5e" opacity=".35"/><rect y="300" width="1600" height="300" fill="#05030a"/>
      <rect y="600" width="1600" height="300" fill="#4a0f2c" opacity=".6"/>
      <g stroke="#b99aea" stroke-opacity=".3" stroke-dasharray="3 9"><line x1="0" x2="1600" y1="300" y2="300"/><line x1="0" x2="1600" y1="600" y2="600"/></g></g>
      <circle cx="1250" cy="150" r="46" fill="#eadff7"/><circle cx="1250" cy="150" r="130" fill="url(#glow9)" class="pulse"/>
      <g font-family="Shippori Mincho,serif" font-size="30" fill="#eadff7" letter-spacing="6">
        <text x="140" y="170">I · NOTRE MONDE</text><text x="140" y="470" opacity=".8">II · LE NÉANT</text><text x="140" y="770" fill="#ff9aa8">III · LES LIMBES</text></g>
      <g fill="#b99aea">${Array.from({ length: 30 }, (_, i) => `<circle class="rise" cx="${200 + i * 47}" cy="${400 + (i * 53) % 150}" r="2" style="animation-delay:${-i * .7}s"/>`).join('')}</g>
      <g stroke="#ff4d6a" stroke-opacity=".5" fill="none">${[0, 1, 2, 3].map(i => `<path d="M0,${690 + i * 38} Q400,${640 + i * 38} 800,${690 + i * 38} T1600,${690 + i * 38}" class="flow"/>`).join('')}</g>`;
  M.gate7 = () => {
    const cols = ['#f59e0b', '#241a2e', '#241a2e', '#c02626', '#2f6fe0', '#b45cf0', '#a9b4c6'];
    return `${torii(800, 640, 2.1)}<g>${cols.map((c, i) => {
      const x = 530 + i * 90, dead = c === '#241a2e';
      return `<g><line x1="${x}" y1="270" x2="${x}" y2="${330 + (i % 2) * 20}" stroke="#2b1c3a" stroke-width="2"/>
        <circle cx="${x}" cy="${350 + (i % 2) * 20}" r="${i === 0 ? 30 : 24}" fill="${c}" ${dead ? 'stroke="#555" stroke-dasharray="3 4"' : 'class="pulse"'}/>
        ${dead ? '' : `<circle cx="${x}" cy="${350 + (i % 2) * 20}" r="${i === 0 ? 70 : 54}" fill="${c}" opacity=".2" filter="url(#blur9)"/>`}</g>`; }).join('')}</g>
      <rect x="640" y="560" width="320" height="6" fill="#b99aea" opacity=".35" class="pulse"/>`;
  };
  M.ring = (o = {}) => {
    const gems = ['#c02626', '#2f6fe0', '#b45cf0', '#a9b4c6', '#f59e0b'];
    let g = '';
    gems.forEach((c, i) => { const a = (i * 72 - 90) * Math.PI / 180;
      g += `<circle cx="${Math.cos(a) * 200}" cy="${Math.sin(a) * 200}" r="19" fill="${c}" class="pulse"/><circle cx="${Math.cos(a) * 200}" cy="${Math.sin(a) * 200}" r="46" fill="${c}" opacity=".25" filter="url(#blur9)"/>`; });
    const band = o.broken
      ? [0, 1, 2, 3, 4, 5, 6].map(i => { const a = i * 51.4, d = 18 + (i % 3) * 22;
          return `<path class="shard" style="--dx:${Math.cos(a * Math.PI / 180) * d}px;--dy:${Math.sin(a * Math.PI / 180) * d}px;animation-delay:${-i}s" d="M${Math.cos((a + 2) * Math.PI / 180) * 200},${Math.sin((a + 2) * Math.PI / 180) * 200} A200,200 0 0 1 ${Math.cos((a + 47) * Math.PI / 180) * 200},${Math.sin((a + 47) * Math.PI / 180) * 200}" fill="none" stroke="#1c1428" stroke-width="34"/>`; }).join('')
      : `<circle r="200" fill="none" stroke="#1c1428" stroke-width="34"/><circle r="200" fill="none" stroke="#8b66c9" stroke-opacity=".5" stroke-width="2" stroke-dasharray="40 14">${spin(30)}</circle>`;
    return `<g transform="translate(800,360) rotate(-14)">
      <circle r="300" fill="url(#glow9)" class="pulse"/>${band}${o.broken ? '' : g}
      ${o.broken ? '<circle r="26" fill="#b45cf0" class="pulse"/>' : '<circle cx="0" cy="-200" r="30" fill="#7b3bd6" class="pulse"/>'}</g>
      ${o.sword ? `<g transform="translate(800,0)"><polygon points="0,60 16,500 0,620 -16,500" fill="#efe3ff" opacity=".95"/><polygon points="0,60 16,500 0,620" fill="#b99aea"/><ellipse cx="0" cy="340" rx="80" ry="320" fill="#a77cf0" opacity=".22" class="pulse"/></g>` : ''}`;
  };
  M.threads = () => {
    const r = rng(11); let s = '';
    for (let i = 0; i < 70; i++) { const a = r() * Math.PI * 2, d = 900 + r() * 200;
      s += `<line class="flow" x1="${800 + Math.cos(a) * d}" y1="${330 + Math.sin(a) * d}" x2="800" y2="330" stroke="#a97cff" stroke-opacity="${(.12 + r() * .3).toFixed(2)}" stroke-width="1"/>`; }
    return `${s}<circle cx="800" cy="330" r="260" fill="url(#glow9)" class="pulse"/>
      <g fill="none" stroke="#a97cff" stroke-opacity=".25"><circle cx="800" cy="330" r="120"/><circle cx="800" cy="330" r="220"/><circle cx="800" cy="330" r="340"/></g>
      <circle cx="800" cy="330" r="7" fill="#fff"/>`;
  };
  M.balance = () => `<g>
      <rect x="792" y="270" width="16" height="420" fill="#120a1c"/><rect x="720" y="680" width="160" height="14" fill="#120a1c"/>
      <circle cx="800" cy="270" r="150" fill="url(#glow9)" class="pulse"/>
      <g stroke="#c9a8ff" stroke-width="3">
        <animateTransform attributeName="transform" type="rotate" values="-5 800 270;5 800 270;-5 800 270" dur="9s" repeatCount="indefinite"/>
        <line x1="440" y1="270" x2="1160" y2="270" stroke-width="6"/>
        <g><animateTransform attributeName="transform" type="rotate" values="5 440 270;-5 440 270;5 440 270" dur="9s" repeatCount="indefinite"/>
          <line x1="440" y1="270" x2="380" y2="460"/><line x1="440" y1="270" x2="500" y2="460"/><path d="M360,460 Q440,540 520,460Z" fill="#0a0610"/>
          <text x="440" y="440" fill="#c9a8ff" stroke="none" font-size="22" text-anchor="middle" font-family="Shippori Mincho,serif">NÉANT</text></g>
        <g><animateTransform attributeName="transform" type="rotate" values="5 1160 270;-5 1160 270;5 1160 270" dur="9s" repeatCount="indefinite"/>
          <line x1="1160" y1="270" x2="1100" y2="460"/><line x1="1160" y1="270" x2="1220" y2="460"/><path d="M1080,460 Q1160,540 1240,460Z" fill="#4a0f2c"/>
          <text x="1160" y="440" fill="#ff9aa8" stroke="none" font-size="22" text-anchor="middle" font-family="Shippori Mincho,serif">LIMBES</text></g>
      </g><circle cx="800" cy="270" r="12" fill="#fff"/></g>`;

  const TINT = { violet: '#1b0e33', blood: '#2d0a14', night: '#0f1226', void: '#0a0614' };
  const MAP = {
    prologue: ['violet', 21, () => M.moon({ seed: 21 })],
    I: ['blood', 22, () => M.moon({ seed: 22, mx: 560, my: 280 })],
    II: ['violet', 23, () => M.moon({ seed: 23, mx: 1180, my: 250, wis: false })],
    III: ['violet', 9, () => M.circle()],
    IV: ['violet', 9, () => M.circle({ color: '#c9a8ff' })],
    V: ['blood', 9, () => M.circle({ color: '#ff5470' })],
    VI: ['void', 9, () => M.eye()],
    VII: ['void', 9, () => M.layers()],
    VIII: ['night', 9, () => M.gate7()],
    IX: ['violet', 9, () => M.ring()],
    X: ['violet', 9, () => M.circle({ color: '#8f5cff' })],
    XI: ['void', 9, () => M.threads()],
    XII: ['violet', 9, () => M.balance()],
    XIII: ['violet', 9, () => M.ring({ broken: true, sword: true })],
    XIV: ['night', 24, () => M.moon({ seed: 24, mx: 800, my: 260 })],
    final: ['violet', 25, () => M.moon({ seed: 25, mx: 1180, my: 240, sword: true, gate: false })],
    annexe: ['night', 26, () => M.moon({ seed: 26, mx: 450, my: 270 })]
  };

  return {
    banner(id) {
      const [t, seed, fn] = MAP[id] || MAP.annexe;
      return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${base(TINT[t], seed === 9 ? 9 : seed)}${seed === 9 ? mist() : ''}${fn()}</svg>`;
    },
    cover() {
      return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${base('#210f3d', 1)}${M.moon({ seed: 1, mx: 1230, my: 230, gate: true })}</svg>`;
    }
  };
})();
