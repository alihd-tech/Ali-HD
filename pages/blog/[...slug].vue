<template>
    <div class="min-h-screen bg-base-100">
        <div
            class="reading-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-info shadow-sm shadow-primary/20 transition-transform duration-150"
            :style="{ transform: `scaleX(${readingProgress})` }"
            aria-hidden="true"
        />

        <!-- Hero -->
        <section class="relative overflow-hidden border-b border-base-300/25">
            <div
                class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_6%,transparent),transparent),radial-gradient(ellipse_50%_40%_at_100%_80%,color-mix(in_srgb,var(--color-secondary)_4%,transparent),transparent)]"
                aria-hidden="true"
            />

            <div class="container section-container relative z-10 mx-auto max-w-6xl py-6 md:py-10">
                <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <AppBreadcrumb :items="breadcrumbItems" />
                    <NuxtLink
                        to="/blog"
                        class="inline-flex items-center gap-1.5 rounded-lg border border-base-300/40 bg-base-100/50 px-3 py-1.5 text-sm font-semibold text-base-content/70 backdrop-blur transition-colors hover:border-primary/35 hover:text-primary"
                    >
                        <Icon name="fluent:arrow-left-24-regular" class="h-4 w-4" aria-hidden="true" />
                        All posts
                    </NuxtLink>
                </div>

                <header class="relative">
                    <span
                        v-if="articleIndexLabel"
                        class="pointer-events-none absolute -end-2 -top-4 select-none font-ace text-[4.5rem] font-bold leading-none text-base-content/[0.04] sm:-end-4 sm:text-[6rem] md:text-[7rem]"
                        aria-hidden="true"
                    >
                        {{ articleIndexLabel }}
                    </span>

                    <div
                        :key="`article-header-${isNerd ? 'nerd' : 'plain'}`"
                        class="relative max-w-4xl space-y-6"
                    >
                        <p class="blog-eyebrow">Article</p>

                        <div class="space-y-4">
                            <h1
                                class="font-quicksand text-3xl font-bold leading-[1.15] tracking-tight text-base-content sm:text-4xl md:text-[2.75rem] lg:text-5xl"
                            >
                                {{ post?.title }}
                            </h1>
                            <p
                                v-if="post?.description"
                                class="max-w-3xl text-lg leading-relaxed text-base-content/75 md:text-xl md:leading-relaxed"
                            >
                                {{ post.description }}
                            </p>
                        </div>

                        <div class="flex flex-wrap items-center gap-3">
                            <ArticleMeta v-if="post" :article="post" date-style="long" />
                        </div>

                        <ArticleTags v-if="post?.tags?.length" :tags="post.tags" />

                        <div class="flex flex-wrap items-center gap-3 pt-1">
                            <button
                                type="button"
                                class="inline-flex items-center gap-2 rounded-xl border border-base-300/40 bg-base-100/50 px-4 py-2 text-sm font-semibold text-base-content/80 backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                :class="copyDone ? 'border-success/40 text-success' : ''"
                                @click="copyArticleLink"
                            >
                                <Icon
                                    :name="copyDone ? 'fluent:checkmark-24-regular' : 'fluent:link-24-regular'"
                                    class="h-4 w-4"
                                    aria-hidden="true"
                                />
                                {{ copyDone ? 'Copied' : 'Copy link' }}
                            </button>
                            <span
                                v-if="sortedArticles.length > 1"
                                class="text-sm tabular-nums text-base-content/45"
                            >
                                {{ articleIndexLabel }} of {{ String(sortedArticles.length).padStart(2, '0') }}
                            </span>
                        </div>
                    </div>
                </header>
            </div>
        </section>

        <!-- Body -->
        <div class="py-10 md:py-14">
            <div class="container section-container mx-auto max-w-6xl">
                <!-- Mobile TOC -->
                <details
                    v-if="hasToc"
                    class="article-toc-mobile group mb-8 rounded-2xl border border-base-300/40 bg-base-100/50 backdrop-blur lg:hidden"
                >
                    <summary
                        class="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-base-content [&::-webkit-details-marker]:hidden"
                    >
                        <span class="inline-flex items-center gap-2">
                            <Icon name="fluent:text-bullet-list-square-24-regular" class="h-4 w-4 text-primary" aria-hidden="true" />
                            On this page
                            <span class="rounded-full bg-base-200/60 px-2 py-0.5 text-xs font-medium text-base-content/55">
                                {{ tocLinks.length }}
                            </span>
                        </span>
                        <Icon
                            name="fluent:chevron-down-24-regular"
                            class="h-4 w-4 shrink-0 text-base-content/40 transition-transform group-open:rotate-180"
                            aria-hidden="true"
                        />
                    </summary>
                    <nav class="border-t border-base-300/25 px-3 pb-3 pt-2" aria-label="Table of contents">
                        <ul class="space-y-0.5 text-sm">
                            <li
                                v-for="link in tocLinks"
                                :key="link.id"
                                :style="{ paddingInlineStart: `${(link.depth - 2) * 0.75}rem` }"
                            >
                                <a
                                    :href="`#${link.id}`"
                                    class="article-toc-link block rounded-lg px-3 py-2 text-base-content/70 transition-colors hover:bg-base-200/50 hover:text-primary"
                                    :class="activeTocId === link.id ? 'article-toc-link--active' : ''"
                                    @click="onTocClick"
                                >
                                    {{ link.text }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </details>

                <div class="grid gap-10 lg:grid-cols-12 lg:gap-12" :class="hasToc ? '' : 'lg:block'">
                    <aside v-if="hasToc" class="hidden lg:col-span-3 lg:block xl:col-span-3">
                        <nav
                            class="article-toc-sidebar sticky top-24 rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur"
                            aria-label="Table of contents"
                        >
                            <p class="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                                <Icon name="fluent:text-bullet-list-square-24-regular" class="h-3.5 w-3.5" aria-hidden="true" />
                                On this page
                            </p>
                            <ul class="space-y-0.5 text-sm">
                                <li
                                    v-for="link in tocLinks"
                                    :key="link.id"
                                    :style="{ paddingInlineStart: `${(link.depth - 2) * 0.75}rem` }"
                                >
                                    <a
                                        :href="`#${link.id}`"
                                        class="article-toc-link block rounded-lg px-2.5 py-1.5 text-base-content/65 transition-colors hover:bg-base-200/50 hover:text-primary"
                                        :class="activeTocId === link.id ? 'article-toc-link--active' : ''"
                                        @click="onTocClick"
                                    >
                                        {{ link.text }}
                                    </a>
                                </li>
                            </ul>
                            <div class="mt-5 border-t border-base-300/25 pt-4">
                                <p class="text-[11px] font-medium uppercase tracking-wider text-base-content/40">
                                    Reading progress
                                </p>
                                <div class="mt-2 h-1 overflow-hidden rounded-full bg-base-300/40">
                                    <div
                                        class="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-150"
                                        :style="{ width: `${Math.round(readingProgress * 100)}%` }"
                                    />
                                </div>
                            </div>
                        </nav>
                    </aside>

                    <article class="min-w-0" :class="hasToc ? 'lg:col-span-9' : 'mx-auto max-w-3xl'">
                        <div
                            :key="`article-body-${isNerd ? 'nerd' : 'plain'}`"
                            class="article-prose rounded-2xl border border-base-300/30 bg-base-100/30 p-6 shadow-sm shadow-base-300/10 sm:p-8 md:p-10 lg:p-12 backdrop-blur"
                        >
                            <ContentRenderer v-if="post" :value="post" />
                        </div>

                        <div
                            class="mt-8 flex items-center gap-4 text-sm text-base-content/45"
                            aria-hidden="true"
                        >
                            <span class="h-px flex-1 bg-gradient-to-r from-transparent via-base-300/50 to-transparent" />
                            <span class="shrink-0 font-medium uppercase tracking-wider">End of article</span>
                            <span class="h-px flex-1 bg-gradient-to-r from-transparent via-base-300/50 to-transparent" />
                        </div>

                        <nav
                            v-if="prevArticle || nextArticle"
                            class="mt-10 grid gap-4 sm:grid-cols-2"
                            aria-label="Article navigation"
                        >
                            <NuxtLink
                                v-if="prevArticle"
                                :to="prevArticle._path"
                                class="article-nav-card group rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur transition-all hover:border-primary/35 hover:shadow-lg hover:shadow-primary/[0.06]"
                            >
                                <span class="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                                    <Icon name="fluent:arrow-left-24-regular" class="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                                    Previous
                                </span>
                                <p class="mt-2 font-quicksand text-base font-bold leading-snug text-base-content transition-colors group-hover:text-primary line-clamp-2">
                                    {{ prevArticle.title }}
                                </p>
                                <p
                                    v-if="prevArticle.description"
                                    class="mt-1.5 text-sm leading-relaxed text-base-content/60 line-clamp-2"
                                >
                                    {{ prevArticle.description }}
                                </p>
                            </NuxtLink>
                            <div v-else class="hidden sm:block" aria-hidden="true" />

                            <NuxtLink
                                v-if="nextArticle"
                                :to="nextArticle._path"
                                class="article-nav-card group rounded-2xl border border-base-300/40 bg-base-100/50 p-5 text-end backdrop-blur transition-all hover:border-secondary/35 hover:shadow-lg hover:shadow-secondary/[0.06] sm:col-start-2"
                            >
                                <span class="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                                    Next
                                    <Icon name="fluent:arrow-right-24-regular" class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                </span>
                                <p class="mt-2 font-quicksand text-base font-bold leading-snug text-base-content transition-colors group-hover:text-primary line-clamp-2">
                                    {{ nextArticle.title }}
                                </p>
                                <p
                                    v-if="nextArticle.description"
                                    class="mt-1.5 text-sm leading-relaxed text-base-content/60 line-clamp-2"
                                >
                                    {{ nextArticle.description }}
                                </p>
                            </NuxtLink>
                        </nav>
                    </article>
                </div>
            </div>
        </div>

        <!-- Related -->
        <section v-if="relatedArticles.length" class="border-t border-base-300/25 py-12 md:py-16">
            <div class="container section-container mx-auto max-w-6xl">
                <header class="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p class="blog-eyebrow mb-2">Keep reading</p>
                        <h2 class="font-quicksand text-2xl font-bold text-base-content sm:text-3xl">
                            Related articles
                        </h2>
                    </div>
                    <NuxtLink
                        to="/blog"
                        class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                        All posts
                        <Icon name="fluent:arrow-right-24-regular" class="h-4 w-4" aria-hidden="true" />
                    </NuxtLink>
                </header>

                <div class="grid gap-6 md:grid-cols-2">
                    <NuxtLink
                        v-for="(related, index) in relatedArticles"
                        :key="related._path"
                        :to="related._path"
                        class="blog-related-card group relative overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 p-6 backdrop-blur transition-all"
                        :class="articleCardHoverClass(index)"
                    >
                        <span
                            class="pointer-events-none absolute -end-1 -top-2 select-none font-ace text-[3.5rem] font-bold leading-none text-base-content/[0.04]"
                            aria-hidden="true"
                        >
                            {{ String(index + 1).padStart(2, '0') }}
                        </span>
                        <ArticleMeta :article="related" date-style="short" class="relative mb-3" />
                        <h3 class="relative font-quicksand text-lg font-bold leading-snug text-base-content transition-colors group-hover:text-primary line-clamp-2 sm:text-xl">
                            {{ related.title }}
                        </h3>
                        <p class="relative mt-2 text-sm leading-relaxed text-base-content/70 line-clamp-2">
                            {{ related.description }}
                        </p>
                        <span class="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                            Read article
                            <Icon name="fluent:arrow-right-24-regular" class="h-4 w-4" aria-hidden="true" />
                        </span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="border-t border-base-300/25 py-12 md:py-16">
            <div class="container section-container mx-auto max-w-5xl">
                <div class="relative overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 p-8 text-center backdrop-blur sm:p-10 md:p-12">
                    <div
                        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_100%,color-mix(in_srgb,var(--color-primary)_8%,transparent),transparent)]"
                        aria-hidden="true"
                    />
                    <div class="relative">
                        <div
                            class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/20 to-primary/5 text-primary"
                        >
                            <Icon name="fluent:chat-24-regular" class="h-7 w-7" aria-hidden="true" />
                        </div>
                        <h2 class="font-quicksand text-2xl font-bold text-base-content sm:text-3xl">
                            Let's work together
                        </h2>
                        <p class="mx-auto mt-3 max-w-md text-base-content/70">
                            Have a project or question? I'd love to hear from you.
                        </p>
                        <div class="mt-8 flex flex-wrap justify-center gap-4">
                            <button
                                type="button"
                                class="inline-flex items-center gap-2 rounded-xl border-2 border-base-300/40 bg-base-100 px-6 py-3 text-sm font-semibold text-base-content transition-all hover:border-primary/50 hover:bg-primary/5"
                                :class="copyDone ? 'border-success/40 text-success' : ''"
                                @click="copyArticleLink"
                            >
                                <Icon
                                    :name="copyDone ? 'fluent:checkmark-24-regular' : 'fluent:link-24-regular'"
                                    class="h-4 w-4"
                                    aria-hidden="true"
                                />
                                {{ copyDone ? 'Link copied' : 'Copy link' }}
                            </button>
                            <NuxtLink
                                to="/contact"
                                class="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-8 py-3 font-semibold text-primary-content transition-all hover:shadow-lg hover:shadow-primary/30"
                            >
                                <Icon name="fluent:mail-24-regular" class="h-4 w-4" aria-hidden="true" />
                                Get in touch
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '~/composables/useBreadcrumbSchema'
import { blogTopicFromRoute } from '~/composables/useBlogContent'
import { articleCardHoverClass } from '~/composables/useBlogUi'

const route = useRoute()
const path = route.path

const topic = computed(() => blogTopicFromRoute(path))

const { post, isNerd } = await useBlogArticle(topic)

if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useHead({
    title: () => `${post.value?.title ?? 'Article'} — Ali HD`,
    meta: [
        { name: 'description', content: () => post.value?.description || '' },
    ],
})

const { articles: allArticles } = await useBlogArticles()

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: post.value?.title ?? 'Article' },
])

const sortedArticles = computed(() => allArticles.value ?? [])

const currentIndex = computed(() =>
    sortedArticles.value.findIndex((a) => a._path === path),
)

const articleIndexLabel = computed(() => {
    const idx = currentIndex.value
    if (idx < 0) return ''
    return String(idx + 1).padStart(2, '0')
})

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
    const current = post.value
    if (!current) return []

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
    return post.value?.body?.toc?.links?.filter((l) => l.depth >= 2 && l.depth <= 3) ?? []
})

const hasToc = computed(() => tocLinks.value.length > 0)

const readingProgress = ref(0)
const copyDone = ref(false)
const activeTocId = ref<string | null>(null)

let tocObserver: IntersectionObserver | null = null

function updateReadingProgress() {
    const doc = document.documentElement
    const scrollTop = doc.scrollTop
    const height = doc.scrollHeight - doc.clientHeight
    readingProgress.value = height > 0 ? Math.min(1, scrollTop / height) : 0
}

function setupTocObserver() {
    if (!import.meta.client || !tocLinks.value.length) return

    tocObserver?.disconnect()

    const headings = tocLinks.value
        .map((link) => document.getElementById(link.id))
        .filter((el): el is HTMLElement => el != null)

    if (!headings.length) return

    tocObserver = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

            if (visible.length) {
                activeTocId.value = visible[0]!.target.id
                return
            }

            const above = entries
                .filter((e) => e.boundingClientRect.top < 0)
                .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)

            if (above.length) {
                activeTocId.value = above[0]!.target.id
            }
        },
        { rootMargin: '-15% 0px -65% 0px', threshold: [0, 0.25, 1] },
    )

    headings.forEach((heading) => tocObserver!.observe(heading))

    if (!activeTocId.value && headings[0]) {
        activeTocId.value = headings[0].id
    }
}

function onTocClick() {
    if (!import.meta.client) return
    window.setTimeout(updateReadingProgress, 350)
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

watch(
    () => [tocLinks.value, isNerd.value] as const,
    () => {
        if (!import.meta.client) return
        nextTick(() => setupTocObserver())
    },
)

onMounted(() => {
    updateReadingProgress()
    window.addEventListener('scroll', updateReadingProgress, { passive: true })
    nextTick(() => setupTocObserver())
})

onUnmounted(() => {
    if (import.meta.client) {
        window.removeEventListener('scroll', updateReadingProgress)
        tocObserver?.disconnect()
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

.article-toc-link--active {
    color: var(--color-primary);
    background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
    font-weight: 600;
}

.article-nav-card:hover {
    transform: translateY(-2px);
}

.blog-related-card {
    transition:
        border-color 0.35s ease,
        box-shadow 0.35s ease,
        transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.blog-related-card:hover {
    transform: translateY(-2px);
}

.article-prose {
    font-size: 1.0625rem;
    line-height: 1.8;
    color: color-mix(in srgb, var(--color-base-content) 82%, transparent);
}

.article-prose :deep(> *:first-child) {
    margin-top: 0;
}

.article-prose :deep(> *:last-child) {
    margin-bottom: 0;
}

.article-prose :deep(h2) {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    scroll-margin-top: 6rem;
    font-family: 'Quicksand', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: var(--color-base-content);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid color-mix(in srgb, var(--color-base-300) 35%, transparent);
}

.article-prose :deep(h3) {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    scroll-margin-top: 6rem;
    font-family: 'Quicksand', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.35;
    color: color-mix(in srgb, var(--color-base-content) 92%, transparent);
}

.article-prose :deep(p) {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
}

.article-prose :deep(a) {
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--color-primary) 35%, transparent);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s ease;
}

.article-prose :deep(a:hover) {
    text-decoration-color: var(--color-primary);
}

.article-prose :deep(strong) {
    font-weight: 600;
    color: var(--color-base-content);
}

.article-prose :deep(ul),
.article-prose :deep(ol) {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    padding-inline-start: 1.5rem;
}

.article-prose :deep(li) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.article-prose :deep(li::marker) {
    color: color-mix(in srgb, var(--color-primary) 70%, transparent);
}

.article-prose :deep(blockquote) {
    margin: 1.75rem 0;
    padding: 1rem 1.25rem;
    border-inline-start: 3px solid var(--color-primary);
    border-radius: 0 0.75rem 0.75rem 0;
    background: color-mix(in srgb, var(--color-primary) 6%, transparent);
    font-style: italic;
    color: color-mix(in srgb, var(--color-base-content) 75%, transparent);
}

.article-prose :deep(code):not(pre code) {
    padding: 0.15em 0.4em;
    border-radius: 0.375rem;
    font-size: 0.9em;
    background: color-mix(in srgb, var(--color-base-300) 45%, transparent);
    color: color-mix(in srgb, var(--color-base-content) 90%, transparent);
}

.article-prose :deep(pre) {
    margin: 1.75rem 0;
    padding: 1.25rem 1.5rem;
    overflow-x: auto;
    border-radius: 0.875rem;
    border: 1px solid color-mix(in srgb, var(--color-base-300) 40%, transparent);
    background: color-mix(in srgb, var(--color-base-200) 55%, transparent);
    font-size: 0.875rem;
    line-height: 1.65;
}

.article-prose :deep(pre code) {
    padding: 0;
    background: transparent;
    font-size: inherit;
}

.article-prose :deep(hr) {
    margin: 2.5rem 0;
    border: none;
    height: 1px;
    background: linear-gradient(
        to right,
        transparent,
        color-mix(in srgb, var(--color-base-300) 50%, transparent),
        transparent
    );
}

.article-prose :deep(img) {
    margin: 2rem auto;
    max-width: 100%;
    border-radius: 0.875rem;
    border: 1px solid color-mix(in srgb, var(--color-base-300) 35%, transparent);
}
</style>
