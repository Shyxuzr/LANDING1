/**
 * ============================================================================
 *  BLUE STAR PLASTIC INDUSTRIES — Landing Page #3 : GRC CORNICES
 * ----------------------------------------------------------------------------
 *  Sections, in order:
 *    1. Header / Navbar      — brand + right-aligned call button + progress rule
 *    2. Moulding band        — a full-width dentil-and-rail strip under the header
 *    3. Hero                 — headline, sub-headline, CTA, photo + drawn section
 *    4. Spec ticker          — rotating marquee of cornice credentials
 *    5. Anatomy of a moulding— labelled section drawing with hover-sync callouts
 *    6. Product showcase     — Classical / Decorative / Layered / Simple profiles
 *    7. Ideal For            — residential, commercial, heritage, villas ledger
 *    8. Why GRC comparison   — GRC vs POP vs wood vs RCC
 *    9. Stats band           — animated counters
 *   10. Process              — 4-step timeline + workshop photo
 *   11. Quote form           — validated contact form with success state
 *   12. Footer               — sales email, phone, copyright
 *
 *  Design system: navy / steel-grey / off-white with safety-amber accents.
 *  Type: Bebas Neue (display) · IBM Plex Sans (body) · IBM Plex Mono (specs).
 * ============================================================================ */
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
  "https://image.qwenlm.ai/generated-images/4dc461ed-c520-441a-8b97-cc69fa6ee5db/_result.png";
const FACTORY_IMG =
  "https://image.qwenlm.ai/generated-images/21271d87-3ca7-4dae-b463-bdc2173bfd37/_result.png";

const NAV_LINKS = [
  { label: "Anatomy", href: "#anatomy" },
  { label: "Profiles", href: "#profiles" },
  { label: "Ideal For", href: "#ideal" },
  { label: "Why GRC", href: "#why-grc" },
  { label: "Contact", href: "#quote" },
];

const TICKER_ITEMS = [
  "CLASSICAL · DECORATIVE · LAYERED · SIMPLE",
  "MOISTURE-PROOF — NO POP HAIRLINE CRACKS",
  "12 MM SHELL, GALVANISED-REINFORCED",
  "RUNNING-FT PRICING · STRAIGHT + CURVED",
  "FACTORY-PRIMED OR PAINTED FINISH",
  "FIRE CLASS A · ASTM E84",
  "PAN-INDIA SUPPLY + FIXING SUPPORT",
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

/** Ideal-for icon — residential: gable roof over a cornice double-line. */
function ResidentialIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 20 L24 7 L40 20" />
      <path d="M9 23.5 H39 M9 27 H39" />
      <path d="M13 27 V41 H35 V27" />
      <rect x="20.5" y="33" width="7" height="8" />
    </svg>
  );
}

/** Ideal-for icon — commercial: mid-rise block crowned by a cornice band. */
function CommercialIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12 H39 M9 15.5 H39" />
      <path d="M13 15.5 V41 H35 V15.5" />
      <rect x="17" y="20" width="4" height="4" />
      <rect x="27" y="20" width="4" height="4" />
      <rect x="17" y="27" width="4" height="4" />
      <rect x="27" y="27" width="4" height="4" />
      <path d="M21 41 V35 H27 V41" />
    </svg>
  );
}

/** Ideal-for icon — heritage: arched opening with keystone under a cornice. */
function HeritageIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 10 H41 M10 13.5 H38" />
      <path d="M13 17 v-2 M19 17 v-2 M29 17 v-2 M35 17 v-2" />
      <path d="M14 41 V28 a10 10 0 0 1 20 0 V41" />
      <path d="M21 18 L20 24 H28 L27 18" />
      <path d="M10 41 H38" />
    </svg>
  );
}

/** Ideal-for icon — villas & bungalows: low hip roof, verandah columns. */
function VillaIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 23 L16 13 H32 L41 23" />
      <path d="M5 26.5 H43" />
      <path d="M11 26.5 V39 H37 V26.5" />
      <path d="M16 39 V30 M22 39 V30 M32 39 V30" />
      <path d="M25.5 39 V33.5 H29.5 V39" />
      <path d="M7 39 H41" />
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
    <div ref={ref} className={`reveal ${inView ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
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
/*  Cornice drawings                                                   */
/* ------------------------------------------------------------------ */

/** Shared drawing frame: hatched wall, profile paths, dimension line. */
function DrawingFrame({
  children,
  label,
  hatchId,
}: {
  children: ReactNode;
  label: string;
  hatchId: string;
}) {
  return (
    <svg
      viewBox="0 0 240 150"
      role="img"
      aria-label={`Cornice section: ${label}`}
      className="w-full fill-none text-navy-800 transition-colors duration-500 group-hover:text-accent-400"
    >
      <defs>
        <pattern id={`g-${hatchId}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" stroke="currentColor" strokeOpacity="0.13" strokeWidth="0.5" />
        </pattern>
        <pattern id={`h-${hatchId}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="240" height="150" fill={`url(#g-${hatchId})`} />
      <rect x="18" y="16" width="20" height="116" fill={`url(#h-${hatchId})`} stroke="currentColor" strokeWidth="1.5" />
      <line x1="38" y1="16" x2="38" y2="132" stroke="currentColor" strokeWidth="2.5" />

      {children}

      {/* dimension line */}
      <g className="text-steel-400 transition-colors duration-500 group-hover:text-accent-300">
        <line x1="38" y1="141" x2="200" y2="141" stroke="currentColor" strokeWidth="1" />
        <path d="M44 137.5 L38 141 L44 144.5" stroke="currentColor" strokeWidth="1" />
        <path d="M194 137.5 L200 141 L194 144.5" stroke="currentColor" strokeWidth="1" />
        <text x="119" y="135" textAnchor="middle" fontSize="7" letterSpacing="1.6" fontFamily="IBM Plex Mono, monospace" fill="currentColor">
          {label}
        </text>
      </g>
    </svg>
  );
}

/** Classical cornice section — cyma recta crown over a dentil course. */
function ClassicalSection({ label }: { label: string }) {
  return (
    <DrawingFrame label={label} hatchId="cor01">
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M38 26 H198 V34 C 186 34, 182 44, 172 48 C 164 51.5, 156 50, 148 52 H38" />
        <path d="M38 66 H148 V52" />
      </g>
      <g stroke="currentColor" strokeWidth="1.5">
        {[48, 65, 82, 99, 116, 133].map((x) => (
          <rect key={x} x={x} y="52" width="9" height="14" />
        ))}
      </g>
    </DrawingFrame>
  );
}

/** Decorative cornice section — steep cyma, scalloped bed, bead course. */
function DecorativeSection({ label }: { label: string }) {
  return (
    <DrawingFrame label={label} hatchId="cor02">
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M38 30 H190 V38 C 179 38, 175 47, 166 51 C 158 54.5, 150 53.5, 142 55 H38" />
        <path d="M142 55 a8.7 8.7 0 0 1 -17.3 0 a8.7 8.7 0 0 1 -17.3 0 a8.7 8.7 0 0 1 -17.3 0 a8.7 8.7 0 0 1 -17.3 0 a8.7 8.7 0 0 1 -17.3 0 a8.7 8.7 0 0 1 -17.3 0" />
        <path d="M38 75 H142 V55" />
      </g>
      <g stroke="currentColor" strokeWidth="1.5">
        {[52, 70, 88, 106, 124].map((cx) => (
          <circle key={cx} cx={cx} cy="66" r="3" />
        ))}
      </g>
    </DrawingFrame>
  );
}

/** Layered cornice section — three stepped fascia reveals. */
function LayeredSection({ label }: { label: string }) {
  return (
    <DrawingFrame label={label} hatchId="cor03">
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M38 30 H200 V42 H178 V56 H156 V72 H38" />
        <path d="M46 36 H192" strokeWidth="0.75" strokeOpacity="0.5" />
        <path d="M46 49 H170" strokeWidth="0.75" strokeOpacity="0.5" />
      </g>
    </DrawingFrame>
  );
}

/** Simple cornice section — single bullnose slab. */
function SimpleSection({ label }: { label: string }) {
  return (
    <DrawingFrame label={label} hatchId="cor04">
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M38 34 H176 C 187 34, 187 50, 176 50 H38" />
      </g>
      <path d="M46 42 H166" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    </DrawingFrame>
  );
}

/** Hero section drawing — classical profile that draws itself in. */
function HeroSectionDraw() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  return (
    <div ref={ref} className={inView ? "drawn" : ""}>
      <svg viewBox="0 0 240 120" className="w-full fill-none text-navy-100" role="img" aria-label="Classical cornice section drawing">
        <defs>
          <pattern id="hhatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="24" y="12" width="20" height="96" fill="url(#hhatch)" stroke="currentColor" strokeWidth="1.2" />
        <line x1="44" y1="12" x2="44" y2="108" stroke="currentColor" strokeWidth="2.2" />
        <path
          className="profile-line"
          d="M44 22 H204 V30 C 192 30, 188 40, 178 44 C 170 47.5, 162 46, 154 48 H44"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path className="profile-line d2" d="M44 62 H154 V48" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path className="profile-line d3" d="M52 48 h9 v14 h-9 z M69 48 h9 v14 h-9 z M86 48 h9 v14 h-9 z M103 48 h9 v14 h-9 z M120 48 h9 v14 h-9 z M137 48 h9 v14 h-9 z" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </div>
  );
}

/** Moulding strip mounted under the header — rail, amber rule, dentils. */
function MouldingBand() {
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <svg className="block h-9 w-full" preserveAspectRatio="none">
        <defs>
          <pattern id="dentil-strip" width="26" height="36" patternUnits="userSpaceOnUse">
            <rect x="5" y="12" width="13" height="14" fill="#152c4f" />
          </pattern>
        </defs>
        <rect width="100%" height="8" fill="#152c4f" />
        <rect y="8" width="100%" height="2" fill="#f5a81c" />
        <rect y="10" width="100%" height="16" fill="#eef1f6" />
        <rect y="10" width="100%" height="16" fill="url(#dentil-strip)" />
        <rect y="26" width="100%" height="10" fill="#0c1e3a" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section content data                                               */
/* ------------------------------------------------------------------ */

const ANATOMY = [
  { name: "Cyma Recta", desc: "The S-curve crown that catches raking light and gives the profile its classical character." },
  { name: "Corona", desc: "The projecting shelf that throws rainwater clear of the wall face below." },
  { name: "Dentil Course", desc: "The toothed rhythm borrowed from the classical orders — crisp and shadow-deep in GRC." },
  { name: "Bed Moulding", desc: "The transition line that settles the profile onto the wall without a visual break." },
  { name: "Soffit", desc: "The underside plane — kept true and shadow-free by factory-cast accuracy." },
  { name: "Frieze", desc: "The wall face the cornice crowns. Our mouldings are dimensioned to its module." },
];

const PRODUCTS = [
  {
    code: "COR-01",
    name: "Classical Cornice",
    tag: "BEST SELLER",
    label: "PROJ. 150–300 MM",
    Section: ClassicalSection,
    desc: "Cyma recta crown over a dentil course — the canonical order for classical facades, temples and heritage-style interiors.",
    specs: ["Projection 150–300 mm", "Dentil module 60 mm", "Raw, primed or painted"],
  },
  {
    code: "COR-02",
    name: "Decorative Cornice",
    tag: "ORNATE",
    label: "PROJ. 180–320 MM",
    Section: DecorativeSection,
    desc: "Scalloped bed moulding with a bead course for banquet halls, palaces and ornamented street elevations.",
    specs: ["Projection 180–320 mm", "Scallop 60 mm module", "Optional gilt accents"],
  },
  {
    code: "COR-03",
    name: "Layered Cornice",
    tag: "ARCHITECT PICK",
    label: "PROJ. 120–250 MM",
    Section: LayeredSection,
    desc: "Three crisp stepped fascia reveals that shadow-line contemporary facades, parapets and floor bands.",
    specs: ["Projection 120–250 mm", "3-step reveal", "Shadow-gap detailing"],
  },
  {
    code: "COR-04",
    name: "Simple Cornice",
    tag: "ECONOMICAL",
    label: "PROJ. 100–150 MM",
    Section: SimpleSection,
    desc: "A single bullnose slab with a soft rounded nose — the clean, budget-friendly finish for apartments and row houses.",
    specs: ["Projection 100–150 mm", "Radius nose profile", "Fastest to install"],
  },
];

const IDEAL_FOR = [
  {
    icon: ResidentialIcon,
    title: "Residential Projects",
    desc: "Flat lines and parapet crowns for apartments and row houses — crisp factory-cast edges that never hairline-crack like site-run POP.",
    chip: "SIMPLE · LAYERED",
  },
  {
    icon: CommercialIcon,
    title: "Commercial Buildings",
    desc: "Facade bands and floor-line cornices that tie large elevations together — lightweight, so no structural overloading on high-rises.",
    chip: "LAYERED · CLASSICAL",
  },
  {
    icon: HeritageIcon,
    title: "Heritage Structures",
    desc: "Period-accurate cyma, dentil and bead profiles recast from existing sections, photographs or measured drawings.",
    chip: "CLASSICAL · DECORATIVE",
  },
  {
    icon: VillaIcon,
    title: "Villas & Bungalows",
    desc: "Crown the roofline, porch and verandah with ornate profiles — weatherproof even in coastal, salt-laden air.",
    chip: "DECORATIVE · CLASSICAL",
  },
];

const COMPARISON = [
  { label: "Weight per running ft", grc: "1.2–2 kg", pop: "3–4 kg", wood: "2–3 kg", rcc: "6–8 kg" },
  { label: "Exterior & moisture", grc: "Immune", pop: "Crumbles when wet", wood: "Rots & warps", rcc: "Stains & spalls" },
  { label: "Hairline cracking", grc: "Flexible joints — none", pop: "Always", wood: "Shrinks at joints", rcc: "Shrinkage cracks" },
  { label: "Termites & fungus", grc: "Immune", pop: "Damp attracts both", wood: "Prone", rcc: "Immune" },
  { label: "Detail sharpness", grc: "Crisp, moulded", pop: "Degrades in weather", wood: "Carved — costly", rcc: "Coarse" },
  { label: "Exterior service life", grc: "25+ years", pop: "5–8 years", wood: "10–15 years", rcc: "20+ (needs paint)" },
];

const STATS = [
  { value: 25, suffix: "+", label: "Years in GRC & FRP" },
  { value: 120000, suffix: "+", label: "Running feet supplied" },
  { value: 18, suffix: "", label: "States served pan-India" },
  { value: 10, suffix: "-YR", label: "Material warranty" },
];

const PROCESS_STEPS = [
  {
    title: "Share running feet & profile",
    desc: "Send facade photos or drawings and pick from our four profiles — or send a custom section for recasting.",
  },
  {
    title: "CAD section + quote in 24 h",
    desc: "Per-running-foot rates, a curved-length plan for radii, and finish options laid out before you commit.",
  },
  {
    title: "Cast & cure",
    desc: "Alkali-resistant glass fibre sprayed into silicone moulds, then moisture-cured for seven full days.",
  },
  {
    title: "Fix & finish",
    desc: "SS cradle brackets and polymer-mortar joints; our site engineer supports your masons on call.",
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

/* ------------------------------------------------------------------ */
/*  3. Hero                                                            */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper bg-blueprint pb-24 pt-[68px] md:pt-[76px]">
      {/* The page opens with the product itself: a moulding strip */}
      <MouldingBand />

      <span
        className="text-outline pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[20vw] leading-none tracking-tight md:text-[15vw]"
        aria-hidden="true"
      >
        CORNICE
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pt-14 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pt-20">
        {/* Copy column */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-navy-600">
              <StarMark className="h-3.5 w-3.5 text-accent-500" />
              PREMIUM GRC ARCHITECTURAL PRODUCTS
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[52px] leading-[0.98] tracking-[0.015em] text-navy-900 sm:text-7xl xl:text-[84px]">
              GRC Cornice —
              <br />
              <span className="relative inline-block">
                Elegant Finish.
                <svg viewBox="0 0 320 14" className="absolute -bottom-2 left-0 w-full text-accent-500" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 10 C 70 3, 190 3, 317 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              Stronger Performance.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-steel-600">
              Lightweight yet strong cornices offering superior durability and a premium finish
              for modern and classical designs.
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
                href="#profiles"
                className="inline-flex items-center gap-3 border-2 border-navy-800 px-7 py-[14px] text-[15px] font-semibold text-navy-800 transition-colors duration-200 hover:bg-navy-800 hover:text-white"
              >
                View Profiles
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {["ISO 9001:2015 CERTIFIED", "MOISTURE-PROOF GRC", "CUSTOM PROFILE RECASTING"].map((t) => (
                <li key={t} className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-steel-600">
                  <CheckIcon className="h-3.5 w-3.5 text-accent-600" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Image + drawn section card */}
        <div className="lg:col-span-6">
          <Reveal delay={200}>
            <div className="relative mr-2 lg:mr-6">
              <span className="absolute -left-2 -top-2 h-7 w-7 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -right-2 -top-2 h-7 w-7 border-r-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -left-2 h-7 w-7 border-b-[3px] border-l-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -right-2 h-7 w-7 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />

              <div className="relative overflow-hidden border border-steel-300 bg-navy-900">
                <img
                  src={HERO_IMG}
                  alt="Building facade with white GRC cornice bands casting shadow lines under raking evening light"
                  className="kenburns aspect-[4/3] w-full object-cover"
                  loading="eager"
                />
                <span className="absolute right-4 top-4 border border-white/25 bg-navy-950/75 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.25em] text-navy-100">
                  DWG NO. BSP-COR-01
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
                  <text x="22" y="92" fontSize="8" letterSpacing="1.5" fontFamily="IBM Plex Mono, monospace" fill="currentColor" transform="rotate(90 22 92)" textAnchor="middle">
                    TYP. 240 MM DROP
                  </text>
                </svg>
              </div>

              {/* self-drawing section card */}
              <div className="absolute -bottom-10 left-4 right-4 border-t-4 border-accent-500 bg-navy-950 p-5 shadow-xl shadow-navy-900/25 sm:right-auto sm:w-[22rem]">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-400">SECTION A–A · COR-01</p>
                  <p className="font-mono text-[9.5px] tracking-[0.25em] text-steel-500">SCALE 1:4</p>
                </div>
                <HeroSectionDraw />
                <p className="mt-1 font-mono text-[9.5px] tracking-[0.18em] text-navy-300">
                  CYMA RECTA · DENTIL COURSE · GRC 12 MM SHELL
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
/*  4. Spec ticker                                                     */
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
    <div className="marquee mt-8 border-y border-navy-800 bg-navy-950 py-3.5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Anatomy of a moulding (hover-sync callouts)                     */
/* ------------------------------------------------------------------ */
function CalloutDot({ x, y, n, active }: { x: number; y: number; n: number; active: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {active && <circle r="18" fill="none" stroke="#f5a81c" strokeOpacity="0.55" strokeWidth="1.5" />}
      <circle
        r="11"
        fill={active ? "#f5a81c" : "#152c4f"}
        stroke={active ? "#f5a81c" : "#7192bc"}
        strokeWidth="1.2"
        className="transition-colors duration-300"
      />
      <text
        textAnchor="middle"
        dy="3.5"
        fontSize="10"
        fontWeight="600"
        fontFamily="IBM Plex Mono, monospace"
        fill={active ? "#071427" : "#e4ecf6"}
      >
        {n}
      </text>
    </g>
  );
}

function Anatomy() {
  const [hover, setHover] = useState(-1);
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section id="anatomy" className="relative scroll-mt-24 overflow-hidden bg-navy-950 bg-blueprint-dark py-24 text-navy-100">
      <span
        className="text-outline-light pointer-events-none absolute -right-6 top-4 select-none font-display text-[10rem] leading-none md:text-[15rem]"
        aria-hidden="true"
      >
        SEC
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">01 / ANATOMY</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-white sm:text-6xl">
            ANATOMY OF A MOULDING.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-navy-200">
            Every Blue Star cornice is a true classical section — cast, not carved. Hover a part
            name to locate it on the drawing.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-12">
          {/* Big section drawing */}
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <div ref={ref} className={`border border-navy-800 bg-navy-900/50 p-6 ${inView ? "drawn" : ""}`}>
                <svg viewBox="0 0 360 210" className="w-full fill-none text-navy-100" role="img" aria-label="Anatomical section of a classical GRC cornice with numbered callouts">
                  <defs>
                    <pattern id="agrid" width="18" height="18" patternUnits="userSpaceOnUse">
                      <path d="M18 0H0V18" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
                    </pattern>
                    <pattern id="awall" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="360" height="210" fill="url(#agrid)" />

                  {/* wall + frieze */}
                  <rect x="20" y="16" width="30" height="178" fill="url(#awall)" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="50" y1="16" x2="50" y2="194" stroke="currentColor" strokeWidth="2.5" />

                  {/* profile outline */}
                  <path
                    className="profile-line"
                    d="M50 36 H290 V48 C 272 48, 266 62, 251 68 C 239 73, 227 71, 215 74 H50"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <path className="profile-line d2" d="M50 96 H215 V74" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                  <path
                    className="profile-line d3"
                    d="M62 74 h13 v22 h-13 z M87 74 h13 v22 h-13 z M112 74 h13 v22 h-13 z M137 74 h13 v22 h-13 z M162 74 h13 v22 h-13 z M187 74 h13 v22 h-13 z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />

                  {/* callouts */}
                  <CalloutDot x={252} y={60} n={1} active={hover === 0} />
                  <CalloutDot x={282} y={42} n={2} active={hover === 1} />
                  <CalloutDot x={125} y={85} n={3} active={hover === 2} />
                  <CalloutDot x={180} y={74} n={4} active={hover === 3} />
                  <CalloutDot x={135} y={100} n={5} active={hover === 4} />
                  <CalloutDot x={35} y={150} n={6} active={hover === 5} />

                  <text x="298" y="188" fontSize="8" letterSpacing="2" fontFamily="IBM Plex Mono, monospace" fill="currentColor" opacity="0.5">
                    BSP-COR-SEC-A
                  </text>
                </svg>
              </div>
            </Reveal>
          </div>

          {/* Legend */}
          <div className="lg:col-span-5">
            <div className="space-y-3">
              {ANATOMY.map((part, i) => (
                <Reveal key={part.name} delay={i * 90}>
                  <div
                    tabIndex={0}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(-1)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(-1)}
                    className={`group flex cursor-default items-start gap-4 border p-4 outline-none transition-all duration-300 ${
                      hover === i
                        ? "border-accent-500 bg-navy-800/70"
                        : "border-navy-800 bg-navy-900/40 hover:border-navy-600"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-xs font-semibold transition-colors duration-300 ${
                        hover === i ? "border-accent-500 bg-accent-500 text-navy-950" : "border-navy-600 text-navy-200"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className={`block font-display text-xl tracking-[0.03em] transition-colors duration-300 ${hover === i ? "text-accent-300" : "text-white"}`}>
                        {part.name.toUpperCase()}
                      </span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-navy-300">{part.desc}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Product showcase                                                */
/* ------------------------------------------------------------------ */
function Showcase() {
  return (
    <section id="profiles" className="scroll-mt-24 bg-paper bg-blueprint py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">02 / PROFILES</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                FOUR WAYS TO
                <br />
                CROWN A WALL.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-steel-600 md:pb-2 md:text-right">
              Cast to order in straight lengths and radii. Hover a drawing to flip it to the
              night-shift blueprint view.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.code} delay={i * 110}>
              <article className="group flex h-full flex-col border border-steel-300 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-600 hover:shadow-[10px_10px_0_0_rgba(245,168,28,0.18)]">
                <div className="relative border-b border-steel-200 bg-navy-50 p-4 transition-colors duration-500 group-hover:border-navy-800 group-hover:bg-navy-950">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[9.5px] tracking-[0.2em] text-steel-500 transition-colors duration-500 group-hover:text-navy-300">
                      {p.code}
                    </span>
                    {p.tag && (
                      <span className="bg-accent-500 px-2 py-1 font-mono text-[8.5px] tracking-[0.18em] text-navy-950">{p.tag}</span>
                    )}
                  </div>
                  <p.Section label={p.label} />
                </div>

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
/*  7. Ideal For                                                       */
/* ------------------------------------------------------------------ */
function IdealFor() {
  return (
    <section id="ideal" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">03 / IDEAL FOR</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                WHERE OUR
                <br />
                CORNICES
                <br />
                WORK HARDEST.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel-600">
                From a two-bedroom row house to a heritage restoration — one material, four
                profile families, zero compromises on the finish line.
              </p>
              <a
                href="#quote"
                className="group mt-8 inline-flex items-center gap-3 border-2 border-navy-800 px-6 py-3.5 text-sm font-semibold text-navy-800 transition-colors duration-200 hover:bg-navy-800 hover:text-white"
              >
                Discuss your project
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="space-y-5">
            {IDEAL_FOR.map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <div className="group flex flex-col gap-5 border border-steel-200 border-l-4 border-l-steel-300 bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-l-accent-500 hover:shadow-[10px_10px_0_0_rgba(21,44,79,0.07)] sm:flex-row sm:items-center sm:gap-7 sm:p-7">
                  <span className="font-display text-3xl text-steel-300 transition-colors duration-300 group-hover:text-accent-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-navy-800 text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-400">
                    <item.icon className="h-7 w-7" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-[26px] tracking-[0.02em] text-navy-900">{item.title}</h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-steel-600">{item.desc}</p>
                  </div>
                  <span className="shrink-0 self-start border border-steel-300 px-3 py-2 font-mono text-[9.5px] tracking-[0.18em] text-steel-600 transition-colors duration-300 group-hover:border-accent-600 group-hover:text-accent-700 sm:self-center">
                    {item.chip}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Why GRC — comparison table                                      */
/* ------------------------------------------------------------------ */
function WhyGrc() {
  return (
    <section id="why-grc" className="relative scroll-mt-24 overflow-hidden bg-navy-950 bg-blueprint-dark py-24 text-navy-100">
      <span
        className="text-outline-light pointer-events-none absolute -right-4 top-6 select-none font-display text-[11rem] leading-none md:text-[16rem]"
        aria-hidden="true"
      >
        VS
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">04 / WHY GRC</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-white sm:text-6xl">
            THE MOULDING THAT OUTLIVES THE BUILDING'S MOODS.
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
                    <span className="font-display text-xl tracking-[0.04em] text-white">GRC CORNICE</span>
                  </th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">POP (PLASTER)</th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">WOOD</th>
                  <th className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">RCC CAST</th>
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
                    <td className="p-4 text-sm text-navy-300">{row.pop}</td>
                    <td className="p-4 text-sm text-navy-300">{row.wood}</td>
                    <td className="p-4 text-sm text-navy-300">{row.rcc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-steel-500">
            * INDICATIVE VALUES FOR A 240 MM PROJECTION CORNICE PROFILE. TEST REPORTS AVAILABLE ON REQUEST.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Stats band                                                      */
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
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  10. Process                                                        */
/* ------------------------------------------------------------------ */
function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">05 / HOW WE WORK</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                FROM MOULD
                <br />
                TO MONOLITHIC
                <br />
                FINISH LINE.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-steel-600">
                Cornices are priced per running foot, cast per project, and numbered for a
                foolproof sequence on site.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative mt-9">
                <span className="absolute -left-2 -top-2 h-6 w-6 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
                <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />
                <div className="overflow-hidden border border-steel-300 bg-navy-900">
                  <img
                    src={FACTORY_IMG}
                    alt="Craftsman demoulding a long white GRC cornice profile at the Blue Star casting workshop"
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
                <Reveal key={step.title} delay={i * 130}>
                  <li className="group relative flex gap-6 pb-6">
                    <span className="z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-navy-800 bg-paper font-display text-xl text-navy-800 transition-colors duration-300 group-hover:border-accent-600 group-hover:bg-accent-500 group-hover:text-navy-950">
                      {i + 1}
                    </span>
                    <div className="border border-steel-200 bg-paper p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-navy-800 group-hover:shadow-[8px_8px_0_0_rgba(21,44,79,0.07)]">
                      <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-700">STEP {i + 1} / 4</p>
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
  type: string;
  length: string;
  finish: string;
  message: string;
};

const EMPTY_FORM: QuoteForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  type: "Classical Cornice",
  length: "100–500 running ft",
  finish: "Factory primed",
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
    setRefId(`BSP-CQ-${Math.floor(1000 + Math.random() * 9000)}`);
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
              SEND YOUR
              <br />
              RUNNING FEET.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-200">
              Share your profile choice and approximate lengths — our sales engineer replies with
              per-foot rates, a CAD section and a delivery schedule within 24 hours.
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
                    working hours with your cornice quotation.
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
                      <input id="q-name" type="text" value={form.name} onChange={set("name")} placeholder="e.g. Meera Kulkarni" className={inputCls(!!errors.name)} />
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
                      <input id="q-city" type="text" value={form.city} onChange={set("city")} placeholder="e.g. Jaipur" className={inputCls(false)} />
                    </div>
                    <div>
                      <label htmlFor="q-type" className={labelCls}>PROFILE</label>
                      <select id="q-type" value={form.type} onChange={set("type")} className={inputCls(false)}>
                        <option>Classical Cornice</option>
                        <option>Decorative Cornice</option>
                        <option>Layered Cornice</option>
                        <option>Simple Cornice</option>
                        <option>Multiple / custom section</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q-length" className={labelCls}>APPROX. LENGTH</label>
                      <select id="q-length" value={form.length} onChange={set("length")} className={inputCls(false)}>
                        <option>Up to 100 running ft</option>
                        <option>100–500 running ft</option>
                        <option>500–2000 running ft</option>
                        <option>2000+ (project supply)</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="q-finish" className={labelCls}>FINISH</label>
                      <select id="q-finish" value={form.finish} onChange={set("finish")} className={inputCls(false)}>
                        <option>Raw cast (site paint)</option>
                        <option>Factory primed</option>
                        <option>Factory painted — RAL shade</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="q-msg" className={labelCls}>ANYTHING ELSE?</label>
                      <textarea id="q-msg" rows={3} value={form.message} onChange={set("message")} placeholder="Curved lengths, heritage recasting, drawings, deadlines…" className={inputCls(false)} />
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
            Manufacturer of premium FRP and GRC architectural products — cornices, chajjas, jali
            panels and custom facade elements — since 2001.
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
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">PROFILES</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {["Classical Cornice", "Decorative Cornice", "Layered Cornice", "Simple Cornice", "Custom Sections"].map((p) => (
              <li key={p}>
                <a href="#profiles" className="nav-underline text-navy-200 transition-colors hover:text-white">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] text-accent-400">COMPANY</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[...NAV_LINKS, { label: "Process", href: "#process" }].map((l) => (
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
          <p className="text-xs text-steel-500">© {new Date().getFullYear()} Blue Star Plastic Industries. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p className="hidden font-mono text-[9.5px] tracking-[0.2em] text-steel-500 lg:block">
              GRC CORNICES · LANDING PAGE 03 / 10
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
        <Anatomy />
        <Showcase />
        <IdealFor />
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
