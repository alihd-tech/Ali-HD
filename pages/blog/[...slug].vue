<template>
    <div class="min-h-screen bg-base-100">
        <div class="reading-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-primary via-secondary to-info transition-transform duration-150"
            :style="{ transform: `scaleX(${readingProgress})` }" aria-hidden="true" />

        <section class="relative overflow-hidden border-b border-base-300/25 py-6 md:py-8">
            <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_6%,transparent),transparent)]"
                aria-hidden="true" />

            <div class="container section-container relative z-10 mx-auto max-w-4xl">
                <AppBreadcrumb :items="breadcrumbItems" />
            </div>
        </section>

        <section class="border-b border-base-300/25 py-10 md:py-14">
            <div class="container section-container mx-auto max-w-4xl">
                <header class="space-y-6 border-l-2 border-primary/40 pl-5 sm:pl-6">
                    <ArticleMeta :article="post" date-style="long" />

                    <div class="space-y-4">
                        <h1
                            class="font-quicksand text-3xl font-bold leading-tight tracking-tight text-base-content sm:text-4xl md:text-[2.75rem]">
                            {{ post.title }}
                        </h1>
                        <p v-if="post.description" class="text-lg leading-relaxed text-base-content/75 md:text-xl">
                            {{ post.description }}
                        </p>
                    </div>

                    <ArticleTags v-if="post.tags?.length" :tags="post.tags" />
                </header>
            </div>
        </section>

        <div class="py-10 md:py-14">
            <div class="container section-container mx-auto max-w-6xl">
                <div class="grid gap-10 lg:grid-cols-12 lg:gap-12" :class="hasToc ? '' : 'lg:block'">
                    <aside v-if="hasToc" class="lg:col-span-3 xl:col-span-3">
                        <nav class="sticky top-24 rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur"
                            aria-label="Table of contents">
                            <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                                On this page
                            </p>
                            <ul class="space-y-2 text-sm">
                                <li v-for="link in tocLinks" :key="link.id"
                                    :style="{ paddingInlineStart: `${(link.depth - 2) * 0.75}rem` }">
                                    <a :href="`#${link.id}`"
                                        class="block rounded-md px-2 py-1 text-base-content/65 transition-colors hover:bg-base-200/50 hover:text-primary">
                                        {{ link.text }}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    <article class="min-w-0" :class="hasToc ? 'lg:col-span-9' : 'mx-auto max-w-3xl'">
                        <div
                            class="article-prose rounded-2xl border border-base-300/30 bg-base-100/30 p-6 sm:p-8 md:p-10 backdrop-blur">
                            <ContentRenderer :value="post" />
                        </div>

                        <div v-if="prevArticle || nextArticle" class="mt-10 grid gap-4 sm:grid-cols-2">
                            <NuxtLink v-if="prevArticle" :to="prevArticle._path"
                                class="group rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur transition-all hover:border-primary/35 hover:shadow-lg hover:shadow-primary/[0.06]">
                                <span
                                    class="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                                    <Icon name="fluent:arrow-left-24-regular" class="h-3.5 w-3.5" aria-hidden="true" />
                                    Previous
                                </span>
                                <p
                                    class="mt-2 font-quicksand text-base font-bold text-base-content transition-colors group-hover:text-primary line-clamp-2">
                                    {{ prevArticle.title }}
                                </p>
                            </NuxtLink>
                            <div v-else class="hidden sm:block" />

                            <NuxtLink v-if="nextArticle" :to="nextArticle._path"
                                class="group rounded-2xl border border-base-300/40 bg-base-100/50 p-5 text-end backdrop-blur transition-all hover:border-secondary/35 hover:shadow-lg hover:shadow-secondary/[0.06] sm:col-start-2">
                                <span
                                    class="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                                    Next
                                    <Icon name="fluent:arrow-right-24-regular" class="h-3.5 w-3.5" aria-hidden="true" />
                                </span>
                                <p
                                    class="mt-2 font-quicksand text-base font-bold text-base-content transition-colors group-hover:text-primary line-clamp-2">
                                    {{ nextArticle.title }}
                                </p>
                            </NuxtLink>
                        </div>
                    </article>
                </div>
            </div>
        </div>

        <section v-if="relatedArticles.length" class="border-t border-base-300/25 py-12 md:py-16">
            <div class="container section-container mx-auto max-w-6xl">
                <header class="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p class="blog-eyebrow mb-2">Keep reading</p>
                        <h2 class="font-quicksand text-2xl font-bold text-base-content">
                            Related articles
                        </h2>
                    </div>
                    <NuxtLink to="/blog"
                        class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                        All posts
                        <Icon name="fluent:arrow-right-24-regular" class="h-4 w-4" aria-hidden="true" />
                    </NuxtLink>
                </header>

                <div class="grid gap-6 md:grid-cols-2">
                    <NuxtLink v-for="(post, index) in relatedArticles" :key="post._path" :to="post._path"
                        class="blog-related-card group overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 p-6 backdrop-blur transition-all"
                        :class="articleCardHoverClass(index)">
                        <ArticleMeta :article="post" date-style="short" class="mb-3" />
                        <h3
                            class="font-quicksand text-lg font-bold leading-snug text-base-content transition-colors group-hover:text-primary line-clamp-2">
                            {{ post.title }}
                        </h3>
                        <p class="mt-2 text-sm leading-relaxed text-base-content/70 line-clamp-2">
                            {{ post.description }}
                        </p>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <section class="border-t border-base-300/25 py-12 md:py-16">
            <div class="container section-container mx-auto max-w-5xl">
                <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-8 text-center backdrop-blur sm:p-10">
                    <h2 class="font-quicksand text-2xl font-bold text-base-content">
                        Let's work together
                    </h2>
                    <p class="mx-auto mt-3 max-w-md text-base-content/70">
                        Have a project or question? I'd love to hear from you.
                    </p>
                    <div class="mt-8 flex flex-wrap justify-center gap-4">
                        <button type="button"
                            class="inline-flex items-center gap-2 rounded-xl border-2 border-base-300/40 bg-base-100 px-6 py-3 text-sm font-semibold text-base-content transition-all hover:border-primary/50 hover:bg-primary/5"
                            :class="copyDone ? 'border-success/40 text-success' : ''" @click="copyArticleLink">
                            <Icon :name="copyDone ? 'fluent:checkmark-24-regular' : 'fluent:link-24-regular'"
                                class="h-4 w-4" aria-hidden="true" />
                            {{ copyDone ? 'Link copied' : 'Copy link' }}
                        </button>
                        <NuxtLink to="/contact"
                            class="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-8 py-3 font-semibold text-primary-content transition-all hover:shadow-lg hover:shadow-primary/30">
                            <Icon name="fluent:mail-24-regular" class="h-4 w-4" aria-hidden="true" />
                            Get in touch
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '~/composables/useBreadcrumbSchema'
import { articleCardHoverClass, type BlogArticleMeta } from '~/composables/useBlogUi'

const { path } = useRoute()

const { data: article } = await useAsyncData(`blog-${path}`, () =>
    queryContent<BlogArticleMeta>().where({ _path: path }).findOne(),
)

if (!article.value) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const post = article.value

useHead({
    title: `${post.title} — Ali HD`,
    meta: [
        { name: 'description', content: post.description || '' },
    ],
})

const { data: allArticles } = await useAsyncData('all-blog-articles', () =>
    queryContent<BlogArticleMeta>('/blog').sort({ date: -1 }).find(),
)

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: post.title ?? 'Article' },
])

const sortedArticles = computed(() => allArticles.value ?? [])

const currentIndex = computed(() =>
    sortedArticles.value.findIndex((a) => a._path === path),
)

const prevArticle = computed(() => {
    const idx = currentIndex.value
    if (idx < 0) return null
    return sortedArticles.value[idx + 1] ?? null
})

const nextArticle = computed(() => {
    const idx = currentIndex.value
    if (idx <= 0) return null
    return sortedArticles.value[idx - 1] ?? null
})

const relatedArticles = computed(() => {
    if (!allArticles.value?.length) return []
    const current = post

    const currentTags = new Set(current.tags ?? [])

    return allArticles.value
        .filter((a) => a._path !== path)
        .map((a) => {
            const shared = (a.tags ?? []).filter((t: string) => currentTags.has(t)).length
            return { article: a, score: shared }
        })
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score
            const bTime = b.article.date ? new Date(b.article.date).getTime() : 0
            const aTime = a.article.date ? new Date(a.article.date).getTime() : 0
            return bTime - aTime
        })
        .slice(0, 2)
        .map(({ article: a }) => a)
})

const tocLinks = computed(() => {
    return post.body?.toc?.links?.filter((l) => l.depth >= 2 && l.depth <= 3) ?? []
})

const hasToc = computed(() => tocLinks.value.length > 0)

const readingProgress = ref(0)
const copyDone = ref(false)

function updateReadingProgress() {
    const doc = document.documentElement
    const scrollTop = doc.scrollTop
    const height = doc.scrollHeight - doc.clientHeight
    readingProgress.value = height > 0 ? Math.min(1, scrollTop / height) : 0
}

async function copyArticleLink() {
    if (!import.meta.client) return
    const url = window.location.href
    try {
        await navigator.clipboard.writeText(url)
        copyDone.value = true
        window.setTimeout(() => { copyDone.value = false }, 2000)
    } catch {
        /* clipboard unavailable */
    }
}

onMounted(() => {
    updateReadingProgress()
    window.addEventListener('scroll', updateReadingProgress, { passive: true })
})

onUnmounted(() => {
    if (import.meta.client) {
        window.removeEventListener('scroll', updateReadingProgress)
    }
})
</script>

<style scoped>
.blog-eyebrow {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-primary) 88%, var(--fallback-bc, oklch(var(--bc))));
}

.reading-progress {
    transform: scaleX(0);
}

.blog-related-card:hover {
    transform: translateY(-2px);
}

.article-prose {
    font-size: 1.0625rem;
    line-height: 1.75;
    color: color-mix(in srgb, var(--color-base-content) 82%, transparent);
}
</style>
