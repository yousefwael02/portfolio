import {useEffect} from 'react'

type SEOProps = {
  title?: string
  description?: string
  path?: string
  image?: string
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
}

function setMeta(name: string, value: string, property = false) {
  const attribute = property ? 'property' : 'name'
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.append(element)
  }
  element.content = value
}

export function SEO({title, description, path = '/', image, structuredData}: SEOProps) {
  useEffect(() => {
    const siteTitle = title || 'Yousef Wael | Software Engineer'
    const pageDescription = description || 'Software Engineer building reliable web applications and backend systems.'
    const configuredOrigin = import.meta.env.VITE_SITE_URL || window.location.origin
    const canonicalUrl = new URL(path, `${configuredOrigin.replace(/\/$/, '')}/`).toString()

    document.title = siteTitle
    setMeta('description', pageDescription)
    setMeta('og:title', siteTitle, true)
    setMeta('og:description', pageDescription, true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', canonicalUrl, true)
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary')
    setMeta('twitter:title', siteTitle)
    setMeta('twitter:description', pageDescription)
    if (image) {
      setMeta('og:image', image, true)
      setMeta('twitter:image', image)
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove()
      document.head.querySelector('meta[name="twitter:image"]')?.remove()
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = canonicalUrl

    let dataScript = document.getElementById('structured-data') as HTMLScriptElement | null
    if (structuredData) {
      if (!dataScript) {
        dataScript = document.createElement('script')
        dataScript.id = 'structured-data'
        dataScript.type = 'application/ld+json'
        document.head.append(dataScript)
      }
      dataScript.textContent = JSON.stringify(structuredData).replace(/</g, '\\u003c')
    } else {
      dataScript?.remove()
    }
  }, [description, image, path, structuredData, title])

  return null
}