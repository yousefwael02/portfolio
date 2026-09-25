import {defineField, defineType} from 'sanity'
import {visibilityFields} from './shared'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'category', title: 'Category', type: 'string', options: {list: ['Frontend', 'Backend', 'Full-stack', 'Database', 'Cloud', 'DevOps', 'Testing', 'Tools', 'Healthcare Technology']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'summary', title: 'Summary', type: 'string', validation: (Rule) => Rule.max(180)}),
    ...visibilityFields,
  ],
})