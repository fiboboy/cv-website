import React, { memo, useState } from 'react';
import { SkillWeight } from './types';
import { getRelatedSkills, getSkillGroup } from './utils';

interface RankedSkillItemProps {
  skill: SkillWeight;
  isMobile: boolean;
}

// Функция для определения цвета градиента навыка
const getSkillColor = (isSoftSkill: boolean) => {
  return 'from-[var(--terminal-green)] to-[rgba(109,255,123,0.42)]';
};

// Функция для получения цвета фона карточки навыка
const getSkillBackgroundColor = (isSoftSkill: boolean) => {
  return isSoftSkill
    ? 'bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)]'
    : 'bg-[rgba(109,255,123,0.04)] hover:bg-[rgba(109,255,123,0.08)]';
};

// Группы связанных навыков для отображения в описании (расширенный список)
const relatedSkills: Record<string, string[]> = {
  'Strategic Decision-Making': ['Decision-making under pressure', 'Decision-making', 'Critical thinking', 'Quick decision-making', 'Strategic thinking'],
  'Analytical Thinking': ['Data analysis', 'Pattern recognition', 'Analytical skills', 'Logical reasoning', 'System analysis'],
  'Task & Resource Management': ['Time management', 'Multi-tasking', 'Efficiency', 'Task control', 'Planning', 'Time planning', 'Resource allocation', 'Task prioritization'],
  'Stress Resilience': ['Stress management', 'Performance under pressure', 'Mental clarity', 'Emotional stability', 'Working under pressure'],
  'Communication Skills': ['Radio communication', 'Stakeholder communication', 'Technical communication', 'Clear expression', 'Presentation skills', 'Written communication', 'Verbal communication'],
  'Leadership': ['Team leadership', 'Leadership under pressure', 'Team coordination', 'Supervisory skills', 'Mentoring', 'Team management'],
  'Problem-Solving': ['Advanced problem-solving', 'Technical troubleshooting', 'Root cause analysis', 'Technical Problem-Solving', 'Creative problem-solving'],
  'Crisis Management': ['Emergency response', 'Disaster recovery planning', 'Crisis handling', 'Emergency procedures', 'Incident management', 'Aviation emergency procedures'],
  'Teamwork & Collaboration': ['Team coordination', 'Cross-functional collaboration', 'Group productivity', 'Collaboration', 'Teamwork'],
  'UX/UI Design': ['User Experience Focus', 'Wireframing', 'Prototyping', 'Design Thinking', 'Visual Design', 'User Research'],
  'Software Architecture': ['System design', 'Technical architecture', 'Scalable design patterns', 'Microservices', 'Domain-Driven Design', 'Design Patterns'],
  'TypeScript': ['JavaScript', 'Strong typing', 'Frontend development', 'Web development', 'TypeScript ecosystems'],
  'React': ['Next.js', 'Frontend frameworks', 'Component-based development', 'React ecosystem', 'Redux'],
  'Adaptability': ['Flexibility', 'Learning new tools', 'Adjusting to changing requirements', 'Agile mindset'],
  'Precision': ['Attention to Detail', 'Accuracy', 'Thoroughness', 'Quality focus', 'Meticulousness'],
  'HTML': ['HTML5', 'Semantic markup', 'Web standards', 'Frontend basics'],
  'CSS': ['CSS3', 'Web styling', 'CSS preprocessors', 'Responsive design'],
  'Node.js': ['Server-side JavaScript', 'Express', 'Backend development', 'NPM ecosystem'],
  'GraphQL': ['API development', 'Data fetching', 'Apollo', 'RESTful alternatives'],
  'Docker': ['Containerization', 'DevOps', 'Kubernetes', 'CI/CD'],
  'SQL': ['Databases', 'PostgreSQL', 'MySQL', 'Data querying'],
  'DevOps': ['CI/CD', 'Infrastructure automation', 'Cloud services', 'Deployment strategies'],
  'Frontend Development': ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Redux', 'CSS/SCSS', 'Responsive design', 'Web development'],
  'Backend Development': ['Node.js', 'Express.js', 'APIs', 'Server-side development', 'Databases', 'Authentication'],
  'Air Traffic Management': ['Radar control', 'Flight coordination', 'Traffic management', 'Airspace monitoring', 'Situational awareness'],
  'Aviation Safety & Security': ['Risk assessment', 'Emergency procedures', 'Aviation regulations', 'Security protocols']
};

// Улучшенные описания для объединенных скиллов
const skillDescriptions: Record<string, string> = {
  // Консолидированные навыки
  'Frontend Development': 'Web interfaces with HTML, CSS, JavaScript, TypeScript, React, Next.js',
  'Backend Development': 'Server-side systems with Node.js, APIs, databases and authentication',
  'API & Data': 'GraphQL, REST APIs, data fetching and API architecture',
  'DevOps & Infrastructure': 'Docker, CI/CD, cloud services and deployment automation',
  'Software Architecture': 'System design, microservices and scalable architecture patterns',
  'Database Technologies': 'SQL, MongoDB, Redis and database management systems',
  'UX/UI Design': 'User experience design with wireframing and prototyping',
  '3D Modeling & Design': 'Digital 3D model creation, CAD software and prototype development',
  'Blockchain & Web3': 'Crypto, NFTs, Web3 ecosystems and GameFi platforms',
  
  // Авиационные навыки
  'Air Traffic Management': 'Air traffic control, radar systems and complex traffic coordination',
  'Flight Operations': 'Route optimization, flight procedures and operational management',
  'Aviation Safety & Security': 'Risk assessment, emergency protocols and aviation regulations',
  
  // Soft skills
  'Strategic Decision-Making': 'Critical decisions under pressure with strategic thinking and judgment',
  'Analytical Thinking': 'Complex data analysis and systematic problem assessment',
  'Problem-Solving': 'Creative solutions for complex technical and operational challenges',
  'Crisis Management': 'Emergency response coordination and high-stakes situation handling',
  'Stress Resilience': 'Performance under pressure with emotional stability and focus',
  'Leadership': 'Team leadership, mentoring and performance management',
  'Communication Skills': 'Clear technical and stakeholder communication across channels',
  'Task & Resource Management': 'Effective planning, prioritization and resource allocation',
  'Teamwork & Collaboration': 'Cross-functional team coordination and productive collaboration',
  'Data Analysis & Research': 'Data collection, pattern recognition and analytical reporting',
  'Attention to Detail': 'Precise and meticulous focus on quality and accuracy',
  'Adaptability': 'Rapidly adjusting to new technologies and changing requirements',
  'Critical Thinking': 'Objective analysis and evaluation for informed decision-making',
  'Creativity & Innovation': 'Original solutions and innovative approaches to challenges'
};

const RankedSkillItem = memo(({ skill, isMobile }: RankedSkillItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Определяем группу навыков для отображения
  const skillGroup = getSkillGroup(skill.name);
  
  // Получаем связанные навыки для отображения в описании
  const related = relatedSkills[skill.name] || [];
  
  // Формируем дополненное описание с включением связанных навыков, если они есть
  let enhancedDescription = skillDescriptions[skill.name] || 
    skill.description || 
    'Professional competency';
  
  // Обработчик клика для развертывания/сворачивания описания
  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`-mx-1.5 border border-[color:var(--terminal-border)] p-2 transition-all duration-500 transform ${getSkillBackgroundColor(skill.isSoftSkill)} opacity-100 hover:translate-x-1`}
    >
      <div className="flex items-start gap-2 mb-1.5">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className={`font-mono font-medium uppercase tracking-[0.12em] ${isMobile ? 'text-xs' : 'text-sm'} leading-tight transition-all duration-300 ${skill.isActive ? 'text-[var(--terminal-ivory)]' : 'text-[var(--terminal-text-soft)]'}`}>
                {skill.name}
              </span>
              {related.length > 0 && (
                <button 
                  onClick={handleExpandClick}
                  className="ml-1.5 text-[var(--terminal-ash)] hover:text-[var(--terminal-green)] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex flex-col">
              <span className={`${isMobile ? 'text-[11px] leading-6' : 'text-xs leading-6'} text-[var(--terminal-text-soft)] ${isExpanded ? '' : 'line-clamp-2'}`}>
                {enhancedDescription}
              </span>
              {isExpanded && related.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {related.map((relatedSkill, idx) => (
                    <span
                      key={idx}
                      className="border border-[color:var(--terminal-border)] bg-[rgba(8,10,9,0.8)] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--terminal-text-soft)]"
                    >
                      {relatedSkill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-mono ${skill.isSoftSkill ? 'text-[var(--terminal-ivory)]' : 'text-[var(--terminal-green)]'} pt-0.5`}>{skill.currentWeight}/10</span>
      </div>
      <div className="h-2 w-full overflow-hidden border border-[color:var(--terminal-border)] bg-[rgba(255,255,255,0.03)]">
        <div
          className={`h-full transition-all duration-1000 ease-out bg-gradient-to-r ${getSkillColor(skill.isSoftSkill)} ${skill.isActive ? 'shadow-[0_0_12px_rgba(109,255,123,0.2)]' : ''}`}
          style={{
            width: `${skill.currentWeight * 10}%`,
            transition: 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out, box-shadow 0.5s ease-out'
          }}
        />
      </div>
    </div>
  );
});

RankedSkillItem.displayName = 'RankedSkillItem';

export { RankedSkillItem }; 
