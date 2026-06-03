"use client"

import * as React from "react"
import { memo, useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Linkedin,
  Mail,
  Twitter,
  Menu,
  X,
  Home,
  Clock,
  Code
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeaderProps {
  logo?: React.ReactNode
  socialLinks?: {
    icon: React.ReactNode
    href: string
    label: string
  }[]
}

const DEFAULT_SOCIAL_LINKS = [
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://www.linkedin.com/in/mikhail-dziubenko-3520b0236/",
    label: "LinkedIn",
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "https://x.com/fiboboy",
    label: "Twitter",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    href: "mailto:mikhail@dziubenko.ru",
    label: "Email",
  },
];

export const DarkHeader = memo(({
  logo = "Mika",
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: HeaderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsSidebarOpen(false)
    router.push(href)
  }, [router])

  // Prevent body scroll when sidebar is open
  React.useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <header className="md:hidden w-full z-40 fixed top-0 left-0 border-b border-[color:var(--terminal-border-strong)] bg-[rgba(5,7,6,0.92)] backdrop-blur-md">
        <div className="container relative mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="font-mono text-lg font-semibold uppercase tracking-[0.24em] text-[var(--terminal-ivory)] transition-colors hover:text-[var(--terminal-green)]">
            {logo}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-[var(--terminal-ivory)] hover:bg-[rgba(109,255,123,0.08)] hover:text-[var(--terminal-green)]"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-72 border-l border-[color:var(--terminal-border-strong)] bg-[rgba(6,8,7,0.98)] z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-4">
          <nav className="space-y-4">
            <Link 
              href="/"
              className="flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.18em] text-[var(--terminal-text-soft)] transition-colors hover:text-[var(--terminal-green)]"
              onClick={(e) => handleAnchorClick(e, "/")}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <a
              href="/#skills"
              className="flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.18em] text-[var(--terminal-text-soft)] transition-colors hover:text-[var(--terminal-green)]"
              onClick={(e) => {
                e.preventDefault();
                setIsSidebarOpen(false);
                
                // Target the skills section
                const skillsElement = document.getElementById('skills');
                if (skillsElement) {
                  setTimeout(() => {
                    const headerOffset = window.innerWidth < 768 ? 100 : 80;
                    const elementPosition = skillsElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }, 100);
                }
              }}
            >
              <Code className="h-5 w-5" />
              <span>Skills</span>
            </a>
            <a 
              href="/#timeline"
              className="flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.18em] text-[var(--terminal-text-soft)] transition-colors hover:text-[var(--terminal-green)]"
              onClick={(e) => {
                e.preventDefault();
                setIsSidebarOpen(false);
                
                // Find the timeline element - try both mobile and desktop containers
                const isMobileView = window.innerWidth < 768;
                const timelineElement = document.getElementById('timeline');
                const mobileTimelineContent = document.getElementById('mobile-timeline-content');
                
                const targetElement = isMobileView ? (mobileTimelineContent || timelineElement) : timelineElement;
                
                if (targetElement) {
                  setTimeout(() => {
                    const headerOffset = isMobileView ? 100 : 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }, 100);
                }
              }}
            >
              <Clock className="h-5 w-5" />
              <span>Timeline</span>
            </a>
          </nav>
          
          <div className="mt-auto">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--terminal-ash)]">Connect</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="border border-[color:var(--terminal-border)] text-[var(--terminal-ivory)] hover:bg-[rgba(109,255,123,0.08)] hover:text-[var(--terminal-green)]"
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
      </aside>

      {/* Desktop Header */}
      <header className="fixed left-0 top-0 z-40 hidden w-full border-b border-[color:var(--terminal-border-strong)] bg-[rgba(5,7,6,0.84)] text-white backdrop-blur-md md:block">
        <div className="container relative mx-auto min-h-16 flex items-center">
          <div className="flex-1" />
          <div className="flex-1 flex justify-center">
            <Link href="/" className="font-mono text-lg font-semibold uppercase tracking-[0.24em] text-[var(--terminal-ivory)] transition-colors hover:text-[var(--terminal-green)]">
              {logo}
            </Link>
          </div>
          <div className="flex-1 flex justify-end items-center gap-3">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="border border-[color:var(--terminal-border)] text-[var(--terminal-ivory)] hover:bg-[rgba(109,255,123,0.08)] hover:text-[var(--terminal-green)]"
                asChild
              >
                <Link href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </header>
    </>
  )
}) 
