
import React from 'react';

const KEYS = [
  ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACK'],
  ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
  ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
  ['CTRL', 'OPT', 'CMD', 'SPACE', 'CMD', 'OPT', 'LEFT', 'UP', 'DOWN', 'RIGHT']
];

export const Keyboard: React.FC = () => {
  return (
    <div className="p-4 bg-black/40 cyber-border rounded-lg select-none">
      <div className="grid gap-1">
        {KEYS.map((row, i) => (
          <div key={i} className="flex gap-1 justify-center">
            {row.map((key, j) => {
              let width = 'min-w-[40px]';
              if (key === 'SPACE') width = 'flex-[4]';
              if (['BACK', 'ENTER', 'TAB', 'CAPS', 'SHIFT'].includes(key)) width = 'min-w-[60px] flex-1';

              return (
                <div 
                  key={j} 
                  className={`${width} h-8 bg-[#00f2ff]/5 border border-[#00f2ff]/10 rounded flex items-center justify-center text-[9px] font-bold text-[#00f2ff]/40 hover:bg-[#00f2ff]/20 hover:text-[#00f2ff] cursor-pointer transition-all active:scale-95`}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
