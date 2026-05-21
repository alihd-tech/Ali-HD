<template>
  <div
    class="flex flex-wrap gap-2"
  >
    <span
      v-for="(tag, index) in visibleTags"
      :key="tag"
      class="rounded-full border px-2.5 py-1 text-xs font-medium"
      :class="tagBadgeClass(index)"
    >
      {{ tag }}
    </span>
    <span
      v-if="overflowCount > 0"
      class="rounded-full border border-base-300/30 bg-base-200/20 px-2.5 py-1 text-xs font-medium text-base-content/50"
    >
      +{{ overflowCount }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { tagBadgeClass } from '~/composables/useBlogUi'

const props = withDefaults(
  defineProps<{
    tags: string[]
    max?: number
  }>(),
  {
    max: 0,
  },
)

const visibleTags = computed(() => {
  if (!props.max || props.tags.length <= props.max) return props.tags
  return props.tags.slice(0, props.max)
})

const overflowCount = computed(() => {
  if (!props.max || props.tags.length <= props.max) return 0
  return props.tags.length - props.max
})
</script>
