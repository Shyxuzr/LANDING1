/**
 * ============================================================================
 *  BLUE STAR PLASTIC INDUSTRIES — Landing Page #2 : GRC JALI PANELS
 * ----------------------------------------------------------------------------
 *  Sections, in order:
 *    1. Header / Navbar        — brand + right-aligned call button
 *    2. Hero                   — headline + a LIVE jali lattice panel with
 *                                drifting sunlight and mouse parallax
 *    3. Spec ticker            — rotating marquee of product credentials
 *    4. Key Features           — ledger rows (strength / weather / weight)
 *    5. Applications index     — façades · ventilation · partitions ·
 *                                balconies · landscape
 *    6. Pattern Showcase       — 5 real lattice drawings + custom CTA cell
 *    7. Cinema band            — full-bleed "light through jali" photograph
 *    8. Why GRC                — comparison vs MS/alu jali & terracotta
 *    9. Stats band             — animated counters
 *   10. Process                — sample-to-fixing timeline + workshop photo
 *   11. Quote form             — validated form with success state
 *   12. Footer                 — sales email, phone, copyright
 *
 *  Design system shared with Page #1 (FRP Chajjas):
 *  navy / steel-grey / off-white with safety-amber accents.
 *  Type: Bebas Neue (display) · IBM Plex Sans (body) · IBM Plex Mono (specs).
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

const FACADE_IMG =
  "https://image.qwenlm.ai/generated-images/30e84dfa-f3fb-45e3-b0f6-6d76cd66cf47/_result.png";
const WORKSHOP_IMG =
  "https://image.qwenlm.ai/generated-images/c6b2b6ed-aa33-4062-b0a5-2a29e0761084/_result.png";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Applications", href: "#applications" },
  { label: "Patterns", href: "#patterns" },
  { label: "Why GRC", href: "#why-grc" },
  { label: "Contact", href: "#quote" },
];

const TICKER_ITEMS = [
  "GLASS-FIBRE REINFORCED CONCRETE",
  "OPEN AREA 29–41%",
  "CAST-TO-ORDER 600 MM MODULES",
  "NON-COMBUSTIBLE · CLASS A1",
  "NATURAL CEMENT OR RAL FINISHES",
  "5 SIGNATURE PATTERNS + CUSTOM",
  "PAN-INDIA CRATED DELIVERY",
];

/* ------------------------------------------------------------------ */
/*  Custom inline SVG icons                                            */
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

/** Feature icon — compression press on a panel: high strength & durable. */
function StrengthIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="26" width="32" height="9" />
      <path d="M16 6v11M16 17l-4-5M16 17l4-5" />
      <path d="M32 6v11M32 17l-4-5M32 17l4-5" />
      <path d="M6 42h36" />
      <path d="M12 26v-3M36 26v-3" />
    </svg>
  );
}

/** Feature icon — shield holding sun + rain: weather & corrosion resistant. */
function WeatherIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 4.5 39 10v12c0 10.5-6.2 17.6-15 21C15.2 39.6 9 32.5 9 22V10Z" />
      <circle cx="24" cy="18" r="4.5" />
      <path d="M24 10.5v2.2M24 23.3v2.2M16.5 18h2.2M29.3 18h2.2M18.7 12.7l1.5 1.5M27.8 21.8l1.5 1.5M29.3 12.7l-1.5 1.5M20.2 21.8l-1.5 1.5" />
      <path d="M18.5 29.5 17 34M24.5 29.5 23 34M30.5 29.5 29 34" />
    </svg>
  );
}

/** Feature icon — floating panel with lift arrows: lightweight & easy install. */
function LightweightIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 27 24 19l16 8-16 8Z" />
      <path d="M8 27v6l16 8 16-8v-6" />
      <path d="M24 33v14" />
      <path d="M17 10l7-4 7 4" />
      <circle cx="11" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="37" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Application index glyphs (24 × 24 line icons) */
function FacadeGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M9.2 3.5v17M14.8 3.5v17M3.5 9.2h17M3.5 14.8h17" />
    </svg>
  );
}

function VentGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M3 8.5q2.2-3 4.5 0t4.5 0 4.5 0 4.5 0" />
      <path d="M3 13q2.2-3 4.5 0t4.5 0 4.5 0 4.5 0" />
      <path d="M3 17.5q2.2-3 4.5 0t4.5 0 4.5 0 4.5 0" />
    </svg>
  );
}

function PartitionGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M12 3v18" strokeDasharray="3 2.4" />
      <rect x="3.5" y="9" width="5" height="6" />
      <rect x="15.5" y="9" width="5" height="6" />
    </svg>
  );
}

function BalconyGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6.5h18" />
      <path d="M5.5 6.5v11M10 6.5v11M14 6.5v11M18.5 6.5v11" />
      <path d="M3 17.5h18" />
      <path d="M4.5 21h15" />
    </svg>
  );
}

function LandscapeGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 13C12 7 16.5 3.5 20 3.5 20 9.5 16 13 12 13Z" />
      <path d="M12 13c0-4.5-3.5-7-6.5-7C5.5 10.5 8.5 13 12 13Z" />
      <path d="M12 13v8" />
      <path d="M5 21h14" />
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
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
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

/* ------------------------------------------------------------------ */
/*  Jali lattice patterns — every pattern is a real, tiling SVG        */
/* ------------------------------------------------------------------ */
type JaliVariant = "basket" | "star" | "maze" | "leaf" | "brick" | "heroStar";

/**
 * Renders a seamless jali lattice. All geometry uses `currentColor` so a
 * parent `text-*` / `group-hover:text-*` re-colours the whole drawing.
 * `uid` keeps <pattern> ids unique when several tiles share the page.
 */
function JaliTile({ variant, uid, className = "" }: { variant: JaliVariant; uid: string; className?: string }) {
  const pid = `jali-${uid}`;

  const motif = () => {
    switch (variant) {
      /* Over-and-under woven strips in alternating 2 × 2 blocks */
      case "basket":
        return (
          <pattern id={pid} width="44" height="44" patternUnits="userSpaceOnUse">
            <g fill="currentColor">
              <rect x="1" y="3" width="20" height="7" />
              <rect x="1" y="12" width="20" height="7" />
              <rect x="25" y="1" width="7" height="20" />
              <rect x="34" y="1" width="7" height="20" />
              <rect x="1" y="25" width="20" height="7" />
              <rect x="1" y="34" width="20" height="7" />
              <rect x="25" y="23" width="7" height="20" />
              <rect x="34" y="23" width="7" height="20" />
            </g>
          </pattern>
        );

      /* Two overlapping squares + corner diamonds = 8-point star khatam */
      case "star":
        return (
          <pattern id={pid} width="56" height="56" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="12" y="12" width="32" height="32" />
              <path d="M28 5 51 28 28 51 5 28Z" />
              <path d="M0 -6 6 0 0 6 -6 0Z" />
              <path d="M56 -6 62 0 56 6 50 0Z" />
              <path d="M0 50 6 56 0 62 -6 56Z" />
              <path d="M56 50 62 56 56 62 50 56Z" />
            </g>
            <circle cx="28" cy="28" r="2" fill="currentColor" />
          </pattern>
        );

      /* Concentric squares with offset slots — a square labyrinth */
      case "maze":
        return (
          <pattern id={pid} width="48" height="48" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
              <path d="M26 4H44V44H4V4H20" />
              <path d="M12 22V36H36V12H20" />
            </g>
            <rect x="20" y="20" width="8" height="8" fill="currentColor" />
          </pattern>
        );

      /* Paired vesica leaves on the diagonal with midribs */
      case "leaf":
        return (
          <pattern id={pid} width="60" height="60" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <g transform="translate(15 15) rotate(45)">
                <path d="M0 -12C6 -7 9 -3 9 0C9 3 6 7 0 12C-6 7 -9 3 -9 0C-9 -3 -6 -7 0 -12Z" />
                <path d="M0 -8V8" strokeWidth="1.2" />
              </g>
              <g transform="translate(45 45) rotate(45)">
                <path d="M0 -12C6 -7 9 -3 9 0C9 3 6 7 0 12C-6 7 -9 3 -9 0C-9 -3 -6 -7 0 -12Z" />
                <path d="M0 -8V8" strokeWidth="1.2" />
              </g>
            </g>
            <circle cx="45" cy="15" r="1.8" fill="currentColor" />
            <circle cx="15" cy="45" r="1.8" fill="currentColor" />
          </pattern>
        );

      /* Running-bond brick screen with open perpends */
      case "brick":
        return (
          <pattern id={pid} width="56" height="32" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="24" height="12" />
              <rect x="30" y="2" width="24" height="12" />
              <rect x="-12" y="18" width="24" height="12" />
              <rect x="16" y="18" width="24" height="12" />
              <rect x="44" y="18" width="24" height="12" />
            </g>
          </pattern>
        );

      /* Denser 8-fold lattice used in the hero light panel */
      case "heroStar":
        return (
          <pattern id={pid} width="64" height="64" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="3.2">
              <rect x="14" y="14" width="36" height="36" />
              <path d="M32 6 58 32 32 58 6 32Z" />
              <path d="M0 -7 7 0 0 7 -7 0Z" />
              <path d="M64 -7 71 0 64 7 57 0Z" />
              <path d="M0 57 7 64 0 71 -7 64Z" />
              <path d="M64 57 71 64 64 71 57 64Z" />
              <path d="M32 -3 35 0 32 3 29 0Z" />
              <path d="M0 29 3 32 0 35 -3 32Z" />
              <path d="M64 29 67 32 64 35 61 32Z" />
              <path d="M32 61 35 64 32 67 29 64Z" />
            </g>
            <circle cx="32" cy="32" r="2.6" fill="currentColor" />
          </pattern>
        );
    }
  };

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>{motif()}</defs>
      <rect width="240" height="240" fill={`url(#${pid})`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Header / Navbar                                                 */
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3.5 sm:gap-3 sm:px-8">
        <a href="#top" className="group flex min-w-0 items-center gap-2.5" aria-label="Blue Star Plastic Industries — home">
          <StarMark className="h-7 w-7 shrink-0 text-accent-500 transition-transform duration-300 group-hover:rotate-45" />
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
            <PhoneIcon className="h-4 w-4 shrink-0" />
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

/* ------------------------------------------------------------------ */
/*  2. Hero — copy beside a live jali light panel                      */
/* ------------------------------------------------------------------ */
function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-paper bg-blueprint pb-24 pt-28 md:pt-36">
      <span
        className="text-outline pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[26vw] leading-none tracking-tight md:text-[19vw]"
        aria-hidden="true"
      >
        JALI
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Copy column */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-navy-600">
              <StarMark className="h-3.5 w-3.5 text-accent-500" />
              PREMIUM GRC ARCHITECTURAL PRODUCTS
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[52px] leading-[0.98] tracking-[0.015em] text-navy-900 sm:text-7xl xl:text-[86px]">
              Premium GRC Jali Panels —
              <br />
              Strength Meets
              <br />
              <span className="relative inline-block">
                Elegance.
                <svg
                  viewBox="0 0 320 14"
                  className="absolute -bottom-2 left-0 w-full text-accent-500"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M3 10 C 70 3, 190 3, 317 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-steel-600">
              Perfect for modern façades, ventilation, partition walls, balconies, and landscape
              enhancements.
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
                href="#patterns"
                className="inline-flex items-center gap-3 border-2 border-navy-800 px-7 py-[14px] text-[15px] font-semibold text-navy-800 transition-colors duration-200 hover:bg-navy-800 hover:text-white"
              >
                Browse the 5 Patterns
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {["IS 13441 GRC SPEC", "NON-COMBUSTIBLE CLASS A1", "10-YEAR WARRANTY"].map((t) => (
                <li key={t} className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-steel-600">
                  <CheckIcon className="h-3.5 w-3.5 text-accent-600" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Live jali light panel */}
        <div className="lg:col-span-6">
          <Reveal delay={200}>
            <div
              className="relative mr-2 cursor-crosshair lg:mr-6"
              onMouseMove={(e) => {
                if (reduced.current) return;
                const r = e.currentTarget.getBoundingClientRect();
                setTilt({
                  x: ((e.clientX - r.left) / r.width - 0.5) * 52,
                  y: ((e.clientY - r.top) / r.height - 0.5) * 52,
                });
              }}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
              {/* amber corner brackets */}
              <span className="absolute -left-2 -top-2 z-20 h-7 w-7 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -right-2 -top-2 z-20 h-7 w-7 border-r-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -left-2 z-20 h-7 w-7 border-b-[3px] border-l-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -right-2 z-20 h-7 w-7 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />

              <div className="relative aspect-[4/5] overflow-hidden border border-navy-800 bg-navy-950 sm:aspect-square lg:aspect-[4/5]">
                {/* sky wash behind the lattice */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(245,168,28,0.14),transparent_70%)]" aria-hidden="true" />

                {/* drifting sunlight — follows the cursor gently */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `translate(${tilt.x}px, ${tilt.y}px)`,
                    transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  aria-hidden="true"
                >
                  <div className="drift-a absolute left-[8%] top-[10%] h-64 w-64 rounded-full bg-accent-400/80 blur-3xl">
                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-300 blur-xl" />
                  </div>
                  <div className="drift-b absolute right-[6%] top-[42%] h-52 w-52 rounded-full bg-navy-300/40 blur-3xl" />
                </div>

                {/* the lattice itself — solid navy, light only through the holes */}
                <JaliTile variant="heroStar" uid="hero" className="absolute inset-0 h-full w-full text-navy-950" />

                {/* drawing-number stamp */}
                <span className="absolute right-4 top-4 z-10 border border-white/25 bg-navy-950/75 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.25em] text-navy-100">
                  PATTERN GEOMETRIC STAR
                </span>

                {/* floating spec tags */}
                <div className="float-tag absolute bottom-16 left-5 z-10 border border-steel-200 border-l-4 border-l-accent-500 bg-white px-4 py-3 shadow-xl shadow-navy-950/20">
                  <p className="font-mono text-[9px] tracking-[0.25em] text-accent-700">OPEN AREA</p>
                  <p className="mt-0.5 font-display text-2xl leading-none text-navy-900">38%</p>
                </div>
                <div className="float-tag absolute right-5 top-16 z-10 border border-steel-200 border-l-4 border-l-accent-500 bg-white px-4 py-3 shadow-xl shadow-navy-950/20" style={{ animationDelay: "1.2s" }}>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-accent-700">MODULE</p>
                  <p className="mt-0.5 font-display text-2xl leading-none text-navy-900">600 × 600 MM</p>
                </div>
              </div>

              <p className="mt-3 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">
                FIG. 01 — GEOMETRIC STAR PANEL · LIGHT STUDY · MOVE YOUR CURSOR
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Spec ticker                                                     */
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
/*  4. Key Features — spec-ledger rows                                 */
/* ------------------------------------------------------------------ */
const FEATURES = [
  {
    no: "01",
    icon: StrengthIcon,
    title: "High Strength & Durable",
    desc: "Alkali-resistant glass fibre inside a dense cement matrix — GRC carries impact, wind load and its own weight across a 50-year design life without creep or sag.",
    chips: ["40 MPa COMPRESSIVE", "IMPACT TESTED", "50-YR DESIGN LIFE"],
  },
  {
    no: "02",
    icon: WeatherIcon,
    title: "Weather & Corrosion Resistant",
    desc: "No steel to rust, no timber to rot. Freeze–thaw stable, salt-air safe for coastal sites, and UV-stable in natural cement or painted RAL finishes.",
    chips: ["NO RUST — AR FIBRE", "FREEZE–THAW STABLE", "COASTAL SAFE"],
  },
  {
    no: "03",
    icon: LightweightIcon,
    title: "Lightweight & Easy to Install",
    desc: "18–25 mm thin panels at roughly 60% the weight of solid RCC screens. Bolt-on SS anchor kits — no welding, no shuttering, no curing on site.",
    chips: ["60% LIGHTER THAN RCC", "BOLT-ON FIXING KITS", "NO WELDING ON SITE"],
  },
];

function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-paper py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">01 / KEY FEATURES</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                CAST STRONG.
                <br />
                BUILT TO STAY.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-steel-600 md:pb-2 md:text-right">
              Three properties that make GRC the screen material specifiers ask for by name.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 border-t border-navy-800">
          {FEATURES.map((f, i) => (
            <Reveal key={f.no} delay={i * 120}>
              <div className="group grid items-center gap-6 border-b border-steel-300 py-9 transition-colors duration-300 hover:bg-white md:grid-cols-12 md:gap-8 md:px-4">
                {/* ghost number */}
                <span className="font-display text-5xl leading-none text-steel-200 transition-colors duration-300 group-hover:text-accent-500 md:col-span-2">
                  {f.no}
                </span>

                {/* icon + title */}
                <div className="flex items-center gap-5 md:col-span-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-navy-800 text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-400">
                    <f.icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-[28px] leading-none tracking-[0.02em] text-navy-900">
                    {f.title}
                  </h3>
                </div>

                {/* description */}
                <p className="text-sm leading-relaxed text-steel-600 md:col-span-4">{f.desc}</p>

                {/* stat chips */}
                <div className="flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                  {f.chips.map((c) => (
                    <span
                      key={c}
                      className="border border-steel-300 bg-white px-2.5 py-1.5 font-mono text-[8.5px] tracking-[0.14em] text-navy-700 transition-colors duration-300 group-hover:border-accent-500"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Applications index                                              */
/* ------------------------------------------------------------------ */
const APPLICATIONS = [
  {
    code: "A1",
    glyph: FacadeGlyph,
    name: "Modern Façades",
    desc: "Brise-soleil screens, feature walls and full building wraps that give a facade depth and shadow.",
  },
  {
    code: "A2",
    glyph: VentGlyph,
    name: "Ventilation",
    desc: "Free cross-flow of air with rain-break geometry — privacy kept, stuffiness gone.",
  },
  {
    code: "A3",
    glyph: PartitionGlyph,
    name: "Partition Walls",
    desc: "Zone interiors without blocking light — offices, lobbies, restaurants and homes.",
  },
  {
    code: "A4",
    glyph: BalconyGlyph,
    name: "Balconies",
    desc: "Railing infills and privacy screens that shade harsh sun but keep the view soft.",
  },
  {
    code: "A5",
    glyph: LandscapeGlyph,
    name: "Landscape",
    desc: "Garden screens, pergola fins and boundary walls that age gracefully outdoors.",
  },
];

function Applications() {
  return (
    <section id="applications" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">02 / WHERE JALI WORKS</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                ONE PANEL,
                <br />
                FIVE JOBS.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-steel-600 md:pb-2 md:text-right">
              The same 600 mm module works across the entire envelope — inside and out.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-navy-800">
          {APPLICATIONS.map((a, i) => (
            <Reveal key={a.code} delay={i * 90}>
              <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-steel-200 py-6 transition-colors duration-300 hover:bg-navy-50 sm:grid-cols-[70px_56px_240px_1fr_auto] sm:gap-6 md:px-4">
                <span className="font-mono text-[11px] tracking-[0.22em] text-steel-400 transition-colors duration-300 group-hover:text-accent-700">
                  {a.code}
                </span>
                <span className="hidden h-11 w-11 items-center justify-center border border-navy-800 text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-400 sm:flex">
                  <a.glyph className="h-6 w-6" />
                </span>
                <h3 className="font-display text-[26px] leading-none tracking-[0.02em] text-navy-900">
                  {a.name}
                </h3>
                <p className="col-span-3 -mt-3 text-sm leading-relaxed text-steel-600 sm:col-span-1 sm:mt-0">
                  {a.desc}
                </p>
                <ArrowRight className="hidden h-5 w-5 text-steel-300 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent-600 sm:block" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Pattern Showcase                                                */
/* ------------------------------------------------------------------ */
const PATTERNS: {
  variant: JaliVariant;
  uid: string;
  code: string;
  name: string;
  tag?: string;
  module: string;
  open: string;
  desc: string;
  usedFor: string;
}[] = [
  {
    variant: "basket",
    uid: "p1",
    code: "BSP-JL-01",
    name: "Basket Weave",
    tag: "BEST SELLER",
    module: "600 × 600 MM",
    open: "34%",
    desc: "Over-and-under woven strips cast in concrete — a warm, textile texture for screens that should feel hand-made.",
    usedFor: "PARTITIONS · BALCONIES",
  },
  {
    variant: "star",
    uid: "p2",
    code: "BSP-JL-02",
    name: "Geometric Star",
    tag: "ARCHITECT PICK",
    module: "600 × 600 MM",
    open: "41%",
    desc: "The classic 8-point khatam star. Maximum open area in the range — strong shadows, stronger character.",
    usedFor: "FAÇADES · FEATURE WALLS",
  },
  {
    variant: "maze",
    uid: "p3",
    code: "BSP-JL-03",
    name: "Square Maze",
    module: "450 × 450 MM",
    open: "29%",
    desc: "A square labyrinth of concentric slots. More solid than open — ideal where privacy has to come first.",
    usedFor: "VENTILATION · BOUNDARIES",
  },
  {
    variant: "leaf",
    uid: "p4",
    code: "BSP-JL-04",
    name: "Leaf Pattern",
    module: "600 × 600 MM",
    open: "37%",
    desc: "Paired leaves on the diagonal with fine midribs — a softer, botanical register for homes and resorts.",
    usedFor: "LANDSCAPE · BALCONIES",
  },
  {
    variant: "brick",
    uid: "p5",
    code: "BSP-JL-05",
    name: "Brick Link",
    module: "600 × 300 MM",
    open: "31%",
    desc: "A running-bond brick screen with open perpends. Honest, industrial, and at home beside exposed concrete.",
    usedFor: "VENTILATION · BOUNDARIES",
  },
];

function Showcase() {
  return (
    <section id="patterns" className="scroll-mt-24 bg-paper bg-blueprint py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">03 / PATTERN LIBRARY</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                FIVE SIGNATURE
                <br />
                LATTICES. PLUS YOURS.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-steel-600 md:pb-2 md:text-right">
              Each preview below is the real tiling geometry, drawn to scale. Hover to see the
              night-shift view.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PATTERNS.map((p, i) => (
            <Reveal key={p.code} delay={(i % 3) * 110}>
              <article className="group flex h-full flex-col border border-steel-300 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-600 hover:shadow-[10px_10px_0_0_rgba(245,168,28,0.18)]">
                {/* real lattice preview — inverts to navy on hover */}
                <div className="relative h-52 overflow-hidden border-b border-steel-200 bg-navy-50 transition-colors duration-500 group-hover:border-navy-800 group-hover:bg-navy-950">
                  <JaliTile
                    variant={p.variant}
                    uid={p.uid}
                    className="h-full w-full text-navy-800 transition-all duration-700 group-hover:scale-110 group-hover:text-accent-400"
                  />
                  <div className="pointer-events-none absolute left-4 top-4 flex items-start justify-between gap-2">
                    <span className="font-mono text-[9.5px] tracking-[0.2em] text-steel-500 transition-colors duration-500 group-hover:text-navy-300">
                      {p.code}
                    </span>
                  </div>
                  {p.tag && (
                    <span className="absolute right-4 top-4 bg-accent-500 px-2 py-1 font-mono text-[8.5px] tracking-[0.18em] text-navy-950">
                      {p.tag}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[26px] tracking-[0.02em] text-navy-900">{p.name}</h3>
                    <span className="whitespace-nowrap font-mono text-[9px] tracking-[0.14em] text-accent-700">
                      OPEN {p.open}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">{p.desc}</p>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    <span className="font-mono text-[10px] tracking-[0.12em] text-steel-500">
                      MODULE {p.module}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.12em] text-steel-500">{p.usedFor}</span>
                  </div>

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

          {/* Custom pattern CTA cell */}
          <Reveal delay={220}>
            <a
              href="#quote"
              className="group flex h-full min-h-[420px] flex-col items-start justify-between border-2 border-dashed border-navy-400 bg-navy-50/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-600 hover:bg-navy-50"
            >
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-accent-700">
                  <StarMark className="h-3 w-3" /> BSP-JL-CUSTOM
                </span>
                <h3 className="mt-4 font-display text-[32px] leading-none tracking-[0.02em] text-navy-900">
                  YOUR PATTERN,
                  <br />
                  CAST IN GRC.
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-600">
                  Send a CAD file, a sketch, even a photograph of an old jali you love — we engrave
                  the mould and cast your motif to order.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 bg-navy-900 px-5 py-3.5 text-sm font-bold text-white transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-navy-950">
                Discuss a custom design
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Cinema band — full-bleed light-through-jali photograph          */
/* ------------------------------------------------------------------ */
function CinemaBand() {
  return (
    <section className="relative h-[56vh] min-h-[420px] overflow-hidden bg-navy-950" aria-label="Golden-hour light through GRC jali panels">
      <img
        src={FACADE_IMG}
        alt="Evening sunlight streaming through geometric GRC jali panels on a modern facade"
        className="kenburns absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-navy-950/40" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.28em] text-accent-400">
            FIG. 02 — 18:47, GOLDEN HOUR, GEOMETRIC STAR PANEL
          </p>
          <p className="mt-3 font-display text-5xl leading-[0.95] text-white sm:text-7xl">
            LIGHT DOES THE DETAILING.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Why GRC — comparison table                                      */
/* ------------------------------------------------------------------ */
const COMPARISON = [
  {
    label: "Material core",
    grc: "AR glass-fibre reinforced concrete",
    alt1: "Painted MS / powder-coated aluminium",
    alt2: "Fired terracotta / cement blocks",
  },
  {
    label: "Corrosion & rot",
    grc: "Immune — no rust, no rot",
    alt1: "MS rusts; alu oxidises",
    alt2: "Efflorescence & spalling",
  },
  {
    label: "Fire behaviour",
    grc: "Non-combustible, Class A1",
    alt1: "Steel conducts; alu softens at 660 °C",
    alt2: "Non-combustible",
  },
  {
    label: "Pattern freedom",
    grc: "Any motif, cast to order",
    alt1: "Limited to weld grids / CNC cuts",
    alt2: "Standard modules only",
  },
  {
    label: "Maintenance",
    grc: "Wash-down only",
    alt1: "Repaint / re-coat cycles",
    alt2: "Re-pointing & sealing",
  },
  {
    label: "Design life",
    grc: "50+ years",
    alt1: "15–20 years",
    alt2: "25–30 years",
  },
];

function WhyGrc() {
  return (
    <section id="why-grc" className="relative scroll-mt-24 overflow-hidden bg-navy-950 bg-blueprint-dark py-24 text-navy-100">
      <span
        className="text-outline-light pointer-events-none absolute -right-4 top-6 select-none font-display text-[11rem] leading-none md:text-[16rem]"
        aria-hidden="true"
      >
        GRC
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">04 / WHY GRC</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-white sm:text-6xl">
            AGAINST EVERY OTHER SCREEN.
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">PROPERTY</th>
                  <th className="relative border-x border-accent-500/25 bg-navy-800/70 p-4">
                    <span className="absolute -top-3 left-4 bg-accent-500 px-2 py-0.5 font-mono text-[9px] tracking-[0.18em] text-navy-950">
                      ★ RECOMMENDED
                    </span>
                    <span className="font-display text-xl tracking-[0.04em] text-white">GRC JALI</span>
                  </th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">MS / ALU JALI</th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">TERRACOTTA / CONCRETE</th>
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
                    <td className="p-4 text-sm text-navy-300">{row.alt1}</td>
                    <td className="p-4 text-sm text-navy-300">{row.alt2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-steel-500">
            * TYPICAL 600 × 600 × 20 MM PANEL · TEST REPORTS AVAILABLE ON REQUEST.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Stats band                                                      */
/* ------------------------------------------------------------------ */
const STATS = [
  { value: 25, suffix: "+", label: "Years in GRC & FRP" },
  { value: 640, suffix: "+", label: "Facade & villa projects" },
  { value: 32, suffix: "", label: "Standard patterns + custom" },
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
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  10. Process — sticky image + timeline                              */
/* ------------------------------------------------------------------ */
const PROCESS_STEPS = [
  {
    no: "1",
    title: "Choose a pattern — or send your own",
    desc: "Pick one of the five signatures, or share a CAD file, sketch or photo. We confirm module size and open area together.",
  },
  {
    no: "2",
    title: "Approve a sample tile",
    desc: "We cast a 600 × 600 sample in your chosen finish — natural cement or RAL painted. You sign off before the run.",
  },
  {
    no: "3",
    title: "Casting & curing",
    desc: "Hand-sprayed GRC, steam-cured and demoulded at our Taloja works. Every panel is QC-checked for edge sharpness and flatness.",
  },
  {
    no: "4",
    title: "Crated delivery & fixing",
    desc: "Foam-separated wooden crates, SS anchor kits inside, and our engineer on call while your site team fixes.",
  },
];

function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">05 / HOW WE WORK</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                FROM PATTERN
                <br />
                TO WALL, IN
                <br />
                FOUR STEPS.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-steel-600">
                A physical sample tile before production means what you approve is exactly what
                gets cast — no surprises on site.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative mt-9">
                <span className="absolute -left-2 -top-2 h-6 w-6 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
                <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />
                <div className="overflow-hidden border border-steel-300 bg-navy-900">
                  <img
                    src={WORKSHOP_IMG}
                    alt="Craftsman casting wet GRC into a jali lattice mould at the Blue Star workshop"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">
                  GRC CASTING SHOP — TALOJA MIDC, NAVI MUMBAI
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
                <Reveal key={step.no} delay={i * 130}>
                  <li className="group relative flex gap-6 pb-6">
                    <span className="z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-navy-800 bg-paper font-display text-xl text-navy-800 transition-colors duration-300 group-hover:border-accent-600 group-hover:bg-accent-500 group-hover:text-navy-950">
                      {step.no}
                    </span>
                    <div className="border border-steel-200 bg-paper p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-navy-800 group-hover:shadow-[8px_8px_0_0_rgba(21,44,79,0.07)]">
                      <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-700">STEP {step.no} / 4</p>
                      <h3 className="mt-2 font-display text-[24px] tracking-[0.02em] text-navy-900">{step.title}</h3>
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
/*  11. Quote form                                                     */
/* ------------------------------------------------------------------ */
type QuoteForm = {
  name: string;
  phone: string;
  email: string;
  city: string;
  pattern: string;
  application: string;
  area: string;
  message: string;
};

const EMPTY_FORM: QuoteForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  pattern: "Geometric Star",
  application: "Facade screen",
  area: "100–500 sq ft",
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
    setRefId(`BSP-JL-${Math.floor(1000 + Math.random() * 9000)}`);
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
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">06 / GET A QUOTE</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.02] text-white sm:text-6xl">
              SEND YOUR PATTERN.
              <br />
              QUOTED IN 24 HOURS.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-200">
              Tell us the pattern, the application and roughly how many square feet — our sales
              engineer replies with per-panel pricing and a finish recommendation.
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
              MON–SAT · 09:00–18:30 IST · WORKS VISITS BY APPOINTMENT
            </p>
          </Reveal>
        </div>

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
                    working hours with your quote for the {form.pattern} pattern.
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
                      <input id="q-name" type="text" value={form.name} onChange={set("name")} placeholder="e.g. Meera Krishnan" className={inputCls(!!errors.name)} />
                      {errors.name && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="q-phone" className={labelCls}>PHONE *</label>
                      <input id="q-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="10-digit mobile" className={inputCls(!!errors.phone)} />
                      {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="q-email" className={labelCls}>EMAIL</label>
                      <input id="q-email" type="email" value={form.email} onChange={set("email")} placeholder="you@company.in" className={inputCls(false)} />
                    </div>
                    <div>
                      <label htmlFor="q-city" className={labelCls}>CITY</label>
                      <input id="q-city" type="text" value={form.city} onChange={set("city")} placeholder="e.g. Ahmedabad" className={inputCls(false)} />
                    </div>
                    <div>
                      <label htmlFor="q-pattern" className={labelCls}>PATTERN</label>
                      <select id="q-pattern" value={form.pattern} onChange={set("pattern")} className={inputCls(false)}>
                        <option>Basket Weave</option>
                        <option>Geometric Star</option>
                        <option>Square Maze</option>
                        <option>Leaf Pattern</option>
                        <option>Brick Link</option>
                        <option>Custom pattern</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q-app" className={labelCls}>APPLICATION</label>
                      <select id="q-app" value={form.application} onChange={set("application")} className={inputCls(false)}>
                        <option>Facade screen</option>
                        <option>Ventilation</option>
                        <option>Partition wall</option>
                        <option>Balcony</option>
                        <option>Landscape</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="q-area" className={labelCls}>APPROX. AREA</label>
                      <select id="q-area" value={form.area} onChange={set("area")} className={inputCls(false)}>
                        <option>Under 100 sq ft</option>
                        <option>100–500 sq ft</option>
                        <option>500–2,000 sq ft</option>
                        <option>2,000+ sq ft (project supply)</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="q-msg" className={labelCls}>ANYTHING ELSE?</label>
                      <textarea id="q-msg" rows={3} value={form.message} onChange={set("message")} placeholder="Finish, colours, drawings, deadlines…" className={inputCls(false)} />
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
/*  12. Footer                                                         */
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
            Manufacturer of premium FRP and GRC architectural products — jali panels, chajjas,
            domes, cornices and custom facade elements — since 2001.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["ISO 9001:2015", "FRP · GRC SPECIALISTS", "MADE IN INDIA"].map((b) => (
              <span key={b} className="border border-navy-700 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.18em] text-steel-400">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">PATTERNS</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {["Basket Weave", "Geometric Star", "Square Maze", "Leaf Pattern", "Brick Link", "Custom Designs"].map((p) => (
              <li key={p}>
                <a href="#patterns" className="nav-underline text-navy-200 transition-colors hover:text-white">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">THIS PAGE</h4>
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
              GRC JALI PANELS · LANDING PAGE 02 / 10
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
        <Hero />
        <Ticker />
        <Features />
        <Applications />
        <Showcase />
        <CinemaBand />
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
