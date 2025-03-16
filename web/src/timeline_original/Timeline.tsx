'use client';

import React from 'react';

interface TimelineItem {
  startYear: number;
  endYear: number;
  title: string;
  description: string;
  category: 'education' | 'work' | 'hobby';
  skills?: Array<{
    name: string;
    weight: number; // Weight from 1-10 indicating expertise level
  }>;
}

// Updated timeline data from the info.md file
const timelineData: TimelineItem[] = [
  // Birth as first milestone
  {
    startYear: 1984,
    endYear: 1984,
    title: "Birth",
    description: "Beginning of life journey",
    category: 'hobby',
    skills: []
  },
  // Education
  {
    startYear: 2001,
    endYear: 2006,
    title: "Master's degree in Aircraft Operations and Air Traffic Management",
    description: "Saint Petersburg State University of Civil Aviation",
    category: 'education',
    skills: [
      { name: 'Air traffic management systems', weight: 8 },
      { name: 'Flight trajectory optimization', weight: 7 },
      { name: 'Risk assessment', weight: 8 },
      { name: 'Radio communication', weight: 9 },
      { name: 'Aviation regulations', weight: 8 },
      { name: 'Emergency procedures', weight: 7 },
      { name: 'Attention to detail', weight: 9 },
      { name: 'Decision-making under pressure', weight: 10 },
      { name: 'Analytical thinking', weight: 8 },
      { name: 'Multi-tasking', weight: 9 },
      { name: 'Stress management', weight: 9 }
    ]
  },
  {
    startYear: 2008,
    endYear: 2012,
    title: "Specialist degree in State and Municipal Administration",
    description: "Russian State Humanitarian University",
    category: 'education',
    skills: [
      { name: 'Public administration', weight: 7 },
      { name: 'Organizational management', weight: 8 },
      { name: 'Data analysis', weight: 7 },
      { name: 'Government regulatory framework', weight: 6 },
      { name: 'Leadership', weight: 8 },
      { name: 'Communication', weight: 8 },
      { name: 'Team coordination', weight: 9 },
      { name: 'Planning', weight: 8 }
    ]
  },
  {
    startYear: 2018,
    endYear: 2019,
    title: "Additional diploma in Management",
    description: "Russian Presidential Academy of National Economy and Public Administration (RANEPA)",
    category: 'education',
    skills: [
      { name: 'Team management', weight: 9 },
      { name: 'Performance evaluation', weight: 8 },
      { name: 'Conflict resolution', weight: 8 },
      { name: 'Business process optimization', weight: 7 },
      { name: 'Coaching', weight: 8 },
      { name: 'Decision-making', weight: 9 },
      { name: 'Problem-solving', weight: 9 }
    ]
  },
  
  // Career
  {
    startYear: 2002,
    endYear: 2002,
    title: "Bookseller",
    description: "First job experience with customer service and sales",
    category: 'work',
    skills: [
      { name: 'Customer service', weight: 5 },
      { name: 'Cash handling', weight: 4 },
      { name: 'Sales techniques', weight: 5 },
      { name: 'Communication', weight: 6 },
      { name: 'Attention to detail', weight: 6 }
    ]
  },
  {
    startYear: 2003,
    endYear: 2003,
    title: "Bakery Worker",
    description: "Food preparation and bakery operations in a high-paced environment",
    category: 'work',
    skills: [
      { name: 'Food preparation', weight: 5 },
      { name: 'Time management', weight: 6 },
      { name: 'Precision', weight: 7 },
      { name: 'Patience', weight: 7 }
    ]
  },
  {
    startYear: 2004,
    endYear: 2004,
    title: "PC Operator at Insurance Company",
    description: "Data entry and processing using Microsoft Office",
    category: 'work',
    skills: [
      { name: 'Data entry', weight: 6 },
      { name: 'Microsoft Office', weight: 7 },
      { name: 'Databases', weight: 6 },
      { name: 'Accuracy', weight: 8 },
      { name: 'Efficiency', weight: 7 }
    ]
  },
  {
    startYear: 2005,
    endYear: 2005,
    title: "Security Guard at Museum",
    description: "Surveillance, security protocols, and tour guiding for foreign groups",
    category: 'work',
    skills: [
      { name: 'Surveillance', weight: 6 },
      { name: 'Security protocols', weight: 7 },
      { name: 'Conflict resolution', weight: 7 },
      { name: 'Tour guiding', weight: 6 },
      { name: 'Problem-solving', weight: 7 },
      { name: 'Communication', weight: 7 },
      { name: 'Crisis management', weight: 6 }
    ]
  },
  {
    startYear: 2005,
    endYear: 2006,
    title: "Ventilation Systems Installer",
    description: "HVAC installation and technical blueprint reading",
    category: 'work',
    skills: [
      { name: 'HVAC installation', weight: 6 },
      { name: 'Technical blueprint reading', weight: 7 },
      { name: 'Hand tools', weight: 6 },
      { name: 'Power tools', weight: 6 },
      { name: 'Teamwork', weight: 7 },
      { name: 'Precision', weight: 8 }
    ]
  },
  {
    startYear: 2006,
    endYear: 2009,
    title: "3rd-class Air Traffic Controller",
    description: "Radar control, radio communication, and flight coordination at State ATM Corporation",
    category: 'work',
    skills: [
      { name: 'Radar control', weight: 8 },
      { name: 'Radio communication', weight: 9 },
      { name: 'Flight coordination', weight: 8 },
      { name: 'Situational awareness', weight: 9 },
      { name: 'Quick decision-making', weight: 9 }
    ]
  },
  {
    startYear: 2009,
    endYear: 2012,
    title: "2nd-class Air Traffic Controller",
    description: "Advanced air traffic management and route optimization at State ATM Corporation",
    category: 'work',
    skills: [
      { name: 'Advanced air traffic management', weight: 9 },
      { name: 'Route optimization', weight: 8 },
      { name: 'Emergency response', weight: 9 },
      { name: 'Leadership', weight: 8 },
      { name: 'Team coordination', weight: 9 }
    ]
  },
  {
    startYear: 2012,
    endYear: 2015,
    title: "1st-class Air Traffic Controller",
    description: "Complex traffic management and large-scale coordination at State ATM Corporation",
    category: 'work',
    skills: [
      { name: 'Complex traffic management', weight: 9 },
      { name: 'Large-scale coordination', weight: 9 },
      { name: 'Crisis management', weight: 9 },
      { name: 'Decision-making under pressure', weight: 10 }
    ]
  },
  {
    startYear: 2015,
    endYear: 2018,
    title: "Senior Air Traffic Controller",
    description: "Supervisory duties, training and mentoring at State ATM Corporation",
    category: 'work',
    skills: [
      { name: 'Supervisory duties', weight: 9 },
      { name: 'Training', weight: 8 },
      { name: 'Mentoring', weight: 9 },
      { name: 'Advanced problem-solving', weight: 9 },
      { name: 'Teaching', weight: 8 },
      { name: 'Stress resilience', weight: 10 },
      { name: 'Work instructions development', weight: 8 },
      { name: 'Time planning', weight: 9 }
    ]
  },
  {
    startYear: 2018,
    endYear: 2022,
    title: "Flight Operations Supervisor",
    description: "Team leadership and inter-agency coordination at State ATM Corporation",
    category: 'work',
    skills: [
      { name: 'Team leadership', weight: 10 },
      { name: 'Inter-agency coordination', weight: 9 },
      { name: 'Disaster recovery planning', weight: 8 },
      { name: 'High-pressure decision-making', weight: 10 },
      { name: 'Stakeholder communication', weight: 9 },
      { name: 'Work instructions analysis', weight: 9 },
      { name: 'Task control', weight: 10 },
      { name: 'Operational procedures development', weight: 9 }
    ]
  },
  {
    startYear: 2015,
    endYear: 2016,
    title: "Entrepreneur",
    description: "Business development and market research",
    category: 'work',
    skills: [
      { name: 'Business development', weight: 7 },
      { name: 'Market research', weight: 7 },
      { name: 'Problem-solving', weight: 8 },
      { name: 'Negotiation', weight: 8 }
    ]
  },
  {
    startYear: 2024,
    endYear: 2024,
    title: "Web Development & AI Automation",
    description: "AI-assisted development and automation",
    category: 'work',
    skills: [
      { name: 'AI-assisted Web development', weight: 8 },
      { name: 'AI-assisted API integration', weight: 7 },
      { name: 'AI-assisted Automation', weight: 8 },
      { name: 'UX/UI Design', weight: 7 },
      { name: 'Adaptability', weight: 9 },
      { name: 'Critical thinking', weight: 9 },
      { name: 'User Experience Focus', weight: 8 }
    ]
  },
  
  // Key Events & Projects
  {
    startYear: 2011,
    endYear: 2011,
    title: "Aircraft Accident Management",
    description: "Crisis handling and aviation emergency procedures",
    category: 'hobby',
    skills: [
      { name: 'Crisis handling', weight: 9 },
      { name: 'Aviation emergency procedures', weight: 9 },
      { name: 'Stress management', weight: 10 },
      { name: 'Decision-making', weight: 10 }
    ]
  },
  {
    startYear: 2019,
    endYear: 2019,
    title: "Emergency Landing of an Air China Aircraft",
    description: "Flight operation crisis management",
    category: 'hobby',
    skills: [
      { name: 'Flight operation crisis management', weight: 10 },
      { name: 'Leadership under pressure', weight: 10 }
    ]
  },
  {
    startYear: 2019,
    endYear: 2019,
    title: "Internal Study on ATC Demotivation Factors",
    description: "Data analysis and reporting on motivational factors",
    category: 'hobby',
    skills: [
      { name: 'Data analysis', weight: 8 },
      { name: 'Reporting', weight: 8 },
      { name: 'Research', weight: 8 },
      { name: 'Presentation', weight: 8 }
    ]
  },
  {
    startYear: 2020,
    endYear: 2020,
    title: "Scientific Article Publication",
    description: "Research and academic writing on ATC topics",
    category: 'hobby',
    skills: [
      { name: 'Research', weight: 8 },
      { name: 'Academic writing', weight: 8 },
      { name: 'Analytical thinking', weight: 9 }
    ]
  },
  {
    startYear: 2020,
    endYear: 2021,
    title: "UX/UI Design Studies",
    description: "Learning UX/UI principles and practical application in student projects",
    category: 'education',
    skills: [
      { name: 'UX/UI Design', weight: 7 },
      { name: 'User Experience Focus', weight: 7 },
      { name: 'Wireframing', weight: 6 },
      { name: 'User Research', weight: 6 },
      { name: 'Prototyping', weight: 6 },
      { name: 'Design Thinking', weight: 7 },
      { name: 'Visual Design', weight: 6 },
      { name: 'Figma', weight: 7 },
      { name: 'Problem-Solving & Adaptability', weight: 7 },
      { name: 'Creative Thinking', weight: 7 }
    ]
  },
  // Добавляем новый блок для Web3 Gaming
  {
    startYear: 2023,
    endYear: 2024,
    title: "Web3 Gaming Exploration",
    description: "Participation in Web3 gaming ecosystems and NFT collections",
    category: 'hobby',
    skills: [
      { name: 'Blockchain & Crypto', weight: 8 },
      { name: 'GameFi Participation', weight: 7 },
      { name: 'Play-to-Earn Games', weight: 7 },
      { name: 'NFT Trading', weight: 7 },
      { name: 'Community Engagement', weight: 6 },
      { name: 'Game Strategy', weight: 7 },
      { name: 'Web3 Ecosystem Knowledge', weight: 7 },
      { name: 'Adaptability', weight: 8 }
    ]
  },
  // Add new item for OSINT and Drone Operation
  {
    startYear: 2015,
    endYear: 2022,
    title: "OSINT & Drone Operation",
    description: "Open Source Intelligence gathering and professional drone piloting",
    category: 'hobby',
    skills: [
      { name: '3D Modeling & Drone Operation', weight: 8 },
      { name: 'OSINT & Information Analysis', weight: 7 },
      { name: 'Drone operation & aerial control', weight: 8 },
      { name: 'Aerial photography', weight: 7 },
      { name: 'Data collection', weight: 7 },
      { name: 'Pattern recognition', weight: 7 },
      { name: 'Situational awareness', weight: 8 },
      { name: 'Precision', weight: 7 },
      { name: 'Problem-Solving & Adaptability', weight: 7 }
    ]
  },
  // Добавляем новый блок для 3D Printing
  {
    startYear: 2022,
    endYear: 2024,
    title: "3D Printing & Modeling",
    description: "Creating and printing custom 3D models and prototypes",
    category: 'hobby',
    skills: [
      { name: '3D Modeling & Drone Operation', weight: 8 },
      { name: '3D Design', weight: 7 },
      { name: 'CAD Software', weight: 7 },
      { name: 'Material Science', weight: 6 },
      { name: 'Prototype Development', weight: 7 },
      { name: 'Digital Fabrication', weight: 7 },
      { name: 'Technical Problem-Solving', weight: 8 },
      { name: 'Precision', weight: 7 },
      { name: 'Creativity', weight: 8 }
    ]
  },
];

// Updated soft skills classification - более четкое разделение
const softSkills = new Set([
  // Лидерские и управленческие навыки
  'Leadership & Team Coordination',
  'Team leadership',
  'Leadership',
  'Leadership under pressure',
  'Stakeholder communication',
  'Negotiation',
  'Coaching',
  'Mentoring',
  'Teaching',
  'Training',
  'Team coordination',
  'Team management',
  'Supervisory duties',
  
  // Навыки принятия решений и работы под давлением
  'Decision-Making Under Pressure',
  'Decision-making',
  'High-pressure decision-making',
  'Quick decision-making',
  
  // Когнитивные и аналитические навыки
  'Problem-Solving & Adaptability',
  'Problem-solving',
  'Advanced problem-solving',
  'Critical thinking',
  'Analytical thinking',
  'Adaptability',
  
  // Навыки управления стрессом и кризисами
  'Stress management',
  'Stress resilience',
  'Crisis management',
  'Crisis handling',
  
  // Внимание и точность
  'Attention to detail',
  'Precision',
  'Accuracy',
  'Efficiency',
  
  // Коммуникационные навыки
  'Communication & Presentation',
  'Communication',
  'Presentation',
  
  // Операционное управление
  'Operational Management',
  'Work instructions development',
  'Work instructions analysis',
  'Operational procedures development',
  'Time planning',
  'Task control',
  'Inter-agency coordination',
  
  // Другие софт-скилы
  'Multi-tasking',
  'Planning',
  'Situational awareness',
  'Patience',
  'User Experience Focus',
  'Conflict resolution'
]);

// Создаем топовые компетенции с рангами на основе таблицы из info.md
// Объединяем похожие компетенции и корректно распределяем по категориям
const rankedCompetencies = [
  { 
    name: 'Complex Systems Management', 
    rank: 1, 
    weight: 10, 
    description: 'Critical Operations, Real-time Coordination, Risk Management, Emergency Response, Strategic Planning', 
    isSoftSkill: false 
  },
  { 
    name: 'Decision-Making Under Pressure', 
    rank: 2, 
    weight: 10, 
    description: 'Crisis Management, Strategic Thinking, Risk Assessment, Quick Response, Stress Resilience', 
    isSoftSkill: true 
  },
  { 
    name: 'Leadership & Team Coordination', 
    rank: 3, 
    weight: 9, 
    description: 'Team Management, Mentoring, Stakeholder Management, Team Building, Performance Evaluation', 
    isSoftSkill: true 
  },
  { 
    name: 'Problem-Solving & Adaptability', 
    rank: 4, 
    weight: 9, 
    description: 'Critical Thinking, Fast Learning Ability, Cross-industry Transitions, Analytical Approach, Innovation', 
    isSoftSkill: true 
  },
  { 
    name: 'Learning Agility', 
    rank: 5, 
    weight: 9, 
    description: 'Rapid Skill Acquisition, Tech Adaptability, Continuous Improvement, Knowledge Sharing, Self-Development', 
    isSoftSkill: true 
  },
  { 
    name: 'Blockchain & Crypto', 
    rank: 6, 
    weight: 8, 
    description: 'Web3 Technologies, Tokenomics, NFT/GameFi Ecosystems, Market Analysis, Trading Strategy', 
    isSoftSkill: false 
  },
  { 
    name: 'UX/UI Design', 
    rank: 7, 
    weight: 8, 
    description: 'User Experience Focus, Figma, Interface Optimization, Responsive Design, User Research', 
    isSoftSkill: false 
  },
  { 
    name: 'Operational Management', 
    rank: 8, 
    weight: 8, 
    description: 'Project Planning, Resource Allocation, Process Optimization, Quality Control, Risk Management', 
    isSoftSkill: true 
  },
  { 
    name: 'AI-assisted Development', 
    rank: 9, 
    weight: 8, 
    description: 'Web Development, API Integration, Automation, AI Tools, Code Generation', 
    isSoftSkill: false 
  },
  { 
    name: 'Communication & Presentation', 
    rank: 10, 
    weight: 8, 
    description: 'Stakeholder Relations, Pitching, Content Creation, Public Speaking, Documentation', 
    isSoftSkill: true 
  },
  { 
    name: 'Data Analysis & Research', 
    rank: 11, 
    weight: 7, 
    description: 'Market Trends, Competitive Analysis, Strategic Insights, Data Visualization, Pattern Recognition', 
    isSoftSkill: false 
  },
  { 
    name: 'OSINT & Information Analysis', 
    rank: 12, 
    weight: 7, 
    description: 'Open Source Intelligence, Pattern Recognition, Strategic Research, Data Verification, Source Assessment', 
    isSoftSkill: false 
  },
  { 
    name: '3D Modeling & Drone Operation', 
    rank: 13, 
    weight: 6, 
    description: 'Aerial Photography, UAV Navigation, 3D Printing, Model Design, Flight Planning', 
    isSoftSkill: false 
  }
];

// Types
interface TimelineItemWithSide extends TimelineItem {
  side: 'left' | 'right';
}

interface SkillWeight {
  name: string;
  currentWeight: number;
  maxWeight: number;
  rank: number;
  isActive: boolean;
  occurrences: number;
  isNew: boolean;
  description?: string;
  isSoftSkill: boolean;
  source?: string;
}

// Constants
const YEAR_HEIGHT = 80;
const FIRST_INTERVAL_HEIGHT = 30; // Высота для первого интервала (1984-2001)
const MIN_YEAR = 1984;
const HEADER_OFFSET = 100;
const MOBILE_BREAKPOINT = 768;

// Utility functions
const getYearPosition = (year: number, minYear: number, maxYear: number, totalYears: number) => {
  // Специальная обработка для первого интервала (1984-2001)
  if (year <= 2001) {
    const firstIntervalProgress = (year - 1984) / (2001 - 1984);
    return firstIntervalProgress * FIRST_INTERVAL_HEIGHT;
  }
  
  // Для остальных лет используем обычный расчет, но с учетом сжатого первого интервала
  const remainingHeight = totalYears * YEAR_HEIGHT - FIRST_INTERVAL_HEIGHT;
  const yearProgress = (year - 2001) / (maxYear - 2001);
  return FIRST_INTERVAL_HEIGHT + (yearProgress * remainingHeight);
};

const getCategoryColor = (category: TimelineItem['category']) => {
  switch (category) {
    case 'education':
      return 'bg-blue-500';
    case 'work':
      return 'bg-cyan-500';
    case 'hobby':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

const getSkillColor = (isSoftSkill: boolean) => {
  return isSoftSkill 
    ? 'from-purple-500 to-pink-500'
    : 'from-blue-500 to-cyan-500';
};

// Components
function RankedSkillItem({ skill, isMobile }: { skill: SkillWeight; isMobile: boolean }) {
  return (
    <div className="transition-all duration-500 transform opacity-100 hover:scale-[1.02]">
      <div className="flex items-start gap-2 mb-1.5">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <span className={`text-white/90 font-medium ${isMobile ? 'text-xs' : 'text-sm'} leading-tight transition-all duration-300 ${skill.isActive ? 'text-white' : ''}`}>
              {skill.name}
            </span>
            <div className="flex flex-col">
              {skill.description && (
                <span className={`${isMobile ? 'text-[8px] leading-tight' : 'text-[9px]'} text-white/50 line-clamp-2`}>
                  {skill.description}
                </span>
              )}
            </div>
          </div>
        </div>
        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-white/70 pt-0.5`}>{skill.currentWeight}</span>
      </div>
      <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${getSkillColor(skill.isSoftSkill)} ${skill.isActive ? 'shadow-[0_0_8px_rgba(147,51,234,0.4)]' : ''}`}
          style={{
            width: `${skill.currentWeight * 10}%`,
            transition: 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out, box-shadow 0.5s ease-out'
          }}
        />
      </div>
    </div>
  );
}

interface ActivePeriod {
  startYear: number;
  endYear: number;
  category: TimelineItem['category'];
}

// Add back the ExpandedCard interface
interface ExpandedCard {
  id: string;
  startYear: number;
  endYear: number;
  expandedHeight: number;
}

function TimelineCard({ 
  item, 
  isRight, 
  isMobile,
  onHover,
  isExpanded,
  onToggleExpand,
  expandedHeight,
  zIndex
}: { 
  item: TimelineItemWithSide; 
  isRight: boolean; 
  isMobile: boolean;
  onHover: (period: ActivePeriod | null) => void;
  isExpanded: boolean;
  onToggleExpand: (card: ExpandedCard | null) => void;
  expandedHeight: number;
  zIndex: number;
}) {
  const colorClass = getCategoryColor(item.category);
  const baseColor = colorClass.split('-')[1];
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [localExpanded, setLocalExpanded] = React.useState(isExpanded);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
  
  // Измеряем высоту контента при монтировании
  React.useEffect(() => {
    if (cardRef.current) {
      const height = cardRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, []);

  // Обрабатываем изменение состояния раскрытия
  React.useEffect(() => {
    if (isExpanded !== localExpanded) {
      setIsAnimating(true);
      setLocalExpanded(isExpanded);
      
      if (isExpanded && cardRef.current) {
        const height = cardRef.current.scrollHeight;
        onToggleExpand({
          id: cardId,
          startYear: item.startYear,
          endYear: item.endYear,
          expandedHeight: height + 24
        });
      }
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const hasMoreSkills = item.skills && item.skills.length > 3;
  
  const handleClick = React.useCallback(() => {
    if (isAnimating) return;
    
    if (hasMoreSkills) {
      // Для карточек с дополнительными навыками - переключаем раскрытие
      onToggleExpand(isExpanded ? null : {
        id: cardId,
        startYear: item.startYear,
        endYear: item.endYear,
        expandedHeight: contentHeight + 24
      });
    } else {
      // Для всех остальных карточек - имитируем раскрытие с минимальной высотой
      // для сдвига контента, если карточка перекрыта
      const expandAmount = 60; // Минимальное дополнительное пространство
      
      if (isFocused) {
        // Если уже в фокусе, снимаем фокус и убираем дополнительное пространство
        onToggleExpand(null);
        setIsFocused(false);
      } else {
        // Иначе, фокусируем и добавляем дополнительное пространство
        onToggleExpand({
          id: cardId,
          startYear: item.startYear,
          endYear: item.endYear,
          expandedHeight: expandAmount
        });
        setIsFocused(true);
      }
    }
  }, [hasMoreSkills, isAnimating, isExpanded, contentHeight, isFocused, cardId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover({ startYear: item.startYear, endYear: item.endYear, category: item.category });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  // В мобильной версии мы не используем абсолютное позиционирование
  const containerClass = isMobile 
    ? "w-full transition-all duration-500 group" 
    : "absolute w-full transition-all duration-500 group";

  return (
    <div 
      className={containerClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        zIndex: isHovered || isExpanded || isFocused ? 100 : zIndex
      }}
    >
      <div className="relative h-full">
        <div 
          ref={cardRef}
          className={`relative flex select-none flex-col justify-between rounded-xl border border-white/[0.08] bg-muted/50 backdrop-blur-xl p-3 transition-all duration-500 ease-in-out hover:bg-muted/70 ${isRight && !isMobile ? 'ml-4' : ''} ${!isRight && !isMobile ? 'mr-4' : ''} z-20 cursor-pointer`}
          onClick={handleClick}
          style={{
            marginBottom: isExpanded || isFocused ? '24px' : '0px',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease-out, box-shadow 0.3s ease-out',
            transform: !isMobile && (isHovered || isFocused || isExpanded) ? `translateX(${isRight ? '-8px' : '8px'}) scale(1.02)` : 'translateX(0) scale(1)',
            boxShadow: (isHovered || isFocused || isExpanded) ? '0 4px 12px rgba(0, 0, 0, 0.3)' : 'none'
          }}
        >
          <div className="relative flex flex-col gap-1.5 z-10">
            {/* Header section - always visible */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`relative inline-block rounded-full p-1 bg-${baseColor}-900/30 transition-colors duration-300 group-hover:bg-${baseColor}-900/50`}>
                  <div className={`h-1.5 w-1.5 rounded-full ${colorClass}`} />
                </span>
                {!isMobile && (
                  <span className={`text-xs font-medium tracking-wide text-${baseColor}-400`}>
                    {item.startYear === item.endYear ? item.startYear : `${item.startYear} - ${item.endYear}`}
                  </span>
                )}
              </div>
              {hasMoreSkills && (
                <div className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
            
            <h3 className="text-sm font-medium text-white/90 leading-tight">
              {item.title}
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              {item.description}
            </p>
            
            {/* Skills section */}
            {item.skills && item.skills.length > 0 && (
              <div className="flex flex-col gap-1 mt-1">
                {/* Visible skills */}
                <div className="flex flex-wrap gap-1">
                  {item.skills.slice(0, 3).map((skill, i) => (
                    <span 
                      key={i}
                      className={`text-[9px] px-1.5 py-0.5 rounded-full ${softSkills.has(skill.name) ? 'bg-purple-900/30 text-purple-300/80' : 'bg-blue-900/30 text-blue-300/80'} border border-white/5`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>

                {hasMoreSkills && (
                  <>
                    {/* Hidden skills container */}
                    <div 
                      className="flex flex-col gap-1 transition-all duration-500 ease-in-out origin-top"
                      style={{
                        maxHeight: isExpanded ? '1000px' : '0px',
                        opacity: isExpanded ? 1 : 0,
                        transform: isExpanded ? 'scaleY(1)' : 'scaleY(0)',
                        visibility: isExpanded ? 'visible' : 'hidden'
                      }}
                    >
                      <div className="flex flex-wrap gap-1">
                        {item.skills.slice(3).map((skill, i) => (
                          <span 
                            key={i}
                            className={`text-[9px] px-1.5 py-0.5 rounded-full ${softSkills.has(skill.name) ? 'bg-purple-900/30 text-purple-300/80' : 'bg-blue-900/30 text-blue-300/80'} border border-white/5`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* "More" text */}
                    <div 
                      className="transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: isExpanded ? '0px' : '24px',
                        opacity: isExpanded ? 0 : 1,
                        visibility: isExpanded ? 'hidden' : 'visible'
                      }}
                    >
                      <span className="text-[9px] text-white/40 flex items-center gap-0.5">
                        +{item.skills.length - 3} more
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsTable({ 
  skillWeights, 
  isSkillsExpanded, 
  setIsSkillsExpanded, 
  allSkills, 
  isMobile, 
  tableOffset 
}: { 
  skillWeights: SkillWeight[];
  isSkillsExpanded: boolean;
  setIsSkillsExpanded: (expanded: boolean) => void;
  allSkills: SkillWeight[];
  isMobile: boolean;
  tableOffset: number;
}) {
  const getVisibleSkills = (skills: SkillWeight[]) => {
    if (isSkillsExpanded) {
      const allSkillsCopy = [...allSkills];
      rankedCompetencies.forEach(comp => {
        const matchingSkill = allSkillsCopy.find(
          skill => skill.name.toLowerCase() === comp.name.toLowerCase()
        );
        if (matchingSkill) {
          matchingSkill.currentWeight = comp.weight;
        }
      });
      return allSkillsCopy.sort((a, b) => b.currentWeight - a.currentWeight);
    }
    return skillWeights.sort((a, b) => a.rank - b.rank).slice(0, isMobile ? 5 : 9);
  };

  return (
    <div 
      className="w-full bg-zinc-900/40 backdrop-blur-xl rounded-lg border border-white/[0.05] p-3"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-white/80 tracking-wide uppercase`}>
          {isSkillsExpanded ? 'Competencies' : 'Top IT related Competencies'}
        </h3>
        <button
          onClick={() => setIsSkillsExpanded(!isSkillsExpanded)}
          className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/60 hover:text-white/80 transition-colors flex items-center gap-1`}
        >
          <span>{isSkillsExpanded ? 'Show Less' : 'Show All'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${isSkillsExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div className="flex justify-between text-[8px] text-white/50 mb-2 px-1">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <span>Hard Skills</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <span>Soft Skills</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {getVisibleSkills(skillWeights).map((skill) => (
          <RankedSkillItem key={skill.name} skill={skill} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

// Функция для определения перекрытия карточек
const getOverlappingGroups = (items: TimelineItemWithSide[]) => {
  // Сортируем карточки по году начала
  const sortedItems = [...items].sort((a, b) => a.startYear - b.startYear);
  
  // Создаем массив групп перекрывающихся карточек
  const overlappingGroups: TimelineItemWithSide[][] = [];
  
  // Для каждой карточки находим или создаем группу
  sortedItems.forEach(item => {
    // Проверяем, в какую существующую группу может попасть карточка
    let foundGroup = false;
    
    for (const group of overlappingGroups) {
      // Проверяем перекрытие с любой карточкой в группе
      const overlapsWithGroup = group.some(groupItem => periodsOverlap(item, groupItem));
      
      if (overlapsWithGroup) {
        group.push(item);
        foundGroup = true;
        break;
      }
    }
    
    // Если не нашли подходящую группу, создаем новую
    if (!foundGroup) {
      overlappingGroups.push([item]);
    }
  });
  
  // Возвращаем группы
  return overlappingGroups;
};

// Функция для проверки перекрытия периодов двух карточек
const periodsOverlap = (item1: TimelineItemWithSide, item2: TimelineItemWithSide) => {
  // Периоды перекрываются, если:
  // 1. Начало одного периода находится внутри другого периода, или
  // 2. Конец одного периода находится внутри другого периода, или
  // 3. Один период полностью содержит другой период
  return (
    (item1.startYear >= item2.startYear && item1.startYear <= item2.endYear) ||
    (item1.endYear >= item2.startYear && item1.endYear <= item2.endYear) ||
    (item2.startYear >= item1.startYear && item2.startYear <= item1.endYear) ||
    (item2.endYear >= item1.startYear && item2.endYear <= item1.endYear)
  );
};

function TimelineLegend({ isMobileView }: { isMobileView?: boolean }) {
  return (
    <div className={`flex justify-center gap-4 mb-4 relative z-20 ${isMobileView ? 'mt-16' : ''}`}>
      {[
        { category: 'education', label: 'Education', color: 'bg-blue-500' },
        { category: 'work', label: 'Work Experience', color: 'bg-cyan-500' },
        { category: 'hobby', label: 'Personal', color: 'bg-purple-500' }
      ].map(({ category, label, color }) => (
        <div key={category} className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${color}`} />
          <span className="text-xs text-white/70">{label}</span>
        </div>
      ))}
    </div>
  );
}

function MobileTimeline({ 
  processedItems,
  onHover,
  expandedCard,
  setExpandedCard,
}: { 
  processedItems: (TimelineItemWithSide & { basePosition: number; verticalShift: number; height: number; })[];
  onHover: (period: ActivePeriod | null) => void;
  expandedCard: ExpandedCard | null;
  setExpandedCard: (card: ExpandedCard | null) => void;
}) {
  // Сортируем карточки по году начала для правильного порядка отображения
  const sortedItems = [...processedItems].sort((a, b) => a.startYear - b.startYear);
  
  return (
    <div className="md:hidden w-full">
      {/* Mobile Timeline Legend */}
      <TimelineLegend isMobileView={true} />
      
      {/* Центральная линия таймлайна - фиксированная, не зависит от контента */}
      <div className="relative mt-4 mb-20">
        {/* Container для линии и карточек */}
        <div className="relative">
          {/* Фиксированная центральная линия */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full z-[1]">
            {/* Основная линия */}
            <div className="w-full h-full bg-purple-500" />
            
            {/* Эффект свечения */}
            <div className="absolute inset-0 w-[9px] -left-[3px] blur-[6px] bg-purple-500/30" />
          </div>
          
          {/* Карточки */}
          <div className="relative z-[2] flex flex-col gap-12 pb-20">
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
            
            {/* Год 2025 в конце таймлайна */}
            <div className="flex justify-center mt-4 mb-8">
              <div className="relative">
                <span className="text-xs font-medium text-zinc-200 select-none px-2 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full">
                  2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopTimeline({
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
  contentHeight
}: {
  processedLeftItems: any[];
  processedRightItems: any[];
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
}) {
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
            top: '40px', // Start after the legend
            height: `${totalTimelineHeight - 40}px`, // Full height minus legend offset
          }}
        >
          {/* Main solid line */}
          <div 
            className="absolute top-0 left-0 w-full bg-purple-500"
            style={{ 
              height: `${contentHeight - 40}px` // Solid line up to content height
            }}
          />
          
          {/* Gradient fade at the bottom */}
          <div 
            className="absolute left-0 w-full bg-gradient-to-b from-purple-500 to-transparent"
            style={{ 
              top: `${contentHeight - 40}px`, // Start at content height
              height: '120px' // Height of gradient fade
            }}
          />
          
          {/* Glow effect for entire line */}
          <div 
            className="absolute top-0 w-[9px] -left-[3px] blur-[6px]"
            style={{ 
              height: `${contentHeight - 40}px`,
              background: 'rgba(168, 85, 247, 0.3)' // Solid glow up to content height
            }}
          />
          
          {/* Glow effect fade at the bottom */}
          <div 
            className="absolute w-[9px] -left-[3px] blur-[6px] bg-gradient-to-b from-purple-500/30 to-transparent"
            style={{ 
              top: `${contentHeight - 40}px`, // Start at content height
              height: '120px' // Height of gradient fade
            }}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-[1fr,auto,1fr] gap-0 relative z-[2]">
        {/* Left column - Education and Other items */}
        <div className="relative flex justify-end">
          {processedLeftItems.map((item, index) => {
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
            ...timelineData.map(item => item.startYear),
            ...timelineData.map(item => item.endYear),
            maxYear,
            2025
          ]))
            .sort((a, b) => a - b)
            .map(year => {
              let yearPos = getPositionByYear(year);
              if (expandedCard && year > expandedCard.startYear) {
                yearPos += getExpandedCardExtraHeight();
              }
              
              // Добавляем 40px к позиции 2025 года, чтобы он отображался ниже последней карточки
              if (year === 2025) {
                yearPos += 40;
              }
              
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
                    <span className="text-xs font-medium text-zinc-200 select-none px-1 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full transition-all duration-300 hover:text-white hover:bg-zinc-800/90 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      {year}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Right column - Work items */}
        <div className="relative flex justify-start">
          {processedRightItems.map((item, index) => {
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
    </div>
  );
}

export function Timeline() {
  const [skillWeights, setSkillWeights] = React.useState<SkillWeight[]>([]);
  const [discoveredSkills, setDiscoveredSkills] = React.useState<Set<string>>(new Set());
  const [isSkillsExpanded, setIsSkillsExpanded] = React.useState(false);
  const [allSkills, setAllSkills] = React.useState<SkillWeight[]>([]);
  const [tableOffset, setTableOffset] = React.useState(0);
  const [activePeriod, setActivePeriod] = React.useState<ActivePeriod | null>(null);
  const [expandedCard, setExpandedCard] = React.useState<ExpandedCard | null>(null);
  // Заменяем прямую проверку на состояние с начальным значением false
  const [isMobile, setIsMobile] = React.useState(false);
  
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const skillsTableRef = React.useRef<HTMLDivElement>(null);
  
  const maxYear = Math.max(...timelineData.map(item => item.endYear));
  const totalYears = maxYear - MIN_YEAR;
  
  // Теперь определяем isMobile только на клиенте после монтирования компонента
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Первичная проверка
    checkIsMobile();
    
    // Слушаем изменение размера окна
    window.addEventListener('resize', checkIsMobile);
    
    // Удаляем слушателя при размонтировании
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Initialize the skills with the ranked competencies and collect all unique skills
  React.useEffect(() => {
    // Initialize with ranked competencies
    setSkillWeights(rankedCompetencies.map(comp => ({
      name: comp.name,
      currentWeight: comp.weight,
      maxWeight: 10,
      rank: comp.rank,
      isActive: false,
      occurrences: 1,
      isNew: false,
      description: comp.description,
      isSoftSkill: comp.isSoftSkill,
      source: 'Ranked Competency'
    })));
    
    // Add all ranked competency names to discoveredSkills
    setDiscoveredSkills(new Set(rankedCompetencies.map(comp => comp.name)));
    
    // Collect all unique skills from timeline data
    const uniqueSkills = new Map<string, SkillWeight>();
    
    // First add ranked competencies
    rankedCompetencies.forEach(comp => {
      uniqueSkills.set(comp.name.toLowerCase(), {
        name: comp.name,
        currentWeight: comp.weight,
        maxWeight: 10,
        rank: comp.rank,
        isActive: false,
        occurrences: 1,
        isNew: false,
        description: comp.description,
        isSoftSkill: softSkills.has(comp.name),
        source: 'Ranked Competency'
      });
    });
    
    // Mapping for similar skills to consolidate them
    const skillMapping: Record<string, string> = {
      // Complex Systems Management
      'air traffic management systems': 'Complex Systems Management',
      'advanced air traffic management': 'Complex Systems Management',
      'radar control': 'Complex Systems Management',
      'flight coordination': 'Complex Systems Management',
      'route optimization': 'Complex Systems Management',
      'flight trajectory optimization': 'Complex Systems Management',
      'emergency response': 'Complex Systems Management',
      'emergency procedures': 'Complex Systems Management',
      'aviation regulations': 'Complex Systems Management',
      'radio communication': 'Complex Systems Management',
      'complex systems management': 'Complex Systems Management',
      
      // Decision-Making
      'decision-making': 'Decision-Making Under Pressure',
      'high-pressure decision-making': 'Decision-Making Under Pressure',
      'quick decision-making': 'Decision-Making Under Pressure',
      
      // Leadership
      'team leadership': 'Leadership & Team Coordination',
      'leadership': 'Leadership & Team Coordination',
      'leadership under pressure': 'Leadership & Team Coordination',
      'team coordination': 'Leadership & Team Coordination',
      'team management': 'Leadership & Team Coordination',
      'supervisory duties': 'Leadership & Team Coordination',
      'coaching': 'Leadership & Team Coordination',
      'mentoring': 'Leadership & Team Coordination',
      'teaching': 'Leadership & Team Coordination',
      'training': 'Leadership & Team Coordination',
      
      // Problem-Solving
      'problem-solving': 'Problem-Solving & Adaptability',
      'advanced problem-solving': 'Problem-Solving & Adaptability',
      'critical thinking': 'Problem-Solving & Adaptability',
      'analytical thinking': 'Problem-Solving & Adaptability',
      'adaptability': 'Problem-Solving & Adaptability',
      
      // Operational Management
      'inter-agency coordination': 'Operational Management',
      'planning': 'Operational Management',
      'time management': 'Operational Management',
      'performance evaluation': 'Operational Management',
      'disaster recovery planning': 'Operational Management',
      'business process optimization': 'Operational Management',
      'organizational management': 'Operational Management',
      'public administration': 'Operational Management',
      'government regulatory framework': 'Operational Management',
      
      // Soft Skills
      'attention to detail': 'Problem-Solving & Adaptability',
      'precision': 'Problem-Solving & Adaptability',
      'accuracy': 'Problem-Solving & Adaptability',
      'efficiency': 'Problem-Solving & Adaptability',
      'patience': 'Problem-Solving & Adaptability',
      'multi-tasking': 'Problem-Solving & Adaptability',
      'situational awareness': 'Problem-Solving & Adaptability',
      
      // Customer Service and Sales
      'customer service': 'Problem-Solving & Adaptability',
      'sales techniques': 'Problem-Solving & Adaptability',
      'cash handling': 'Problem-Solving & Adaptability',
      
      // Food Service
      'food preparation': 'Problem-Solving & Adaptability',
      
      // Security and Safety
      'surveillance': 'Problem-Solving & Adaptability',
      'security protocols': 'Problem-Solving & Adaptability',
      'conflict resolution': 'Problem-Solving & Adaptability',
      'tour guiding': 'Problem-Solving & Adaptability',
      
      // Tools and Equipment
      'hand tools': 'Problem-Solving & Adaptability',
      'power tools': 'Problem-Solving & Adaptability',
      
      // Modern Technologies
      'ai-assisted web development': 'Problem-Solving & Adaptability',
      'ai-assisted api integration': 'Problem-Solving & Adaptability',
      'ai-assisted automation': 'Problem-Solving & Adaptability',
      'blockchain & crypto strategy': 'Problem-Solving & Adaptability',
      'crypto trading': 'Problem-Solving & Adaptability',
      'ux/ui design': 'Problem-Solving & Adaptability',
      
      // 3D and Drone Operations
      '3d modeling & printing': 'Problem-Solving & Adaptability',
      'drone operation & aerial control': 'Problem-Solving & Adaptability',
      'aerial photography': 'Problem-Solving & Adaptability',
      
      // Research and Analysis
      'research': 'Problem-Solving & Adaptability',
      'data analysis': 'Problem-Solving & Adaptability',
      'academic writing': 'Problem-Solving & Adaptability',

      // Additional Skills
      'risk assessment': 'Problem-Solving & Adaptability',
      'technical problem-solving': 'Problem-Solving & Adaptability',
      'creativity': 'Problem-Solving & Adaptability'
    };
    
    // Then add all skills from timeline items with mapping
    timelineData.forEach(item => {
      if (!item.skills) return;
      
      item.skills.forEach(skill => {
        const lowerName = skill.name.toLowerCase();
        
        // Check if this skill should be mapped to a top competency
        const mappedSkill = skillMapping[lowerName] || skill.name;
        const mappedLowerName = mappedSkill.toLowerCase();
        
        // Skill descriptions mapping
        const skillDescriptions: Record<string, string> = {
          // Air Traffic Management related
          'radar control': 'Air Traffic Control Systems, Radar Data Processing, Traffic Flow Management, Safety Protocols, Emergency Response',
          'radio communication': 'Aviation Communication Standards, Radio Equipment Operation, Clear Speech Techniques, Emergency Protocols, International Standards',
          'flight coordination': 'Flight Planning, Route Management, Weather Analysis, Traffic Flow Optimization, Cross-team Communication',
          'advanced air traffic management': 'Complex Traffic Management, Strategic Planning, Resource Optimization, Safety Oversight, Performance Monitoring',
          'route optimization': 'Flight Path Analysis, Fuel Efficiency, Weather Impact Assessment, Traffic Flow Management, Risk Mitigation',
          'emergency response': 'Crisis Management, Quick Decision Making, Team Coordination, Safety Protocols, Risk Assessment',
          'aviation regulations': 'International Standards, Safety Requirements, Operational Procedures, Compliance Management, Documentation',
          'flight trajectory optimization': 'Path Planning, Performance Analysis, Weather Integration, Fuel Efficiency, Safety Parameters',
          
          // Technical Skills
          'data entry': 'Information Processing, Accuracy Verification, Database Management, Data Validation, Documentation',
          'microsoft office': 'Document Processing, Spreadsheet Analysis, Presentation Creation, Data Organization, Office Tools',
          'databases': 'Data Management, Query Processing, Information Storage, Data Integrity, System Organization',
          'technical blueprint reading': 'Technical Documentation, System Analysis, Installation Planning, Specification Review, Detail Orientation',
          'hvac installation': 'System Installation, Technical Standards, Safety Protocols, Equipment Handling, Quality Control',
          
          // Management Skills
          'business development': 'Market Analysis, Strategy Planning, Opportunity Identification, Relationship Building, Growth Management',
          'market research': 'Data Analysis, Trend Identification, Competitive Analysis, Market Insights, Strategic Planning',
          'performance evaluation': 'Assessment Methods, Feedback Delivery, Goal Setting, Progress Tracking, Development Planning',
          'disaster recovery planning': 'Risk Assessment, Contingency Planning, Emergency Protocols, Resource Management, Team Coordination',
          'business process optimization': 'Efficiency Analysis, Process Improvement, Resource Management, Quality Control, Performance Metrics',
          'organizational management': 'Resource Planning, Team Coordination, Process Development, Performance Oversight, Strategic Implementation',
          'public administration': 'Policy Implementation, Resource Management, Stakeholder Relations, Regulatory Compliance, Public Service',
          'government regulatory framework': 'Policy Analysis, Compliance Management, Regulatory Standards, Documentation, Implementation Strategies',
          
          // Soft Skills
          'attention to detail': 'Accuracy Focus, Error Prevention, Quality Control, Precise Execution, Thorough Review',
          'precision': 'Accurate Execution, Quality Focus, Detail Management, Error Prevention, Standard Compliance',
          'accuracy': 'Error Prevention, Quality Control, Detail Focus, Standard Adherence, Verification Processes',
          'efficiency': 'Resource Optimization, Time Management, Process Improvement, Performance Enhancement, Quality Maintenance',
          'patience': 'Stress Management, Consistent Performance, Long-term Focus, Emotional Control, Steady Progress',
          'multi-tasking': 'Priority Management, Task Coordination, Time Efficiency, Work Organization, Focus Distribution',
          'situational awareness': 'Environment Monitoring, Risk Assessment, Quick Response, Context Understanding, Decision Making',
          
          // Customer Service and Sales
          'customer service': 'Client Relations, Problem Resolution, Communication Skills, Service Quality, Customer Satisfaction',
          'sales techniques': 'Client Engagement, Product Knowledge, Negotiation Skills, Relationship Building, Need Assessment',
          'cash handling': 'Transaction Processing, Accuracy Management, Security Protocols, Record Keeping, Responsibility',
          
          // Food Service
          'food preparation': 'Safety Standards, Quality Control, Recipe Following, Time Management, Hygiene Maintenance',
          
          // Security and Safety
          'surveillance': 'Security Monitoring, Risk Assessment, Incident Response, Safety Protocols, Situation Analysis',
          'security protocols': 'Safety Standards, Emergency Procedures, Access Control, Risk Management, Security Maintenance',
          'conflict resolution': 'Problem Solving, Communication Skills, De-escalation Techniques, Mediation, Solution Finding',
          'tour guiding': 'Group Management, Information Delivery, Customer Service, Cultural Knowledge, Safety Oversight',
          
          // Tools and Equipment
          'hand tools': 'Equipment Operation, Safety Procedures, Maintenance Skills, Precise Usage, Quality Work',
          'power tools': 'Equipment Handling, Safety Standards, Operational Skills, Maintenance Knowledge, Precise Application',
          
          // Modern Technologies
          'ai-assisted web development': 'AI Tool Integration, Code Generation, Development Automation, UI/UX Implementation, Modern Frameworks',
          'ai-assisted api integration': 'API Design, System Integration, Automation Tools, Data Processing, Technical Documentation',
          'ai-assisted automation': 'Process Automation, Workflow Optimization, Tool Integration, Efficiency Enhancement, System Development',
          'blockchain & crypto strategy': 'Web3 Technologies, DeFi Systems, Token Economics, Smart Contracts, Blockchain Platforms',
          'crypto trading': 'Market Analysis, Risk Management, Trading Strategies, Portfolio Management, Technical Analysis',
          'ux/ui design': 'User Experience, Interface Design, Usability Testing, Design Principles, User Research',
          
          // 3D and Drone Operations
          '3d modeling & printing': '3D Design, Model Creation, Printing Techniques, Material Knowledge, Quality Control',
          'drone operation & aerial control': 'Flight Operations, Safety Protocols, Equipment Management, Aerial Photography, Navigation Skills',
          'aerial photography': 'Image Capture, Flight Planning, Equipment Operation, Photo Editing, Quality Control',
          
          // Research and Analysis
          'research': 'Data Collection, Analysis Methods, Information Verification, Report Creation, Insight Development',
          'data analysis': 'Data Processing, Pattern Recognition, Statistical Analysis, Report Generation, Insight Development',
          'academic writing': 'Research Documentation, Technical Writing, Citation Standards, Content Organization, Clear Communication',

          // Additional Skills
          'risk assessment': 'Threat Analysis, Risk Mitigation Strategies, Safety Evaluation, Impact Assessment, Preventive Measures',
          'technical problem-solving': 'System Analysis, Root Cause Identification, Solution Development, Implementation Planning, Performance Optimization',
          'creativity': 'Innovative Thinking, Design Solutions, Creative Problem-Solving, Conceptual Development, Visual Innovation',
          
          // Complex Systems Management
          'complex systems management': 'Critical Operations, Real-time Coordination, Risk Management, Emergency Response, Strategic Planning'
        };

        if (!uniqueSkills.has(mappedLowerName)) {
          // Find if this is a top competency
          const matchingComp = rankedCompetencies.find(
            comp => comp.name.toLowerCase() === mappedLowerName
          );
          
          if (matchingComp) {
            // This is already a top competency, just increment occurrences
            const existing = uniqueSkills.get(mappedLowerName)!;
            existing.occurrences++;
            if (!existing.source?.includes(item.title)) {
              existing.source = existing.source 
                ? `${existing.source}, ${item.title}`
                : item.title;
            }
          } else {
            // This is a new skill
            uniqueSkills.set(mappedLowerName, {
              name: mappedSkill,
              currentWeight: skill.weight,
              maxWeight: 10,
              rank: uniqueSkills.size + 10,
              isActive: false,
              occurrences: 1,
              isNew: false,
              description: skillDescriptions[lowerName] || skillDescriptions[mappedLowerName] || 
                         `${mappedSkill} related skills and expertise`,
              isSoftSkill: softSkills.has(mappedSkill),
              source: item.title
            });
          }
        } else {
          // Update existing skill if weight is higher
          const existing = uniqueSkills.get(mappedLowerName)!;
          if (!rankedCompetencies.some(comp => comp.name.toLowerCase() === mappedLowerName) && skill.weight > existing.currentWeight) {
            existing.currentWeight = skill.weight;
          }
          existing.occurrences++;
          if (!existing.source?.includes(item.title)) {
            existing.source = existing.source 
              ? `${existing.source}, ${item.title}`
              : item.title;
          }
        }
      });
    });
    
    setAllSkills(Array.from(uniqueSkills.values()));
  }, []);

  // Prepare timeline data
  const getTimelineItems = () => {
    // Sort by start year
    const sortedData = [...timelineData].sort((a, b) => a.startYear - b.startYear);
    
    // Divided items by side
    const leftItems: TimelineItemWithSide[] = [];
    const rightItems: TimelineItemWithSide[] = [];
    
    // Assign education to left side
    sortedData.filter(item => item.category === 'education').forEach(item => {
      leftItems.push({ ...item, side: 'left' });
    });
    
    // Assign work to right side
    sortedData.filter(item => item.category === 'work').forEach(item => {
      rightItems.push({ ...item, side: 'right' });
    });
    
    // Assign other items to balance sides
    sortedData.filter(item => item.category !== 'education' && item.category !== 'work').forEach(item => {
      if (leftItems.length <= rightItems.length) {
        leftItems.push({ ...item, side: 'left' });
      } else {
        rightItems.push({ ...item, side: 'right' });
      }
    });
    
    return { leftItems, rightItems };
  };
  
  const { leftItems, rightItems } = getTimelineItems();
  
  // Calculate extra height for expanded card
  const getExpandedCardExtraHeight = () => {
    if (!expandedCard) return 0;
    return expandedCard.expandedHeight;
  };
  
  // Get vertical position by year
  const getPositionByYear = (year: number) => {
    return getYearPosition(year, MIN_YEAR, maxYear, totalYears);
  };
  
  // Calculate adjusted position for items, taking into account expanded cards
  const getAdjustedPosition = (item: TimelineItemWithSide) => {
    const basePosition = getPositionByYear(item.startYear);
    
    // If there's an expanded card before this one, adjust position
    if (expandedCard && item.startYear > expandedCard.startYear) {
      return basePosition + getExpandedCardExtraHeight();
    }
    
    return basePosition;
  };
  
  // Calculate card height
  const getCardHeight = (item: TimelineItemWithSide) => {
    if (item.startYear === item.endYear) {
      return 80; // Single-year items height
    }
    
    // Multi-year items get height based on years span
    const startPos = getPositionByYear(item.startYear);
    const endPos = getPositionByYear(item.endYear);
    const baseHeight = endPos - startPos;
    
    // If this is the expanded card, add extra height
    const isThisCardExpanded = expandedCard && 
      expandedCard.id === `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
      
    if (isThisCardExpanded) {
      return baseHeight + expandedCard.expandedHeight;
    }
    
    return baseHeight;
  };
  
  // Find overlapping items in a column and adjust
  const processTimelineColumn = (items: TimelineItemWithSide[]) => {
    if (items.length === 0) return [];
    
    // Sort by start year
    const sortedItems = [...items].sort((a, b) => a.startYear - b.startYear);
    
    // Track vertical positions to avoid overlaps
    type VerticalRanges = Array<{start: number, end: number, index: number}>;
    const verticalRanges: VerticalRanges = [];
    
    // Calculate positions and shifts
    const processedItems = sortedItems.map((item, idx) => {
      const basePosition = getAdjustedPosition(item);
      const height = getCardHeight(item);
      const end = basePosition + height;
      
      // Find overlapping ranges
      const overlaps = verticalRanges.filter(range => 
        (basePosition >= range.start && basePosition < range.end) || 
        (end > range.start && end <= range.end) ||
        (basePosition <= range.start && end >= range.end)
      );
      
      // Calculate the vertical shift
      let verticalShift = 0;
      if (overlaps.length > 0) {
        verticalShift = 80 * overlaps.length;
      }
      
      // Update vertical ranges
      verticalRanges.push({
        start: basePosition + verticalShift,
        end: basePosition + height + verticalShift,
        index: idx
      });
      
      return {
        ...item,
        basePosition,
        verticalShift,
        height
      };
    });
    
    return processedItems;
  };
  
  // Process each column
  const processedLeftItems = processTimelineColumn(leftItems);
  const processedRightItems = processTimelineColumn(rightItems);
  
  // Calculate the total timeline height
  const totalTimelineHeight = Math.max(
    totalYears * YEAR_HEIGHT + getExpandedCardExtraHeight(),
    ...[...processedLeftItems, ...processedRightItems].map(item => 
      item.basePosition + item.verticalShift + item.height
    )
  ) + 160; // Add extra space for gradient fade at the bottom + space for 2025 year

  // Calculate the actual content height (without extra space)
  const contentHeight = Math.max(
    totalYears * YEAR_HEIGHT + getExpandedCardExtraHeight(),
    ...[...processedLeftItems, ...processedRightItems].map(item => 
      item.basePosition + item.verticalShift + item.height
    )
  ) + 40; // Add space for 2025 year

  // Все карточки для мобильной версии (объединяем левые и правые и сортируем по году)
  const allItems = [...processedLeftItems, ...processedRightItems].sort((a, b) => a.startYear - b.startYear);

  return (
    <div className="w-full" ref={timelineRef}>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {/* Left column - Skills table */}
        <div className="md:col-span-1">
          <div className="sticky top-20 space-y-4" ref={skillsTableRef}>
            <SkillsTable
              skillWeights={skillWeights}
              isSkillsExpanded={isSkillsExpanded}
              setIsSkillsExpanded={setIsSkillsExpanded}
              allSkills={allSkills}
              isMobile={isMobile}
              tableOffset={tableOffset}
            />
          </div>
        </div>

        {/* Timeline content */}
        <div 
          className="md:col-span-2 relative" 
          style={{ 
            minHeight: isMobile ? 'auto' : `${totalTimelineHeight}px`, // Для мобильной версии auto высота
            transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Mobile Timeline */}
          <MobileTimeline 
            processedItems={allItems}
            onHover={setActivePeriod}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />

          {/* Desktop Timeline */}
          <DesktopTimeline
            processedLeftItems={processedLeftItems}
            processedRightItems={processedRightItems}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
            setActivePeriod={setActivePeriod}
            getPositionByYear={getPositionByYear}
            MIN_YEAR={MIN_YEAR}
            maxYear={maxYear}
            timelineData={timelineData}
            getExpandedCardExtraHeight={getExpandedCardExtraHeight}
            totalTimelineHeight={totalTimelineHeight}
            contentHeight={contentHeight}
          />
        </div>
      </div>
    </div>
  );
}