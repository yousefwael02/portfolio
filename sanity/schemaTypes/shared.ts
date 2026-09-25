import {defineArrayMember, defineField} from 'sanity'

export const slugField = defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {source: 'title', maxLength: 96},
  validation: (Rule) => Rule.required(),
})

export const visibilityFields = [
  defineField({
    name: 'isVisible',
    title: 'Visible publicly',
    type: 'boolean',
    initialValue: true,
  }),
  defineField({
    name: 'displayOrder',
    title: 'Display order',
    type: 'number',
    initialValue: 0,
    validation: (Rule) => Rule.integer().min(0),
  }),
]

export const richText = defineField({
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
    }),
  ],
})

export const technologyReferences = defineField({
  name: 'technologies',
  title: 'Technologies',
  type: 'array',
  of: [defineArrayMember({type: 'reference', to: [{type: 'technology'}]})],
})