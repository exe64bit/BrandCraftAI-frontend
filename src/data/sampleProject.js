/**
 * Demo Mode Sample Project Data
 * Realistic pre-filled BrandProject for "TeamUp"
 * Clearly labeled as demo data for instant evaluation.
 */

export const DEMO_PROJECT = {
  _id: 'demo-teamup-project',
  projectName: 'TeamUp',
  originalIdea: 'I want to create an app that helps students find teammates for college projects, matching them by skills, schedule availability, and work ethic.',
  status: 'completed',
  currentStage: 'brand-kit',
  isDemo: true,
  createdAt: '2026-09-20T10:00:00.000Z',
  updatedAt: '2026-09-25T14:30:00.000Z',

  discovery: {
    problem: 'College students struggle with partner roulette in courses and hackathons—often ending up with unbalanced skill sets, misaligned academic ambitions, or unresponsive teammates who ghost.',
    targetAudience: 'Undergraduate and graduate STEM, Business, and Design students who take project-heavy coursework, participate in hackathons, or launch student startups.',
    context: 'Collaborative learning and cross-disciplinary capstones are at an all-time high, yet student team formation still relies on chaotic WhatsApp groups and awkward forum threads.',
    goals: [
      'Match users in under 3 minutes with verified skill complementarity',
      'Eliminate group project ghosting through peer-verified commitment stakes',
      'Build an enduring digital portfolio of collaborative achievements',
    ],
    constraints: [
      'Zero-tolerance for academic spam or credential fabrication',
      'Must respect asynchronous student schedules across courses',
      'Bootstrap network effects campus-by-campus through course captains',
    ],
    value: 'Frictionless, high-signal matchmaking that turns stressful group assignments into career-launching collaborative breakthroughs.',
    assumptions: [
      'Students prioritize work-ethic alignment higher than casual friendship when grades are at stake',
      'Peer endorsements provide significantly more reliable signal than self-reported resume skills',
      'Students are willing to commit to peer contracts before project kickoff',
    ],
    openQuestions: [
      'How do we incentivize post-project mutual peer reviews consistently?',
      'What is the optimal viral onboarding loop for campus student clubs?',
      'How do we seamlessly partner with course instructors without requiring institutional procurement?',
    ],
    userNotes: 'Initially targeted for university hackathons, then expanded into full-semester capstones and club project teams.',
  },

  positioning: {
    category: 'Collaborative Talent Matchmaking & Team Launch Platform for Higher Education',
    differentiator: 'Algorithm-assisted skill complementarity scoring paired with peer-verified commitment stakes, rather than passive directory listings.',
    valueProposition: 'Assemble your dream project squad with complementary skills and mutual work ethic in under five minutes.',
    competitiveAngle: 'Unlike generic campus message boards or LinkedIn, TeamUp optimizes specifically for project deliverables, peer chemistry, and milestone momentum.',
    positioningStatement: 'For ambitious college students struggling with group assignments and hackathons, TeamUp is a collaborative team-launch platform that assembles high-performing squads by verified skills and work ethic. Unlike chaotic group chats, TeamUp guarantees balanced teams and zero ghosting.',
  },

  personality: {
    traits: [
      {
        trait: 'Catalytic',
        reason: 'Sparks immediate peer momentum and replaces team-search paralysis with instant action.',
      },
      {
        trait: 'Empathetic',
        reason: 'Deeply understands the anxiety of grade stakes and unequal project workloads.',
      },
      {
        trait: 'Pragmatic',
        reason: 'Focuses on tangible skills, concrete milestones, and real deliverables over empty networking.',
      },
      {
        trait: 'Collegiate & Modern',
        reason: 'Speaks the authentic language of campus builders, makers, and innovators without corporate stiffness.',
      },
    ],
    avoidTraits: [
      'Bureaucratic & Academic Jargon',
      'Condescending or Preachy',
      'Overly Corporate & Stiff',
      'Chaotic & Unreliable',
    ],
    principles: [
      'Clarity over cleverness in every match recommendation',
      'Celebrate shared wins, not individual ego',
      'Foster accountability through mutual respect and clear milestones',
    ],
  },

  naming: {
    selectedName: 'TeamUp',
    options: [
      {
        name: 'TeamUp',
        rationale: 'Direct, energetic, and action-oriented. Instantly communicates collaborative purpose with zero cognitive friction.',
        positioning: 'Directly stakes ownership of the collegiate team-formation category.',
        territory: 'action-oriented',
        selected: true,
        isNewlyAdded: false,
      },
      {
        name: 'Cohort',
        rationale: 'Evokes academic kinship and mutual growth through structured project phases.',
        positioning: 'Appeals to university capstone programs and graduate students.',
        territory: 'community-oriented',
        selected: false,
        isNewlyAdded: false,
      },
      {
        name: 'NexusLab',
        rationale: 'Suggests an intersection where distinct disciplines collide to build innovations.',
        positioning: 'Frames student projects as serious research and venture incubations.',
        territory: 'metaphorical',
        selected: false,
        isNewlyAdded: false,
      },
      {
        name: 'Squadra',
        rationale: 'Italian for team and squad, bringing an athletic, high-cohesion energy to builders.',
        positioning: 'Captures the spirit of elite hackathon and startup teams.',
        territory: 'abstract',
        selected: false,
        isNewlyAdded: false,
      },
      {
        name: 'CollabTree',
        rationale: 'Visual metaphor for branched skill contributions growing into a unified canopy.',
        positioning: 'Focuses on organic network growth and mentorship.',
        territory: 'descriptive',
        selected: false,
        isNewlyAdded: false,
      },
    ],
  },

  critique: {
    genericPatterns: [
      'Promising "find teammates fast" risks sounding like classified message boards if portfolio proof is absent.',
      'Relying solely on self-reported skill tags can reproduce the same unbalanced teams as random selection.',
    ],
    weakAssumptions: [
      'Assuming students will proactively update their schedules mid-semester during exam crunches.',
      'Assuming course professors will welcome external student tooling without formal institutional signoff.',
    ],
    contradictions: [
      'Tension between rapid casual matchmaking ("under 3 minutes") and deep vetting for high-stakes capstones.',
    ],
    audienceMismatch: [
      'Hyper-technical students desire GitHub repo proof, while design and business students need visual portfolio showcases.',
    ],
    namingConcerns: [
      '"TeamUp" is universally understood but common; strong distinctive visual branding and trademark execution are vital to prevent category dilution.',
    ],
    alternatives: [
      'Add pre-flight "Team Charters" that auto-generate contract terms before projects kick off.',
      'Create a "Hackathon Mode" with rapid speed-matching versus a "Capstone Mode" with portfolio-grade vetting.',
      'Integrate GitHub and Figma showcase embeds directly into user profiles.',
    ],
  },

  visualDirection: {
    colors: {
      primary: '#4361EE',
      secondary: '#3A0CA3',
      accent: '#4CC9F0',
      background: '#F8FAFC',
      text: '#0F172A',
      paletteRationale: 'Electric indigo paired with deep cobalt and cyan accents radiates academic prestige blended with hackathon velocity.',
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'Inter',
      styleGuide: 'Dynamic geometric headers (weights 600/700) with generous tracking, paired with crisp legible body copy for rapid UI scanning.',
    },
    mood: 'High-energy collegiate lab meeting modern Silicon Valley studio: clean architectural grids, electric cyan accents, and human-first collaboration.',
    shapes: [
      'Asymmetric rounded pill badges',
      'Interlocking node links',
      'Modular cards with crisp hairline borders',
    ],
    symbols: [
      'Overlapping dynamic loops representing diverse mindsets connecting',
      'Geometric compass star signaling direction and discovery',
      'Catalytic spark node representing collective energy',
    ],
    imagery: {
      style: 'Authentic candid collegiate workshop photography overlaid with clean digital telemetry and UI chips.',
      photography: 'Natural, non-stock photography of diverse college students actively sketching on whiteboards and coding together.',
      composition: 'Dynamic angles with ample negative space and sharp focal priority on collaboration moments.',
      lighting: 'Warm golden hour ambient light contrasted with subtle cool neon rim highlights.',
    },
    logoDirection: 'A minimalist modern geometric mark featuring two interlocking dynamic ribbons that form both an abstract letter "T" and an infinity synergy loop, paired with a clean Space Grotesk wordmark.',
    avoid: [
      'Generic stock photos of people in business suits smiling at laptops',
      'Overused purple-to-pink gradient blobs',
      'Childish cartoon mascot illustrations',
      'Heavy brutalist typography that intimidates non-engineering students',
    ],
  },

  generatedVisuals: [
    {
      type: 'logo',
      prompt: 'Minimalist modern vector logo icon mark for "TeamUp", representing collegiate talent matching. Clean geometric interlocking ribbons forming an abstract letter T and infinity synergy loop, primary electric indigo #4361EE with cyan #4CC9F0 accent on clean white background. Ultra-sharp vector lines, Paul Rand aesthetic, no clutter.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      fileId: 'demo-logo-001',
      createdAt: '2026-09-25T14:00:00.000Z',
    },
    {
      type: 'moodboard',
      prompt: 'Aesthetic brand moodboard presentation for "TeamUp". Harmonic palette of electric indigo #4361EE, deep cobalt #3A0CA3, and cyan #4CC9F0, tactile matte paper, architectural studio glass, collaborative workspace textures, editorial design layout, Pentagram agency presentation standard.',
      imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
      fileId: 'demo-moodboard-002',
      createdAt: '2026-09-25T14:10:00.000Z',
    },
    {
      type: 'brand-visual',
      prompt: 'Inspiring cinematic brand hero visual for "TeamUp". Ambitious collegiate students collaborating in a glass-walled design and code studio, natural golden hour lighting, authentic smiles, whiteboard sketches in background, high-resolution 8k editorial look.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      fileId: 'demo-hero-003',
      createdAt: '2026-09-25T14:20:00.000Z',
    },
    {
      type: 'social-visual',
      prompt: 'High-impact social media campaign creative for "TeamUp". Bold modern typography poster layout, clean geometric gradient shapes in electric indigo and cyan, sleek high-contrast aesthetic, collegiate launch announcement style.',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      fileId: 'demo-social-004',
      createdAt: '2026-09-25T14:25:00.000Z',
    },
  ],

  consistency: {
    score: 94,
    scoreExplanation: 'AI-generated internal coherence estimate calculating alignment between strategic positioning, personality tone, and visual direction (scale 0-100).',
    issues: [
      'High energy visual tone must remain grounded in serious capstone scenarios so academic advisors take it seriously.',
      'Ensure action-oriented copy does not overlook introverted creators looking for quiet co-builders.',
    ],
    recommendations: [
      'Use the deep cobalt secondary color for formal academic badges to maintain authority.',
      'Provide structured communication templates for initial outreach messages to lower friction.',
      'Anchor the hero visual around collaborative student work in progress rather than isolated headshots.',
    ],
  },

  launchKit: {
    headline: 'Stop Playing Partner Roulette. Build With Your Dream Team.',
    subheadline: 'Match with ambitious students across campus who share your work ethic, complementary skills, and drive to create something extraordinary.',
    cta: 'Find Your Squad',
    oneLinePitch: 'The collegiate team builder that matches ambitious students by complementary skills and verified work ethic.',
    landingPageCopy: {
      heroDescription: 'Tired of carrying group projects alone? TeamUp matches you with trusted co-builders in under five minutes—so you can spend time shipping, not stressing.',
      featuresSummary: [
        'Skill Complementarity: Automatic matching across coding, UI/UX design, and business strategy.',
        'Ghost-Free Accountability: Mutual commitment contracts and peer reviews protect your grade.',
        'Campus Verified: Connect exclusively with students from your college and accredited programs.',
      ],
      socialProofHook: 'Over 4,800 students from 85 universities have shipped capstones, won hackathons, and launched startups through TeamUp.',
    },
    socialPost: `College group projects are famous for two things: awkward icebreakers and someone ghosting the final presentation.\n\nWe built TeamUp to fix that forever.\n\nFind teammates with the exact skills you need, aligned schedules, and the same drive to get an A.\n\nJoin the campus beta today: teamup.edu 🚀`,
    launchMessage: `Every company and breakthrough idea you admire was built by a small squad of friends who took a chance on each other. Finding those collaborators shouldn't depend on who happens to sit next to you in lecture. We created TeamUp to give every student the team they deserve.`,
    brandVoiceExamples: [
      'Welcome: "Welcome to TeamUp. Let’s find the people who turn your idea into reality."',
      'Empty Search: "No teammates matching that exact stack yet. Broaden your skills filter or spark an open project invite."',
      'Team Formed: "Squad locked in. Time to build something unforgettable."',
    ],
  },

  progress: {
    completedStagesCount: 10,
    totalStages: 10,
    percentage: 100,
    completedMap: {
      discovery: true,
      positioning: true,
      personality: true,
      naming: true,
      critique: true,
      visual: true,
      images: true,
      consistency: true,
      launch: true,
      'brand-kit': true,
    },
    displayText: '10 / 10 stages completed',
  },
};
