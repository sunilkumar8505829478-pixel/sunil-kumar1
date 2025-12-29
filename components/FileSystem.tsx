
import React, { useState } from 'react';
import { Folder, File, HardDrive, ArrowUp, LayoutGrid, List, FileText, Code, FileJson, FileCode, Database } from 'lucide-react';
import { FileEntry } from '../types';

const INITIAL_FILES: FileEntry[] = [
  { name: 'Show disks', type: 'disk', modified: '' },
  { name: 'Go up', type: 'directory', modified: '' },
  { name: 'file-icons', type: 'directory', modified: '2024-05-12' },
  { name: 'media', type: 'directory', modified: '2024-05-12' },
  { name: 'node_modules', type: 'directory', modified: '2024-05-12' },
  { name: 'src', type: 'directory', modified: '2024-05-12' },
  { name: 'appveyor.yml', type: 'file', extension: 'yml', size: '1KB', modified: '2024-05-20' },
  { name: 'LICENSE', type: 'file', size: '2KB', modified: '2024-05-20' },
  { name: 'package-lock.json', type: 'file', extension: 'json', size: '450KB', modified: '2024-05-19' },
  { name: 'package.json', type: 'file', extension: 'json', size: '2KB', modified: '2024-05-18' },
  { name: 'README.md', type: 'file', extension: 'md', size: '12KB', modified: '2024-05-15' },
];

export const FileSystem: React.FC = () => {
  const [files] = useState(INITIAL_FILES);
  const [path] = useState('/home/cybershell/documents/edex-ui');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getFileIcon = (file: FileEntry, size: number) => {
    if (file.type === 'disk') return <HardDrive className="text-[#00f2ff]/80" size={size} />;
    if (file.name === 'Go up') return <ArrowUp className="text-[#00f2ff]/80" size={size} />;
    if (file.type === 'directory') return <Folder className="text-[#00f2ff]/80" size={size} />;
    
    switch (file.extension) {
      case 'json': return <FileJson className="text-yellow-400" size={size} />;
      case 'md': return <FileText className="text-blue-400" size={size} />;
      case 'yml': return <Code className="text-orange-400" size={size} />;
      case 'js':
      case 'ts':
      case 'tsx': return <FileCode className="text-blue-500" size={size} />;
      default: return <File className="text-gray-400" size={size} />;
    }
  };

  return (
    <div className="flex flex-col h-full cyber-border rounded-lg bg-black/60 overflow-hidden font-mono">
      <div className="p-3 border-b border-[#00f2ff]/20 bg-[#00f2ff]/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="orbitron tracking-widest text-[11px] glow-text uppercase">Filesystem</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[9px] text-[#00f2ff]/50 truncate max-w-[150px] hidden sm:block">
            {path}
          </div>
          <div className="flex gap-1 bg-black/20 p-0.5 rounded border border-[#00f2ff]/10">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded transition-colors ${viewMode === 'grid' ? 'bg-[#00f2ff]/20 text-[#00f2ff]' : 'text-[#00f2ff]/40 hover:text-[#00f2ff]/60'}`}
              title="Grid View"
            >
              <LayoutGrid size={12} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1 rounded transition-colors ${viewMode === 'list' ? 'bg-[#00f2ff]/20 text-[#00f2ff]' : 'text-[#00f2ff]/40 hover:text-[#00f2ff]/60'}`}
              title="List View"
            >
              <List size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map((file, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="relative p-2 rounded group-hover:bg-[#00f2ff]/10 transition-all border border-transparent group-hover:border-[#00f2ff]/20">
                  {getFileIcon(file, 32)}
                  {file.extension && (
                    <span className="absolute -bottom-1 -right-1 bg-black border border-[#00f2ff]/40 text-[7px] px-1 rounded uppercase font-bold text-[#00f2ff]">
                      {file.extension}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-center truncate w-full px-1 group-hover:text-white text-[#00f2ff]/80">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {files.map((file, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 p-1.5 hover:bg-[#00f2ff]/10 rounded cursor-pointer group border-b border-[#00f2ff]/5 last:border-0"
              >
                <div className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  {getFileIcon(file, 16)}
                </div>
                <span className="text-[11px] text-[#00f2ff]/80 group-hover:text-white flex-1 truncate font-medium">
                  {file.name}
                </span>
                {file.size && (
                  <span className="text-[9px] text-[#00f2ff]/40 font-mono shrink-0 w-12 text-right">
                    {file.size}
                  </span>
                )}
                {file.modified && (
                  <span className="text-[9px] text-[#00f2ff]/30 font-mono shrink-0 w-20 text-right hidden sm:block">
                    {file.modified}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 bg-[#00f2ff]/5 border-t border-[#00f2ff]/20 shrink-0">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-[#00f2ff]/60">Mount /home used 57%</span>
          <div className="flex-1 mx-4 h-1.5 bg-black/40 border border-[#00f2ff]/20 rounded-full overflow-hidden">
            <div className="bg-[#00f2ff] h-full shadow-[0_0_10px_#00f2ff]" style={{ width: '57%' }}></div>
          </div>
          <span className="text-[#00f2ff]/40">1.2TB / 2.0TB</span>
        </div>
      </div>
    </div>
  );
};
