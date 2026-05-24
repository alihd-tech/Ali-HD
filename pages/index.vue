<template>
  <div id="top" class="index-page relative w-full min-h-0 self-start text-left">
    <div id="main-content" tabindex="-1" class="relative z-[1] outline-none">
      <!-- Hero -->
      <section
        aria-labelledby="hero-heading"
        class="hero-section relative overflow-hidden border-b border-base-300/25 pb-12 pt-16 sm:pb-14 sm:pt-12 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16"
      > 

        <div class="container relative z-10 mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-10 lg:px-8">
          <div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            <div class="order-2 space-y-8 lg:order-1 lg:col-span-7">
              <header class="hero-heading space-y-6 sm:space-y-7">
                <div class="hero-heading-meta flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
                  <span class="hero-pill">Cross Stack Engineer</span> 
                </div>

                <h1 id="hero-heading" class="hero-title">
                  <span class="hero-title-name">Ali HD</span> 
                  <span class="hero-title-accent">Building Systems Differently</span>
                </h1>
              </header>

              <div class="hero-taglines space-y-4 sm:space-y-5">
                <div
                  v-for="tagline in heroTaglines"
                  :key="tagline.line"
                  class="hero-tagline"
                >
                  <p class="font-quicksand text-lg font-semibold leading-snug text-base-content/90 sm:text-xl">
                    {{ tagline.line }}
                  </p>
                  <ul
                    v-if="isNerd"
                    class="hero-tagline-details mt-2 space-y-0.5 pl-4 text-sm leading-relaxed text-base-content/60"
                  >
                    <li
                      v-for="detail in tagline.details"
                      :key="detail"
                    >
                      {{ detail }}
                    </li>
                  </ul>
                </div>
              </div>

              
            </div>

            <aside class="order-2 lg:col-span-5">
              
              <UiCustomizerPanel class="relative" />
            </aside>
          </div>
        </div>
      </section>

      <!-- Blog -->
      <section
        v-if="articles?.length"
        id="blog"
        aria-labelledby="blog-heading"
        class="blog-section relative scroll-mt-20 overflow-hidden border-b border-base-300/25 py-12 sm:py-14 md:py-16 lg:py-20"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_0%_50%,color-mix(in_srgb,var(--color-primary)_6%,transparent),transparent),radial-gradient(ellipse_50%_40%_at_100%_80%,color-mix(in_srgb,var(--color-secondary)_5%,transparent),transparent)]"
          aria-hidden="true"
        />

        <div class="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header class="index-section-header mb-10 md:mb-12 lg:mb-14">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div class="max-w-2xl space-y-3">
                <p class="index-eyebrow">Reading</p>
                <h2
                  id="blog-heading"
                  class="font-quicksand text-2xl font-bold tracking-tight text-base-content sm:text-3xl lg:text-[2rem]"
                >
                  Engineering
                  <span
                    class="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent"
                  >thoughts</span>
                </h2>
                <p class="text-base leading-relaxed text-base-content/70 md:text-[1.0625rem]">
                  Architecture decisions, scaling systems, frontend patterns, and the philosophy behind
                  shipping products.
                </p>
              </div>

              <NuxtLink
                to="/blog"
                class="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-base-300/40 bg-base-100/50 px-5 py-2.5 text-sm font-semibold text-base-content backdrop-blur transition-colors hover:border-primary/35 hover:text-primary lg:self-end"
              >
                View all articles
                <Icon name="fluent:arrow-right-24-regular" class="h-4 w-4" aria-hidden="true" />
              </NuxtLink>
            </div>
          </header>

          <article
            v-if="featuredArticle"
            class="group relative mb-10 overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 backdrop-blur transition-all hover:border-primary/35 hover:shadow-xl hover:shadow-primary/[0.08] md:mb-12"
          >
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-secondary/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <NuxtLink :to="featuredArticle._path" class="relative block p-6 sm:p-8 md:p-10">
              <div class="mb-4 flex flex-wrap items-center gap-2">
                <span
                  class="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
                >
                  Latest
                </span>
                <ArticleMeta :article="featuredArticle" date-style="short" />
              </div>

              <h3
                class="font-quicksand text-2xl font-bold leading-snug text-base-content transition-colors group-hover:text-primary sm:text-3xl md:text-4xl"
              >
                {{ featuredArticle.title }}
              </h3>

              <p class="mt-4 max-w-3xl text-base leading-relaxed text-base-content/70 md:text-lg">
                {{ featuredArticle.description }}
              </p>

              <ArticleTags
                v-if="featuredArticle.tags?.length"
                :tags="featuredArticle.tags"
                class="mt-6"
              />

              <span class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read article
                <Icon
                  name="fluent:arrow-right-24-regular"
                  class="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </NuxtLink>
          </article>

          <div
            v-if="remainingArticles.length"
            class="mb-8 flex items-end justify-between gap-4 border-b border-base-300/25 pb-4"
          >
            <h3 class="font-quicksand text-xl font-bold text-base-content sm:text-2xl">
              More articles
            </h3>
            <span class="text-sm text-base-content/50">
              {{ remainingArticles.length }} more
            </span>
          </div>

          <div v-if="remainingArticles.length" class="grid gap-6 md:grid-cols-2">
            <article
              v-for="(article, index) in remainingArticles"
              :key="article._path"
              class="blog-card group relative overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 backdrop-blur transition-all"
              :class="articleCardHoverClass(index)"
            >
              <span
                class="pointer-events-none absolute -end-1 -top-2 select-none font-ace text-[3.5rem] font-bold leading-none text-base-content/[0.04] sm:text-[4rem]"
                aria-hidden="true"
              >
                {{ articleIndexLabel(index + 1) }}
              </span>

              <NuxtLink :to="article._path" class="relative flex h-full flex-col p-6 sm:p-7">
                <ArticleMeta :article="article" date-style="short" class="mb-4" />

                <h3
                  class="font-quicksand text-xl font-bold leading-snug text-base-content transition-colors group-hover:text-primary"
                >
                  {{ article.title }}
                </h3>

                <p class="mt-3 flex-1 text-sm leading-relaxed text-base-content/70 line-clamp-3">
                  {{ article.description }}
                </p>

                <ArticleTags
                  v-if="article.tags?.length"
                  :tags="article.tags"
                  :max="3"
                  class="mt-5"
                />

                <div class="mt-5 flex items-center justify-between border-t border-base-300/25 pt-4">
                  <span
                    class="text-sm font-medium text-base-content/50 transition-colors group-hover:text-primary"
                  >
                    Read more
                  </span>
                  <Icon
                    name="fluent:arrow-right-24-regular"
                    class="h-5 w-5 text-base-content/25 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { articleCardHoverClass } from '~/composables/useBlogUi'

const store = useAppStore()
const isNerd = computed(() => store.nerd)

const heroTaglines = [
  {
    line: 'I can Build anything, so does the AI.',
    details: [
      'Full-stack apps with Nuxt, Vue, and TypeScript',
      'APIs, workers, and edge-ready backends',
    ],
  },
  {
    line: 'I can Design anything, so does the AI.',
    details: [
      'Design systems, tokens, and component libraries',
      'Flows, accessibility, and interaction patterns',
    ],
  },
  {
    line: "But Orchestration — that's my thing.",
    details: [
      'Services, data, and deploy pipelines in sync',
      'Human + AI workflows with clear ownership',
    ],
  },
] as const

const { articles } = await useBlogArticles()

const featuredArticle = computed(() => articles.value?.[0])
const remainingArticles = computed(() => articles.value?.slice(1) ?? [])

function articleIndexLabel(index: number) {
  return String(index + 1).padStart(2, '0')
}
</script>

<style scoped>
.index-eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 88%, var(--fallback-bc, oklch(var(--bc))));
}

.hero-section {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 35%, transparent),
    transparent 42%
  );
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.35rem 0.85rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 92%, var(--fallback-bc, oklch(var(--bc))));
  border: 1px solid color-mix(in srgb, var(--color-primary) 28%, transparent);
  border-radius: 9999px;
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  max-width: 36rem;
}

.hero-title-name {
  display: block;
  font-family: 'Bruno Ace SC', monospace;
  font-size: clamp(2.35rem, 6.5vw, 3.85rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: var(--color-primary);
  text-wrap: balance;
}

.hero-title-rule {
  display: block;
  width: 3.25rem;
  height: 3px;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    var(--color-primary, #ffac00),
    color-mix(in srgb, var(--color-primary, #a100fc) 85%, transparent)
  );
}

.hero-tagline-details {
  list-style: none;
}

.hero-tagline-details li {
  position: relative;
  padding-left: 0.75rem;
}

.hero-tagline-details li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: color-mix(in srgb, var(--color-primary) 55%, var(--fallback-bc, oklch(var(--bc))));
}

.hero-title-accent {
  display: block;
  max-width: 28rem;
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(1.35rem, 3.2vw, 1.9rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  background: var(--color-primary, #ffac00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-wrap: balance;
}

@media (min-width: 640px) {
  .hero-title {
    gap: 0.85rem;
  }

  .hero-title-rule {
    width: 4.5rem;
  }
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

@media (prefers-reduced-motion: reduce) {
  .blog-card,
  .blog-card:hover {
    transform: none;
    transition: none;
  }
}
</style>
