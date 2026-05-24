import { defineStore } from 'pinia'
import { complexities, type Complexity } from '~/types'

export type AppTheme = 'dark' | 'light' | 'nord' | 'black' | 'night' | 'cupcake'

export interface ThemeOption {
  slug: AppTheme
  label: string
  description: string
  isDark: boolean
}

/** DaisyUI themes configured in tailwind.config.ts */
export const themes: ThemeOption[] = [
  {
    slug: 'dark',
    label: 'Dark',
    description: 'Forest-inspired dark palette',
    isDark: true,
  },
  {
    slug: 'light',
    label: 'Light',
    description: 'Emerald-tinted light mode',
    isDark: false,
  }, 
  {
    slug: 'night',
    label: 'Night',
    description: 'Deep blue night sky',
    isDark: true,
  }, 
]

export const themeSlugs = themes.map(t => t.slug)

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
    theme: 'dark' as AppTheme,
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
      const found = themes.find(t => t.slug === theme)
      if (!found) return
      this.theme = found.slug
      if (import.meta.client) {
        document.documentElement.setAttribute('data-theme', found.slug)
        localStorage.setItem('alihd-theme', found.slug)
      }
    },

    toggleTheme() {
      this.setTheme(this.isDark ? 'light' : 'dark')
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
        if (savedTheme && themeSlugs.includes(savedTheme as AppTheme)) {
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
    isDark: (state) => themes.find(t => t.slug === state.theme)?.isDark ?? true,
    themeConfig: (state) => themes.find(t => t.slug === state.theme) ?? themes[0],
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
