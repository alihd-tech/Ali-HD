export type ComplexitySlug = 'simple' | 'balanced' | 'advanced'

export type AboutVariantSlug = 'plain' | 'nerd'

export type ContentVariantSlug = ComplexitySlug | AboutVariantSlug

export type HeroCopy = {
  pillLabel: string
  eyebrow: string
  headlineName: string
  headlineAccent: string
  subhead: string
  intro: string
  primaryCta: string
  secondaryCta: string
}

export type HeroContentDoc = HeroCopy & { _path?: string }

export type PrinciplesStoryCopy = { body: string; tags: string[] }

export type PrinciplesSectionHeader = {
  eyebrow: string
  titleLead: string
  titleAccent: string
  intro: string
}

export type PrinciplesContentDoc = PrinciplesSectionHeader & {
  _path?: string
  performance: PrinciplesStoryCopy
  architecture: PrinciplesStoryCopy
  ux: PrinciplesStoryCopy
  fullstack: PrinciplesStoryCopy
}

export type AboutExpertiseItem = {
  title: string
  accent: 'primary' | 'secondary' | 'info' | 'success'
  body: string
}

export type AboutSkillGroup = {
  label: string
  accent: 'primary' | 'secondary' | 'info'
  items: string[]
}

export type AboutContent = {
  heroTitle: string
  heroTitleAccent: string
  heroSubtitle: string
  bio: string[]
  expertise: AboutExpertiseItem[]
  skills: AboutSkillGroup[]
}

export type AboutContentDoc = AboutContent & { _path?: string }
