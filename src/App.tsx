/**
 * ============================================================================
 *  BLUE STAR PLASTIC INDUSTRIES — Landing Page #4 : GRC COLUMNS
 * ----------------------------------------------------------------------------
 *  1. Header + Greek-key meander band
 *  2. Hero — self-drawing Corinthian column elevation with annotations
 *  3. Spec ticker
 *  4. The Six Orders — Corinthian / Ionic / Doric / Tuscan / Roman / Composite,
 *     each drawn as a genuine stylised SVG elevation with its classical canon
 *  5. Split-shell anatomy — interactive exploded drawing (hover-synced legend)
 *  6. Cinematic photo band
 *  7. Why GRC — comparison vs stone / plaster / timber
 *  8. Stats band (animated counters)
 *  9. Process — mould-to-portico, sticky workshop photo
 * 10. Quote form (validated, with success state)
 * 11. Footer — email, phone, copyright
 * ============================================================================
 */
import { useEffect, useRef, useState } from "react";
import type { ReactNode, FormEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const PHONE_DISPLAY = "+91 91520 91020";
const PHONE_TEL = "tel:+919152091020";
const EMAIL = "sales@bluestarplastic.in";
const ADDRESS = "Plot 42, MIDC Industrial Area, Taloja, Navi Mumbai — 410208";

const VILLA_IMG =
  "https://image.qwenlm.ai/generated-images/355d1d94-bbd7-4595-93fa-89b37b319a9f/_result.png";
const WORKSHOP_IMG =
  "https://image.qwenlm.ai/generated-images/2b176097-f5d6-43f5-9e81-851ca96f5ef3/_result.png";

const NAV_LINKS = [
  { label: "Orders", href: "#orders" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Why GRC", href: "#why-grc" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#quote" },
];

const TICKER_ITEMS = [
  "SIX CLASSICAL ORDERS",
  "SPLIT-SHELL CASTING",
  "GALVANIZED STEEL CORE",
  "FLUTED OR PLAIN SHAFTS",
  "HEIGHTS TO 6 METRES",
  "ENTASIS TURNED TO CANON",
  "PAINT-READY OR POLISHED FINISH",
];

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */
function StarMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

function PinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4 12.5 5.5 5.5L20 6.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Motion helpers                                                     */
/* ------------------------------------------------------------------ */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${inView ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function CountUp({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/** Stroke path that draws itself in when `inView` flips true. */
function Draw({
  d,
  inView,
  delay = 0,
  w = 2,
}: {
  d: string;
  inView: boolean;
  delay?: number;
  w?: number;
}) {
  return (
    <path
      d={d}
      pathLength={1}
      strokeWidth={w}
      fill="none"
      className="profile-line"
      style={{ strokeDashoffset: inView ? 0 : 1, transitionDelay: `${delay}ms` }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Column-drawing primitives (shared by hero + order cards)           */
/* ------------------------------------------------------------------ */

/** Ionic-style spiral volute built from shrinking half-circle arcs. */
function Volute({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const d = `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r * 0.62} ${r * 0.62} 0 1 1 ${cx - r * 0.28} ${cy} A ${r * 0.28} ${r * 0.28} 0 1 1 ${cx + r * 0.14} ${cy}`;
  return <path d={d} fill="none" strokeWidth="1.8" />;
}

/** A row of stylised acanthus leaves (lens shapes with midribs). */
function LeafRow({ y, x0, x1, n, h }: { y: number; x0: number; x1: number; n: number; h: number }) {
  const w = (x1 - x0) / n;
  return (
    <g fill="none" strokeWidth="1.4">
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + i * w;
        return (
          <g key={i}>
            <path d={`M${x} ${y} Q${x + w / 2} ${y - h} ${x + w} ${y} Q${x + w / 2} ${y - h * 0.45} ${x} ${y} Z`} />
            <line x1={x + w / 2} y1={y - 2} x2={x + w / 2} y2={y - h * 0.7} />
          </g>
        );
      })}
    </g>
  );
}

/** Vertical flutes between a tapered top and bottom edge. */
function Flutes({ xTL, xTR, xBL, xBR, yTop, yBot, n }: { xTL: number; xTR: number; xBL: number; xBR: number; yTop: number; yBot: number; n: number }) {
  return (
    <g strokeWidth="1">
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 1) / (n + 1);
        return <line key={i} x1={xTL + t * (xTR - xTL)} y1={yTop} x2={xBL + t * (xBR - xBL)} y2={yBot} />;
      })}
    </g>
  );
}

/** Convex torus moulding between yTop and yBot. */
function Torus({ x0, x1, yTop, yBot }: { x0: number; x1: number; yTop: number; yBot: number }) {
  const mid = (yTop + yBot) / 2;
  const o = 9; // outward bulge
  return (
    <path
      d={`M ${x0} ${yBot} C ${x0 - o} ${mid + 2} ${x0 - o} ${mid - 2} ${x0 + 2} ${yTop} L ${x1 - 2} ${yTop} C ${x1 + o} ${mid - 2} ${x1 + o} ${mid + 2} ${x1} ${yBot} Z`}
      fill="none"
      strokeWidth="1.8"
    />
  );
}

/** Concave scotia moulding between yTop and yBot. */
function Scotia({ x0, x1, yTop, yBot }: { x0: number; x1: number; yTop: number; yBot: number }) {
  const mid = (yTop + yBot) / 2;
  return (
    <path
      d={`M ${x0} ${yTop} C ${x0 + 11} ${mid - 1} ${x0 + 11} ${mid + 1} ${x0 + 3} ${yBot} L ${x1 - 3} ${yBot} C ${x1 - 11} ${mid + 1} ${x1 - 11} ${mid - 1} ${x1} ${yTop} Z`}
      fill="none"
      strokeWidth="1.6"
    />
  );
}

/** Classic base stack: torus / scotia / torus / plinth. */
function BaseStack({ x0, x1 }: { x0: number; x1: number }) {
  return (
    <g>
      <Torus x0={x0 + 2} x1={x1 - 2} yTop={306} yBot={318} />
      <Scotia x0={x0 + 6} x1={x1 - 6} yTop={318} yBot={331} />
      <Torus x0={x0} x1={x1} yTop={331} yBot={347} />
      <rect x={x0 - 6} y={347} width={x1 - x0 + 12} height={25} fill="none" strokeWidth="2" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  The six order elevations                                           */
/* ------------------------------------------------------------------ */
type OrderId = "corinthian" | "ionic" | "doric" | "tuscan" | "roman" | "composite";

function OrderDrawing({ order }: { order: OrderId }) {
  const gridId = `ogrid-${order}`;
  return (
    <svg
      viewBox="0 0 200 400"
      role="img"
      aria-label={`${order} order — elevation drawing`}
      className="w-full fill-none text-navy-800 transition-colors duration-500 group-hover:text-accent-400"
    >
      <defs>
        <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" stroke="currentColor" strokeOpacity="0.13" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="200" height="400" fill={`url(#${gridId})`} />
      {/* ground line + centreline */}
      <line x1="28" y1="372" x2="172" y2="372" stroke="currentColor" strokeWidth="2.2" />
      <line x1="100" y1="44" x2="100" y2="372" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.8" strokeDasharray="4 5" />

      {order === "doric" && (
        <g fill="none" strokeWidth="2" strokeLinejoin="round">
          <rect x="52" y="88" width="96" height="14" />
          <path d="M64 120 C 58 112 56 106 52 102 L148 102 C 144 106 142 112 136 120 Z" />
          <line x1="66" y1="125" x2="134" y2="125" strokeWidth="1.2" />
          <path d="M66 130 C 60 220 58 290 58 356 M134 130 C 140 220 142 290 142 356" />
          <line x1="58" y1="356" x2="142" y2="356" />
          <rect x="50" y="356" width="100" height="16" strokeWidth="1.6" />
          <Flutes xTL={69} xTR={131} xBL={61} xBR={139} yTop={134} yBot={352} n={9} />
        </g>
      )}

      {order === "tuscan" && (
        <g fill="none" strokeWidth="2" strokeLinejoin="round">
          <rect x="58" y="92" width="84" height="12" />
          <path d="M68 122 C 64 114 62 110 58 104 L142 104 C 138 110 136 114 132 122 Z" />
          <line x1="68" y1="126" x2="132" y2="126" strokeWidth="1.2" />
          <line x1="68" y1="130" x2="132" y2="130" strokeWidth="1.2" />
          <path d="M68 130 C 62 210 60 280 60 334 M132 130 C 138 210 140 280 140 334" />
          <Torus x0={56} x1={144} yTop={334} yBot={350} />
          <rect x="48" y="350" width="104" height="22" />
        </g>
      )}

      {order === "ionic" && (
        <g fill="none" strokeWidth="2" strokeLinejoin="round">
          <rect x="58" y="84" width="84" height="10" />
          <Volute cx={70} cy={108} r={13} />
          <Volute cx={130} cy={108} r={13} />
          {/* egg-and-dart echinus */}
          <g strokeWidth="1.2">
            <line x1="80" y1="118" x2="120" y2="118" />
            <ellipse cx="86" cy="124" rx="2.6" ry="4" />
            <ellipse cx="95.3" cy="124" rx="2.6" ry="4" />
            <ellipse cx="104.7" cy="124" rx="2.6" ry="4" />
            <ellipse cx="114" cy="124" rx="2.6" ry="4" />
            <line x1="80" y1="130" x2="120" y2="130" />
          </g>
          <line x1="72" y1="135" x2="128" y2="135" strokeWidth="1.2" />
          <path d="M70 140 C 64 210 62 260 62 306 M130 140 C 136 210 138 260 138 306" />
          <Flutes xTL={72} xTR={128} xBL={64} xBR={136} yTop={144} yBot={302} n={9} />
          <BaseStack x0={58} x1={142} />
        </g>
      )}

      {order === "corinthian" && (
        <g fill="none" strokeWidth="2" strokeLinejoin="round">
          <path d="M64 88 L136 88 C 134 95 132 100 130 103 L70 103 C 68 100 66 95 64 88 Z" />
          <circle cx="100" cy="96" r="2.4" strokeWidth="1.2" />
          <Volute cx={72} cy={112} r={8} />
          <Volute cx={128} cy={112} r={8} />
          <LeafRow y={134} x0={72} x1={128} n={4} h={16} />
          <LeafRow y={152} x0={68} x1={132} n={4} h={22} />
          <line x1="70" y1="155" x2="130" y2="155" strokeWidth="1.2" />
          <path d="M70 158 C 64 215 62 262 62 306 M130 158 C 136 215 138 262 138 306" />
          <Flutes xTL={72} xTR={128} xBL={64} xBR={136} yTop={162} yBot={302} n={9} />
          <BaseStack x0={58} x1={142} />
        </g>
      )}

      {order === "roman" && (
        <g fill="none" strokeWidth="2" strokeLinejoin="round">
          <rect x="56" y="88" width="88" height="13" />
          <path d="M66 124 C 60 118 58 112 56 101 L144 101 C 142 112 140 118 134 124 Z" />
          {/* beaded moulding row */}
          <g strokeWidth="1.2">
            {[72, 81, 90, 99, 108, 117, 126].map((x) => (
              <circle key={x} cx={x} cy={112} r="2.2" />
            ))}
          </g>
          <line x1="68" y1="128" x2="132" y2="128" strokeWidth="1.2" />
          <path d="M68 136 C 62 220 60 280 60 336 M132 136 C 138 220 140 280 140 336" />
          <Flutes xTL={70} xTR={130} xBL={62} xBR={138} yTop={140} yBot={332} n={11} />
          <Torus x0={54} x1={146} yTop={336} yBot={352} />
          <rect x="46" y="352" width="108" height="20" />
        </g>
      )}

      {order === "composite" && (
        <g fill="none" strokeWidth="2" strokeLinejoin="round">
          <path d="M64 86 L136 86 C 134 93 132 98 130 101 L70 101 C 68 98 66 93 64 86 Z" />
          <circle cx="100" cy="94" r="2.4" strokeWidth="1.2" />
          <Volute cx={68} cy={114} r={14} />
          <Volute cx={132} cy={114} r={14} />
          <LeafRow y={136} x0={74} x1={126} n={4} h={15} />
          <LeafRow y={154} x0={70} x1={130} n={4} h={20} />
          <line x1="70" y1="157" x2="130" y2="157" strokeWidth="1.2" />
          <path d="M70 160 C 64 215 62 262 62 306 M130 160 C 136 215 138 262 138 306" />
          <Flutes xTL={72} xTR={128} xBL={64} xBR={136} yTop={164} yBot={302} n={9} />
          <BaseStack x0={58} x1={142} />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Header + Greek-key band                                         */
/* ------------------------------------------------------------------ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        light ? "bg-navy-950 shadow-lg shadow-navy-950/30" : "bg-paper/95"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Blue Star Plastic Industries — home">
          <StarMark className="h-7 w-7 text-accent-500 transition-transform duration-300 group-hover:rotate-45" />
          <span className="leading-none">
            <span className={`block font-display text-[22px] tracking-[0.06em] ${light ? "text-white" : "text-navy-900"}`}>
              BLUE STAR
            </span>
            <span className="mt-0.5 block font-mono text-[8.5px] tracking-[0.34em] text-accent-600">
              PLASTIC INDUSTRIES
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-underline font-mono text-[11px] tracking-[0.18em] transition-colors ${
                light ? "text-navy-100 hover:text-white" : "text-navy-700 hover:text-navy-950"
              }`}
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-1.5 bg-accent-500 px-3 py-2.5 text-xs font-semibold text-navy-950 transition-all duration-200 hover:bg-accent-400 hover:shadow-[0_0_0_3px_rgba(245,168,28,0.25)] sm:gap-2 sm:px-4 sm:text-[13px]"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="whitespace-nowrap">
              <span className="hidden sm:inline">Call:&nbsp;</span>
              {PHONE_DISPLAY}
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`flex h-10 w-10 items-center justify-center border transition-colors md:hidden ${
              light ? "border-navy-700 text-white" : "border-navy-300 text-navy-900"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] bg-accent-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {menuOpen && (
        <nav className="border-t border-navy-800 bg-navy-950 px-6 pb-7 pt-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-navy-800/70 py-3.5 font-mono text-xs tracking-[0.2em] text-navy-100 transition-colors hover:text-accent-400"
              >
                {l.label.toUpperCase()}
              </a>
            ))}
            <a
              href="#quote"
              onClick={() => setMenuOpen(false)}
              className="mt-5 inline-flex items-center justify-center gap-2 bg-accent-500 px-4 py-3 text-sm font-semibold text-navy-950"
            >
              Request a Custom Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

/** Slow-scrolling Greek-key meander strip under the navbar. */
function GreekKeyBand() {
  return (
    <div className="marquee mt-[68px] border-b border-navy-800 bg-navy-950 py-2">
      <div className="meander-track">
        {[0, 1].map((k) => (
          <svg key={k} width="1440" height="14" className="shrink-0" aria-hidden={k === 1}>
            <defs>
              <pattern id={`meander-${k}`} width="36" height="14" patternUnits="userSpaceOnUse">
                <path d="M2 12 H14 V2 H30 V8 H20 V5 H26" fill="none" stroke="#f5a81c" strokeOpacity="0.5" strokeWidth="1.6" />
              </pattern>
            </defs>
            <rect width="1440" height="14" fill={`url(#meander-${k})`} />
          </svg>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Hero — self-drawing Corinthian elevation                        */
/* ------------------------------------------------------------------ */
function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section id="top" className="relative overflow-hidden bg-paper bg-blueprint pb-24 pt-14 md:pt-20">
      <span
        className="text-outline pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[22vw] leading-none md:text-[15vw]"
        aria-hidden="true"
      >
        ORDERS
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-navy-600">
              <StarMark className="h-3.5 w-3.5 text-accent-500" />
              PREMIUM GRC ARCHITECTURAL PRODUCTS
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[52px] leading-[0.98] tracking-[0.015em] text-navy-900 sm:text-7xl xl:text-[86px]">
              GRC Columns —
              <br />
              <span className="relative inline-block">
                Timeless Beauty.
                <svg viewBox="0 0 320 14" className="absolute -bottom-2 left-0 w-full text-accent-500" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 10 C 70 3, 190 3, 317 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              Built to Last.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-steel-600">
              Crafted to bring classical elegance and modern performance to your spaces.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#quote"
                className="group inline-flex items-center gap-3 bg-accent-500 px-7 py-4 text-[15px] font-bold text-navy-950 shadow-[6px_6px_0_0_var(--color-navy-800)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-accent-400 hover:shadow-[2px_2px_0_0_var(--color-navy-800)]"
              >
                Request a Custom Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#orders"
                className="inline-flex items-center gap-3 border-2 border-navy-800 px-7 py-[14px] text-[15px] font-semibold text-navy-800 transition-colors duration-200 hover:bg-navy-800 hover:text-white"
              >
                Explore the Six Orders
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {["GALVANIZED STEEL CORE", "HEIGHTS TO 6 M", "SEISMIC-SAFE LIGHTWEIGHT"].map((t) => (
                <li key={t} className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-steel-600">
                  <CheckIcon className="h-3.5 w-3.5 text-accent-600" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Self-drawing elevation */}
        <div className="lg:col-span-6" ref={ref}>
          <div className="relative mr-2 lg:mr-6">
            <span className="absolute -left-2 -top-2 h-7 w-7 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
            <span className="absolute -right-2 -top-2 h-7 w-7 border-r-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
            <span className="absolute -bottom-2 -left-2 h-7 w-7 border-b-[3px] border-l-[3px] border-accent-500" aria-hidden="true" />
            <span className="absolute -bottom-2 -right-2 h-7 w-7 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />

            <div className="relative border border-steel-300 bg-navy-50 px-6 pb-4 pt-12">
              <span className="absolute left-4 top-4 font-mono text-[9.5px] tracking-[0.25em] text-steel-500">
                ELEVATION · CORINTHIAN ORDER
              </span>
              <span className="absolute right-4 top-4 border border-navy-800/30 bg-white px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.25em] text-navy-800">
                DWG NO. BSP-COL-01
              </span>

              <svg viewBox="0 0 360 660" className="mx-auto w-full max-w-md text-navy-800" role="img" aria-label="Corinthian column elevation drawing">
                {/* outline strokes that draw themselves in */}
                <g fill="none" stroke="currentColor" strokeLinejoin="round">
                  <Draw inView={inView} delay={0} d="M120 96 H240 C238 104 236 110 233 116 H127 C124 110 122 104 120 96 Z" />
                  <circle cx="180" cy="106" r="4" pathLength={1} strokeWidth="1.5" fill="none" className="profile-line" style={{ strokeDashoffset: inView ? 0 : 1, transitionDelay: "250ms" }} />
                  <Draw inView={inView} delay={300} w={1.8} d="M120 128 A10 10 0 1 1 140 128 A6.2 6.2 0 1 1 127.2 128 A2.8 2.8 0 1 1 131.4 128" />
                  <Draw inView={inView} delay={300} w={1.8} d="M220 128 A10 10 0 1 1 240 128 A6.2 6.2 0 1 1 227.2 128 A2.8 2.8 0 1 1 231.4 128" />
                  {/* acanthus rows */}
                  <Draw inView={inView} delay={500} w={1.4} d="M136 168 Q147 142 158 168 Q147 156 136 168 Z M158 168 Q169 142 180 168 Q169 156 158 168 Z M180 168 Q191 142 202 168 Q191 156 180 168 Z M202 168 Q213 142 224 168 Q213 156 202 168 Z" />
                  <Draw inView={inView} delay={650} w={1.4} d="M132 196 Q146 162 160 196 Q146 180 132 196 Z M160 196 Q174 162 188 196 Q174 180 160 196 Z M188 196 Q202 162 216 196 Q202 180 188 196 Z M216 196 Q230 162 244 196 Q230 180 216 196 Z" />
                  <Draw inView={inView} delay={200} d="M142 220 C136 340 133 460 133 560 M218 220 C224 340 227 460 227 560" />
                  {/* flutes */}
                  <Draw inView={inView} delay={850} w={1} d="M149 226 L141.6 556 M156 226 L150.3 556 M163 226 L158.9 556 M170 226 L167.5 556 M177 226 L176.2 556 M184 226 L184.8 556 M191 226 L193.4 556 M198 226 L202.1 556 M205 226 L210.7 556 M212 226 L219.3 556" />
                  <Draw inView={inView} delay={400} w={1.5} d="M138 208 H222 M138 220 H222" />
                  {/* base */}
                  <Draw inView={inView} delay={500} w={1.5} d="M130 560 H230 M128 568 H232" />
                  <Draw inView={inView} delay={550} d="M126 568 C136 575 136 578 128 584 H232 C224 578 224 575 234 568" />
                  <Draw inView={inView} delay={600} d="M124 584 C114 596 114 600 126 606 H234 C246 600 246 596 236 584 Z" />
                  <Draw inView={inView} delay={650} d="M112 606 H248 V634 H112 Z" />
                  <Draw inView={inView} delay={700} w={2.2} d="M48 634 H312" />
                </g>

                {/* annotations (desktop) */}
                <g
                  className="hidden md:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  fontFamily="IBM Plex Mono, monospace"
                  style={{ opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 1s" }}
                >
                  <g>
                    <line x1="244" y1="106" x2="296" y2="106" />
                    <text x="300" y="109" fontSize="8" letterSpacing="1.4" stroke="none" fill="currentColor">ABACUS</text>
                  </g>
                  <g>
                    <line x1="246" y1="172" x2="296" y2="172" />
                    <text x="300" y="175" fontSize="8" letterSpacing="1.4" stroke="none" fill="currentColor">ACANTHUS CAPITAL</text>
                  </g>
                  <g>
                    <line x1="230" y1="380" x2="296" y2="380" />
                    <text x="300" y="383" fontSize="8" letterSpacing="1.4" stroke="none" fill="currentColor">FLUTED SHAFT</text>
                  </g>
                  <g>
                    <line x1="64" y1="214" x2="132" y2="214" />
                    <text x="60" y="217" fontSize="8" letterSpacing="1.4" textAnchor="end" stroke="none" fill="currentColor">ASTRAGAL</text>
                  </g>
                  <g>
                    <line x1="64" y1="410" x2="130" y2="410" />
                    <text x="60" y="413" fontSize="8" letterSpacing="1.4" textAnchor="end" stroke="none" fill="currentColor">ENTASIS</text>
                  </g>
                  <g>
                    <line x1="64" y1="596" x2="116" y2="596" />
                    <text x="60" y="599" fontSize="8" letterSpacing="1.4" textAnchor="end" stroke="none" fill="currentColor">TORUS BASE</text>
                  </g>
                  <g>
                    <line x1="252" y1="620" x2="296" y2="620" />
                    <text x="300" y="623" fontSize="8" letterSpacing="1.4" stroke="none" fill="currentColor">PLINTH</text>
                  </g>
                  {/* vertical dimension */}
                  <g className="text-steel-400">
                    <line x1="330" y1="96" x2="330" y2="634" strokeWidth="1" />
                    <path d="M326.5 103 L330 96 L333.5 103" strokeWidth="1" />
                    <path d="M326.5 627 L330 634 L333.5 627" strokeWidth="1" />
                    <line x1="324" y1="96" x2="336" y2="96" strokeWidth="1" />
                    <line x1="324" y1="634" x2="336" y2="634" strokeWidth="1" />
                    <text x="342" y="372" fontSize="8" letterSpacing="1.6" textAnchor="middle" stroke="none" fill="currentColor" transform="rotate(90 342 372)">
                      TYP. 3600 MM
                    </text>
                  </g>
                </g>
              </svg>

              {/* floating spec tag */}
              <div className="float-tag absolute -bottom-7 left-5 right-5 border border-steel-200 border-l-4 border-l-accent-500 bg-white p-4 shadow-xl shadow-navy-900/10 sm:right-auto sm:w-80">
                <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-700">CONSTRUCTION</p>
                <p className="mt-1.5 text-sm font-semibold text-navy-900">18 mm GRC shell over a galvanized steel core</p>
                <p className="mt-1 text-xs leading-relaxed text-steel-600">
                  The skin carries the beauty; the steel carries the load.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Ticker                                                          */
/* ------------------------------------------------------------------ */
function Ticker() {
  const row = (hidden: boolean) => (
    <div className="flex items-center" aria-hidden={hidden}>
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-mono text-[11px] tracking-[0.22em] text-navy-100">{item}</span>
          <StarMark className="h-2.5 w-2.5 shrink-0 text-accent-500" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee border-y border-navy-800 bg-navy-950 py-3.5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. The Six Orders                                                  */
/* ------------------------------------------------------------------ */
const ORDERS: {
  id: OrderId;
  code: string;
  name: string;
  tag?: string;
  canon: string;
  desc: string;
  specs: string[];
}[] = [
  {
    id: "corinthian",
    code: "BSP-COL-01",
    name: "Corinthian Column",
    tag: "MOST REQUESTED",
    canon: "CANON · H = 10D",
    desc: "The ornate order — twin rows of acanthus leaves under corner volutes. The default for porticos, temples and grand lobbies.",
    specs: ["Acanthus capital, two leaf rows", "24 flutes with fillets", "Dia 250–600 mm"],
  },
  {
    id: "ionic",
    code: "BSP-COL-02",
    name: "Ionic Column",
    canon: "CANON · H = 9D",
    desc: "Paired volutes over an egg-and-dart echinus. Graceful, scholarly proportions for verandahs and clubhouse colonnades.",
    specs: ["Paired corner volutes", "Egg-and-dart echinus", "Dia 250–500 mm"],
  },
  {
    id: "doric",
    code: "BSP-COL-03",
    name: "Doric Column",
    canon: "CANON · H = 8D",
    desc: "The stout Greek original — fluted shaft, plain capital, no base. Honest strength for gates and minimalist porticos.",
    specs: ["Plain echinus + abacus", "20 shallow flutes, no base", "Dia 300–600 mm"],
  },
  {
    id: "tuscan",
    code: "BSP-COL-04",
    name: "Tuscan Column",
    tag: "BEST VALUE",
    canon: "CANON · H = 7D",
    desc: "Rome's plainer Doric: a smooth, unfluted shaft on a simple torus base. Quiet elegance that never competes with the facade.",
    specs: ["Smooth unfluted shaft", "Simple torus base", "Dia 250–500 mm"],
  },
  {
    id: "roman",
    code: "BSP-COL-05",
    name: "Roman Column",
    canon: "CANON · H = 8D",
    desc: "Roman Doric with a moulded base and beaded echinus — closer-set flutes on a slender canon. Civic gravitas out of the box.",
    specs: ["Beaded echinus moulding", "24 flutes on moulded base", "Dia 250–550 mm"],
  },
  {
    id: "composite",
    code: "BSP-COL-06",
    name: "Composite Column",
    tag: "GRANDEST",
    canon: "CANON · H = 10D",
    desc: "Ionic volutes stacked over Corinthian acanthus — the grandest order in the canon, reserved for statement entrances.",
    specs: ["Volute + acanthus capital", "24 flutes with fillets", "Dia 300–600 mm"],
  },
];

function OrdersSection() {
  return (
    <section id="orders" className="scroll-mt-24 bg-paper bg-blueprint py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">01 / THE SIX ORDERS</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                EVERY CANON,
                <br />
                CAST IN GRC.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-steel-600 md:pb-2 md:text-right">
              Each order is drawn to its classical proportions, then spray-cast from a master mould.
              Hover a plate for the night-shift view.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {ORDERS.map((o, i) => (
            <Reveal key={o.id} delay={(i % 3) * 120}>
              <article className="group flex h-full flex-col border border-steel-300 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-600 hover:shadow-[10px_10px_0_0_rgba(245,168,28,0.18)]">
                <div className="relative border-b border-steel-200 bg-navy-50 p-3 transition-colors duration-500 group-hover:border-navy-800 group-hover:bg-navy-950">
                  <div className="flex items-start justify-between px-2 pt-1">
                    <span className="font-mono text-[9.5px] tracking-[0.2em] text-steel-500 transition-colors duration-500 group-hover:text-navy-300">
                      {o.code}
                    </span>
                    {o.tag && (
                      <span className="bg-accent-500 px-2 py-1 font-mono text-[8.5px] tracking-[0.18em] text-navy-950">{o.tag}</span>
                    )}
                  </div>
                  <OrderDrawing order={o.id} />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[26px] tracking-[0.02em] text-navy-900">{o.name}</h3>
                  </div>
                  <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.2em] text-accent-700">{o.canon}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-steel-600">{o.desc}</p>

                  <ul className="mt-5 space-y-2">
                    {o.specs.map((s) => (
                      <li key={s} className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.08em] text-steel-600">
                        <span className="h-1.5 w-1.5 shrink-0 bg-accent-500" aria-hidden="true" />
                        {s.toUpperCase()}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#quote"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-navy-800 transition-colors group-hover:text-accent-700"
                  >
                    Get pricing
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Split-shell anatomy — interactive exploded drawing              */
/* ------------------------------------------------------------------ */
const ANATOMY_PARTS = [
  {
    title: "Split-shell GRC halves",
    desc: "Two 18 mm GRC shells, spray-cast from a single master mould and joined with polymer mortar — the seam disappears after finishing.",
  },
  {
    title: "Galvanized steel core",
    desc: "A structural MS post carries every load; the GRC is cladding, never structure. Seismic-safe at any height.",
  },
  {
    title: "SS fixing brackets",
    desc: "Adjustable stainless brackets tie each shell course to the core — plumbable on site, no wet trades required.",
  },
  {
    title: "Cast base shoe",
    desc: "A moulded shoe covers the fixing ring at floor level and sheds water away from the core.",
  },
];

function Anatomy() {
  const [active, setActive] = useState<number | null>(null);

  const gCls = (i: number) =>
    `transition-all duration-300 ${active !== null && active !== i ? "opacity-25" : ""} ${
      active === i ? "text-accent-600" : ""
    }`;

  return (
    <section id="anatomy" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Legend */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">02 / SPLIT-SHELL ANATOMY</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.02] text-navy-900 sm:text-6xl">
              BEAUTY ON THE
              <br />
              OUTSIDE. STEEL
              <br />
              ON THE INSIDE.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-steel-600">
              A Blue Star column is never solid GRC. Run your cursor over the list — every stone you
              see on your building hangs off a galvanized core.
            </p>
          </Reveal>

          <div className="mt-9 space-y-3">
            {ANATOMY_PARTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 110}>
                <div
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={active === i}
                  className={`cursor-default border p-5 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-500 ${
                    active === i
                      ? "-translate-x-1 border-accent-600 bg-navy-50 shadow-[6px_6px_0_0_rgba(245,168,28,0.25)]"
                      : "border-steel-200 bg-paper hover:border-navy-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center border font-mono text-xs font-semibold transition-colors ${
                        active === i ? "border-accent-600 bg-accent-500 text-navy-950" : "border-navy-800 text-navy-800"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-display text-xl tracking-[0.03em] text-navy-900">{p.title.toUpperCase()}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Exploded drawing */}
        <div className="lg:col-span-7">
          <Reveal delay={150}>
            <div className="relative border border-steel-300 bg-navy-50 p-6 sm:p-10">
              <span className="absolute left-4 top-4 font-mono text-[9.5px] tracking-[0.25em] text-steel-500">
                SPLIT-SHELL CONSTRUCTION — EXPLODED
              </span>
              <svg viewBox="0 0 500 520" className="w-full text-navy-800" role="img" aria-label="Exploded drawing of a split-shell GRC column on a steel core">
                <defs>
                  <pattern id="steelhatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
                  </pattern>
                  <pattern id="agrid" width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M16 0H0V16" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
                  </pattern>
                </defs>
                <rect width="500" height="520" fill="url(#agrid)" />
                <line x1="40" y1="468" x2="460" y2="468" stroke="currentColor" strokeWidth="2.2" />

                {/* As-built ghost, far left */}
                <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.45">
                  <path d="M96 84 L164 84 L156 116 L104 116 Z" />
                  <path d="M108 116 C 100 220 100 320 108 420 L152 420 C 160 320 160 220 152 116 Z" />
                  <path d="M100 420 L160 420 L154 452 L106 452 Z" />
                  <text x="130" y="492" fontSize="8" letterSpacing="1.6" textAnchor="middle" stroke="none" fill="currentColor" fontFamily="IBM Plex Mono, monospace">
                    AS-BUILT
                  </text>
                </g>

                {/* Exploded assembly */}
                <g fill="none" stroke="currentColor" strokeLinejoin="round">
                  {/* 2 — steel core */}
                  <g className={gCls(1)} strokeWidth="1.8">
                    <rect x="330" y="70" width="20" height="392" fill="url(#steelhatch)" />
                    <line x1="322" y1="70" x2="358" y2="70" />
                    <circle cx="340" cy="86" r="2.5" strokeWidth="1.2" />
                    <circle cx="340" cy="446" r="2.5" strokeWidth="1.2" />
                  </g>

                  {/* 1 — shell halves (incl. capital caps) */}
                  <g className={gCls(0)} strokeWidth="2">
                    <path d="M286 120 L326 120 L318 86 L296 86 Z" />
                    <path d="M394 120 L354 120 L362 86 L384 86 Z" />
                    <path d="M286 124 C 276 214 276 314 286 404 L322 404 C 314 314 314 214 322 124 Z" />
                    <path d="M394 124 C 404 214 404 314 394 404 L358 404 C 366 314 366 214 358 124 Z" />
                  </g>

                  {/* 3 — brackets */}
                  <g className={gCls(2)} strokeWidth="1.8">
                    <rect x="322" y="188" width="8" height="16" />
                    <rect x="350" y="188" width="8" height="16" />
                    <circle cx="326" cy="196" r="2" strokeWidth="1.2" />
                    <circle cx="354" cy="196" r="2" strokeWidth="1.2" />
                    <rect x="322" y="316" width="8" height="16" />
                    <rect x="350" y="316" width="8" height="16" />
                    <circle cx="326" cy="324" r="2" strokeWidth="1.2" />
                    <circle cx="354" cy="324" r="2" strokeWidth="1.2" />
                  </g>

                  {/* 4 — base shoe */}
                  <g className={gCls(3)} strokeWidth="2">
                    <path d="M278 452 L402 452 L390 412 L290 412 Z" />
                    <line x1="290" y1="424" x2="390" y2="424" strokeWidth="1.2" />
                  </g>
                </g>

                {/* hotspot markers */}
                {active === null &&
                  [
                    { x: 268, y: 264, n: 1 },
                    { x: 340, y: 56, n: 2 },
                    { x: 372, y: 196, n: 3 },
                    { x: 416, y: 432, n: 4 },
                  ].map((h) => (
                    <g key={h.n} className="text-accent-600">
                      <circle cx={h.x} cy={h.y} r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <text
                        x={h.x}
                        y={h.y + 3.2}
                        fontSize="9"
                        textAnchor="middle"
                        fill="currentColor"
                        fontFamily="IBM Plex Mono, monospace"
                        fontWeight="600"
                      >
                        {h.n}
                      </text>
                    </g>
                  ))}
              </svg>
              <p className="mt-4 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">
                SECTION THROUGH SHAFT · SHELL 18 MM · CORE 80 × 80 MS
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Cinematic band                                                  */
/* ------------------------------------------------------------------ */
function CinematicBand() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <img
          src={VILLA_IMG}
          alt="Grand villa portico with tall white GRC columns at dusk"
          className="kenburns h-full w-full object-cover opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/30" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">PROOF, NOT PROMISES</p>
          <p className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-6xl md:text-7xl">
            THE ORDERS, CAST FOR THE INDIAN CLIMATE.
          </p>
          <p className="mt-6 font-mono text-[10.5px] tracking-[0.22em] text-navy-200">
            SPRAY-CAST IN OUR TALOJA WORKS · ERECTED ON STEEL CORES ACROSS 18 STATES
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Why GRC — comparison                                            */
/* ------------------------------------------------------------------ */
const COMPARISON = [
  { label: "Weight per running foot", grc: "35–50 kg", stone: "300–400 kg", plaster: "12–18 kg", timber: "25–30 kg" },
  { label: "Detail sharpness", grc: "Mould-perfect acanthus & flutes", stone: "Hand-carved — at a price", plaster: "Softens with age", timber: "Limited profiles" },
  { label: "Weather & life", grc: "50+ years outdoors", stone: "Centuries, but erodes", plaster: "Indoor only", timber: "Rots · termites" },
  { label: "Installation", grc: "Dry-fix to steel core", stone: "Cranes + masons", plaster: "Cast in situ", timber: "Carpentry crew" },
  { label: "Cost vs stone", grc: "30–40% of carved stone", stone: "Baseline", plaster: "Cheapest — and fragile", timber: "Premium joinery" },
];

function WhyGrc() {
  return (
    <section id="why-grc" className="relative scroll-mt-24 overflow-hidden bg-navy-950 bg-blueprint-dark py-24 text-navy-100">
      <span
        className="text-outline-light pointer-events-none absolute -right-4 top-6 select-none font-display text-[11rem] leading-none md:text-[16rem]"
        aria-hidden="true"
      >
        WHY
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">03 / WHY GRC</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-white sm:text-6xl">
            THE LOOK OF STONE.
            <br />
            NONE OF THE STONE.
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">PROPERTY</th>
                  <th className="relative border-x border-accent-500/25 bg-navy-800/70 p-4">
                    <span className="absolute -top-3 left-4 bg-accent-500 px-2 py-0.5 font-mono text-[9px] tracking-[0.18em] text-navy-950">
                      ★ RECOMMENDED
                    </span>
                    <span className="font-display text-xl tracking-[0.04em] text-white">GRC COLUMN</span>
                  </th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">CARVED STONE</th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">PLASTER / POP</th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">TIMBER</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-t border-navy-800 transition-colors hover:bg-navy-900/50">
                    <td className="p-4 font-mono text-[11px] tracking-[0.12em] text-steel-400">{row.label.toUpperCase()}</td>
                    <td className="border-x border-accent-500/25 bg-navy-800/70 p-4 text-sm font-semibold text-white">
                      <span className="flex items-center gap-2.5">
                        <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent-400" />
                        {row.grc}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-navy-300">{row.stone}</td>
                    <td className="p-4 text-sm text-navy-300">{row.plaster}</td>
                    <td className="p-4 text-sm text-navy-300">{row.timber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-steel-500">
            * INDICATIVE VALUES FOR A 300 MM DIA × 3.6 M COLUMN. TEST REPORTS AVAILABLE ON REQUEST.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Stats band                                                      */
/* ------------------------------------------------------------------ */
const STATS = [
  { value: 6, suffix: "", label: "Orders in canon" },
  { value: 40000, suffix: "+", label: "Columns cast" },
  { value: 18, suffix: "", label: "States served pan-India" },
  { value: 10, suffix: "-YR", label: "Structural warranty" },
];

function StatsBand() {
  return (
    <section className="bg-accent-500 text-navy-950">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-10 text-center transition-colors duration-300 hover:bg-accent-400 sm:py-12 ${
              i === 1 ? "border-l border-navy-950/15" : ""
            } ${i === 2 ? "border-t border-navy-950/15 lg:border-t-0 lg:border-l" : ""} ${
              i === 3 ? "border-t border-l border-navy-950/15 lg:border-t-0" : ""
            }`}
          >
            <p className="font-display text-5xl leading-none sm:text-6xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Process                                                         */
/* ------------------------------------------------------------------ */
const PROCESS_STEPS = [
  {
    title: "Pick your order & sizes",
    desc: "Choose from the six canons and share heights, diameters and counts — a facade photo is enough to start.",
  },
  {
    title: "CAD elevation + quote in 24 h",
    desc: "An approved elevation and section of your column, with per-unit pricing and finish options.",
  },
  {
    title: "Spray-cast & cure",
    desc: "18 mm GRC shells from the master mould, seven-day cure, then demould and QC at our Taloja works.",
  },
  {
    title: "Erect the core, hang the shells",
    desc: "Your site team fixes the galvanized core; shells bolt on, joints grout out. Our engineer stays on call.",
  },
];

function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">04 / FROM MOULD TO PORTICO</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                FOUR STEPS
                <br />
                TO YOUR
                <br />
                COLONNADE.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-steel-600">
                No carving crew, no crane hire, no curing downtime on site — the stone arrives
                finished and bolts straight onto the core.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative mt-9">
                <span className="absolute -left-2 -top-2 h-6 w-6 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
                <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />
                <div className="overflow-hidden border border-steel-300 bg-navy-900">
                  <img
                    src={WORKSHOP_IMG}
                    alt="Craftsman hand-finishing the flutes of a GRC column shaft in the Blue Star workshop"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">
                  FLUTE FINISHING BY HAND — TALOJA MIDC, NAVI MUMBAI
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative">
            <span className="absolute bottom-4 left-[21px] top-4 w-px bg-steel-300" aria-hidden="true" />
            <ol className="space-y-4">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 130}>
                  <li className="group relative flex gap-6 pb-6">
                    <span className="z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-navy-800 bg-paper font-display text-xl text-navy-800 transition-colors duration-300 group-hover:border-accent-600 group-hover:bg-accent-500 group-hover:text-navy-950">
                      {i + 1}
                    </span>
                    <div className="flex-1 border border-steel-200 bg-paper p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-navy-800 group-hover:shadow-[8px_8px_0_0_rgba(21,44,79,0.07)]">
                      <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-700">STEP {i + 1} / 4</p>
                      <h3 className="mt-2 font-display text-[24px] tracking-[0.02em] text-navy-900">{step.title.toUpperCase()}</h3>
                      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-steel-600">{step.desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  10. Quote form                                                     */
/* ------------------------------------------------------------------ */
type QuoteForm = {
  name: string;
  phone: string;
  email: string;
  city: string;
  order: string;
  height: string;
  qty: string;
  message: string;
};

const EMPTY_FORM: QuoteForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  order: "Corinthian Column",
  height: "2.4–3.6 m",
  qty: "1–4 columns",
  message: "",
};

function inputCls(invalid: boolean) {
  return `w-full border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-steel-400 focus:ring-2 ${
    invalid
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
      : "border-steel-300 focus:border-accent-600 focus:ring-accent-500/30"
  }`;
}

function QuoteSection() {
  const [form, setForm] = useState<QuoteForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const set = (key: keyof QuoteForm) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a valid 10-digit mobile number.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setRefId(`BSP-Q-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
  };

  const labelCls = "mb-1.5 block font-mono text-[10.5px] tracking-[0.18em] text-steel-600";

  return (
    <section id="quote" className="relative scroll-mt-24 overflow-hidden bg-navy-950 bg-blueprint-dark py-24 text-navy-100">
      <span
        className="text-outline-light pointer-events-none absolute -bottom-10 -left-4 select-none font-display text-[9rem] leading-none md:text-[15rem]"
        aria-hidden="true"
      >
        QUOTE
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Contact rail */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">05 / GET A QUOTE</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.02] text-white sm:text-6xl">
              TELL US YOUR ORDER.
              <br />
              QUOTED IN 24 HOURS.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-200">
              Share the order, height and count — our sales engineer replies with per-column
              pricing, a CAD elevation and a fixing plan.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10 space-y-4">
              <a href={PHONE_TEL} className="group flex items-center gap-4 border border-navy-800 bg-navy-900/60 p-5 transition-colors hover:border-accent-500">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-navy-700 text-accent-400">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.25em] text-steel-400">SALES DESK</span>
                  <span className="mt-1 block text-lg font-semibold text-white transition-colors group-hover:text-accent-300">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>

              <a href={`mailto:${EMAIL}`} className="group flex items-center gap-4 border border-navy-800 bg-navy-900/60 p-5 transition-colors hover:border-accent-500">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-navy-700 text-accent-400">
                  <MailIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.25em] text-steel-400">EMAIL US</span>
                  <span className="mt-1 block break-all text-lg font-semibold text-white transition-colors group-hover:text-accent-300">
                    {EMAIL}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4 border border-navy-800 bg-navy-900/60 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-navy-700 text-accent-400">
                  <PinIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.25em] text-steel-400">WORKS & OFFICE</span>
                  <span className="mt-1 block text-sm leading-relaxed text-navy-200">{ADDRESS}</span>
                </span>
              </div>
            </div>
            <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-steel-500">
              MON–SAT · 09:00–18:30 IST · SITE VISITS BY APPOINTMENT
            </p>
          </Reveal>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <Reveal delay={200}>
            <div className="border-t-4 border-accent-500 bg-paper p-7 text-ink shadow-2xl shadow-navy-950/50 sm:p-10">
              {submitted ? (
                <div className="py-6 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center bg-accent-500 text-navy-950">
                    <CheckIcon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display text-4xl text-navy-900">REQUEST RECEIVED.</h3>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-accent-700">
                    REF {refId} · LOGGED{" "}
                    {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
                  </p>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-steel-600">
                    Thanks, {form.name.split(" ")[0]} — our sales engineer will call{" "}
                    <span className="font-semibold text-navy-800">{form.phone}</span> within 24
                    working hours with your custom quote.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY_FORM);
                      setSubmitted(false);
                    }}
                    className="mt-8 inline-flex items-center gap-2 border-2 border-navy-800 px-6 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-800 hover:text-white"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className="font-display text-3xl text-navy-900">REQUEST A CUSTOM QUOTE</h3>
                  <p className="mt-1 text-sm text-steel-600">
                    Fields marked <span className="font-bold text-accent-700">*</span> are required.
                  </p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="q-name" className={labelCls}>FULL NAME *</label>
                      <input id="q-name" type="text" value={form.name} onChange={set("name")} placeholder="e.g. Ar. Kavita Rao" className={inputCls(!!errors.name)} />
                      {errors.name && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="q-phone" className={labelCls}>PHONE *</label>
                      <input id="q-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="10-digit mobile" className={inputCls(!!errors.phone)} />
                      {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="q-email" className={labelCls}>EMAIL</label>
                      <input id="q-email" type="email" value={form.email} onChange={set("email")} placeholder="you@studio.in" className={inputCls(false)} />
                    </div>
                    <div>
                      <label htmlFor="q-city" className={labelCls}>CITY</label>
                      <input id="q-city" type="text" value={form.city} onChange={set("city")} placeholder="e.g. Nashik" className={inputCls(false)} />
                    </div>
                    <div>
                      <label htmlFor="q-order" className={labelCls}>ORDER</label>
                      <select id="q-order" value={form.order} onChange={set("order")} className={inputCls(false)}>
                        {ORDERS.map((o) => (
                          <option key={o.id}>{o.name}</option>
                        ))}
                        <option>Multiple orders / custom profile</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q-height" className={labelCls}>COLUMN HEIGHT</label>
                      <select id="q-height" value={form.height} onChange={set("height")} className={inputCls(false)}>
                        <option>Upto 2.4 m</option>
                        <option>2.4–3.6 m</option>
                        <option>3.6–4.8 m</option>
                        <option>4.8–6 m</option>
                        <option>Custom / not sure</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="q-qty" className={labelCls}>QUANTITY</label>
                      <select id="q-qty" value={form.qty} onChange={set("qty")} className={inputCls(false)}>
                        <option>1–4 columns</option>
                        <option>4–12 columns</option>
                        <option>12–50 columns</option>
                        <option>50+ (project supply)</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="q-msg" className={labelCls}>ANYTHING ELSE?</label>
                      <textarea id="q-msg" rows={3} value={form.message} onChange={set("message")} placeholder="Finish, facade photos, drawings, deadlines…" className={inputCls(false)} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group mt-7 inline-flex w-full items-center justify-center gap-3 bg-accent-500 px-7 py-4 text-[15px] font-bold text-navy-950 shadow-[6px_6px_0_0_var(--color-navy-800)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-accent-400 hover:shadow-[2px_2px_0_0_var(--color-navy-800)]"
                  >
                    Send My Request
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                  <p className="mt-4 text-center font-mono text-[9.5px] tracking-[0.16em] text-steel-500">
                    NO SPAM — YOUR NUMBER GOES STRAIGHT TO OUR SALES DESK.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  11. Footer                                                         */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950 pt-16 text-navy-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <a href="#top" className="flex items-center gap-2.5">
            <StarMark className="h-7 w-7 text-accent-500" />
            <span className="leading-none">
              <span className="block font-display text-[22px] tracking-[0.06em] text-white">BLUE STAR</span>
              <span className="mt-0.5 block font-mono text-[8.5px] tracking-[0.34em] text-accent-500">
                PLASTIC INDUSTRIES
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel-400">
            Manufacturer of premium FRP and GRC architectural products — chajjas, jali panels,
            cornices, columns and custom facade elements — since 2001.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["ISO 9001:2015", "FRP · GRC SPECIALISTS", "MADE IN INDIA"].map((b) => (
              <span key={b} className="border border-navy-700 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.18em] text-steel-400">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">PRODUCTS</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {["FRP Chajjas", "GRC Jali Panels", "GRC Cornices", "GRC Columns", "Custom Profiles"].map((p) => (
              <li key={p}>
                <a href="#orders" className="nav-underline text-navy-200 transition-colors hover:text-white">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">COMPANY</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-underline text-navy-200 transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">CONTACT</h4>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2.5 text-navy-200 transition-colors hover:text-accent-300">
                <MailIcon className="h-4 w-4 text-accent-500" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={PHONE_TEL} className="inline-flex items-center gap-2.5 text-navy-200 transition-colors hover:text-accent-300">
                <PhoneIcon className="h-4 w-4 text-accent-500" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-steel-400">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
              {ADDRESS}
            </li>
          </ul>
          <a
            href="#quote"
            className="mt-6 inline-flex items-center gap-2 bg-accent-500 px-5 py-3 text-sm font-bold text-navy-950 transition-colors hover:bg-accent-400"
          >
            Request a Custom Quote <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-14 border-t border-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-xs text-steel-500">
            © {new Date().getFullYear()} Blue Star Plastic Industries. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="hidden font-mono text-[9.5px] tracking-[0.2em] text-steel-500 lg:block">
              GRC COLUMNS · LANDING PAGE 04 / 10
            </p>
            <a href="#top" className="nav-underline font-mono text-[10px] tracking-[0.22em] text-navy-200 transition-colors hover:text-accent-400">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App root                                                           */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-sans text-ink">
      <Header />
      <main>
        <GreekKeyBand />
        <Hero />
        <Ticker />
        <OrdersSection />
        <Anatomy />
        <CinematicBand />
        <WhyGrc />
        <StatsBand />
        <Process />
        <QuoteSection />
      </main>
      <Footer />
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}
