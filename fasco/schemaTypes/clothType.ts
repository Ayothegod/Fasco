import {defineField, defineType} from 'sanity'

export const clothType = defineType({
  name: 'cloth',
  title: 'Cloth',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      readOnly: ({document}) => !document?.name,
      validation: (rule) => rule.required().error(`Required for every cloth type`),
      description: 'id for the cloth',
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
    }),
    defineField({
      name: 'price',
      type: 'number',
      description: 'the price of the clothing item from 0 - #10000000',
      initialValue: 0,
      validation: (rule) => rule.required().error(`All clothing item must have a price.`),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      description: 'the price of the clothing item from 0 - #10000000',
      validation: (rule) => rule.min(1).error('ratings can only be between 1 and 5').max(5),
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'base image of the cloth',
      validation: (rule) => rule.required().error(`All clothing item must have an image.`),
    }),
    defineField({
      name: 'otherImages',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'available',
      type: 'number',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'colors',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'sizes',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'brand',
      type: 'string',
    }),
  ],
})
