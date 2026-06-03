'use client';

import React from 'react';
import { SkillsTable } from './timeline/SkillsTable';
import { MobileTimeline } from './timeline/MobileTimeline';
import { DesktopTimeline } from './timeline/DesktopTimeline';
import { ActivePeriod, ExpandedCard, ProcessedTimelineItem, SkillWeight, TimelineItem, TimelineItemWithSide } from './timeline/types';
import { getYearPosition, getOverlappingGroups, softSkills, rankedCompetencies, skillsMapping } from './timeline/utils';

// Функция для консолидации похожих скиллов
const consolidateSkills = (items: TimelineItem[]): TimelineItem[] => {
  return items.map(item => {
    if (!item.skills || item.skills.length === 0) return item;
    
    // Объединяем похожие навыки, складывая их веса
    const consolidatedSkillsMap = new Map<string, { name: string; weight: number }>();
    
    item.skills.forEach(skill => {
      // Проверяем, есть ли маппинг для этого навыка
      const consolidatedName = skillsMapping[skill.name] || skill.name;
      
      if (consolidatedSkillsMap.has(consolidatedName)) {
        // Если навык уже есть, берем максимальный вес
        const existingSkill = consolidatedSkillsMap.get(consolidatedName)!;
        existingSkill.weight = Math.max(existingSkill.weight, skill.weight);
      } else {
        // Если навыка еще нет, добавляем его
        consolidatedSkillsMap.set(consolidatedName, { 
          name: consolidatedName, 
          weight: skill.weight 
        });
      }
    });
    
    // Преобразуем Map обратно в массив
    const consolidatedSkills = Array.from(consolidatedSkillsMap.values());
    
    // Сортируем навыки по весу (от большего к меньшему)
    consolidatedSkills.sort((a, b) => b.weight - a.weight);
    
    return {
      ...item,
      skills: consolidatedSkills
    };
  });
};

// Timeline content based on verified CV materials only.
const rawTimelineData: TimelineItem[] = [
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
    title: "Bachelor's degree in State and Municipal Administration",
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
    title: "Diploma in Enterprise Management",
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
  
  {
    startYear: 2006,
    endYear: 2016,
    title: "Air Traffic Control Officer",
    description: "State ATM Corporation, Magadan, Russia",
    category: 'work',
    skills: [
      { name: 'Air traffic management systems', weight: 9 },
      { name: 'Radio communication', weight: 9 },
      { name: 'Situational awareness', weight: 9 },
      { name: 'Decision-making under pressure', weight: 10 },
      { name: 'Operational accuracy', weight: 9 }
    ]
  },
  {
    startYear: 2016,
    endYear: 2022,
    title: "Flight Supervisor / Operations Supervisor",
    description: "State ATM Corporation, Magadan, Russia",
    category: 'work',
    skills: [
      { name: 'Team leadership', weight: 10 },
      { name: 'Inter-agency coordination', weight: 9 },
      { name: 'High-pressure decision-making', weight: 10 },
      { name: 'Stakeholder communication', weight: 9 },
      { name: 'Operational reporting', weight: 9 },
      { name: 'Training coordination', weight: 8 },
      { name: 'Incident handling', weight: 10 }
    ]
  },
  {
    startYear: 2015,
    endYear: 2017,
    title: "Individual Entrepreneur",
    description: "Small handmade jewelry store run alongside main employment",
    category: 'work',
    skills: [
      { name: 'Supplier coordination', weight: 8 },
      { name: 'Negotiation', weight: 8 },
      { name: 'Small-team oversight', weight: 7 },
      { name: 'Tax reporting', weight: 7 }
    ]
  },
  {
    startYear: 2025,
    endYear: 2026,
    title: "AI Data Labeling, Review, QA, and Translation",
    description: "Alignerr.com, remote",
    category: 'work',
    skills: [
      { name: 'Data labeling', weight: 8 },
      { name: 'Transcription', weight: 9 },
      { name: 'Transcript review', weight: 9 },
      { name: 'Quality control', weight: 9 },
      { name: 'English to Russian translation', weight: 8 }
    ]
  },

  {
    startYear: 2019,
    endYear: 2019,
    title: "Emergency landing coordination: CCA983",
    description: "Organized an unplanned landing and all required coordination while acting as duty manager",
    category: 'personal',
    skills: [
      { name: 'Flight operation crisis management', weight: 10 },
      { name: 'Leadership under pressure', weight: 10 },
      { name: 'Emergency coordination', weight: 10 }
    ]
  },
  {
    startYear: 2019,
    endYear: 2019,
    title: "Co-authored workplace demotivation study",
    description: "Internal research and reporting on employee demotivation factors",
    category: 'personal',
    skills: [
      { name: 'Data analysis', weight: 8 },
      { name: 'Reporting', weight: 8 },
      { name: 'Research', weight: 8 },
      { name: 'Presentation', weight: 8 }
    ]
  },
  {
    startYear: 2019,
    endYear: 2019,
    title: "Mentor Training Course",
    description: "Institute of Air Navigation, Moscow",
    category: 'personal',
    skills: [
      { name: 'Mentoring', weight: 8 },
      { name: 'Training support', weight: 8 },
      { name: 'Knowledge transfer', weight: 8 }
    ]
  },
  {
    startYear: 2020,
    endYear: 2021,
    title: "UX/UI theory studies",
    description: "Theoretical training in UX/UI design",
    category: 'personal',
    skills: [
      { name: 'User experience theory', weight: 6 },
      { name: 'Visual structure', weight: 6 },
      { name: 'Adaptability', weight: 7 }
    ]
  },
  {
    startYear: 2025,
    endYear: 2025,
    title: "Coffee label series for blend lineup",
    description: "Independent visual work for a multi-variant coffee packaging concept",
    category: 'personal',
    skills: [
      { name: 'Visual hierarchy', weight: 7 },
      { name: 'Packaging layout', weight: 8 },
      { name: 'Color-coded product variation', weight: 8 },
      { name: 'Offer presentation', weight: 6 }
    ]
  },
  {
    startYear: 2026,
    endYear: 2026,
    title: "Drone-service landing-page concept",
    description: "Independent UX/UI concept for a drone-based maintenance website",
    category: 'personal',
    skills: [
      { name: 'Landing page structure', weight: 8 },
      { name: 'Visual hierarchy', weight: 7 },
      { name: 'UX/UI theory', weight: 7 },
      { name: 'Offer presentation', weight: 8 }
    ]
  },
];

// Применяем консолидацию навыков к данным таймлайна
const timelineData = consolidateSkills(rawTimelineData);

export function Timeline() {
  const [skillWeights, setSkillWeights] = React.useState<SkillWeight[]>([]);
  const [allSkills, setAllSkills] = React.useState<SkillWeight[]>([]);
  const [isMobileView, setIsMobileView] = React.useState(false);
  const [isSkillsExpanded, setIsSkillsExpanded] = React.useState(false);
  const [skillsTableOffset, setSkillsTableOffset] = React.useState(0);
  const [activePeriod, setActivePeriod] = React.useState<ActivePeriod | null>(null);
  const [expandedCard, setExpandedCard] = React.useState<ExpandedCard | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const skillsTableRef = React.useRef<HTMLDivElement>(null);
  
  // Window resize event handler to detect mobile view
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Check on mount
    checkIsMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Extract skills and calculate weights on mount
  React.useEffect(() => {
    // Extract all unique skills from timeline data
    const skillsMap = new Map<string, SkillWeight>();
    
    // Process all skills from timeline items
    timelineData.forEach(item => {
      if (item.skills) {
        item.skills.forEach(skill => {
          const existingSkill = skillsMap.get(skill.name);
          
          if (existingSkill) {
            // Update existing skill
            existingSkill.occurrences = (existingSkill.occurrences || 0) + 1;
            existingSkill.maxWeight = Math.max(existingSkill.maxWeight, skill.weight);
            existingSkill.currentWeight = existingSkill.maxWeight;
          } else {
            // Add new skill
            skillsMap.set(skill.name, {
              name: skill.name,
              currentWeight: skill.weight,
              maxWeight: skill.weight,
              occurrences: 1,
              rank: 0, // Will be calculated later
              isActive: false,
              isNew: false, // No new skills in initial state
              isSoftSkill: softSkills.has(skill.name)
            });
          }
        });
      }
    });
    
    // Convert map to array and sort by weight for ranking
    const skillsArray = Array.from(skillsMap.values())
      .sort((a, b) => b.maxWeight - a.maxWeight);
    
    // Assign ranks
    skillsArray.forEach((skill, index) => {
      skill.rank = index + 1;
    });
    
    // Update state
    setAllSkills(skillsArray);
    
    // Select top skills for initial display
    const topSkills = [...skillsArray]
      .sort((a, b) => (b.maxWeight * (b.occurrences || 1)) - (a.maxWeight * (a.occurrences || 1)))
      .slice(0, 9);
    
    setSkillWeights(topSkills);
  }, []);
  
  // Handle active period changes
  React.useEffect(() => {
    if (!activePeriod) {
      // Reset active state when no period is selected
      setSkillWeights(weights => 
        weights.map(weight => ({
          ...weight,
          isActive: false,
          currentWeight: weight.maxWeight
        }))
      );
      return;
    }
    
    // Get skills for the active period
    const activeSkills = new Set<string>();
    
    timelineData.forEach(item => {
      // Check if item overlaps with active period
      const overlaps = 
        (item.startYear <= activePeriod.endYear && item.endYear >= activePeriod.startYear);
      
      // For active items, add their skills to the active set
      if (overlaps && item.skills) {
        item.skills.forEach(skill => {
          activeSkills.add(skill.name);
        });
      }
    });
    
    // Update skill weights based on active period
    setSkillWeights(weights => 
      weights.map(weight => ({
        ...weight,
        isActive: activeSkills.has(weight.name),
        currentWeight: activeSkills.has(weight.name) ? weight.maxWeight : Math.max(2, weight.maxWeight - 3)
      }))
    );
    
  }, [activePeriod]);
  
  // Variables for calculating timeline item positions
  const MIN_YEAR = Math.min(...timelineData.map(item => item.startYear));
  const maxYear = Math.max(...timelineData.map(item => item.endYear), MIN_YEAR + 5);
  const totalYears = maxYear - MIN_YEAR + 5; // Add some padding
  
  // Calculate position by year
  const getPositionByYear = (year: number) => {
    // Use a simple linear formula, removed the special spacing between 1984-2001
    return year * 100 - (MIN_YEAR * 100);
  };
  
  // Расчет высоты временной шкалы на основе формулы позиционирования
  const minPosition = getPositionByYear(MIN_YEAR);
  const maxPosition = getPositionByYear(maxYear + 5); // Добавляем 5 лет дополнительно
  const totalTimelineHeight = maxPosition - minPosition + 600; // Добавляем 600px для отступов
  
  // Timeline items with sides assigned
  const getTimelineItems = () => {
    return timelineData.map((item): TimelineItemWithSide => {
      // Assign sides based on category
      const side = item.category === 'work' ? 'right' : 'left';
      return { ...item, side };
    });
  };
  
  // Height adjustment for expanded cards
  const getExpandedCardExtraHeight = () => {
    return expandedCard ? expandedCard.expandedHeight : 0;
  };
  
  // Calculate adjusted position for overlapping cards
  const getAdjustedPosition = (item: TimelineItemWithSide) => {
    // Use positioningStartYear if available (for desktop optimization)
    const effectiveStartYear = item.positioningStartYear || item.startYear;
    
    // Base position at the start year - this ensures alignment with year markers
    const basePosition = getPositionByYear(effectiveStartYear);
    
    // Only adjust position in mobile view when expanded
    if (isMobileView && expandedCard && 
        item.side === expandedCard.side && 
        basePosition > getPositionByYear(expandedCard.startYear)) {
      return basePosition + getExpandedCardExtraHeight();
    }
    
    return basePosition;
  };
  
  // Calculate card height based on year span
  const getCardHeight = (item: TimelineItemWithSide) => {
    const cardId = `${item.category}-${item.startYear}-${item.title.replace(/\s+/g, '-')}`;
    const isExpandedCard = expandedCard && expandedCard.id === cardId;
    
    // For single-year events, use fixed height with different values for mobile/desktop
    if (item.startYear === item.endYear) {
      // Taller base height for desktop view to prevent overlapping
      const baseHeight = isMobileView ? 180 : 210;
      return isExpandedCard ? baseHeight + expandedCard.expandedHeight : baseHeight;
    }
    
    // For multi-year spans, calculate height based on years
    // Use the effective start year (which may be the positioning year for desktop optimization)
    const effectiveStartYear = item.positioningStartYear || item.startYear;
    const startPos = getPositionByYear(effectiveStartYear);
    let endPos = getPositionByYear(item.endYear);
    
    // Ensure minimum spacing between cards by enforcing a minimum height
    const minHeight = isMobileView ? 180 : 210;
    
    // Add extra height only to the expanded card itself
    if (isExpandedCard) {
      return Math.max(minHeight, endPos - startPos) + expandedCard.expandedHeight;
    }
    
    // Minimum height for short periods - larger for desktop
    return Math.max(minHeight, endPos - startPos);
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
      // Get exact position based on year - primary positioning factor
      const basePosition = getAdjustedPosition(item);
      const height = getCardHeight(item);
      const end = basePosition + height;

      // Apply a gentle cascading shift when cards overlap so each one remains clickable
      const overlapPadding = isMobileView ? 160 : 40;
      const spacingBetweenCards = isMobileView ? 48 : 28;

      let verticalShift = 0;

      const overlappingRanges = verticalRanges.filter(range => {
        const paddedStart = range.start - overlapPadding;
        const paddedEnd = range.end + overlapPadding;
        return basePosition < paddedEnd && end > paddedStart;
      });

      if (overlappingRanges.length > 0) {
        const maxOccupiedEnd = Math.max(...overlappingRanges.map(range => range.end));
        if (basePosition <= maxOccupiedEnd) {
          verticalShift = maxOccupiedEnd - basePosition + spacingBetweenCards;
        }
      }

      const finalStart = basePosition + verticalShift;
      const finalEnd = finalStart + height;

      // Update vertical ranges
      verticalRanges.push({
        start: finalStart,
        end: finalEnd,
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
  
  // Optimize spacing within overlapping groups - but maintain year alignment
  const optimizeGroupSpacing = (
    items: TimelineItemWithSide[], 
    groups: TimelineItemWithSide[][], 
    side: 'left' | 'right'
  ): TimelineItemWithSide[] => {
    // Create a copy of the items that we can modify
    const optimizedItems = [...items];
    
    // Process each group of overlapping items
    groups.forEach((group, groupIndex) => {
      if (group.length <= 1) return; // No need to optimize single items
      
      // Sort the group by start year
      const sortedGroup = [...group].sort((a, b) => a.startYear - b.startYear);
      
      // Apply minimal spacing to each item in the group to maintain year alignment
      sortedGroup.forEach((item, itemIndex) => {
        if (itemIndex === 0) return; // Skip the first item in the group
        
        // Find the item in our optimized list
        const itemToAdjust = optimizedItems.find(i => 
          i.startYear === item.startYear && 
          i.title === item.title && 
          i.category === item.category
        );
        
        if (itemToAdjust) {
          // Adjust positioning year by smaller increments to maintain alignment
          const adjustYears = Math.min(itemIndex * 0.5, 2); // Smaller increment, max 2 years
          itemToAdjust.positioningStartYear = item.startYear + adjustYears;
        }
      });
    });
    
    return optimizedItems;
  };
  
  // Process timeline items with additional desktop optimization
  const processTimelineItemsWithOptimization = () => {
    // Get basic timeline items
    const items = getTimelineItems();
    
    // For desktop view, group overlapping items to reduce total number of cards
    if (!isMobileView) {
      // Group items by overlapping time periods and same years
      const groupedItems = groupTimelineItems(items);
      
      const leftItems = groupedItems.filter(item => item.side === 'left');
      const rightItems = groupedItems.filter(item => item.side === 'right');
      
      // Desktop optimization - analyze potential overlaps and optimize column allocation
      const leftGroups = getOverlappingGroups(leftItems);
      const rightGroups = getOverlappingGroups(rightItems);
      
      // Apply additional spacing for desktop view to ensure cards don't overlap visually
      const optimizedLeftItems = optimizeGroupSpacing(leftItems, leftGroups, 'left');
      const optimizedRightItems = optimizeGroupSpacing(rightItems, rightGroups, 'right');
      
      return {
        processedLeftItems: processTimelineColumn(optimizedLeftItems),
        processedRightItems: processTimelineColumn(optimizedRightItems)
      };
    } else {
      // Mobile processing - no grouping or additional optimization
      const leftItems = items.filter(item => item.side === 'left');
      const rightItems = items.filter(item => item.side === 'right');
      
      return {
        processedLeftItems: processTimelineColumn(leftItems),
        processedRightItems: processTimelineColumn(rightItems)
      };
    }
  };
  
  // Group timeline items with overlapping periods or same years
  const groupTimelineItems = (items: TimelineItemWithSide[]): TimelineItemWithSide[] => {
    if (!items.length) return [];
    
    // First separate items by side and category for proper grouping
    const leftEducation = items.filter(item => item.side === 'left' && item.category === 'education');
    const leftPersonal = items.filter(item => item.side === 'left' && item.category === 'personal');
    const rightWork = items.filter(item => item.side === 'right' && item.category === 'work');
    
    // Process each category separately
    const groupedLeftEducation = groupItemsByTimeOverlap(leftEducation, 'education');
    const groupedLeftPersonal = groupItemsByTimeOverlap(leftPersonal, 'personal');
    const groupedRightWork = groupItemsByTimeOverlap(rightWork, 'work');
    
    // Combine all grouped items
    return [...groupedLeftEducation, ...groupedLeftPersonal, ...groupedRightWork];
  };
  
  // Group items with overlapping time periods or same years
  const groupItemsByTimeOverlap = (items: TimelineItemWithSide[], category: 'education' | 'work' | 'personal'): TimelineItemWithSide[] => {
    if (!items.length) return [];
    
    // Sort by start year for proper grouping
    const sortedItems = [...items].sort((a, b) => a.startYear - b.startYear);
    
    // Group single-year items (items with same year)
    const singleYearGroups: Record<number, TimelineItemWithSide[]> = {};
    
    // Separate single-year and multi-year items
    const singleYearItems = sortedItems.filter(item => item.startYear === item.endYear);
    const multiYearItems = sortedItems.filter(item => item.startYear !== item.endYear);
    
    // Group single-year items by year
    singleYearItems.forEach(item => {
      if (!singleYearGroups[item.startYear]) {
        singleYearGroups[item.startYear] = [];
      }
      singleYearGroups[item.startYear].push(item);
    });
    
    // Create grouped cards for single-year items
    const groupedSingleYearItems = Object.entries(singleYearGroups).map(([year, yearItems]) => {
      if (yearItems.length === 1) return yearItems[0]; // No need to group single items
      
      // Create a combined card for multiple items in the same year
      return {
        startYear: parseInt(year),
        endYear: parseInt(year),
        title: `${yearItems.length} Events in ${year}`,
        description: `Multiple events that occurred in ${year}`,
        category,
        side: yearItems[0].side,
        // Combine skills from all items
        skills: combineSkills(yearItems),
        // Store original items for reference when expanding
        originalItems: yearItems
      } as TimelineItemWithSide & { originalItems: TimelineItemWithSide[] };
    });
    
    // Group overlapping multi-year items
    const overlappingGroups: TimelineItemWithSide[][] = [];
    
    // Sort multi-year items by start year and then by duration (longer periods first)
    multiYearItems.sort((a, b) => {
      // First sort by start year
      if (a.startYear !== b.startYear) {
        return a.startYear - b.startYear;
      }
      
      // Then by duration (longer first)
      const aDuration = a.endYear - a.startYear;
      const bDuration = b.endYear - b.startYear;
      return bDuration - aDuration;
    });
    
    // Find overlapping groups with significant overlap
    multiYearItems.forEach(item => {
      // Calculate item's time span
      const itemDuration = item.endYear - item.startYear;
      
      // Check if item significantly overlaps with any existing group
      let addedToGroup = false;
      
      for (const group of overlappingGroups) {
        // Find the group's overall time range
        const groupStartYear = Math.min(...group.map(i => i.startYear));
        const groupEndYear = Math.max(...group.map(i => i.endYear));
        
        // Calculate overlap period
        const overlapStart = Math.max(groupStartYear, item.startYear);
        const overlapEnd = Math.min(groupEndYear, item.endYear);
        const overlapDuration = Math.max(0, overlapEnd - overlapStart);
        
        // Check if there's significant overlap (at least 50% of item's duration)
        const hasSignificantOverlap = overlapDuration > 0 && 
            (overlapDuration >= itemDuration * 0.5 || overlapDuration >= 2); // At least 50% overlap or 2+ years
        
        if (hasSignificantOverlap) {
          group.push(item);
          addedToGroup = true;
          break;
        }
      }
      
      // If not added to any group, create a new group
      if (!addedToGroup) {
        overlappingGroups.push([item]);
      }
    });
    
    // Create grouped cards for overlapping items
    const groupedMultiYearItems = overlappingGroups.map(group => {
      if (group.length === 1) return group[0]; // No need to group single items
      
      // Find the earliest start year and latest end year
      const startYear = Math.min(...group.map(item => item.startYear));
      const endYear = Math.max(...group.map(item => item.endYear));
      
      // Create a combined card
      return {
        startYear,
        endYear,
        title: `${group.length} ${category === 'work' ? 'Work' : category === 'education' ? 'Education' : 'Personal'} Events (${startYear}-${endYear})`,
        description: `Multiple overlapping ${category} events from ${startYear} to ${endYear}`,
        category,
        side: group[0].side,
        // Combine skills from all items
        skills: combineSkills(group),
        // Store original items for reference when expanding
        originalItems: group
      } as TimelineItemWithSide & { originalItems: TimelineItemWithSide[] };
    });
    
    // Combine all grouped items
    return [...groupedSingleYearItems, ...groupedMultiYearItems];
  };
  
  // Combine skills from multiple items
  const combineSkills = (items: TimelineItemWithSide[]) => {
    const skillMap = new Map<string, { name: string; weight: number }>();
    
    items.forEach(item => {
      if (!item.skills) return;
      
      item.skills.forEach(skill => {
        const existingSkill = skillMap.get(skill.name);
        
        if (existingSkill) {
          // Update with higher weight if found
          existingSkill.weight = Math.max(existingSkill.weight, skill.weight);
        } else {
          // Add new skill
          skillMap.set(skill.name, { ...skill });
        }
      });
    });
    
    return Array.from(skillMap.values());
  };
  
  // Ensure expanded card state properly resets when clicking outside a card
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only process if clicking directly on the timeline background, not on cards
    if ((e.target as HTMLElement).id === 'timeline-background') {
      setExpandedCard(null);
    }
  };
  
  // Fix card expansion logic to prevent any side effects
  const handleCardExpand = (card: ExpandedCard | null) => {
    // If we're already expanded and clicking the same card, collapse it
    if (expandedCard && card && expandedCard.id === card.id) {
      setExpandedCard(null);
      return;
    }
    
    // If expanding a different card or expanding for the first time
    if (card) {
      // Always reset active period when toggling card expansion
      setActivePeriod(null);
      setExpandedCard(card);
    } else {
      // Collapsing
      setExpandedCard(null);
    }
  };
  
  // Apply the optimized processing
  const { processedLeftItems, processedRightItems } = processTimelineItemsWithOptimization();

  // Combined items for mobile view
  const allProcessedItems = [...processedLeftItems, ...processedRightItems];

  const getColumnMaxPosition = (items: ProcessedTimelineItem[]) => (
    items.length ? Math.max(...items.map(item => item.basePosition + item.verticalShift + item.height)) : 0
  );

  const processedMaxPosition = Math.max(
    getColumnMaxPosition(processedLeftItems),
    getColumnMaxPosition(processedRightItems)
  );

  const baseContentHeight = maxPosition + 200;
  const contentHeight = Math.max(baseContentHeight, processedMaxPosition + 120);
  const timelineHeightWithShifts = Math.max(totalTimelineHeight, contentHeight + 120);
  
  return (
    <div id="timeline" className="w-full relative scroll-mt-20" ref={containerRef} onClick={handleBackgroundClick}>
      <div id="timeline-background" className="absolute inset-0"></div>
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {/* Left column - Skills table */}
        <div className="md:col-span-1">
          <div id="skills" className="space-y-4 md:sticky md:top-20" ref={skillsTableRef}>
            <SkillsTable
              isSkillsExpanded={isSkillsExpanded}
              setIsSkillsExpanded={setIsSkillsExpanded}
              isMobile={isMobileView}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="relative w-full">
            <div className="md:hidden w-full">
              <MobileTimeline 
                processedItems={allProcessedItems}
                onHover={setActivePeriod}
                expandedCard={expandedCard}
                setExpandedCard={handleCardExpand}
              />
            </div>
            <div className="hidden md:block">
              <DesktopTimeline
                processedLeftItems={processedLeftItems}
                processedRightItems={processedRightItems}
                expandedCard={expandedCard}
                setExpandedCard={handleCardExpand}
                setActivePeriod={setActivePeriod}
                getPositionByYear={getPositionByYear}
                MIN_YEAR={MIN_YEAR}
                maxYear={maxYear}
                timelineData={timelineData}
                getExpandedCardExtraHeight={getExpandedCardExtraHeight}
                totalTimelineHeight={timelineHeightWithShifts}
                contentHeight={contentHeight}
                yearStart={MIN_YEAR}
                yearEnd={maxYear}
                numYears={totalYears}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
