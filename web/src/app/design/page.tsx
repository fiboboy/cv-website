'use client';

import Image from "next/image";
import { ArrowRight, LayoutTemplate, Package2 } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { DarkHeader } from "@/components/ui/dark-header";

const coffeeLabels = [
  { src: "/work/coffee/mokko-supremo.png", title: "Mokko Supremo", tone: "soft cocoa / slate" },
  { src: "/work/coffee/crema-forte.png", title: "Crema Forte", tone: "berry / plum" },
  { src: "/work/coffee/supremo-classic.png", title: "Supremo Classic", tone: "caramel / burnt orange" },
  { src: "/work/coffee/dark-reserve.png", title: "Dark Reserve", tone: "olive / reserve" },
  { src: "/work/coffee/chocolate-dawn.png", title: "Chocolate Dawn", tone: "red berry / cocoa" },
];

const droneShots = [
  "/work/drones/hero.png",
  "/work/drones/facade.png",
  "/work/drones/solar.png",
];

export default function DesignPage() {
  return (
    <>
      <DarkHeader />
      <main className="relative min-h-screen overflow-hidden bg-[var(--terminal-bg)] px-4 pb-24 pt-24 text-[var(--terminal-text)] md:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 terminal-noise opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top,_rgba(109,255,123,0.12),_transparent_60%)]" />

        <section className="relative mx-auto w-full max-w-7xl space-y-8">
          <div className="terminal-panel design-hero design-hero--v2 p-6 md:p-8 lg:p-10">
            <div className="space-y-6">
              <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--terminal-green)]">
                design work / packaging / interface direction
              </p>
              <h1 className="max-w-[10ch] text-4xl font-semibold uppercase leading-[0.92] tracking-[0.05em] text-[var(--terminal-ivory)] md:text-6xl">
                Visual systems that feel alive on screen
              </h1>
              <p className="max-w-[62ch] text-base leading-7 text-[var(--terminal-text-soft)] md:text-lg">
                Two compact but real cases: a coffee label family designed as a consistent retail system, and a
                drone-service concept site presented as a motion-led product demo rather than a dead screenshot dump.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="terminal-chip">Packaging system</span>
                <span className="terminal-chip">Art direction</span>
                <span className="terminal-chip">Landing-page UX</span>
                <span className="terminal-chip">Motion presentation</span>
              </div>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap">
                <AnimatedButton href="/" className="min-w-[220px] justify-center sm:w-auto">
                  <ArrowRight size={18} />
                  Back to Portfolio
                </AnimatedButton>
                <AnimatedButton href="/resume" className="min-w-[220px] justify-center sm:w-auto">
                  <ArrowRight size={18} />
                  Open Resume
                </AnimatedButton>
              </div>
            </div>

            <div className="design-splash terminal-panel">
              <div className="design-splash-grid" />
              <div className="design-splash-stack">
                {coffeeLabels.slice(0, 4).map((label, index) => (
                  <article
                    key={label.src}
                    className="design-splash-card"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="design-splash-card-image">
                      <Image src={label.src} alt={label.title} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 18vw" />
                    </div>
                    <div className="design-splash-card-copy">
                      <strong>{label.title}</strong>
                      <span>{label.tone}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <article className="terminal-panel design-case design-case--coffee">
            <div className="design-case-copy">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-green)]">
                <Package2 className="h-4 w-4" />
                case 01 / packaging system
              </div>
              <h2 className="text-3xl font-semibold uppercase tracking-[0.06em] text-[var(--terminal-ivory)] md:text-4xl">
                Coffee Holic blend label series
              </h2>
              <p className="text-base leading-7 text-[var(--terminal-text-soft)]">
                The goal here was not to make five unrelated labels. It was to build one recognizable architecture that
                could carry multiple blends, keep the range coherent, and still let each product feel distinct.
              </p>
              <div className="design-list">
                <div className="design-list-item">
                  <span>System logic</span>
                  <p>Shared frame, common information layout, stable brand placement, and controlled color variation.</p>
                </div>
                <div className="design-list-item">
                  <span>What matters</span>
                  <p>Fast product recognition, flavor differentiation, and a clean shelf-facing hierarchy.</p>
                </div>
                <div className="design-list-item">
                  <span>Why it is worth showing</span>
                  <p>It demonstrates system thinking, not just single-asset styling.</p>
                </div>
              </div>
            </div>

            <div className="matrix-showcase">
              <div className="matrix-showcase-overlay" />
              <div className="matrix-showcase-cards">
                {coffeeLabels.map((label, index) => (
                  <article
                    key={label.src}
                    className="matrix-card"
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    <div className="matrix-card-media">
                      <Image src={label.src} alt={label.title} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 24vw" />
                    </div>
                    <div className="matrix-card-meta">
                      <strong>{label.title}</strong>
                      <span>{label.tone}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article className="terminal-panel design-case design-case--drones">
            <div className="design-case-copy">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-green)]">
                <LayoutTemplate className="h-4 w-4" />
                case 02 / concept website
              </div>
              <h2 className="text-3xl font-semibold uppercase tracking-[0.06em] text-[var(--terminal-ivory)] md:text-4xl">
                DroneOps concept with recorded-style motion
              </h2>
              <p className="text-base leading-7 text-[var(--terminal-text-soft)]">
                This project is strongest when shown in motion. The site already has hover-driven energy and a bold
                visual tone, so the presentation below mimics a product walkthrough: smooth scroll from hero to lower
                sections with a cursor sweeping across interactive zones.
              </p>
              <div className="design-list">
                <div className="design-list-item">
                  <span>UX angle</span>
                  <p>Lead with the offer, split the audiences clearly, then drive into services and conversion moments.</p>
                </div>
                <div className="design-list-item">
                  <span>Visual angle</span>
                  <p>Industrial contrast, aggressive highlights, oversized messaging, and a more kinetic landing rhythm.</p>
                </div>
                <div className="design-list-item">
                  <span>Presentation choice</span>
                  <p>Shown as a browser-demo sequence instead of static cards, because motion is part of the value.</p>
                </div>
              </div>
            </div>

            <div className="demo-browser">
              <div className="demo-browser-top">
                <span />
                <span />
                <span />
              </div>
              <div className="demo-browser-viewport">
                <div className="demo-scroll-canvas">
                  <section className="demo-scroll-panel demo-scroll-panel--hero">
                    <div className="demo-copy-block">
                      <p className="demo-eyebrow">DRONEOPS / LANDING CONCEPT</p>
                      <h3>Industrial drone care. No lifts.</h3>
                      <p>Offer-first hero with large contrast typography, immediate value framing, and split CTAs.</p>
                    </div>
                    <div className="demo-shot">
                      <Image src={droneShots[0]} alt="DroneOps hero section" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" />
                    </div>
                  </section>
                  <section className="demo-scroll-panel">
                    <div className="demo-strip-cards">
                      <div className="demo-chip-card">Homeowners</div>
                      <div className="demo-chip-card">Housing Co-ops</div>
                      <div className="demo-chip-card">Commercial</div>
                    </div>
                    <div className="demo-shot">
                      <Image src={droneShots[1]} alt="DroneOps service section" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" />
                    </div>
                  </section>
                  <section className="demo-scroll-panel">
                    <div className="demo-copy-block demo-copy-block--compact">
                      <p className="demo-eyebrow">SERVICES / CTA FLOW</p>
                      <h3>Show the system, then push the estimate.</h3>
                    </div>
                    <div className="demo-shot">
                      <Image src={droneShots[2]} alt="DroneOps lower section and CTA" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" />
                    </div>
                  </section>
                </div>
                <div className="demo-cursor">
                  <span className="demo-cursor-dot" />
                  <span className="demo-cursor-ring" />
                </div>
                <div className="demo-hotspot demo-hotspot--hero" />
                <div className="demo-hotspot demo-hotspot--cards" />
                <div className="demo-hotspot demo-hotspot--cta" />
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
