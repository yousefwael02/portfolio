import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId: projectId || 'vbkdgme6',
  dataset,
  apiVersion: '2025-09-25',
  useCdn: true,
})

const imageBuilder = createImageUrlBuilder(sanityClient)

export type SanityImage = {
  assetRef?: string | null
  url?: string | null
  alt?: string | null
}

export function getSanityImageUrl(image: SanityImage | null | undefined, width: number) {
  if (!image?.assetRef) return image?.url ?? undefined

  return imageBuilder
    .image({_type: 'image', asset: {_ref: image.assetRef}})
    .width(width)
    .auto('format')
    .url()
}