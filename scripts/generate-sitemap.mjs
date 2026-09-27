import {readFile, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import {createClient} from '@sanity/client'

const root = process.cwd()
const dist = resolve(root, 'dist')

async function readLocalEnv() {
  try {
    const source = await readFile(resolve(root, '.env'), 'utf8')
    return Object.fromEntries(source.split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      return match ? [[match[1], match[2].replace(/^['"]|['"]$/g, '')]] : []
    }))
  } catch {
    return {}
  }
}

function xmlEscape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}

const localEnv = await readLocalEnv()
const siteUrl = (process.env.VITE_SITE_URL || localEnv.VITE_SITE_URL || '').replace(/\/+$/, '')
const projectId = process.env.VITE_SANITY_PROJECT_ID || localEnv.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || localEnv.VITE_SANITY_DATASET || 'production'

if (!siteUrl || !projectId || new URL(siteUrl || 'http://localhost').hostname.endsWith('.example') || ['localhost', '127.0.0.1'].includes(new URL(siteUrl || 'http://localhost').hostname)) {
  console.warn('Skipping sitemap generation: configure a production VITE_SITE_URL and Sanity project ID.')
  process.exit(0)
}

const client = createClient({projectId, dataset, apiVersion: '2025-09-25', useCdn: true})
const projects = await client.fetch(`*[_type == "project" && isVisible == true && isArchived != true] | order(displayOrder asc, startDate desc){"slug": slug.current, _updatedAt}`)
const staticPaths = ['/', '/about', '/projects', '/services', '/contact']
const urls = [
  ...staticPaths.map((path) => ({path})),
  ...projects.filter((project) => project.slug).map((project) => ({path: `/projects/${project.slug}`, updatedAt: project._updatedAt})),
]
const entries = urls.map(({path, updatedAt}) => `  <url><loc>${xmlEscape(`${siteUrl}${path}`)}</loc>${updatedAt ? `<lastmod>${new Date(updatedAt).toISOString().slice(0, 10)}</lastmod>` : ''}</url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`

await writeFile(resolve(dist, 'sitemap.xml'), sitemap)
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`Generated sitemap with ${urls.length} URLs.`)