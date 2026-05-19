import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from '~/utils/site'

export interface SiteSeoArticle {
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

export interface SiteSeoOptions {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  keywords?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  article?: SiteSeoArticle
}

function buildJsonLdScript(jsonLd: SiteSeoOptions['jsonLd']) {
  if (!jsonLd) return undefined
  const graph = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    }),
  }
}

export function useSiteSeo(options: SiteSeoOptions) {
  const route = useRoute()
  const config = useRuntimeConfig()

  const siteUrl = (config.public.siteUrl as string) || SITE_URL
  const path = options.path ?? route.path
  const canonical = `${siteUrl}${path === '/' ? '/' : path.replace(/\/$/, '') || '/'}`
  const image = options.image ?? DEFAULT_OG_IMAGE
  const imageAlt = options.imageAlt ?? DEFAULT_OG_IMAGE_ALT
  const ogType = options.type ?? 'website'
  const robots = options.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  useSeoMeta({
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    author: 'Ali Heydari',
    robots,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType,
    ogUrl: canonical,
    ogImage: image,
    ogImageSecureUrl: image,
    ogImageAlt: imageAlt,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterSite: TWITTER_HANDLE,
    twitterCreator: TWITTER_HANDLE,
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: image,
    twitterImageAlt: imageAlt,
  })

  const articleMeta = options.article?.publishedTime
    ? [
        { property: 'article:published_time', content: options.article.publishedTime },
        ...(options.article.modifiedTime
          ? [{ property: 'article:modified_time', content: options.article.modifiedTime }]
          : []),
        ...(options.article.tags?.map((tag) => ({ property: 'article:tag', content: tag })) ?? []),
      ]
    : []

  const jsonLdScript = buildJsonLdScript(options.jsonLd)

  useHead({
    link: [
      { rel: 'canonical', href: canonical },
      { rel: 'alternate', hreflang: 'en', href: canonical },
      { rel: 'alternate', hreflang: 'x-default', href: canonical },
    ],
    meta: articleMeta,
    script: jsonLdScript ? [jsonLdScript] : [],
  })

  return { canonical, siteUrl }
}

export function personRef() {
  return { '@id': `${SITE_URL}/#person` }
}

export function websiteRef() {
  return { '@id': `${SITE_URL}/#website` }
}
