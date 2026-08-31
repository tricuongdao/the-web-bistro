import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './components/HomePage.jsx';
import MenuPage from './components/MenuPage.jsx';
import WorkPage from './components/WorkPage.jsx';
import BookPage from './components/BookPage.jsx';
import { I18N, TICKET, TICKET_VI, COPY, BUILD_URL, PAGE_TITLES } from './i18n.js';

const T_URL = BUILD_URL.length;
const T_BLOCKS = T_URL + 4;
const T_METRIC = T_BLOCKS + 32;
const T_END = T_METRIC + 24 + 34;

// Path routing: / , /menu , /work , /book — real URLs, deep links and the
// browser back/forward buttons work with no router dependency. Old #/ links
// still resolve: they are redirected to the clean path on load.
const PAGE_OF_PATH = { '/': 'home', '/home': 'home', '/menu': 'menu', '/work': 'work', '/book': 'book' };
const PATH_OF_PAGE = { home: '/', menu: '/menu', work: '/work', book: '/book' };

const readPage = () => {
  if (typeof window === 'undefined') return 'home';
  // Legacy hash URL (e.g. #/menu from an old link) takes priority and is
  // cleaned up to the matching path.
  if (window.location.hash) {
    const hashPage = PAGE_OF_PATH[window.location.hash.replace(/^#/, '').replace(/\/+$/, '') || '/'];
    if (hashPage) {
      window.history.replaceState(null, '', PATH_OF_PAGE[hashPage]);
      return hashPage;
    }
  }
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return PAGE_OF_PATH[path] ?? 'home';
};

export default function App() {
  const [page, setPage] = useState(readPage);
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    try { return window.localStorage.getItem('wb-lang') === 'vi' ? 'vi' : 'en'; } catch { return 'en'; }
  });
  const [t, setT] = useState(0);
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);

  // Language side-effects: <html lang> for screen readers, serif swap, persistence
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle('lang-vi', lang === 'vi');
    try { window.localStorage.setItem('wb-lang', lang); } catch { /* storage blocked */ }
  }, [lang]);

  // Hero browser-mockup build loop (55ms ticks, same timeline as the design).
  // Home page only and paused in hidden tabs — otherwise the whole app
  // re-renders ~18x/second for an animation nobody can see.
  useEffect(() => {
    if (page !== 'home') return;
    const h = setInterval(() => {
      if (!document.hidden) setT((v) => (v > T_END ? 0 : v + 1));
    }, 55);
    return () => clearInterval(h);
  }, [page]);

  // Keep `page` in sync when the visitor uses back/forward
  useEffect(() => {
    const onPop = () => setPage(readPage());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Intercept clicks on internal route links ("/", "/menu", …) and swap the
  // page via pushState instead of a full document reload. External links,
  // modified clicks (new tab), and mailto: anchors keep their default behaviour.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href') ?? '';
      const path = href.replace(/\/+$/, '') || '/';
      if (!PAGE_OF_PATH[path]) return;
      e.preventDefault();
      if (path === (window.location.pathname.replace(/\/+$/, '') || '/')) return;
      window.history.pushState(null, '', path);
      setPage(readPage());
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Kitchen-ticket typewriter (30ms/char, 420ms line pause, 3.4s loop reset, 500ms start delay).
  // Reads the displayed language's ticket through a ref so the line math always
  // matches what is on screen, even if the language is toggled mid-type.
  const linesRef = useRef(lang === 'vi' ? TICKET_VI : TICKET);
  useEffect(() => {
    linesRef.current = lang === 'vi' ? TICKET_VI : TICKET;
  }, [lang]);
  useEffect(() => {
    let alive = true;
    let tm;
    const step = (l, c) => {
      if (!alive) return;
      const LINES = linesRef.current;
      if (l >= LINES.length) {
        tm = setTimeout(() => {
          if (!alive) return;
          setLi(0);
          setCi(0);
          step(0, 0);
        }, 3400);
      } else if (c >= LINES[l].length) {
        tm = setTimeout(() => {
          if (!alive) return;
          setLi(l + 1);
          setCi(0);
          step(l + 1, 0);
        }, 420);
      } else {
        tm = setTimeout(() => {
          if (!alive) return;
          setCi(c + 1);
          step(l, c + 1);
        }, 30);
      }
    };
    tm = setTimeout(() => step(0, 0), 500);
    return () => {
      alive = false;
      clearTimeout(tm);
    };
  }, []);

  // Scroll-reveal for [data-reveal] nodes, re-run on every page change (as in the design).
  // data-reveal="tilt" nodes (the three specials cards) enter rotated and scaled.
  useLayoutEffect(() => {
    document.title = PAGE_TITLES[page] ?? PAGE_TITLES.home;
    window.scrollTo(0, 0);
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
    const from = (n) =>
      n.getAttribute('data-reveal') === 'tilt'
        ? 'translateY(30px) rotate(-1.4deg) scale(.975)'
        : 'translateY(22px)';
    nodes.forEach((n) => {
      n.style.opacity = '0';
      n.style.transform = from(n);
      n.style.transition = 'opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)';
    });
    const stagger = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = nodes.indexOf(e.target);
          stagger.push(setTimeout(() => {
            e.target.style.opacity = '1';
            e.target.style.transform = 'none';
          }, Math.max(0, i % 3) * 90));
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    const fallback = setTimeout(() => {
      nodes.forEach((n) => {
        n.style.opacity = '1';
        n.style.transform = 'none';
      });
    }, 1600);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
      stagger.forEach(clearTimeout);
    };
  }, [page]);

  // Page-change sweep: the dark panel with an awning stripe wipes across the
  // screen on every navigation, as in the design's go() -> sweep().
  const firstPage = useRef(true);
  useLayoutEffect(() => {
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }
    const el = document.createElement('div');
    el.style.cssText =
      'position:fixed; inset:0; z-index:400; pointer-events:none; background:#10322F; transform:translateX(-101%); transition:transform .40s cubic-bezier(.55,0,.2,1);';
    const stripe = document.createElement('div');
    stripe.style.cssText =
      'position:absolute; left:0; right:0; top:0; height:6px; background:repeating-linear-gradient(90deg,#E0A93B 0 28px,#F6EFE2 28px 56px);';
    el.appendChild(stripe);
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = 'translateX(0)';
    });
    const t1 = setTimeout(() => {
      el.style.transform = 'translateX(101%)';
    }, 460);
    const t2 = setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 940);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, [page]);

  // Parallax for [data-para] nodes (browser mockup, pass-board glow, cloche scene) —
  // same math as the design's parallax(): offset scales with distance from viewport centre.
  useEffect(() => {
    let raf = 0;
    let paraNodes = null;
    const parallax = () => {
      raf = 0;
      if (!paraNodes) paraNodes = Array.from(document.querySelectorAll('[data-para]'));
      const vh = window.innerHeight || 800;
      paraNodes.forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const d = (r.top + r.height / 2 - vh / 2) / vh;
        n.style.transform = `translate3d(0, ${(d * parseFloat(n.getAttribute('data-para'))).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(parallax);
    };
    parallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [page]);

  // Derived hero/ticket values (identical math to the design's renderVals)
  const c = COPY[lang];
  const url = BUILD_URL.slice(0, Math.min(t, T_URL));
  const blk = (n) => (t > T_BLOCKS + n * 5 ? '1' : '0');
  const o = [blk(0), blk(1), blk(2), blk(3), blk(4), blk(5)];
  const p = Math.max(0, Math.min(1, (t - T_METRIC) / 24));
  const score = Math.round(100 * p);
  const secs = (2.4 - 1.8 * p).toFixed(1);
  const buildStatus = p >= 1 ? c.served : t > T_BLOCKS ? c.plating : c.firing;
  const LINES = lang === 'vi' ? TICKET_VI : TICKET;
  const ticket = LINES.slice(0, li).concat(li < LINES.length ? [LINES[li].slice(0, ci)] : []);
  const ticketStatus = li >= LINES.length ? c.done : c.firing;

  const tr = (s) => (lang === 'vi' ? I18N[s] ?? s : s);

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        background: '#F6EFE2',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Header t={tr} langLabel={c.lang} onToggleLang={() => setLang(lang === 'en' ? 'vi' : 'en')} />
      {page === 'home' && (
        <HomePage
          t={tr}
          lang={lang}
          url={url}
          o={o}
          score={score}
          secs={secs}
          perfLabel={c.perf}
          paintLabel={c.paint}
          buildStatus={buildStatus}
          ticket={ticket}
          ticketStatus={ticketStatus}
        />
      )}
      {page === 'menu' && <MenuPage t={tr} />}
      {page === 'work' && <WorkPage t={tr} />}
      {page === 'book' && <BookPage t={tr} lang={lang} />}
      <Footer t={tr} />
    </div>
  );
}
