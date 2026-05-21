import type { AboutContent, AboutContentDoc } from '~/types/site-content'

export type { AboutContent } from '~/types/site-content'

const ABOUT_FALLBACK: AboutContent = {
  heroTitle: 'Full-Stack Engineer ',
  heroTitleAccent: '& Web Architect',
  heroSubtitle:
    'Building thoughtfully engineered systems where performance, architecture, and user experience align.',
  bio: [
    "I'm a full-stack engineer based in Iran with a passion for building systems that scale.",
    'My work spans backend services, frontend interfaces, and infrastructure — shipping production software with care for quality and reliability.',
  ],
  expertise: [],
  skills: [],
}

function toAboutContent(doc?: AboutContentDoc): AboutContent {
  if (!doc) return ABOUT_FALLBACK
  return {
    heroTitle: doc.heroTitle,
    heroTitleAccent: doc.heroTitleAccent,
    heroSubtitle: doc.heroSubtitle,
    bio: doc.bio ?? [],
    expertise: doc.expertise ?? [],
    skills: doc.skills ?? [],
  }
}

export async function useAboutContent() {
  const store = useAppStore()
  const { pick } = await useContentVariants<AboutContentDoc>('about-panel-content', '/about')

  const content = computed(() => {
    const slug = store.nerd ? 'nerd' : 'plain'
    return toAboutContent(pick(slug, 'plain'))
  })

  const isNerd = computed(() => store.nerd)
  const modeLabel = computed(() => (store.nerd ? 'Nerd mode' : 'Plain English'))

  return { content, isNerd, modeLabel }
}
