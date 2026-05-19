<template>
  <div
    class="marquee-fade-x marquee-block overflow-x-clip overflow-y-visible rounded-lg border border-base-300/20 bg-base-100/30 py-3 pb-12 sm:py-4 sm:pb-14 lg:rounded-xl lg:py-5 lg:pb-16"
    aria-label="Technologies and tools"
  >
    <div class="marquee-track marquee-track-logos flex w-max items-center gap-3 px-2 sm:gap-4 lg:gap-5 lg:px-4">
      <div
        v-for="pass in 2"
        :key="'logos-' + pass"
        class="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5"
        :aria-hidden="pass === 2 ? 'true' : undefined"
      >
        <div
          v-for="logo in logos"
          :key="pass + '-' + logo.id"
          class="logo-marquee-cell group/logo relative"
        >
          <button
            type="button"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-base-300/25 bg-base-100/70 transition-all hover:border-primary/35 hover:bg-primary/5 focus:border-primary/40 focus:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            :aria-label="logo.label"
            :aria-describedby="pass === 1 ? `logo-tip-${logo.id}` : undefined"
          >
            <Icon
              :name="logo.icon"
              width="22"
              height="22"
              class="opacity-65 transition-opacity group-hover/logo:opacity-100 group-focus-within/logo:opacity-100"
              aria-hidden="true"
            />
          </button>

          <div
            v-if="pass === 1"
            :id="`logo-tip-${logo.id}`"
            role="tooltip"
            class="pointer-events-none invisible absolute left-1/2 top-[calc(100%+0.375rem)] z-30 w-max max-w-[12rem] -translate-x-1/2 translate-y-0.5 rounded-lg border border-base-300/35 bg-base-100/95 px-2.5 py-2 text-left opacity-0 shadow-lg shadow-base-300/20 backdrop-blur-md transition-[opacity,transform,visibility] duration-200 group-hover/logo:visible group-hover/logo:translate-y-0 group-hover/logo:opacity-100 group-focus-within/logo:visible group-focus-within/logo:translate-y-0 group-focus-within/logo:opacity-100 sm:max-w-[13rem]"
          >
            <p class="text-[11px] font-semibold leading-tight text-base-content">
              {{ logo.label }}
            </p>
            <p class="mt-0.5 text-[10px] leading-snug text-base-content/60">
              {{ logo.blurb }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TechLogo {
  id: string
  icon: string
  label: string
  blurb: string
}

const logos: TechLogo[] = [
  {
    id: 'vue',
    icon: 'catppuccin:vue',
    label: 'Vue.js',
    blurb: 'Composable UI for reactive, maintainable frontends.'
  },
  {
    id: 'nuxt',
    icon: 'catppuccin:nuxt',
    label: 'Nuxt',
    blurb: 'Full-stack Vue framework with routing, SSR, and modules.'
  },
  {
    id: 'typescript',
    icon: 'catppuccin:typescript',
    label: 'TypeScript',
    blurb: 'Typed JavaScript for safer refactors and clearer APIs.'
  },
  {
    id: 'javascript',
    icon: 'catppuccin:javascript',
    label: 'JavaScript',
    blurb: 'Runtime language for browsers, servers, and tooling.'
  },
  {
    id: 'vite',
    icon: 'catppuccin:vite',
    label: 'Vite',
    blurb: 'Fast dev server and lean production builds.'
  },
  {
    id: 'tailwind',
    icon: 'catppuccin:tailwind',
    label: 'Tailwind CSS',
    blurb: 'Utility-first styling with consistent design tokens.'
  },
  {
    id: 'pnpm',
    icon: 'catppuccin:pnpm',
    label: 'pnpm',
    blurb: 'Disk-efficient package manager for monorepos and apps.'
  },
  {
    id: 'docker',
    icon: 'catppuccin:docker',
    label: 'Docker',
    blurb: 'Containers for reproducible dev and deployment.'
  },
  {
    id: 'nginx',
    icon: 'catppuccin:nginx',
    label: 'Nginx',
    blurb: 'Reverse proxy and static delivery at the edge.'
  },
  {
    id: 'python',
    icon: 'catppuccin:python',
    label: 'Python',
    blurb: 'Scripting, APIs, and data work with a rich ecosystem.'
  },
  {
    id: 'laravel',
    icon: 'catppuccin:laravel',
    label: 'Laravel',
    blurb: 'PHP framework for APIs, auth, and rapid backend delivery.'
  },
  {
    id: 'php',
    icon: 'catppuccin:php',
    label: 'PHP',
    blurb: 'Mature server runtime for web apps and CMS backends.'
  },
  {
    id: 'next',
    icon: 'catppuccin:next',
    label: 'Next.js',
    blurb: 'React framework with SSR, routing, and edge deployment.'
  },
  {
    id: 'rust',
    icon: 'catppuccin:rust',
    label: 'Rust',
    blurb: 'Systems language for performance-critical tooling.'
  },
  {
    id: 'tauri',
    icon: 'catppuccin:tauri',
    label: 'Tauri',
    blurb: 'Lightweight desktop apps with a web frontend.'
  },
  {
    id: 'webpack',
    icon: 'catppuccin:webpack',
    label: 'Webpack',
    blurb: 'Module bundler for complex legacy and enterprise builds.'
  },
  {
    id: 'rollup',
    icon: 'catppuccin:rollup',
    label: 'Rollup',
    blurb: 'ESM-focused bundler for libraries and lean output.'
  },
  {
    id: 'serverless',
    icon: 'catppuccin:serverless',
    label: 'Serverless',
    blurb: 'Event-driven functions without managing servers.'
  },
  {
    id: 'wrangler',
    icon: 'catppuccin:wrangler',
    label: 'Wrangler',
    blurb: 'CLI for Cloudflare Workers and edge deployments.'
  },
  {
    id: 'puppeteer',
    icon: 'catppuccin:puppeteer',
    label: 'Puppeteer',
    blurb: 'Headless Chrome for automation and PDF/screenshots.'
  },
  {
    id: 'solidity',
    icon: 'catppuccin:solidity',
    label: 'Solidity',
    blurb: 'Smart contracts on EVM chains.'
  },
  {
    id: 'web-assembly',
    icon: 'catppuccin:web-assembly',
    label: 'WebAssembly',
    blurb: 'Near-native modules inside the browser runtime.'
  },
  {
    id: 'zig',
    icon: 'catppuccin:zig',
    label: 'Zig',
    blurb: 'Low-level language focused on simplicity and safety.'
  },
  {
    id: 'remix',
    icon: 'catppuccin:remix',
    label: 'Remix',
    blurb: 'Full-stack React framework with nested routing.'
  },
  {
    id: 'gradle',
    icon: 'catppuccin:gradle',
    label: 'Gradle',
    blurb: 'Build automation for JVM and multi-platform projects.'
  },
  {
    id: 'nativescript',
    icon: 'catppuccin:nativescript',
    label: 'NativeScript',
    blurb: 'Cross-platform native apps with JavaScript or TypeScript.'
  },
  {
    id: 'package-json',
    icon: 'catppuccin:package-json',
    label: 'npm / package.json',
    blurb: 'Manifest and scripts for Node package workflows.'
  }
]
</script>
