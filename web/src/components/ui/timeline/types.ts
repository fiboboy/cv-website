export interface TimelineItem {
  startYear: number;
  endYear: number;
  title: string;
  description: string;
  category: 'education' | 'work' | 'personal';
  skills?: Array<{
    name: string;
    weight: number; // Weight from 1-10 indicating expertise level
  }>;
}

export interface TimelineItemWithSide extends TimelineItem {
  side: 'left' | 'right';
  positioningStartYear?: number; // Optional property for optimized positioning
}

export interface SkillWeight {
  name: string;
  currentWeight: number;
  maxWeight: number;
  description?: string;
  isSoftSkill: boolean;
  rank?: number;
  isActive?: boolean;
  occurrences?: number;
  isNew?: boolean;
}

export interface Competency {
  name: string;
  weight: number;
  description: string;
  type: 'hard' | 'soft';
}

export interface ExpandedCard {
  id: string;
  startYear: number;
  endYear: number;
  expandedHeight: number;
  side: 'left' | 'right';
}

export interface ActivePeriod {
  startYear: number;
  endYear: number;
  category: TimelineItem['category'];
}

export interface ProcessedTimelineItem extends TimelineItemWithSide {
  basePosition: number;
  verticalShift: number;
  height: number;
  originalItems?: ProcessedTimelineItem[]; // Added for grouped cards
  stackIndex?: number;
  stackSize?: number;
}
