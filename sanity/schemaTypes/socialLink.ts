import {defineField, defineType} from 'sanity'
import {visibilityFields} from './shared'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'document',
  fields: [
    defineField({name: 'platform', title: 'Platform', type: 'string', options: {list: ['LinkedIn', 'GitHub', 'Instagram', 'Website', 'Other']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required()}),
    ...visibilityFields,
  ],
})