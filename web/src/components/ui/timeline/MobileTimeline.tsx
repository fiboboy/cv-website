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
      {/* Mobile Timeline Legend */}
      <div id="mobile-timeline-legend" className="flex justify-center gap-4 mb-4 relative z-20">
        <TimelineLegend isMobileView={true} />
      </div>
      
      {/* Центральная линия таймлайна */}
      <div className="relative mt-4 mb-12" id="mobile-timeline-content">
        {/* Container для линии и карточек */}
        <div className="relative" style={{ minHeight: `${minContainerHeight}px` }}>
          {/* Фиксированная центральная линия */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full z-[1]">
            {/* Верхняя градиентная линия */}
            <div 
              className="absolute top-0 w-full bg-gradient-to-b from-transparent to-blue-500"
              style={{ height: '50px' }}
            />
            
            {/* Основная линия с градиентом */}
            <div 
              className="absolute w-full bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500"
              style={{ 
                top: '50px',
                height: 'calc(100% - 100px)',
                animation: 'gradientFlow 8s linear infinite',
                backgroundSize: '200% 200%',
              }} 
            />
            
            {/* Нижняя градиентная линия */}
            <div 
              className="absolute bottom-0 w-full bg-gradient-to-b from-purple-500 to-transparent"
              style={{ height: '50px' }}
            />
          </div>
          
          {/* Год 2001 в начале таймлайна */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10"
            style={{ top: '-20px' }}
          >
            <div className="relative">
              <span className="text-sm font-medium text-zinc-200 select-none px-2 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full">
                {minYear}
              </span>
            </div>
          </div>
          
          {/* Карточки */}
          <div className="relative z-[2] pt-8">
            {sortedItems.map((item, index) => {
              const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
              const isCardExpanded = expandedCard?.id === cardId;
              
              return (
                <div 
                  key={index} 
                  className="w-full py-3"
                >
                  {/* Маркер года */}
                  <div className="flex justify-center mb-2">
                    <div className="relative">
                      <span className="text-xs font-medium text-zinc-200 select-none px-2 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full">
                        {item.startYear === item.endYear ? item.startYear : `${item.startYear} - ${item.endYear}`}
                      </span>
                    </div>
                  </div>
                  
                  {/* Карточка таймлайна */}
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
          
          {/* Год 2025 в конце таймлайна */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10"
            style={{ bottom: '-40px' }}
          >
            <div className="relative">
              <span className="text-sm font-medium text-zinc-200 select-none px-2 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full">
                {maxYear}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Стили для анимации */}
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
      `}</style>
    </div>
  );
} 