import React, { useRef, useState, useEffect } from 'react';
import { ActivePeriod, ExpandedCard, ProcessedTimelineItem } from './types';
import { AcademicCapIcon, BriefcaseIcon, PersonalIcon } from './CategoryIcons';
import { cn } from '@/lib/utils';

// Function to determine category color
const getCategoryColor = (category: 'education' | 'work' | 'personal') => {
  switch (category) {
    case 'education':
      return 'blue-500';
    case 'work':
      return 'cyan-500';
    case 'personal':
      return 'purple-500';
  }
};

// Function to determine background color based on category
const getBackgroundColor = (category: 'education' | 'work' | 'personal') => {
  switch (category) {
    case 'education':
      return 'bg-blue-500/5 backdrop-blur-xl';
    case 'work':
      return 'bg-cyan-500/5 backdrop-blur-xl';
    case 'personal':
      return 'bg-purple-500/5 backdrop-blur-xl';
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
  
  // Get the background gradient based on category
  const getBackgroundGradient = () => {
    switch (item.category) {
      case 'education':
        return isExpanded ? 'from-blue-500/50 to-blue-500/40' : 'from-blue-500/10 to-blue-500/5';
      case 'work':
        return isExpanded ? 'from-cyan-500/50 to-cyan-500/40' : 'from-cyan-500/10 to-cyan-500/5';
      case 'personal':
        return isExpanded ? 'from-purple-500/50 to-purple-500/40' : 'from-purple-500/10 to-purple-500/5';
      default:
        return isExpanded ? 'from-gray-500/50 to-gray-500/40' : 'from-gray-500/10 to-gray-500/5';
    }
  };
  
  // Get the border color based on category
  const getBorderColor = () => {
    switch (item.category) {
      case 'education':
        return isExpanded ? 'border-blue-500/40' : 'border-blue-500/20';
      case 'work':
        return isExpanded ? 'border-cyan-500/40' : 'border-cyan-500/20';
      case 'personal':
        return isExpanded ? 'border-purple-500/40' : 'border-purple-500/20';
      default:
        return isExpanded ? 'border-gray-500/40' : 'border-gray-500/20';
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
          <div key={index} className={cn("border-t border-white/10 pt-3", index === 0 ? "mt-0" : "mt-2")}>
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-xs font-semibold text-white">{groupedItem.title}</h4>
              <span className="text-[10px] text-white/60 ml-1 whitespace-nowrap">
                {groupedItem.startYear === groupedItem.endYear 
                  ? groupedItem.startYear 
                  : `${groupedItem.startYear}–${groupedItem.endYear}`
                }
              </span>
            </div>
            <p className="text-[11px] text-white/70">{groupedItem.description}</p>
            
            {/* Show skills for each grouped item */}
            {groupedItem.skills && groupedItem.skills.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {groupedItem.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className={cn(
                      "inline-block px-1.5 py-0.5 rounded-full text-[9px] font-medium",
                      item.category === 'education' ? 'bg-blue-500/15 text-blue-300' :
                      item.category === 'work' ? 'bg-cyan-500/15 text-cyan-300' :
                      'bg-purple-500/15 text-purple-300'
                    )}
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
        <span className="text-[9px] text-white/50">
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
        getBorderColor(),
        isExpanded ? 'shadow-lg shadow-zinc-900/50' : 'shadow-md shadow-zinc-900/30',
        isTransitioning ? 'pointer-events-none' : 'pointer-events-auto',
        'cursor-pointer' // Make all cards clickable
      )}
      style={{ 
        zIndex,
        background: `linear-gradient(to bottom, var(--tw-gradient-stops))`,
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
      <div className={cn(
        "absolute inset-0 rounded-lg bg-gradient-to-b opacity-80",
        getBackgroundGradient(),
        isExpanded && "backdrop-blur-md bg-black/40"
      )} />
      
      <div className="relative z-10 p-4">
        {/* Category Tag with Year */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <span className={cn(
              "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium",
              item.category === 'education' ? 'bg-blue-500/20 text-blue-300' :
              item.category === 'work' ? 'bg-cyan-500/20 text-cyan-300' :
              'bg-purple-500/20 text-purple-300'
            )}>
              {getCategoryIcon()}
              <span className="ml-1 uppercase tracking-tight">{item.category}</span>
            </span>
            
            {isGroupedCard && (
              <span className="bg-white/10 text-white/70 text-[9px] px-1.5 py-0.5 rounded-full">
                {item.originalItems!.length} items
              </span>
            )}
          </div>
          <span className="text-[10px] text-white/60 ml-1 whitespace-nowrap">
            {item.startYear === item.endYear 
              ? item.startYear 
              : `${item.startYear}–${item.endYear}`
            }
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xs md:text-sm font-medium text-white tracking-tight mb-1">{item.title}</h3>
        
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
            "text-[11px] text-white/70",
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
            <div className="mt-3 border-t border-white/10 pt-3">
              <h4 className="text-[10px] font-medium text-white/80 mb-2">Key Skills:</h4>
              <div className="flex flex-wrap gap-1">
                {item.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className={cn(
                      "inline-block px-1.5 py-0.5 rounded-full text-[9px] font-medium",
                      item.category === 'education' ? 'bg-blue-500/15 text-blue-300' :
                      item.category === 'work' ? 'bg-cyan-500/15 text-cyan-300' :
                      'bg-purple-500/15 text-purple-300'
                    )}
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
            <span className="inline-block w-6 h-0.5 bg-white/20 rounded-full" />
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
                item.category === 'education' ? 'bg-blue-400/70' :
                item.category === 'work' ? 'bg-cyan-400/70' :
                'bg-purple-400/70'
              )} 
            />
          ))}
        </div>
      )}
    </div>
  );
} 