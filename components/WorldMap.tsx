
import React from 'react';
import { Globe, MapPin } from 'lucide-react';

export const WorldMap: React.FC = () => {
  return (
    <div className="cyber-border rounded-lg bg-black/40 overflow-hidden relative group">
      <div className="p-2 border-b border-[#00f2ff]/20 flex items-center gap-2">
        <Globe size={14} className="text-[#00f2ff]/80" />
        <span className="orbitron tracking-widest text-[10px] glow-text uppercase">Geo-Tracking</span>
      </div>
      
      <div className="relative h-40 flex items-center justify-center overflow-hidden opacity-40">
        {/* Simple SVG Map placeholder with dots */}
        <svg viewBox="0 0 1000 500" className="w-full h-full stroke-[#00f2ff]/30 fill-none">
          <path d="M100,200 Q200,100 300,200 T500,200 T700,300 T900,200" strokeDasharray="5,5" />
          <circle cx="200" cy="150" r="3" className="fill-red-500 animate-pulse" />
          <circle cx="500" cy="220" r="3" className="fill-[#00f2ff]" />
          <circle cx="800" cy="280" r="3" className="fill-[#00f2ff]" />
          <text x="210" y="145" fill="#f87171" fontSize="12" fontFamily="monospace">ALERT: UNSANCTIONED ACCESS</text>
        </svg>

        {/* Scan lines on map */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.4)_100%)]"></div>
        <div className="absolute top-0 w-full h-[1px] bg-[#00f2ff]/20 animate-[bounce_4s_infinite]"></div>
      </div>

      <div className="p-2 bg-black/40 border-t border-[#00f2ff]/10 text-[9px] text-[#00f2ff]/60 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <MapPin size={10} className="text-red-500" />
          <span className="orbitron">LAT: 37.77 / LON: -122.41</span>
        </div>
        <span className="text-green-500/80">NODE ACTIVE</span>
      </div>
    </div>
  );
};
