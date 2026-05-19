import { SITE_URL } from '~/utils/site'

const STATIC_PATHS = ['/', '/about', '/projects', '/blog', '/contact'] as const

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event)
    .where({ _extension: 'md' })
    .only(['_path', 'date', 'updatedAt'])
    .find()

  const blogPaths = docs
    .map((doc) => doc._path as string)
    .filter((path) => path.startsWith('/blog/') && path !== '/blog')

  const urls = [
    ...STATIC_PATHS.map((path) => ({ loc: `${SITE_URL}${path === '/' ? '/' : path}` })),
    ...blogPaths.map((path) => ({ loc: `${SITE_URL}${path}` })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
  </url>`,
  )
  .join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return body
})
