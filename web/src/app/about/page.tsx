import { DarkHeader } from "@/components/ui/dark-header"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Mail, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export default function About() {
  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: 'https://www.linkedin.com/in/mikhail-dziubenko-3520b0236/',
      label: 'LinkedIn',
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: 'https://x.com/fiboboy',
      label: 'Twitter',
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: 'mailto:mikhail@dziubenko.ru',
      label: 'Email',
    }
  ];

  return (
    <>
      <DarkHeader />
      <main className="relative flex flex-col min-h-screen items-start justify-start p-4 md:p-6 lg:p-8 overflow-hidden bg-zinc-950">
        {/* Aurora Background Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-30 will-change-transform
            [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          />
        </div>

        <div className="w-full max-w-5xl mx-auto mt-24 md:mt-32 mb-12 md:mb-16 animate-fade-in relative z-10">
          <div className="text-left w-full">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-300 to-neutral-500 mb-8"
            >
              About Mikhail Dziubenko
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                I don't just follow trends—I dissect, experiment, and build. My journey spans AI, crypto, and web development, blending structured thinking with creative chaos. As an aviation SME, I've navigated high-pressure environments where precision is everything. As a developer, I embrace rapid innovation and problem-solving with an intuitive, hands-on approach.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                But my interests don't stop at code and algorithms. I'm equally fascinated by OSINT investigations, 3D printing, and digital design, while still finding time to craft the perfect loaf of sourdough or a show-stopping dessert. For me, learning is an endless experiment, and every new skill is another tool in the arsenal.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed font-semibold mt-8">
                🚀 I thrive in dynamic spaces where technology, creativity, and unconventional thinking collide. If you're building something bold, let's make it happen.
              </p>
            </div>

            <div className="mt-12 border-t border-neutral-800 pt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Connect With Me</h2>
              <div className="flex items-center gap-3">
                {socialLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-zinc-800"
                    asChild
                  >
                    <Link href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                      {link.icon}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 