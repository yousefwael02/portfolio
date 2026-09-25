import {defineField, defineType} from 'sanity'
import {slugField, visibilityFields} from './shared'

export const technology = defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    slugField,
    defineField({name: 'category', title: 'Category', type: 'string', options: {list: ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'AI / ML', 'Tools']}}),
    ...visibilityFields,
  ],
})