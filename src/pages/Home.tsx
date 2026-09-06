/**
 * Home — the Blue Star product register.
 * Opens like a drawing-register index: every sheet in the catalogue listed,
 * grouped by material family, each row linking to its landing page.
 */
import { Link } from "react-router-dom";
import { PRODUCTS } from "../lib/data";
import type { Product } from "../lib/data";
import { Drawing, type Family } from "../lib/drawings";
import {
  ArrowRight,
  CountUp,
  Footer,
  GoLink,
  Header,
  MailIcon,
  PhoneIcon,
  Reveal,
  StarMark,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../lib/ui";

const FAMILY: Record<string, Family> = {
  "frp-chajjas": "chajja",
  "grc-jali-panels": "jali",
  "grc-cornices": "cornice",
  "grc-columns": "column",
  "frp-domes": "dome",
  "grc-balustrades": "balustrade",
  "frp-water-tanks": "tank",
  "grc-facade-panels": "facade",
  "frp-door-frames": "door",
  "frp-planters": "planter",
  "frp-square-planters": "planter",
  "frp-cylinder-planters": "planter",
};

function FamilyChip({ family }: { family: "FRP" | "GRC" }) {
  return (
    <span
      className={`border px-2 py-1 font-mono text-[9px] tracking-[0.2em] ${
        family === "FRP" ? "border-accent-500/70 text-accent-500" : "border-navy-400 text-navy-300"
      }`}
    >
      {family}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Opening — the register desk                                        */
/* ------------------------------------------------------------------ */
function Opening() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper bg-blueprint pb-20 pt-28 md:pt-36">
      <span className="text-outline pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[24vw] leading-none md:text-[17vw]" aria-hidden="true">
        CATALOG
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-navy-600">
                <StarMark className="h-3.5 w-3.5 text-accent-500" />
                MANUFACTURER'S CATALOGUE · EDITION 2026
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-5 font-display text-[64px] leading-[0.95] tracking-[0.01em] text-navy-900 sm:text-8xl xl:text-[112px]">
                THE BLUE STAR
                <br />
                <span className="relative inline-block">
                  REGISTER.
                  <svg viewBox="0 0 320 14" className="absolute -bottom-2 left-0 w-full text-accent-500" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M3 10 C 70 3, 190 3, 317 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-steel-600">
                Ten product families in premium <strong className="font-semibold text-navy-800">FRP</strong> and{" "}
                <strong className="font-semibold text-navy-800">GRC</strong> — chajjas, jali panels, cornices, columns, domes,
                balustrades, tanks, facades, door frames and landscape pieces. Every sheet below is a full specification
                landing page with drawings, data and a 24-hour quote line.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <GoLink
                  to="#register"
                  className="group inline-flex items-center gap-3 bg-accent-500 px-7 py-4 text-[15px] font-bold text-navy-950 shadow-[6px_6px_0_0_var(--color-navy-800)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-accent-400 hover:shadow-[2px_2px_0_0_var(--color-navy-800)]"
                >
                  Open the Register
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </GoLink>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-3 border-2 border-navy-800 px-7 py-[14px] text-[15px] font-semibold text-navy-800 transition-colors duration-200 hover:bg-navy-800 hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </Reveal>
          </div>

          {/* counter ledger */}
          <div className="lg:col-span-4">
            <Reveal delay={200}>
              <div className="grid grid-cols-2 border border-steel-300 bg-white">
                {[
                  { v: PRODUCTS.length, s: "", l: "PRODUCT SHEETS" },
                  { v: 2, s: "", l: "MATERIAL FAMILIES" },
                  { v: 25, s: "+", l: "YEARS MANUFACTURING" },
                  { v: 18, s: "", l: "STATES SERVED" },
                ].map((c, i) => (
                  <div
                    key={c.l}
                    className={`p-6 text-center transition-colors hover:bg-navy-50 ${i % 2 === 1 ? "border-l border-steel-200" : ""} ${
                      i >= 2 ? "border-t border-steel-200" : ""
                    }`}
                  >
                    <p className="font-display text-5xl leading-none text-navy-900">
                      <CountUp to={c.v} suffix={c.s} />
                    </p>
                    <p className="mt-2 font-mono text-[9px] tracking-[0.2em] text-steel-500">{c.l}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">
                ISO 9001:2015 · TALOJA MIDC, NAVI MUMBAI
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  The register — all ten sheets                                      */
/* ------------------------------------------------------------------ */
function Register() {
  return (
    <section id="register" className="scroll-mt-24 bg-paper py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">01 / DRAWING REGISTER</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                ELEVEN SHEETS,
                <br />
                ONE WORKS.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-steel-600 md:pb-2 md:text-right">
              Every row opens a full product landing page — drawings, advantages, comparisons, process and a quote form.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 hidden border-t-2 border-navy-900 md:block">
            {PRODUCTS.map((p, i) => (
              <Link
                key={p.slug}
                to={`/p/${p.slug}`}
                className="group grid grid-cols-12 items-center gap-4 border-b border-steel-300 py-5 transition-all duration-300 hover:border-navy-900 hover:bg-white hover:pl-4"
              >
                <span className="col-span-1 font-mono text-[11px] tracking-[0.2em] text-steel-500 transition-colors group-hover:text-accent-700">
                  {p.code}
                </span>
                <span className="col-span-1">
                  <FamilyChip family={p.family} />
                </span>
                <span className="col-span-4 font-display text-[26px] leading-none tracking-[0.02em] text-navy-900 transition-colors group-hover:text-navy-700">
                  {p.name}
                </span>
                <span className="col-span-4 text-sm text-steel-600">{p.registerLine}</span>
                <span className="col-span-2 flex items-center justify-end gap-2 font-mono text-[10px] tracking-[0.22em] text-navy-800">
                  OPEN SHEET
                  <ArrowRight className="h-3.5 w-3.5 text-accent-600 transition-transform duration-200 group-hover:translate-x-1.5" />
                </span>
                {i === PRODUCTS.length - 1 && <span className="sr-only">End of register</span>}
              </Link>
            ))}
          </div>

          {/* mobile register */}
          <div className="mt-10 space-y-4 md:hidden">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                to={`/p/${p.slug}`}
                className="group flex items-center justify-between gap-4 border border-steel-300 bg-white p-5 transition-all duration-300 hover:border-navy-900"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-steel-500">{p.code}</span>
                    <FamilyChip family={p.family} />
                  </div>
                  <p className="mt-2 font-display text-2xl leading-none text-navy-900">{p.name}</p>
                  <p className="mt-1.5 text-sm text-steel-600">{p.registerLine}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent-600 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Family range panels                                                */
/* ------------------------------------------------------------------ */
function FamilyRange({
  id,
  family,
  kicker,
  title,
  intro,
  dark,
}: {
  id: string;
  family: "FRP" | "GRC";
  kicker: string;
  title: string[];
  intro: string;
  dark?: boolean;
}) {
  const items = PRODUCTS.filter((p) => p.family === family);
  return (
    <section id={id} className={`scroll-mt-24 py-24 ${dark ? "bg-navy-950 bg-blueprint-dark" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
            <p className={`max-w-sm text-sm leading-relaxed lg:pb-2 lg:text-right ${dark ? "text-navy-200" : "text-steel-600"}`}>{intro}</p>
          </div>
        </Reveal>

        <div className={`mt-12 grid gap-5 sm:grid-cols-2 ${items.length > 5 ? "lg:grid-cols-3" : "lg:grid-cols-5"}`}>
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link
                to={`/p/${p.slug}`}
                className={`group flex h-full flex-col border p-4 transition-all duration-300 hover:-translate-y-1.5 ${
                  dark
                    ? "border-navy-800 bg-navy-900/50 hover:border-accent-500 hover:bg-navy-900"
                    : "border-steel-300 bg-paper hover:border-navy-900 hover:shadow-[8px_8px_0_0_rgba(21,44,79,0.08)]"
                }`}
              >
                <div className={`border p-1 transition-colors duration-500 ${dark ? "border-navy-800 bg-navy-950" : "border-steel-200 bg-white"}`}>
                  <Drawing family={FAMILY[p.slug]} variant={p.showcase[0].variant} dim="" />
                </div>
                <p className={`mt-3 font-mono text-[9px] tracking-[0.22em] ${dark ? "text-steel-500" : "text-steel-500"}`}>{p.code}</p>
                <h3 className={`mt-1 font-display text-xl leading-tight tracking-[0.02em] ${dark ? "text-white" : "text-navy-900"}`}>{p.name}</h3>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 font-mono text-[9.5px] tracking-[0.2em] text-accent-500">
                  OPEN <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact band                                                       */
/* ------------------------------------------------------------------ */
function ContactBand() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-accent-500 py-20 text-navy-950">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em]">CUSTOM WORK WELCOME</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.98] sm:text-6xl md:text-7xl">
              CAN'T FIND YOUR PROFILE?
              <br />
              WE CAST TO DRAWING.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] font-medium leading-relaxed text-navy-900/80">
              Send a sketch, a CAD file or a photograph of what you have in mind — if it can be moulded in FRP or GRC, our
              Taloja works will quote it within 24 hours.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={140}>
            <div className="flex flex-col gap-4">
              <GoLink
                to="/p/frp-chajjas#quote"
                className="group inline-flex items-center justify-center gap-3 bg-navy-950 px-7 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:bg-navy-800"
              >
                Request a Custom Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </GoLink>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-3 border-2 border-navy-950 px-7 py-[14px] text-[15px] font-bold text-navy-950 transition-colors duration-200 hover:bg-navy-950 hover:text-white"
              >
                <PhoneIcon className="h-4 w-4" />
                Call: {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-3 px-7 py-2 font-mono text-[11px] tracking-[0.2em] text-navy-950 underline decoration-2 underline-offset-4 transition-opacity hover:opacity-75"
              >
                <MailIcon className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-sans text-ink">
      <Header mode="home" />
      <main>
        <Opening />
        <Register />
        <FamilyRange
          id="frp"
          family="FRP"
          kicker="02 / FIBRE REINFORCED POLYMER"
          title={["THE FRP", "RANGE."]}
          intro="Composites that laugh at rust: window chajjas, skylight domes, water tanks, door frames and feather-light planters — moulded, gelcoat-finished, one-hand movable."
        />
        <FamilyRange
          id="grc"
          family="GRC"
          dark
          kicker="03 / GLASSFIBRE REINFORCED CONCRETE"
          title={["THE GRC", "RANGE."]}
          intro="Stone's elegance at a fraction of the weight: jali panels, cornices, columns, balustrades, facade cladding and landscape pieces."
        />
        <ContactBand />
      </main>
      <Footer mode="home" />
    </div>
  );
}
