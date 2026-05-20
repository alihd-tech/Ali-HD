import { defineStore } from 'pinia'
import { complexities, type Complexity } from '~/types'

export type ColorAccent = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

export const colorAccentMap: Record<ColorAccent, { label: string; cssClass: string; hex: string }> = {
  primary: { label: 'Amber', cssClass: 'text-primary', hex: '#FFAC00' },
  secondary: { label: 'Violet', cssClass: 'text-secondary', hex: '#a100fc' },
  info: { label: 'Sky', cssClass: 'text-info', hex: '#3abff8' },
  success: { label: 'Green', cssClass: 'text-success', hex: '#36d399' },
  warning: { label: 'Gold', cssClass: 'text-warning', hex: '#fbbd23' },
  error: { label: 'Rose', cssClass: 'text-error', hex: '#f87272' },
}

export const useAppStore = defineStore('app', {
  state: () => ({
    complexity: complexities[1] as Complexity,
    theme: 'dark' as string,
    colorAccent: 'primary' as ColorAccent,
    nerd: true,
    mobileMenuOpen: false,
  }),

  actions: {
    setComplexity(slug: string) {
      const found = complexities.find(c => c.slug === slug)
      if (found) this.complexity = found
    },

    setComplexityByLevel(level: number) {
      const found = complexities.find(c => c.level === level)
      if (found) this.complexity = found
    },

    setTheme(theme: string) {
      this.theme = theme
      if (import.meta.client) {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('alihd-theme', theme)
      }
    },

    toggleTheme() {
      this.setTheme(this.theme === 'dark' ? 'light' : 'dark')
    },

    setColorAccent(accent: ColorAccent) {
      if (!colorAccentMap[accent]) return
      this.colorAccent = accent
      if (import.meta.client) {
        localStorage.setItem('alihd-accent', accent)
        applyAccentToDocument(accent)
      }
    },

    toggleNerd() {
      this.nerd = !this.nerd
      if (import.meta.client) {
        localStorage.setItem('alihd-nerd', String(this.nerd))
        document.documentElement.setAttribute('data-nerd', String(this.nerd))
      }
    },

    initTheme() {
      if (import.meta.client) {
        const savedTheme = localStorage.getItem('alihd-theme')
        if (savedTheme) {
          this.setTheme(savedTheme)
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          this.setTheme(prefersDark ? 'dark' : 'light')
        }

        const savedAccent = localStorage.getItem('alihd-accent') as ColorAccent | null
        if (savedAccent && colorAccentMap[savedAccent]) {
          this.setColorAccent(savedAccent)
        } else {
          applyAccentToDocument(this.colorAccent)
        }

        const savedNerd = localStorage.getItem('alihd-nerd')
        if (savedNerd !== null) {
          this.nerd = savedNerd === 'true'
        }
        document.documentElement.setAttribute('data-nerd', String(this.nerd))
      }
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },

    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
  },

  getters: {
    isDark: (state) => state.theme === 'dark',
    complexityLevel: (state) => state.complexity.level,
    accentConfig: (state) => colorAccentMap[state.colorAccent],
  },
})

function applyAccentToDocument(accent: ColorAccent) {
  const root = document.documentElement
  const config = colorAccentMap[accent]
  if (!config) return

  root.setAttribute('data-accent', accent)

  if (accent === 'primary') {
    root.style.removeProperty('--color-primary')
    root.style.removeProperty('--color-primary-content')
  } else {
    root.style.setProperty('--color-primary', config.hex)
    root.style.setProperty('--color-primary-content', '#161616')
  }

  const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (themeColorMeta) {
    themeColorMeta.content = config.hex
  }
}
