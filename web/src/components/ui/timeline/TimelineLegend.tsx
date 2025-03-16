import React from 'react';

interface TimelineLegendProps {
  isMobileView?: boolean;
}

export function TimelineLegend({ isMobileView }: TimelineLegendProps) {
  return (
    <div className={`flex justify-center gap-4 mb-4 relative z-20 ${isMobileView ? 'mt-16' : ''}`}>
      {[
        { category: 'education', label: 'Education', color: 'bg-blue-500' },
        { category: 'work', label: 'Work Experience', color: 'bg-cyan-500' },
        { category: 'personal', label: 'Personal', color: 'bg-purple-500' }
      ].map(({ category, label, color }) => (
        <div key={category} className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${color}`} />
          <span className="text-xs text-white/70">{label}</span>
        </div>
      ))}
    </div>
  );
} 