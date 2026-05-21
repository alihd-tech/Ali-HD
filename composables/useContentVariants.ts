import type { ContentVariantSlug } from '~/types/site-content'

const VARIANT_SLUG_RE = /\/(simple|balanced|advanced|plain|nerd)$/

export function variantSlugFromPath(path?: string): ContentVariantSlug | null {
  if (!path) return null
  const match = path.match(VARIANT_SLUG_RE)
  return (match?.[1] as ContentVariantSlug) ?? null
}

export async function useContentVariants<T extends { _path?: string }>(
  cacheKey: string,
  contentPath: string,
) {
  const { data } = await useAsyncData(cacheKey, () => queryContent<T>(contentPath).find())

  const bySlug = computed(() => {
    const map: Partial<Record<ContentVariantSlug, T>> = {}
    for (const doc of data.value ?? []) {
      const slug = variantSlugFromPath(doc._path)
      if (slug) map[slug] = doc
    }
    return map
  })

  function pick(slug: string, fallback: ContentVariantSlug = 'balanced'): T | undefined {
    const map = bySlug.value
    const key = slug as ContentVariantSlug
    return map[key] ?? map[fallback]
  }

  return { bySlug, pick }
}
