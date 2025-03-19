'use client';

import { useRef, useEffect, useState } from 'react';
import { useSprings, animated, config } from '@react-spring/web';
import type { SpringValue } from '@react-spring/web';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

interface AnimatedStyles {
  filter: SpringValue<string>;
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animatedCount = useRef(0);

  const from = {
    filter: 'blur(10px)',
    opacity: 0,
    transform: direction === 'top' ? 'translate3d(0,-20px,0)' : 'translate3d(0,20px,0)',
  };

  const to = {
    filter: 'blur(0px)',
    opacity: 1,
    transform: 'translate3d(0,0,0)',
  };

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from,
      to: inView ? to : from,
      delay: i * delay,
      config: { ...config.gentle },
      onRest: () => {
        animatedCount.current += 1;
        if (animatedCount.current === elements.length && onAnimationComplete) {
          onAnimationComplete();
        }
      },
    }))
  );

  const AnimatedSpan = animated('span');

  return (
    <div ref={ref} className={className}>
      {springs.map((styles, index) => (
        <AnimatedSpan
          key={index}
          style={{
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
            ...styles,
          }}
        >
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </AnimatedSpan>
      ))}
    </div>
  );
};

export default BlurText; 