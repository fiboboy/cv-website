"use client"

import * as React from "react"
import { memo, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Linkedin,
  Mail,
  Twitter,
  Menu,
  X,
  Home,
  User,
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
      <header className="md:hidden w-full z-40 fixed top-0 left-0 bg-zinc-950 border-b border-border">
        <div className="container relative mx-auto h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-xl text-white hover:text-primary transition-colors">
            {logo}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-zinc-800"
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
          "fixed top-0 right-0 h-full w-64 bg-zinc-950 border-l border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-4">
          <nav className="space-y-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors py-2"
              onClick={(e) => handleAnchorClick(e, "/")}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              href="/about"
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors py-2"
              onClick={(e) => handleAnchorClick(e, "/about")}
            >
              <User className="h-5 w-5" />
              <span>About</span>
            </Link>
            <a 
              href="/#skills"
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors py-2"
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
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors py-2"
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
            <p className="text-zinc-500 mb-3 text-sm">Connect</p>
            <div className="flex flex-wrap gap-2">
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
      </aside>

      {/* Desktop Header */}
      <header className="w-full z-40 fixed top-0 left-0 bg-background border-b border-border bg-zinc-950 text-white hidden md:block">
        <div className="container relative mx-auto min-h-16 flex items-center">
          <div className="flex-1">
            <Link 
              href="/about" 
              className="text-base font-medium text-zinc-300 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <Link href="/" className="font-semibold text-xl hover:text-primary transition-colors">
              {logo}
            </Link>
          </div>
          <div className="flex-1 flex justify-end items-center gap-3">
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
      </header>
    </>
  )
}) 