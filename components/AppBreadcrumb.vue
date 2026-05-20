<template>
  <nav
    :aria-label="ariaLabel"
    class="app-breadcrumb"
  >
    <ol
      class="inline-flex max-w-full flex-wrap items-center gap-1 rounded-xl border border-base-300/35 bg-base-100/40 px-2.5 py-1.5 text-[13px] leading-snug shadow-sm backdrop-blur-sm sm:gap-1.5 sm:px-3 sm:py-2"
    >
      <li
        v-for="(item, index) in items"
        :key="`${item.label}-${index}`"
        class="inline-flex min-w-0 max-w-full items-center gap-1 sm:gap-1.5"
      >
        <Icon
          v-if="index > 0"
          name="fluent:chevron-right-12-regular"
          class="shrink-0 text-base-content/35"
          width="12"
          height="12"
          aria-hidden="true"
        />

        <NuxtLink
          v-if="!isCurrent(index)"
          :to="item.to!"
          class="inline-flex min-w-0 max-w-full items-center gap-1 rounded-md px-1 py-0.5 font-medium text-base-content/65 transition-colors hover:bg-base-200/50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary/50"
        >
          <Icon
            v-if="index === 0"
            name="fluent:home-16-regular"
            class="shrink-0"
            width="14"
            height="14"
            aria-hidden="true"
          />
          <span class="truncate">{{ item.label }}</span>
        </NuxtLink>

        <span
          v-else
          class="inline-flex min-w-0 max-w-full items-center gap-1 truncate rounded-md px-1 py-0.5 font-semibold text-primary"
          aria-current="page"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '~/composables/useBreadcrumbSchema'

const props = withDefaults(
  defineProps<{
    items: BreadcrumbItem[]
    ariaLabel?: string
  }>(),
  {
    ariaLabel: 'Breadcrumb',
  },
)

useBreadcrumbSchema(() => props.items)

function isCurrent(index: number) {
  return index === props.items.length - 1
}
</script>
