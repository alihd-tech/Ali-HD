export type BlogVariantSlug = 'plain' | 'nerd'

export interface BlogArticleMeta {
  date?: string
  readingTime?: number
  variant?: BlogVariantSlug
  title?: string
  description?: string
  tags?: string[]
  _path?: string
  body?: {
    toc?: {
      links?: { id: string; text: string; depth: number }[]
    }
  }
}

const VARIANT_STYLES: Record<BlogVariantSlug, string> = {
  plain: 'border-info/30 bg-info/10 text-info',
  nerd: 'border-secondary/30 bg-secondary/10 text-secondary',
}

const TAG_ACCENTS = [
  'border-primary/20 bg-primary/10 text-primary',
  'border-secondary/20 bg-secondary/10 text-secondary',
  'border-info/20 bg-info/10 text-info',
  'border-success/20 bg-success/10 text-success',
] as const

export function formatBlogDate(date: string, style: 'short' | 'long' = 'short') {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  })
}

export function variantBadgeClass(slug?: BlogVariantSlug) {
  if (!slug) return 'border-base-300/30 bg-base-200/30 text-base-content/70'
  return VARIANT_STYLES[slug]
}

export function variantBadgeLabel(slug?: BlogVariantSlug) {
  if (slug === 'nerd') return 'Nerd mode'
  if (slug === 'plain') return 'Plain English'
  return ''
}

export function tagBadgeClass(index: number) {
  return TAG_ACCENTS[index % TAG_ACCENTS.length]
}

export function articleCardHoverClass(index: number) {
  const hovers = [
    'hover:border-primary/35 hover:shadow-lg hover:shadow-primary/[0.08]',
    'hover:border-secondary/35 hover:shadow-lg hover:shadow-secondary/[0.08]',
    'hover:border-info/35 hover:shadow-lg hover:shadow-info/[0.08]',
    'hover:border-success/35 hover:shadow-lg hover:shadow-success/[0.08]',
  ]
  return hovers[index % hovers.length]
}
