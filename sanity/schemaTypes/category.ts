import {defineField, defineType} from 'sanity'
import {slugField, visibilityFields} from './shared'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    slugField,
    ...visibilityFields,
  ],
})