<template>
  <div class="section-container section-padding">
    <article class="max-w-3xl mx-auto">
      <div class="mb-8">
        <NuxtLink to="/blog" class="btn btn-ghost btn-sm gap-1 mb-4">
          <Icon name="ph:arrow-left-bold" />
          Back to Blog
        </NuxtLink>
        <div class="flex items-center gap-2 text-xs text-base-content/50 mb-2">
          <time v-if="article.date" :datetime="article.date">{{ formatDate(article.date) }}</time>
          <span v-if="article.complexity" class="badge badge-outline badge-sm">{{ article.complexity }}</span>
          <span v-if="article.readingTime" class="badge badge-ghost badge-sm">{{ article.readingTime }} min read</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-display font-bold">{{ article.title }}</h1>
        <p v-if="article.description" class="text-base-content/60 mt-2">{{ article.description }}</p>
      </div>

      <div class="prose prose-lg max-w-none">
        <ContentRenderer :value="article" />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { SITE_URL } from '~/utils/site'

const { path } = useRoute()

const { data: article } = await useAsyncData(`blog-${path}`, () =>
  queryContent().where({ _path: path }).findOne(),
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const post = article.value
const articlePath = post._path as string
const publishedTime = post.date ? new Date(post.date).toISOString() : undefined
const title = `${post.title} — Ali HD`

useSiteSeo({
  title,
  description: post.description || `Article by Ali HD: ${post.title}`,
  path: articlePath,
  type: 'article',
  keywords: post.tags?.join(', '),
  article: {
    publishedTime,
    tags: post.tags,
  },
  jsonLd: {
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}${articlePath}#article`,
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}${articlePath}`,
    mainEntityOfPage: `${SITE_URL}${articlePath}`,
    datePublished: publishedTime,
    author: personRef(),
    publisher: personRef(),
    inLanguage: 'en-US',
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
  },
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
