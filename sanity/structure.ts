import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['profile', 'siteSettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content')
    .items([
      S.listItem().title('Profile').id('profile').child(S.document().schemaType('profile').documentId('profile')),
      S.listItem().title('Site settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() ?? '')),
    ])