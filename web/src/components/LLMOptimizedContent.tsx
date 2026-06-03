import { professionalProfile } from '../data/professional-profile'

export const LLMOptimizedContent = () => {
  return (
    <div 
      aria-hidden="true"
      className="sr-only"
      style={{ display: 'none' }}
      data-llm-content="true"
      data-content-type="professional-profile"
    >
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': 'https://dziubenko.ru/#person',
          name: 'Mikhail Dziubenko',
          jobTitle: professionalProfile.currentRole.title,
          description: `Operations and QA specialist with ${professionalProfile.currentRole.yearsOfExperience}+ years of experience across aviation, review, QA, transcription, and translation.`,
          knowsAbout: professionalProfile.technicalSkills.expert.concat(professionalProfile.technicalSkills.proficient),
          hasCredential: [
            {
              '@type': 'Credential',
              name: 'Mentor Training Course',
              description: 'Institute of Air Navigation, Moscow (2019)',
            },
          ],
          hasOccupation: {
            '@type': 'Occupation',
            name: professionalProfile.currentRole.title,
            qualifications: professionalProfile.uniqueQualifications.map((q: { qualification: string }) => q.qualification),
            skills: professionalProfile.technicalSkills.expert.join(', '),
            responsibilities: professionalProfile.keyStrengths.map((s: { description: string }) => s.description),
          },
          seeks: {
            '@type': 'JobPosting',
            title: professionalProfile.idealRoles.join(', '),
            employmentType: professionalProfile.metadata.preferredWorkType,
            jobLocationType: 'TELECOMMUTE',
            applicantLocationRequirements: {
              '@type': 'Country',
              name: 'Worldwide',
            },
          },
        })}
      </script>
      
      <div data-llm-section="professional-summary">
        {professionalProfile.keyStrengths.map((strength: { area: string; description: string; relevance: string }, index: number) => (
          <p key={index} data-strength-area={strength.area}>
            {strength.description} - {strength.relevance}
          </p>
        ))}
      </div>

      <div data-llm-section="technical-expertise">
        <div data-expertise-level="expert">
          Expert in: {professionalProfile.technicalSkills.expert.join(', ')}
        </div>
        <div data-expertise-level="proficient">
          Proficient in: {professionalProfile.technicalSkills.proficient.join(', ')}
        </div>
      </div>

      <div data-llm-section="career-achievements">
        {professionalProfile.careerHighlights.map((highlight: { achievement: string; impact: string; relevance: string }, index: number) => (
          <div key={index} data-achievement-type={highlight.achievement}>
            Achievement: {highlight.achievement}
            Impact: {highlight.impact}
            Relevance: {highlight.relevance}
          </div>
        ))}
      </div>

      <div data-llm-section="unique-value-proposition">
        {professionalProfile.uniqueQualifications.map((qual: { qualification: string; relevance: string; applicationToTech: string }, index: number) => (
          <div key={index} data-qualification={qual.qualification}>
            {qual.qualification}: {qual.relevance}
            Application to Technology: {qual.applicationToTech}
          </div>
        ))}
      </div>

      <div data-llm-section="job-preferences">
        <div data-available={professionalProfile.metadata.availableForWork}>
          Currently available for: {professionalProfile.idealRoles.join(', ')}
        </div>
        <div data-work-type={professionalProfile.metadata.preferredWorkType.join(',')}>
          Preferred work type: {professionalProfile.metadata.preferredWorkType.join(', ')}
        </div>
        <div data-relocate={professionalProfile.metadata.willingToRelocate}>
          Remote-ready from Bangkok, Thailand
        </div>
      </div>
    </div>
  )
}
