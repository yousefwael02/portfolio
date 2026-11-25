import {createClient} from '@sanity/client'
import {getSiteUrl, send, type SiteRequest, type SiteResponse} from './_site.js'

type SitemapProject = {slug?: string; _updatedAt?: string}

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'vbkdgme6',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-09-25',
  useCdn: true,
  perspective: 'published',
})

const PROJECTS_QUERY = `*[_type == "project" && isVisible == true && isArchived != true] | order(displayOrder asc, startDate desc){"slug": slug.current, _updatedAt}`
const STATIC_PATHS = ['/', '/about', '/projects', '/services', '/contact']

function xmlEscape(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}

export default async function handler(request: SiteRequest, response: SiteResponse) {
  const siteUrl = getSiteUrl(request)

  try {
    const projects = await client.fetch<SitemapProject[]>(PROJECTS_QUERY)
    const urls = [
      ...STATIC_PATHS.map((path) => ({path, updatedAt: undefined as string | undefined})),
      ...projects.filter((project) => project.slug).map((project) => ({path: `/projects/${project.slug}`, updatedAt: project._updatedAt})),
    ]
    const entries = urls.map(({path, updatedAt}) => `  <url><loc>${xmlEscape(`${siteUrl}${path}`)}</loc>${updatedAt ? `<lastmod>${new Date(updatedAt).toISOString().slice(0, 10)}</lastmod>` : ''}</url>`).join('\n')

    send(response, 200, 'application/xml; charset=utf-8', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`)
  } catch (error) {
    console.error('Sitemap generation failed', error)
    // Not cached, so the next crawl retries instead of keeping an error page.
    send(response, 503, 'text/plain; charset=utf-8', 'Sitemap temporarily unavailable.', 'no-store')
  }
}
