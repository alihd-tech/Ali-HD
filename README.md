# Ali HD Personal Website

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=flat-square&logo=nuxtdotjs&logoColor=white)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Nuxt Content](https://img.shields.io/badge/Nuxt_Content-2-00DC82?style=flat-square&logo=nuxtdotjs&logoColor=white)](https://content.nuxt.com)

Personal portfolio for [Ali Heydari](https://alihd.ir) (Ali HD), full-stack engineer and web architect. Built with Nuxt 4, Vue 3, Tailwind CSS, and DaisyUI.

**Live site:** [alihd.ir](https://alihd.ir)

## Features

- **Pages** — Home, About, and Projects (`pages/`). Navbar also links to Blog and Contact (routes not implemented yet).
- **Projects** — Featured work from `content/projects/*.md` via Nuxt Content, with live links and accent styling helpers in `usePortfolioProjectUi`.
- **Content** — Markdown in `content/` for site copy variants, project write-ups, and blog posts ([Nuxt Content](https://content.nuxt.com)).
- **Complexity levels** — Simple / Balanced / Advanced adjust how much detail is shown (hero, principles stack, about panel, etc.) via `content/hero/`, `content/principles/`, and `content/about/` variant files.
- **Theme customizer** — DaisyUI themes, accent color, optional “nerd” mode (Pinia + `CustomizerPanel`).
- **PWA-ready** — `public/manifest.json`, theme color `#FFAC00`, and favicon / install icon assets wired in `nuxt.config.ts`.
- **SEO** — Global meta, Open Graph, Twitter cards, and Person JSON-LD in `nuxt.config.ts`; breadcrumb structured data via `useBreadcrumbSchema`; static `public/sitemap.xml` and `public/robots.txt`.

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | Nuxt 4, Vue 3 |
| Styling | Tailwind CSS, DaisyUI |
| UI | `@headlessui/vue` (drawers, panels) |
| State | Pinia |
| Content | `@nuxt/content` |
| Icons | `@nuxt/icon` (Fluent, Phosphor, Catppuccin) |
| Fonts | `@nuxtjs/google-fonts` (Inter, Quicksand, Bruno Ace SC) |

## Project structure

```
pages/              # Routes: index, about, projects
components/         # UI (navbar, footer, keypad, customizer, drawer, …)
composables/        # Hero copy, about content, portfolio, personality, principles, breadcrumbs
stores/             # App state (theme, complexity, accent, nerd mode)
content/            # Markdown (hero/, principles/, about/, blog/, projects/)
layouts/            # default.vue
types/              # Complexity, nav, and portfolio project types
nuxt.config.ts      # Modules, head/SEO, runtime config, fonts
public/             # Static assets, PWA manifest, favicons, sitemap, robots.txt
```

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build    # SSR build
npm run generate # Static export (if applicable)
npm run preview  # Preview production build locally
```

## Content

- **About** — Panel copy in `content/about/{simple,balanced,advanced}.md` via `useAboutContent` (nerd mode uses `advanced`); long-form philosophy in `content/about.md`.
- **Hero & principles** — Three variants each in `content/hero/` and `content/principles/`, loaded by `useHeroContent` and `usePrinciplesStack` from the active complexity level.
- **Projects** — One markdown file per entry in `content/projects/` (frontmatter for cards; body for optional long-form copy). Loaded with `usePortfolioProjects` and sorted by `order`.
- **Blog** — Draft posts under `content/blog/`; add `pages/blog/` (and slug routes) when you want them live.
- **Site-wide SEO** — Edit `nuxt.config.ts` `app.head` (meta, icons, JSON-LD). Update `public/sitemap.xml` when routes change.

## PWA & icons

Static files in `public/`:

| File | Purpose |
|------|---------|
| `manifest.json` | Web app manifest (name, theme, icons, display) |
| `favicon.svg` / `favicon.ico` / `favicon-96x96.png` | Browser favicons |
| `apple-touch-icon.png` | iOS home screen |
| `web-app-manifest-192x192.png` / `web-app-manifest-512x512.png` | Install / manifest icons |

Head links and `theme-color` are set in `nuxt.config.ts` → `app.head.link` and `app.head.meta`.

## Configuration

- `nuxt.config.ts` — Modules, fonts, `app.head` (SEO, favicons, manifest), runtime config (`siteUrl`, `contactEmail`, `socialLinks`)
- `tailwind.config.ts` / `assets/css/main.css` — Theme and global styles
- `types/index.ts` — Complexity level definitions
- `public/manifest.json` — PWA name, colors, and icon list (keep in sync with files in `public/`)
