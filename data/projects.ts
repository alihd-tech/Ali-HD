export type ProjectAccent = 'primary' | 'secondary' | 'info' | 'success'

export interface PortfolioProject {
  title: string
  year: string
  category: string
  status?: string
  description: string
  highlights?: string[]
  tags: string[]
  banner?: string
  bannerAlt?: string
  logo?: string
  logoAlt?: string
  href?: string
  repo?: string
  accent?: ProjectAccent
  ctaLabel?: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Solanam',
    year: '2025',
    category: 'Design Software',
    status: 'Live',
    description:
      'Web-based design software — canvas workflows, asset tooling, and a product surface built for creators in the browser.',
    highlights: ['In-browser design editor', 'Product-grade UX', 'Shipped at solanam.com'],
    tags: ['Rust', 'Tauri', 'Nuxt', 'FastAPI', 'TypeScript', 'PWA'],
    banner: '/images/projects/solanam.jpg',
    bannerAlt: 'Solanam web based design software — banner',
    logo: '/images/projects/solanam.png',
    logoAlt: 'Solanam logo',
    href: 'https://solanam.com',
    accent: 'primary',
    ctaLabel: 'solanam.com',
  },
  {
    title: 'eSimTrip',
    year: '2023',
    category: 'Travel Services',
    status: 'Live',
    description:
      'Full eSIM travel ecosystem — consumer storefronts, vendor consoles, and regional brands for local and global markets.',
    highlights: [
      'eSimTrip Ecosystem (.com · .ir · .me)',
      'Vendor & Operator Platforms',
      'Local & Global Product Lines',
    ],
    tags: ['Nuxt', 'Next', 'Laravel', 'APIs', 'Multi-Tenant'],
    banner: '/images/projects/esimtrip.jpg',
    bannerAlt: 'Esimtrip eSIM travel platform — banner',
    logo: '/images/projects/esim-logo.png',
    logoAlt: 'Esimtrip logo',
    href: 'https://esimtrip.com',
    accent: 'secondary',
    ctaLabel: 'esimtrip.com',
  },
  {
    title: 'Dev tooling & Open Source Projects',
    year: 'Ongoing',
    category: 'Open Source Projects',
    status: 'Active',
    description:
      'Browser extensions, shared libraries, and upstream contributions — reusable pieces extracted from production builds.',
    highlights: ['solaxnm extension & starters', 'Docs & algorithm contributions', 'GitHub-first delivery'],
    tags: ['Rust-Tauri', 'Nuxt-Vue', 'PHP-Laravel', 'Python-FastAPI', 'WebAssembly-Zig', 'EVM-Solidity', 'Raku-Perl', 'TypeScript'],
    banner: '/images/projects/alihd.jpg',
    bannerAlt: 'Open source repositories and developer tooling — banner',
    logo: '/favicon.ico',
    logoAlt: 'Ali HD logo',
    href: 'https://github.com/alihd-tech',
    repo: 'https://github.com/alihd-tech',
    accent: 'info',
    ctaLabel: 'GitHub',
  },
]

const ACCENT_BORDER: Record<string, string> = {
  primary: 'border-primary/60 hover:border-primary',
  secondary: 'border-l-secondary/60 hover:border-l-secondary',
  info: 'border-l-info/60 hover:border-l-info',
  success: 'border-l-success/60 hover:border-l-success',
}

const ACCENT_ICON: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  info: 'text-info',
  success: 'text-success',
}

const ACCENT_HOVER: Record<string, string> = {
  primary: 'hover:border-primary/30 hover:shadow-primary/10',
  secondary: 'hover:border-secondary/30 hover:shadow-secondary/10',
  info: 'hover:border-info/30 hover:shadow-info/10',
  success: 'hover:border-success/30 hover:shadow-success/10',
}

const ACCENT_TAG: Record<string, string> = {
  primary: 'border-primary/20 bg-primary/8 text-primary',
  secondary: 'border-secondary/20 bg-secondary/8 text-secondary',
  info: 'border-info/20 bg-info/8 text-info',
  success: 'border-success/20 bg-success/8 text-success',
}

const ACCENT_BTN: Record<string, string> = {
  primary: 'border-primary bg-primary text-primary-content hover:shadow-primary/30',
  secondary: 'border-secondary bg-secondary text-secondary-content hover:shadow-secondary/30',
  info: 'border-info bg-info text-info-content hover:shadow-info/30',
  success: 'border-success bg-success text-success-content hover:shadow-success/30',
}

const ACCENT_LOGO_WRAP: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  info: 'bg-info/10 text-info',
  success: 'bg-success/10 text-success',
}

export function projectYearDatetime(year: string) {
  const n = parseInt(String(year), 10)
  return Number.isFinite(n) ? String(n) : String(year)
}

export function projectCardAccent(accent = 'primary') {
  return `border-l-[3px] ${ACCENT_BORDER[accent] ?? ACCENT_BORDER.primary}`
}

export function projectIconClass(accent = 'primary') {
  return ACCENT_ICON[accent] ?? ACCENT_ICON.primary
}

export function projectCardHover(accent = 'primary') {
  return ACCENT_HOVER[accent] ?? ACCENT_HOVER.primary
}

export function projectTagClass(accent = 'primary') {
  return ACCENT_TAG[accent] ?? ACCENT_TAG.primary
}

export function projectBtnClass(accent = 'primary') {
  return ACCENT_BTN[accent] ?? ACCENT_BTN.primary
}

export function projectLogoWrapClass(accent = 'primary') {
  return ACCENT_LOGO_WRAP[accent] ?? ACCENT_LOGO_WRAP.primary
}

export function projectStatusClass(status: string) {
  const key = status.toLowerCase()
  if (key === 'live') {
    return 'border-success/25 bg-success/8 text-success'
  }
  if (key === 'active' || key === 'ongoing') {
    return 'border-info/25 bg-info/8 text-info'
  }
  return 'border-base-300/40 bg-base-200/40 text-base-content/60'
}

export function projectStatusDotClass(status: string) {
  const key = status.toLowerCase()
  if (key === 'live') return 'bg-success'
  if (key === 'active' || key === 'ongoing') return 'bg-info'
  return 'bg-base-content/40'
}

export function projectInitial(title: string) {
  return title.trim().charAt(0).toUpperCase() || '?'
}
