import type {IncomingMessage, ServerResponse} from 'node:http'

// Vercel ignores files starting with "_" when creating functions, so this is a shared helper.

export type SiteRequest = IncomingMessage
export type SiteResponse = ServerResponse

// Cached on Vercel's CDN for 10 minutes, then served stale while it refreshes in the background.
// A Sanity publish therefore reaches crawlers within about 10 minutes, with no redeploy.
export const CDN_CACHE = 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400'

export function getSiteUrl(request: SiteRequest) {
  const configured = process.env.VITE_SITE_URL?.replace(/\/+$/, '')
  if (configured && !new URL(configured).hostname.endsWith('.example')) return configured

  const forwardedHost = request.headers['x-forwarded-host']
  const host = (typeof forwardedHost === 'string' ? forwardedHost : forwardedHost?.[0]) || request.headers.host || 'localhost'
  const protocol = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https'
  return `${protocol}://${host}`
}

export function send(response: SiteResponse, status: number, contentType: string, body: string, cacheControl = CDN_CACHE) {
  response.statusCode = status
  response.setHeader('Content-Type', contentType)
  response.setHeader('Cache-Control', cacheControl)
  response.end(body)
}
