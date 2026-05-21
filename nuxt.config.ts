export default defineNuxtConfig({
  compatibilityDate: "2026-05-20",
  devtools: {
    enabled: true,
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxt/content'],

  icon: {
    class: 'icon',
    mode: 'css',
    collections: ['fluent','ph', 'catppuccin'],
    cssLayer: 'base'
  },

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "~/tailwind.config.ts"
  },

  content: {
    highlight: {
      theme: 'github-light'
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Ali HD | Full Stack Engineer & Web Architect',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'theme-color', content: '#FFAC00' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'application-name', content: 'Ali HD' },
        { name: 'apple-mobile-web-app-title', content: 'Ali HD' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        {
          name: 'description',
          content:
            'Full-stack portfolio of Ali HD — Product-focused Engineering for the modern web, building fast, scalable interfaces and platforms designed to stay responsive as usage and complexity grow.',
        },
        {
          name: 'keywords',
          content:
            'Ali HD, full-stack developer, developer portfolio, Scala, FastAPI, Laravel, Nuxt, TypeScript, PWA, product engineering, web 3',
        },
        { name: 'author', content: 'Ali Heydari' },
        { name: 'creator', content: 'Ali Heydari' },
        { name: 'publisher', content: 'Ali HD' },
        { name: 'copyright', content: 'Ali Heydari' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:title', content: 'Ali HD — Full-Stack Developer Portfolio' },
        {
          property: 'og:description',
          content:
            'Full-stack portfolio of Ali HD — Product-focused Engineering for the modern web, building fast, scalable interfaces and platforms designed to stay responsive as usage and complexity grow.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://alihd.ir/' },
        { property: 'og:image', content: 'https://alihd.ir/og-image.jpg' },
        { property: 'og:image:secure_url', content: 'https://alihd.ir/og-image.jpg' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:alt', content: 'Ali HD — Full Stack Engineer & Web Architect portfolio' },
        { property: 'og:site_name', content: 'Ali HD' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@alihddev' },
        { name: 'twitter:creator', content: '@alihddev' },
        { name: 'twitter:title', content: 'Ali HD — Full-Stack Developer Portfolio' },
        {
          name: 'twitter:description',
          content:
            'Full-stack portfolio of Ali HD — Product-focused Engineering for the modern web, building fast, scalable interfaces and platforms designed to stay responsive as usage and complexity grow.',
        },
        { name: 'twitter:image', content: 'https://alihd.ir/twitter.jpg' },
        { name: 'twitter:image:alt', content: 'Ali HD — Full Stack Engineer & Web Architect portfolio' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'canonical', href: 'https://alihd.ir/' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://alihd.ir/#website',
                name: 'Ali HD',
                alternateName: ['Ali Heydari', 'alihdir','alihddev','alihd-tech'],
                url: 'https://alihd.ir/',
                description:
                  'Full-stack portfolio of Ali HD — product-focused engineering for fast, scalable web interfaces and platforms.',
                inLanguage: 'en-US',
                publisher: { '@id': 'https://alihd.ir/#person' },
              },
              {
                '@type': 'Person',
                '@id': 'https://alihd.ir/#person',
                name: 'Ali HD',
                alternateName: ['Ali Heydari', 'alihdir','alihddev','alihd-tech'],
                url: 'https://alihd.ir/',
                image: 'https://alihd.ir/alihd.webp',
                email: 'mailto:support@alihd.ir',
                jobTitle: 'Full Stack Engineer & Web Architect',
                knowsAbout: [
                  'Nuxt',
                  'TypeScript',
                  'Scala',
                  'FastAPI',
                  'Laravel',
                  'Progressive Web Apps',
                  'Product engineering',
                ],
                sameAs: [
                  'https://github.com/alihd-tech',
                  'https://www.linkedin.com/in/alihddev',
                  'https://x.com/alihddev',
                  'https://instagram.com/ali.hdii',
                  'https://t.me/lifelongcoder',
                ],
              },
              {
                '@type': 'ProfilePage',
                '@id': 'https://alihd.ir/#profilepage',
                url: 'https://alihd.ir/',
                name: 'Ali HD | Full Stack Engineer & Web Architect',
                description:
                  'Designing and engineering full-stack systems where performance, architecture, and user experience meet clean modern development.',
                isPartOf: { '@id': 'https://alihd.ir/#website' },
                about: { '@id': 'https://alihd.ir/#person' },
                mainEntity: {
                  '@id': 'https://alihd.ir/#person',
                  '@type': 'Person',
                  name: 'Ali Heydari',
                },
                inLanguage: 'en-US',
              },
            ],
          }),
        },
      ],
    },
  },

  googleFonts: {
    families: {
      'Inter': '400..800',
      'Quicksand': [400, 700],
      'Bruno Ace SC': [400]
    },
    display: 'swap',
    prefetch: true,
    inject: true,
    download: true
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://alihd.ir',
      contactEmail: 'support@alihd.ir',
      socialLinks: [
        {
          name: 'GitHub',
          url: 'https://github.com/alihd-tech',
          icon: 'ph:github-logo',
          subtitle: 'alihd-tech',
        },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/alihddev',
          icon: 'ph:linkedin-logo',
          subtitle: 'in/alihddev',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/lifelongcoder',
          icon: 'ph:telegram-logo',
          subtitle: '@lifelongcoder',
        },
        {
          name: 'Instagram',
          url: 'https://instagram.com/ali.hdii',
          icon: 'ph:instagram-logo',
          subtitle: '@ali.hdii',
        },
      ],
    },
  },
})
