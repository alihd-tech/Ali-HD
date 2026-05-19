export const SITE_URL = 'https://alihd.ir'
export const SITE_NAME = 'Ali HD'
export const SITE_AUTHOR = 'Ali Heydari'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const DEFAULT_OG_IMAGE_ALT = 'Ali HD — Full Stack Engineer & Web Architect portfolio'
export const TWITTER_HANDLE = '@alihddev'

export const pageSeo = {
  home: {
    title: 'Ali HD | Full Stack Engineer & Web Architect',
    description:
      'Full-stack portfolio of Ali HD — product-focused engineering for the modern web. Fast, scalable interfaces and platforms from Scala backends to Nuxt frontends.',
    keywords:
      'Ali HD, Ali Heydari, full-stack developer, developer portfolio, Scala, FastAPI, Laravel, Nuxt, TypeScript, PWA, product engineering',
    path: '/',
  },
  about: {
    title: 'About — Ali HD | Full-Stack Engineer & Web Architect',
    description:
      'About Ali Heydari — full-stack engineer building scalable systems across Scala, FastAPI, Laravel, Nuxt, and TypeScript. Five years shipping production software.',
    keywords:
      'Ali HD about, full-stack engineer, web architect, Scala developer, Nuxt developer, Iran remote developer',
    path: '/about',
  },
  projects: {
    title: 'Projects — Ali HD | Portfolio & Case Studies',
    description:
      'Featured projects by Ali HD — Solanam design software, eSimTrip travel platform, and open-source tooling. End-to-end product engineering with live demos.',
    keywords:
      'Ali HD projects, Solanam, eSimTrip, portfolio, full-stack projects, Nuxt, Rust, Laravel',
    path: '/projects',
  },
  blog: {
    title: 'Blog — Ali HD | Engineering & Architecture',
    description:
      'Articles on full-stack engineering, Nuxt architecture, Scala, and modern web development by Ali Heydari (Ali HD).',
    keywords:
      'Ali HD blog, Nuxt, web architecture, full-stack engineering, TypeScript, Scala',
    path: '/blog',
  },
  contact: {
    title: 'Contact — Ali HD | Get in Touch',
    description:
      'Contact Ali Heydari (Ali HD) for collaborations, contract work, and engineering roles. Email and social links for GitHub, LinkedIn, and Telegram.',
    keywords:
      'contact Ali HD, hire full-stack developer, freelance engineer, Ali Heydari contact',
    path: '/contact',
  },
} as const
