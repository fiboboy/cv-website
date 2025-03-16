export default {
  defaultTitle: 'Mika - Software Engineer & Air Traffic Controller',
  titleTemplate: '%s | Mika',
  description: 'Professional portfolio of Mika - Software Engineer and former Air Traffic Controller. Expert in complex systems architecture, distributed systems, and modern web technologies. Strong background in critical decision-making and real-time systems from air traffic control experience.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dziubenko.ru/',
    siteName: 'Mika Portfolio',
    title: 'Mika - Software Engineer & Air Traffic Controller',
    description: 'Professional portfolio of Mika - Software Engineer and former Air Traffic Controller. Expert in complex systems architecture, distributed systems, and modern web technologies. Strong background in critical decision-making and real-time systems from air traffic control experience.',
    images: [
      {
        url: 'https://dziubenko.ru/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mika Portfolio',
      },
    ],
  },
  twitter: {
    handle: '@fiboboy',
    site: '@fiboboy',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'keywords',
      content: 'software engineer, full stack developer, system architect, air traffic controller, leadership, TypeScript, React, Node.js, distributed systems, real-time systems, critical thinking, problem solving, team management',
    },
    {
      name: 'author',
      content: 'Mika',
    },
    {
      property: 'profile:skills',
      content: 'Software Architecture, Distributed Systems, Full Stack Development, Team Leadership, Critical Decision Making, TypeScript, React, Node.js',
    },
    {
      property: 'profile:experience',
      content: 'Senior Software Engineer, Air Traffic Controller, System Architect',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mika',
    jobTitle: 'Senior Software Engineer',
    description: 'Experienced Software Engineer with a unique background in Air Traffic Control. Specializes in complex systems architecture, distributed systems, and modern web technologies.',
    alumniOf: {
      '@type': 'Organization',
      name: 'Air Traffic Control Academy',
    },
    knowsAbout: [
      'Software Architecture',
      'Distributed Systems',
      'Real-time Systems',
      'TypeScript',
      'React',
      'Node.js',
      'Team Leadership',
      'Critical Decision Making',
    ],
    skills: 'Expert in building scalable applications, system architecture, and team leadership. Strong background in critical decision-making from air traffic control experience.',
    sameAs: [
      'https://github.com/fiboboy',
      'https://twitter.com/fiboboy',
    ],
  },
}