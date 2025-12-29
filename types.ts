
export interface SystemStat {
  time: string;
  cpu: number;
  ram: number;
  network: number;
}

export interface FileEntry {
  name: string;
  type: 'file' | 'directory';
  size?: string;
  modified: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}
