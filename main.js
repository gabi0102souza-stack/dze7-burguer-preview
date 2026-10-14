(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const pad = n => String(n).padStart(2, '0');

  /* ================= cardápio (cardápio digital da casa) ================= */
  const M = {
    casa: {
      note: 'Hambúrguer ANGUS certificado, pão brioche ou australiano e a maionese da casa.',
      items: [
        { n: 'DZE7', p: '45,70', img: 'dze7', feat: true, b: [['A da casa', '']], d: 'Esse leva o nome da casa, pois é diferente de tudo e só se encontra aqui. Leve e saboroso.' },
        { n: 'Monstrinho', p: '45,70', img: 'monstrinho', d: 'Pão australiano, hambúrguer ANGUS certificado 170g, queijo prato, alface americana e picles.' },
        { n: 'Monstrinho duplo', p: '72,00', img: 'monstrinho-duplo', b: [['Dobro', 'r']], d: 'Sabe o Monstrinho? Então, com o dobro de carne, queijo e picles.' },
        { n: 'Bambino', p: '55,70', img: 'bambino', d: 'Pão brioche, hambúrguer ANGUS certificado 170g, queijo gorgonzola e amêndoas laminadas.' },
        { n: 'Costelin', p: '52,70', img: 'costelin', d: 'Pão brioche, costelinha desossada, queijo prato, cebola roxa e sweet chili agridoce.' },
        { n: 'Dragon Ball', p: '45,70', img: 'dragonball', d: 'Pão brioche, shimeji na chapa, queijo prato, hambúrguer ANGUS certificado 170g e maionese.' },
        { n: 'Marquinhos', p: '45,70', d: 'Pão australiano, hambúrguer ANGUS certificado 170g, cheddar, bacon e cebola caramelizada.' },
        { n: 'Zaparoli', p: '61,70', d: 'Pão brioche, burger Angus de 160g, queijo prato, muçarela empanada e molho de tomate.' },
        { n: 'Siriqueijo', p: '56,70', d: 'Pão brioche, hambúrguer quadrado de siri 140g, queijo prato, alface e cebola roxa.' },
        { n: 'Salomão Burger', p: '68,70', d: 'Pão ciabatta, hambúrguer quadrado de salmão, cream cheese, couve crispy e cebola.' },
        { n: 'Trio Clocante', p: '37,90', img: 'trio', d: 'Pão brioche, maionese da casa, hambúrguer de frango empanado e muçarela empanada.' },
        { n: 'Flango Clocante', p: '37,90', d: 'Pão brioche, tiras de frango crocante, cheddar, picles, alface americana e molho sweet chili.' },
        { n: 'Vegeta', p: '32,90', img: 'vegeta', b: [['Veggie', 'v']], d: 'Sim, o príncipe das saladinhas. Pão australiano, alface americana, rúcula e queijo.' },
        { n: 'Vegano', p: '32,90', img: 'vegano', b: [['Vegano', 'v']], d: 'Pão australiano, hambúrguer de abóbora e quinoa, picles e maionese vegana.' },
      ]
    },
    classicos: {
      note: 'Os clássicos de 100g no pão brioche. Também entram no combo 2 por R$ 39,99.',
      items: [
        { n: 'Belezura', p: '27,70', img: 'belezura', d: 'Pão brioche, hambúrguer 100g, queijo prato, alface americana e maionese da casa.' },
        { n: 'McDoni Burger', p: '27,99', img: 'mcdoni', d: 'Aquele cheeseburger tradicional de rede, com toque caseiro DZE7.' },
        { n: 'Juninhos Bacons', p: '28,90', d: 'Pão brioche, hambúrguer de 100g, cheddar e bacon moído.' },
        { n: 'Juninho', p: '26,90', img: 'juninho', d: 'Pão brioche, hambúrguer 100g e cheddar.' },
        { n: 'Flango de Academia', p: '32,90', d: 'Pão brioche, hambúrguer de frango empanado, queijo prato, maionese da casa e alface.' },
      ]
    },
    porcoes: {
      note: 'Pra dividir, ou não. As batatas acompanham a maionese da casa.',
      items: [
        { n: 'Fritas das Galáxias', p: '54,70', img: 'fritas-galaxias', feat: true, b: [['Pra dividir', '']], d: 'Fritas rústicas, cheddar especial, parmesão, maionese da casa e bacon.' },
        { n: 'Vulcano', p: '51,90', img: 'vulcano', b: [['Explodiu, bum!', 'r']], d: 'Pão brioche recheado com creme de gorgonzola, gratinado com parmesão.' },
        { n: 'Bolinhas Serelepes', p: '41,70', img: 'bolinhas', d: 'Oh trem baum! Pão de queijo recheado com outro queijo cremoso. Duplo queijo.' },
        { n: 'Frango Supremo', p: '56,70', d: 'Tiras de frango crocante com fritas cobertas de cheddar e bacon.' },
        { n: 'Big Onion Rings', p: '41,70', d: 'Anéis de cebola crocantes com toque de cebolinha, barbecue e maionese.' },
        { n: 'Batata canoa rústica', p: '17,70', img: 'batata-canoa', d: 'Individual, com maionese da casa. Grande por R$ 35,00.' },
        { n: 'Batata alho e alecrim', p: '23,70', d: 'Batata rústica temperada com alho e alecrim.' },
        { n: 'Nuggets Clocantes', p: '17,99', d: 'Aquele nuggets crocante, com um toque de cebolinha.' },
        { n: 'Salada DZE7', p: '38,70', img: 'salada', d: 'Pimenta biquinho, cebola roxa, ricota temperada, alface americana e amêndoas laminadas.' },
        { n: 'Molhos da casa', p: '3,99', img: 'molhos', pre: 'a partir de', d: 'Molho extra desenvolvido com a criatividade DZE7.' },
      ]
    },
    combos: {
      note: 'Combos do cardápio digital. Alguns são exclusivos para viagem.',
      items: [
        { n: 'Combo Família', p: '217,00', img: 'combo-familia', feat: true, b: [['4 burgers', '']], d: '4 burgers, fritas, onion rings, refri e mini churros. Acompanha a maionese da casa.' },
        { n: 'Combo 2 por 39,99', p: '39,99', img: 'combo-2', b: [['Promo', 'r']], d: 'Dois lanches entre McDoni, Juninhos Bacons e Juninho.' },
        { n: 'Combo dia de chuva', p: '59,99', img: 'combo-chuva', b: [['Viagem', '']], d: '2 Belezuras, 1 batata e 1 refri lata 350ml.' },
        { n: 'Burger + batata + refri + churros', p: '71,90', img: 'combo-viagem', b: [['Viagem', '']], d: 'Burger à escolha, batata rústica, maionese, refri lata 350ml e mini churros.' },
        { n: 'Kids: Xis Burguinhos', p: '37,90', img: 'kids-burguinho', pre: 'a partir de', d: '2 X-Burguinhos (pão, carne e queijo), batatinha canoa e refri.' },
        { n: 'Kids: Franguitinho', p: '35,90', img: 'kids-frango', pre: 'a partir de', d: 'Filé de frango empanado em tirinhas com batata e refri.' },
      ]
    },
    doces: {
      note: 'Shakes cremosos e docinhos pra fechar a rodada.',
      items: [
        { n: 'Tequila Shakes', p: '29,99', img: 'tequila-shake', feat: true, b: [['+18', 'r']], d: 'Shakes com aquela dose de tequila ouro especial. Ahh, meu amigo, essa é pra beber devagar.' },
        { n: 'Milk Shake', p: '29,99', img: 'milkshake', pre: 'a partir de', d: 'O clássico da casa, com chantilly e calda.' },
        { n: 'Shake torta de limão', p: '35,00', img: 'shake-limao', d: 'Milk shake sabor torta de limão.' },
        { n: 'Shake de morango', p: '35,00', d: 'Milk shake de morango.' },
        { n: 'Nutella Brulé', p: '31,00', d: 'Sanduíche prensado de Nutella com uma camada de caramelo brulé. Sacanagem!' },
        { n: 'Nutella Brulé On Ice', p: '36,99', d: 'O Nutella Brulé com bola de sorvete.' },
        { n: 'Mini churros', p: '16,90', d: '8 mini churros recheados com doce de leite.' },
      ]
    },
    bebidas: {
      note: 'Também tem cervejas especiais: Quinta do Malte, Colorado e Heineken.',
      items: [
        { n: 'Limonada suíça', p: '16,99', img: 'limonada', d: 'Cremosa e saborosa. Limão, leite e leite condensado e mais nada.' },
        { n: 'Soda italiana', p: '15,99', img: 'soda', pre: 'a partir de', d: 'Leve e refrescante, um "refrigerante natural" com essências europeias.' },
        { n: 'Sucos DZE7', p: '14,99', img: 'sucos', pre: 'a partir de', d: 'Batidos com compota da casa, com muita consistência e cremosidade.' },
        { n: 'Quinta do Malte', p: '25,00', pre: 'a partir de', d: 'Cervejaria artesanal com vários estilos.' },
        { n: 'Colorado Appia', p: '23,90', d: 'Cerveja de trigo com mel.' },
        { n: 'Heineken long neck', p: '12,99', d: 'Lager puro malte, 330ml.' },
        { n: 'Refrigerantes', p: '8,70', pre: 'a partir de', d: 'Lata.' },
        { n: 'Água', p: '5,99', pre: 'a partir de', d: 'Com ou sem gás.' },
      ]
    },
  };

  let tab = 'casa';
  const grid = $('[data-menu]'), note = $('[data-menu-note]');
  const src = k => `img/menu/${k}.jpg`;
  function renderMenu() {
    const cat = M[tab];
    note.textContent = cat.note;
    grid.innerHTML = cat.items.map((it, i) => `
      <article class="item${it.feat ? ' feat' : ''}${it.img ? '' : ' noimg'}" style="animation-delay:${i * 40}ms"${it.img ? ` data-peek="${src(it.img)}"` : ''}>
        ${it.img ? `<img class="item-img" src="${src(it.img)}" alt="" loading="lazy">` : ''}
        <div>
          <div class="item-h"><h3 class="item-n">${it.n}${(it.b || []).map(([t, c]) => ` <i class="b ${c}">${t}</i>`).join('')}</h3><span class="item-l"></span><span class="item-p"><small>${it.pre ? it.pre + ' ' : ''}R$</small>${it.p}</span></div>
          <p class="item-d">${it.d}</p>
        </div>
      </article>`).join('');
  }
  function setTab(t) {
    tab = t;
    $$('.menu-tabs button').forEach(x => x.setAttribute('aria-selected', x.dataset.tab === t));
    renderMenu();
  }
  $$('.menu-tabs button').forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));
  $$('[data-goto]').forEach(a => a.addEventListener('click', () => setTab(a.dataset.goto)));
  renderMenu();

  /* ================= peek: foto segue o cursor no cardápio ================= */
  const peek = $('.peek'), peekImg = peek.querySelector('img');
  if (fine) {
    let px = 0, py = 0, qx = 0, qy = 0, on = false;
    grid.addEventListener('pointerover', e => {
      const it = e.target.closest('[data-peek]');
      if (it) { peekImg.src = it.dataset.peek; peek.classList.add('on'); on = true; }
    });
    grid.addEventListener('pointerout', e => {
      const it = e.target.closest('[data-peek]');
      if (it && !it.contains(e.relatedTarget)) { peek.classList.remove('on'); on = false; }
    });
    addEventListener('pointermove', e => { px = e.clientX + 28; py = e.clientY - 80; });
    (function loop() {
      if (on) { qx += (px - qx) * .18; qy += (py - qy) * .18; peek.style.left = Math.min(qx, innerWidth - 240) + 'px'; peek.style.top = qy + 'px'; }
      requestAnimationFrame(loop);
    })();
  }

  /* ================= aberto agora (horário de São Paulo) ================= */
  function isOpen() {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const g = t => parts.find(p => p.type === t).value;
    const d = g('weekday'), h = +g('hour') % 24;
    return d !== 'Mon' && h >= 16 && h < 23;
  }
  function updateOpen() {
    const open = isOpen();
    const el = $('[data-open-now]');
    el.textContent = open ? 'Aberto agora · rodízio rolando' : 'Fechado agora · abre ter a dom, 16h';
    el.className = 'open-now ' + (open ? 'on' : 'off');
    $('[data-open-hud]').textContent = open ? '● Aberto agora · até 23h' : 'Ter → Dom · 16h—23h';
  }
  updateOpen();
  setInterval(updateOpen, 60000);

  /* ================= intro ================= */
  const intro = $('.intro');
  let pct = 0;
  const setP = v => intro.style.setProperty('--p', v);
  const tickIntro = setInterval(() => { pct = Math.min(pct + .12 + Math.random() * .16, .9); setP(pct); }, 160);
  let finished = false;
  const done = () => {
    if (finished) return; finished = true;
    clearInterval(tickIntro); setP(1);
    setTimeout(() => { intro.classList.add('out'); document.body.classList.add('ready'); }, 380);
    setTimeout(() => intro.remove(), 1400);
  };
  if (reduce) { intro.remove(); document.body.classList.add('ready'); }
  else { addEventListener('load', done); setTimeout(done, 2800); }

  /* ================= header / drawer ================= */
  const hdr = $('.hdr');
  const burger = $('.hdr-burger'), drawer = $('.drawer');
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', !open);
  });
  $$('.drawer a').forEach(a => a.addEventListener('click', () => burger.click()));

  /* ================= cursor ================= */
  const cur = $('.cursor');
  if (fine) {
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; });
    (function loop() { cx += (x - cx) * .22; cy += (y - cy) * .22; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', e => cur.classList.toggle('big', !!e.target.closest('a,button,.plate-card,.pola,.ticket')));
  }

  /* ================= scroll: header, hero parallax, estrada do rodízio ================= */
  const road = $('.road'), pin = $('.road-pin'), track = $('.road-track'), heroImg = $('.hero-bg img');
  const roundEl = $('[data-round]'), hungerEl = $('[data-hunger]'), hungerTxt = $('[data-hunger-txt]');
  // a Kombi da estrada é clonada inline para que as rodas possam girar com o scroll
  const sym = $('#kombi'), kombi = $('.kombi');
  kombi.setAttribute('viewBox', sym.getAttribute('viewBox'));
  kombi.innerHTML = sym.innerHTML;
  const wheels = $$('.kombi .wheel'), lane = $('.lane');
  const cards = $$('.plate-card');
  let lastW = innerWidth;
  const stableH = () => fine ? innerHeight : (document.documentElement.clientHeight || innerHeight);
  function sizeRoad() {
    const extra = track.scrollWidth - innerWidth;
    road.style.setProperty('--road-h', (stableH() + Math.max(extra, 0) * 1.1) + 'px');
  }
  function onScroll() {
    const y = scrollY;
    hdr.classList.toggle('solid', y > innerHeight * .6);
    if (!reduce && fine && y < innerHeight) heroImg.parentElement.style.transform = `translateY(${y * .25}px)`;

    const r = road.getBoundingClientRect();
    const max = road.offsetHeight - innerHeight;
    const p = Math.min(Math.max(-r.top / max, 0), 1);
    const dist = p * (track.scrollWidth - innerWidth);
    track.style.transform = `translateX(${-dist}px)`;
    pin.style.setProperty('--rp', p);
    if (!reduce) {
      lane.style.setProperty('--lane', `${-(dist * 1.6) % 130}px`);
      wheels.forEach(w => w.style.setProperty('--wheel', `${dist * 1.4}deg`));
    }
    // rodada atual = último card que já passou pela Kombi
    const kx = innerWidth * .32;
    let n = 0;
    cards.forEach((c, i) => {
      const b = c.getBoundingClientRect();
      if (b.left < kx) n = i + 1;
      // o burger que passa da Kombi é "comido": encolhe e some
      const t = Math.min(Math.max((b.left + b.width / 2 - innerWidth * .12) / (innerWidth * .3), 0), 1);
      c.style.opacity = t;
      c.style.scale = .55 + .45 * t;
    });
    roundEl.textContent = pad(Math.max(n, 1));
    const hunger = Math.round(100 * (1 - n / cards.length));
    hungerEl.style.width = hunger + '%';
    hungerTxt.textContent = hunger === 0 ? 'Missão cumprida' : hunger + '% com fome';
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { if (innerWidth === lastW && !fine) return; lastW = innerWidth; sizeRoad(); onScroll(); });
  addEventListener('load', () => { sizeRoad(); onScroll(); });
  sizeRoad(); onScroll();

  /* ================= reveal ================= */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('seen');
    io.unobserve(e.target);
  }), { threshold: .2 });
  $$('.how .h-xl, .how .lead, .casa .h-xl, .casa .lead, .stories, .events .h-xl, .events .lead, .delivery .deliv-row, .visit-col, .menu-title').forEach(el => { el.setAttribute('data-reveal', ''); io.observe(el); });
  io.observe($('.visit'));

  /* ================= arrastar a estrada com o mouse ================= */
  let drag = null;
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; drag = { x: e.clientX, y: scrollY }; track.style.cursor = 'grabbing'; });
  addEventListener('pointermove', e => { if (!drag) return; scrollTo(0, drag.y - (e.clientX - drag.x) * 1.4); });
  addEventListener('pointerup', () => { drag = null; track.style.cursor = ''; });
  track.addEventListener('dragstart', e => e.preventDefault());
})();
