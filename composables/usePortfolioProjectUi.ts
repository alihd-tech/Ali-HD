import type { ProjectAccent } from '~/types/portfolio-project'

const ACCENT_BORDER: Record<ProjectAccent, string> = {
  primary: 'border-primary/60 hover:border-primary',
  secondary: 'border-l-secondary/60 hover:border-l-secondary',
  info: 'border-l-info/60 hover:border-l-info',
  success: 'border-l-success/60 hover:border-l-success',
}

const ACCENT_ICON: Record<ProjectAccent, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  info: 'text-info',
  success: 'text-success',
}

const ACCENT_HOVER: Record<ProjectAccent, string> = {
  primary: 'hover:border-primary/30 hover:shadow-primary/10',
  secondary: 'hover:border-secondary/30 hover:shadow-secondary/10',
  info: 'hover:border-info/30 hover:shadow-info/10',
  success: 'hover:border-success/30 hover:shadow-success/10',
}

const ACCENT_TAG: Record<ProjectAccent, string> = {
  primary: 'border-primary/20 bg-primary/8 text-primary',
  secondary: 'border-secondary/20 bg-secondary/8 text-secondary',
  info: 'border-info/20 bg-info/8 text-info',
  success: 'border-success/20 bg-success/8 text-success',
}

const ACCENT_BTN: Record<ProjectAccent, string> = {
  primary: 'border-primary bg-primary text-primary-content hover:shadow-primary/30',
  secondary: 'border-secondary bg-secondary text-secondary-content hover:shadow-secondary/30',
  info: 'border-info bg-info text-info-content hover:shadow-info/30',
  success: 'border-success bg-success text-success-content hover:shadow-success/30',
}

const ACCENT_LOGO_WRAP: Record<ProjectAccent, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  info: 'bg-info/10 text-info',
  success: 'bg-success/10 text-success',
}

function resolveAccent(accent?: ProjectAccent): ProjectAccent {
  return accent && accent in ACCENT_BORDER ? accent : 'primary'
}

export function projectYearDatetime(year: string) {
  const n = parseInt(String(year), 10)
  return Number.isFinite(n) ? String(n) : String(year)
}

export function projectCardAccent(accent?: ProjectAccent) {
  const key = resolveAccent(accent)
  return `border-l-[3px] ${ACCENT_BORDER[key]}`
}

export function projectIconClass(accent?: ProjectAccent) {
  return ACCENT_ICON[resolveAccent(accent)]
}

export function projectCardHover(accent?: ProjectAccent) {
  return ACCENT_HOVER[resolveAccent(accent)]
}

export function projectTagClass(accent?: ProjectAccent) {
  return ACCENT_TAG[resolveAccent(accent)]
}

export function projectBtnClass(accent?: ProjectAccent) {
  return ACCENT_BTN[resolveAccent(accent)]
}

export function projectLogoWrapClass(accent?: ProjectAccent) {
  return ACCENT_LOGO_WRAP[resolveAccent(accent)]
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
