
import React, { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal';
import { SystemStats } from './components/SystemStats';
import { FileSystem } from './components/FileSystem';
import { Keyboard } from './components/Keyboard';
import { WorldMap } from './components/WorldMap';
import { Shield, Clock, Wifi, Zap, Lock, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen p-4 flex flex-col gap-4 overflow-hidden relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#00f2ff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* Header Bar */}
      <header className="flex items-center justify-between px-4 py-2 cyber-border rounded-lg bg-black/60 z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="text-[#00f2ff] animate-pulse" size={20} />
            <span className="orbitron tracking-[0.3em] font-bold text-lg glow-text">CYBER-SHELL</span>
          </div>
          <div className="hidden md:flex gap-4 text-[10px] orbitron text-[#00f2ff]/50">
            <div className="flex items-center gap-1"><Zap size={10} /> CORE: ONLINE</div>
            <div className="flex items-center gap-1"><Lock size={10} /> ENCRYPT: AES-256</div>
            <div className="flex items-center gap-1"><Wifi size={10} /> LATENCY: 24ms</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-[#00f2ff] orbitron text-lg font-bold">
              <Clock size={16} className="text-[#00f2ff]/60" />
              {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-[10px] orbitron text-[#00f2ff]/40 tracking-wider">
              {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
            </div>
          </div>
          <button className="p-2 hover:bg-[#00f2ff]/10 rounded border border-[#00f2ff]/20 transition-colors">
            <Menu size={20} className="text-[#00f2ff]" />
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-12 gap-4 overflow-hidden">
        {/* Left Side: Stats & Info */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-y-auto pr-1">
          <SystemStats />
          <WorldMap />
          <div className="cyber-border rounded-lg p-3 bg-black/40 flex-1 min-h-[150px]">
            <h3 className="orbitron text-[10px] text-[#00f2ff]/60 mb-3 tracking-widest uppercase">Kernel Modules</h3>
            <div className="space-y-2">
              {['NET_BRIDGE', 'SEC_VAULT', 'AI_CORE', 'FS_SYNC'].map((mod, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] font-mono group cursor-help">
                  <span className="text-[#00f2ff]/40 group-hover:text-[#00f2ff] transition-colors">0x00A{i}: {mod}</span>
                  <span className="text-green-500 font-bold opacity-60 group-hover:opacity-100">[ OK ]</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Main Terminal Interface */}
        <div className="col-span-12 lg:col-span-6 h-full">
          <Terminal />
        </div>

        {/* Right Side: File System & Actions */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden">
          <FileSystem />
          <div className="cyber-border rounded-lg p-3 bg-black/40 h-1/3">
             <h3 className="orbitron text-[10px] text-[#00f2ff]/60 mb-2 tracking-widest uppercase">Recent Uplink Signals</h3>
             <div className="space-y-2 overflow-hidden">
               {[
                 { src: '192.168.1.1', type: 'TCP_ACK', bytes: '542B' },
                 { src: '10.0.0.42', type: 'UDP_IN', bytes: '2.1KB' },
                 { src: '8.8.8.8', type: 'DNS_RES', bytes: '128B' }
               ].map((log, i) => (
                 <div key={i} className="flex justify-between text-[9px] font-mono border-b border-[#00f2ff]/5 pb-1">
                   <span className="text-pink-500/70">{log.src}</span>
                   <span className="text-[#00f2ff]/40">{log.type}</span>
                   <span className="text-yellow-500/70">{log.bytes}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </main>

      {/* Footer Area: Virtual Keyboard */}
      <footer className="z-10">
        <Keyboard />
      </footer>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00f2ff] opacity-40 pointer-events-none m-2"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00f2ff] opacity-40 pointer-events-none m-2"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00f2ff] opacity-40 pointer-events-none m-2"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00f2ff] opacity-40 pointer-events-none m-2"></div>
    </div>
  );
};

export default App;
