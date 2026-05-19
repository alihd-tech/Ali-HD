# Ali HD Personal Website

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=flat-square&logo=nuxtdotjs&logoColor=white)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Nuxt Content](https://img.shields.io/badge/Nuxt_Content-2-00DC82?style=flat-square&logo=nuxtdotjs&logoColor=white)](https://content.nuxt.com)

Personal portfolio and blog for [Ali Heydari](https://alihd.ir) (Ali HD), full-stack engineer and web architect. Built with Nuxt 4, Vue 3, Tailwind CSS, and DaisyUI.

**Live site:** [alihd.ir](https://alihd.ir)

## Features

- **Pages** — Home, About, Projects, Blog, Contact
- **Content** — Blog posts and some copy via [Nuxt Content](https://content.nuxt.com) (`content/`)
- **Complexity levels** — Simple / Balanced / Advanced adjust how much detail is shown (hero copy, principles stack, etc.)
- **Theme customizer** — DaisyUI themes, accent color, optional “nerd” mode (Pinia + `CustomizerPanel`)
- **SEO** — Per-page meta via `useSiteSeo`, global defaults in `nuxt.config.ts`, `utils/site.ts`, and `/sitemap.xml`

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | Nuxt 4, Vue 3 |
| Styling | Tailwind CSS, DaisyUI |
| State | Pinia |
| Content | `@nuxt/content` |
| Icons | `@nuxt/icon` (Fluent, Phosphor, Catppuccin) |

## Project structure

```
pages/           # Routes (index, about, projects, blog, contact)
components/      # UI (navbar, footer, keypad, customizer, …)
composables/     # Hero copy, SEO, personality, principles stack
stores/          # App state (theme, complexity, accent)
content/         # Markdown (blog/, projects/, about.md)
layouts/         # default.vue
server/routes/   # sitemap.xml
utils/site.ts    # Site URL, page SEO defaults
public/          # Static assets, manifest, robots.txt
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

- **Blog** — Add `.md` files under `content/blog/`; they appear on `/blog` and at `/blog/<slug>`.
- **About** — Long-form copy in `content/about.md` (used where wired in pages).
- **Site-wide SEO** — Edit `utils/site.ts` and `composables/useSiteSeo.ts`; global tags live in `nuxt.config.ts`.

## Configuration

- `nuxt.config.ts` — Modules, fonts, runtime config (`siteUrl`, `contactEmail`, `socialLinks`)
- `tailwind.config.ts` / `assets/css/main.css` — Theme and global styles
- `types/index.ts` — Complexity level definitions
