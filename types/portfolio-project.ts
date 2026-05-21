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
  _path?: string
}
