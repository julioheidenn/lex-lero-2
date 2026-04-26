import { Translator } from "@/components/Translator";
import { AdBanner } from "@/components/AdBanner";
import { Scale } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80 pointer-events-none"></div>
      
      {/* Main Container - Left Ads | Center Content | Right Ads */}
      <div className="flex w-full max-w-[1700px] gap-8 justify-center">
        
        {/* Left Ad Sidebar (Hidden on screens smaller than extra large) */}
        <aside className="hidden xl:flex flex-col gap-6 w-[300px] shrink-0 pt-[250px]">
          <AdBanner />
          <AdBanner />
          <AdBanner />
        </aside>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center max-w-5xl">
          <div className="z-10 w-full items-center justify-between font-mono text-sm flex flex-col mb-12 mt-8 md:mt-0">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Lex-Lero Logo" 
                className="h-24 md:h-32 lg:h-40 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
              />
            </div>
            <p className="text-zinc-400 text-lg md:text-xl text-center max-w-[600px] mt-4 leading-relaxed outline-zinc-900">
              Traduza suas querelas cotidianas para o mais refinado, prolixo e imponente 
              <span className="text-gold-400 font-semibold mx-2 text-glow">Juridiquês</span>.
            </p>
          </div>

          <div className="w-full relative mt-4">
            {/* Glow effect positioned behind Translator */}
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-gold-600/15 to-yellow-600/15 blur-3xl opacity-60 z-0 pointer-events-none"></div>
            
            <Translator />
          </div>
          
          <footer className="mt-auto pt-16 pb-4 text-zinc-600 text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Lex-Lero. Para fins puramente humorísticos.
          </footer>
        </div>

        {/* Right Ad Sidebar (Hidden on screens smaller than extra large) */}
        <aside className="hidden xl:flex flex-col gap-6 w-[300px] shrink-0 pt-[250px]">
          <AdBanner />
          <AdBanner />
          <AdBanner />
        </aside>
        
      </div>
    </main>
  );
}
