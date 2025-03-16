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
  
  // Находим минимальный и максимальный год для расчета масштаба
  const minYear = Math.min(...sortedItems.map(item => item.startYear));
  const maxYear = Math.max(...sortedItems.map(item => item.endYear));
  const totalYears = maxYear - minYear;
  
  // Базовая высота для одного года (в пикселях)
  const YEAR_HEIGHT = 120;
  
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
    
    // Добавляем промежуточные годы для более равномерного распределения маркеров
    for (let year = minYear; year <= maxYear; year++) {
      if (year % 2 === 0) { // Добавляем каждый второй год
        uniqueYears.add(year);
      }
    }
    
    return Array.from(uniqueYears).sort((a, b) => a - b);
  }, [sortedItems, minYear, maxYear]);
  
  // Функция для расчета позиции на основе года
  const calculatePosition = (year: number) => {
    return (year - minYear) * YEAR_HEIGHT;
  };
  
  // Рассчитываем минимальную высоту контейнера
  const minContainerHeight = (totalYears + 1) * YEAR_HEIGHT;
  
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
          
          {/* Годовые маркеры */}
          {yearMarkers.map(year => (
            <div 
              key={year}
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10"
              style={{ 
                top: `${calculatePosition(year)}px`,
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
          <div className="relative z-[2] flex flex-col gap-8">
            {sortedItems.map((item, index) => {
              const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
              const isCardExpanded = expandedCard?.id === cardId;
              
              // Расчет позиции карточки
              const cardPosition = calculatePosition(item.startYear);
              
              // Расчет дополнительного сдвига для избежания наложения карточек
              const cardSpacing = 20; // Базовый отступ между карточками
              const verticalShift = index > 0 ? cardSpacing : 0;
              
              return (
                <div 
                  key={index} 
                  className="w-full"
                  style={{
                    position: 'absolute',
                    top: `${cardPosition + verticalShift}px`,
                    left: 0,
                    right: 0,
                  }}
                >
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