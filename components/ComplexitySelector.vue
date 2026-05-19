<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" class="btn btn-ghost btn-sm gap-1 text-xs font-medium" role="button">
      <Icon name="ph:sliders-horizontal-bold" class="text-sm" />
      {{ store.complexity.title }}
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-200 rounded-box z-[1] w-64 p-2 shadow-xl border border-base-300"
    >
      <li class="menu-title text-xs uppercase tracking-wider">Reading Complexity</li>
      <li v-for="c in complexities" :key="c.slug">
        <button
          class="flex flex-col items-start gap-0"
          :class="{ active: store.complexity.slug === c.slug }"
          @click="store.setComplexity(c.slug)"
        >
          <span class="font-semibold text-sm">{{ c.title }}</span>
          <span class="text-xs text-base-content/60">{{ c.description }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { complexities } from '~/types'

const store = useAppStore()
</script>
