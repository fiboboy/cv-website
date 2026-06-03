import React, { useState, useMemo, memo } from 'react';
import { SkillWeight, Competency } from './types';
import { RankedSkillItem } from './RankedSkillItem';
import { topITSkills, fullCompetencies } from './utils';

interface SkillsTableProps {
  isSkillsExpanded: boolean;
  setIsSkillsExpanded: (expanded: boolean) => void;
  isMobile: boolean;
}

// Консолидированные навыки по основным категориям
const topSkills = [
  // Технические категории
  'Frontend Development',
  'Backend Development',
  'Software Architecture',
  'DevOps & Infrastructure',
  'API & Data',
  'Database Technologies',
  
  // Авиационная специализация
  'Air Traffic Management',
  'Flight Operations',
  'Aviation Safety & Security',
  
  // Креативные навыки
  'UX/UI Design',
  '3D Modeling & Design',
  'Blockchain & Web3',
  
  // Ключевые профессиональные навыки
  'Strategic Decision-Making',
  'Crisis Management',
  'Leadership',
  'Problem-Solving',
  'Analytical Thinking',
  'Stress Resilience',
  'Communication Skills',
  'Task & Resource Management',
  'Teamwork & Collaboration',
  'Data Analysis & Research'
];

const SkillsTable = memo(({ 
  isSkillsExpanded, 
  setIsSkillsExpanded, 
  isMobile
}: SkillsTableProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hard' | 'soft'>('all');

  // Получаем видимые навыки на основе состояния расширения и фильтрации
  const visibleSkills = useMemo(() => {
    // Выбираем список навыков в зависимости от состояния расширения
    const skills = isSkillsExpanded ? fullCompetencies : topITSkills;
    
    // Фильтруем по категории, если выбрана
    let filteredSkills = skills as Competency[];
    if (selectedCategory === 'hard') {
      filteredSkills = filteredSkills.filter(skill => skill.type === 'hard');
    } else if (selectedCategory === 'soft') {
      filteredSkills = filteredSkills.filter(skill => skill.type === 'soft');
    }
    
    // Сортируем по весу
    return filteredSkills.sort((a, b) => b.weight - a.weight);
  }, [isSkillsExpanded, selectedCategory]);

  // Считаем количество скрытых навыков
  const hiddenSkillsCount = useMemo(() => {
    return fullCompetencies.length - topITSkills.length;
  }, []);

  return (
    <div className="terminal-panel w-full p-3 md:p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-mono font-medium text-[var(--terminal-ivory)] tracking-[0.24em] uppercase`}>
          {isSkillsExpanded ? 'COMPETENCIES' : 'TOP IT RELATED COMPETENCIES'}
        </h3>
        <button
          onClick={() => setIsSkillsExpanded(!isSkillsExpanded)}
          className={`
            ${isMobile ? 'text-[10px]' : 'text-xs'} 
            relative 
            flex items-center gap-1
            transition-all
            duration-300
            group
            ${isSkillsExpanded ? 
              'text-[var(--terminal-text-soft)] hover:text-[var(--terminal-green)]' : 
              'animate-text-shine bg-gradient-to-r from-[var(--terminal-green)] via-[var(--terminal-ivory)] to-[var(--terminal-green)] bg-clip-text text-transparent bg-300%'
            }
          `}
        >
          <style jsx>{`
            @keyframes shine {
              0% {
                background-position: 0% center;
              }
              100% {
                background-position: -200% center;
              }
            }
            .animate-text-shine {
              animation: shine 4s linear infinite;
            }
            .bg-300\% {
              background-size: 300% auto;
            }
          `}</style>
          <span>{isSkillsExpanded ? 'Show Less' : 'Show All'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" 
            className={`h-3 w-3 transition-transform ${isSkillsExpanded ? 'rotate-180' : ''} ${!isSkillsExpanded ? 'group-hover:scale-110' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div className="mb-3 flex justify-between px-1 text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--terminal-ash)]">
        <div 
          className={`flex items-center gap-1 cursor-pointer ${selectedCategory === 'hard' || selectedCategory === 'all' ? 'opacity-100' : 'opacity-50'}`}
          onClick={() => isSkillsExpanded && setSelectedCategory(selectedCategory === 'hard' ? 'all' : 'hard')}
        >
          <div className="h-1.5 w-1.5 bg-[var(--terminal-green)]"></div>
          <span>Hard Skills</span>
        </div>
        <div 
          className={`flex items-center gap-1 cursor-pointer ${selectedCategory === 'soft' || selectedCategory === 'all' ? 'opacity-100' : 'opacity-50'}`}
          onClick={() => isSkillsExpanded && setSelectedCategory(selectedCategory === 'soft' ? 'all' : 'soft')}
        >
          <div className="h-1.5 w-1.5 bg-[var(--terminal-amber)]"></div>
          <span>Soft Skills</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {visibleSkills.map((skill) => (
          <RankedSkillItem 
            key={skill.name} 
            skill={{
              name: skill.name,
              currentWeight: skill.weight,
              maxWeight: 10,
              description: skill.description,
              isSoftSkill: skill.type === 'soft',
              rank: 0,
              isActive: true,
              occurrences: 1,
              isNew: false
            }} 
            isMobile={isMobile} 
          />
        ))}
      </div>
    </div>
  );
});

SkillsTable.displayName = 'SkillsTable';

export { SkillsTable }; 
