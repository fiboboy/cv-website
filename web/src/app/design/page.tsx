'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutTemplate, Package2 } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { DarkHeader } from "@/components/ui/dark-header";

const coffeeLabels = [
  { src: "/work/coffee/mokko-supremo.png", title: "Mokko Supremo", tone: "slate blue" },
  { src: "/work/coffee/crema-forte.png", title: "Crema Forte", tone: "berry plum" },
  { src: "/work/coffee/supremo-classic.png", title: "Supremo Classic", tone: "burnt orange" },
  { src: "/work/coffee/dark-reserve.png", title: "Dark Reserve", tone: "olive reserve" },
  { src: "/work/coffee/chocolate-dawn.png", title: "Chocolate Dawn", tone: "red cocoa" },
];

const droneScreens = [
  {
    src: "/work/drones/droneops-home-screen.png",
    title: "Opening screen",
    alt: "DroneOps landing page hero with headline, navigation, and CTA buttons",
  },
  {
    src: "/work/drones/droneops-audience-screen.png",
    title: "Audience and proof flow",
    alt: "DroneOps audience cards and value section",
  },
  {
    src: "/work/drones/droneops-services-screen.png",
    title: "Service cards and CTA",
    alt: "DroneOps services section with cards and quote CTA",
  },
];

function Breadcrumbs() {
  return (
    <nav className="design-breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Portfolio</Link>
      <span>/</span>
      <span>Design Work</span>
    </nav>
  );
}

export default function DesignPage() {
  return (
    <>
      <DarkHeader />
      <main className="relative min-h-screen overflow-hidden bg-[var(--terminal-bg)] px-4 pb-24 pt-24 text-[var(--terminal-text)] md:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 terminal-noise opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(109,255,123,0.11),_transparent_60%)]" />

        <section className="relative mx-auto w-full max-w-7xl space-y-10">
          <div className="design-intro">
            <Breadcrumbs />
            <div className="design-intro-grid">
              <div className="space-y-6">
                <h1 className="max-w-[12ch] text-4xl font-semibold uppercase leading-[0.95] tracking-[0.05em] text-[var(--terminal-ivory)] md:text-6xl">
                  Selected Design Work
                </h1>
                <p className="max-w-[68ch] text-base leading-7 text-[var(--terminal-text-soft)] md:text-lg">
                  Two compact case studies: a coffee label system for a blend lineup, and an interactive DroneOps landing
                  page concept with real hover states and motion preserved inside this portfolio.
                </p>
              </div>
              <div className="design-index">
                <a href="#coffee-labels" className="design-index-item">
                  <span>01</span>
                  <strong>Coffee Holic labels</strong>
                  <small>Packaging system</small>
                </a>
                <a href="#droneops" className="design-index-item">
                  <span>02</span>
                  <strong>DroneOps concept</strong>
                  <small>Interactive landing page</small>
                </a>
              </div>
            </div>
          </div>

          <article id="coffee-labels" className="terminal-panel design-case design-case--coffee">
            <div className="design-case-copy">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-green)]">
                <Package2 className="h-4 w-4" />
                case 01 / packaging system
              </div>
              <h2 className="text-3xl font-semibold uppercase tracking-[0.06em] text-[var(--terminal-ivory)] md:text-4xl">
                Coffee Holic blend label series
              </h2>
              <p className="text-base leading-7 text-[var(--terminal-text-soft)]">
                A repeatable label architecture for five coffee blends. The work is strongest as a system: stable brand
                placement, consistent information hierarchy, and enough color separation for each blend to read as its
                own product.
              </p>
              <div className="design-list">
                <div className="design-list-item">
                  <span>System</span>
                  <p>Shared frame, fixed information zones, controlled palette shifts, and readable tasting notes.</p>
                </div>
                <div className="design-list-item">
                  <span>Role</span>
                  <p>Visual design, packaging layout, variant logic, and final label composition.</p>
                </div>
              </div>
            </div>

            <div className="label-showcase">
              <div className="label-hero-frame">
                <Image
                  src={coffeeLabels[0].src}
                  alt="Coffee Holic Mokko Supremo label"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                />
              </div>
              <div className="label-variant-rail">
                {coffeeLabels.slice(1).map((label) => (
                  <article key={label.src} className="label-variant">
                    <div className="label-variant-image">
                      <Image src={label.src} alt={`Coffee Holic ${label.title} label`} fill className="object-contain" sizes="(max-width: 1024px) 50vw, 18vw" />
                    </div>
                    <div className="label-variant-caption">
                      <strong>{label.title}</strong>
                      <span>{label.tone}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article id="droneops" className="terminal-panel design-case design-case--drones">
            <div className="design-case-copy">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-green)]">
                <LayoutTemplate className="h-4 w-4" />
                case 02 / interactive concept
              </div>
              <h2 className="text-3xl font-semibold uppercase tracking-[0.06em] text-[var(--terminal-ivory)] md:text-4xl">
                DroneOps landing page concept
              </h2>
              <p className="text-base leading-7 text-[var(--terminal-text-soft)]">
                A bold landing page direction for a drone-based exterior maintenance service. The screenshots below show
                the real interface, while the demo page keeps the actual hover behavior, animated headings, service
                cards, and CTA flow.
              </p>
              <div className="design-list">
                <div className="design-list-item">
                  <span>UX structure</span>
                  <p>Offer-first hero, audience split, proof section, service cards, and direct quote CTA.</p>
                </div>
                <div className="design-list-item">
                  <span>Visual direction</span>
                  <p>Industrial contrast, heavy typography, acidic highlight color, sharp cards, and kinetic hover states.</p>
                </div>
              </div>
              <div className="pt-2">
                <AnimatedButton href="/design/droneops" className="min-w-[250px] justify-center sm:w-auto">
                  <ArrowRight size={18} />
                  Open Interactive Demo
                </AnimatedButton>
              </div>
            </div>

            <div className="drone-screen-showcase">
              <div className="drone-screen-main">
                <Image src={droneScreens[0].src} alt={droneScreens[0].alt} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 46vw" />
              </div>
              <div className="drone-screen-pair">
                {droneScreens.slice(1).map((screen) => (
                  <article key={screen.src} className="drone-screen-card">
                    <div className="drone-screen-thumb">
                      <Image src={screen.src} alt={screen.alt} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 22vw" />
                    </div>
                    <strong>{screen.title}</strong>
                  </article>
                ))}
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
