
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity, Cpu, Database, Wifi } from 'lucide-react';
import { SystemStat } from '../types';

export const SystemStats: React.FC = () => {
  const [stats, setStats] = useState<SystemStat[]>([]);

  useEffect(() => {
    const generateInitialData = () => {
      return Array.from({ length: 20 }, (_, i) => ({
        time: i.toString(),
        cpu: 20 + Math.random() * 30,
        ram: 40 + Math.random() * 20,
        network: Math.random() * 100,
      }));
    };

    setStats(generateInitialData());

    const interval = setInterval(() => {
      setStats(prev => {
        const newData = [...prev.slice(1), {
          time: (parseInt(prev[prev.length - 1].time) + 1).toString(),
          cpu: Math.max(10, Math.min(100, prev[prev.length - 1].cpu + (Math.random() - 0.5) * 10)),
          ram: Math.max(10, Math.min(100, prev[prev.length - 1].ram + (Math.random() - 0.5) * 5)),
          network: Math.random() * 100,
        }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const latest = stats[stats.length - 1] || { cpu: 0, ram: 0, network: 0 };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="cyber-border p-3 rounded-lg bg-black/40">
          <div className="flex items-center justify-between mb-1">
            <Cpu size={14} className="text-pink-500" />
            <span className="text-[10px] text-pink-500/70 font-bold uppercase">CPU</span>
          </div>
          <div className="text-xl orbitron font-bold text-pink-500">{latest.cpu.toFixed(1)}%</div>
          <div className="w-full bg-pink-500/10 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-pink-500 h-full" style={{ width: `${latest.cpu}%` }}></div>
          </div>
        </div>
        <div className="cyber-border p-3 rounded-lg bg-black/40">
          <div className="flex items-center justify-between mb-1">
            <Database size={14} className="text-yellow-500" />
            <span className="text-[10px] text-yellow-500/70 font-bold uppercase">RAM</span>
          </div>
          <div className="text-xl orbitron font-bold text-yellow-500">{latest.ram.toFixed(1)}%</div>
          <div className="w-full bg-yellow-500/10 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full" style={{ width: `${latest.ram}%` }}></div>
          </div>
        </div>
        <div className="cyber-border p-3 rounded-lg bg-black/40">
          <div className="flex items-center justify-between mb-1">
            <Wifi size={14} className="text-green-500" />
            <span className="text-[10px] text-green-500/70 font-bold uppercase">NET</span>
          </div>
          <div className="text-xl orbitron font-bold text-green-500">{latest.network.toFixed(0)}</div>
          <div className="text-[10px] text-green-500/50 uppercase mt-1">kb/s throughput</div>
        </div>
      </div>

      <div className="cyber-border rounded-lg p-4 h-[200px] bg-black/40 relative">
        <div className="absolute top-2 left-4 flex items-center gap-2">
          <Activity size={12} className="text-[#00f2ff]/60 animate-pulse" />
          <span className="text-[10px] orbitron tracking-widest text-[#00f2ff]/60">System Load History</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stats} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ background: '#000', border: '1px solid #00f2ff33', borderRadius: '4px' }} 
              itemStyle={{ fontSize: '10px', padding: '0' }}
            />
            <Area type="monotone" dataKey="cpu" stroke="#ec4899" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
            <Area type="monotone" dataKey="ram" stroke="#eab308" fillOpacity={1} fill="url(#colorRam)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
