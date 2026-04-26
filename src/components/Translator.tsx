"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Copy, CheckCircle2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DEGREES = ["Seco", "Comedido", "Equilibrado", "Rebuscado"];
const MODES = [
  "Simples",
  "Petição",
  "Tutela",
  "Embargos",
  "Parecer",
  "Sentença",
  "Despacho"
];

export function Translator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const [degree, setDegree] = useState(2); // Default: Equilibrado
  const [mode, setMode] = useState("Simples");

  const handleTranslate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setOutput("");
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: input,
          degree: DEGREES[degree].toLowerCase(),
          mode: mode
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Ocorreu um erro no trâmite legal.");
      }
      
      setOutput(data.result);
    } catch (error: any) {
      setOutput(`[Erro de Jurisprudência]: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls Panel */}
      <div className="relative z-10 glass rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-center justify-between shadow-xl border border-zinc-800 border-t-gold-500/20">
        
        {/* Mode Dropdown */}
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label className="text-zinc-300 font-semibold tracking-widest text-xs">MODO PROCESSUAL</label>
          <div className="relative">
            <select 
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full bg-black/60 border border-zinc-700 hover:border-gold-500/50 text-zinc-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-gold-500/50 appearance-none cursor-pointer transition-colors"
            >
              {MODES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {/* Custom arrow for select */}
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>

        {/* Degree Slider */}
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <div className="flex justify-between items-end">
            <label className="text-zinc-300 font-semibold tracking-widest text-xs">GRAU DE LERO-LERO</label>
            <span className="text-gold-400 font-medium text-sm text-glow">{DEGREES[degree]}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="3" 
            step="1"
            value={degree}
            onChange={(e) => setDegree(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold-500 hover:accent-gold-400 transition-all"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-medium mt-1">
            <span className={degree === 0 ? "text-gold-500" : ""}>Seco</span>
            <span className={degree === 1 ? "text-gold-500" : ""}>Comedido</span>
            <span className={degree === 2 ? "text-gold-500" : ""}>Equilibrado</span>
            <span className={degree === 3 ? "text-gold-500" : ""}>Rebuscado</span>
          </div>
        </div>

      </div>

      {/* Translator Areas */}
      <div className="relative z-10 glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-stretch shadow-2xl">
        {/* Input Section */}
        <div className="flex-1 flex flex-col">
          <label className="text-zinc-300 font-semibold mb-3 tracking-widest text-xs flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
            LINGUAGEM DO PLEBEU
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: o senhor é um vagabundo corrupto"
            className="w-full flex-1 min-h-[220px] bg-black/40 border border-zinc-800 rounded-2xl p-5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all resize-none shadow-inner text-lg"
          />
        </div>

        {/* Center Action */}
        <div className="flex flex-col items-center justify-center shrink-0 py-2 md:py-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTranslate}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-black font-extrabold p-4 md:p-5 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all relative group"
          >
            {isLoading ? <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin" /> : <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />}
          </motion.button>
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col relative">
          <label className="text-gold-400 font-semibold mb-3 tracking-widest text-xs flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold-500 text-glow"></div>
              {mode.toUpperCase()} (JURIDIQUÊS)
            </div>
            
            {output && (
              <button 
                onClick={handleCopy}
                className="text-zinc-400 hover:text-gold-400 transition-colors p-1"
                title="Copiar para área de transferência"
              >
                {isCopied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </label>
          <div className={cn(
            "w-full flex-1 min-h-[220px] bg-black/40 border rounded-2xl p-5 text-zinc-100 transition-all overflow-y-auto text-lg",
            output ? "border-gold-500/30 glass-gold shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]" : "border-zinc-800 shadow-inner"
          )}>
            {output ? (
              <p className="leading-relaxed whitespace-pre-wrap font-serif text-zinc-200">{output}</p>
            ) : (
              <p className="text-zinc-700 italic flex items-center justify-center h-full text-center text-sm md:text-base font-serif">
                Aguardando os autos processuais...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
