import React from 'react';
import { ActivePeriod, ExpandedCard, ProcessedTimelineItem } from './types';
import { TimelineCard } from './TimelineCard';
import { TimelineLegend } from './TimelineLegend';

interface MobileTimelineProps {
  processedItems: ProcessedTimelineItem[];
  onHover: (period: ActivePeriod | null) => void;
  expandedCard: ExpandedCard | null;
  setExpandedCard: (card: ExpandedCard | null) => void;
}

export function MobileTimeline({ 
  processedItems,
  onHover,
  expandedCard,
  setExpandedCard,
}: MobileTimelineProps) {
  // Сортируем карточки по году начала для правильного порядка отображения
  const sortedItems = [...processedItems].sort((a, b) => a.startYear - b.startYear);
  
  // Находим минимальный и максимальный год
  const minYear = 2001; // Фиксированный год начала
  const maxYear = 2025; // Фиксированный год окончания
  
  // Вычисляем минимальную высоту контейнера
  const minContainerHeight = Math.max(
    sortedItems.reduce((height, item) => {
      const cardHeight = item.height + item.verticalShift;
      return Math.max(height, cardHeight);
    }, 0) + 200, // Добавляем отступ для последнего года
    600 // Минимальная высота
  );
  
  return (
    <div className="md:hidden w-full">
      <div id="mobile-timeline-legend" className="flex justify-center gap-4 mb-4 relative z-20">
        <TimelineLegend isMobileView={true} />
      </div>
      
      <div className="relative mt-4 mb-12" id="mobile-timeline-content">
        <div className="relative" style={{ minHeight: `${minContainerHeight}px` }}>
          <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full z-[1]">
            <div 
              className="absolute top-0 w-full"
              style={{ height: '100%', background: 'linear-gradient(to bottom, rgba(243,239,226,0.14), rgba(109,255,123,0.72) 34%, rgba(242,196,109,0.36) 74%, rgba(109,255,123,0.14))' }}
            />
            <div 
              className="absolute -left-[3px] w-[8px] blur-[10px]"
              style={{ height: '100%', background: 'linear-gradient(to bottom, rgba(109,255,123,0.08), rgba(109,255,123,0.16), rgba(242,196,109,0.08))' }}
            />
          </div>
          
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10"
            style={{ top: '-20px' }}
          >
            <div className="relative">
              <span className="select-none border border-[color:var(--terminal-border)] bg-[rgba(8,10,9,0.92)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--terminal-ivory)]">
                {minYear}
              </span>
            </div>
          </div>
          
          <div className="relative z-[2] pt-8">
            {sortedItems.map((item, index) => {
              const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
              const isCardExpanded = expandedCard?.id === cardId;
              
              return (
                <div 
                  key={index} 
                  className="w-full py-3"
                >
                  <div className="flex justify-center mb-2">
                    <div className="relative">
                      <span className="select-none border border-[color:var(--terminal-border)] bg-[rgba(8,10,9,0.92)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--terminal-ivory)]">
                        {item.startYear === item.endYear ? item.startYear : `${item.startYear} - ${item.endYear}`}
                      </span>
                    </div>
                  </div>
                  
                  <TimelineCard
                    item={item}
                    isRight={index % 2 === 0}
                    isMobile={true}
                    onHover={onHover}
                    isExpanded={isCardExpanded}
                    onToggleExpand={setExpandedCard}
                    expandedHeight={expandedCard?.expandedHeight || 0}
                    zIndex={isCardExpanded ? 100 : 10 + index}
                  />
                </div>
              );
            })}
          </div>
          
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10"
            style={{ bottom: '-40px' }}
          >
            <div className="relative">
              <span className="select-none border border-[color:var(--terminal-border)] bg-[rgba(8,10,9,0.92)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--terminal-ivory)]">
                {maxYear}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
