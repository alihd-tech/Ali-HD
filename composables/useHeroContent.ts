import type { HeroContentDoc, HeroCopy } from '~/types/site-content'

const HERO_FALLBACK: HeroCopy = {
  pillLabel: 'Full Stack Engineer',
  eyebrow: 'Web Infrastructure & Platform Systems',
  headlineName: 'Ali HD',
  headlineAccent: 'Systems that behave as one machine',
  subhead:
    'Specializing in scalable web infrastructure — SSR platforms, API ecosystems, payment rails, and deployment paths engineered as a single platform.',
  intro:
    'Platform- and systems-oriented full stack work: backend architecture, SSR delivery, API orchestration, and operational discipline so rendering, data, auth, and commerce stay aligned as complexity grows.',
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
