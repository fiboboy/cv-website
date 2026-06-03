'use client';

import { DarkHeader } from "@/components/ui/dark-header";
import { Timeline } from "@/components/ui/Timeline";
import { professionalProfile } from "@/data/professional-profile";
import { ArrowRight, Download, LayoutTemplate, Package2, Radar, ShieldCheck, Workflow } from "lucide-react";
import AnimatedButton from "../components/AnimatedButton";
import Script from "next/script";
import Image from "next/image";
import { useEffect, useState } from "react";

const liveFrames = ["[>_]", "[>>]", "[_>]", "[OK]"];
const orbitFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const rainFrames = ["⠁", "⠂", "⠄", "⡀", "⠠", "⠐", "⠈", "⠁"];

function useFrame(frames: string[], interval: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % frames.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [frames, interval]);

  return frames[index] ?? frames[0];
}

function TerminalStatus({
  label,
  value,
  tone = "live",
}: {
  label: string;
  value: string;
  tone?: "live" | "warning" | "muted";
}) {
  const frame = useFrame(orbitFrames, 90);
  const toneClass =
    tone === "warning"
      ? "text-[var(--terminal-amber)] border-[color:var(--terminal-amber-dim)]"
      : tone === "muted"
        ? "text-[var(--terminal-ash)] border-[color:var(--terminal-border)]"
        : "text-[var(--terminal-green)] border-[color:var(--terminal-green-dim)]";

  return (
    <div className={`terminal-panel flex flex-col items-start justify-between gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${toneClass}`}>
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em]">
        <span aria-hidden="true" className="text-base leading-none">
          {frame}
        </span>
        <span>{label}</span>
      </div>
      <span className="text-sm tracking-[0.14em] sm:text-right">{value}</span>
    </div>
  );
}

function SignalCard({
  icon: Icon,
  title,
  body,
  stat,
}: {
  icon: typeof Radar;
  title: string;
  body: string;
  stat: string;
}) {
  return (
    <article className="terminal-panel terminal-grid p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
            <Icon className="h-4 w-4 text-[var(--terminal-green)]" />
            signal
          </div>
          <h3 className="text-lg font-semibold text-[var(--terminal-ivory)]">{title}</h3>
        </div>
        <span className="terminal-chip">{stat}</span>
      </div>
      <p className="max-w-[34ch] text-sm leading-6 text-[var(--terminal-text-soft)]">{body}</p>
    </article>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="terminal-mini-card space-y-3">
      <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--terminal-ash)]">{label}</p>
      <p className="text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--terminal-ivory)]">{value}</p>
      <p className="text-sm leading-6 text-[var(--terminal-text-soft)]">{detail}</p>
    </article>
  );
}

function BrailleStrip() {
  const frame = useFrame(rainFrames, 120);
  return (
    <div className="terminal-panel overflow-hidden px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[var(--terminal-green)]">telemetry layer</span>
        <span aria-hidden="true" className="text-base text-[var(--terminal-green-dim)]">
          {frame} {frame} {frame} {frame}
        </span>
      </div>
    </div>
  );
}

function WorkChip({ children }: { children: string }) {
  return <span className="work-chip">{children}</span>;
}

function CaseStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="work-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function Home() {
  const bootFrame = useFrame(liveFrames, 320);
  const expertise = professionalProfile.currentRole.expertise;

  return (
    <>
      <Script
        id="profile-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            name: "Mikhail Dziubenko - Professional Portfolio",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://mikhail.vercel.app/",
            },
            mainEntity: {
              "@type": "Person",
              name: "Mikhail Dziubenko",
              jobTitle: "Operations and QA Specialist",
              description:
                "Operations and QA specialist based in Bangkok with 15+ years in aviation and recent remote work in AI data review, QA, transcription, and EN-RU translation.",
              url: "https://mikhail.vercel.app/",
              sameAs: [
                "https://x.com/fiboboy",
                "https://www.linkedin.com/in/mikhail-dziubenko-3520b0236/",
              ],
              image: "https://mikhail.vercel.app/mikhail-dziubenko.jpg",
              worksFor: {
                "@type": "Organization",
                name: "Independent Professional",
              },
              knowsAbout: [
                "Air Traffic Control",
                "Aviation Operations",
                "AI Data Review",
                "Quality Assurance",
                "Transcription",
                "English to Russian Translation",
              ],
            },
          }),
        }}
      />
      <DarkHeader />
      <main className="relative min-h-screen overflow-hidden bg-[var(--terminal-bg)] px-4 pb-20 pt-24 text-[var(--terminal-text)] md:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 terminal-noise opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(109,255,123,0.16),_transparent_58%)]" />

        <section className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.35fr_0.9fr]">
          <div className="space-y-8">
            <div className="terminal-panel p-4">
              <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
                <span>portfolio terminal / mission-ready profile</span>
                <span className="text-[var(--terminal-green)]">{bootFrame} system live</span>
              </div>
            </div>

            <div className="terminal-panel terminal-grid overflow-hidden p-7 md:p-10">
              <div className="space-y-10">
                <div className="space-y-5">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--terminal-green)]">
                    mikhail dziubenko / bangkok / remote-ready
                  </p>
                  <h1 className="max-w-[12ch] font-mono text-4xl font-semibold uppercase leading-[0.95] text-[var(--terminal-ivory)] md:text-6xl">
                    Operations, QA, and AI data work
                  </h1>
                  <p className="max-w-[62ch] text-base leading-7 text-[var(--terminal-text-soft)] md:text-lg">
                    Bilingual operations and quality-focused professional with 15+ years across air traffic management,
                    aviation supervision, and remote AI-data workflows. Strong in review, QA, documentation,
                    coordination, and calm work under pressure.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <StatCard
                    label="experience"
                    value="15+ years"
                    detail="Air traffic control, flight supervision, incident handling, and operational reporting."
                  />
                  <StatCard
                    label="recent remote work"
                    value="6 projects"
                    detail="Transcription, labeling, review, QA, and English-to-Russian translation."
                  />
                  <StatCard
                    label="work setup"
                    value="remote-ready"
                    detail="Based in Bangkok, with Russian native and English advanced."
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <span className="terminal-chip">Aviation operations</span>
                  <span className="terminal-chip">AI data review</span>
                  <span className="terminal-chip">Transcript QA</span>
                  <span className="terminal-chip">EN-RU translation</span>
                  <span className="terminal-chip">Packaging design</span>
                  <span className="terminal-chip">UX/UI concepts</span>
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:gap-5">
                  <AnimatedButton href="/design" className="min-w-[220px] justify-center sm:w-auto">
                    <Download size={18} />
                    Design Work
                  </AnimatedButton>
                  <AnimatedButton href="/resume" className="min-w-[220px] justify-center sm:w-auto" targetBlank={true}>
                    <Download size={18} />
                    Open Resume
                  </AnimatedButton>
                  <AnimatedButton
                    href="/mikhail-dziubenko-cv.pdf"
                    className="min-w-[220px] justify-center sm:w-auto"
                    download="Mikhail_Dziubenko_CV.pdf"
                    targetBlank={true}
                  >
                    <Download size={18} />
                    Download PDF
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:pt-2">
            <BrailleStrip />

            <section className="terminal-panel p-6">
              <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
                <span>profile snapshot</span>
                <span className="text-[var(--terminal-green)]">verified</span>
              </div>
              <div className="space-y-5">
                <div className="space-y-4">
                  {expertise.map((item) => (
                    <div key={item} className="flex items-center justify-between gap-4 border-b border-[color:var(--terminal-border)] pb-4">
                      <span className="text-sm uppercase tracking-[0.18em] text-[var(--terminal-text-soft)]">{item}</span>
                      <span className="text-[var(--terminal-green)]">[LIVE]</span>
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 pt-1">
                  <TerminalStatus label="focus" value="QA, review, operations support" />
                  <TerminalStatus label="mode" value="open to new work" />
                  <TerminalStatus label="languages" value="russian native / english advanced" tone="warning" />
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="relative mx-auto mt-12 grid w-full max-w-7xl gap-6 md:grid-cols-3">
          <SignalCard
            icon={Radar}
            title="Safety-Critical Experience"
            body="Ten years in air traffic control and six years in supervision built strong habits around accuracy, discipline, and fast judgment."
            stat="01"
          />
          <SignalCard
            icon={ShieldCheck}
            title="Review and QA"
            body="Recent remote work focused on transcription, labeling, review, QA, and catching recurring errors in AI-data workflows."
            stat="02"
          />
          <SignalCard
            icon={Workflow}
            title="Calm Coordination"
            body="Best fit areas include operations support, multilingual workflows, documentation, incident handling, and structured remote collaboration."
            stat="03"
          />
        </section>

        <section className="relative mx-auto mt-12 grid w-full max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="terminal-panel p-6">
            <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
              <span>design focus</span>
              <span className="text-[var(--terminal-green)]">recent work</span>
            </div>
            <div className="space-y-4 text-sm leading-7 text-[var(--terminal-text-soft)]">
              <p>
                My visual work is not a huge agency-style archive. What I can show today is smaller, but real:
                a coffee label system and a drone-service website concept with a strong visual direction.
              </p>
              <p>
                The useful through-line is structure: I tend to work from hierarchy, clarity, repeatable systems,
                and practical communication rather than decoration for its own sake.
              </p>
            </div>
          </section>

          <section className="terminal-panel p-6">
            <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
              <span>design skills</span>
              <span className="text-[var(--terminal-green)]">honest baseline</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Visual hierarchy",
                "Packaging layout",
                "Color-coded product variation",
                "Landing page structure",
                "Offer presentation",
                "UX/UI theory",
              ].map((skill) => (
                <div key={skill} className="terminal-mini-card">
                  <p className="text-sm uppercase tracking-[0.14em] text-[var(--terminal-ivory)]">{skill}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="relative mx-auto mt-12 grid w-full max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="terminal-panel p-6">
            <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
              <span>trajectory</span>
              <span className="text-[var(--terminal-green)]">2006 → 2026</span>
            </div>
            <div className="space-y-5 font-mono text-sm">
              <div className="terminal-log-row">
                <span className="text-[var(--terminal-green)]">[2006-2022]</span>
                <p>Air traffic control, flight supervision, operational reporting, emergency handling, and team coordination.</p>
              </div>
              <div className="terminal-log-row">
                <span className="text-[var(--terminal-green)]">[2015-2017]</span>
                <p>Ran a small side business: supplier coordination, two workers, purchasing, delivery, and tax reporting.</p>
              </div>
              <div className="terminal-log-row">
                <span className="text-[var(--terminal-green)]">[2025-2026]</span>
                <p>Remote AI-data work: transcription, labeling, review, QA, and English-to-Russian translation.</p>
              </div>
            </div>
          </section>

          <section className="terminal-panel p-6">
            <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
              <span>target roles</span>
              <span className="text-[var(--terminal-green)]">universal fit</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {professionalProfile.idealRoles.map((role) => (
                <div key={role} className="terminal-mini-card">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--terminal-ash)]">role</span>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[var(--terminal-ivory)]">{role}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="relative mx-auto mt-16 w-full max-w-7xl">
          <div className="terminal-panel mb-6 flex flex-wrap items-end justify-between gap-4 px-5 py-5 sm:px-6">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">selected design work</p>
              <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--terminal-ivory)] sm:text-3xl">
                Real work, packaged clearly
              </h2>
              <p className="mt-3 max-w-[56ch] text-sm leading-7 text-[var(--terminal-text-soft)] sm:text-base">
                I do not have dozens of finished product case studies, so this section focuses on work that is real and
                presentable: a coffee label system and an unfinished but visually defined drone-service website concept.
              </p>
            </div>
            <span className="terminal-chip">2 grounded case studies</span>
          </div>

          <div className="space-y-8">
            <article className="terminal-panel work-case">
              <div className="work-copy">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--terminal-green)]">
                  <Package2 className="h-4 w-4" />
                  packaging system
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--terminal-ivory)] sm:text-3xl">
                    Coffee label series for a blend lineup
                  </h3>
                  <p className="max-w-[60ch] text-sm leading-7 text-[var(--terminal-text-soft)] sm:text-base">
                    A compact packaging system built for a coffee lineup with several blends. The goal was to keep one
                    recognizable structure across all labels while changing palette, blend identity, and tasting notes
                    from product to product.
                  </p>
                </div>

                <div className="work-chip-row">
                  <WorkChip>Label hierarchy</WorkChip>
                  <WorkChip>Variant color system</WorkChip>
                  <WorkChip>Packaging layout</WorkChip>
                  <WorkChip>Retail shelf clarity</WorkChip>
                </div>

                <div className="work-metrics">
                  <CaseStat label="scope" value="5 label variants" />
                  <CaseStat label="focus" value="consistency + differentiation" />
                  <CaseStat label="role" value="visual design / packaging" />
                </div>

                <p className="text-sm leading-7 text-[var(--terminal-text-soft)]">
                  What works well here: strong repeatable frame, readable information hierarchy, and enough color
                  contrast between blends to make the series feel organized instead of repetitive.
                </p>
              </div>

              <div className="work-visual-stack">
                <div className="work-hero-image work-hero-image--label">
                  <Image
                    src="/work/coffee/mokko-supremo.png"
                    alt="Coffee label design for the Mokko Supremo blend"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
                <div className="work-proof-line">
                  <span>5 label variants</span>
                  <span>shared hierarchy</span>
                  <span>color-coded blends</span>
                </div>
              </div>
            </article>

            <article className="terminal-panel work-case">
              <div className="work-copy">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--terminal-green)]">
                  <LayoutTemplate className="h-4 w-4" />
                  ui concept
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--terminal-ivory)] sm:text-3xl">
                    DroneOps landing and service concept
                  </h3>
                  <p className="max-w-[60ch] text-sm leading-7 text-[var(--terminal-text-soft)] sm:text-base">
                    An unfinished website concept for a drone-based property maintenance service. The current state
                    already shows a clear visual direction, service architecture, and strong CTA flow even though the
                    project is not fully completed.
                  </p>
                </div>

                <div className="work-chip-row">
                  <WorkChip>Landing page structure</WorkChip>
                  <WorkChip>Service cards</WorkChip>
                  <WorkChip>Industrial visual language</WorkChip>
                  <WorkChip>High-contrast CTA flow</WorkChip>
                </div>

                <div className="work-metrics">
                  <CaseStat label="status" value="concept in progress" />
                  <CaseStat label="built" value="homepage + service pages" />
                  <CaseStat label="role" value="ui direction / content structure" />
                </div>

                <p className="text-sm leading-7 text-[var(--terminal-text-soft)]">
                  What is already convincing: a bold brutalist palette, clear audience framing, and a service-first
                  structure that makes the offer understandable fast.
                </p>
                <div className="pt-1">
                  <AnimatedButton href="/design/droneops" className="min-w-[240px] justify-center sm:w-auto">
                    <ArrowRight size={18} />
                    Open Live Demo
                  </AnimatedButton>
                </div>
              </div>

              <div className="work-visual-stack">
                <div className="work-hero-image work-hero-image--screen">
                  <Image
                    src="/work/drones/droneops-home-screen.png"
                    alt="DroneOps landing page interface screenshot"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
                <div className="work-proof-line">
                  <span>real interface</span>
                  <span>hover-driven demo</span>
                  <span>CTA flow</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="relative mx-auto mt-16 w-full max-w-7xl">
          <div className="terminal-panel mb-6 flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">career archive</p>
              <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--terminal-ivory)]">
                Verified experience and training
              </h2>
            </div>
            <p className="max-w-[34ch] text-sm leading-6 text-[var(--terminal-text-soft)]">
              A concise timeline of work, education, and a few relevant milestones only.
            </p>
          </div>
          <Timeline />
        </section>
      </main>
    </>
  );
}
