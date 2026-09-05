/**
 * Product landing-page template — one instance per product family.
 * Section order: Hero → Ticker → Features → [Applications] → [Anatomy] →
 * Showcase → Comparison → Stats → Process → Quote → More from register → Footer.
 */
import { Link, Navigate, useParams } from "react-router-dom";
import { findProduct, PRODUCTS } from "../lib/data";
import type { Product } from "../lib/data";
import { Drawing } from "../lib/drawings";
import {
  AnatomySection,
  ArrowRight,
  CheckIcon,
  CountUp,
  Footer,
  GoLink,
  Header,
  Icon,
  QuoteSection,
  Reveal,
  SectionHead,
  StarMark,
  Ticker,
  useInView,
} from "../lib/ui";

/** Strip the legacy "02 / " prefix so the template can renumber sections. */
const stripNo = (s: string) => s.replace(/^\d+\s*\/\s*/, "");

/** Slug → drawing family in the SVG registry. */
const DRAWING_FAMILY: Record<string, import("../lib/drawings").Family> = {
  "frp-chajjas": "chajja",
  "grc-jali-panels": "jali",
  "grc-cornices": "cornice",
  "grc-columns": "column",
  "frp-domes": "dome",
  "grc-balustrades": "balustrade",
  "frp-water-tanks": "tank",
  "grc-facade-panels": "facade",
  "frp-door-frames": "door",
  "grc-planters": "planter",
};
const fam = (slug: string) => DRAWING_FAMILY[slug] ?? "chajja";

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero({ product }: { product: Product }) {
  const h = product.hero;
  return (
    <section id="top" className="relative overflow-hidden bg-paper bg-blueprint pb-24 pt-28 md:pt-36">
      <span className="text-outline pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[22vw] leading-none md:text-[16vw]" aria-hidden="true">
        {h.watermark}
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-navy-600">
              <StarMark className="h-3.5 w-3.5 text-accent-500" />
              {h.kicker}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[46px] leading-[1.0] tracking-[0.015em] text-navy-900 sm:text-6xl xl:text-[76px]">
              {h.lines.map((l) => (
                <span key={l.text} className="block">
                  {l.underline ? (
                    <span className="relative inline-block">
                      {l.text}
                      <svg viewBox="0 0 320 14" className="absolute -bottom-2 left-0 w-full text-accent-500" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M3 10 C 70 3, 190 3, 317 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                      </svg>
                    </span>
                  ) : (
                    l.text
                  )}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-steel-600">{h.sub}</p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <GoLink
                to="#quote"
                className="group inline-flex items-center gap-3 bg-accent-500 px-7 py-4 text-[15px] font-bold text-navy-950 shadow-[6px_6px_0_0_var(--color-navy-800)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-accent-400 hover:shadow-[2px_2px_0_0_var(--color-navy-800)]"
              >
                Request a Custom Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </GoLink>
              <GoLink
                to="#showcase"
                className="inline-flex items-center gap-3 border-2 border-navy-800 px-7 py-[14px] text-[15px] font-semibold text-navy-800 transition-colors duration-200 hover:bg-navy-800 hover:text-white"
              >
                Explore Designs
              </GoLink>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {["ISO 9001:2015 CERTIFIED", "10-YEAR WARRANTY", "PAN-INDIA SUPPLY"].map((t) => (
                <li key={t} className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-steel-600">
                  <CheckIcon className="h-3.5 w-3.5 text-accent-600" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* media panel */}
        <div className="lg:col-span-6">
          <Reveal delay={200}>
            <div className="relative mr-2 lg:mr-6">
              <span className="absolute -left-2 -top-2 h-7 w-7 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -right-2 -top-2 h-7 w-7 border-r-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -left-2 h-7 w-7 border-b-[3px] border-l-[3px] border-accent-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -right-2 h-7 w-7 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />

              <div className="relative overflow-hidden border border-steel-300 bg-navy-900">
                {h.media === "photo" && h.img ? (
                  <>
                    <img src={h.img} alt={h.imgAlt ?? product.name} className="kenburns aspect-[4/3] w-full object-cover" loading="eager" />
                    <span className="absolute right-4 top-4 border border-white/25 bg-navy-950/75 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.25em] text-navy-100">
                      {h.stamp}
                    </span>
                  </>
                ) : (
                  <div className="bg-navy-50 px-6 pb-4 pt-12">
                    <span className="absolute left-4 top-4 font-mono text-[9.5px] tracking-[0.25em] text-steel-500">
                      ELEVATION · {product.familyLabel}
                    </span>
                    <span className="absolute right-4 top-4 border border-navy-800/30 bg-white px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.25em] text-navy-800">
                      {h.stamp}
                    </span>
                    <Drawing family={fam(product.slug)} variant={h.drawingVariant} dim={h.dimLabel} />
                  </div>
                )}
              </div>

              <div className="float-tag absolute -bottom-7 left-5 right-5 border border-steel-200 border-l-4 border-l-accent-500 bg-white p-4 shadow-xl shadow-navy-900/10 sm:right-auto sm:w-80">
                <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-700">{h.tag.kicker}</p>
                <p className="mt-1.5 text-sm font-semibold text-navy-900">{h.tag.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-steel-600">{h.tag.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features (key advantages)                                          */
/* ------------------------------------------------------------------ */
function Features({ product, no }: { product: Product; no: string }) {
  return (
    <section id="features" className="scroll-mt-24 bg-paper py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker={`${no} / KEY ADVANTAGES`}
          title={[`THE ${product.name.toUpperCase()}`, "ADVANTAGE."]}
          aside={`Three reasons specifiers across India choose Blue Star ${product.familyLabel.toLowerCase()} over the conventional route.`}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {product.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 130}>
              <article className="group relative h-full border border-steel-300 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-800 hover:shadow-[10px_10px_0_0_rgba(21,44,79,0.08)]">
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center border border-navy-800 text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-400">
                    <Icon name={f.icon} className="h-7 w-7" />
                  </span>
                  <span className="font-display text-4xl text-steel-200 transition-colors duration-300 group-hover:text-accent-500">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[28px] tracking-[0.02em] text-navy-900">{f.title}</h3>
                <p className="mt-1 font-semibold text-navy-700">{f.lead}</p>
                <ul className="mt-5 space-y-2.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-snug text-steel-600">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-600" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-steel-200 pt-4 font-mono text-[9.5px] tracking-[0.2em] text-steel-400 transition-colors duration-300 group-hover:text-navy-600">
                  {f.note}
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
/*  Applications / Ideal For                                           */
/* ------------------------------------------------------------------ */
function Applications({ product, no }: { product: Product; no: string }) {
  if (!product.applications) return null;
  return (
    <section id="applications" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker={`${no} / IDEAL FOR`}
          title={["WHERE THEY", "BELONG."]}
          aside="Four recurring project types where this product family earns its keep — with the specification we recommend for each."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.applications.map((a, i) => (
            <Reveal key={a.title} delay={i * 110}>
              <div className="group h-full border border-steel-200 bg-paper p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-800 hover:bg-navy-950">
                <span className="flex h-12 w-12 items-center justify-center border border-navy-800 text-navy-800 transition-colors duration-300 group-hover:border-accent-500 group-hover:text-accent-400">
                  <Icon name={a.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl tracking-[0.02em] text-navy-900 transition-colors duration-300 group-hover:text-white">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600 transition-colors duration-300 group-hover:text-navy-200">{a.desc}</p>
                <p className="mt-5 border-t border-steel-200 pt-3 font-mono text-[9.5px] tracking-[0.2em] text-accent-700 transition-colors duration-300 group-hover:border-navy-800 group-hover:text-accent-400">
                  {a.chip}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Showcase                                                           */
/* ------------------------------------------------------------------ */
function Showcase({ product, no }: { product: Product; no: string }) {
  const cols = product.showcaseCols === "2/3" ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  return (
    <section id="showcase" className="scroll-mt-24 bg-paper bg-blueprint py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker={`${no} / PRODUCT SHOWCASE`}
          title={["THE DESIGN", "REGISTER."]}
          aside={`Every ${product.familyLabel.toLowerCase()} below is made to order. Hover a drawing for the night-shift blueprint view.`}
        />
        <div className={`mt-14 grid gap-6 ${cols}`}>
          {product.showcase.map((s, i) => (
            <Reveal key={s.code} delay={(i % 4) * 110}>
              <article className="group flex h-full flex-col border border-steel-300 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-600 hover:shadow-[10px_10px_0_0_rgba(245,168,28,0.18)]">
                <div className="relative border-b border-steel-200 bg-navy-50 p-3 transition-colors duration-500 group-hover:border-navy-800 group-hover:bg-navy-950">
                  <div className="flex items-start justify-between px-2 pt-1">
                    <span className="font-mono text-[9.5px] tracking-[0.2em] text-steel-500 transition-colors duration-500 group-hover:text-navy-300">
                      {s.code}
                    </span>
                    {s.tag && <span className="bg-accent-500 px-2 py-1 font-mono text-[8.5px] tracking-[0.18em] text-navy-950">{s.tag}</span>}
                  </div>
                  <Drawing family={fam(product.slug)} variant={s.variant} dim={s.dimLabel} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[26px] tracking-[0.02em] text-navy-900">{s.name}</h3>
                  <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.2em] text-accent-700">{s.dimLabel}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-steel-600">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.specs.map((sp) => (
                      <li key={sp} className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.08em] text-steel-600">
                        <span className="h-1.5 w-1.5 shrink-0 bg-accent-500" aria-hidden="true" />
                        {sp.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                  <GoLink
                    to="#quote"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-navy-800 transition-colors group-hover:text-accent-700"
                  >
                    Get pricing
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </GoLink>
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
/*  Comparison                                                         */
/* ------------------------------------------------------------------ */
function Comparison({ product, no }: { product: Product; no: string }) {
  const c = product.comparison;
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden bg-navy-950 bg-blueprint-dark py-24 text-navy-100">
      <span className="text-outline-light pointer-events-none absolute -right-4 top-6 select-none font-display text-[11rem] leading-none md:text-[16rem]" aria-hidden="true">
        VS
      </span>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead dark kicker={`${no} / ${stripNo(c.kicker)}`} title={c.title} />
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
                    <span className="font-display text-xl tracking-[0.04em] text-white">{c.highlight}</span>
                  </th>
                  {c.cols.map((col) => (
                    <th key={col} className="p-4 font-mono text-[10.5px] tracking-[0.2em] text-steel-400">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row) => (
                  <tr key={row.label} className="border-t border-navy-800 transition-colors hover:bg-navy-900/50">
                    <td className="p-4 font-mono text-[11px] tracking-[0.12em] text-steel-400">{row.label.toUpperCase()}</td>
                    <td className="border-x border-accent-500/25 bg-navy-800/70 p-4 text-sm font-semibold text-white">
                      <span className="flex items-center gap-2.5">
                        <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent-400" />
                        {row.cells[0]}
                      </span>
                    </td>
                    {row.cells.slice(1).map((cell, i) => (
                      <td key={i} className="p-4 text-sm text-navy-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-steel-500">{c.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats band                                                         */
/* ------------------------------------------------------------------ */
function StatsBand({ product }: { product: Product }) {
  return (
    <section className="bg-accent-500 text-navy-950">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {product.stats.map((s, i) => (
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
/*  Process                                                            */
/* ------------------------------------------------------------------ */
function Process({ product, no }: { product: Product; no: string }) {
  const p = product.process;
  return (
    <section id="process" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-700">{`${no} / ${stripNo(p.kicker)}`}</p>
              <h2 className="mt-3 font-display text-5xl leading-none text-navy-900 sm:text-6xl">
                {p.title.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-steel-600">{p.intro}</p>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative mt-9">
                <span className="absolute -left-2 -top-2 h-6 w-6 border-l-[3px] border-t-[3px] border-accent-500" aria-hidden="true" />
                <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-[3px] border-r-[3px] border-accent-500" aria-hidden="true" />
                <div className="overflow-hidden border border-steel-300 bg-navy-900">
                  {p.media === "photo" && p.img ? (
                    <img src={p.img} alt={p.imgAlt ?? "Blue Star workshop"} className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]" loading="lazy" />
                  ) : (
                    <div className="bg-navy-50 p-4">
                      <Drawing family={fam(product.slug)} variant={p.drawingVariant} dim={product.familyDim} />
                    </div>
                  )}
                </div>
                <p className="mt-3 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">{p.caption}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative">
            <span className="absolute bottom-4 left-[21px] top-4 w-px bg-steel-300" aria-hidden="true" />
            <ol className="space-y-4">
              {p.steps.map((step, i) => (
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
/*  More from the register — cross links to sibling sheets             */
/* ------------------------------------------------------------------ */
function MoreFromRegister({ product }: { product: Product }) {
  const idx = PRODUCTS.findIndex((p) => p.slug === product.slug);
  const others = [1, 2, 3].map((n) => PRODUCTS[(idx + n) % PRODUCTS.length]);
  return (
    <section className="border-t border-navy-800 bg-navy-950 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent-400">MORE FROM THE REGISTER</p>
              <h2 className="mt-2 font-display text-4xl text-white">NEXT SHEETS ON THE TABLE.</h2>
            </div>
            <GoLink to="/" className="nav-underline inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-navy-200 transition-colors hover:text-accent-400">
              FULL REGISTER <ArrowRight className="h-3.5 w-3.5" />
            </GoLink>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 110}>
              <Link
                to={`/p/${p.slug}`}
                className="group flex h-full flex-col border border-navy-800 bg-navy-900/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-500 hover:bg-navy-900"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-steel-500 transition-colors group-hover:text-accent-400">{p.code}</span>
                  <span className={`border px-2 py-1 font-mono text-[9px] tracking-[0.18em] ${p.family === "FRP" ? "border-accent-500/60 text-accent-400" : "border-navy-600 text-navy-200"}`}>
                    {p.family}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-[0.02em] text-white">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-400">{p.registerLine}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[10.5px] tracking-[0.2em] text-accent-400">
                  OPEN SHEET <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
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
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ProductPage() {
  const { slug } = useParams();
  const product = slug ? findProduct(slug) : undefined;
  const topRef = useInView<HTMLDivElement>(0); // anchor target marker
  if (!product) return <Navigate to="/" replace />;

  // Section numbering adapts to which optional sections this page carries.
  let n = 0;
  const next = () => String(++n).padStart(2, "0");
  const noFeatures = next();
  const noApps = product.applications ? next() : null;
  const noAnatomy = product.anatomy ? next() : null;
  const noShowcase = next();
  const noComparison = next();
  const noProcess = next();

  const pageNo = String(PRODUCTS.findIndex((p) => p.slug === product.slug) + 1).padStart(2, "0");

  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-sans text-ink">
      <div ref={topRef.ref} id="top" />
      <Header mode="product" />
      <main>
        <Hero product={product} />
        <Ticker items={product.ticker} />
        <Features product={product} no={noFeatures} />
        {product.applications && noApps && <Applications product={product} no={noApps} />}
        {product.anatomy && noAnatomy && <AnatomySection product={product} kicker={`${noAnatomy} / ${stripNo(product.anatomy.kicker)}`} />}
        <Showcase product={product} no={noShowcase} />
        <Comparison product={product} no={noComparison} />
        <StatsBand product={product} />
        <Process product={product} no={noProcess} />
        <QuoteSection product={product} />
        <MoreFromRegister product={product} />
      </main>
      <Footer mode="product" pageNo={pageNo} />
    </div>
  );
}
