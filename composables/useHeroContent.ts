import type { HeroContentDoc, HeroCopy } from '~/types/site-content'

const HERO_FALLBACK: HeroCopy = {
  pillLabel: 'Full-Stack Engineer & Web Architect',
  eyebrow: 'Product-focused engineering for the modern web',
  headlineName: 'Ali HD',
  headlineAccent: 'Design systems that endure',
  subhead:
    'Building fast, scalable interfaces and platforms that stay responsive as usage and complexity grow.',
  intro: 'I design and engineer full-stack systems where performance, architecture, and user experience meet clean modern development.',
  primaryCta: 'View Projects',
  secondaryCta: 'See my approach',
}

function toHeroCopy(doc?: HeroContentDoc): HeroCopy {
  if (!doc) return HERO_FALLBACK
  return {
    pillLabel: doc.pillLabel,
    eyebrow: doc.eyebrow,
    headlineName: doc.headlineName,
    headlineAccent: doc.headlineAccent,
    subhead: doc.subhead,
    intro: doc.intro,
    primaryCta: doc.primaryCta,
    secondaryCta: doc.secondaryCta,
  }
}

export async function useHeroContent() {
  const store = useAppStore()
  const { pick } = await useContentVariants<HeroContentDoc>('hero-content', '/hero')

  const heroCopy = computed(() => toHeroCopy(pick(store.complexity.slug)))
  const activeHeroLevel = computed(() => store.complexity.level)

  return { heroCopy, activeHeroLevel }
}
