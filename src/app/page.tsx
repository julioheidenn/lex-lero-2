import { Translator } from "@/components/Translator";
import { AdBanner } from "@/components/AdBanner";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80 pointer-events-none"></div>
      
      {/* Social Links */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-5 z-50">
        <a 
          href="https://www.instagram.com/lexlerolero/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gold-500 hover:text-gold-300 transition-all hover:scale-110 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          title="Siga-nos no Instagram"
        >
          <InstagramIcon className="w-7 h-7 md:w-8 md:h-8" />
        </a>
        <a 
          href="http://youtube.com/@lexlerolero" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gold-500 hover:text-gold-300 transition-all hover:scale-110 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          title="Inscreva-se no YouTube"
        >
          <YoutubeIcon className="w-8 h-8 md:w-9 md:h-9" />
        </a>
      </div>
      
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
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-6">
              <img 
                src="/logo.png" 
                alt="Lex-Lero Logo" 
                className="h-24 md:h-32 lg:h-36 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
              />
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 drop-shadow-sm pb-1">
                Lex-Lero
              </h1>
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
