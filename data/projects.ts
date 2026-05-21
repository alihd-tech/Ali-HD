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
  order?: number
}

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
