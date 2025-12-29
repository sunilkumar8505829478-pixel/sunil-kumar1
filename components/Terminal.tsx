
import React, { useState, useRef, useEffect } from 'react';
import { kernel } from '../services/geminiService';
import { Message } from '../types';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

export const Terminal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'system',
      content: 'CYBERSHELL-EDEX v3.4.0 [CONNECTED]',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    setInput('');
    setIsLoading(true);

    const history = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: (m.role === 'assistant' ? 'model' : 'user') as 'model' | 'user',
        parts: [{ text: m.content }]
      }));

    const response = await kernel.processCommand(input, history);
    
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
    <div className="flex flex-col h-full cyber-border rounded-lg overflow-hidden font-mono text-sm">
      <div className="bg-[#00f2ff]/10 border-b border-[#00f2ff]/30 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} />
          <span className="orbitron tracking-widest text-xs uppercase glow-text">Core Terminal</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-black/40"
      >
        {messages.map((m) => (
          <div key={m.id} className={`${m.role === 'system' ? 'text-[#00f2ff]/60 italic' : ''}`}>
            <div className="flex items-start gap-2">
              <span className="text-[#00f2ff]/40">[{m.timestamp.toLocaleTimeString([], { hour12: false })}]</span>
              <span className={`font-bold ${m.role === 'user' ? 'text-purple-400' : m.role === 'assistant' ? 'text-[#00f2ff]' : 'text-gray-500'}`}>
                {m.role === 'user' ? 'USER>' : m.role === 'assistant' ? 'KERN>' : 'SYS>'}
              </span>
              <div className="flex-1 whitespace-pre-wrap leading-relaxed">
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 animate-pulse text-[#00f2ff]/60">
            <span className="text-[#00f2ff]/40">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
            <span className="font-bold">KERN></span>
            <span>PROCCESSING SIGNAL...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-3 bg-black/60 border-t border-[#00f2ff]/20">
        <div className="flex items-center gap-2 bg-[#00f2ff]/5 border border-[#00f2ff]/20 rounded p-2 focus-within:border-[#00f2ff]/60 transition-colors">
          <ChevronRight size={18} className="text-[#00f2ff]/60" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Awaiting instruction..."
            className="flex-1 bg-transparent border-none outline-none text-[#00f2ff] placeholder-[#00f2ff]/30"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};
