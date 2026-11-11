/**
 * Site-wide motion. Everything here is progressive enhancement: pages are complete without it,
 * and every effect checks prefers-reduced-motion. Bundled by Astro into one small module.
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;

/* Scroll reveal for [data-reveal], plus one-shot "in" hooks for counters and rings. */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.classList.add('in');
      if (el.dataset.count) countUp(el);
      io.unobserve(el);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
);
document.querySelectorAll('[data-reveal], [data-count], .ring').forEach((el) => io.observe(el));

/* Animated counters: <strong data-count="1852" data-suffix="">. Text is already correct without JS. */
function countUp(el: HTMLElement) {
  if (reduce) return;
  const target = Number(el.dataset.count);
  const fmt = new Intl.NumberFormat('en-US');
  const prefix = el.dataset.prefix ?? '';
  const suffix = el.dataset.suffix ?? '';
  const t0 = performance.now();
  const dur = 1600;
  const tick = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = prefix + fmt.format(Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* Card spotlight: CSS vars follow the cursor. */
if (fine && !reduce) {
  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
  });

  /* Magnetic buttons */
  document.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
    });
    b.addEventListener('pointerleave', () => (b.style.transform = ''));
  });
}

/* Rotating word in the hero headline. */
const rot = document.querySelector<HTMLElement>('.rotator');
if (rot && !reduce) {
  const words = [...rot.children] as HTMLElement[];
  let i = 0;
  setInterval(() => {
    const cur = words[i];
    i = (i + 1) % words.length;
    cur.classList.replace('on', 'off');
    words[i].classList.remove('off');
    words[i].classList.add('on');
    setTimeout(() => cur.classList.remove('off'), 700);
  }, 2400);
}

/* Timeline line fills as you scroll through it. */
const tl = document.querySelector<HTMLElement>('.timeline');
if (tl && !reduce) {
  const update = () => {
    const r = tl.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (innerHeight * 0.7 - r.top) / r.height));
    tl.style.setProperty('--fill', `${p * 100}%`);
  };
  update();
  addEventListener('scroll', update, { passive: true });
}

/* Projects filter with a short fade. */
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
buttons.forEach((b) =>
  b.addEventListener('click', () => {
    const f = b.dataset.filter ?? '';
    buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    document.querySelectorAll<HTMLElement>('[data-filterable] > li').forEach((li) => {
      const show = !f || (li.dataset.category ?? '').split('|').includes(f);
      li.hidden = !show;
    });
    document.querySelectorAll<HTMLElement>('[data-group]').forEach((g) => {
      g.hidden = ![...g.querySelectorAll<HTMLElement>('[data-filterable] > li')].some((li) => !li.hidden);
    });
  }),
);

/* Theme toggle: saves the choice and, where supported, reveals the new theme as a circle from the button. */
const toggle = document.querySelector<HTMLButtonElement>('.theme-toggle');
if (toggle) {
  const root = document.documentElement;
  const label = () => toggle.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} theme`);
  label();
  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch { /* private mode: theme just won't persist */ }
      label();
    };
    const vt = (document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } }).startViewTransition;
    if (!vt || reduce) return apply();
    const r = toggle.getBoundingClientRect();
    root.style.setProperty('--tx', `${r.left + r.width / 2}px`);
    root.style.setProperty('--ty', `${r.top + r.height / 2}px`);
    root.classList.add('theme-switching');
    vt.call(document, apply).finished.finally(() => root.classList.remove('theme-switching'));
  });
}

/* Floating header gets a stronger backdrop once the page is scrolled. */
const header = document.querySelector<HTMLElement>('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile burger menu: toggles the panel, locks page scroll, closes on Esc or link tap. */
const menuBtn = document.querySelector<HTMLButtonElement>('.menu-toggle');
const menu = document.getElementById('mobile-menu');
if (menuBtn && menu) {
  const set = (open: boolean) => {
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('menu-open', open);
  };
  menuBtn.addEventListener('click', () => set(menu.hidden));
  menu.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) set(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); menuBtn.focus(); } });
  matchMedia('(min-width: 761px)').addEventListener('change', (e) => e.matches && set(false));
}
