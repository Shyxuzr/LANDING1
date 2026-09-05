/**
 * ============================================================================
 *  BLUE STAR PLASTIC INDUSTRIES — Landing Page #1 : FRP CHAJJAS
 * ----------------------------------------------------------------------------
 *  Single-file implementation. Sections, in order:
 *    1. Header / Navbar      — brand + right-aligned call button + scroll progress
 *    2. Hero                 — headline, sub-headline, primary CTA, photo + spec tags
 *    3. Spec ticker          — rotating marquee of product credentials
 *    4. Key Advantages       — 3-column icon grid (weather / maintenance / eco)
 *    5. Why FRP comparison   — FRP vs MS steel vs RCC data table
 *    6. Stats band           — animated counters
 *    7. Product Showcase     — 4-column grid with SVG elevation drawings
 *    8. Process              — 4-step "drawing to fixing" timeline + factory photo
 *    9. Quote form           — validated contact form with success state
 *   10. Footer               — sales email, phone, copyright
 *
 *  Design system: navy / steel-grey / off-white with safety-amber accents.
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

const HERO_IMG =
  "https://image.qwenlm.ai/generated-images/cb9d06be-7c2f-4cc3-81a3-0e60f00a2076/_result.png";
const FACTORY_IMG =
  "https://image.qwenlm.ai/generated-images/1df56e0c-c10e-4418-a9e3-f73f828891d0/_result.png";

const NAV_LINKS = [
  { label: "Advantages", href: "#advantages" },
  { label: "Why FRP", href: "#why-frp" },
  { label: "Products", href: "#products" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#quote" },
];

const TICKER_ITEMS = [
  "UV-STABILISED GELCOAT FINISH",
  "ZERO RUST · ZERO ROT · ZERO PAINT",
  "10-YEAR STRUCTURAL WARRANTY",
  "CUSTOM RAL COLOURS, MOULDED-IN",
  "PAN-INDIA SUPPLY & FIXING SUPPORT",
  "3–4 KG/M² — A FRACTION OF RCC",
  "IS 12086 TESTED COMPOSITE",
];

/* ------------------------------------------------------------------ */
/*  Custom inline SVG icons (drawn for this page — no icon library)    */
/* ------------------------------------------------------------------ */
function StarMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z"
        fill="currentColor"
      />
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

/** Advantage icon — shield holding sun + rain: shields from sun, rain, UV. */
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

/** Advantage icon — crossed-out droplet + spark: no rust, no rot, no paint. */
function MaintenanceIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 9C24 9 13 22.5 13 30a11 11 0 0 0 22 0C35 22.5 24 9 24 9Z" />
      <path d="M18.5 31a5.5 5.5 0 0 0 4 5.3" />
      <path d="M8 8l32 32" />
      <path d="M39.5 8.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" fill="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Advantage icon — leaf with vein + returning arrow: sustainable choice. */
function EcoIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M36.5 10.5C20 12.5 11.5 22.5 12 37c14.5-.5 23.5-9.5 24.5-26.5Z" />
      <path d="M14.5 35C18 26.5 25 19.5 33.5 14" />
      <path d="M40 29a11.5 11.5 0 0 1-7.5 10.5" />
      <path d="m32.5 36 0 4 4-1.5" />
      <path d="M8 19a11.5 11.5 0 0 1 7.5-10.5" />
      <path d="M15.5 12.5v-4l-4 1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Motion helpers                                                     */
/* ------------------------------------------------------------------ */

/** Observe an element once; returns ref + whether it has entered view. */
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

/** Scroll-reveal wrapper — fades/slides children in when scrolled to. */
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

/** Number counter that animates when scrolled into view. */
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
      setVal(Math.round(to * (1 - Math.pow(1 - p, 4)))); // easeOutQuart
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
/*  Chajja elevation drawings (one custom SVG per product profile)     */
/* ------------------------------------------------------------------ */
type ProductVariant = "plain" | "sloped" | "curved" | "decorative";

function ChajjaProfile({ variant, label }: { variant: ProductVariant; label: string }) {
  const gridId = `grid-${variant}`;
  const hatchId = `hatch-${variant}`;

  return (
    <svg
      viewBox="0 0 240 150"
      role="img"
      aria-label={`${variant} chajja elevation drawing`}
      className="w-full fill-none text-navy-800 transition-colors duration-500 group-hover:text-accent-400"
    >
      <defs>
        {/* blueprint grid — flips to amber-on-navy with the card on hover */}
        <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.5" />
        </pattern>
        {/* 45° hatch for the wall section */}
        <pattern id={hatchId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="240" height="150" fill={`url(#${gridId})`} />

      {/* Wall section (hatched) — common to every profile */}
      <rect x="16" y="14" width="18" height="118" fill={`url(#${hatchId})`} stroke="currentColor" strokeWidth="1.5" />
      <line x1="34" y1="14" x2="34" y2="132" stroke="currentColor" strokeWidth="2.5" />

      {/* Profile-specific drawing */}
      {variant === "plain" && (
        <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <rect x="34" y="62" width="180" height="10" />
          <path d="M54 72 L54 100 L82 72" />
          <path d="M164 72 L164 100 L192 72" />
        </g>
      )}
      {variant === "sloped" && (
        <g stroke="currentColor" strokeLinejoin="round">
          <path d="M34 56 L214 84 L214 94 L34 66 Z" strokeWidth="2" />
          <line x1="34" y1="26" x2="198" y2="82" strokeWidth="1.5" />
          <circle cx="34" cy="26" r="3" strokeWidth="1.5" />
        </g>
      )}
      {variant === "curved" && (
        <g stroke="currentColor" strokeLinejoin="round">
          <path d="M34 84 C 92 34, 158 34, 214 70 L214 80 C 158 46, 94 46, 34 94 Z" strokeWidth="2" />
        </g>
      )}
      {variant === "decorative" && (
        <g stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
          <rect x="34" y="58" width="180" height="9" strokeWidth="2" />
          {/* scalloped fascia — 10 × 18 mm arcs */}
          <path
            d="M214 67 a9 9 0 0 1 -18 0 a9 9 0 0 1 -18 0 a9 9 0 0 1 -18 0 a9 9 0 0 1 -18 0 a9 9 0 0 1 -18 0 a9 9 0 0 1 -18 0 a9 9 0 0 1 -18 0 a9 9 0 0 1 -18 0 a9 9 0 0 1 -18 0 a9 9 0 0 1 -18 0"
            strokeWidth="1.5"
          />
          {/* ornamental brackets with curls */}
          <path d="M62 67 L62 96 Q62 102 68 102 L74 102" strokeWidth="1.8" />
          <circle cx="77" cy="102" r="3" strokeWidth="1.5" />
          <path d="M178 67 L178 96 Q178 102 172 102 L166 102" strokeWidth="1.8" />
          <circle cx="163" cy="102" r="3" strokeWidth="1.5" />
        </g>
      )}

      {/* Dimension line + label */}
      <g className="text-steel-400 transition-colors duration-500 group-hover:text-accent-300">
        <line x1="34" y1="141" x2="214" y2="141" stroke="currentColor" strokeWidth="1" />
        <path d="M40 137.5 L34 141 L40 144.5" stroke="currentColor" strokeWidth="1" />
        <path d="M208 137.5 L214 141 L208 144.5" stroke="currentColor" strokeWidth="1" />
        <text
          x="124"
          y="135"
          textAnchor="middle"
          fontSize="7"
          letterSpacing="1.6"
          fontFamily="IBM Plex Mono, monospace"
          fill="currentColor"
        >
          {label}
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Section content data                                               */
/* ------------------------------------------------------------------ */
const ADVANTAGES = [
  {
    no: "01",
    icon: WeatherIcon,
    title: "Weather Resistant",
    lead: "Shields from sun, rain, UV rays",
    points: [
      "UV-stable gelcoat skin — colour never chalks or peels",
      "Performs from −20 °C to +80 °C without warping",
      "Monsoon-proof: zero water absorption, zero swelling",
    ],
    note: "2000-H QUV WEATHERING TESTED",
  },
  {
    no: "02",
    icon: MaintenanceIcon,
    title: "Low Maintenance",
    lead: "No rust, no rot, no painting",
    points: [
      "Non-corrosive composite — immune to salt air & pollution",
      "Wipe clean with water; no repainting cycles, ever",
      "No termite or fungal attack on the substrate",
    ],
    note: "NSS SALT-SPRAY: NO CORROSION",
  },
  {
    no: "03",
    icon: EcoIcon,
    title: "Eco-Friendly",
    lead: "Sustainable choice",
    points: [
      "100% recyclable FRP at end of a 20-year+ service life",
      "Lower embodied energy than steel or RCC canopies",
      "Moulded-in colour means zero paint VOCs on site",
    ],
    note: "LOW-VOC · RECYCLABLE COMPOSITE",
  },
];

const COMPARISON = [
  { label: "Unit weight (per m²)", frp: "3–4 kg", steel: "18–22 kg", alt: "55–70 kg" },
  { label: "Rust & corrosion", frp: "Immune", steel: "Prone — repaint yearly", alt: "Rebar spalling" },
  { label: "Maintenance", frp: "Wipe-clean. Nil.", steel: "Sand + repaint, 2-yr cycle", alt: "Crack patching" },
  { label: "Installation", frp: "< 60 min / unit, SS screws", steel: "Weld + grind + paint", alt: "Cast-in-situ + 21-day cure" },
  { label: "Shapes & profiles", frp: "Moulded — any profile", steel: "Flat / folded only", alt: "Plain slab" },
  { label: "Design life", frp: "20+ years", steel: "8–10 years", alt: "Varies with cover" },
];

const STATS = [
  { value: 25, suffix: "+", label: "Years in FRP composites" },
  { value: 40000, suffix: "+", label: "Chajjas delivered" },
  { value: 18, suffix: "", label: "States served pan-India" },
  { value: 10, suffix: "-YR", label: "Structural warranty" },
];

const PRODUCTS: {
  variant: ProductVariant;
  code: string;
  name: string;
  tag?: string;
  dimLabel: string;
  desc: string;
  specs: string[];
}[] = [
  {
    variant: "plain",
    code: "BSP-CJ-01",
    name: "Plain Chajja",
    tag: "BEST SELLER",
    dimLabel: "PROJ. 600–1500 MM",
    desc: "A crisp horizontal slab on concealed SS brackets — the minimalist default for grid facades and apartment towers.",
    specs: ["Projection 600–1500 mm", "Fascia depth 40–60 mm", "Gelcoat, any RAL shade"],
  },
  {
    variant: "sloped",
    code: "BSP-CJ-02",
    name: "Sloped Chajja",
    dimLabel: "PITCH 10°–15°",
    desc: "Pitched to throw monsoon rain clear of the sill, with a tie-rod for confident long spans over entrances.",
    specs: ["Pitch 10°–15°", "Span up to 1800 mm", "Tie-rod kit included"],
  },
  {
    variant: "curved",
    code: "BSP-CJ-03",
    name: "Curved Chajja",
    tag: "ARCHITECT PICK",
    dimLabel: "RADIUS: CUSTOM",
    desc: "A barrel-arch profile that softens hard elevations — radius matched to your opening and facade rhythm.",
    specs: ["Radius matched to opening", "Projection 600–1200 mm", "Seamless moulded curve"],
  },
  {
    variant: "decorative",
    code: "BSP-CJ-04",
    name: "Decorative Chajja",
    dimLabel: "SCALLOP 90 MM MODULE",
    desc: "Scalloped fascia and moulded brackets for villas, bungalows and heritage-style street elevations.",
    specs: ["Scalloped front edge", "Bracket set included", "Antique or gloss finish"],
  },
];

const PROCESS_STEPS = [
  {
    no: "1",
    title: "Share your opening sizes",
    desc: "Send window widths, preferred projection and a facade photo or drawing — WhatsApp or email, both work.",
  },
  {
    no: "2",
    title: "Get a custom quote in 24 h",
    desc: "Per-unit pricing, colour options and a CAD profile of your chosen chajja for sign-off before we mould.",
  },
  {
    no: "3",
    title: "We mould & finish",
    desc: "Hand-laid FRP with gelcoat colour and brass inserts — cured, demoulded and QC-checked at our Taloja works.",
  },
  {
    no: "4",
    title: "Deliver & install",
    desc: "Pan-India dispatch with SS fixture kits; our engineer supports your site team on call through fixing.",
  },
];

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

  const light = scrolled || menuOpen; // white-on-navy once scrolled or menu open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        light ? "bg-navy-950 shadow-lg shadow-navy-950/30" : "bg-paper/95"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2.5 px-5 py-3.5 lg:gap-3 lg:px-8">
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Blue Star Plastic Industries — home">
          <StarMark className="hidden h-7 w-7 text-accent-500 transition-transform duration-300 group-hover:rotate-45 min-[380px]:block" />
          <span className="leading-none">
            <span className={`block font-display text-[22px] tracking-[0.06em] ${light ? "text-white" : "text-navy-900"}`}>
              BLUE STAR
            </span>
            <span className="mt-0.5 block font-mono text-[8.5px] tracking-[0.34em] text-accent-600">
              PLASTIC INDUSTRIES
            </span>
          </span>
        </a>

        {/* Desktop nav */}
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
          {/* Right-aligned call button */}
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

          {/* Mobile hamburger */}
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

      {/* Scroll progress rule */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-accent-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* Mobile menu */}
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
/*  2. Hero                                                            */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper bg-blueprint pb-24 pt-28 md:pt-36">
      {/* Oversized hollow watermark */}
      <span
        className="text-outline pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[24vw] leading-none tracking-tight md:text-[17vw]"
        aria-hidden="true"
      >
        CHAJJA
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Copy column */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-navy-600">
              <StarMark className="h-3.5 w-3.5 text-accent-500" />
              PREMIUM FRP ARCHITECTURAL PRODUCTS
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[52px] leading-[0.98] tracking-[0.015em] text-navy-900 sm:text-7xl xl:text-[88px]">
              Premium FRP Chajjas —
              <br />
              Protection That Lasts,
              <br />
              <span className="relative inline-block">
                Style That Stays.
                {/* hand-drawn amber underline */}
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
              Weather-resistant, lightweight, and maintenance-free roofing solutions for modern
              construction.
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
                href="#products"
                className="inline-flex items-center gap-3 border-2 border-navy-800 px-7 py-[14px] text-[15px] font-semibold text-navy-800 transition-colors duration-200 hover:bg-navy-800 hover:text-white"
              >
                Explore Designs
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {["ISO 9001:2015 CERTIFIED", "10-YEAR WARRANTY", "40,000+ UNITS INSTALLED"].map((t) => (
                <li key={t} className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-steel-600">
                  <CheckIcon className="h-3.5 w-3.5 text-accent-600" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Image column with drawing-style annotations */}
        <div className="lg:col-span-6">
          <Reveal delay={200}>
            <div className="relative mr-2 lg:mr-6">
              {/* amber corner brackets */}
              <span className="absolute -left-2 -top-2 h-7 w-7 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -right-2 -top-2 h-7 w-7 border-r-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -left-2 h-7 w-7 border-b-[3px] border-l-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -right-2 h-7 w-7 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />

              <div className="relative overflow-hidden border border-steel-300 bg-navy-900">
                <img
                  src={HERO_IMG}
                  alt="Modern building facade fitted with white FRP chajjas above every window"
                  className="kenburns aspect-[4/3] w-full object-cover"
                  loading="eager"
                />
                {/* drawing-number stamp */}
                <span className="absolute right-4 top-4 border border-white/25 bg-navy-950/75 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.25em] text-navy-100">
                  DWG NO. BSP-CJ-01
                </span>
              </div>

              {/* vertical dimension note */}
              <div className="absolute -right-5 top-8 hidden lg:block" aria-hidden="true">
                <svg viewBox="0 0 34 190" className="h-44 w-8 text-navy-700">
                  <line x1="10" y1="8" x2="10" y2="168" stroke="currentColor" strokeWidth="1" />
                  <path d="M6.5 14 L10 8 L13.5 14" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M6.5 162 L10 168 L13.5 162" fill="none" stroke="currentColor" strokeWidth="1" />
                  <line x1="4" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
                  <line x1="4" y1="168" x2="16" y2="168" stroke="currentColor" strokeWidth="1" />
                  <text
                    x="22"
                    y="92"
                    fontSize="8"
                    letterSpacing="1.5"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="currentColor"
                    transform="rotate(90 22 92)"
                    textAnchor="middle"
                  >
                    TYP. 900 MM
                  </text>
                </svg>
              </div>

              {/* floating spec card */}
              <div className="float-tag absolute -bottom-7 left-5 right-5 border border-steel-200 border-l-4 border-l-accent-500 bg-white p-4 shadow-xl shadow-navy-900/10 sm:right-auto sm:w-80">
                <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-700">SPEC 04-A · FINISH</p>
                <p className="mt-1.5 text-sm font-semibold text-navy-900">Gelcoat finish, moulded-in colour</p>
                <p className="mt-1 text-xs leading-relaxed text-steel-600">
                  UV-stable RAL shades that never peel, blister or need repainting.
                </p>
              </div>
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
          <span className="whitespace-nowrap px-6 font-mono text-[11px] tracking-[0.22em] text-navy-100">
            {item}
          </span>
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
/*  4. Key Advantages (3-column grid)                                  */
/* ------------------------------------------------------------------ */
function Advantages() {
  return (
    <section id="advantages" className="scroll-mt-24 bg-paper py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">01 / KEY ADVANTAGES</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                ENGINEERED FOR
                <br />
                THE ELEMENTS.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-steel-600 md:pb-2 md:text-right">
              Three reasons specifiers across India switch from steel and concrete to Blue Star FRP.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ADVANTAGES.map((a, i) => (
            <Reveal key={a.no} delay={i * 130}>
              <article className="group relative h-full border border-steel-300 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-800 hover:shadow-[10px_10px_0_0_rgba(21,44,79,0.08)]">
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center border border-navy-800 text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-400">
                    <a.icon className="h-7 w-7" />
                  </span>
                  <span className="font-display text-4xl text-steel-200 transition-colors duration-300 group-hover:text-accent-500">
                    {a.no}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-[28px] tracking-[0.02em] text-navy-900">{a.title}</h3>
                <p className="mt-1 font-semibold text-navy-700">{a.lead}</p>

                <ul className="mt-5 space-y-2.5">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-snug text-steel-600">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-600" />
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-steel-200 pt-4 font-mono text-[9.5px] tracking-[0.2em] text-steel-400 transition-colors duration-300 group-hover:text-navy-600">
                  {a.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Why FRP — comparison table                                      */
/* ------------------------------------------------------------------ */
function WhyFrp() {
  return (
    <section id="why-frp" className="relative scroll-mt-24 overflow-hidden bg-navy-950 bg-blueprint-dark py-24 text-navy-100">
      <span
        className="text-outline-light pointer-events-none absolute -right-4 top-6 select-none font-display text-[11rem] leading-none md:text-[16rem]"
        aria-hidden="true"
      >
        VS
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">02 / WHY SWITCH</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-white sm:text-6xl">
            FRP AGAINST THE OLD GUARD.
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
                    <span className="font-display text-xl tracking-[0.04em] text-white">FRP CHAJJA</span>
                  </th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">MS STEEL</th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">RCC / WOOD</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-t border-navy-800 transition-colors hover:bg-navy-900/50">
                    <td className="p-4 font-mono text-[11px] tracking-[0.12em] text-steel-400">{row.label.toUpperCase()}</td>
                    <td className="border-x border-accent-500/25 bg-navy-800/70 p-4 text-sm font-semibold text-white">
                      <span className="flex items-center gap-2.5">
                        <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent-400" />
                        {row.frp}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-navy-300">{row.steel}</td>
                    <td className="p-4 text-sm text-navy-300">{row.alt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-steel-500">
            * INDICATIVE VALUES FOR A 1200 × 900 MM WINDOW CANOPY. TEST REPORTS AVAILABLE ON REQUEST.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Stats band                                                      */
/* ------------------------------------------------------------------ */
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
/*  7. Product Showcase (4-column grid)                                */
/* ------------------------------------------------------------------ */
function Showcase() {
  return (
    <section id="products" className="scroll-mt-24 bg-paper bg-blueprint py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">03 / PRODUCT SHOWCASE</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                FOUR PROFILES.
                <br />
                EVERY FACADE COVERED.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-steel-600 md:pb-2 md:text-right">
              Every profile is moulded to order. Hover a drawing to flip it to the night-shift
              blueprint view.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.code} delay={i * 110}>
              <article className="group flex h-full flex-col border border-steel-300 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-600 hover:shadow-[10px_10px_0_0_rgba(245,168,28,0.18)]">
                {/* Elevation drawing panel — inverts to navy on hover */}
                <div className="relative border-b border-steel-200 bg-navy-50 p-4 transition-colors duration-500 group-hover:border-navy-800 group-hover:bg-navy-950">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[9.5px] tracking-[0.2em] text-steel-500 transition-colors duration-500 group-hover:text-navy-300">
                      {p.code}
                    </span>
                    {p.tag && (
                      <span className="bg-accent-500 px-2 py-1 font-mono text-[8.5px] tracking-[0.18em] text-navy-950">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <ChajjaProfile variant={p.variant} label={p.dimLabel} />
                </div>

                {/* Copy */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[26px] tracking-[0.02em] text-navy-900">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">{p.desc}</p>

                  <ul className="mt-5 space-y-2">
                    {p.specs.map((s) => (
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
/*  8. Process — sticky image + 4-step timeline                        */
/* ------------------------------------------------------------------ */
function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Sticky image column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">04 / HOW WE WORK</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                DRAWING TO
                <br />
                FIXING, IN
                <br />
                FOUR STEPS.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-steel-600">
                No CAD expertise needed on your side — a photo of the window and a tape-measure
                reading is enough to start.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative mt-9">
                <span className="absolute -left-2 -top-2 h-6 w-6 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
                <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />
                <div className="overflow-hidden border border-steel-300 bg-navy-900">
                  <img
                    src={FACTORY_IMG}
                    alt="Technician inspecting a moulded FRP chajja panel at the Blue Star workshop"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">
                  HAND-LAID FRP SHOP — TALOJA MIDC, NAVI MUMBAI
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Step timeline */}
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
                      <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-700">
                        STEP {step.no} / 4
                      </p>
                      <h3 className="mt-2 font-display text-[24px] tracking-[0.02em] text-navy-900">
                        {step.title}
                      </h3>
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
/*  9. Quote form                                                      */
/* ------------------------------------------------------------------ */
type QuoteForm = {
  name: string;
  phone: string;
  email: string;
  city: string;
  type: string;
  size: string;
  qty: string;
  message: string;
};

const EMPTY_FORM: QuoteForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  type: "Plain Chajja",
  size: "900 mm (standard)",
  qty: "1–10 units",
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
              TELL US YOUR SPAN.
              <br />
              QUOTED IN 24 HOURS.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-200">
              Share your window sizes and city — our sales engineer replies with per-unit pricing,
              colour options and a CAD profile of your chajja.
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

        {/* Form card */}
        <div className="lg:col-span-7">
          <Reveal delay={200}>
            <div className="border-t-4 border-accent-500 bg-paper p-7 text-ink shadow-2xl shadow-navy-950/50 sm:p-10">
              {submitted ? (
                /* -------- Success state -------- */
                <div className="py-6 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center bg-accent-500 text-navy-950">
                    <CheckIcon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display text-4xl text-navy-900">REQUEST RECEIVED.</h3>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-accent-700">
                    REF {refId} · LOGGED {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
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
                /* -------- Form -------- */
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
                    <div>
                      <label htmlFor="q-type" className={labelCls}>CHAJJA TYPE</label>
                      <select id="q-type" value={form.type} onChange={set("type")} className={inputCls(false)}>
                        <option>Plain Chajja</option>
                        <option>Sloped Chajja</option>
                        <option>Curved Chajja</option>
                        <option>Decorative Chajja</option>
                        <option>Multiple / custom profile</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q-size" className={labelCls}>APPROX. PROJECTION</label>
                      <select id="q-size" value={form.size} onChange={set("size")} className={inputCls(false)}>
                        <option>600 mm</option>
                        <option>900 mm (standard)</option>
                        <option>1200 mm</option>
                        <option>1500 mm</option>
                        <option>Custom / not sure</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="q-qty" className={labelCls}>QUANTITY</label>
                      <select id="q-qty" value={form.qty} onChange={set("qty")} className={inputCls(false)}>
                        <option>1–10 units</option>
                        <option>10–50 units</option>
                        <option>50–200 units</option>
                        <option>200+ (project supply)</option>
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
/*  10. Footer                                                         */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950 pt-16 text-navy-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-12">
        {/* Brand */}
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
            Manufacturer of premium FRP and GRC architectural products — chajjas, domes, cornices
            and custom facade elements — since 2001.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["ISO 9001:2015", "FRP · GRC SPECIALISTS", "MADE IN INDIA"].map((b) => (
              <span key={b} className="border border-navy-700 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.18em] text-steel-400">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="md:col-span-2">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">PRODUCTS</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {["Plain Chajja", "Sloped Chajja", "Curved Chajja", "Decorative Chajja", "Custom Profiles"].map((p) => (
              <li key={p}>
                <a href="#products" className="nav-underline text-navy-200 transition-colors hover:text-white">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="md:col-span-3">
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

        {/* Contact */}
        <div className="md:col-span-3">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">CONTACT</h4>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-2.5 text-navy-200 transition-colors hover:text-accent-300">
                <MailIcon className="h-4 w-4 text-accent-500" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={PHONE_TEL} className="group inline-flex items-center gap-2.5 text-navy-200 transition-colors hover:text-accent-300">
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

      {/* Legal bar */}
      <div className="mt-14 border-t border-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-xs text-steel-500">
            © {new Date().getFullYear()} Blue Star Plastic Industries. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="hidden font-mono text-[9.5px] tracking-[0.2em] text-steel-500 lg:block">
              FRP CHAJJAS · LANDING PAGE 01 / 10
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
        <Advantages />
        <WhyFrp />
        <StatsBand />
        <Showcase />
        <Process />
        <QuoteSection />
      </main>
      <Footer />
      {/* fixed film-grain layer for a printed, non-flat surface */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}
