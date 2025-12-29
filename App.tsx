
import React, { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal';
import { SystemStats } from './components/SystemStats';
import { FileSystem } from './components/FileSystem';
import { Keyboard } from './components/Keyboard';
import { WorldMap } from './components/WorldMap';
import { SettingsModal } from './components/SettingsModal';
import { Shield, Clock, Wifi, Zap, Lock, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen p-3 flex flex-col gap-3 overflow-hidden relative selection:bg-[#00f2ff] selection:text-black">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #00f2ff 1px, transparent 1px), linear-gradient(to bottom, #00f2ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Header Bar */}
      <header className="flex items-center justify-between px-4 py-1.5 cyber-border rounded bg-black/80 z-10 border-[#00f2ff]/40">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Shield className="text-[#00f2ff] animate-pulse drop-shadow-[0_0_5px_#00f2ff]" size={18} />
            <span className="orbitron tracking-[0.4em] font-bold text-base glow-text">CYBER-SHELL</span>
          </div>
          <div className="hidden lg:flex gap-6 text-[9px] orbitron text-[#00f2ff]/60">
            <div className="flex items-center gap-1.5"><Zap size={10} /> SYS: STABLE</div>
            <div className="flex items-center gap-1.5"><Lock size={10} /> RSA: ACTIVE</div>
            <div className="flex items-center gap-1.5"><Wifi size={10} /> 10G-UPLINK</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 border-x border-[#00f2ff]/20 px-4">
             <div className="flex flex-col items-center">
                <span className="text-[8px] orbitron text-[#00f2ff]/40">LATENCY</span>
                <span className="text-xs orbitron font-bold">12ms</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-[8px] orbitron text-[#00f2ff]/40">TEMP</span>
                <span className="text-xs orbitron font-bold text-orange-400">42°C</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <div className="text-sm orbitron font-bold tracking-widest flex items-center gap-2">
                <Clock size={12} className="opacity-50" />
                {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[8px] orbitron text-[#00f2ff]/30 tracking-widest">
                {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: '2-digit' }).toUpperCase()}
              </div>
            </div>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 hover:bg-[#00f2ff]/10 rounded border border-[#00f2ff]/20 transition-all active:scale-90"
            >
              <Settings size={18} className="text-[#00f2ff]/80" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-12 gap-3 overflow-hidden">
        {/* Left HUD: System Monitoring */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
          <SystemStats />
          <WorldMap />
          <div className="cyber-border rounded bg-black/60 p-3 flex-1 min-h-[120px]">
            <h3 className="orbitron text-[9px] text-[#00f2ff]/40 mb-2 tracking-[0.2em] uppercase border-b border-[#00f2ff]/10 pb-1">Process Matrix</h3>
            <div className="space-y-1.5 font-mono text-[10px]">
              {[
                { pid: '1024', user: 'root', cpu: '0.2%', cmd: 'kernel_gemini' },
                { pid: '2048', user: 'root', cpu: '1.4%', cmd: 'xorg_server' },
                { pid: '4096', user: 'guest', cpu: '0.0%', cmd: 'bash_uplink' },
                { pid: '8192', user: 'root', cpu: '4.2%', cmd: 'neural_bridge' }
              ].map((p, i) => (
                <div key={i} className="flex justify-between items-center text-[#00f2ff]/60 hover:text-[#00f2ff] transition-colors cursor-default">
                  <span className="w-8 opacity-40">{p.pid}</span>
                  <span className="flex-1 px-2">{p.cmd}</span>
                  <span className="text-green-500 font-bold">{p.cpu}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center HUD: Terminal Interface */}
        <div className="col-span-12 md:col-span-5 h-full">
          <Terminal />
        </div>

        {/* Right HUD: Navigation & Data Streams */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-3 overflow-hidden">
          <FileSystem />
          <div className="cyber-border rounded bg-black/60 p-3 h-1/3">
             <h3 className="orbitron text-[9px] text-[#00f2ff]/40 mb-2 tracking-[0.2em] uppercase border-b border-[#00f2ff]/10 pb-1">Secure Data Streams</h3>
             <div className="space-y-1 overflow-y-auto h-full pr-1 font-mono text-[9px]">
               {Array.from({ length: 15 }).map((_, i) => (
                 <div key={i} className="flex justify-between border-b border-[#00f2ff]/5 py-0.5 opacity-60">
                   <span className="text-[#00f2ff]">{(Math.random() * 0xFFFFFF << 0).toString(16).toUpperCase()}</span>
                   <span className="text-pink-500">{(Math.random() * 0xFFFFFF << 0).toString(16).toUpperCase()}</span>
                   <span className="text-yellow-500">SIGNAL_{i}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </main>

      {/* Footer Area: Virtual Keyboard */}
      <footer className="z-10 mt-auto">
        <Keyboard />
      </footer>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Corner Decorative Elements */}
      <div className="fixed top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#00f2ff]/30 pointer-events-none m-1"></div>
      <div className="fixed top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#00f2ff]/30 pointer-events-none m-1"></div>
      <div className="fixed bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#00f2ff]/30 pointer-events-none m-1"></div>
      <div className="fixed bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#00f2ff]/30 pointer-events-none m-1"></div>
    </div>
  );
};

export default App;
