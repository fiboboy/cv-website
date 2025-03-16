import React, { memo } from 'react';

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const baseClasses = `
  relative inline-flex items-center justify-center px-6 py-3
  font-medium transition-all duration-300
  bg-gradient-to-r from-purple-500/80 via-indigo-600/80 to-blue-500/80
  hover:from-blue-500/90 hover:via-indigo-600/90 hover:to-purple-500/90
  text-white rounded-lg group
  hover:scale-102 transform
  shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
  backdrop-blur-sm
`;

const AnimatedButton: React.FC<AnimatedButtonProps> = memo(({ href, children, className = '' }) => {
  return (
    <a
      href={href}
      className={`${baseClasses} ${className}`}
      target="_blank"
      download="Mikhail_Dziubenko_CV.pdf"
    >
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur" />
    </a>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton; 