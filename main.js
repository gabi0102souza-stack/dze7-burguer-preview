(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = !/[?&]motion=1/.test(location.search) && matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    movePill();
    renderMenu();
  }
  const tabs = $('.menu-tabs'), pill = document.createElement('span');
  pill.className = 'tab-pill'; tabs.prepend(pill);
  function movePill() {
    const on = $('.menu-tabs button[aria-selected="true"]');
    pill.style.width = on.offsetWidth + 'px'; pill.style.height = on.offsetHeight + 'px';
    pill.style.transform = `translate(${on.offsetLeft}px,${on.offsetTop}px)`;
  }
  addEventListener('resize', movePill);
  document.fonts && document.fonts.ready.then(movePill);
  movePill();
  $$('.menu-tabs button').forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));
  $$('[data-goto]').forEach(a => a.addEventListener('click', () => setTab(a.dataset.goto)));
  renderMenu();

  /* ================= peek: foto segue o cursor no cardápio ================= */
  const peek = $('.peek'), peekImg = peek.querySelector('img');
  let mx = innerWidth / 2, my = innerHeight / 2;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  let peekOn = false, qx = 0, qy = 0;
  if (fine) {
    grid.addEventListener('pointerover', e => {
      const it = e.target.closest('[data-peek]');
      if (it) { peekImg.src = it.dataset.peek; peek.classList.add('on'); peekOn = true; }
    });
    grid.addEventListener('pointerout', e => {
      const it = e.target.closest('[data-peek]');
      if (it && !it.contains(e.relatedTarget)) { peek.classList.remove('on'); peekOn = false; }
    });
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
    $('[data-open-hud]').textContent = open ? 'Aberto agora · até 23h' : 'Fechado · ter a dom 16h—23h';
    $('.chip.live').classList.toggle('off', !open);
  }
  updateOpen();
  setInterval(updateOpen, 60000);

  /* ================= split de palavras nos títulos ================= */
  function split(el) {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(w => {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.append(' '); return; }
            const o = document.createElement('span'), s = document.createElement('span');
            o.className = 'sw'; s.textContent = w; s.style.setProperty('--i', i++);
            o.append(s); frag.append(o);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  }
  const titles = $$('.h-xl, .h-lg, .menu-title, .marker.big');
  if (!reduce) titles.forEach(split);

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
    setTimeout(() => intro.remove(), 1500);
  };
  if (reduce) { intro.remove(); document.body.classList.add('ready'); }
  else { addEventListener('load', done); setTimeout(done, 2800); }

  /* ================= smooth scroll (Lenis) ================= */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: .085, wheelMultiplier: 1, smoothWheel: true });
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const target = id === '#top' ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.6 });
    }));
  }
  const goTo = y => lenis ? lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y);

  /* ================= header / drawer ================= */
  const hdr = $('.hdr');
  const burger = $('.hdr-burger'), drawer = $('.drawer');
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', !open);
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  $$('.drawer a').forEach(a => a.addEventListener('click', () => burger.click()));

  /* ================= cursor + botões magnéticos ================= */
  const cur = $('.cursor');
  let cx = mx, cy = my;
  if (fine) document.addEventListener('pointerover', e => cur.classList.toggle('big', !!e.target.closest('a,button,.plate-card,.pola,.ticket,.bx')));
  if (fine && !reduce) {
    $$('.btn, .hdr-cta, .deliv i').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * .25}px ${(e.clientY - r.top - r.height / 2) * .35}px`;
      });
      b.addEventListener('pointerleave', () => { b.style.transition += ',translate .5s cubic-bezier(.16,1,.3,1)'; b.style.translate = '0 0'; setTimeout(() => b.style.transition = '', 500); });
    });
  }

  /* ================= estrada do rodízio ================= */
  const road = $('.road'), pin = $('.road-pin'), track = $('.road-track');
  const roundEl = $('[data-round]'), hungerEl = $('[data-hunger]'), hungerTxt = $('[data-hunger-txt]');
  // a Kombi da estrada é clonada inline para que as rodas possam girar com o scroll
  const sym = $('#kombi'), kombi = $('.kombi'), kwrap = $('.kombi-wrap');
  kombi.setAttribute('viewBox', sym.getAttribute('viewBox'));
  kombi.innerHTML = sym.innerHTML;
  const wheels = $$('.kombi .wheel'), lane = $('.lane'), sun = $('.road-sun');
  const far = $('.road-far'), mid = $('.road-mid');
  const cards = $$('.plate-card');
  const stableH = () => fine ? innerHeight : (document.documentElement.clientHeight || innerHeight);
  function sizeRoad() {
    const extra = track.scrollWidth - innerWidth;
    road.style.setProperty('--road-h', (stableH() + Math.max(extra, 0) * 1.15) + 'px');
  }
  let lastW = innerWidth;
  addEventListener('resize', () => { if (innerWidth === lastW && !fine) return; lastW = innerWidth; sizeRoad(); });
  addEventListener('load', sizeRoad);
  sizeRoad();

  /* ================= elementos com parallax ================= */
  const heroBg = $('.hero-bg'), heroIn = $('.hero-in'), heroSign = $('.hero-sign');
  const tickerTrack = $('.ticker-track'), ticker = $('.ticker');
  const trip = $('.trip');
  const par = [
    ...$$('.pola').map((el, i) => ({ el, s: [.08, -.06, .1, -.04][i] })),
    { el: $('.events-media img'), s: -.12, img: true },
    { el: $('.ticket-ic'), s: .1 }, { el: $$('.ticket-ic')[1], s: .14 },
  ];

  /* ================= loop principal ================= */
  let sy = scrollY, vel = 0, rp = 0, tickX = 0, lastRound = -1, lastT = performance.now();
  function frame(t) {
    const dt = Math.min((t - lastT) / 16.7, 3); lastT = t;
    if (lenis) lenis.raf(t);
    const y = scrollY, vh = innerHeight;
    vel += ((y - sy) - vel) * .18; sy = y;

    // header some ao descer rápido, volta ao subir
    hdr.classList.toggle('solid', y > vh * .5);
    hdr.classList.toggle('hide', y > vh && vel > 2 && !drawer.classList.contains('open'));
    trip.style.setProperty('--trip', y / Math.max(document.documentElement.scrollHeight - vh, 1));

    // cursor
    if (fine) { cx += (mx - cx) * .2; cy += (my - cy) * .2; cur.style.transform = `translate(${cx}px,${cy}px)`; }
    if (peekOn) { qx += (mx + 30 - qx) * .16; qy += (my - 90 - qy) * .16; peek.style.left = Math.min(qx, innerWidth - 250) + 'px'; peek.style.top = qy + 'px'; }

    if (!reduce) {
      // hero: zoom + deslocamento no scroll, leve parallax no mouse
      if (y < vh * 1.2) {
        const k = y / vh, ox = (mx / innerWidth - .5), oy = (my / vh - .5);
        heroBg.style.transform = `translate3d(${ox * -18}px,${y * .3 + oy * -12}px,0) scale(${1.04 + k * .12})`;
        heroIn.style.transform = `translate3d(0,${y * -.18}px,0)`;
        heroIn.style.opacity = Math.max(1 - k * 1.3, 0);
        heroSign.style.transform = `translate3d(${ox * 22}px,${y * -.35}px,0) rotate(${Math.max(Math.min(-vel * .6, 18), -18)}deg)`;
      }
      // ticker reage à velocidade
      tickX -= (0.6 + Math.abs(vel) * .25) * dt;
      const half = tickerTrack.scrollWidth / 2;
      if (-tickX > half) tickX += half;
      tickerTrack.style.transform = `translate3d(${tickX}px,0,0)`;
      ticker.style.setProperty('--sk', `${Math.max(Math.min(vel * -.5, 12), -12)}deg`);

      // parallax genérico
      par.forEach(({ el, s, img }) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const off = (r.top + r.height / 2 - vh / 2) * s;
        if (img) el.style.transform = `translate3d(0,${off - 40}px,0)`; else el.style.translate = `0 ${off}px`;
      });
    } else {
      tickerTrack.style.transform = 'none';
    }

    // estrada
    const rr = road.getBoundingClientRect();
    if (rr.bottom > 0 && rr.top < vh) {
      const max = road.offsetHeight - vh;
      const p = Math.min(Math.max(-rr.top / max, 0), 1);
      rp += (p - rp) * (reduce ? 1 : .14);
      const dist = rp * (track.scrollWidth - innerWidth);
      track.style.transform = `translate3d(${-dist}px,0,0)`;
      pin.style.setProperty('--night', Math.min(Math.max((rp - .25) / .6, 0), 1).toFixed(3));
      if (!reduce) {
        far.style.transform = `translate3d(${-(dist * .12) % 600}px,0,0)`;
        mid.style.transform = `translate3d(${-(dist * .35) % 600}px,0,0)`;
        sun.style.transform = `translate3d(${-rp * 14}vw,${rp * 22}vh,0)`;
        lane.style.setProperty('--lane', `${-(dist * 1.6) % 130}px`);
        wheels.forEach(w => w.style.setProperty('--wheel', `${dist * 1.4}deg`));
        const tilt = Math.max(Math.min((p - rp) * -120, 5), -5);
        kwrap.style.transform = `rotate(${tilt}deg) translateY(${Math.sin(t / 90) * (Math.abs(p - rp) > .001 ? 2 : .8)}px)`;
      }
      const kx = kwrap.getBoundingClientRect().right;
      let n = 0;
      cards.forEach((c, i) => {
        const b = c.getBoundingClientRect();
        if (b.left + b.width / 2 < kx) n = i + 1;
        // o burger que passa pela Kombi é "comido": encolhe, gira e some
        const tt = Math.min(Math.max((b.left + b.width / 2 - kx * .75) / (innerWidth * .28), 0), 1);
        const sw = reduce ? 0 : Math.sin(t / 700 + i) * 1.6;
        c.style.opacity = tt;
        c.style.transform = `translate3d(0,${(1 - tt) * 40}px,0) rotate(${(i % 2 ? 2 : -2.5) + sw - (1 - tt) * 18}deg) scale(${.5 + .5 * tt})`;
      });
      if (n !== lastRound) {
        lastRound = n;
        roundEl.textContent = pad(Math.max(n, 1));
        const hunger = Math.round(100 * (1 - n / cards.length));
        hungerEl.style.width = Math.max(hunger, 2) + '%';
        hungerTxt.textContent = hunger === 0 ? 'Missão cumprida' : hunger + '% com fome';
        if (!reduce && n > 0) roundEl.animate([{ transform: 'scale(1.35)', color: '#8cff3a' }, { transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.16,1,.3,1)' });
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ================= reveal ================= */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('seen');
    io.unobserve(e.target);
  }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  titles.forEach(el => io.observe(el));
  $$('.lead, .how-grid, .bento .bx, .stories, .deliv-row, .visit-col, .menu-tabs, .events-copy .btn').forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    if (el.matches('.bx')) el.style.transitionDelay = (i % 4) * 90 + 'ms';
    io.observe(el);
  });
  $$('.pola img, .events-media img').forEach(img => { img.classList.add('rv-img'); io.observe(img.closest('figure,.events-media')); });
  io.observe($('.visit'));

  /* ================= arrastar a estrada com o mouse ================= */
  let drag = null;
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; drag = { x: e.clientX, y: scrollY }; track.style.cursor = 'grabbing'; });
  addEventListener('pointermove', e => { if (!drag) return; goTo(drag.y - (e.clientX - drag.x) * 1.6); });
  addEventListener('pointerup', () => { drag = null; track.style.cursor = ''; });
  track.addEventListener('dragstart', e => e.preventDefault());
})();
