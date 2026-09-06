/**
 * Shared design-system components used by the home page and all ten
 * product landing pages. Navy / steel / off-white with safety-amber accents.
 */
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { PRODUCTS } from "./data";
import type { Product } from "./data";
import { CorniceSection, ColumnExploded, Drawing } from "./drawings";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
export const PHONE_DISPLAY = "+91 91520 91020";
export const PHONE_TEL = "tel:+919152091020";
export const EMAIL = "sales@bluestarplastic.in";
export const ADDRESS = "Plot 42, MIDC Industrial Area, Taloja, Navi Mumbai — 410208";

/* ------------------------------------------------------------------ */
/*  Motion helpers                                                     */
/* ------------------------------------------------------------------ */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
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

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant,
  gentle = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** AOS-style direction: fade (opacity only) · left · right · zoom. Omit for fade-up. */
  variant?: "fade" | "left" | "right" | "zoom";
  /** Shorter travel + slower ease — for card grids that should rise gently. */
  gentle?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-aos={variant}
      className={`reveal ${gentle ? "reveal-gentle" : ""} ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function CountUp({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
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

/** True when the user prefers reduced motion. */
const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/*  GoLink — one link component for routes, anchors and combinations   */
/* ------------------------------------------------------------------ */
export function GoLink({
  to,
  className = "",
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
  };

  // In-page anchor, e.g. "#quote"
  if (to.startsWith("#")) {
    return (
      <a
        href={to}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          scrollTo(to.slice(1));
          onClick?.();
        }}
      >
        {children}
      </a>
    );
  }

  // Route, optionally with an anchor: "/p/frp-chajjas#quote"
  const [path, anchor] = to.split("#");
  return (
    <Link
      to={path}
      className={className}
      onClick={() => {
        if (anchor) setTimeout(() => scrollTo(anchor), 120);
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Icon library (hand-drawn inline SVG)                               */
/* ------------------------------------------------------------------ */
const I = {
  shield: (
    <>
      <path d="M24 4.5 39 10v12c0 10.5-6.2 17.6-15 21C15.2 39.6 9 32.5 9 22V10Z" />
      <circle cx="24" cy="18" r="4.5" />
      <path d="M24 10.5v2.2M24 23.3v2.2M16.5 18h2.2M29.3 18h2.2M18.7 12.7l1.5 1.5M27.8 21.8l1.5 1.5M29.3 12.7l-1.5 1.5M20.2 21.8l-1.5 1.5" />
      <path d="M18.5 29.5 17 34M24.5 29.5 23 34M30.5 29.5 29 34" />
    </>
  ),
  dropcross: (
    <>
      <path d="M24 9C24 9 13 22.5 13 30a11 11 0 0 0 22 0C35 22.5 24 9 24 9Z" />
      <path d="M18.5 31a5.5 5.5 0 0 0 4 5.3" />
      <path d="M8 8l32 32" />
      <path d="M39.5 8.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" strokeWidth="1" />
    </>
  ),
  leaf: (
    <>
      <path d="M36.5 10.5C20 12.5 11.5 22.5 12 37c14.5-.5 23.5-9.5 24.5-26.5Z" />
      <path d="M14.5 35C18 26.5 25 19.5 33.5 14" />
      <path d="M40 29a11.5 11.5 0 0 1-7.5 10.5" />
      <path d="m32.5 36 0 4 4-1.5" />
      <path d="M8 19a11.5 11.5 0 0 1 7.5-10.5" />
      <path d="M15.5 12.5v-4l-4 1.5" />
    </>
  ),
  wall: (
    <>
      <rect x="8" y="10" width="32" height="28" />
      <path d="M8 19.3h32M8 28.6h32" strokeWidth="1.4" />
      <path d="M18.7 10v9.3M29.3 10v9.3M13.3 19.3v9.3M24 19.3v9.3M34.7 19.3v9.3M18.7 28.6V38M29.3 28.6V38" strokeWidth="1.4" />
    </>
  ),
  storm: (
    <>
      <path d="M13 22a7 7 0 0 1 .8-13.9A9 9 0 0 1 31 10a6.5 6.5 0 0 1 3 12.3" />
      <path d="M15 29l-2.5 7M23 29l-2.5 7M31 29l-2.5 7" />
      <path d="M26 14l-4 7h5l-4 7" strokeWidth="1.6" />
    </>
  ),
  feather: (
    <>
      <path d="M37 11C27 12 17 19 14 33c13-1 21-8 23-22Z" />
      <path d="M14 33 9 39" />
      <path d="M19 28c4 .5 8-.5 11-3M22 22c3 .5 6-.3 8-2" strokeWidth="1.3" />
    </>
  ),
  trowel: (
    <>
      <path d="M8 30 26 12l6 6-22 16Z" />
      <path d="m30 16 6-6 4 4-6 6" />
      <path d="m36 20 3 3" />
      <path d="M10 34c0 3 2 5 5 5" strokeWidth="1.6" />
    </>
  ),
  shieldcheck: (
    <>
      <path d="M24 4.5 39 10v12c0 10.5-6.2 17.6-15 21C15.2 39.6 9 32.5 9 22V10Z" />
      <path d="m17 22.5 5 5 9.5-10" />
    </>
  ),
  compass: (
    <>
      <circle cx="24" cy="9" r="3.5" />
      <path d="M22 12.2 13 38M26 12.2 35 38" />
      <path d="M17.5 27a13 13 0 0 0 13 0" strokeWidth="1.5" />
      <path d="m13 38-1.5 4M35 38l1.5 4" />
    </>
  ),
  ibeam: (
    <>
      <path d="M10 9h28M10 39h28" />
      <path d="M10 9v5h9v20h-9v5M38 9v5h-9v20h9v5" />
      <path d="M19 14v20M29 14v20" strokeWidth="1.3" />
    </>
  ),
  wrench: (
    <>
      <path d="M38 14.5a8.5 8.5 0 0 1-11.4 10L14 37a3.2 3.2 0 0 1-4.5-4.5l12.4-12.6A8.5 8.5 0 0 1 32.5 8.5L27 14l1 4 4 1Z" />
    </>
  ),
  drop: (
    <>
      <path d="M24 7C24 7 14 19.5 14 27a10 10 0 0 0 20 0C34 19.5 24 7 24 7Z" />
      <path d="M19 28a5 5 0 0 0 3.6 4.8" />
      <path d="M8 42c2.7 0 2.7 2 5.3 2s2.7-2 5.4-2 2.6 2 5.3 2 2.7-2 5.3-2 2.7 2 5.4 2 2.6-2 5.3-2" strokeWidth="1.6" />
    </>
  ),
  grid: (
    <>
      <rect x="9" y="9" width="13" height="13" />
      <rect x="26" y="9" width="13" height="13" />
      <rect x="9" y="26" width="13" height="13" />
      <rect x="26" y="26" width="13" height="13" />
    </>
  ),
  flame: (
    <>
      <path d="M24 6c2 6-6 9-6 17a9.5 9.5 0 0 0 19 0c0-5-3-8-4-11-1 2-3 3-3 5-1.5-3-2-8-6-11Z" />
      <path d="M24 38a5 5 0 0 1-5-5c0-3 3-4.5 5-8 2 3.5 5 5 5 8a5 5 0 0 1-5 5Z" strokeWidth="1.5" />
    </>
  ),
  bug: (
    <>
      <ellipse cx="24" cy="27" rx="9" ry="11" />
      <path d="M24 16v22" strokeWidth="1.3" />
      <path d="M20 13a4.5 4.5 0 0 1 8 0" />
      <path d="M15 22l-6-3M15 29H7M16 35l-6 4M33 22l6-3M33 29h8M32 35l6 4" strokeWidth="1.5" />
      <path d="M9 9l30 30" />
    </>
  ),
  sun: (
    <>
      <circle cx="24" cy="24" r="7" />
      <path d="M24 8v4M24 36v4M8 24h4M36 24h4M12.7 12.7l2.8 2.8M32.5 32.5l2.8 2.8M35.3 12.7l-2.8 2.8M15.5 32.5l-2.8 2.8" />
    </>
  ),
  wind: (
    <>
      <path d="M7 18h22a4.5 4.5 0 1 0-4.5-4.5" />
      <path d="M7 26h30a4.5 4.5 0 1 1-4.5 4.5" />
      <path d="M7 34h14a3.5 3.5 0 1 1-3.5 3.5" />
    </>
  ),
  partition: (
    <>
      <rect x="10" y="9" width="11" height="30" />
      <rect x="27" y="9" width="11" height="30" />
      <path d="M23.5 14l-3 3 3 3M24.5 24l3 3-3 3" strokeWidth="1.5" />
    </>
  ),
  railing: (
    <>
      <path d="M8 14h32M8 18.5h32" />
      <path d="M13 18.5v16M21 18.5c-2.5 3-2.5 7 0 10v6M21 18.5c2.5 3 2.5 7 0 10M29 18.5v16M35 18.5v16" strokeWidth="1.7" />
      <path d="M8 38h32" />
    </>
  ),
  tree: (
    <>
      <circle cx="24" cy="17" r="8" />
      <circle cx="16" cy="23" r="5.5" />
      <circle cx="32" cy="23" r="5.5" />
      <path d="M24 28v11M20 42h8" />
    </>
  ),
  home: (
    <>
      <path d="M8 22 24 9l16 13" />
      <path d="M11 20v19h26V20" />
      <path d="M11 22.5h26" strokeWidth="1.4" />
      <rect x="20" y="29" width="8" height="10" strokeWidth="1.6" />
    </>
  ),
  tower: (
    <>
      <rect x="14" y="13" width="20" height="26" />
      <path d="M12 13h24M11 9.5h26" />
      <path d="M19 19h3M26 19h3M19 25h3M26 25h3M19 31h3M26 31h3" strokeWidth="1.6" />
      <path d="M21 39v-4h6v4" strokeWidth="1.6" />
    </>
  ),
  keystone: (
    <>
      <path d="M9 38V24a15 15 0 0 1 30 0v14" />
      <path d="M20 14.5 24 10l4 4.5L26 38h-4Z" strokeWidth="1.6" />
      <path d="M6 38h36" />
    </>
  ),
  villa: (
    <>
      <path d="M7 18h34M9 14.5h30" />
      <path d="M12 18v16M20 18v16M28 18v16M36 18v16" />
      <path d="M8 38h32M8 34h32" strokeWidth="1.5" />
    </>
  ),
  factory: (
    <>
      <path d="M8 38V20l8 6v-6l8 6v-6l8 6V12h8v26" />
      <path d="M5 38h38" />
      <path d="M13 32h4M22 32h4M31 32h4" strokeWidth="1.6" />
    </>
  ),
  cross: (
    <>
      <path d="M24 4.5 39 10v12c0 10.5-6.2 17.6-15 21C15.2 39.6 9 32.5 9 22V10Z" />
      <path d="M24 15v14M17 22h14" />
    </>
  ),
  waves: (
    <>
      <path d="M6 17c3 0 3 2.5 6 2.5s3-2.5 6-2.5 3 2.5 6 2.5 3-2.5 6-2.5 3 2.5 6 2.5 3-2.5 6-2.5" />
      <path d="M6 25c3 0 3 2.5 6 2.5s3-2.5 6-2.5 3 2.5 6 2.5 3-2.5 6-2.5 3 2.5 6 2.5 3-2.5 6-2.5" />
      <path d="M6 33c3 0 3 2.5 6 2.5s3-2.5 6-2.5 3 2.5 6 2.5 3-2.5 6-2.5 3 2.5 6 2.5 3-2.5 6-2.5" />
    </>
  ),
  domebase: (
    <>
      <path d="M14 26a10 10 0 0 1 20 0" />
      <path d="M24 16v10M18 18.5v7.5M30 18.5v7.5" strokeWidth="1.3" />
      <rect x="12" y="26" width="24" height="5" strokeWidth="1.6" />
      <path d="M10 36h28M14 31v5M34 31v5" strokeWidth="1.6" />
      <circle cx="24" cy="13" r="1.8" strokeWidth="1.3" />
    </>
  ),
};

export type IconName = keyof typeof I;

export function Icon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {I[name as IconName] ?? I.shield}
    </svg>
  );
}

/* small utility icons */
export function StarMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0 14.6 9.4 24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6Z" fill="currentColor" />
    </svg>
  );
}
export function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
export function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}
export function PinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
export function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}
export function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4 12.5 5.5 5.5L20 6.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */
/**
 * Products dropdown — click-controlled, grouped by material family,
 * with the current sheet highlighted. Closes on outside click / Escape.
 */
function ProductsDropdown({
  light,
  open,
  onToggle,
  currentPath,
}: {
  light: boolean;
  open: boolean;
  onToggle: () => void;
  currentPath: string;
}) {
  const frp = PRODUCTS.filter((p) => p.family === "FRP");
  const grc = PRODUCTS.filter((p) => p.family === "GRC");

  const col = (title: string, items: Product[]) => (
    <div>
      <p className="font-mono text-[9px] tracking-[0.3em] text-accent-400">
        {title} · {String(items.length).padStart(2, "0")}
      </p>
      <ul className="mt-3 space-y-1.5">
        {items.map((p) => {
          const active = currentPath === `/p/${p.slug}`;
          return (
            <li key={p.slug}>
              <Link
                to={`/p/${p.slug}`}
                aria-current={active ? "page" : undefined}
                className="group/item flex items-baseline gap-2.5 py-0.5 text-sm transition-colors hover:text-accent-300"
              >
                <span className="font-mono text-[9px] tracking-wider text-steel-500 transition-colors group-hover/item:text-accent-500">
                  {p.code}
                </span>
                <span className={active ? "font-semibold text-accent-400" : "text-navy-100"}>{p.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="relative hidden md:block">
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={open}
        className={`nav-underline flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] transition-colors ${
          open ? "text-accent-500" : light ? "text-navy-100 hover:text-white" : "text-navy-700 hover:text-navy-950"
        }`}
      >
        PRODUCTS
        <svg
          viewBox="0 0 24 24"
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
        }`}
      >
        <div className="w-[540px] border border-navy-700 bg-navy-950 shadow-2xl shadow-navy-950/60">
          <div className="flex items-center justify-between border-b border-navy-800 px-6 py-3.5">
            <p className="font-mono text-[9px] tracking-[0.3em] text-steel-400">
              PRODUCT REGISTER · {PRODUCTS.length} SHEETS
            </p>
            <StarMark className="h-3 w-3 text-accent-500" />
          </div>
          <div className="grid grid-cols-2 gap-8 px-6 py-5">
            {col("FRP RANGE", frp)}
            {col("GRC RANGE", grc)}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-navy-800 bg-navy-900/60 px-6 py-3.5">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-navy-200 transition-colors hover:text-accent-400"
            >
              <PhoneIcon className="h-3.5 w-3.5 text-accent-500" />
              CALL {PHONE_DISPLAY}
            </a>
            <GoLink
              to="/#register"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-accent-400 transition-colors hover:text-accent-300"
            >
              FULL REGISTER <ArrowRight className="h-3 w-3" />
            </GoLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header({ mode }: { mode: "home" | "product" }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

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

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Reset menus on navigation
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
    setMobileProducts(false);
  }, [pathname]);

  const light = scrolled || menuOpen;
  const contactTo = mode === "home" ? "#contact" : "#quote";
  const frp = PRODUCTS.filter((p) => p.family === "FRP");
  const grc = PRODUCTS.filter((p) => p.family === "GRC");

  const mobileProductLinks = (title: string, items: Product[]) => (
    <div className="py-2">
      <p className="font-mono text-[9px] tracking-[0.3em] text-accent-400">{title}</p>
      <ul className="mt-2">
        {items.map((p) => (
          <li key={p.slug}>
            <GoLink
              to={`/p/${p.slug}`}
              onClick={() => setMenuOpen(false)}
              className={`flex items-baseline gap-2.5 border-b border-navy-800/60 py-2.5 text-sm transition-colors hover:text-accent-400 ${
                pathname === `/p/${p.slug}` ? "font-semibold text-accent-400" : "text-navy-100"
              }`}
            >
              <span className="font-mono text-[9px] tracking-wider text-steel-500">{p.code}</span>
              {p.name}
            </GoLink>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        light ? "bg-navy-950 shadow-lg shadow-navy-950/30" : "bg-paper/95"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <GoLink to="/" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)} aria-label="Blue Star Plastic Industries — home">
          {/* logo placeholder — amber star on a navy plate */}
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-accent-500 bg-navy-950 transition-shadow duration-300 group-hover:shadow-[0_0_0_3px_rgba(245,168,28,0.25)]">
            <StarMark className="h-5 w-5 text-accent-500 transition-transform duration-300 group-hover:rotate-45" />
          </span>
          <span className="leading-none">
            <span className={`block font-display text-[22px] tracking-[0.06em] ${light ? "text-white" : "text-navy-900"}`}>
              BLUE STAR
            </span>
            <span className="mt-0.5 block font-mono text-[8.5px] tracking-[0.34em] text-accent-600">
              PLASTIC INDUSTRIES
            </span>
          </span>
        </GoLink>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <GoLink
            to="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`nav-underline font-mono text-[11px] tracking-[0.18em] transition-colors ${
              pathname === "/"
                ? "text-accent-600"
                : light
                  ? "text-navy-100 hover:text-white"
                  : "text-navy-700 hover:text-navy-950"
            }`}
          >
            HOME
          </GoLink>
          <div ref={dropRef}>
            <ProductsDropdown
              light={light}
              open={dropOpen}
              onToggle={() => setDropOpen((v) => !v)}
              currentPath={pathname}
            />
          </div>
        </nav>

        <div className="flex items-center gap-2.5">
          <GoLink
            to={contactTo}
            className="group/cta inline-flex items-center gap-2 bg-accent-500 px-3.5 py-2.5 text-xs font-bold tracking-wide text-navy-950 shadow-[3px_3px_0_0_var(--color-navy-800)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-accent-400 hover:shadow-[1px_1px_0_0_var(--color-navy-800)] sm:px-5 sm:text-[13px]"
          >
            <MailIcon className="h-4 w-4" />
            <span className="whitespace-nowrap">Contact Us</span>
            <ArrowRight className="hidden h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1 sm:block" />
          </GoLink>

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
        <nav className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-navy-800 bg-navy-950 px-6 pb-8 pt-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col">
            {/* Home */}
            <GoLink
              to="/"
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === "/" ? "page" : undefined}
              className={`border-b border-navy-800/70 py-3.5 font-mono text-xs tracking-[0.2em] transition-colors hover:text-accent-400 ${
                pathname === "/" ? "text-accent-400" : "text-navy-100"
              }`}
            >
              HOME
            </GoLink>

            {/* Products accordion */}
            <button
              type="button"
              onClick={() => setMobileProducts((v) => !v)}
              aria-expanded={mobileProducts}
              className="flex w-full items-center justify-between border-b border-navy-800/70 py-3.5 font-mono text-xs tracking-[0.2em] text-navy-100 transition-colors hover:text-accent-400"
            >
              <span className="flex items-center gap-2.5">
                PRODUCTS
                <span className="border border-accent-500/60 px-1.5 py-0.5 font-mono text-[9px] text-accent-400">
                  {PRODUCTS.length}
                </span>
              </span>
              <svg
                viewBox="0 0 24 24"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileProducts ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {mobileProducts && (
              <div className="border-b border-navy-800/70 pl-1">
                {mobileProductLinks("FRP RANGE", frp)}
                {mobileProductLinks("GRC RANGE", grc)}
              </div>
            )}

            {/* Contact Us CTA + phone fallback */}
            <GoLink
              to={contactTo}
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-accent-500 px-4 py-3.5 text-sm font-bold text-navy-950 transition-colors hover:bg-accent-400"
            >
              <MailIcon className="h-4 w-4" />
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </GoLink>
            <a
              href={PHONE_TEL}
              className="mt-4 inline-flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.2em] text-navy-200 transition-colors hover:text-accent-400"
            >
              <PhoneIcon className="h-3.5 w-3.5 text-accent-500" />
              OR CALL {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Ticker                                                             */
/* ------------------------------------------------------------------ */
export function Ticker({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div className="flex items-center" aria-hidden={hidden}>
      {items.map((item) => (
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
/*  Section heading helper                                             */
/* ------------------------------------------------------------------ */
export function SectionHead({
  kicker,
  title,
  aside,
  dark = false,
}: {
  kicker: string;
  title: string[];
  aside?: string;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={`font-mono text-[11px] tracking-[0.3em] ${dark ? "text-accent-400" : "text-accent-700"}`}>{kicker}</p>
          <h2 className={`mt-3 font-display text-5xl leading-none sm:text-6xl ${dark ? "text-white" : "text-navy-900"}`}>
            {title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>
        {aside && (
          <p className={`max-w-xs text-sm leading-relaxed md:pb-2 md:text-right ${dark ? "text-navy-200" : "text-steel-600"}`}>
            {aside}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Quote form (shared)                                                */
/* ------------------------------------------------------------------ */
const inputCls = (invalid: boolean) =>
  `w-full border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-steel-400 focus:ring-2 ${
    invalid
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
      : "border-steel-300 focus:border-accent-600 focus:ring-accent-500/30"
  }`;

const labelCls = "mb-1.5 block font-mono text-[10.5px] tracking-[0.18em] text-steel-600";

export function QuoteSection({ product }: { product: Product }) {
  const empty = { name: "", phone: "", email: "", city: "", sel0: product.quote.selects[0]?.options[0] ?? "", sel1: product.quote.selects[1]?.options[0] ?? "", qty: product.quote.qtyOptions[0], message: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const set = (key: string) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));

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

  return (
    <section id="quote" className="relative scroll-mt-24 overflow-hidden bg-navy-950 bg-blueprint-dark py-24 text-navy-100">
      <span className="text-outline-light pointer-events-none absolute -bottom-10 -left-4 select-none font-display text-[9rem] leading-none md:text-[15rem]" aria-hidden="true">
        QUOTE
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">GET A QUOTE</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.02] text-white sm:text-6xl">
              {product.quote.heading.split(" ").map((w, i, arr) => (
                <span key={i} className="inline-block">
                  {w}
                  {i < arr.length - 1 ? "\u00A0" : ""}
                  {(i + 1) % 2 === 0 && <br />}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-200">{product.quote.sub}</p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10 space-y-4">
              <a href={PHONE_TEL} className="group flex items-center gap-4 border border-navy-800 bg-navy-900/60 p-5 transition-colors hover:border-accent-500">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-navy-700 text-accent-400">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.25em] text-steel-400">SALES DESK</span>
                  <span className="mt-1 block text-lg font-semibold text-white transition-colors group-hover:text-accent-300">{PHONE_DISPLAY}</span>
                </span>
              </a>
              <a href={`mailto:${EMAIL}`} className="group flex items-center gap-4 border border-navy-800 bg-navy-900/60 p-5 transition-colors hover:border-accent-500">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-navy-700 text-accent-400">
                  <MailIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.25em] text-steel-400">EMAIL US</span>
                  <span className="mt-1 block break-all text-lg font-semibold text-white transition-colors group-hover:text-accent-300">{EMAIL}</span>
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
            <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-steel-500">MON–SAT · 09:00–18:30 IST · SITE VISITS BY APPOINTMENT</p>
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
                    REF {refId} · LOGGED {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
                  </p>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-steel-600">
                    Thanks, {form.name.split(" ")[0]} — our sales engineer will call <span className="font-semibold text-navy-800">{form.phone}</span>{" "}
                    within 24 working hours with your custom {product.name.toLowerCase()} quote.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(empty);
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
                      <input id="q-name" type="text" value={form.name} onChange={set("name")} placeholder="e.g. Rajesh Patil" className={inputCls(!!errors.name)} />
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
                      <input id="q-city" type="text" value={form.city} onChange={set("city")} placeholder="e.g. Pune" className={inputCls(false)} />
                    </div>
                    {product.quote.selects.map((s, i) => (
                      <div key={s.label}>
                        <label htmlFor={`q-sel${i}`} className={labelCls}>{s.label}</label>
                        <select id={`q-sel${i}`} value={i === 0 ? form.sel0 : form.sel1} onChange={set(i === 0 ? "sel0" : "sel1")} className={inputCls(false)}>
                          {s.options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                    <div className={product.quote.selects.length % 2 === 0 ? "" : "sm:col-span-2"}>
                      <label htmlFor="q-qty" className={labelCls}>{product.quote.qtyLabel}</label>
                      <select id="q-qty" value={form.qty} onChange={set("qty")} className={inputCls(false)}>
                        {product.quote.qtyOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="q-msg" className={labelCls}>ANYTHING ELSE?</label>
                      <textarea id="q-msg" rows={3} value={form.message} onChange={set("message")} placeholder="Colours, drawings, site photos, deadlines…" className={inputCls(false)} />
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
/*  Anatomy section (interactive exploded drawings)                    */
/* ------------------------------------------------------------------ */
export function AnatomySection({ product, kicker }: { product: Product; kicker: string }) {
  const a = product.anatomy;
  const [active, setActive] = useState<number | null>(null);
  if (!a) return null;

  return (
    <section id="anatomy" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">{kicker}</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.02] text-navy-900 sm:text-6xl">
              {a.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-steel-600">{a.intro}</p>
          </Reveal>

          <div className="mt-9 space-y-3">
            {a.parts.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
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

        <div className="lg:col-span-7">
          <Reveal delay={150}>
            <div className="relative border border-steel-300 bg-navy-50 p-6 sm:p-10">
              <span className="absolute left-4 top-4 font-mono text-[9.5px] tracking-[0.25em] text-steel-500">{a.drawing === "cornice" ? "MOULDING SECTION — ANNOTATED" : "SPLIT-SHELL CONSTRUCTION — EXPLODED"}</span>
              <div className="pt-8">
                {a.drawing === "cornice" ? <CorniceSection active={active} /> : <ColumnExploded active={active} />}
              </div>
              <p className="mt-4 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">{a.caption}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WhatsApp glyph + floating action button (all pages)                */
/* ------------------------------------------------------------------ */
function WhatsAppGlyph({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 6.98 3.86Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-3.35-2.93c-.25-.43.25-.4.72-1.35.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export const WHATSAPP_URL = `https://wa.me/919152091020?text=${encodeURIComponent(
  "Hi Blue Star! I'd like a quote for your FRP / GRC products."
)}`;

/** Fixed bottom-right WhatsApp button with sonar ring and hover label. */
export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Blue Star Plastic Industries on WhatsApp — +91 91520 91020"
      className="group fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7"
    >
      {/* sonar ring */}
      <span className="wa-ping absolute inset-0 bg-[#25D366]/60" aria-hidden="true" />
      {/* button */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-navy-950/40 ring-2 ring-white/80 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        <WhatsAppGlyph className="h-7 w-7" />
      </span>
      {/* slide-out label */}
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap border border-navy-700 bg-navy-950 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-navy-100 opacity-0 shadow-xl shadow-navy-950/40 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 sm:block">
        CHAT ON WHATSAPP · +91 91520 91020
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Request a Quote — unified, high-conversion contact section         */
/* ------------------------------------------------------------------ */
type RQForm = { name: string; phone: string; email: string; interest: string };
const RQ_EMPTY: RQForm = { name: "", phone: "", email: "", interest: "" };

export function RequestQuoteSection() {
  const [form, setForm] = useState<RQForm>(RQ_EMPTY);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; interest?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const frp = PRODUCTS.filter((p) => p.family === "FRP");
  const grc = PRODUCTS.filter((p) => p.family === "GRC");

  const set = (key: keyof RQForm) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a valid 10-digit mobile number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "That email doesn't look right.";
    if (!form.interest) next.interest = "Pick the product you're interested in.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setRefId(`BSP-Q-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
  };

  const labelCls = "mb-1.5 block font-mono text-[10.5px] tracking-[0.18em] text-steel-600";
  const inputCls = (invalid: boolean) =>
    `w-full border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-steel-400 focus:ring-2 ${
      invalid
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
        : "border-steel-300 focus:border-accent-600 focus:ring-accent-500/30"
    }`;

  return (
    <section id="request-quote" className="relative scroll-mt-24 overflow-hidden bg-navy-950 bg-blueprint-dark py-24 text-navy-100">
      {/* oversized hollow watermark */}
      <span
        className="text-outline-light pointer-events-none absolute -top-6 right-0 select-none font-display text-[9rem] leading-none md:text-[14rem]"
        aria-hidden="true"
      >
        24 HRS
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Trust rail */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">REQUEST A QUOTE</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.02] text-white sm:text-6xl">
              TELL US WHAT
              <br />
              YOU'RE <span className="text-accent-400">BUILDING.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-200">
              Four fields, thirty seconds. A sales engineer calls you back with pricing, specs and
              samples for exactly what your project needs.
            </p>
          </Reveal>

          <Reveal delay={140}>
            {/* live desk indicator */}
            <div className="mt-8 inline-flex items-center gap-3 border border-navy-700 bg-navy-900/70 px-4 py-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-500" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-navy-100">
                SALES DESK ONLINE · MON–SAT 09:00–18:30 IST
              </span>
            </div>
          </Reveal>

          {/* what happens next — numbered ledger, not cards */}
          <Reveal delay={200}>
            <div className="mt-9">
              <p className="font-mono text-[9.5px] tracking-[0.3em] text-steel-400">WHAT HAPPENS NEXT</p>
              <ol className="mt-4">
                {[
                  { t: "We call you back", d: "Within 24 working hours — usually the same day." },
                  { t: "You get a custom quote", d: "Per-unit pricing, sizes, colours and a CAD/spec sheet." },
                  { t: "Samples on request", d: "Gelcoat chips or a sample piece before you commit." },
                ].map((s, i) => (
                  <li key={s.t} className="group flex gap-4 border-t border-navy-800 py-4 transition-colors last:border-b hover:bg-navy-900/50">
                    <span className="font-display text-2xl leading-none text-steel-500 transition-colors group-hover:text-accent-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{s.t}</span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-navy-300">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* direct lines */}
          <Reveal delay={260}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-2.5 border border-navy-700 px-5 py-3 font-mono text-[10.5px] tracking-[0.16em] text-navy-100 transition-colors hover:border-accent-500 hover:text-accent-300"
              >
                <PhoneIcon className="h-4 w-4 text-accent-500" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-navy-700 px-5 py-3 font-mono text-[10.5px] tracking-[0.16em] text-navy-100 transition-colors hover:border-[#25D366] hover:text-[#25D366]"
              >
                <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" />
                WHATSAPP US
              </a>
            </div>
          </Reveal>
        </div>

        {/* The form card */}
        <div className="lg:col-span-7">
          <Reveal delay={180}>
            <div className="border-t-4 border-accent-500 bg-paper p-7 text-ink shadow-2xl shadow-navy-950/50 sm:p-10">
              {submitted ? (
                <div className="py-8 text-center">
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
                    working hours about <span className="font-semibold text-navy-800">{form.interest}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(RQ_EMPTY);
                      setSubmitted(false);
                    }}
                    className="mt-8 inline-flex items-center gap-2 border-2 border-navy-800 px-6 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-800 hover:text-white"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className="font-display text-3xl text-navy-900">REQUEST A QUOTE</h3>
                  <p className="mt-1 text-sm text-steel-600">
                    Fields marked <span className="font-bold text-accent-700">*</span> are required.
                  </p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="rq-name" className={labelCls}>
                        NAME *
                      </label>
                      <input
                        id="rq-name"
                        type="text"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="e.g. Ar. Kavita Rao"
                        className={inputCls(!!errors.name)}
                      />
                      {errors.name && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="rq-phone" className={labelCls}>
                        PHONE NUMBER *
                      </label>
                      <input
                        id="rq-phone"
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="10-digit mobile"
                        className={inputCls(!!errors.phone)}
                      />
                      {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="rq-email" className={labelCls}>
                        EMAIL
                      </label>
                      <input
                        id="rq-email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@company.in"
                        className={inputCls(!!errors.email)}
                      />
                      {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="rq-interest" className={labelCls}>
                        PRODUCT INTEREST *
                      </label>
                      <select
                        id="rq-interest"
                        value={form.interest}
                        onChange={set("interest")}
                        className={inputCls(!!errors.interest)}
                      >
                        <option value="" disabled>
                          Select a product…
                        </option>
                        <optgroup label="FRP RANGE">
                          {frp.map((p) => (
                            <option key={p.slug} value={p.name}>
                              {p.code} — {p.name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="GRC RANGE">
                          {grc.map((p) => (
                            <option key={p.slug} value={p.name}>
                              {p.code} — {p.name}
                            </option>
                          ))}
                        </optgroup>
                        <option value="Not sure yet — advise me">Not sure yet — advise me</option>
                      </select>
                      {errors.interest && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.interest}</p>}
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
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
export function Footer({ mode, pageNo }: { mode: "home" | "product"; pageNo?: string }) {
  const frp = PRODUCTS.filter((p) => p.family === "FRP");
  const grc = PRODUCTS.filter((p) => p.family === "GRC");

  const companyLinks =
    mode === "home"
      ? [
          { label: "The Register", to: "#register" },
          { label: "FRP Range", to: "#frp" },
          { label: "GRC Range", to: "#grc" },
          { label: "Contact", to: "#contact" },
        ]
      : [
          { label: "Advantages", to: "#features" },
          { label: "Design Register", to: "#showcase" },
          { label: "Process", to: "#process" },
          { label: "Get a Quote", to: "#quote" },
        ];

  return (
    <footer className="border-t border-navy-800 bg-navy-950 pt-16 text-navy-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <GoLink to="/" className="flex items-center gap-2.5">
            <StarMark className="h-7 w-7 text-accent-500" />
            <span className="leading-none">
              <span className="block font-display text-[22px] tracking-[0.06em] text-white">BLUE STAR</span>
              <span className="mt-0.5 block font-mono text-[8.5px] tracking-[0.34em] text-accent-500">PLASTIC INDUSTRIES</span>
            </span>
          </GoLink>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel-400">
            Manufacturer of premium FRP and GRC architectural products — chajjas, jali panels, cornices, columns, domes and
            more — since 2001.
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
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">FRP RANGE</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {frp.map((p) => (
              <li key={p.slug}>
                <Link to={`/p/${p.slug}`} className="nav-underline text-navy-200 transition-colors hover:text-white">
                  {p.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">GRC RANGE</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {grc.map((p) => (
              <li key={p.slug}>
                <Link to={`/p/${p.slug}`} className="nav-underline text-navy-200 transition-colors hover:text-white">
                  {p.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">ON THIS PAGE</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <GoLink to={l.to} className="nav-underline text-navy-200 transition-colors hover:text-white">
                  {l.label}
                </GoLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">CONTACT</h4>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2.5 text-navy-200 transition-colors hover:text-accent-300">
                <MailIcon className="h-4 w-4 text-accent-500" />
                <span className="break-all">{EMAIL}</span>
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
        </div>
      </div>

      <div className="mt-14 border-t border-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-xs text-steel-500">© {new Date().getFullYear()} Blue Star Plastic Industries. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p className="hidden font-mono text-[9.5px] tracking-[0.2em] text-steel-500 lg:block">
              {mode === "home"
                ? `PRODUCT REGISTER · ${PRODUCTS.length} SHEETS`
                : `LANDING PAGE ${pageNo} / ${PRODUCTS.length}`}
            </p>
            <GoLink to="#top" className="nav-underline font-mono text-[10px] tracking-[0.22em] text-navy-200 transition-colors hover:text-accent-400">
              BACK TO TOP ↑
            </GoLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
