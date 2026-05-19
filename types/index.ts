export interface Complexity {
  id: number
  level: number
  slug: string
  title: string
  label: string
  description: string
}

export const complexities: Complexity[] = [
  {
    id: 1,
    level: 0,
    slug: 'simple',
    title: 'Simple',
    label: 'Essentials only',
    description: 'Surfaces core ideas without extra detail — best when you want a quick read.',
  },
  {
    id: 2,
    level: 1,
    slug: 'balanced',
    title: 'Balanced',
    label: 'Core + context',
    description: 'Shows the main story with enough context to follow along without overload.',
  },
  {
    id: 3,
    level: 2,
    slug: 'advanced',
    title: 'Advanced',
    label: 'Full detail',
    description: 'Includes technical depth, trade-offs, and nuance for readers who want the complete picture.',
  },
]

export type ColorAccent = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

export const colorAccentMap: Record<ColorAccent, { label: string; cssClass: string; hex: string }> = {
  primary: { label: 'Amber', cssClass: 'text-primary', hex: '#FFAC00' },
  secondary: { label: 'Violet', cssClass: 'text-secondary', hex: '#a100fc' },
  info: { label: 'Sky', cssClass: 'text-info', hex: '#3abff8' },
  success: { label: 'Green', cssClass: 'text-success', hex: '#36d399' },
  warning: { label: 'Gold', cssClass: 'text-warning', hex: '#fbbd23' },
  error: { label: 'Rose', cssClass: 'text-error', hex: '#f87272' },
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  subtitle: string
}

export interface Project {
  title: string
  description: string
  tech: string[]
  url?: string
  github?: string
  image?: string
  featured?: boolean
}

export interface NavItem {
  label: string
  href: string
  icon: string
}
