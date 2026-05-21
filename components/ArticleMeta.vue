<template>
  <div
    class="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm"
  >
    <time
      :datetime="article.date ?? undefined"
      class="inline-flex items-center gap-1.5 font-medium text-base-content/60"
    >
      <Icon name="fluent:calendar-24-regular" class="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
      {{ article.date ? formatBlogDate(article.date, dateStyle) : '' }}
    </time>

    <span
      v-if="article.readingTime"
      class="inline-flex items-center gap-1.5 font-medium text-base-content/60"
    >
      <span class="text-base-content/30" aria-hidden="true">&middot;</span>
      <Icon name="fluent:clock-24-regular" class="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
      {{ article.readingTime }} min read
    </span>

    <span
      v-if="article.complexity"
      class="inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
      :class="complexityBadgeClass(article.complexity)"
    >
      {{ article.complexity }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { complexityBadgeClass, formatBlogDate, type BlogArticleMeta } from '~/composables/useBlogUi'

withDefaults(
  defineProps<{
    article: BlogArticleMeta
    dateStyle?: 'short' | 'long'
  }>(),
  {
    dateStyle: 'short',
  },
)
</script>
