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
  // Разделяем элементы на левые и правые
  const leftItems = processedLeftItems.filter(item => item.side === 'left');
  const rightItems = processedRightItems.filter(item => item.side === 'right');
  
  // Формируем маркеры лет для отображения на таймлайне
  const yearMarkers = useMemo(() => {
    const markers = [];
    
    // Определяем интервал для отображения маркеров
    // Показываем каждый год, если всего лет мало, иначе делаем интервал больше
    const interval = numYears <= 15 ? 1 : Math.ceil(numYears / 10);
    
    // Логика для расчета годов, которые будут отображаться
    // Начинаем с начального года и идем до конечного с шагом interval
    for (let year = yearStart; year <= yearEnd; year += interval) {
      // Получаем позицию для текущего года
      const yPosition = getYearPosition(year, yearStart, yearEnd, numYears);
      
      markers.push({
        year,
        position: yPosition,
      });
    }

    // Также добавляем последний год, если он не был добавлен интервалом
    if (markers[markers.length - 1]?.year !== yearEnd) {
      markers.push({
        year: yearEnd,
        position: contentHeight,
      });
    }
    
    return markers;
  }, [yearStart, yearEnd, numYears, contentHeight]);

  return (
    <div className="hidden md:block">
      {/* Desktop Timeline Legend */}
      <div className="grid grid-cols-[1fr,auto,1fr] gap-0 relative z-[3]">
        <div className="col-span-3">
          <TimelineLegend isMobileView={false} />
        </div>
      </div>
      
      {/* Timeline center line */}
      <div className="absolute inset-0 flex justify-center z-[1]">
        <div className="relative w-[3px]" 
          style={{ 
            position: 'absolute',
            top: '0px', // Start at the top with no offset
            height: `${totalTimelineHeight}px`, // Full height without offset
          }}
        >
          {/* Верхняя градиентная линия (начало в 1984) */}
          <div 
            className="absolute top-0 w-full bg-gradient-to-b from-transparent to-blue-500"
            style={{ 
              height: '50px',
              zIndex: 3
            }}
          >
            {/* Градиент для начала линии */}
          </div>
          
          {/* Основная линия с улучшенным градиентом */}
          <div 
            className="absolute w-full timeline-main-line"
            style={{ 
              top: '50px',
              height: `${contentHeight - 50}px`,
              background: 'linear-gradient(to bottom, var(--blue-500) 0%, var(--cyan-500) 33%, var(--purple-500) 67%, var(--blue-500) 100%)',
              backgroundSize: '100% 300%',
              animation: 'gradientFlow 15s linear infinite'
            }}
          >
            {/* Основная линия с анимированным градиентом */}
          </div>
          
          {/* Градиент внизу */}
          <div 
            className="absolute w-full bg-gradient-to-b from-purple-500 to-transparent"
            style={{ 
              top: `${contentHeight}px`,
              height: '120px'
            }}
          >
            {/* Градиент для конца линии */}
          </div>
          
          {/* Улучшенный верхний градиент свечения */}
          <div 
            className="absolute top-0 w-[15px] -left-[6px] blur-[8px] bg-gradient-to-b from-transparent to-blue-500/40"
            style={{ 
              height: '50px'
            }}
          />
          
          {/* Улучшенное свечение основной линии */}
          <div 
            className="absolute w-[15px] -left-[6px] blur-[8px] timeline-glow"
            style={{ 
              top: '50px',
              height: `${contentHeight - 50}px`,
              background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.4) 0%, rgba(6, 182, 212, 0.4) 33%, rgba(168, 85, 247, 0.4) 67%, rgba(59, 130, 246, 0.4) 100%)',
              backgroundSize: '100% 300%',
              animation: 'gradientFlow 15s linear infinite'
            }}
          />
          
          {/* Улучшенный нижний градиент свечения */}
          <div 
            className="absolute w-[15px] -left-[6px] blur-[8px] bg-gradient-to-b from-purple-500/40 to-transparent"
            style={{ 
              top: `${contentHeight}px`,
              height: '120px'
            }}
          />
          
          {/* Бегущая анимированная линия свечения - более яркая и плавная */}
          <div 
            className="absolute inset-x-0 w-full h-[300px] pointer-events-none z-[2]"
            style={{
              top: '50px',
              background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.05) 70%, transparent)',
              animation: 'timelineGlow 8s ease-in-out infinite',
              backgroundSize: '100% 300%',
            }}
          />
          
          {/* Дополнительный эффект внешнего свечения */}
          <div 
            className="absolute w-[25px] -left-[11px] h-full blur-[12px] opacity-20"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 0%, rgba(6, 182, 212, 0.3) 33%, rgba(168, 85, 247, 0.3) 67%, rgba(59, 130, 246, 0.3) 100%)',
              backgroundSize: '100% 300%',
              animation: 'gradientFlow 15s linear infinite'
            }}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-[1fr,auto,1fr] gap-0 relative z-[2]">
        {/* Left column - Education and Other items */}
        <div className="relative flex justify-end">
          {leftItems.map((item, index) => {
            const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
            const isCardExpanded = expandedCard?.id === cardId;
            
            return (
              <div
                key={index}
                className="absolute w-[calc(100%-2rem)]"
                style={{
                  top: `${item.basePosition}px`,
                  height: `${item.height}px`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: `translateX(-20px)`,
                  zIndex: isCardExpanded ? 100 : (item.verticalShift > 0 ? 20 + index : 10)
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
                  zIndex={isCardExpanded ? 100 : (item.verticalShift > 0 ? 20 + index : 10)}
                />
              </div>
            );
          })}
        </div>

        {/* Center column - Year markers */}
        <div className="relative w-8 flex justify-center" style={{ zIndex: 3 }}>
          {Array.from(new Set([
            MIN_YEAR,
            2001,
            2004,
            2009,
            2014,
            2019,
            2025
          ]))
            .sort((a, b) => a - b)
            .map(year => {
              const yearPos = getPositionByYear(year);
              
              return (
                <div
                  key={year}
                  className="absolute flex items-center justify-center h-6 -translate-y-1/2"
                  style={{ 
                    top: `${yearPos}px`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 3
                  }}
                >
                  <div className="relative">
                    <span className="text-xs font-medium text-zinc-200 select-none px-2 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full transition-all duration-300 hover:text-white hover:bg-zinc-800/90 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      {year}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Right column - Work items */}
        <div className="relative flex justify-start">
          {rightItems.map((item, index) => {
            const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
            const isCardExpanded = expandedCard?.id === cardId;
            
            return (
              <div
                key={index}
                className="absolute w-[calc(100%-2rem)]"
                style={{
                  top: `${item.basePosition}px`,
                  height: `${item.height}px`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: `translateX(20px)`,
                  zIndex: isCardExpanded ? 100 : (item.verticalShift > 0 ? 20 + index : 10)
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
                  zIndex={isCardExpanded ? 100 : (item.verticalShift > 0 ? 20 + index : 10)}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Добавляем стили для анимации */}
      <style jsx global>{`
        @keyframes timelineGlow {
          0% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
        
        :root {
          --blue-500: rgb(59, 130, 246);
          --cyan-500: rgb(6, 182, 212);
          --purple-500: rgb(168, 85, 247);
        }
      `}</style>
    </div>
  );
} 