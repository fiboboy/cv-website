'use client';

import React, { memo } from 'react';

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const baseClasses = `
  relative inline-flex items-center justify-center overflow-hidden px-6 py-3
  rounded-none border border-[color:var(--terminal-green-dim)] bg-[rgba(9,12,10,0.92)]
  font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--terminal-green)]
  transition-all duration-300 group
  hover:-translate-y-0.5 hover:border-[color:var(--terminal-green)] hover:text-[var(--terminal-ivory)]
  hover:shadow-[0_0_28px_rgba(109,255,123,0.12)]
`;

const AnimatedButton: React.FC<AnimatedButtonProps> = memo(({ href, children, className = '' }) => {
  return (
    <a
      href={href}
      className={`${baseClasses} ${className}`}
      target="_blank"
      download="Mikhail_Dziubenko_CV.pdf"
    >
      <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(109,255,123,0.85),transparent)] opacity-70" />
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(109,255,123,0.08),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </a>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton; 
