<template>
  <nav class="navbar glass sticky top-0 z-50 px-4 lg:px-8">
    <div class="navbar-start">
      <NuxtLink to="/" class="text-xl font-display font-bold tracking-tight">
        <span class="text-primary">Ali</span><span class="text-base-content">HD</span>
      </NuxtLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal gap-1 text-sm font-medium">
        <li v-for="item in navItems" :key="item.href">
          <NuxtLink
            :to="item.href"
            class="rounded-lg transition-colors hover:text-primary"
            active-class="text-primary bg-primary/10"
          >
            <Icon :name="item.icon" class="text-base" />
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="navbar-end gap-2">
      <button
        class="btn btn-ghost btn-circle btn-sm"
        @click="store.toggleTheme"
        :aria-label="store.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <Icon :name="store.isDark ? 'ph:sun-bold' : 'ph:moon-bold'" class="text-lg" />
      </button>

      <ComplexitySelector class="hidden sm:flex" />

      <div class="lg:hidden">
        <button
          class="btn btn-ghost btn-circle btn-sm"
          @click="store.toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <Icon :name="store.mobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="text-lg" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="slide">
        <div
          v-if="store.mobileMenuOpen"
          class="fixed inset-0 top-16 z-40 bg-base-100/95 backdrop-blur-lg lg:hidden"
        >
          <ul class="menu p-4 gap-2 text-lg">
            <li v-for="item in navItems" :key="item.href">
              <NuxtLink
                :to="item.href"
                class="rounded-lg"
                @click="store.closeMobileMenu"
              >
                <Icon :name="item.icon" class="text-xl" />
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
          <div class="px-4 pt-2">
            <ComplexitySelector />
          </div>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types'

const store = useAppStore()

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: 'ph:house-bold' },
  { label: 'About', href: '/about', icon: 'ph:user-bold' },
  { label: 'Projects', href: '/projects', icon: 'ph:folder-bold' },
  { label: 'Blog', href: '/blog', icon: 'ph:article-bold' },
  { label: 'Contact', href: '/contact', icon: 'ph:envelope-bold' },
]
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
