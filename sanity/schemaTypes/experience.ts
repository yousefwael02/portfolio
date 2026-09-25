import {defineArrayMember, defineField, defineType} from 'sanity'
import {technologyReferences, visibilityFields} from './shared'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({name: 'organization', title: 'Organization', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'position', title: 'Position', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'startDate', title: 'Start date', type: 'date', validation: (Rule) => Rule.required()}),
    defineField({name: 'endDate', title: 'End date', type: 'date', hidden: ({parent}) => parent?.isCurrent}),
    defineField({name: 'isCurrent', title: 'Current position', type: 'boolean', initialValue: false}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'achievements', title: 'Key achievements', type: 'array', of: [defineArrayMember({type: 'string'})], validation: (Rule) => Rule.min(1)}),
    technologyReferences,
    ...visibilityFields,
  ],
})