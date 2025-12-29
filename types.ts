
export interface SystemStat {
  time: string;
  cpu: number;
  ram: number;
  network: number;
}

export interface FileEntry {
  name: string;
  type: 'file' | 'directory' | 'disk';
  extension?: string;
  size?: string;
  modified: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Setting {
  key: string;
  description: string;
  value: string | boolean | number;
}
