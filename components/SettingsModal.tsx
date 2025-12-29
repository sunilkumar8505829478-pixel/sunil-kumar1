
import React from 'react';
import { X } from 'lucide-react';
import { Setting } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SETTINGS_DATA: Setting[] = [
  { key: 'shell', description: 'The program to execute as terminal backend', value: '/bin/bash' },
  { key: 'cwd', description: 'Working directory to start in', value: '/home/cybershell' },
  { key: 'env', description: 'Terminal startup environment assembly', value: 'modified' },
  { key: 'keyboard', description: 'On-screen keyboard layout code', value: 'en-US' },
  { key: 'theme', description: 'Name of the UI theme to load', value: 'cyan' },
  { key: 'terminalFontSize', description: 'Size of the terminal text in pixels', value: 14 },
  { key: 'audio', description: 'Global UI audio sound effects', value: true },
  { key: 'port', description: 'Local port for remote shell connection', value: 3000 },
  { key: 'pingAddr', description: 'IPv4 address to test internet connectivity', value: '8.8.8.8' },
  { key: 'vibrance', description: 'Opacity of the background overlay', value: '0.8' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="cyber-border w-full max-w-2xl bg-[#0a0f14] shadow-2xl rounded-lg flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-[#00f2ff]/30 flex items-center justify-between bg-[#00f2ff]/10">
          <h2 className="orbitron text-xl font-bold glow-text tracking-widest">Settings <span className="text-xs opacity-50">NODE_CONF</span></h2>
          <button onClick={onClose} className="p-1 hover:bg-red-500/20 text-red-500 rounded transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-[#00f2ff]/20 text-[#00f2ff]/60 uppercase text-xs">
                <th className="py-2 px-4">Key</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Value</th>
              </tr>
            </thead>
            <tbody>
              {SETTINGS_DATA.map((s, i) => (
                <tr key={i} className="border-b border-[#00f2ff]/5 hover:bg-[#00f2ff]/5 transition-colors">
                  <td className="py-3 px-4 text-[#00f2ff]">{s.key}</td>
                  <td className="py-3 px-4 text-[#00f2ff]/60 text-xs italic">{s.description}</td>
                  <td className="py-3 px-4">
                    <span className="bg-black/40 border border-[#00f2ff]/20 px-2 py-1 rounded text-[#00f2ff]/80">
                      {String(s.value)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#00f2ff]/20 flex gap-2 justify-end bg-black/40">
          <button className="px-4 py-2 border border-[#00f2ff]/30 hover:bg-[#00f2ff]/20 transition-all text-xs orbitron">Open in External Editor</button>
          <button className="px-4 py-2 border border-[#00f2ff]/30 hover:bg-[#00f2ff]/20 transition-all text-xs orbitron">Save to Disk</button>
          <button onClick={onClose} className="px-6 py-2 bg-[#00f2ff]/20 border border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff]/40 transition-all text-xs orbitron">Close</button>
        </div>
      </div>
    </div>
  );
};
