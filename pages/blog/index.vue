<template>
  <div class="section-container section-padding">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 class="text-4xl font-display font-bold mb-2">Blog</h1>
          <p class="text-base-content/60">Thoughts on engineering, architecture & the modern web</p>
        </div>
        <ComplexitySelector />
      </div>

      <div class="grid gap-6">
        <NuxtLink
          v-for="article in articles"
          :key="article._path"
          :to="article._path"
          class="card glass rounded-xl card-hover group"
        >
          <div class="card-body">
            <div class="flex items-center gap-2 text-xs text-base-content/50 mb-1">
              <span>{{ formatDate(article.date) }}</span>
              <span v-if="article.complexity" class="badge badge-outline badge-sm">{{ article.complexity }}</span>
              <span v-if="article.readingTime" class="badge badge-ghost badge-sm">{{ article.readingTime }} min read</span>
            </div>
            <h2 class="card-title font-display group-hover:text-primary transition-colors">
              {{ article.title }}
            </h2>
            <p class="text-sm text-base-content/70 line-clamp-2">{{ article.description }}</p>
            <div class="flex flex-wrap gap-1.5 mt-2">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="badge badge-outline badge-sm badge-primary/30"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-if="!articles?.length" class="text-center py-20 text-base-content/50">
        <Icon name="ph:article" class="text-5xl mb-4 block mx-auto" />
        <p class="text-lg">No articles yet. Check back soon.</p>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
import { pageSeo, SITE_URL } from '~/utils/site'

const seo = pageSeo.blog

useSiteSeo({
  ...seo,
  jsonLd: {
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: seo.title,
    description: seo.description,
    isPartOf: websiteRef(),
    publisher: personRef(),
    inLanguage: 'en-US',
  },
})

const store = useAppStore()

const { data: articles } = await useAsyncData('blog-articles', () =>
  queryContent('/blog')
    .where({ complexity: { $in: [store.complexity.slug, undefined] } })
    .sort({ date: -1 })
    .find()
)

watch(() => store.complexity.slug, async () => {
  articles.value = await queryContent('/blog')
    .where({ complexity: { $in: [store.complexity.slug, undefined] } })
    .sort({ date: -1 })
    .find()
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
