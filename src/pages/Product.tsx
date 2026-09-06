/**
 * Product landing-page template — one instance per product family.
 * Section order: Hero → Ticker → Features → [Applications] → [Anatomy] →
 * Showcase → Comparison → Stats → Process → Quote → More from register → Footer.
 */
import { useState } from "react";
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
  "frp-planters": "planter",
  "frp-square-planters": "planter",
  "frp-cylinder-planters": "planter",
  "frp-tree-planters": "planter",
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
          <Reveal variant="fade">
            <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-navy-600">
              <StarMark className="h-3.5 w-3.5 text-accent-500" />
              {h.kicker}
            </p>
          </Reveal>

          <Reveal variant="fade" delay={120}>
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

          <Reveal variant="fade" delay={240}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-steel-600">{h.sub}</p>
          </Reveal>

          <Reveal variant="fade" delay={360}>
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

          <Reveal variant="fade" delay={480}>
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
          <Reveal gentle delay={300}>
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
  const cols =
    product.showcaseCols === "2/3"
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : product.showcaseCols === "2/3/5"
        ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
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
            <Reveal key={s.code} gentle delay={Math.min(i * 90, 360)}>
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
            <Reveal gentle delay={i * 90}>
              <p className="font-display text-5xl leading-none sm:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase">{s.label}</p>
            </Reveal>
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
/*  The size run — interactive Montroy Cube sizer                      */
/* ------------------------------------------------------------------ */
const CUBE_SIZES = [
  { inch: 16, mm: 400, L: 25, kg: 3, plant: "Herbs & succulents", s: 0.5 },
  { inch: 20, mm: 500, L: 45, kg: 5, plant: "Seasonal flowers", s: 0.62 },
  { inch: 24, mm: 600, L: 80, kg: 7, plant: "All-rounder greens", s: 0.74 },
  { inch: 30, mm: 750, L: 150, kg: 10, plant: "Palms & statements", s: 0.87 },
  { inch: 40, mm: 1000, L: 330, kg: 14, plant: "Small trees", s: 1 },
];

/** Large cube elevation for the sizer stage — labelled with the live size. */
function CubeArt({ mm }: { mm: number }) {
  const W = 220;
  const cx = 180;
  const yB = 300;
  const x0 = cx - W / 2;
  const x1 = cx + W / 2;
  const y0 = yB - W;
  const d = 40;
  const rise = 25;
  return (
    <svg viewBox="0 0 360 340" className="w-full max-w-md text-navy-800" role="img" aria-label={`Montroy Cube, ${mm} millimetre elevation`}>
      <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.4">
        {/* front face */}
        <path d={`M${x0} ${yB} V${y0} H${x1} V${yB} Z`} />
        {/* open top + side */}
        <path d={`M${x0} ${y0} L${x0 + d} ${y0 - rise} H${x1 + d} L${x1} ${y0} Z`} />
        <path d={`M${x1} ${y0} L${x1 + d} ${y0 - rise} V${yB - rise} L${x1} ${yB} Z`} />
        {/* inner rim lip */}
        <path d={`M${x0 + 14} ${y0 - 7} h ${W - 28} l 16 -10 h ${-(W - 28)} Z`} strokeWidth="1.5" />
        {/* gelcoat shadow line */}
        <line x1={x0 + 10} y1={y0 + 14} x2={x1 - 10} y2={y0 + 14} strokeWidth="1.4" />
      </g>
      {/* moulded-in feet */}
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x={x0 + 14} y={yB} width="16" height="7" />
        <rect x={x1 - 30} y={yB} width="16" height="7" />
      </g>
      {/* live dimension */}
      <g className="text-steel-500" stroke="currentColor" strokeWidth="1">
        <line x1={x0} y1="322" x2={x1} y2="322" />
        <path d={`M${x0 + 6} 318.5 ${x0} 322l6 3.5`} />
        <path d={`M${x1 - 6} 318.5 ${x1} 322l-6 3.5`} />
        <text x="180" y="316" textAnchor="middle" fontSize="9" letterSpacing="1.8" fontFamily="IBM Plex Mono, monospace" fill="currentColor" stroke="none">
          {mm} MM SQ.
        </text>
      </g>
    </svg>
  );
}

function SizerSection({ product, no }: { product: Product; no: string }) {
  const [idx, setIdx] = useState(2); // default to the 24″ best-seller
  const sz = CUBE_SIZES[idx];
  const s = product.sizer;
  if (!s) return null;

  return (
    <section id="sizes" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker={`${no} / ${stripNo(s.kicker)}`}
          title={s.lines}
          aside={s.intro}
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
          {/* Controls + live readout */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[10.5px] tracking-[0.2em] text-steel-600">SELECT A SIZE</p>
            <div className="mt-3 flex flex-wrap gap-2.5" role="group" aria-label="Montroy Cube size selector">
              {CUBE_SIZES.map((c, i) => (
                <button
                  key={c.inch}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-pressed={i === idx}
                  className={`border px-4 py-2.5 font-mono text-sm transition-all duration-200 ${
                    i === idx
                      ? "border-accent-600 bg-accent-500 font-semibold text-navy-950 shadow-[4px_4px_0_0_var(--color-navy-800)]"
                      : "border-steel-300 bg-paper text-navy-800 hover:-translate-y-0.5 hover:border-navy-800"
                  }`}
                >
                  {c.inch}″
                </button>
              ))}
            </div>

            <div key={sz.inch} className="mt-8 grid grid-cols-2 border border-steel-300 bg-paper">
              {[
                { l: "SIZE", v: `${sz.mm}`, u: "MM" },
                { l: "SOIL VOLUME", v: `${sz.L}`, u: "LITRES" },
                { l: "EMPTY WEIGHT", v: `≈ ${sz.kg}`, u: "KG" },
                { l: "PLANTS", v: sz.plant, u: "" },
              ].map((cell, i) => (
                <div key={cell.l} className={`p-5 ${i % 2 === 1 ? "border-l border-steel-200" : ""} ${i >= 2 ? "border-t border-steel-200" : ""}`}>
                  <p className="font-mono text-[9px] tracking-[0.22em] text-steel-500">{cell.l}</p>
                  <p className="mt-1 font-display text-[26px] leading-none text-navy-900">
                    {cell.v}
                    {cell.u && <span className="ml-1.5 font-mono text-[10px] tracking-[0.15em] text-accent-700">{cell.u}</span>}
                  </p>
                </div>
              ))}
            </div>

            <GoLink
              to="#quote"
              className="group mt-7 inline-flex items-center gap-3 border-2 border-navy-800 px-6 py-3.5 text-sm font-semibold text-navy-800 transition-colors duration-200 hover:bg-navy-800 hover:text-white"
            >
              Quote the {sz.inch}″ cube
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </GoLink>
          </div>

          {/* Scaling cube stage */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative border border-steel-300 bg-navy-50 bg-blueprint px-6 pb-2 pt-10">
                <span className="absolute left-4 top-3.5 font-mono text-[9.5px] tracking-[0.25em] text-steel-500">
                  MONTROY CUBE · ELEVATION, DRAWN TO SCALE
                </span>
                <span className="absolute right-4 top-3 border border-navy-800/30 bg-white px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.25em] text-navy-800">
                  {sz.mm} × {sz.mm} H
                </span>
                <div
                  className="mx-auto max-w-md"
                  style={{
                    transform: `scale(${sz.s})`,
                    transformOrigin: "50% 88%",
                    transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <CubeArt mm={sz.mm} />
                </div>

                {/* mini size ruler */}
                <div className="flex items-end justify-center gap-3 pb-5 pt-2" aria-hidden="true">
                  {CUBE_SIZES.map((c, i) => (
                    <button
                      key={c.inch}
                      type="button"
                      tabIndex={-1}
                      onClick={() => setIdx(i)}
                      className={`border transition-colors duration-300 ${
                        i === idx ? "border-accent-600 bg-accent-500" : "border-navy-800/40 bg-white hover:border-navy-800"
                      }`}
                      style={{ width: c.inch * 0.9, height: c.inch * 0.9 }}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Cylinder proportion study — Rio Grande vs Corry, drawn to scale    */
/* ------------------------------------------------------------------ */
const CYL_MODELS = [
  {
    id: "rio",
    name: "Rio Grande",
    tag: "CLASSIC WIDE",
    desc: "The classic wide cylinder — a generous rim and a low, grounded stance for wide-canopy planting and paired entries.",
    wmm: 450,
    hmm: 400,
    soil: "≈ 47 L",
    weight: "≈ 5.5 kg",
    best: "Wide-canopy greens, entry pairs, pool decks",
  },
  {
    id: "corry",
    name: "Corry",
    tag: "TALL & SLEEK",
    desc: "Tall and sleek — a slim vertical that draws the eye up, made for palms, grasses and privacy columns.",
    wmm: 300,
    hmm: 900,
    soil: "≈ 52 L",
    weight: "≈ 6 kg",
    best: "Palms, grasses, privacy columns, slim corners",
  },
];

function CylinderStudy({ product, no }: { product: Product; no: string }) {
  const s = product.study!;
  const [sel, setSel] = useState(0);

  const S = 0.3; // drawing scale, px per mm
  const GY = 330; // ground line
  const cx = [160, 360];
  const m = CYL_MODELS[sel];

  return (
    <section id="study" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead kicker={`${no} / ${stripNo(s.kicker)}`} title={s.lines} aside={s.intro} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Scale drawing panel */}
          <Reveal className="lg:col-span-7">
            <div className="relative h-full border border-steel-300 bg-navy-50 p-4 sm:p-8">
              <span className="font-mono text-[9.5px] tracking-[0.25em] text-steel-500">
                PROPORTION STUDY · BOTH DRAWN TO THE SAME SCALE
              </span>
              <svg
                viewBox="0 0 520 380"
                className="mt-4 w-full text-navy-800"
                role="group"
                aria-label="Rio Grande and Corry cylinder planters, drawn to the same scale"
              >
                <defs>
                  <pattern id="studygrid" width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M16 0H0V16" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" fill="none" />
                  </pattern>
                </defs>
                <rect width="520" height="380" fill="url(#studygrid)" />
                <line x1="30" y1={GY} x2="490" y2={GY} stroke="currentColor" strokeWidth="2.2" />

                {CYL_MODELS.map((mm, i) => {
                  const rx = (mm.wmm * S) / 2;
                  const h = mm.hmm * S;
                  const top = GY - h;
                  const active = sel === i;
                  return (
                    <g
                      key={mm.id}
                      onClick={() => setSel(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSel(i);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={active}
                      className={`cursor-pointer transition-opacity duration-500 focus:outline-none ${
                        active ? "opacity-100" : "opacity-30 hover:opacity-60"
                      }`}
                    >
                      {/* plant */}
                      <g stroke="currentColor" fill="none" strokeLinecap="round" strokeWidth={active ? 1.8 : 1.5}>
                        {i === 0 ? (
                          <>
                            <path d={`M${cx[i]} ${top - 6} C ${cx[i] - 24} ${top - 20} ${cx[i] - 40} ${top - 24} ${cx[i] - 54} ${top - 22} C ${cx[i] - 40} ${top - 34} ${cx[i] - 18} ${top - 30} ${cx[i]} ${top - 16}`} />
                            <path d={`M${cx[i]} ${top - 6} C ${cx[i] + 24} ${top - 20} ${cx[i] + 40} ${top - 24} ${cx[i] + 54} ${top - 22} C ${cx[i] + 40} ${top - 34} ${cx[i] + 18} ${top - 30} ${cx[i]} ${top - 16}`} />
                            <path d={`M${cx[i]} ${top - 6} C ${cx[i] - 4} ${top - 22} ${cx[i] - 2} ${top - 34} ${cx[i] + 6} ${top - 44} C ${cx[i] + 12} ${top - 32} ${cx[i] + 8} ${top - 18} ${cx[i] + 2} ${top - 8}`} />
                          </>
                        ) : (
                          <>
                            <path d={`M${cx[i]} ${top - 4} C ${cx[i] - 2} ${top - 24} ${cx[i] - 6} ${top - 40} ${cx[i] - 16} ${top - 50}`} />
                            <path d={`M${cx[i]} ${top - 4} C ${cx[i] + 1} ${top - 28} ${cx[i] + 3} ${top - 44} ${cx[i] + 1} ${top - 56}`} />
                            <path d={`M${cx[i]} ${top - 4} C ${cx[i] + 3} ${top - 24} ${cx[i] + 7} ${top - 40} ${cx[i] + 17} ${top - 50}`} />
                            <path d={`M${cx[i] - 8} ${top - 2} C ${cx[i] - 14} ${top - 12} ${cx[i] - 20} ${top - 16} ${cx[i] - 28} ${top - 14}`} strokeWidth={active ? 1.4 : 1.2} />
                            <path d={`M${cx[i] + 8} ${top - 2} C ${cx[i] + 14} ${top - 12} ${cx[i] + 20} ${top - 16} ${cx[i] + 28} ${top - 14}`} strokeWidth={active ? 1.4 : 1.2} />
                          </>
                        )}
                      </g>
                      {/* rim + body */}
                      <g stroke="currentColor" fill="none" strokeLinejoin="round" strokeWidth={active ? 2.4 : 2}>
                        <ellipse cx={cx[i]} cy={top} rx={rx} ry={rx * 0.17} />
                        <ellipse cx={cx[i]} cy={top} rx={rx * 0.82} ry={rx * 0.13} strokeWidth="1.2" strokeDasharray="4 4" />
                        <path d={`M${cx[i] - rx} ${top} V${GY} A${rx} ${rx * 0.17} 0 0 0 ${cx[i] + rx} ${GY} V${top}`} />
                        <path
                          d={`M${cx[i] - rx * 0.65} ${top + h * 0.16} C ${cx[i] - rx * 0.72} ${top + h * 0.5} ${cx[i] - rx * 0.72} ${top + h * 0.75} ${cx[i] - rx * 0.6} ${top + h * 0.9}`}
                          strokeWidth="1"
                          strokeOpacity="0.45"
                        />
                      </g>
                      {/* dimension lines */}
                      <g className={active ? "text-accent-600" : "text-steel-400"} fill="none" stroke="currentColor" strokeWidth="1">
                        <line x1={cx[i] - rx} y1={GY + 16} x2={cx[i] + rx} y2={GY + 16} />
                        <path d={`M${cx[i] - rx + 5} ${GY + 12.5} L${cx[i] - rx} ${GY + 16} L${cx[i] - rx + 5} ${GY + 19.5}`} />
                        <path d={`M${cx[i] + rx - 5} ${GY + 12.5} L${cx[i] + rx} ${GY + 16} L${cx[i] + rx - 5} ${GY + 19.5}`} />
                        <text x={cx[i]} y={GY + 31} textAnchor="middle" fontSize="9" letterSpacing="1.5" fontFamily="IBM Plex Mono, monospace" fill="currentColor" stroke="none">
                          Ø {mm.wmm} MM
                        </text>
                        <line x1={cx[i] + rx + 16} y1={top} x2={cx[i] + rx + 16} y2={GY} />
                        <path d={`M${cx[i] + rx + 12.5} ${top + 5} L${cx[i] + rx + 16} ${top} L${cx[i] + rx + 19.5} ${top + 5}`} />
                        <path d={`M${cx[i] + rx + 12.5} ${GY - 5} L${cx[i] + rx + 16} ${GY} L${cx[i] + rx + 19.5} ${GY - 5}`} />
                        <text
                          x={cx[i] + rx + 27}
                          y={(top + GY) / 2}
                          fontSize="9"
                          letterSpacing="1.5"
                          fontFamily="IBM Plex Mono, monospace"
                          fill="currentColor"
                          stroke="none"
                          textAnchor="middle"
                          transform={`rotate(90 ${cx[i] + rx + 27} ${(top + GY) / 2})`}
                        >
                          {mm.hmm} MM H
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
              <p className="mt-3 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">
                CLICK A SILHOUETTE TO READ ITS PROPORTIONS
              </p>
            </div>
          </Reveal>

          {/* Readout */}
          <Reveal delay={150} className="lg:col-span-5">
            <div className="flex h-full flex-col border border-steel-300 bg-paper p-7 sm:p-9">
              <div className="flex gap-3">
                {CYL_MODELS.map((mm, i) => (
                  <button
                    key={mm.id}
                    type="button"
                    onClick={() => setSel(i)}
                    aria-pressed={sel === i}
                    className={`flex-1 border px-4 py-3 font-mono text-[10px] tracking-[0.2em] transition-all duration-300 ${
                      sel === i
                        ? "border-navy-900 bg-navy-900 text-white"
                        : "border-steel-300 bg-white text-steel-600 hover:border-navy-800 hover:text-navy-900"
                    }`}
                  >
                    {mm.name.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-700">{m.tag}</p>
                <h3 className="mt-2 font-display text-5xl leading-none text-navy-900">{m.name.toUpperCase()}</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-600">{m.desc}</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {(
                    [
                      ["DIAMETER", `Ø ${m.wmm} MM`],
                      ["HEIGHT", `${m.hmm} MM`],
                      ["CAPACITY", m.soil],
                      ["WEIGHT", m.weight],
                    ] as [string, string][]
                  ).map(([k, val]) => (
                    <div key={k} className="border border-steel-200 bg-white p-4">
                      <p className="font-mono text-[9px] tracking-[0.2em] text-steel-500">{k}</p>
                      <p className="mt-1.5 font-display text-2xl leading-none text-navy-900">{val}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 font-mono text-[10px] tracking-[0.16em] text-steel-500">
                  BEST FOR — <span className="text-navy-800">{m.best.toUpperCase()}</span>
                </p>
              </div>

              <div className="mt-auto pt-8">
                <GoLink
                  to="#quote"
                  className="group inline-flex items-center gap-3 bg-accent-500 px-6 py-3.5 text-sm font-bold text-navy-950 shadow-[5px_5px_0_0_var(--color-navy-800)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-accent-400 hover:shadow-[2px_2px_0_0_var(--color-navy-800)]"
                >
                  Quote the {m.name}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </GoLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Two-Tone Studio — interactive colour banding (tree planters)       */
/* ------------------------------------------------------------------ */
const TONES = [
  { name: "Matte Black", hex: "#26292e" },
  { name: "Stone Grey", hex: "#9aa3ad" },
  { name: "Bone", hex: "#e3ddd0" },
  { name: "Terracotta", hex: "#c26a4a" },
  { name: "Sage", hex: "#8a9b84" },
  { name: "Navy", hex: "#2c4a73" },
];
const PRESETS = [
  { label: "Charcoal on Bone", top: 0, bottom: 2 },
  { label: "Terracotta on Bone", top: 3, bottom: 2 },
  { label: "Sage on Stone", top: 4, bottom: 1 },
  { label: "Navy on Bone", top: 5, bottom: 2 },
];

function TwotoneStudio({ product, no }: { product: Product; no: string }) {
  const t = product.twotone;
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(2);
  if (!t) return null;
  const topC = TONES[top];
  const botC = TONES[bottom];

  const swatches = (kind: "top" | "body", active: number, onPick: (i: number) => void) => (
    <div className="flex flex-wrap gap-2.5">
      {TONES.map((c, i) => (
        <button
          key={c.name}
          type="button"
          title={c.name}
          aria-label={`${kind === "top" ? "Top band" : "Body"} colour: ${c.name}`}
          aria-pressed={active === i}
          onClick={() => onPick(i)}
          className={`h-10 w-10 border-2 transition-all duration-200 hover:-translate-y-0.5 ${
            active === i
              ? "border-accent-500 shadow-[3px_3px_0_0_var(--color-navy-800)]"
              : "border-navy-800/30"
          }`}
          style={{ backgroundColor: c.hex }}
        />
      ))}
    </div>
  );

  return (
    <section id="twotone" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Controls */}
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHead kicker={`${no} / ${stripNo(t.kicker)}`} title={t.lines} />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-steel-600">{t.intro}</p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 space-y-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-steel-500">
                  TOP BAND — <span className="text-navy-800">{topC.name.toUpperCase()}</span>
                </p>
                <div className="mt-2.5">{swatches("top", top, setTop)}</div>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-steel-500">
                  BODY — <span className="text-navy-800">{botC.name.toUpperCase()}</span>
                </p>
                <div className="mt-2.5">{swatches("body", bottom, setBottom)}</div>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-steel-500">QUICK MIXES</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setTop(p.top);
                        setBottom(p.bottom);
                      }}
                      className="border border-navy-800/40 px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-navy-700 transition-colors hover:border-accent-600 hover:bg-accent-500 hover:text-navy-950"
                    >
                      {p.label.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border border-steel-200 border-l-4 border-l-accent-500 bg-paper p-5">
                <p className="font-mono text-[9.5px] tracking-[0.25em] text-accent-700">YOUR MIX</p>
                <p className="mt-1.5 text-sm font-semibold text-navy-900">
                  {topC.name} top band · {botC.name} body
                </p>
                <GoLink
                  to="#quote"
                  className="group mt-3 inline-flex items-center gap-2 text-sm font-bold text-navy-800 transition-colors hover:text-accent-700"
                >
                  Quote this combination
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </GoLink>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Live two-tone drawing */}
        <div className="lg:col-span-7">
          <Reveal delay={200}>
            <div className="border border-steel-300 bg-navy-50 p-6 sm:p-10">
              <span className="font-mono text-[9.5px] tracking-[0.25em] text-steel-500">
                TWO-TONE STUDY · ROUND TREE PLANTER
              </span>
              <div className="mt-4">
                <svg
                  viewBox="0 0 320 372"
                  className="mx-auto w-full max-w-md text-navy-800"
                  role="img"
                  aria-label={`Round tree planter painted ${topC.name} over ${botC.name}`}
                >
                  {/* ground */}
                  <line x1="36" y1="312" x2="284" y2="312" stroke="currentColor" strokeWidth="2.2" />
                  {/* canopy */}
                  <path
                    d="M118 96 C 112 72 128 54 148 58 C 154 40 182 40 188 58 C 208 54 222 72 214 90 C 226 98 218 112 202 108 C 196 122 172 126 162 112 C 146 122 124 114 118 96 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {/* trunk */}
                  <path
                    d="M152 150 C 153 130 154 118 156 104 M172 150 C 171 132 170 120 169 106 M156 116 L 140 102 M169 120 L 184 104"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  {/* rim opening */}
                  <ellipse cx="162" cy="150" rx="82" ry="12" fill="#0e1a2e" fillOpacity="0.82" stroke="currentColor" strokeWidth="2" />
                  {/* top band — recolours live */}
                  <path
                    d="M80 150 L244 150 L240 208 L84 208 Z"
                    fill={topC.hex}
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transition: "fill .45s ease" }}
                  />
                  {/* body — recolours live */}
                  <path
                    d="M84 208 L240 208 L232 300 L92 300 Z"
                    fill={botC.hex}
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transition: "fill .45s ease" }}
                  />
                  {/* sheen */}
                  <path d="M100 154 L96 298 M118 154 L115 298" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="5" fill="none" />
                  {/* shadow-gap base */}
                  <path d="M100 300 L224 300 L218 312 L106 312 Z" fill="#0e1a2e" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.4" />
                  {/* dimensions */}
                  <g stroke="currentColor" strokeWidth="1" fontFamily="IBM Plex Mono, monospace" fill="currentColor">
                    <line x1="80" y1="336" x2="244" y2="336" />
                    <path d="M86 332.5 L80 336 l6 3.5 M238 332.5 L244 336 l-6 3.5" fill="none" />
                    <text x="162" y="330" textAnchor="middle" fontSize="9" letterSpacing="1.6" stroke="none">
                      Ø 600 MM
                    </text>
                    <line x1="284" y1="150" x2="284" y2="312" />
                    <path d="M280.5 156 L284 150 l3.5 6 M280.5 306 L284 312 l3.5 -6" fill="none" />
                    <text x="296" y="236" fontSize="9" letterSpacing="1.6" stroke="none" transform="rotate(90 296 236)" textAnchor="middle">
                      H 750
                    </text>
                  </g>
                </svg>
              </div>
              <p className="mt-4 font-mono text-[9.5px] tracking-[0.2em] text-steel-500">
                COLOURS SHOWN ARE GELCOAT REFERENCES — PHYSICAL CHIPS ON REQUEST
              </p>
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
export default function ProductPage() {
  const { slug } = useParams();
  const product = slug ? findProduct(slug) : undefined;
  const topRef = useInView<HTMLDivElement>(0); // anchor target marker
  if (!product) return <Navigate to="/" replace />;

  // Section numbering adapts to which optional sections this page carries.
  let n = 0;
  const next = () => String(++n).padStart(2, "0");
  const noFeatures = next();
  const noSizer = product.sizer ? next() : null;
  const noStudy = product.study ? next() : null;
  const noTwotone = product.twotone ? next() : null;
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
        {product.sizer && noSizer && <SizerSection product={product} no={noSizer} />}
        {product.study && noStudy && <CylinderStudy product={product} no={noStudy} />}
        {product.twotone && noTwotone && <TwotoneStudio product={product} no={noTwotone} />}
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
