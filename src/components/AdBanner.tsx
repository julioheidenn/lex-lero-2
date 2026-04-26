"use client";

import { useEffect, useState } from "react";

export function AdBanner({ dataAdSlot, className }: { dataAdSlot?: string, className?: string }) {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    // Busca a env de client_id definida na build
    const envClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    if (envClientId) {
      setClientId(envClientId);
      try {
        // Inicializa o AdSense
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []);

  return (
    <div className={`w-full min-h-[250px] border-2 border-dashed border-zinc-800 rounded-xl flex items-center justify-center bg-black/20 overflow-hidden transition-all hover:border-zinc-700 ${className || ''}`}>
      {clientId ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client={clientId}
          data-ad-slot={dataAdSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-zinc-700 select-none">
          <span className="font-mono tracking-[0.5em] text-3xl opacity-30 font-bold">A D S</span>
          <span className="text-[10px] mt-2 uppercase opacity-50 tracking-widest">Espaço Publicitário</span>
        </div>
      )}
    </div>
  );
}
