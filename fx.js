/* Effets : particules, curseur encre, parallaxe, musique d'ambiance générative (Web Audio, aucun fichier audio). */
const FX = (() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, nx: 0, ny: 0, sx: innerWidth / 2, sy: innerHeight / 2 };
  const hooks = [];
  let mood = { r: 150, g: 110, b: 230, dens: 1 };
  let W, H, dpr;

  /* --- canvas particules --- */
  const cv = document.getElementById('fx'), cx = cv.getContext('2d');
  const tr = document.getElementById('trail'), tx = tr.getContext('2d');
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    for (const c of [cv, tr]) { c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px'; }
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); tx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  addEventListener('resize', size); size();

  const petals = Array.from({ length: reduce ? 0 : 46 }, () => mk(true));
  function mk(init) {
    return { x: Math.random() * W, y: init ? Math.random() * H : -20, s: 4 + Math.random() * 7, vx: -.2 + Math.random() * .6, vy: .25 + Math.random() * .6,
      a: Math.random() * 6.28, va: (Math.random() - .5) * .03, o: .25 + Math.random() * .5, ember: Math.random() < .35 };
  }

  /* --- curseur --- */
  const dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring');
  const trail = [];
  let hover = false, down = 0;
  if (fine) {
    document.body.classList.add('has-cursor');
    addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.nx = e.clientX / W - .5; mouse.ny = e.clientY / H - .5;
      trail.push({ x: e.clientX, y: e.clientY, life: 1 }); if (trail.length > 60) trail.shift(); });
    document.addEventListener('mouseover', e => { hover = !!e.target.closest('a,button,summary,.term,[data-hover]'); ring.classList.toggle('hov', hover); });
    addEventListener('mousedown', e => { down = 1; ring.classList.add('down'); ripple(e.clientX, e.clientY); });
    addEventListener('mouseup', () => { down = 0; ring.classList.remove('down'); });
    document.addEventListener('mouseleave', () => { dot.style.opacity = ring.style.opacity = 0; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = ring.style.opacity = 1; });
  }
  function ripple(x, y) {
    const r = document.createElement('div'); r.className = 'ripple'; r.style.left = x + 'px'; r.style.top = y + 'px';
    document.body.appendChild(r); setTimeout(() => r.remove(), 900);
  }

  function frame() {
    mouse.sx += (mouse.x - mouse.sx) * .16; mouse.sy += (mouse.y - mouse.sy) * .16;
    if (fine) {
      dot.style.transform = `translate(${mouse.x}px,${mouse.y}px)`;
      ring.style.transform = `translate(${mouse.sx}px,${mouse.sy}px)`;
      tx.clearRect(0, 0, W, H);
      for (let i = 1; i < trail.length; i++) {
        const p = trail[i], q = trail[i - 1]; p.life -= .035;
        if (p.life <= 0) continue;
        tx.strokeStyle = `rgba(${mood.r},${mood.g},${mood.b},${p.life * .55})`; tx.lineWidth = 1 + p.life * 5; tx.lineCap = 'round';
        tx.beginPath(); tx.moveTo(q.x, q.y); tx.lineTo(p.x, p.y); tx.stroke();
      }
      while (trail.length && trail[0].life <= 0) trail.shift();
    }
    cx.clearRect(0, 0, W, H);
    for (const p of petals) {
      p.x += p.vx + Math.sin(p.y * .01 + p.a) * .35 + mouse.nx * .3; p.y += p.ember ? -p.vy * .6 : p.vy; p.a += p.va;
      if (p.y > H + 20 || p.y < -30) { Object.assign(p, mk(false)); if (p.ember) p.y = H + 10; }
      if (p.x > W + 20) p.x = -20; if (p.x < -20) p.x = W + 20;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.a);
      if (p.ember) { cx.fillStyle = `rgba(${mood.r},${mood.g},${mood.b},${p.o * .8})`; cx.shadowColor = `rgb(${mood.r},${mood.g},${mood.b})`; cx.shadowBlur = 10; cx.beginPath(); cx.arc(0, 0, p.s * .22, 0, 6.28); cx.fill(); }
      else { cx.fillStyle = `rgba(${150 + (mood.r - 150) * .5},${110 + (mood.g - 110) * .4},${205},${p.o * .55})`; cx.beginPath(); cx.ellipse(0, 0, p.s, p.s * .45, 0, 0, 6.28); cx.fill(); }
      cx.restore();
    }
    hooks.forEach(h => h(mouse));
    requestAnimationFrame(frame);
  }
  if (!reduce) requestAnimationFrame(frame);

  /* --- musique --- */
  const Snd = (() => {
    let ctx, master, rev, filt, droneG, on = false, started = false, timer, level = 0;
    const get = () => { try { return localStorage.getItem('fdc-music'); } catch (e) { return null; } };
    const put = v => { try { localStorage.setItem('fdc-music', v); } catch (e) { } };
    const impulse = (sec, decay) => { const len = ctx.sampleRate * sec, b = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); } return b; };
    const noise = sec => { const b = ctx.createBuffer(1, ctx.sampleRate * sec, ctx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; };
    function init() {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0;
      const comp = ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
      rev = ctx.createConvolver(); rev.buffer = impulse(5, 2.4);
      const rg = ctx.createGain(); rg.gain.value = .8; rev.connect(rg); rg.connect(master);
      filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 360; filt.Q.value = 3;
      droneG = ctx.createGain(); droneG.gain.value = .2; filt.connect(droneG); droneG.connect(master); droneG.connect(rev);
      [[55, 'sawtooth', .5], [55.35, 'sawtooth', .5], [82.4, 'sine', .8], [110.2, 'triangle', .35], [164.9, 'sine', .15]].forEach(([f, t, v]) => {
        const o = ctx.createOscillator(); o.type = t; o.frequency.value = f; const g = ctx.createGain(); g.gain.value = v * .35; o.connect(g); g.connect(filt); o.start(); });
      const lfo = ctx.createOscillator(); lfo.frequency.value = .06; const lg = ctx.createGain(); lg.gain.value = 150; lfo.connect(lg); lg.connect(filt.frequency); lfo.start();
      const w = ctx.createBufferSource(); w.buffer = noise(3); w.loop = true;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 520; bp.Q.value = .7;
      const wg = ctx.createGain(); wg.gain.value = .03; const l2 = ctx.createOscillator(); l2.frequency.value = .11; const l2g = ctx.createGain(); l2g.gain.value = .022;
      l2.connect(l2g); l2g.connect(wg.gain); l2.start(); w.connect(bp); bp.connect(wg); wg.connect(master); wg.connect(rev); w.start();
    }
    const scale = [293.66, 311.13, 392, 440, 466.16];
    function pluck() {
      if (!on || document.hidden) return;
      const t = ctx.currentTime, f = scale[Math.floor(Math.random() * 5)] * (Math.random() < .35 ? .5 : 1) * (Math.random() < .15 ? 2 : 1);
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.08, t + .02); g.gain.exponentialRampToValueAtTime(.0005, t + 3.2);
      const pan = ctx.createStereoPanner(); pan.pan.value = Math.random() * 1.6 - .8; g.connect(pan); pan.connect(master); pan.connect(rev);
      [[f, 'triangle', 1], [f * 2.003, 'sine', .35], [f * 3.01, 'sine', .1]].forEach(([fr, ty, v]) => { const o = ctx.createOscillator(); o.type = ty; o.frequency.value = fr;
        const og = ctx.createGain(); og.gain.value = v; o.connect(og); og.connect(g); o.start(t); o.stop(t + 3.4); });
    }
    function loop() { pluck(); timer = setTimeout(loop, (7000 + Math.random() * 11000) * (1 + level * .4)); }
    function fade(v) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setTargetAtTime(v, ctx.currentTime, .8); }
    function setOn(v) { on = v; put(v ? 'on' : 'off'); document.body.classList.toggle('snd-on', v); if (ctx) { ctx.resume(); fade(v ? .28 : 0); } }
    document.addEventListener('visibilitychange', () => { if (!ctx) return; document.hidden ? ctx.suspend() : (on && ctx.resume()); });
    return {
      start() { if (started) return; if (get() === 'off') return; started = true; init(); ctx.resume(); setOn(true); loop(); },
      toggle() { if (!started) { started = true; init(); ctx.resume(); loop(); setOn(true); } else setOn(!on); },
      mood(l) { level = l; if (!ctx) return; filt.frequency.setTargetAtTime(340 + l * 520, ctx.currentTime, 2); droneG.gain.setTargetAtTime(.18 + l * .12, ctx.currentTime, 2); },
      page() { if (!on) return; const t = ctx.currentTime, s = ctx.createBufferSource(); s.buffer = noise(.4);
        const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2; f.frequency.setValueAtTime(1800, t); f.frequency.exponentialRampToValueAtTime(500, t + .3);
        const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.04, t + .05); g.gain.exponentialRampToValueAtTime(.001, t + .35);
        s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + .4); },
      isOn: () => on, pref: get
    };
  })();

  return {
    Snd, mouse, reduce,
    onFrame: f => hooks.push(f),
    setMood(c) { mood = Object.assign(mood, c); }
  };
})();
