export interface BreadcrumbItem {
  label: string
  /** Route path or absolute URL. Omit on the current (last) page to use the active route. */
  to?: string
}

function resolveBreadcrumbUrl(siteUrl: string, path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path
  }
  const base = siteUrl.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}

export function buildBreadcrumbListSchema(
  items: BreadcrumbItem[],
  siteUrl: string,
  currentPath: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const path = item.to ?? currentPath
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: resolveBreadcrumbUrl(siteUrl, path),
      }
    }),
  }
}

export function useBreadcrumbSchema(items: MaybeRefOrGetter<BreadcrumbItem[]>) {
  const route = useRoute()
  const { public: { siteUrl } } = useRuntimeConfig()

  const schema = computed(() =>
    buildBreadcrumbListSchema(toValue(items), siteUrl, route.path),
  )

  useHead({
    script: [
      {
        key: 'breadcrumb-jsonld',
        type: 'application/ld+json',
        innerHTML: computed(() => JSON.stringify(schema.value)),
      },
    ],
  })

  return { schema }
}
