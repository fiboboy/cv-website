import React, { useMemo } from 'react';
import { ActivePeriod, ExpandedCard, ProcessedTimelineItem, TimelineItem } from './types';
import { TimelineCard } from './TimelineCard';
import { TimelineLegend } from './TimelineLegend';
import { getYearPosition } from './utils';

interface DesktopTimelineProps {
  processedLeftItems: ProcessedTimelineItem[];
  processedRightItems: ProcessedTimelineItem[];
  expandedCard: ExpandedCard | null;
  setExpandedCard: (card: ExpandedCard | null) => void;
  setActivePeriod: (period: ActivePeriod | null) => void;
  getPositionByYear: (year: number) => number;
  MIN_YEAR: number;
  maxYear: number;
  timelineData: TimelineItem[];
  getExpandedCardExtraHeight: () => number;
  totalTimelineHeight: number;
  contentHeight: number;
  yearStart: number;
  yearEnd: number;
  numYears: number;
}

export function DesktopTimeline({
  processedLeftItems,
  processedRightItems,
  expandedCard,
  setExpandedCard,
  setActivePeriod,
  getPositionByYear,
  MIN_YEAR,
  maxYear,
  timelineData,
  getExpandedCardExtraHeight,
  totalTimelineHeight,
  contentHeight,
  yearStart,
  yearEnd,
  numYears
}: DesktopTimelineProps) {
  const leftItems = processedLeftItems.filter(item => item.side === 'left');
  const rightItems = processedRightItems.filter(item => item.side === 'right');
  
  // Формируем маркеры лет для отображения на таймлайне
  const yearMarkers = useMemo(() => {
    type YearMarker = {
      year: number;
      position: number;
    };
    
    const markers: YearMarker[] = [];
    
    // Фиксированные годы, которые всегда должны отображаться
    const fixedYears = [1984, 2001, 2004, 2009, 2014, 2019];
    
    // Добавляем все фиксированные годы в диапазоне
    fixedYears.forEach(year => {
      if (year >= yearStart && year <= yearEnd) {
        markers.push({
          year,
          position: getYearPosition(year, yearStart, yearEnd, numYears),
        });
      }
    });
    
    // Всегда добавляем 2025 год после последней карточки
    const lastCardYear = Math.max(
      ...processedLeftItems.map(item => item.endYear),
      ...processedRightItems.map(item => item.endYear)
    );
    
    const lastCardPosition = Math.max(
      ...processedLeftItems.map(item => item.basePosition + item.height),
      ...processedRightItems.map(item => item.basePosition + item.height)
    );
    
    // Добавляем 2025 год с отступом от последней карточки
    markers.push({
      year: 2025,
      position: lastCardPosition + 100, // 100px отступ от последней карточки
    });
    
    // Сортируем маркеры по годам
    markers.sort((a, b) => a.year - b.year);
    
    return markers;
  }, [yearStart, yearEnd, numYears, contentHeight, processedLeftItems, processedRightItems]);

  return (
    <div className="relative hidden min-h-screen md:block">
      <div className="sticky top-20 z-[3] grid grid-cols-[1fr,auto,1fr] gap-0 py-4">
        <div className="col-span-3">
          <TimelineLegend isMobileView={false} />
        </div>
      </div>
      
      <div className="relative" style={{ minHeight: `${totalTimelineHeight}px` }}>
        <div className="absolute inset-0 flex justify-center z-[1]">
          <div className="relative w-[2px]" 
            style={{ 
              height: `${totalTimelineHeight}px`,
            }}
          >
            <div 
              className="absolute top-0 w-full"
              style={{ 
                height: `${contentHeight}px`,
                background: 'linear-gradient(to bottom, rgba(243,239,226,0.16) 0%, rgba(109,255,123,0.75) 36%, rgba(242,196,109,0.38) 72%, rgba(109,255,123,0.18) 100%)'
              }}
            />
            <div 
              className="absolute -left-[3px] w-[8px] blur-[10px]"
              style={{ 
                height: `${contentHeight}px`,
                background: 'linear-gradient(to bottom, rgba(109,255,123,0.1) 0%, rgba(109,255,123,0.18) 50%, rgba(242,196,109,0.08) 100%)'
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-0 relative z-[2]">
          <div className="relative flex justify-end min-h-full">
            {leftItems.map((item, index) => {
              const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
              const isCardExpanded = expandedCard?.id === cardId;
              
              return (
                <div
                  key={index}
                  className="absolute w-[calc(100%-2rem)]"
                  style={{
                    top: `${item.basePosition + item.verticalShift}px`,
                    height: `${item.height}px`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: `translateX(-18px)`,
                    zIndex: isCardExpanded ? 100 : 10 + index
                  }}
                >
                  <TimelineCard
                    item={item}
                    isRight={false}
                    isMobile={false}
                    onHover={setActivePeriod}
                    isExpanded={isCardExpanded}
                    onToggleExpand={setExpandedCard}
                    expandedHeight={expandedCard?.expandedHeight || 0}
                    zIndex={isCardExpanded ? 100 : 10 + index}
                  />
                </div>
              );
            })}
          </div>

          <div className="relative w-8 flex justify-center" style={{ zIndex: 3 }}>
            {yearMarkers.map(({ year, position }) => (
              <div
                key={year}
                className="absolute flex items-center justify-center h-6 -translate-y-1/2"
                style={{ 
                  top: `${position}px`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: 3
                }}
              >
                <div className="relative">
                  <span className="select-none border border-[color:var(--terminal-border)] bg-[rgba(8,10,9,0.92)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--terminal-ivory)] transition-all duration-300 hover:border-[color:var(--terminal-border-strong)] hover:text-[var(--terminal-green)]">
                    {year}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex justify-start min-h-full">
            {rightItems.map((item, index) => {
              const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
              const isCardExpanded = expandedCard?.id === cardId;
              
              return (
                <div
                  key={index}
                  className="absolute w-[calc(100%-2rem)]"
                  style={{
                    top: `${item.basePosition + item.verticalShift}px`,
                    height: `${item.height}px`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: `translateX(18px)`,
                    zIndex: isCardExpanded ? 100 : 10 + index
                  }}
                >
                  <TimelineCard
                    item={item}
                    isRight={true}
                    isMobile={false}
                    onHover={setActivePeriod}
                    isExpanded={isCardExpanded}
                    onToggleExpand={setExpandedCard}
                    expandedHeight={expandedCard?.expandedHeight || 0}
                    zIndex={isCardExpanded ? 100 : 10 + index}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
} 
