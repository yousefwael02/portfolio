import {track} from '@vercel/analytics/react'
import type {BeforeSend} from '@vercel/analytics/react'

type AnalyticsEvent =
  | {name: 'Project Link Click'; properties: {project: string; link: 'live' | 'repository'}}
  | {name: 'Resume Download'; properties?: undefined}
  | {name: 'Contact Form Submit'; properties: {result: 'success' | 'error'}}

// Only the page path is reported. Query strings and fragments are dropped so
// nothing typed by a visitor can reach analytics through a URL.
export const stripUrlDetails: BeforeSend = (event) => {
  const url = new URL(event.url)
  url.search = ''
  url.hash = ''
  return {...event, url: url.toString()}
}

// Event properties are a fixed, non-personal vocabulary. Never pass contact
// form fields or other visitor input here.
export function trackEvent(event: AnalyticsEvent) {
  track(event.name, event.properties)
}
