import {getSiteUrl, send, type SiteRequest, type SiteResponse} from './_site.js'

export default function handler(request: SiteRequest, response: SiteResponse) {
  send(response, 200, 'text/plain; charset=utf-8', `User-agent: *\nAllow: /\nSitemap: ${getSiteUrl(request)}/sitemap.xml\n`)
}
