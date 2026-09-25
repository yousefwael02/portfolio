import {defineField, defineType} from 'sanity'
import {visibilityFields} from './shared'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({name: 'institution', title: 'Institution', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'qualification', title: 'Qualification / degree', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'fieldOfStudy', title: 'Field of study', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'startDate', title: 'Start date', type: 'date', validation: (Rule) => Rule.required()}),
    defineField({name: 'endDate', title: 'End date', type: 'date'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 5, validation: (Rule) => Rule.required()}),
    ...visibilityFields,
  ],
})