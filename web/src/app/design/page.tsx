'use client';

import Image from "next/image";
import { ArrowRight, LayoutTemplate, Package2, Sparkles } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { DarkHeader } from "@/components/ui/dark-header";

const coffeeFrames = [
  "/work/coffee/mokko-supremo.png",
  "/work/coffee/crema-forte.png",
  "/work/coffee/supremo-classic.png",
  "/work/coffee/dark-reserve.png",
  "/work/coffee/chocolate-dawn.png",
];

export default function DesignPage() {
  return (
    <>
      <DarkHeader />
      <main className="relative min-h-screen overflow-hidden bg-[var(--terminal-bg)] px-4 pb-20 pt-24 text-[var(--terminal-text)] md:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 terminal-noise opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,_rgba(109,255,123,0.14),_transparent_58%)]" />

        <section className="relative mx-auto w-full max-w-7xl space-y-6">
          <div className="terminal-panel design-hero p-6 md:p-8 lg:p-10">
            <div className="space-y-5">
              <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--terminal-green)]">
                design work / visual systems / interface concepts
              </p>
              <h1 className="max-w-[12ch] text-4xl font-semibold uppercase leading-[0.94] tracking-[0.06em] text-[var(--terminal-ivory)] md:text-6xl">
                Small number of projects, clearly presented
              </h1>
              <p className="max-w-[66ch] text-base leading-7 text-[var(--terminal-text-soft)] md:text-lg">
                This page focuses on work I can show honestly today: a coffee packaging series and an unfinished but
                visually developed drone-service website concept. The goal is not to inflate the scope, but to present
                the design thinking, structure, and visual direction clearly.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="terminal-chip">Packaging system</span>
                <span className="terminal-chip">Visual hierarchy</span>
                <span className="terminal-chip">UI direction</span>
                <span className="terminal-chip">Concept websites</span>
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

            <div className="design-reel terminal-panel p-4">
              <div className="design-reel-label">
                <Sparkles className="h-4 w-4" />
                quick reel
              </div>
              <div className="design-reel-stage">
                {coffeeFrames.map((src, index) => (
                  <div
                    key={src}
                    className="design-reel-frame"
                    style={{ animationDelay: `${index * 2.4}s` }}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <article className="terminal-panel design-case">
            <div className="design-case-copy">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-green)]">
                <Package2 className="h-4 w-4" />
                case 01
              </div>
              <h2 className="text-3xl font-semibold uppercase tracking-[0.06em] text-[var(--terminal-ivory)]">
                Coffee Holic blend label system
              </h2>
              <p className="text-base leading-7 text-[var(--terminal-text-soft)]">
                A label family for several coffee blends. The structure stays consistent across the series while color,
                product naming, flavor notes, and blend composition shift from variant to variant.
              </p>
              <div className="design-list">
                <div className="design-list-item">
                  <span>Task</span>
                  <p>Create a repeatable retail label structure for multiple coffee blends.</p>
                </div>
                <div className="design-list-item">
                  <span>What I focused on</span>
                  <p>Hierarchy, visual consistency, blend differentiation, and shelf readability.</p>
                </div>
                <div className="design-list-item">
                  <span>What it shows</span>
                  <p>Ability to build a compact system, not just a one-off decorative layout.</p>
                </div>
              </div>
            </div>

            <div className="design-gallery">
              <div className="design-gallery-main">
                <Image
                  src="/work/coffee/mokko-supremo.png"
                  alt="Coffee Holic label series hero image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="design-gallery-grid">
                {coffeeFrames.slice(1).map((src) => (
                  <div key={src} className="design-gallery-thumb">
                    <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 22vw" />
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="terminal-panel design-case">
            <div className="design-case-copy">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-green)]">
                <LayoutTemplate className="h-4 w-4" />
                case 02
              </div>
              <h2 className="text-3xl font-semibold uppercase tracking-[0.06em] text-[var(--terminal-ivory)]">
                DroneOps website concept
              </h2>
              <p className="text-base leading-7 text-[var(--terminal-text-soft)]">
                An unfinished concept site for a drone-based property-maintenance service. The work already has a clear
                visual identity, service framing, and conversion-oriented landing-page structure.
              </p>
              <div className="design-list">
                <div className="design-list-item">
                  <span>Task</span>
                  <p>Present a technical service offer in a way that feels modern, bold, and easy to understand fast.</p>
                </div>
                <div className="design-list-item">
                  <span>What I focused on</span>
                  <p>Hero messaging, service segmentation, strong CTA placement, and industrial visual tone.</p>
                </div>
                <div className="design-list-item">
                  <span>What it shows</span>
                  <p>Ability to shape a landing experience and visual language even when the product is still in progress.</p>
                </div>
              </div>
            </div>

            <div className="design-drones">
              <div className="design-drones-browser">
                <div className="design-browser-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="design-drones-stage">
                  <div className="design-drones-strip">
                    {["/work/drones/hero.png", "/work/drones/facade.png", "/work/drones/solar.png"].map((src) => (
                      <div key={src} className="design-drones-shot">
                        <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 44vw" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-6 text-[var(--terminal-text-soft)]">
                Live interaction exists in the prototype itself. On hover, cards and visuals become more kinetic, which
                is why this case is best shown as a concept with motion and not just static screenshots.
              </p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
