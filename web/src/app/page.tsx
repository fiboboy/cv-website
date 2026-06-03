'use client';

import { DarkHeader } from "@/components/ui/dark-header";
import { Timeline } from "@/components/ui/Timeline";
import { professionalProfile } from "@/data/professional-profile";
import { Download, Radar, ShieldCheck, Workflow } from "lucide-react";
import AnimatedButton from "../components/AnimatedButton";
import Script from "next/script";
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
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:gap-5">
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

        <section className="relative mx-auto mt-14 w-full max-w-7xl">
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
