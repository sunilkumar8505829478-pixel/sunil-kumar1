
import React, { useState, useRef, useEffect } from 'react';
import { kernel } from '../services/geminiService';
import { Message } from '../types';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

const SPLASH_ASCII = `
   ______      __             _____ __         ____
  / ____/_  __/ /_  ___  ____/ ___// /_  ___  / / /
 / /   / / / / __ \\/ _ \\/ ___/\\__ \\/ __ \\/ _ \\/ / / 
/ /___/ /_/ / /_/ /  __/ /   ___/ / / / /  __/ / /  
\\____/\\__, /_.___/\\___/_/   /____/_/ /_/\\___/_/_/   
     /____/                                         
`;

const NEOFETCH_INFO = `
root@cybershell
---------------
OS: CyberShell-EDEX v3.4.0 x86_64
Kernel: Gemini-3-Flash-Preview
Uptime: 2 hours, 14 mins
Packages: 1024 (dpkg)
Shell: bash 5.1.16
Resolution: 1920x1080
Terminal: xterm-256color
CPU: Gemini Core i9 @ 5.0GHz
GPU: Neural Tensor Core G3
Memory: 4096MiB / 32768MiB
`;

export const Terminal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'splash', role: 'system', content: SPLASH_ASCII, timestamp: new Date() },
    { id: 'init', role: 'system', content: NEOFETCH_INFO, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const processLocalCommand = (cmd: string): boolean => {
    const command = cmd.toLowerCase().trim();
    if (command === 'clear') {
      setMessages([]);
      return true;
    }
    if (command === 'neofetch') {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', content: NEOFETCH_INFO, timestamp: new Date() }]);
      return true;
    }
    if (command === 'ls') {
       setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'sys_core  protocols  usr  kernel_dump.log  config.json', timestamp: new Date() }]);
       return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    if (processLocalCommand(currentInput)) return;

    setIsLoading(true);

    const history = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: (m.role === 'assistant' ? 'model' : 'user') as 'model' | 'user',
        parts: [{ text: m.content }]
      }));

    const response = await kernel.processCommand(currentInput, history);
    
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full cyber-border rounded-lg overflow-hidden font-mono text-sm shadow-[inset_0_0_20px_rgba(0,242,255,0.05)]">
      <div className="bg-[#00f2ff]/10 border-b border-[#00f2ff]/30 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-[#00f2ff]" />
          <span className="orbitron tracking-widest text-[10px] glow-text uppercase">Core Terminal</span>
        </div>
        <div className="flex gap-4 text-[9px] text-[#00f2ff]/40">
          <span>TTY1</span>
          <span>127.0.0.1</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 scroll-smooth bg-black/40 text-[12px] leading-tight"
      >
        {messages.map((m) => (
          <div key={m.id} className={`${m.role === 'system' ? 'text-[#00f2ff]/60' : ''}`}>
            <div className="flex items-start gap-2">
              {m.role !== 'system' && (
                <span className={`font-bold shrink-0 ${m.role === 'user' ? 'text-purple-400' : 'text-[#00f2ff]'}`}>
                  {m.role === 'user' ? 'USER>' : 'KERN>'}
                </span>
              )}
              <div className={`flex-1 whitespace-pre-wrap ${m.role === 'system' ? 'font-bold' : ''}`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 animate-pulse text-[#00f2ff]/60">
            <span className="font-bold">KERN></span>
            <span>UPLINKING DATA CORE...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-2 bg-black/60 border-t border-[#00f2ff]/20">
        <div className="flex items-center gap-2 px-2 py-1 focus-within:bg-[#00f2ff]/5 transition-colors">
          <ChevronRight size={16} className="text-[#00f2ff]/60" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=""
            className="flex-1 bg-transparent border-none outline-none text-[#00f2ff] caret-[#00f2ff]"
            disabled={isLoading}
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};
