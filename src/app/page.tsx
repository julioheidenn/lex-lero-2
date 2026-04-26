import { Translator } from "@/components/Translator";
import { Scale } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80 pointer-events-none"></div>
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col mb-12 mt-8 md:mt-0">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="w-10 h-10 md:w-14 md:h-14 text-gold-500" />
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700">
            Lex-Lero
          </h1>
        </div>
        <p className="text-zinc-400 text-lg md:text-xl text-center max-w-2xl mt-4">
          Traduza suas querelas cotidianas para o mais refinado, prolixo e imponente 
          <span className="text-gold-400 font-semibold mx-1.5 text-glow">Juridiquês</span>.
        </p>
      </div>

      <div className="w-full max-w-4xl relative mt-8">
        {/* Glow effect positioned behind Translator */}
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-gold-600/20 to-yellow-600/20 blur-3xl opacity-60 z-0"></div>
        
        <Translator />
      </div>
      
      <footer className="mt-auto pt-16 pb-4 text-zinc-600 text-sm font-medium tracking-wide">
        &copy; {new Date().getFullYear()} Lex-Lero. Para fins puramente humorísticos.
      </footer>
    </main>
  );
}
