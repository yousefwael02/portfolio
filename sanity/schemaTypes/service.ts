import {defineField, defineType} from 'sanity'
import {visibilityFields} from './shared'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'shortSummary', title: 'Short summary', type: 'string', validation: (Rule) => Rule.required().max(180)}),
    defineField({name: 'detailedDescription', title: 'Detailed description', type: 'text', rows: 6, validation: (Rule) => Rule.required()}),
    defineField({name: 'iconName', title: 'Icon name', type: 'string', description: 'Optional icon identifier used by the frontend component library.'}),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
    defineField({name: 'ctaUrl', title: 'CTA URL', type: 'string'}),
    ...visibilityFields,
  ],
})