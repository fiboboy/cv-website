'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart,
  CheckCircle2,
  Clock,
  Factory,
  Home,
  Menu,
  Moon,
  Plane,
  Shield,
  Sun,
  X,
} from "lucide-react";

const marqueeText = "NO SCAFFOLDING / 100% CLEAN / ZERO RISKS / COST EFFICIENT / ";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "For Whom", href: "#audiences" },
  { label: "Why Drones", href: "#why", active: true },
  { label: "Contact", href: "#contact" },
];

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 44, rotate: -1.5, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      mass: 1,
    },
  },
};

function DemoButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  return (
    <Link
      href={href}
      className={`drone-button group ${variant === "primary" ? "drone-button--primary" : "drone-button--outline"}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
    </Link>
  );
}

function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      className={className}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={revealVariants}>{children}</motion.div>;
}

function DemoServiceCard({
  title,
  description,
  icon,
  imageSrc,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
}) {
  return (
    <article className="drone-service-card group">
      <div className="drone-service-image">
        <Image src={imageSrc} fill alt={title} className="object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
      </div>
      <div className="drone-service-body">
        <div className="drone-service-icon">{icon}</div>
        <div className="absolute right-4 top-4 opacity-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 group-hover:text-[#FF3D00]">
          <ArrowUpRight className="h-8 w-8 stroke-[3]" />
        </div>
        <h3 className="mt-3 font-mono text-[1.85rem] font-bold tracking-tight text-[var(--drone-foreground)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
          {title}
        </h3>
        <p className="mb-6 mt-3 max-w-sm text-base leading-relaxed text-[var(--drone-muted)]">{description}</p>
        <div className="drone-sticker">Explore <ArrowUpRight className="ml-1 h-4 w-4" strokeWidth={2.5} /></div>
      </div>
    </article>
  );
}

function DemoFeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="drone-feature-card group">
      <div className="drone-feature-icon">{icon}</div>
      <h3 className="mb-2 mt-1 font-mono text-xl font-bold uppercase tracking-tight text-[var(--drone-foreground)]">{title}</h3>
      <p className="text-base leading-relaxed text-[var(--drone-muted)]">{description}</p>
    </article>
  );
}

export default function DroneOpsDemoPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="top" className={`drone-demo min-h-screen ${theme === "light" ? "drone-demo--light" : ""}`}>
      <header className={`drone-nav ${scrolled ? "drone-nav--scrolled" : ""}`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <Link href="/design" className="flex items-center gap-3 group">
            <div className="drone-logo-box">
              <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
            </div>
            <span className="font-mono text-xl font-bold tracking-tight text-[var(--drone-foreground)]">
              DRONEOPS
              <span className="drone-logo-subtitle">SWEDEN</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`drone-nav-link ${link.active ? "drone-nav-link--active" : ""}`}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              className="drone-theme-toggle"
              title="Toggle theme"
              onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="#contact" className="border-r-2 border-black pr-4 text-sm font-bold text-[var(--drone-muted)] hover:text-[var(--drone-foreground)]">
              Dashboard Login
            </a>
            <DemoButton href="#contact" variant="primary">Get Quote</DemoButton>
          </div>

          <button className="md:hidden drone-menu-button" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="drone-mobile-menu">
          <div className="mb-12 flex items-center justify-between">
            <span className="font-mono text-xl font-bold uppercase tracking-tight">DRONEOPS</span>
            <button className="drone-menu-button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-left">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="drone-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="drone-mobile-cta" onClick={() => setMobileMenuOpen(false)}>
              Client Login <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
            </a>
          </nav>
        </div>
      )}

      <nav className="drone-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Portfolio</Link>
        <span>/</span>
        <Link href="/design">Design Work</Link>
        <span>/</span>
        <span>DroneOps Demo</span>
      </nav>

      <section className="drone-hero">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <div className="drone-kicker drone-brain-shake">Next-Gen Property Care</div>
            <h1 className="drone-hero-title">
              <span className="drone-hero-title-block drone-brain-shake">Industrial</span>
              <br />
              Drone Care.
              <br />
              <span className="drone-hero-highlight drone-brain-shake">
                No Lifts.
                <span className="drone-hero-highlight-bar" />
              </span>
            </h1>
            <p className="drone-hero-copy">
              We eradicate moss, algae, and grime using heavy-payload drones. It&apos;s faster, cheaper, and guarantees
              100% safety with nobody leaving the ground.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <DemoButton href="#contact" variant="primary">Get an Estimate</DemoButton>
              <DemoButton href="#services" variant="outline">See How It Works</DemoButton>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-end">
            <div className="drone-hero-art group">
              <Image src="/work/drones/hero.png" alt="Industrial cleaning drone" fill className="drone-hero-image object-cover object-center" priority />
              <div className="drone-hero-art-mask" />
            </div>
          </div>
        </div>
      </section>

      <div className="drone-marquee-wrap">
        <div className="drone-marquee">{marqueeText.repeat(10)}</div>
      </div>

      <section id="audiences" className="drone-audiences">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y-2 divide-black md:grid-cols-3 md:divide-x-2 md:divide-y-0">
          {[
            { icon: <Home className="h-8 w-8" />, title: "Homeowners", desc: "Destroy organic growth on your roof before it destroys your tiles. No scaffolding required." },
            { icon: <Factory className="h-8 w-8" />, title: "Housing Co-ops", desc: "Wash entire building blocks and facades fast, without bothering tenants." },
            { icon: <Sun className="h-8 w-8" />, title: "Commercial", desc: "Keep massive solar farms and industrial roofs maintained at peak operational efficiency." },
          ].map((item) => (
            <article key={item.title} className="drone-audience-card group">
              <div className="drone-audience-icon">{item.icon}</div>
              <h3 className="mb-3 text-[2rem] font-bold tracking-tight text-[var(--drone-foreground)]">{item.title}</h3>
              <p className="text-base leading-relaxed text-[var(--drone-muted)]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="why" className="drone-why">
        <div className="mx-auto max-w-7xl px-6">
          <div className="drone-brain-shake mx-auto max-w-3xl cursor-crosshair text-center">
            <div className="drone-section-tag">
              <span className="drone-section-tag-dot" />
              The Truth
            </div>
            <h2 className="drone-section-title">
              <span className="drone-section-title-mark">Traditional methods are obsolete.</span>
            </h2>
            <p className="drone-section-copy">
              Ladders break. Scaffolding is expensive. Drones do it better, faster, and safer.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <ArrowDown className="h-8 w-8 animate-bounce text-[var(--drone-muted)]" strokeWidth={2} />
          </div>

          <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerItem><DemoFeatureCard icon={<Shield className="h-6 w-6" />} title="Safety First" description="We operate entirely from the ground." /></StaggerItem>
            <StaggerItem><DemoFeatureCard icon={<Clock className="h-6 w-6" />} title="Extreme Speed" description="Tasks that take days with lifts take hours." /></StaggerItem>
            <StaggerItem><DemoFeatureCard icon={<CheckCircle2 className="h-6 w-6" />} title="Quality" description="AI-assisted flying ensures 100% coverage." /></StaggerItem>
            <StaggerItem><DemoFeatureCard icon={<BarChart className="h-6 w-6" />} title="High ROI" description="Lower setup costs mean direct savings." /></StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section id="services" className="drone-services">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="drone-section-tag drone-section-tag--light">
              <span className="drone-section-tag-dot drone-section-tag-dot--orange" />
              Capabilities
            </div>
            <h2 className="drone-section-title drone-section-title--dark">
              <span className="drone-section-title-mark drone-section-title-mark--dark">Heavy-duty systems</span>
            </h2>
            <p className="drone-section-copy drone-section-copy--dark">Airborne maintenance for any exterior task.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <ScrollReveal><DemoServiceCard title="Roof Treatment" description="High-pressure wash extending life by 10 years." icon={<Plane className="h-6 w-6" strokeWidth={2.5} />} imageSrc="/work/drones/hero.png" /></ScrollReveal>
            <ScrollReveal delay={0.08}><DemoServiceCard title="Facade Cleaning" description="Complete eradication of organic growth on massive concrete brutalist structures." icon={<Factory className="h-6 w-6" strokeWidth={2.5} />} imageSrc="/work/drones/facade.png" /></ScrollReveal>
            <ScrollReveal delay={0.16}><DemoServiceCard title="Solar Operations" description="Precision alignment operations and deionized solar panel washing." icon={<Sun className="h-6 w-6" strokeWidth={2.5} />} imageSrc="/work/drones/solar.png" /></ScrollReveal>
          </div>
        </div>
      </section>

      <section id="contact" className="drone-cta">
        <Image src="/work/drones/poster.png" alt="DroneOps poster background" fill className="pointer-events-none object-cover opacity-[0.03] mix-blend-luminosity" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="drone-brain-shake mb-8 inline-block cursor-crosshair text-5xl font-black tracking-tight md:text-7xl">
              Stop waiting.
              <br />
              <span className="text-[var(--drone-accent-lime)]">Start clearing.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-[var(--drone-foreground-soft)] md:text-xl">
              Get an AI-generated quote in seconds. Book your completely remote drone maintenance mission today.
            </p>
            <DemoButton href="#top" variant="primary">Request Estimate</DemoButton>
          </ScrollReveal>
        </div>
      </section>

      <footer className="drone-footer">
        <div className="drone-footer-cta">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">Ready to upgrade your property maintenance?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-black/80 md:text-xl">
              Book a fast, silent, and 100% safe drone cleaning protocol today. Save time and totally eliminate scaffolding costs.
            </p>
            <DemoButton href="#top" variant="outline">Request Quote Now</DemoButton>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 bg-[var(--drone-background)] px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-[var(--drone-foreground)] bg-transparent">
                <Plane className="h-5 w-5 text-[var(--drone-accent-lime)]" strokeWidth={2.5} />
              </div>
              <span className="font-mono text-2xl font-bold tracking-tight text-[var(--drone-foreground)]">DRONEOPS</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--drone-muted)]">
              Industrial drone care based in Sweden. We provide high-end, zero-risk, airborne maintenance systems for modern properties.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-lg font-bold text-[var(--drone-accent-lime)]">Services</h4>
            <ul className="space-y-3 text-sm text-[var(--drone-muted)]">
              {["Roof Treatment", "Facade Cleaning", "Window Cleaning", "Solar Panels"].map((item) => (
                <li key={item}>
                  <span className="drone-footer-item">
                    <ArrowRight className="h-3 w-3" strokeWidth={3} />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-lg font-bold text-[var(--drone-accent-lime)]">Company</h4>
            <ul className="space-y-3 text-sm text-[var(--drone-muted)]">
              {["About Us", "Careers", "Contact", "Dashboard Login"].map((item) => (
                <li key={item}>
                  <span className="drone-footer-item">
                    <ArrowRight className="h-3 w-3" strokeWidth={3} />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-black bg-[var(--drone-surface-hover)] p-6 text-xs text-[var(--drone-muted)]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            <p>&copy; 2026 DRONEOPS AB. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="drone-footer-link">Privacy Policy</span>
              <span className="drone-footer-link">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
