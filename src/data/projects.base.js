const projects = [
  {
    id: 'mtg-bot',
    title: 'MTG Discord Bot',
    year: '2024–2025',
    subtitle: 'Game tracking & stats',
    tech: ['Python', 'discord.py', 'MongoDB'],
    description:
      'Tracks Magic: The Gathering games, manages timers via voice channels, and records player & deck statistics. Actively maintained and used daily by 100+ people.',
    details: [
      'Voice channel timers with pause/resume',
      'Persistent per-player and per-deck statistics (MongoDB)',
      'Admin commands and match logging',
      'Maintained and improved regularly since launch',
    ],
    links: [{ label: 'Github', href: '#' }]
  },
  {
    id: 'gen-art-svg',
    title: 'SVG Generative Art Engine',
    year: '2021',
    subtitle: 'Parametric SVG engine for generative art',
    tech: ['JavaScript', 'SVG'],
    description:
      'An engine for producing high-resolution, fully vector generative art — infinitely scalable without loss of quality.',
    details: [
      'Pure SVG rendering pipeline (no raster dependencies)',
      'Parameter controls (seed, palettes, noise, complexity)',
      'Deterministic outputs via seeded randomness'
    ],
    links: [{ label: 'Github', href: 'https://github.com/greengraca/svg-art-engine' }]
  },
  {
    id: 'crypto-tool',
    title: 'Crypto Portfolio Tool',
    year: '2021–2022',
    subtitle: 'API-based tracker',
    tech: ['React', 'Node.js', 'APIs', 'Figma'],
    description:
      'Tool that allowed users to track their crypto portfolio using multiple APIs designed and built during NFT project development.',
    details: [
      'API integrations for live price updates',
      'Clean UI designs built in Figma',
      'Portfolio overview with charts and statistics',
      'Supporting various wallets and tokens',
    ],
    links: [
      { label: 'Figma', href: 'https://www.figma.com/design/jAA2LashHqR7acqNJLLI0X/Crypto-Portfolio-Tool---UI?node-id=1263-1398&t=EjfeT5qwIkgyjTiF-1' },
      { label: 'Github', href: 'https://github.com/greengraca/frogfolio' }
    ]
  },
  {
    id: 'company-site',
    title: 'Company Website Design',
    year: '2022',
    subtitle: 'Wireframing and visual design',
    tech: ['Figma', 'UI/UX'],
    description:
      'Designed and wireframed a full company website with modern UI/UX practices.',
    details: [
      'High-fidelity designs with wireframing in Figma',
      'Responsive layout with clear navigation',
      'Showcase of branding and visual identity',
    ],
    links: [{ label: 'Figma', href: 'https://www.figma.com/design/pjlGuOGl8kAm1HDqzDt104/Company-Website-Design---g-fleck-UI-UX?node-id=0-1&t=GOWf3PnpsJdw8U1H-1' }]
  },
  {
    id: 'social-designs',
    title: 'Social Media Designs',
    year: '2020–2024',
    subtitle: 'Various visual assets',
    tech: ['Figma', 'Photoshop', 'UI/UX'],
    description:
      'Collection of social media designs and visual assets created for various projects over the years.',
    details: [
      'Post templates and promotional visuals',
      'Brand-consistent layouts',
      'Exported across different aspect ratios for multiple platforms',
    ],
    links: []
  }
]

export default projects
