import { DarkHeader } from "@/components/ui/dark-header"
import { Timeline } from "@/components/ui/Timeline"
import { Download } from "lucide-react"
import AnimatedButton from "../components/AnimatedButton"

export default function Home() {
  return (
    <>
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
              AI & Crypto Enthusiast | Vibe Developer | Aviation SME
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
