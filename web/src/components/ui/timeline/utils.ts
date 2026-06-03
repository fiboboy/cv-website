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
const FIRST_PERIOD_HEIGHT = 200; // Уменьшаем высоту для первого периода
const SECOND_PERIOD_HEIGHT = 1600; // Увеличиваем высоту для основного периода
const MIN_CARD_GAP = 250; // Оптимальный отступ между карточками
const CARD_HEIGHT = 180; // Немного уменьшаем высоту карточки

// Функция для получения позиции года на таймлайне
export const getYearPosition = (year: number, minYear: number, maxYear: number, totalYears: number): number => {
  // Фиксированные годы и их позиции для точного размещения
  const yearPositions: Record<number, number> = {
    1984: 0,
    2001: FIRST_PERIOD_HEIGHT,
    2004: FIRST_PERIOD_HEIGHT + 250,
    2009: FIRST_PERIOD_HEIGHT + 500,
    2014: FIRST_PERIOD_HEIGHT + 800,
    2019: FIRST_PERIOD_HEIGHT + 1100,
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
  
  // Линейная интерполяция
  const progress = (year - prevYear) / (nextYear - prevYear);
  return yearPositions[prevYear] + (yearPositions[nextYear] - yearPositions[prevYear]) * progress;
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
    name: 'Air Traffic Management',
    weight: 10,
    description: 'Air traffic control, radio communication, situational awareness, and real-time coordination',
    type: 'hard'
  },
  {
    name: 'Operations Supervision',
    weight: 10,
    description: 'Shift readiness control, briefings, work allocation, reporting, and continuity support',
    type: 'hard'
  },
  {
    name: 'AI Data Review & QA',
    weight: 9,
    description: 'Transcript review, quality control, recurring-error detection, and guideline-based QA work',
    type: 'hard'
  },
  {
    name: 'Transcription',
    weight: 9,
    description: 'Audio-focused transcription work including specialized radio-communications datasets',
    type: 'hard'
  },
  {
    name: 'EN-RU Translation',
    weight: 8,
    description: 'English-to-Russian translation and localization support for remote workflows',
    type: 'hard'
  },
  {
    name: 'Incident Handling',
    weight: 10,
    description: 'Emergency, escalation, diversion, and abnormal-situation coordination under pressure',
    type: 'soft'
  },
  {
    name: 'Structured Decision-Making',
    weight: 10,
    description: 'Calm judgment in time-sensitive, safety-critical environments',
    type: 'soft'
  },
  {
    name: 'Stakeholder Communication',
    weight: 9,
    description: 'Clear communication across teams, supervisors, and external operational parties',
    type: 'soft'
  },
  {
    name: 'Documentation & Reporting',
    weight: 9,
    description: 'Incident documentation, incoming-document review, reporting, and standards-based follow-through',
    type: 'hard'
  },
  {
    name: 'Training & Mentoring',
    weight: 8,
    description: 'Mentoring junior specialists, knowledge checks, training coordination, and admissions support',
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
    weight: 10,
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
  {
    name: 'Air Traffic Management',
    weight: 10,
    description: 'Air traffic control, radio communication, situational awareness, and complex coordination',
    type: 'hard'
  },
  {
    name: 'Operations Supervision',
    weight: 10,
    description: 'Shift readiness control, staff briefings, allocation, and continuity management',
    type: 'hard'
  },
  {
    name: 'Incident Handling',
    weight: 10,
    description: 'Emergency response, abnormal-situation handling, and escalation coordination',
    type: 'soft'
  },
  {
    name: 'Structured Decision-Making',
    weight: 10,
    description: 'Reliable judgment in high-pressure environments with strong procedural discipline',
    type: 'soft'
  },
  {
    name: 'Stress Resilience',
    weight: 10,
    description: 'Stable performance and focus under pressure',
    type: 'soft'
  },
  {
    name: 'AI Data Review & QA',
    weight: 9,
    description: 'Transcript review, QA checks, error detection, and quality-focused remote execution',
    type: 'hard'
  },
  {
    name: 'Transcription',
    weight: 9,
    description: 'Audio-centric transcription work including specialized radio-communications content',
    type: 'hard'
  },
  {
    name: 'Documentation & Reporting',
    weight: 9,
    description: 'Incident records, reporting, document review, and standards-based follow-through',
    type: 'hard'
  },
  {
    name: 'Stakeholder Communication',
    weight: 9,
    description: 'Clear communication across teams, supervisors, and external parties',
    type: 'soft'
  },
  {
    name: 'Operational Coordination',
    weight: 9,
    description: 'Briefings, handoffs, continuity support, work allocation, and pre-shift control',
    type: 'hard'
  },
  {
    name: 'EN-RU Translation',
    weight: 8,
    description: 'English-to-Russian translation and localization support',
    type: 'hard'
  },
  {
    name: 'Training & Mentoring',
    weight: 8,
    description: 'Mentoring, knowledge checks, training support, and junior-specialist development',
    type: 'soft'
  },
  {
    name: 'Supplier Coordination',
    weight: 7,
    description: 'Supplier sourcing, purchasing coordination, and delivery arrangements from side-business experience',
    type: 'hard'
  },
  {
    name: 'Analytical Thinking',
    weight: 7,
    description: 'Structured analysis, pattern recognition, and research-informed thinking',
    type: 'soft'
  },
  {
    name: 'Research & Reporting',
    weight: 6,
    description: 'Applied research exposure including internal study work on workplace demotivation factors',
    type: 'hard'
  },
  {
    name: 'UX/UI Theory',
    weight: 5,
    description: 'Theoretical UX/UI background used carefully as supporting knowledge, not as core identity',
    type: 'hard'
  }
];

// Экспортируем rankedCompetencies как алиас для fullCompetencies для обратной совместимости
export const rankedCompetencies = fullCompetencies;
