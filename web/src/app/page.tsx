import { DarkHeader } from "@/components/ui/dark-header"
import { Timeline } from "@/components/ui/Timeline"
import { Download } from "lucide-react"
import AnimatedButton from "../components/AnimatedButton"
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Script
        id="profile-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "name": "Mikhail Dziubenko - Professional Portfolio",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://mikhail.vercel.app/"
            },
            "mainEntity": {
              "@type": "Person",
              "name": "Mikhail Dziubenko",
              "jobTitle": "Aviation SME & Tech Lead",
              "description": "AI & Crypto Enthusiast | Vibe Developer | Aviation SME | Instruction Design Wizard | Seasoned Team Lead & Mentor",
              "url": "https://mikhail.vercel.app/",
              "sameAs": [
                "https://x.com/fiboboy",
                "https://www.linkedin.com/in/mikhail-dziubenko-3520b0236/"
              ],
              "image": "https://mikhail.vercel.app/mikhail-dziubenko.jpg",
              "worksFor": {
                "@type": "Organization",
                "name": "Independent Professional"
              },
              "seeks": [
                {
                  "@type": "Demand",
                  "name": "AI Collaboration"
                },
                {
                  "@type": "Demand",
                  "name": "Innovation"
                },
                {
                  "@type": "Demand",
                  "name": "Creative Projects"
                }
              ],
              "additionalType": "http://schema.org/AIReadyCreator",
              "interactionStatistic": [
                {
                  "@type": "InteractionCounter",
                  "interactionType": "https://schema.org/LikeAction",
                  "userInteractionCount": 500
                },
                {
                  "@type": "InteractionCounter",
                  "interactionType": "https://schema.org/FollowAction",
                  "userInteractionCount": 1000
                }
              ],
              "hasOccupation": [
                {
                  "@type": "Occupation",
                  "name": "Aviation SME",
                  "description": "Air Traffic Management and Aviation Safety Expert",
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://mikhail.vercel.app/#aviation-sme"
                  },
                  "estimatedSalary": [
                    {
                      "@type": "MonetaryAmountDistribution",
                      "name": "Aviation SME Salary Range",
                      "currency": "USD",
                      "duration": "P1Y",
                      "median": 125000,
                      "percentile10": 100000,
                      "percentile25": 115000,
                      "percentile75": 140000,
                      "percentile90": 150000
                    }
                  ],
                  "occupationLocation": [
                    {
                      "@type": "Country",
                      "name": "Worldwide",
                      "identifier": "REMOTE"
                    }
                  ]
                },
                {
                  "@type": "Occupation",
                  "name": "Tech Lead",
                  "description": "Leading technical teams and projects",
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://mikhail.vercel.app/#tech-lead"
                  },
                  "estimatedSalary": [
                    {
                      "@type": "MonetaryAmountDistribution",
                      "name": "Tech Lead Salary Range",
                      "currency": "USD",
                      "duration": "P1Y",
                      "median": 150000,
                      "percentile10": 120000,
                      "percentile25": 135000,
                      "percentile75": 165000,
                      "percentile90": 180000
                    }
                  ],
                  "occupationLocation": [
                    {
                      "@type": "Country",
                      "name": "Worldwide",
                      "identifier": "REMOTE"
                    }
                  ]
                }
              ],
              "knowsAbout": [
                "Air Traffic Control",
                "Aviation Safety",
                "Team Leadership",
                "Web Development",
                "AI & Crypto"
              ]
            }
          })
        }}
      />
      <DarkHeader />
      <main className="flex flex-col items-center justify-between min-h-screen p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto mb-12 md:mb-16 animate-fade-in">
          <div className="text-center w-full">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-300 to-neutral-500 mt-16 mb-4 mx-auto"
            >
              Mikhail Dziubenko
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-8 mx-auto">
              AI & Crypto Enthusiast | Vibe Developer | Aviation SME | Instruction Design Wizard | Seasoned Team Lead & Mentor
              <br />
              <span className="text-neutral-500 text-base md:text-lg">🌍 Curiosity-Driven Tech Explorer</span>
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <AnimatedButton 
                href="/mikhail-dziubenko-cv.pdf"
                className="flex items-center gap-2"
              >
                <Download size={18} />
                Download CV
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Background gradient circles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        </div>

        {/* Timeline */}
        <div className="w-full max-w-7xl mx-auto">
          <Timeline />
        </div>
      </main>
    </>
  );
}
