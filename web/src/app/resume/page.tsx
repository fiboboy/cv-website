import { DarkHeader } from "@/components/ui/dark-header";

const coreStrengths = [
  "AI data labeling, transcription, review, and QA-focused remote work",
  "English-to-Russian translation and localization support",
  "Shift readiness control, briefings, and operational coordination",
  "Incident, emergency, and escalation handling with reporting and procedural compliance",
  "Cross-stakeholder communication and continuity support",
  "Supplier and vendor coordination with small-business administration experience",
  "Visual hierarchy, packaging layout, feedback flyer design, and product-variant differentiation",
  "Landing-page structure and UX/UI prototype work from lean briefs and source material",
];

const experience = [
  {
    title: "AI Data Labeling, Transcription, Review, QA, and English-to-Russian Translation",
    meta: "Alignerr.com | Remote | 11/2025–03/2026",
    bullets: [
      "Worked across 6 projects involving transcription, labeling, review, QA, and English-to-Russian translation.",
      "Reviewed both labeler-produced and auto-generated transcripts, identifying recurring inaccuracies.",
      "Performed quality control on reviewers' work under evolving project guidelines.",
      "Contributed to specialized radio-communications transcription datasets for AI-model training.",
      "Participated in a large-client localization project translating English-to-Russian.",
    ],
  },
  {
    title: "Flight Supervisor / Operations Supervisor (Duty Manager)",
    meta: "State ATM Corporation | Magadan, Russia | 2016–2022",
    bullets: [
      "Worked for 6 years in a 24/7 safety-critical aviation environment with strict procedural discipline and time-sensitive decision-making.",
      "Managed pre-shift readiness control, staff briefings, work allocation, training coordination, incoming-document review, and vacation/work scheduling.",
      "Mentored junior specialists, checked personnel knowledge for operational admissions, and served on a professional-mastery competition jury.",
      "Coordinated routine, non-standard, and emergency situations including emergency landings and search-and-rescue-related operational support.",
      "Maintained operational reports, incident documentation, and standards-based follow-through.",
      "Co-authored an internal research project on workplace demotivation factors.",
    ],
  },
  {
    title: "Air Traffic Control Officer",
    meta: "State ATM Corporation | Magadan, Russia | 2006–2016",
    bullets: [
      "Managed complex real-time operational situations requiring precision, continuous assessment, and rapid decision-making.",
      "Applied strict communication, radio phraseology, and procedural standards in a high-pressure ATC environment.",
      "Built deep experience in operational control, disciplined coordination, and accuracy under pressure.",
    ],
  },
  {
    title: "Individual Entrepreneur — Small Handmade Jewelry Store",
    meta: "Self-employed | Russia | Late 2015–2017",
    bullets: [
      "Ran a small side business alongside main employment.",
      "Sourced makers and suppliers independently and coordinated purchasing and delivery arrangements.",
      "Managed 2 hired workers and handled tax reporting personally.",
    ],
  },
];

const education = [
  "Diploma in Enterprise Management, Russian Presidential Academy (RANEPA), 2019",
  "Mentor Training Course, Institute of Air Navigation, Moscow, 2019",
  "Bachelor's Degree in State & Municipal Administration, Russian State University for the Humanities, 2012",
  "Master's Degree in Aircraft Operations & Air Traffic Management, St. Petersburg State University of Civil Aviation, 2006",
  "Theoretical UX/UI design training (no formal supporting document)",
];

const selectedDesignWork = [
  {
    title: "Coffee Holic retail visual system",
    meta: "Independent visual work",
    bullets: [
      "Created a repeatable packaging layout for multiple coffee-blend variants and a customer feedback flyer.",
      "Used shared hierarchy and structure while differentiating products through color, naming, tasting-note presentation, and QR-led response flow.",
      "Focused on retail readability, visual consistency, and practical customer communication rather than one-off decorative treatment.",
    ],
  },
  {
    title: "DroneOps interactive service website prototype",
    meta: "Independent UX/UI prototype work",
    bullets: [
      "Built a bold landing-page direction for a drone-based property-maintenance service prototype.",
      "Structured the homepage around offer clarity, service segmentation, and prominent calls to action.",
      "Packaged the interface as a live demo with preserved hover states, motion, service cards, and CTA behavior.",
    ],
  },
];

export default function ResumePage() {
  return (
    <>
      <DarkHeader />
      <main className="relative min-h-screen overflow-hidden bg-[var(--terminal-bg)] px-4 pb-16 pt-24 text-[var(--terminal-text)] md:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 terminal-noise opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(109,255,123,0.14),_transparent_58%)]" />

        <section className="relative mx-auto w-full max-w-5xl space-y-6">
          <div className="terminal-panel p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--terminal-green)]">
                  universal resume
                </p>
                <h1 className="text-3xl font-semibold uppercase tracking-[0.06em] text-[var(--terminal-ivory)] md:text-5xl">
                  Mikhail Dziubenko
                </h1>
                <p className="max-w-3xl text-base leading-7 text-[var(--terminal-text-soft)] md:text-lg">
                  Bilingual operations and quality-focused professional with 15+ years of experience across
                  safety-critical air traffic management, aviation operations supervision, remote AI data work,
                  and self-directed visual/UI projects. Recent work includes transcription, labeling, review,
                  QA, English-to-Russian translation, packaging layout, and interactive UX/UI presentation.
                </p>
              </div>
              <div className="terminal-mini-card min-w-[240px] space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--terminal-ash)]">location</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--terminal-ivory)]">Bangkok, Thailand</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--terminal-ash)]">work setup</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--terminal-ivory)]">Remote-ready</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--terminal-ash)]">languages</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--terminal-ivory)]">Russian native / English advanced</p>
                </div>
              </div>
            </div>
          </div>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="terminal-panel p-5 md:p-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">core strengths</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--terminal-text-soft)] md:text-base">
                {coreStrengths.map((item) => (
                  <li key={item} className="resume-bullet">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="terminal-panel p-5 md:p-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">best-fit roles</p>
              <div className="mt-4 grid gap-3">
                <div className="terminal-mini-card">Operations Coordinator</div>
                <div className="terminal-mini-card">AI Data QA / Reviewer</div>
                <div className="terminal-mini-card">Transcription / Localization Specialist</div>
                <div className="terminal-mini-card">Aviation Operations Support</div>
                <div className="terminal-mini-card">Junior UX/UI or Visual Design Support</div>
              </div>
            </div>
          </section>

          <section className="terminal-panel p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">selected design work</p>
                <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[0.06em] text-[var(--terminal-ivory)]">
                  Packaging and interface prototypes
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {selectedDesignWork.map((role) => (
                <article key={role.title} className="resume-role">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[var(--terminal-ivory)]">{role.title}</h3>
                    <p className="text-sm uppercase tracking-[0.14em] text-[var(--terminal-green)]">{role.meta}</p>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--terminal-text-soft)] md:text-base">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="resume-bullet">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="terminal-panel p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">professional experience</p>
                <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[0.06em] text-[var(--terminal-ivory)]">
                  Full universal resume
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {experience.map((role) => (
                <article key={role.title} className="resume-role">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[var(--terminal-ivory)]">{role.title}</h3>
                    <p className="text-sm uppercase tracking-[0.14em] text-[var(--terminal-green)]">{role.meta}</p>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--terminal-text-soft)] md:text-base">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="resume-bullet">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="terminal-panel p-5 md:p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--terminal-ash)]">education and training</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--terminal-text-soft)] md:text-base">
              {education.map((item) => (
                <li key={item} className="resume-bullet">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </main>
    </>
  );
}
