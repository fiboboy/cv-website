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
    title: "Operations, QA, and Design-Oriented Generalist",
    yearsOfExperience: 15,
    expertise: [
      "Air traffic management",
      "Operations supervision",
      "AI data review and QA",
      "EN-RU translation",
      "Packaging and UX/UI concepts"
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
      "Training support",
      "Visual hierarchy",
      "Packaging layout",
      "Landing page structure",
      "UX/UI theory"
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
    },
    {
      area: "Visual structure",
      description: "Builds clear information hierarchy and consistent visual systems for labels and web concepts",
      relevance: "Useful in packaging design, landing pages, and presentation-oriented digital work"
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
    },
    {
      achievement: "Built a coffee label series and a drone-service website concept",
      impact: "Created a repeatable packaging system and a strong visual landing-page direction from limited assets",
      relevance: "Demonstrates practical visual design thinking and UX/UI initiative"
    }
  ],
  idealRoles: [
    "Operations Coordinator",
    "AI Data QA / Reviewer",
    "Transcription / Localization Specialist",
    "Aviation Operations Support",
    "Junior UX/UI or Visual Design Support"
  ],
  metadata: {
    availableForWork: true,
    preferredWorkType: ["Remote"],
    willingToRelocate: false
  }
};
