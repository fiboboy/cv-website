'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ActivePeriod, ExpandedCard, ProcessedTimelineItem } from './types';
import { AcademicCapIcon, BriefcaseIcon, PersonalIcon } from './CategoryIcons';
import { cn } from '@/lib/utils';

const categoryTone = (category: 'education' | 'work' | 'personal') => {
  switch (category) {
    case 'education':
      return {
        border: 'border-[color:rgba(243,239,226,0.18)]',
        badge: 'border-[color:rgba(243,239,226,0.28)] bg-[rgba(243,239,226,0.08)] text-[var(--terminal-ivory)]',
        marker: 'bg-[var(--terminal-ivory)]',
        skill: 'border-[color:rgba(243,239,226,0.18)] bg-[rgba(243,239,226,0.06)] text-[var(--terminal-ivory)]',
      };
    case 'personal':
      return {
        border: 'border-[color:rgba(242,196,109,0.22)]',
        badge: 'border-[color:rgba(242,196,109,0.3)] bg-[rgba(242,196,109,0.08)] text-[var(--terminal-amber)]',
        marker: 'bg-[var(--terminal-amber)]',
        skill: 'border-[color:rgba(242,196,109,0.22)] bg-[rgba(242,196,109,0.06)] text-[var(--terminal-amber)]',
      };
    case 'work':
    default:
      return {
        border: 'border-[color:var(--terminal-green-dim)]',
        badge: 'border-[color:var(--terminal-green-dim)] bg-[rgba(109,255,123,0.08)] text-[var(--terminal-green)]',
        marker: 'bg-[var(--terminal-green)]',
        skill: 'border-[color:var(--terminal-green-dim)] bg-[rgba(109,255,123,0.06)] text-[var(--terminal-green)]',
      };
  }
};

interface TimelineCardProps {
  item: ProcessedTimelineItem;
  isRight?: boolean;
  isMobile?: boolean;
  onHover: (period: ActivePeriod | null) => void;
  onToggleExpand: (expandedCard: ExpandedCard | null) => void;
  isExpanded: boolean;
  expandedHeight: number;
  zIndex?: number;
}

export function TimelineCard({
  item,
  isRight = false,
  isMobile = false,
  onHover,
  onToggleExpand,
  isExpanded,
  expandedHeight,
  zIndex = 1
}: TimelineCardProps) {
  const tone = categoryTone(item.category);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [contentMaxHeight, setContentMaxHeight] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Check if this is a grouped card
  const isGroupedCard = item.originalItems && item.originalItems.length > 1;
  
  // Static card ID for expansion tracking
  const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
  
  // Measure content height on mount and when expanded state changes
  useEffect(() => {
    if (contentRef.current) {
      // Add a small delay to ensure content renders properly
      const timer = setTimeout(() => {
        setContentMaxHeight(contentRef.current?.scrollHeight || 0);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isGroupedCard]);
  
  // Handle expansion toggle with improved stability
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isExpanded) {
      // Collapse
      setIsTransitioning(true);
      onToggleExpand(null);
      setTimeout(() => setIsTransitioning(false), 300);
    } else {
      // Expand
      setIsTransitioning(true);
      onToggleExpand({
        id: cardId,
        startYear: item.startYear,
        endYear: item.endYear,
        expandedHeight: contentMaxHeight + 20, // Add padding
        side: item.side
      });
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };
  
  // Get the icon based on category
  const getCategoryIcon = () => {
    switch (item.category) {
      case 'education':
        return <AcademicCapIcon className="h-4 w-4" />;
      case 'work':
        return <BriefcaseIcon className="h-4 w-4" />;
      case 'personal':
        return <PersonalIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // Special content for grouped cards
  const renderGroupedContent = () => {
    if (!isGroupedCard) return null;
    
    return (
      <div className="mt-3 space-y-4">
        {item.originalItems!.map((groupedItem, index) => (
          <div key={index} className={cn("border-t border-[color:var(--terminal-border)] pt-3", index === 0 ? "mt-0" : "mt-2")}>
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--terminal-ivory)]">{groupedItem.title}</h4>
              <span className="ml-1 whitespace-nowrap font-mono text-[10px] text-[var(--terminal-ash)]">
                {groupedItem.startYear === groupedItem.endYear 
                  ? groupedItem.startYear 
                  : `${groupedItem.startYear}–${groupedItem.endYear}`
                }
              </span>
            </div>
            <p className="text-[11px] leading-5 text-[var(--terminal-text-soft)]">{groupedItem.description}</p>
            
            {/* Show skills for each grouped item */}
            {groupedItem.skills && groupedItem.skills.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {groupedItem.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className={cn("inline-block border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em]", tone.skill)}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // Render skills for non-expanded card - updated to only show a small indicator
  const renderCompactSkills = () => {
    if (!item.skills || item.skills.length === 0) return null;
    
    return (
      <div className="mt-1.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--terminal-ash)]">
          {item.skills.length} skill{item.skills.length !== 1 ? 's' : ''}
        </span>
      </div>
    );
  };
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "group relative w-full rounded-lg border backdrop-blur-sm transition-all duration-300",
        tone.border,
        isExpanded ? 'shadow-[0_0_24px_rgba(109,255,123,0.08)]' : 'shadow-[0_18px_50px_rgba(0,0,0,0.28)]',
        isTransitioning ? 'pointer-events-none' : 'pointer-events-auto',
        'cursor-pointer bg-[rgba(8,10,9,0.9)]'
      )}
      style={{ 
        zIndex,
        transform: `translateZ(0)` // Force GPU acceleration for smoother animations
      }}
      onMouseEnter={() => onHover({ 
        startYear: item.startYear, 
        endYear: item.endYear, 
        category: item.category 
      })}
      onMouseLeave={() => onHover(null)}
      onClick={toggleExpand}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_40%)]" />
      
      <div className="relative z-10 p-4">
        {/* Category Tag with Year */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <span className={cn(
              "inline-flex items-center gap-1 border px-1.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]",
              tone.badge
            )}>
              {getCategoryIcon()}
              <span>{item.category}</span>
            </span>
            
            {isGroupedCard && (
              <span className="border border-[color:var(--terminal-border)] bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--terminal-text-soft)]">
                {item.originalItems!.length} items
              </span>
            )}
          </div>
          <span className="ml-1 whitespace-nowrap font-mono text-[10px] text-[var(--terminal-ash)]">
            {item.startYear === item.endYear 
              ? item.startYear 
              : `${item.startYear}–${item.endYear}`
            }
          </span>
        </div>
        
        {/* Title */}
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--terminal-ivory)] md:text-sm">{item.title}</h3>
        
        {/* Content - Expandable */}
        <div 
          ref={contentRef}
          className={cn(
            "overflow-hidden transition-all duration-300",
            isExpanded ? `opacity-100` : 'max-h-20 opacity-90'
          )}
          style={{
            maxHeight: isExpanded ? 'none' : '80px'
          }}
        >
          {/* Basic description */}
          <p className={cn(
            "text-[11px] leading-5 text-[var(--terminal-text-soft)]",
            isExpanded ? 'line-clamp-none' : 'line-clamp-2'
          )}>
            {item.description}
          </p>
          
          {/* Show skills indicator if not expanded */}
          {!isExpanded && renderCompactSkills()}
          
          {/* Grouped items content when expanded */}
          {isExpanded && renderGroupedContent()}
          
          {/* Skills when expanded - for any card type */}
          {isExpanded && item.skills && item.skills.length > 0 && !isGroupedCard && (
            <div className="mt-3 border-t border-[color:var(--terminal-border)] pt-3">
              <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--terminal-ash)]">Key Skills</h4>
              <div className="flex flex-wrap gap-1">
                {item.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className={cn("inline-block border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em]", tone.skill)}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Expansion indicator */}
        {!isExpanded && (
          <div className="mt-1 text-center">
            <span className="inline-block h-px w-8 bg-[var(--terminal-border-strong)]" />
          </div>
        )}
      </div>
      
      {/* Visual indicator for grouped cards */}
      {isGroupedCard && !isExpanded && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(Math.min(3, item.originalItems!.length))].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-1 h-1 rounded-full",
                tone.marker
              )} 
            />
          ))}
        </div>
      )}
    </div>
  );
} 
