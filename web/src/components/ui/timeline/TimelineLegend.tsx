import React from 'react';

interface TimelineLegendProps {
  isMobileView?: boolean;
}

export function TimelineLegend({ isMobileView }: TimelineLegendProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-3 relative z-20 ${isMobileView ? 'mt-6 mb-5' : 'mb-3'}`}>
      {[
        { category: 'education', label: 'Education', color: 'bg-[var(--terminal-ivory)]' },
        { category: 'work', label: 'Work Experience', color: 'bg-[var(--terminal-green)]' },
        { category: 'personal', label: 'Personal Research', color: 'bg-[var(--terminal-amber)]' }
      ].map(({ category, label, color }) => (
        <div key={category} className="inline-flex items-center gap-2 border border-[color:var(--terminal-border)] bg-[rgba(10,12,11,0.78)] px-3 py-2">
          <div className={`h-1.5 w-1.5 ${color}`} />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--terminal-text-soft)]">{label}</span>
        </div>
      ))}
    </div>
  );
} 
