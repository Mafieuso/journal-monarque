(() => {
const $view = document.getElementById('view');
const $nav = document.getElementById('nav');
const $tip = document.getElementById('tip');
const $wipe = document.getElementById('wipe');
const $prog = document.getElementById('progress');
const ANNEXES = [['hierarchies','Hiérarchies'],['personnages','Personnages'],['lieux','Lieux'],['glossaire','Glossaire'],['chronologie','Chronologie']];
const SPECIAL = { prologue:'序', final:'終' };
const MOOD = { I:'blood', V:'blood' };
const INTENSITY = { III:.6, VI:.5, VII:.6, VIII:.7, IX:.7, XI:.9, XII:1, XIII:1, final:.8 };

const md = s => s.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>');
const esc = s => s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const isSpecial = e => e.id==='prologue' || e.id==='final';

/* ---- progression : sceaux et énigmes ---- */
const KEY = 'fdc-solved';
let solved = new Set();
try { solved = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch(e){}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...solved])); } catch(e){} };
const entryOpen = id => id === 'prologue' || solved.has(id);
const annexOpen = k => solved.has('annexe:'+k);
const frontier = () => ENTRIES.find(e => !entryOpen(e.id));
const TOTAL = Object.keys(RIDDLES).length + Object.keys(ANNEX_RIDDLES).length;
const fails = {};

function riddlePanel(set, id, label, can, back){
  const r = set[id];
  if (!can) return `<div class="riddle off"><div class="seal-k">封</div><div class="rt">${label}</div>
    <p class="rq">Ce sceau ne peut pas encore être approché. Brise d'abord les précédents.</p>${back}</div>`;
  return `<form class="riddle" data-set="${set===RIDDLES?'e':'a'}" data-id="${id}" autocomplete="off"><div class="seal-k">封</div><div class="rt">${label}</div>
    <p class="rq">${r.q}</p>
    <div class="rrow"><input name="a" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ta réponse…" aria-label="Réponse">
    <button class="btn" type="submit" data-hover>Rompre le sceau</button></div>
    <div class="rmsg" aria-live="polite"></div>
    <button type="button" class="hintbtn" data-hover hidden>Demander un indice</button><div class="rhint" hidden>${esc(r.hint)}</div>${back}</form>`;
}
const noTerms = h => h.replace(/<button class="term"[^>]*>(.*?)<\/button>/g,'$1');

/* ---- glossaire ---- */
const aliasList = GLOSSARY.flatMap(g => g.alias.map(a => [a,g.id])).sort((a,b)=>b[0].length-a[0].length);
const aliasRe = new RegExp('(?<![\\p{L}])(' + aliasList.map(a=>a[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|') + ')(?![\\p{L}])','gu');
const aliasMap = Object.fromEntries(aliasList);
function glossify(html, seen){
  return html.split(/(<[^>]+>)/).map(seg => seg.startsWith('<') ? seg :
    seg.replace(aliasRe, m => { const id = aliasMap[m]; if (seen.has(id)) return m; seen.add(id);
      return `<button class="term" type="button" data-g="${id}">${m}</button>`; })).join('');
}

/* ---- bords de papier déchirés ---- */
function clip(){
  const r = () => Math.random();
  let top = [], bot = [];
  for (let x = 0; x <= 100; x += 2.5){ top.push(`${x}% ${(r()*7).toFixed(1)}px`); bot.unshift(`${x}% calc(100% - ${(r()*7).toFixed(1)}px)`); }
  return `polygon(${top.join(',')},${bot.join(',')})`;
}

/* ---- blocs ---- */
function guardiansHtml(){
  return '<div class="guardians">' + GUARDIANS.map(g => `
    <details class="guardian rv" style="--g:${g.color}">
      <summary data-hover><span class="gn" style="color:${g.color}">${esc(g.name)}</span><span class="gt">${esc(g.title)}</span></summary>
      <div class="gb"><blockquote>${esc(g.quote)}</blockquote><p>${esc(g.lore)}</p>
      <p class="stats"><b>Forme :</b> ${esc(g.forme)} · <b>Menace :</b> ${esc(g.menace)} · <b>Statut :</b> ${esc(g.statut)}</p></div>
    </details>`).join('') + '</div>';
}
function bodyHtml(e){
  const seen = new Set();
  return e.body.map(b => {
    if (typeof b === 'string'){
      const occ = b.startsWith('§');
      return `<p class="rv${occ?' occ':''}">${glossify(md(occ ? b.slice(1) : b), seen)}</p>`;
    }
    if (b.note) return `<aside class="note rv">${md(b.note)}</aside>`;
    if (b.h) return `<h3 class="rv">${esc(b.h)}</h3>`;
    if (b.todo) return `<div class="todo">${esc(b.todo)}</div>`;
    if (b.guardians) return guardiansHtml();
    if (b.list){ const t = b.ordered ? 'ol' : 'ul';
      return `<${t} class="rv">${b.list.map(x=>`<li>${glossify(md(x),seen)}</li>`).join('')}</${t}>`; }
    if (b.sign) return `<div class="hanko rv">${isSpecial(e)?'<span>Hanma Hord, Monarque des Ombres</span>':''}<span class="stamp" aria-hidden="true">影</span></div>`;
    return '';
  }).join('');
}
const sheet = inner => `<div class="sheet-wrap"><article class="sheet" style="--clip:${clip()}">${inner}</article></div>`;
const banner = (id, kicker, big, title, locked) => `<section class="banner"><div class="art" data-par>${ART.banner(id)}</div>
  <div class="banner-in"><div class="kicker">${kicker}</div><div class="rn">${big}</div><h2${locked?' data-scr':''}>${esc(title)}</h2></div></section>`;

/* ---- vues ---- */
function cover(){
  const words = 'Le Fardeau de la Connaissance'.split(' ').map((w,i)=>`<span class="w" style="animation-delay:${.3+i*.22}s">${w}</span>`).join(' ');
  return `<section class="hero"><div class="art" data-par>${ART.cover()}</div>
    <div class="hero-in"><div class="kicker">Journal de bord · Ère Taishō</div>
      <h1>${words}</h1>
      <div class="sub">Journal du Monarque des Ombres, légué à Iroh Jin</div>
      <div class="btns"><a class="btn" href="#/e/prologue">Ouvrir le journal</a><a class="btn ghost" href="#/sommaire">Sommaire</a></div>
      <div class="hint">♪ Musique d'ambiance au premier clic — réglable en haut à droite</div></div>
    <div class="scroll"></div></section>
    <section class="intro"><p class="rv">« Le savoir que tu ignores est celui qui te tuera. »</p>
      <p class="rv" style="font-size:1rem;font-style:normal;opacity:.7;margin-top:2em">Dernier écrit de Hanma Hord, Monarque des Ombres, avant le combat final. Il ne s'adresse qu'à un seul lecteur.</p></section>
    <h2 class="cards-title rv">Les entrées</h2>
    <div class="grid">${ENTRIES.map(cardOf).join('')}</div>`;
}
const cardOf = e => { const open = entryOpen(e.id);
  return `<a class="card rv${open?'':' locked'}" href="#/e/${e.id}" data-n="${SPECIAL[e.id]||e.num}" data-hover><span class="cn">${isSpecial(e)?e.num:'Entrée '+e.num}</span><h3${open?'':' data-scr'}>${esc(e.title)}</h3>${open?'':'<span class="lk">封</span>'}</a>`; };

function toc(){
  return `<section class="page-top"><div class="kicker">Table des entrées</div><h1>Sommaire</h1></section>
    <div class="grid">${ENTRIES.map(cardOf).join('')}</div>
    <h2 class="cards-title rv">Annexes</h2>
    <div class="grid" style="padding-bottom:4vh">${ANNEXES.map(([k,l],i)=>{ const o = annexOpen(k);
      return `<a class="card annex rv${o?'':' locked'}" href="#/annexe/${k}" data-n="附" data-hover><span class="cn">Annexe ${i+1}</span><h3${o?'':' data-scr'}>${l}</h3>${o?'':'<span class="lk">封</span>'}</a>`; }).join('')}</div>
    <p class="reset rv">Sceaux brisés : <b>${solved.size}</b> / ${TOTAL} &nbsp;·&nbsp; <button id="reset" type="button" data-hover>Réinitialiser ma progression</button></p>`;
}

function entry(idx){
  const e = ENTRIES[idx], prev = ENTRIES[idx-1], next = ENTRIES[idx+1];
  const label = x => isSpecial(x) ? x.num : 'Entrée '+x.num;
  if (!entryOpen(e.id)){
    const can = entryOpen(prev.id), f = frontier();
    const back = can ? `<a class="plink" href="#/e/${prev.id}" data-hover>← Relire ${esc(label(prev))}</a>`
                     : `<a class="plink" href="#/e/${f.id}" data-hover>→ Aller au sceau en cours (${esc(label(f))})</a>`;
    return banner(e.id, isSpecial(e)?esc(e.num):'Entrée', SPECIAL[e.id]||e.num, e.title, true) +
      sheet(riddlePanel(RIDDLES, e.id, 'Sceau · ' + label(e), can, back) + `<div data-scr>${noTerms(bodyHtml(e))}</div>`);
  }
  return banner(e.id, isSpecial(e)?esc(e.num):'Entrée', SPECIAL[e.id]||e.num, e.title) +
    sheet(bodyHtml(e) + `<nav class="pager">
      ${prev?`<a href="#/e/${prev.id}" data-hover>← ${esc(label(prev))}<br><small>Entrée précédente</small></a>`:'<span></span>'}
      ${next?`<a class="r" href="#/e/${next.id}" data-hover>${esc(label(next))} →<br><small>Entrée suivante</small></a>`:`<a class="r" href="#/annexe/hierarchies" data-hover>Annexes →</a>`}</nav>`) +
    (next ? `<a class="next rv" href="#/e/${next.id}" data-hover><span class="kicker">${entryOpen(next.id)?'Continuer la lecture':'Un sceau t\'attend'}</span><b${entryOpen(next.id)?'':' data-scr'}>${esc(next.title)}</b><span class="arrow">→</span></a>`
          : `<a class="next rv" href="#/annexe/hierarchies" data-hover><span class="kicker">Le journal est clos</span><b>Consulter les annexes</b><span class="arrow">→</span></a>`);
}

function annex(key){
  const tabs = `<div class="tabs">${ANNEXES.map(([k,l])=>`<a href="#/annexe/${k}" class="${k===key?'on':''}" data-hover>${l}</a>`).join('')}</div>`;
  let h = '';
  if (key==='hierarchies'){
    h = `<h3>Rangs de la Sphère Occulte</h3>
    <table><tr><th>Rang</th><th>Condition particulière</th></tr>
      <tr><td>Incantateur</td><td>—</td></tr><tr><td>Marcheur des Voiles</td><td>—</td></tr>
      <tr><td>Collecteur d'Ombre</td><td>Peut fonder une école (serment au Monarque)</td></tr>
      <tr><td>Marchand des Âmes</td><td>Être débridé dans son noyau (ex. : Quart de Sphère)</td></tr>
      <tr><td>Monarque des Ombres</td><td>Transcender</td></tr></table>
    <h3>Ordre Démoniaque</h3>
    <ul><li><strong>Lunes Inférieures</strong> : rang de l'Ordre (Hanma l'a atteint).</li>
    <li><strong>Lunes Supérieures</strong> : rang supérieur (Nashimu en était une).</li>
    <li><strong>Excellences Suprêmes</strong> : classées de 6 à 1 (Shin.itori est la n°3).</li>
    <li><strong>Traya Hord, la Dame au Biwa</strong> : source de la puissance transmise par le sang.</li></ul>`;
  } else if (key==='personnages'){
    h = `<table><tr><th>Nom</th><th>Rôle</th></tr>${PERSONNAGES.map(([n,r])=>
      `<tr><td><strong>${esc(n)}</strong></td><td>${r.startsWith('[')?`<span class="warn">${esc(r)}</span>`:esc(r)}</td></tr>`).join('')}</table>`;
  } else if (key==='lieux'){
    h = `<dl>${LIEUX.map(([n,d])=>`<dt>${esc(n)}</dt><dd>${esc(d)}</dd>`).join('')}</dl>`;
  } else if (key==='glossaire'){
    h = `<dl>${[...GLOSSARY].sort((a,b)=>a.term.localeCompare(b.term,'fr')).map(g=>`<dt id="g-${g.id}">${esc(g.term)}</dt><dd>${esc(g.def)}</dd>`).join('')}</dl>`;
  } else {
    h = `<ol class="tl">${CHRONO.map((c,i)=>`<li class="rv ${i===CHRONO.length-1?'end':''}"><b>${i+1}.</b>${md(esc(c))}</li>`).join('')}</ol>`;
  }
  const t = ANNEXES.find(a=>a[0]===key)[1];
  if (!annexOpen(key)){
    const can = solved.has('final'), f = frontier();
    const back = can ? '' : `<a class="plink" href="#/e/${f.id}" data-hover>→ Aller au sceau en cours</a>`;
    return banner('annexe','Annexes','附',t,true) + sheet(`${tabs}` + riddlePanel(ANNEX_RIDDLES, key, 'Sceau · Annexe', can, back) + `<div data-scr>${h.replace(/<button class="term"[^>]*>(.*?)<\/button>/g,'$1')}</div>`);
  }
  return banner('annexe','Annexes','附',t) + sheet(`${tabs}${h}
    <nav class="pager"><a href="#/sommaire" data-hover>← Sommaire</a><a class="r" href="#/" data-hover>Couverture</a></nav>`);
}

/* ---- parallaxe / progression ---- */
let layers = [];
function bindParallax(){
  layers = [...document.querySelectorAll('[data-par] [data-depth]')].map(el => ({ el, d:+el.dataset.depth, host:el.closest('[data-par]') }));
}
FX.onFrame(m => {
  const nx = m.sx/innerWidth - .5, ny = m.sy/innerHeight - .5, sy = scrollY;
  for (const l of layers){
    const r = l.host.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) continue;
    l.el.style.transform = `translate(${(-nx*l.d*34).toFixed(1)}px,${(-ny*l.d*18 + sy*l.d*.07).toFixed(1)}px)`;
  }
});
function progress(){
  const h = document.documentElement.scrollHeight - innerHeight;
  $prog.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY/h) : 0})`;
}
addEventListener('scroll', progress, { passive:true });

/* ---- révélation ---- */
let io;
function reveal(){
  io && io.disconnect();
  io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin:'0px 0px -8% 0px', threshold:.08 });
  document.querySelectorAll('.rv').forEach((el,i) => { el.style.transitionDelay = (i % 6) * 60 + 'ms'; io.observe(el); });
}

/* ---- routeur ---- */
function render(opts = {}){
  hideTip();
  Scr.clear();
  const parts = location.hash.replace(/^#\/?/,'').split('/');
  let html, onCover = false, mood = null, level = .1, scrollTo = null;
  if (parts[0]==='e' && ENTRIES.some(e=>e.id===parts[1])){
    const idx = ENTRIES.findIndex(e=>e.id===parts[1]); html = entry(idx);
    mood = MOOD[parts[1]]; level = INTENSITY[parts[1]] ?? .15;
  } else if (parts[0]==='sommaire') html = toc();
  else if (parts[0]==='annexe'){
    const key = ANNEXES.some(a=>a[0]===parts[1]) ? parts[1] : 'hierarchies';
    html = annex(key); scrollTo = parts[2] ? 'g-'+parts[2] : null;
  } else { html = cover(); onCover = true; }
  $view.innerHTML = html;
  FX.setMood(mood==='blood' ? {r:255,g:84,b:112} : {r:170,g:120,b:255});
  FX.Snd.mood(level);
  document.querySelectorAll('[data-scr]').forEach(el => Scr.mount(el));
  bindParallax(); reveal();
  const t = scrollTo && document.getElementById(scrollTo);
  if (t){ t.scrollIntoView({block:'center'}); t.classList.add('hl'); history.replaceState(null,'','#/annexe/glossaire'); } else if (!opts.keep) window.scrollTo(0,0);
  progress();
}
$nav.hidden = false;

let busy = false;
function go(hash){
  if (busy || hash === location.hash) return;
  busy = true; $wipe.classList.add('in'); FX.Snd.page();
  setTimeout(() => {
    location.hash = hash; // déclenche hashchange (ignoré ci-dessous) puis rendu
    render();
    setTimeout(() => { $wipe.classList.remove('in'); busy = false; }, 120);
  }, 480);
}
addEventListener('hashchange', () => { if (!busy) render(); });
document.addEventListener('click', ev => {
  const a = ev.target.closest('a[href^="#/"]');
  if (a){ ev.preventDefault(); go(a.getAttribute('href')); }
});

/* ---- infobulles ---- */
function hideTip(){ $tip.hidden = true; }
document.addEventListener('click', ev => {
  const b = ev.target.closest('.term');
  if (!b){ if (!ev.target.closest('#tip')) hideTip(); return; }
  const g = GLOSSARY.find(x=>x.id===b.dataset.g);
  $tip.innerHTML = `<b>${esc(g.term)}</b>${esc(g.def)}<br><a href="#/annexe/glossaire/${g.id}" data-hover>Voir le glossaire →</a>`;
  $tip.hidden = false;
  const r = b.getBoundingClientRect(), w = $tip.offsetWidth;
  $tip.style.left = Math.max(8, Math.min(scrollX + r.left, scrollX + innerWidth - w - 8)) + 'px';
  $tip.style.top = (scrollY + r.bottom + 6) + 'px';
});
document.addEventListener('keydown', e => { if (e.key==='Escape') hideTip(); });

/* ---- énigmes ---- */
const MSGS = ['Le sceau ne bouge pas.','Ce n\'est pas cela.','L\'encre se retire, la réponse est ailleurs.','Relis. Ne devine pas.','Le savoir que tu ignores…'];
document.addEventListener('submit', ev => {
  const f = ev.target.closest('form.riddle'); if (!f) return;
  ev.preventDefault();
  const val = f.a.value; if (!val.trim()) return;
  const isE = f.dataset.set === 'e', id = f.dataset.id, set = isE ? RIDDLES : ANNEX_RIDDLES;
  const msg = f.querySelector('.rmsg');
  if (checkRiddle(set, id, val)){
    solved.add(isE ? id : 'annexe:' + id); save();
    f.classList.add('ok'); f.a.disabled = true; msg.textContent = 'Le sceau se brise.';
    document.body.classList.add('flash'); setTimeout(() => document.body.classList.remove('flash'), 900);
    FX.Snd.page();
    Scr.reveal(() => render({ keep:true }));
  } else {
    const n = fails[id] = (fails[id] || 0) + 1;
    msg.textContent = MSGS[Math.floor(Math.random() * MSGS.length)];
    f.classList.remove('bad'); void f.offsetWidth; f.classList.add('bad');
    if (n >= 2) f.querySelector('.hintbtn').hidden = false;
  }
});
document.addEventListener('click', ev => {
  const hb = ev.target.closest('.hintbtn');
  if (hb){ hb.hidden = true; hb.parentElement.querySelector('.rhint').hidden = false; }
  if (ev.target.closest('#reset') && confirm('Remettre tous les sceaux en place ?')){ solved = new Set(); save(); render(); }
});

/* ---- musique ---- */
const $snd = document.getElementById('snd');
$snd.addEventListener('click', () => FX.Snd.toggle());
if (FX.Snd.pref() === 'off') document.body.classList.remove('snd-on');
addEventListener('pointerdown', e => { if (!e.target.closest('#snd')) FX.Snd.start(); }, { once:false });

render();
})();
