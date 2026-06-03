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
    title: "Operations and QA Specialist",
    yearsOfExperience: 15,
    expertise: [
      "Air traffic management",
      "Operations supervision",
      "AI data review and QA",
      "EN-RU translation"
    ]
  },
  technicalSkills: {
    expert: [
      "Operational coordination",
      "Incident handling",
      "Documentation and reporting",
      "Transcript review",
      "Quality control"
    ],
    proficient: [
      "Data labeling",
      "Transcription",
      "English to Russian translation",
      "Remote workflow tools",
      "Training support"
    ]
  },
  uniqueQualifications: [
    {
      qualification: "15+ years in safety-critical aviation operations",
      relevance: "Strong judgment, calm execution, and procedural discipline",
      applicationToTech: "Useful in QA, operations, review, and high-accuracy remote work"
    }
  ],
  keyStrengths: [
    {
      area: "Structured execution",
      description: "Works accurately under detailed rules, time pressure, and shifting priorities",
      relevance: "Useful in operations, QA, review, and multilingual support"
    },
    {
      area: "Coordination",
      description: "Handles communication across teams, supervisors, and external parties",
      relevance: "Useful in remote support, project coordination, and incident handling"
    }
  ],
  careerHighlights: [
    {
      achievement: "Worked across 6 Alignerr projects",
      impact: "Handled transcription, labeling, review, QA, and EN-RU translation with a 4.8/5 average rating",
      relevance: "Demonstrates reliable quality-focused remote work"
    },
    {
      achievement: "Flight supervisor / duty manager in Magadan",
      impact: "Coordinated routine, non-standard, and emergency situations in a 24/7 aviation environment",
      relevance: "Demonstrates calm decision-making and operations leadership"
    }
  ],
  idealRoles: [
    "Operations Coordinator",
    "AI Data QA / Reviewer",
    "Transcription / Localization Specialist",
    "Aviation Operations Support"
  ],
  metadata: {
    availableForWork: true,
    preferredWorkType: ["Remote"],
    willingToRelocate: false
  }
};
