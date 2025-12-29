
import React, { useState } from 'react';
import { Folder, File, Search, HardDrive, LayoutGrid, List } from 'lucide-react';
import { FileEntry } from '../types';

const INITIAL_FILES: FileEntry[] = [
  { name: 'sys_core', type: 'directory', modified: '2024-05-12' },
  { name: 'protocols', type: 'directory', modified: '2024-05-12' },
  { name: 'usr', type: 'directory', modified: '2024-05-12' },
  { name: 'kernel_dump.log', type: 'file', size: '1.2MB', modified: '2024-05-20' },
  { name: 'config.json', type: 'file', size: '4KB', modified: '2024-05-19' },
  { name: 'security_key.vault', type: 'file', size: '512B', modified: '2024-05-18' },
  { name: 'neural_net.bin', type: 'file', size: '24GB', modified: '2024-05-15' },
];

export const FileSystem: React.FC = () => {
  const [files] = useState(INITIAL_FILES);
  const [search, setSearch] = useState('');

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full cyber-border rounded-lg bg-black/40 overflow-hidden font-mono">
      <div className="p-3 border-b border-[#00f2ff]/20 bg-[#00f2ff]/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDrive size={16} className="text-[#00f2ff]/80" />
          <span className="orbitron tracking-widest text-[11px] glow-text uppercase">Navigator</span>
        </div>
        <div className="flex gap-2 text-[#00f2ff]/40">
          <LayoutGrid size={14} className="cursor-not-allowed" />
          <List size={14} className="text-[#00f2ff]" />
        </div>
      </div>

      <div className="p-2 bg-black/20 border-b border-[#00f2ff]/10">
        <div className="relative">
          <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#00f2ff]/30" />
          <input
            type="text"
            placeholder="SCAN FILESYSTEM..."
            className="w-full bg-black/50 border border-[#00f2ff]/10 rounded px-8 py-1 text-[10px] text-[#00f2ff] focus:border-[#00f2ff]/40 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-[11px] text-left border-collapse">
          <thead>
            <tr className="text-[#00f2ff]/40 uppercase text-[9px] border-b border-[#00f2ff]/10">
              <th className="p-2 font-medium">Name</th>
              <th className="p-2 font-medium">Type</th>
              <th className="p-2 font-medium">Size</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((file, i) => (
              <tr key={i} className="hover:bg-[#00f2ff]/10 cursor-pointer group transition-colors border-b border-[#00f2ff]/5">
                <td className="p-2 flex items-center gap-2">
                  {file.type === 'directory' ? (
                    <Folder size={14} className="text-[#00f2ff]/60" />
                  ) : (
                    <File size={14} className="text-[#00f2ff]/40" />
                  )}
                  <span className="group-hover:text-white transition-colors truncate">{file.name}</span>
                </td>
                <td className="p-2 text-[#00f2ff]/30 uppercase text-[9px]">{file.type}</td>
                <td className="p-2 text-[#00f2ff]/50">{file.size || '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-2 bg-[#00f2ff]/5 border-t border-[#00f2ff]/20 text-[9px] text-[#00f2ff]/40 flex justify-between">
        <span>ITEMS: {filtered.length}</span>
        <span>STATUS: MOUNTED</span>
      </div>
    </div>
  );
};
