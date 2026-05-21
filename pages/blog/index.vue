<template>
    <div class="min-h-screen bg-base-100">
        <section class="relative overflow-hidden border-b border-base-300/25 py-16 md:py-24">
            <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_5%,transparent),transparent),radial-gradient(ellipse_50%_40%_at_100%_80%,color-mix(in_srgb,var(--color-secondary)_4%,transparent),transparent)]"
                aria-hidden="true" />

            <div class="container section-container relative z-10 mx-auto max-w-6xl">
                <AppBreadcrumb :items="breadcrumbItems" class="mb-6" />

                <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
                    <div class="space-y-6 lg:col-span-8">
                        <p class="blog-eyebrow">Reading</p>
                        <h1 class="font-quicksand text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                            Engineering
                            <span
                                class="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent">thoughts</span>
                        </h1>
                        <p class="max-w-2xl text-lg leading-relaxed text-base-content/75 md:text-xl">
                            Architecture decisions, scaling systems, frontend patterns, and the philosophy behind
                            shipping products.
                        </p>
                    </div>

                    <aside v-if="articles?.length" class="lg:col-span-4">
                        <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur sm:p-6">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                                    <Icon name="fluent:book-open-24-regular" class="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <p class="text-2xl font-bold tabular-nums text-base-content">
                                        {{ articles.length }}
                                    </p>
                                    <p class="text-sm text-base-content/60">
                                        {{ articles.length === 1 ? 'article' : 'articles' }} published
                                    </p>
                                </div>
                            </div>
                            <p class="mt-4 text-sm leading-relaxed text-base-content/55">
                                Depth matches your
                                <span class="font-medium text-base-content/80">{{ store.complexity.title }}</span>
                                setting — change it in the keypad on the home page.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

        <section class="py-12 md:py-20">
            <div class="container section-container relative z-10 mx-auto max-w-6xl">
                <template v-if="articles?.length">
                    <article v-if="featuredArticle"
                        class="group relative mb-10 overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 backdrop-blur transition-all hover:border-primary/35 hover:shadow-xl hover:shadow-primary/[0.08] md:mb-12">
                        <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-secondary/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            aria-hidden="true" />
                        <NuxtLink :to="featuredArticle._path" class="relative block p-6 sm:p-8 md:p-10">
                            <div class="mb-4 flex flex-wrap items-center gap-2">
                                <span
                                    class="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                                    Latest
                                </span>
                                <ArticleMeta :article="featuredArticle" date-style="short" />
                            </div>

                            <h2
                                class="font-quicksand text-2xl font-bold leading-snug text-base-content transition-colors group-hover:text-primary sm:text-3xl md:text-4xl">
                                {{ featuredArticle.title }}
                            </h2>

                            <p class="mt-4 max-w-3xl text-base leading-relaxed text-base-content/70 md:text-lg">
                                {{ featuredArticle.description }}
                            </p>

                            <ArticleTags v-if="featuredArticle.tags?.length" :tags="featuredArticle.tags"
                                class="mt-6" />

                            <span class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                Read article
                                <Icon name="fluent:arrow-right-24-regular"
                                    class="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </NuxtLink>
                    </article>

                    <div v-if="remainingArticles.length"
                        class="mb-8 flex items-end justify-between gap-4 border-b border-base-300/25 pb-4">
                        <h2 class="font-quicksand text-xl font-bold text-base-content sm:text-2xl">
                            All articles
                        </h2>
                        <span class="text-sm text-base-content/50">
                            {{ remainingArticles.length }} more
                        </span>
                    </div>

                    <div class="grid gap-6 md:grid-cols-2">
                        <article v-for="(article, index) in remainingArticles" :key="article._path"
                            class="blog-card group relative overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 backdrop-blur transition-all"
                            :class="articleCardHoverClass(index)">
                            <span
                                class="pointer-events-none absolute -end-1 -top-2 select-none font-ace text-[3.5rem] font-bold leading-none text-base-content/[0.04] sm:text-[4rem]"
                                aria-hidden="true">
                                {{ articleIndexLabel(index + 1) }}
                            </span>

                            <NuxtLink :to="article._path" class="relative flex h-full flex-col p-6 sm:p-7">
                                <ArticleMeta :article="article" date-style="short" class="mb-4" />

                                <h3
                                    class="font-quicksand text-xl font-bold leading-snug text-base-content transition-colors group-hover:text-primary">
                                    {{ article.title }}
                                </h3>

                                <p class="mt-3 flex-1 text-sm leading-relaxed text-base-content/70 line-clamp-3">
                                    {{ article.description }}
                                </p>

                                <ArticleTags v-if="article.tags?.length" :tags="article.tags" :max="3" class="mt-5" />

                                <div class="mt-5 flex items-center justify-between border-t border-base-300/25 pt-4">
                                    <span
                                        class="text-sm font-medium text-base-content/50 group-hover:text-primary transition-colors">
                                        Read more
                                    </span>
                                    <Icon name="fluent:arrow-right-24-regular"
                                        class="h-5 w-5 text-base-content/25 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                                        aria-hidden="true" />
                                </div>
                            </NuxtLink>
                        </article>
                    </div>
                </template>

                <div v-else
                    class="rounded-2xl border border-dashed border-base-300/50 bg-base-100/30 px-6 py-16 text-center backdrop-blur sm:py-20">
                    <div
                        class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-base-300/40 bg-base-200/40">
                        <Icon name="fluent:document-24-regular" class="h-7 w-7 text-base-content/25"
                            aria-hidden="true" />
                    </div>
                    <h2 class="font-quicksand text-xl font-bold text-base-content">
                        No articles yet
                    </h2>
                    <p class="mx-auto mt-2 max-w-sm text-base-content/55">
                        New posts will show up here. Try a different complexity level on the home page keypad.
                    </p>
                    <NuxtLink to="/"
                        class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                        <Icon name="fluent:home-16-regular" class="h-4 w-4" aria-hidden="true" />
                        Back to home
                    </NuxtLink>
                </div>
            </div>
        </section>

        <section class="border-t border-base-300/25 py-12 md:py-16">
            <div class="container section-container relative z-10 mx-auto max-w-5xl">
                <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-8 text-center backdrop-blur sm:p-10">
                    <h2 class="font-quicksand text-2xl font-bold text-base-content">
                        More to explore
                    </h2>
                    <p class="mx-auto mt-3 max-w-md text-base-content/70">
                        See shipped work and learn more about how I build.
                    </p>
                    <div class="mt-8 flex flex-wrap justify-center gap-4">
                        <NuxtLink to="/projects"
                            class="inline-flex items-center gap-2 rounded-xl border-2 border-base-300/40 bg-base-100 px-6 py-3 font-semibold text-base-content transition-all hover:border-primary/50 hover:bg-primary/5">
                            <Icon name="fluent:folder-24-regular" class="h-4 w-4" aria-hidden="true" />
                            Projects
                        </NuxtLink>
                        <NuxtLink to="/about"
                            class="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-6 py-3 font-semibold text-primary-content transition-all hover:shadow-lg hover:shadow-primary/30">
                            <Icon name="fluent:person-24-regular" class="h-4 w-4" aria-hidden="true" />
                            About me
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

useHead({ title: 'Blog — Ali HD' })

const store = useAppStore()

const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', to: '/' },
    { label: 'Blog' },
]

const { data: articles } = await useAsyncData('blog-articles', () =>
    queryContent<BlogArticleMeta>('/blog')
        .where({ complexity: { $in: [store.complexity.slug, undefined] } } as any)
        .sort({ date: -1 })
        .find(),
)

watch(() => store.complexity.slug, async () => {
    articles.value = await queryContent<BlogArticleMeta>('/blog')
        .where({ complexity: { $in: [store.complexity.slug, undefined] } } as any)
        .sort({ date: -1 })
        .find()
})

const featuredArticle = computed(() => articles.value?.[0])
const remainingArticles = computed(() => articles.value?.slice(1) ?? [])

function articleIndexLabel(index: number) {
    return String(index + 1).padStart(2, '0')
}
</script>

<style scoped>
.blog-eyebrow {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-primary) 88%, var(--fallback-bc, oklch(var(--bc))));
}

.blog-card {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition:
        border-color 0.35s ease,
        box-shadow 0.35s ease,
        transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.blog-card:hover {
    transform: translateY(-2px);
}
</style>
