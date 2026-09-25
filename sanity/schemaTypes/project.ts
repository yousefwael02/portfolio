import {defineArrayMember, defineField, defineType} from 'sanity'
import {slugField, technologyReferences} from './shared'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [
    {title: 'Display order', name: 'displayOrderAsc', by: [{field: 'displayOrder', direction: 'asc'}]},
    {title: 'Start date', name: 'startDateDesc', by: [{field: 'startDate', direction: 'desc'}]},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    slugField,
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(240)}),
    defineField({name: 'problem', title: 'Problem / business need', type: 'text', rows: 5, validation: (Rule) => Rule.required()}),
    defineField({name: 'solution', title: 'Solution', type: 'text', rows: 5, validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Role', type: 'string', validation: (Rule) => Rule.required()}),
    technologyReferences,
    defineField({name: 'clientOrganization', title: 'Client / organization', type: 'string'}),
    defineField({name: 'startDate', title: 'Start date', type: 'date', validation: (Rule) => Rule.required()}),
    defineField({name: 'completionDate', title: 'Completion date', type: 'date'}),
    defineField({name: 'isOngoing', title: 'Ongoing project', type: 'boolean', initialValue: false}),
    defineField({name: 'liveUrl', title: 'Live URL', type: 'url'}),
    defineField({name: 'repositoryUrl', title: 'Repository URL', type: 'url'}),
    defineField({name: 'coverImage', title: 'Cover image', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required()}),
    defineField({name: 'galleryImages', title: 'Gallery images', type: 'array', of: [defineArrayMember({type: 'image', options: {hotspot: true}})]}),
    defineField({name: 'outcome', title: 'Outcome / results', type: 'text', rows: 5, validation: (Rule) => Rule.required()}),
    defineField({name: 'isFeatured', title: 'Featured project', type: 'boolean', initialValue: false}),
    defineField({name: 'isArchived', title: 'Archived', type: 'boolean', initialValue: false}),
    defineField({name: 'isVisible', title: 'Visible publicly', type: 'boolean', initialValue: true}),
    defineField({name: 'displayOrder', title: 'Display order', type: 'number', initialValue: 0, validation: (Rule) => Rule.integer().min(0)}),
    defineField({name: 'seoTitle', title: 'SEO title', type: 'string', validation: (Rule) => Rule.max(70)}),
    defineField({name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, validation: (Rule) => Rule.max(160)}),
  ],
})