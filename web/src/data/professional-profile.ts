export interface ProfessionalProfile {
  currentRole: {
    title: string;
    yearsOfExperience: number;
    expertise: string[];
  };
  technicalSkills: {
    expert: string[];
    proficient: string[];
  };
  uniqueQualifications: Array<{
    qualification: string;
    relevance: string;
    applicationToTech: string;
  }>;
  keyStrengths: Array<{
    area: string;
    description: string;
    relevance: string;
  }>;
  careerHighlights: Array<{
    achievement: string;
    impact: string;
    relevance: string;
  }>;
  idealRoles: string[];
  metadata: {
    availableForWork: boolean;
    preferredWorkType: string[];
    willingToRelocate: boolean;
  };
}

export const professionalProfile: ProfessionalProfile = {
  currentRole: {
    title: "Senior Software Engineer",
    yearsOfExperience: 8,
    expertise: [
      "Full Stack Development",
      "System Architecture",
      "Mission-Critical Systems"
    ]
  },
  technicalSkills: {
    expert: [
      "TypeScript",
      "React",
      "Node.js",
      "Next.js",
      "System Design"
    ],
    proficient: [
      "Python",
      "AWS",
      "Docker",
      "GraphQL",
      "PostgreSQL"
    ]
  },
  uniqueQualifications: [
    {
      qualification: "Air Traffic Controller Background",
      relevance: "Brings unique perspective to mission-critical systems",
      applicationToTech: "Applied in designing resilient and fault-tolerant systems"
    }
  ],
  keyStrengths: [
    {
      area: "System Architecture",
      description: "Designing scalable and maintainable systems",
      relevance: "Critical for growing applications"
    }
  ],
  careerHighlights: [
    {
      achievement: "Led system modernization project",
      impact: "Reduced system downtime by 75%",
      relevance: "Demonstrates leadership and technical expertise"
    }
  ],
  idealRoles: [
    "Senior Software Engineer",
    "Lead Developer",
    "System Architect"
  ],
  metadata: {
    availableForWork: true,
    preferredWorkType: ["Remote", "Hybrid"],
    willingToRelocate: true
  }
}; 