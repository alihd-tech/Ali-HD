import { variantSlugFromPath } from '~/composables/useContentVariants'
import type { BlogArticleMeta } from '~/composables/useBlogUi'

export type BlogArticleDoc = BlogArticleMeta & { _path?: string }

const ARTICLE_TOPIC_RE = /^\/blog\/([^/]+)\/(?:plain|nerd)$/

export function articleTopicFromPath(path?: string): string | null {
  if (!path) return null
  const match = path.match(ARTICLE_TOPIC_RE)
  return match?.[1] ?? null
}

/** Last segment of `/blog/...`, ignoring trailing `plain` or `nerd`. */
export function blogTopicFromRoute(routePath: string): string {
  const segments = routePath.replace(/\/$/, '').split('/').filter(Boolean)
  const blogIdx = segments.indexOf('blog')
  const afterBlog = blogIdx >= 0 ? segments.slice(blogIdx + 1) : segments
  if (!afterBlog.length) return ''
  const last = afterBlog[afterBlog.length - 1]!
  if (last === 'plain' || last === 'nerd') {
    return afterBlog[afterBlog.length - 2] ?? ''
  }
  return last
}

function canonicalBlogPath(topic: string) {
  return `/blog/${topic}`
}

function groupBlogVariants(docs: BlogArticleDoc[]) {
  const map = new Map<string, Partial<Record<'plain' | 'nerd', BlogArticleDoc>>>()
  for (const doc of docs) {
    const topic = articleTopicFromPath(doc._path)
    const variant = variantSlugFromPath(doc._path)
    if (!topic || (variant !== 'plain' && variant !== 'nerd')) continue
    const entry = map.get(topic) ?? {}
    entry[variant] = doc
    map.set(topic, entry)
  }
  return map
}

function pickVariant(
  entry: Partial<Record<'plain' | 'nerd', BlogArticleDoc>>,
  nerd: boolean,
): BlogArticleDoc | undefined {
  const preferred = nerd ? 'nerd' : 'plain'
  const fallback = nerd ? 'plain' : 'nerd'
  return entry[preferred] ?? entry[fallback]
}

function toListedArticle(topic: string, doc: BlogArticleDoc, nerd: boolean): BlogArticleDoc {
  return {
    ...doc,
    _path: canonicalBlogPath(topic),
    variant: nerd ? 'nerd' : 'plain',
  }
}

export async function useBlogArticles() {
  const store = useAppStore()

  const { data } = await useAsyncData('blog-articles-variants', () =>
    queryContent<BlogArticleDoc>('/blog').find(),
  )

  const articles = computed(() => {
    const grouped = groupBlogVariants(data.value ?? [])
    const nerd = store.nerd
    const list: BlogArticleDoc[] = []

    for (const [topic, entry] of grouped) {
      const doc = pickVariant(entry, nerd)
      if (doc) list.push(toListedArticle(topic, doc, nerd))
    }

    return list.sort((a, b) => {
      const bTime = b.date ? new Date(b.date).getTime() : 0
      const aTime = a.date ? new Date(a.date).getTime() : 0
      return bTime - aTime
    })
  })

  const isNerd = computed(() => store.nerd)

  return { articles, isNerd }
}

export async function useBlogArticle(topic: MaybeRefOrGetter<string>) {
  const store = useAppStore()
  const topicSlug = computed(() => toValue(topic))

  const { data } = await useAsyncData(
    () => `blog-article-${topicSlug.value}`,
    async () => {
      const docs = await queryContent<BlogArticleDoc>('/blog').find()
      return docs.filter((doc) => articleTopicFromPath(doc._path) === topicSlug.value)
    },
    { watch: [topicSlug] },
  )

  const post = computed(() => {
    const entry = groupBlogVariants(data.value ?? []).get(topicSlug.value)
    if (!entry) return null
    const doc = pickVariant(entry, store.nerd)
    if (!doc) return null
    return toListedArticle(topicSlug.value, doc, store.nerd)
  })

  const isNerd = computed(() => store.nerd)

  return { post, isNerd }
}
