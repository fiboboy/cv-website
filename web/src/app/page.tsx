'use client';

import { DarkHeader } from "@/components/ui/dark-header";
import { Timeline } from "@/components/ui/Timeline";
import { professionalProfile } from "@/data/professional-profile";
import { Download, ArrowUpRight, Radar, ShieldCheck, Workflow } from "lucide-react";
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
              jobTitle: "Aviation SME & Tech Lead",
              description:
                "AI & Crypto Enthusiast | AI Agentic Developer | Aviation SME | Instruction Design Wizard | Seasoned Team Lead & Mentor | Expert in Crisis Management",
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
                "Aviation Safety",
                "Team Leadership",
                "Web Development",
                "AI & Crypto",
              ],
            },
          }),
        }}
      />
      <DarkHeader />
      <main className="relative min-h-screen overflow-hidden bg-[var(--terminal-bg)] px-4 pb-16 pt-24 text-[var(--terminal-text)] md:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 terminal-noise opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(109,255,123,0.16),_transparent_58%)]" />

        <section className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.35fr_0.9fr]">
          <div className="space-y-6">
            <div className="terminal-panel p-4">
              <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
                <span>portfolio terminal / mission-ready profile</span>
                <span className="text-[var(--terminal-green)]">{bootFrame} system live</span>
              </div>
            </div>

            <div className="terminal-panel terminal-grid overflow-hidden p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--terminal-green)]">
                      mikhail dziubenko / hybrid operator
                    </p>
                    <h1 className="max-w-[12ch] font-mono text-4xl font-semibold uppercase leading-[0.95] text-[var(--terminal-ivory)] md:text-6xl">
                      From air traffic control to AI system design
                    </h1>
                  </div>

                  <p className="max-w-[60ch] text-base leading-7 text-[var(--terminal-text-soft)] md:text-lg">
                    I build calm, resilient digital systems shaped by years of high-pressure aviation work,
                    team leadership, and a recent shift into AI-assisted product development.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <span className="terminal-chip">AI agentic workflows</span>
                    <span className="terminal-chip">Mission-critical thinking</span>
                    <span className="terminal-chip">Instruction design</span>
                    <span className="terminal-chip">Crisis-ready leadership</span>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4">
                    <AnimatedButton href="/mikhail-dziubenko-cv.pdf" className="min-w-[220px] justify-center sm:w-auto">
                      <Download size={18} />
                      Download CV
                    </AnimatedButton>
                    <a
                      href="/about"
                      className="terminal-link inline-flex items-center justify-center gap-2 px-4 py-3 text-sm uppercase tracking-[0.24em] sm:justify-start"
                    >
                      Detailed profile
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="terminal-panel flex flex-col gap-4 bg-[linear-gradient(180deg,rgba(17,20,17,0.92),rgba(7,9,8,0.96))] p-4 sm:p-5">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[var(--terminal-ash)]">
                    <span>active mission profile</span>
                    <span className="text-[var(--terminal-green)]">remote / hybrid</span>
                  </div>
                  <div className="space-y-4">
                    {expertise.map((item) => (
                      <div key={item} className="flex items-center justify-between gap-4 border-b border-[color:var(--terminal-border)] pb-3">
                        <span className="text-sm uppercase tracking-[0.18em] text-[var(--terminal-text-soft)]">{item}</span>
                        <span className="text-[var(--terminal-green)]">[LIVE]</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 pt-2">
                    <TerminalStatus label="focus" value="AI collaboration systems" />
                    <TerminalStatus label="mode" value="open to new work" />
                    <TerminalStatus label="signal" value="curiosity-driven builder" tone="warning" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <SignalCard
                icon={Radar}
                title="Operational Clarity"
                body="Aviation taught me to make fast decisions without turning systems or teams into chaos."
                stat="01"
              />
              <SignalCard
                icon={ShieldCheck}
                title="Resilience by Design"
                body="I naturally think in failure modes, fallback paths, handoffs, and human factors."
                stat="02"
              />
              <SignalCard
                icon={Workflow}
                title="AI Workflow Builder"
                body="Now I translate that mindset into product flows, agents, automation, and interface systems."
                stat="03"
              />
            </div>
          </div>

          <div className="space-y-4">
            <BrailleStrip />

            <section className="terminal-panel p-5">
              <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
                <span>trajectory</span>
                <span className="text-[var(--terminal-green)]">2002 → 2026</span>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="terminal-log-row">
                  <span className="text-[var(--terminal-green)]">[2002-2022]</span>
                  <p>Air traffic control, supervision, emergency response, inter-agency coordination.</p>
                </div>
                <div className="terminal-log-row">
                  <span className="text-[var(--terminal-green)]">[2023-2024]</span>
                  <p>UX/UI study, Web3 exploration, AI-assisted web delivery, personal systems thinking.</p>
                </div>
                <div className="terminal-log-row">
                  <span className="text-[var(--terminal-green)]">[NOW]</span>
                  <p>Looking for work where technical depth and calm leadership both matter.</p>
                </div>
              </div>
            </section>

            <section className="terminal-panel p-5">
              <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">
                <span>current vector</span>
                <span className="text-[var(--terminal-green)]">priority targets</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {professionalProfile.idealRoles.map((role) => (
                  <div key={role} className="terminal-mini-card">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--terminal-ash)]">role</span>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[var(--terminal-ivory)]">{role}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="relative mx-auto mt-12 w-full max-w-7xl">
          <div className="terminal-panel mb-6 flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">career archive</p>
              <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--terminal-ivory)]">
                Experience as structured telemetry
              </h2>
            </div>
            <p className="max-w-[34ch] text-sm leading-6 text-[var(--terminal-text-soft)]">
              The original timeline stays intact, but now lives inside a clearer terminal shell.
            </p>
          </div>
          <Timeline />
        </section>
      </main>
    </>
  );
}
