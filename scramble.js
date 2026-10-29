/* Texte scellé : les caractères changent en permanence tant que l'énigme n'est pas résolue. */
const Scr = (() => {
  const CH = 'ΞΨΩΣΔΘΛΠ∴∵╳░▒#%&§¿≠≈∑ƒ¶‡†◊µ∂ΓΦ?!/\\|<>=+*';
  let items = [], timer = 0, revealing = false;
  const rc = () => CH[Math.random() * CH.length | 0];
  const mix = s => s.replace(/\S/g, rc);
  function loop(){ if (revealing) return; for (const it of items) it.n.data = mix(it.o); }
  function start(){ if (!timer) timer = setInterval(loop, 90); }
  return {
    mount(el){
      el.classList.add('scr-on');
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
      while ((n = w.nextNode())) if (n.data.trim()) items.push({ n, o: n.data, el });
      start(); loop();
    },
    clear(){ items = []; revealing = false; },
    reveal(cb, dur = 1700){
      revealing = true; const t0 = performance.now(), N = items.length || 1;
      items.forEach((it, i) => it.s = (i / N) * .6 + Math.random() * .25);
      (function step(now){
        const p = (now - t0) / dur;
        for (const it of items){
          const local = Math.max(0, Math.min(1, (p - it.s) / .35)), cut = Math.floor(it.o.length * local);
          it.n.data = it.o.slice(0, cut) + mix(it.o.slice(cut));
        }
        if (p < 1.05) requestAnimationFrame(step);
        else { items.forEach(it => { it.n.data = it.o; it.el.classList.remove('scr-on'); }); items = []; revealing = false; cb && cb(); }
      })(t0);
    }
  };
})();
