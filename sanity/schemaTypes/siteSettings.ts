import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', title: 'Site title', type: 'string', validation: (Rule) => Rule.required().max(70)}),
    defineField({name: 'defaultSeoTitle', title: 'Default SEO title', type: 'string', validation: (Rule) => Rule.required().max(70)}),
    defineField({name: 'defaultSeoDescription', title: 'Default SEO description', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(160)}),
    defineField({name: 'contactRecipientEmail', title: 'Contact recipient email', type: 'email', validation: (Rule) => Rule.required()}),
    defineField({name: 'copyrightText', title: 'Copyright text', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'maintenanceMode', title: 'Maintenance mode', type: 'boolean', initialValue: false}),
    defineField({name: 'maintenanceMessage', title: 'Maintenance message', type: 'string', hidden: ({parent}) => !parent?.maintenanceMode}),
  ],
})