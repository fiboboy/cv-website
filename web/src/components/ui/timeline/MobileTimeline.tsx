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
  
  // Создание локальной карты годов для отображения маркеров лет
  const yearMarkers = React.useMemo(() => {
    const uniqueYears = new Set<number>();
    
    // Добавляем все года из карточек
    sortedItems.forEach(item => {
      uniqueYears.add(item.startYear);
      if (item.startYear !== item.endYear) {
        uniqueYears.add(item.endYear);
      }
    });
    
    // Добавляем дополнительные важные годы
    [2001, 2004, 2009, 2014, 2019, 2025].forEach(year => uniqueYears.add(year));
    
    return Array.from(uniqueYears).sort((a, b) => a - b);
  }, [processedItems]);
  
  // Рассчитываем приблизительную минимальную высоту для контейнера, чтобы вмещать все карточки
  // Уменьшаем значение для более плотного отображения карточек
  const minContainerHeight = sortedItems.length * 120 + 150; // 120px на карточку + запас на отступы
  
  return (
    <div className="md:hidden w-full">
      {/* Mobile Timeline Legend */}
      <div id="mobile-timeline-legend" className="flex justify-center gap-4 mb-4 relative z-20">
        <TimelineLegend isMobileView={true} />
      </div>
      
      {/* Центральная линия таймлайна - фиксированная, не зависит от контента */}
      <div className="relative mt-4 mb-12" id="mobile-timeline-content">
        {/* Container для линии и карточек */}
        <div className="relative" style={{ minHeight: `${minContainerHeight}px` }}>
          {/* Фиксированная центральная линия */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full z-[1]">
            {/* Верхняя градиентная линия (начало) */}
            <div 
              className="absolute top-0 w-full bg-gradient-to-b from-transparent to-blue-500"
              style={{ 
                height: '50px',
                zIndex: 3
              }}
            />
            
            {/* Основная линия с градиентом цветов из легенды */}
            <div 
              className="absolute w-full bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500"
              style={{ 
                top: '50px',
                height: 'calc(100% - 170px)',
                animation: 'gradientFlow 8s linear infinite',
                backgroundSize: '200% 200%',
              }} 
            />
            
            {/* Нижняя градиентная линия (конец) */}
            <div 
              className="absolute bottom-0 w-full bg-gradient-to-b from-purple-500 to-transparent"
              style={{ 
                height: '120px',
                zIndex: 3
              }}
            />
            
            {/* Эффект свечения */}
            <div 
              className="absolute w-[9px] -left-[3px] h-full blur-[6px] opacity-50"
            >
              {/* Верхний градиент свечения */}
              <div 
                className="absolute top-0 w-full bg-gradient-to-b from-transparent to-blue-500/40"
                style={{ 
                  height: '50px'
                }}
              />
              
              {/* Основное свечение */}
              <div 
                className="absolute w-full bg-gradient-to-b from-blue-500/40 via-cyan-500/40 to-purple-500/40"
                style={{ 
                  top: '50px',
                  height: 'calc(100% - 170px)',
                  animation: 'gradientFlow 8s linear infinite',
                  backgroundSize: '200% 200%',
                }}
              />
              
              {/* Нижний градиент свечения */}
              <div 
                className="absolute bottom-0 w-full bg-gradient-to-b from-purple-500/40 to-transparent"
                style={{ 
                  height: '120px'
                }}
              />
            </div>
            
            {/* Бегущая анимированная линия свечения */}
            <div 
              className="absolute top-0 inset-x-0 w-full h-[150px] pointer-events-none z-[2]"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15) 50%, transparent)',
                animation: 'timelineGlow 5s ease-in-out infinite',
                backgroundSize: '100% 200%',
              }}
            />
          </div>
          
          {/* Годовые маркеры */}
          {yearMarkers.map(year => (
            <div 
              key={year}
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10"
              style={{ 
                top: `${year * 100 - (sortedItems[0]?.startYear || 2001) * 100 + 30}px`,
              }}
            >
              <div className="relative">
                <span className="text-xs font-medium text-zinc-200 select-none px-2 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full">
                  {year}
                </span>
              </div>
            </div>
          ))}
          
          {/* Карточки */}
          <div className="relative z-[2] flex flex-col gap-8 pb-10">
            {sortedItems.map((item, index) => {
              const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
              const isCardExpanded = expandedCard?.id === cardId;
              
              // Расчет позиции первой карточки 
              const firstCardPosition = (item.startYear - (sortedItems[0]?.startYear || 2001)) * 100 + 30;
              
              return (
                <div 
                  key={index} 
                  className="w-full"
                  style={{
                    marginTop: index === 0 ? `${firstCardPosition}px` : undefined 
                  }}
                >
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
      `}</style>
    </div>
  );
} 