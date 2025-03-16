import { TimelineItem, TimelineItemWithSide } from './types';

// Главные категории навыков (метагруппы)
export const mainSkillCategories = {
  'Air Traffic Control': [
    'Air Traffic Management', 'Flight Operations', 'Aviation Safety & Security'
  ],
  'Leadership & Management': [
    'Team Leadership', 'Organizational Management', 'Training & Development'
  ],
  'Technical Skills': [
    'Technical Operations', 'Data Management', 'Administrative Skills'
  ],
  'Soft Skills': [
    'Decision Making', 'Communication', 'Problem Solving',
    'Stress Management', 'Team Coordination'
  ]
};

// Мягкие навыки
export const softSkills = new Set([
  'Decision-making under pressure',
  'Quick decision-making',
  'High-pressure decision-making',
  'Decision-making',
  'Leadership',
  'Team leadership',
  'Communication',
  'Stakeholder communication',
  'Radio communication',
  'Problem-solving',
  'Advanced problem-solving',
  'Crisis management',
  'Stress management',
  'Stress resilience',
  'Team coordination',
  'Inter-agency coordination',
  'Analytical thinking',
  'Attention to detail',
  'Precision',
  'Accuracy',
  'Planning',
  'Time planning',
  'Time management',
  'Task control',
  'Efficiency',
  'Multi-tasking',
  'Teamwork',
  'Patience',
  'Conflict resolution',
  'Negotiation',
  'Training',
  'Teaching',
  'Mentoring',
  'Coaching'
]);

// Технические группы
export const techSkillGroups = {
  'Air Traffic Management': [
    'Air traffic management systems',
    'Radar control',
    'Flight coordination',
    'Complex traffic management',
    'Advanced air traffic management',
    'Large-scale coordination',
    'Situational awareness'
  ],
  'Flight Operations': [
    'Flight trajectory optimization',
    'Route optimization',
    'Operational procedures development',
    'Emergency response'
  ],
  'Aviation Safety & Security': [
    'Risk assessment',
    'Aviation regulations',
    'Emergency procedures',
    'Security protocols',
    'Surveillance',
    'Disaster recovery planning'
  ],
  'Technical Operations': [
    'HVAC installation',
    'Technical blueprint reading',
    'Hand tools',
    'Power tools'
  ],
  'Data Management': [
    'Data entry',
    'Microsoft Office',
    'Databases',
    'Data analysis'
  ],
  'Administrative Skills': [
    'Public administration',
    'Organizational management',
    'Government regulatory framework',
    'Business development',
    'Market research',
    'Cash handling',
    'Customer service',
    'Sales techniques',
    'Food preparation',
    'Tour guiding',
    'Work instructions development',
    'Work instructions analysis',
    'Business process optimization'
  ]
};

// Маппинг навыков
export const skillsMapping: Record<string, string> = {
  // Air Traffic Management
  'Radar control': 'Air Traffic Management',
  'Flight coordination': 'Air Traffic Management',
  'Complex traffic management': 'Air Traffic Management',
  'Advanced air traffic management': 'Air Traffic Management',
  'Large-scale coordination': 'Air Traffic Management',
  'Situational awareness': 'Air Traffic Management',
  
  // Flight Operations
  'Flight trajectory optimization': 'Flight Operations',
  'Route optimization': 'Flight Operations',
  'Operational procedures development': 'Flight Operations',
  'Emergency response': 'Flight Operations',
  
  // Aviation Safety
  'Risk assessment': 'Aviation Safety & Security',
  'Aviation regulations': 'Aviation Safety & Security',
  'Emergency procedures': 'Aviation Safety & Security',
  'Security protocols': 'Aviation Safety & Security',
  'Surveillance': 'Aviation Safety & Security',
  'Disaster recovery planning': 'Aviation Safety & Security',
  
  // Leadership & Management
  'Team leadership': 'Leadership',
  'Leadership': 'Leadership',
  'Team management': 'Leadership',
  'Supervisory duties': 'Leadership',
  'Training': 'Leadership',
  'Teaching': 'Leadership',
  'Mentoring': 'Leadership',
  'Coaching': 'Leadership',
  
  // Communication
  'Communication': 'Communication Skills',
  'Radio communication': 'Communication Skills',
  'Stakeholder communication': 'Communication Skills',
  
  // Decision Making
  'Decision-making under pressure': 'Decision Making',
  'Quick decision-making': 'Decision Making',
  'High-pressure decision-making': 'Decision Making',
  'Decision-making': 'Decision Making',
  
  // Problem Solving
  'Problem-solving': 'Problem Solving',
  'Advanced problem-solving': 'Problem Solving',
  
  // Team Coordination
  'Team coordination': 'Team Coordination',
  'Inter-agency coordination': 'Team Coordination',
  'Teamwork': 'Team Coordination',
  
  // Task Management
  'Task control': 'Task Management',
  'Time management': 'Task Management',
  'Time planning': 'Task Management',
  'Planning': 'Task Management',
  'Multi-tasking': 'Task Management',
  'Efficiency': 'Task Management',
  
  // Technical Skills
  'HVAC installation': 'Technical Operations',
  'Technical blueprint reading': 'Technical Operations',
  'Hand tools': 'Technical Operations',
  'Power tools': 'Technical Operations',
  
  // Data Skills
  'Data entry': 'Data Management',
  'Microsoft Office': 'Data Management',
  'Databases': 'Data Management',
  'Data analysis': 'Data Management',
  
  // Administrative
  'Public administration': 'Administrative Skills',
  'Organizational management': 'Administrative Skills',
  'Government regulatory framework': 'Administrative Skills',
  'Business development': 'Administrative Skills',
  'Market research': 'Administrative Skills',
  'Cash handling': 'Administrative Skills',
  'Customer service': 'Administrative Skills',
  'Sales techniques': 'Administrative Skills',
  'Food preparation': 'Administrative Skills',
  'Tour guiding': 'Administrative Skills',
  'Work instructions development': 'Administrative Skills',
  'Work instructions analysis': 'Administrative Skills',
  'Business process optimization': 'Administrative Skills'
};

// Функция для получения группы навыка
export const getSkillGroup = (skillName: string, depth = 0): string | null => {
  // Prevent infinite recursion
  if (depth > 2) return null;
  
  // Сначала проверяем, есть ли навык в softSkills
  if (softSkills.has(skillName)) {
    return 'Soft Skills';
  }
  
  // Затем проверяем все группы технических навыков
  for (const [groupName, skills] of Object.entries(techSkillGroups)) {
    if (skills.includes(skillName)) {
      return groupName;
    }
  }
  
  // Если группа не найдена, проверяем маппинг
  const mappedSkill = skillsMapping[skillName];
  if (mappedSkill && mappedSkill !== skillName) {
    return getSkillGroup(mappedSkill, depth + 1);
  }
  
  return null;
};

// Функция для получения дополнительных навыков в той же группе
export const getRelatedSkills = (skillName: string): string[] => {
  const group = getSkillGroup(skillName);
  if (!group) return [];
  
  if (group === 'Soft Skills') {
    return Array.from(softSkills).filter(skill => skill !== skillName);
  } else {
    return techSkillGroups[group as keyof typeof techSkillGroups]?.filter(skill => skill !== skillName) || [];
  }
};

// Функция для нормализации имени навыка
export const normalizeSkillName = (name: string): string => {
  return skillsMapping[name] || name;
};

// Константы для временной шкалы
export const TIMELINE_START = 1984;
export const TIMELINE_MIDDLE = 2001;
export const TIMELINE_END = 2025;
export const GRADIENT_SPACE = 150; // Пространство для градиента после последнего года

// Константы для расчета позиций
export const YEAR_MARKERS = [1984, 1994, 2001, 2004, 2009, 2014, 2019, 2025]; // Уменьшаем количество дат между 1984-2001
const FIRST_PERIOD_HEIGHT = 250; // Высота для периода 1984-2001
const SECOND_PERIOD_HEIGHT = 1200; // Увеличиваем высоту для периода 2001-2025
const MIN_CARD_GAP = 300; // Сильно увеличиваем минимальный отступ между карточками
const CARD_HEIGHT = 200; // Высота карточки

// Функция для получения позиции года на таймлайне
export const getYearPosition = (year: number, minYear: number, maxYear: number, totalYears: number): number => {
  // Фиксированные годы и их позиции для точного размещения
  const yearPositions: Record<number, number> = {
    1984: 0,
    2001: FIRST_PERIOD_HEIGHT,
    2004: FIRST_PERIOD_HEIGHT + 200,
    2009: FIRST_PERIOD_HEIGHT + 450,
    2014: FIRST_PERIOD_HEIGHT + 700,
    2019: FIRST_PERIOD_HEIGHT + 950,
    2025: FIRST_PERIOD_HEIGHT + SECOND_PERIOD_HEIGHT
  };
  
  // Если год точно соответствует одному из фиксированных, возвращаем его позицию
  if (yearPositions[year] !== undefined) {
    return yearPositions[year];
  }
  
  // Для промежуточных лет используем линейную интерполяцию между ближайшими фиксированными годами
  const years = Object.keys(yearPositions).map(Number).sort((a, b) => a - b);
  
  // Если год меньше минимального или больше максимального
  if (year < years[0]) {
    return yearPositions[years[0]];
  }
  if (year > years[years.length - 1]) {
    return yearPositions[years[years.length - 1]];
  }
  
  // Находим ближайшие годы для интерполяции
  let prevYear = years[0];
  let nextYear = years[years.length - 1];
  
  for (let i = 0; i < years.length - 1; i++) {
    if (years[i] <= year && year <= years[i + 1]) {
      prevYear = years[i];
      nextYear = years[i + 1];
      break;
    }
  }
  
  // Линейная интерполяция между ближайшими годами
  const ratio = (year - prevYear) / (nextYear - prevYear);
  return yearPositions[prevYear] + ratio * (yearPositions[nextYear] - yearPositions[prevYear]);
};

// Функция для проверки перекрытия периодов
export const periodsOverlap = (item1: TimelineItemWithSide, item2: TimelineItemWithSide) => {
  // Получаем позиции начала для обоих элементов
  const item1Start = getYearPosition(item1.startYear, TIMELINE_START, TIMELINE_END, 41);
  const item2Start = getYearPosition(item2.startYear, TIMELINE_START, TIMELINE_END, 41);
  
  // Проверяем перекрытие с учетом минимального отступа
  return Math.abs(item1Start - item2Start) < MIN_CARD_GAP;
};

// Функция для определения перекрытия карточек
export const getOverlappingGroups = (items: TimelineItemWithSide[]) => {
  const sortedItems = [...items].sort((a, b) => {
    // Сортируем строго по позиции года на таймлайне
    return getYearPosition(a.startYear, TIMELINE_START, TIMELINE_END, 41) - 
           getYearPosition(b.startYear, TIMELINE_START, TIMELINE_END, 41);
  });
  
  const overlappingGroups: TimelineItemWithSide[][] = [];
  
  // Создаем группы карточек с большими промежутками
  let currentPosition = -MIN_CARD_GAP;
  let currentGroup: TimelineItemWithSide[] = [];
  
  for (const item of sortedItems) {
    const itemPosition = getYearPosition(item.startYear, TIMELINE_START, TIMELINE_END, 41);
    
    // Если карточка далеко от предыдущей группы, начинаем новую группу
    if (itemPosition >= currentPosition + MIN_CARD_GAP) {
      if (currentGroup.length > 0) {
        overlappingGroups.push(currentGroup);
        currentGroup = [];
      }
      currentPosition = itemPosition;
    }
    
    currentGroup.push(item);
    
    // Если это последняя карточка
    if (item === sortedItems[sortedItems.length - 1] && currentGroup.length > 0) {
      overlappingGroups.push(currentGroup);
    }
  }
  
  return overlappingGroups;
};

// Функция для получения смещения карточки по горизонтали
export const getCardOffset = (item: TimelineItemWithSide, groupIndex: number, totalGroups: number) => {
  // Значительно увеличиваем базовое смещение для карточек
  const baseOffset = item.side === 'left' ? -80 : 80;
  return baseOffset * (groupIndex + 1);
};

// Функция для получения цвета категории
export const getCategoryColor = (category: TimelineItem['category']) => {
  switch (category) {
    case 'education':
      return 'bg-blue-500';
    case 'work':
      return 'bg-cyan-500';
    case 'personal':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

// Функция для получения цвета навыка
export const getSkillColor = (isSoftSkill: boolean) => {
  return isSoftSkill
    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
    : 'bg-gradient-to-r from-blue-500 to-cyan-500';
};

// IT-related skills для начального отображения
export const topITSkills = [
  {
    name: 'Decision-making under pressure',
    weight: 10,
    description: 'Critical decision making in high-stakes environments with strategic thinking and quick response',
    type: 'soft'
  },
  {
    name: 'Task & Resource Management',
    weight: 10,
    description: 'Advanced task control, resource allocation, and operational efficiency',
    type: 'soft'
  },
  {
    name: 'Technical Documentation',
    weight: 9,
    description: 'Development and analysis of technical documentation, work instructions, and operational procedures with focus on clarity and compliance',
    type: 'hard'
  },
  {
    name: 'Crisis Management',
    weight: 9,
    description: 'Emergency response coordination and critical situation handling',
    type: 'soft'
  },
  {
    name: 'Problem-Solving',
    weight: 9,
    description: 'Complex technical and operational problem resolution with analytical approach',
    type: 'soft'
  },
  {
    name: 'Operational Procedures',
    weight: 9,
    description: 'Development, optimization and control of operational procedures and work instructions',
    type: 'hard'
  },
  {
    name: 'UX/UI Design',
    weight: 8,
    description: 'User experience design, wireframing, prototyping and interface optimization',
    type: 'hard'
  },
  {
    name: 'Stakeholder Communication',
    weight: 9,
    description: 'Effective communication with diverse stakeholders and clear technical documentation',
    type: 'soft'
  },
  {
    name: 'Strategic Planning',
    weight: 8,
    description: 'Strategic planning, process optimization and resource allocation',
    type: 'soft'
  }
];

// Топ компетенции для начального отображения
export const topCompetencies = [
  {
    name: 'Air Traffic Management',
    weight: 10,
    description: 'Expert knowledge of air traffic control systems, radar control, and complex traffic coordination',
    type: 'hard'
  },
  {
    name: 'Flight Operations',
    weight: 9,
    description: 'Route optimization, flight procedures and operational management',
    type: 'hard'
  },
  {
    name: 'Aviation Safety & Security',
    weight: 9,
    description: 'Risk assessment, emergency protocols and aviation regulations',
    type: 'hard'
  },
  {
    name: 'Crisis management',
    weight: 9,
    description: 'Management of critical situations and emergency response in high-stakes environments',
    type: 'soft'
  },
  {
    name: 'Leadership',
    weight: 9,
    description: 'Team leadership, mentoring and performance management',
    type: 'soft'
  },
  {
    name: 'Analytical thinking',
    weight: 8,
    description: 'Complex problem analysis and strategic decision making',
    type: 'soft'
  },
  {
    name: 'Stress resilience',
    weight: 10,
    description: 'High performance under pressure and stress management',
    type: 'soft'
  },
  {
    name: 'Communication Skills',
    weight: 9,
    description: 'Clear technical and stakeholder communication across channels',
    type: 'soft'
  }
];

// Полный список компетенций с описаниями и весами
export const fullCompetencies = [
  // Высший приоритет (10)
  {
    name: 'Decision-making under pressure',
    weight: 10,
    description: 'Critical decision making in high-stakes environments with strategic thinking',
    type: 'soft'
  },
  {
    name: 'Task & Resource Management',
    weight: 10,
    description: 'Advanced task control and resource allocation',
    type: 'soft'
  },
  {
    name: 'Team Leadership',
    weight: 10,
    description: 'Leading and managing high-performance teams',
    type: 'soft'
  },
  {
    name: 'Stress Resilience',
    weight: 10,
    description: 'High performance and stability under pressure',
    type: 'soft'
  },

  // Приоритет 9
  {
    name: 'Air Traffic Management',
    weight: 9,
    description: 'Complex air traffic control and coordination',
    type: 'hard'
  },
  {
    name: 'Flight Operations',
    weight: 9,
    description: 'Flight procedures and operational management',
    type: 'hard'
  },
  {
    name: 'Crisis Management',
    weight: 9,
    description: 'Emergency response and critical situation handling',
    type: 'soft'
  },
  {
    name: 'Problem-Solving',
    weight: 9,
    description: 'Complex technical and operational problem resolution',
    type: 'soft'
  },
  {
    name: 'Stakeholder Communication',
    weight: 9,
    description: 'Effective communication with diverse stakeholders',
    type: 'soft'
  },
  {
    name: 'Operational Procedures',
    weight: 9,
    description: 'Development and optimization of operational procedures',
    type: 'hard'
  },
  {
    name: 'Team Coordination',
    weight: 9,
    description: 'Effective team coordination and collaboration',
    type: 'soft'
  },
  {
    name: 'Attention to Detail',
    weight: 9,
    description: 'High precision and attention to critical details',
    type: 'soft'
  },

  // Приоритет 8
  {
    name: 'Aviation Safety & Security',
    weight: 8,
    description: 'Risk assessment and aviation regulations compliance',
    type: 'hard'
  },
  {
    name: 'Strategic Planning',
    weight: 8,
    description: 'Strategic planning and process optimization',
    type: 'soft'
  },
  {
    name: 'Analytical Thinking',
    weight: 8,
    description: 'Complex analysis and systematic problem assessment',
    type: 'soft'
  },
  {
    name: 'Training & Development',
    weight: 8,
    description: 'Training program development and knowledge transfer',
    type: 'soft'
  },
  {
    name: 'UX/UI Design',
    weight: 8,
    description: 'User experience design and interface optimization',
    type: 'hard'
  },
  {
    name: 'Blockchain & Web3',
    weight: 8,
    description: 'Web3 technologies, NFT ecosystems and crypto markets',
    type: 'hard'
  },
  {
    name: '3D Modeling & Design',
    weight: 8,
    description: 'Digital 3D modeling, CAD software and prototype development',
    type: 'hard'
  },
  {
    name: 'Conflict Resolution',
    weight: 8,
    description: 'Resolution of conflicts and effective negotiation',
    type: 'soft'
  },

  // Приоритет 7
  {
    name: 'Business Development',
    weight: 7,
    description: 'Business growth and market research',
    type: 'hard'
  },
  {
    name: 'Public Administration',
    weight: 7,
    description: 'Public sector administration and regulations',
    type: 'hard'
  },
  {
    name: 'Data Analysis',
    weight: 7,
    description: 'Data analysis and interpretation',
    type: 'hard'
  },
  {
    name: 'Technical Documentation',
    weight: 7,
    description: 'Technical documentation and blueprint interpretation',
    type: 'hard'
  },
  {
    name: 'Microsoft Office',
    weight: 7,
    description: 'Microsoft Office suite proficiency',
    type: 'hard'
  },

  // Приоритет 6
  {
    name: 'Database Management',
    weight: 6,
    description: 'Database usage and data management',
    type: 'hard'
  },
  {
    name: 'Technical Operations',
    weight: 6,
    description: 'Technical equipment operation and maintenance',
    type: 'hard'
  },
  {
    name: 'Security Protocols',
    weight: 6,
    description: 'Security procedures and surveillance',
    type: 'hard'
  },

  // Приоритет 5
  {
    name: 'Customer Service',
    weight: 5,
    description: 'Customer service and sales support',
    type: 'soft'
  }
];

// Экспортируем rankedCompetencies как алиас для fullCompetencies для обратной совместимости
export const rankedCompetencies = fullCompetencies;