import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    defineField({
      name: 'productName',
      type: 'string',
      title: 'Product Name',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'productName',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gender',
      type: 'string',
      title: 'Gender',
      options: {
        list: ['men', 'women', 'unisex'],
      },
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
    }),
    defineField({
      name: 'subCategory',
      type: 'string',
      title: 'Sub Category',
    }),
    defineField({
      name: 'tag',
      type: 'string',
      title: 'Tag',
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
    }),
    defineField({
      name: 'season',
      type: 'string',
      title: 'Season',
      options: {
        list: ['spring', 'summer', 'fall', 'winter'],
      },
    }),
    defineField({
      name: 'year',
      type: 'number',
      title: 'Year',
    }),
    defineField({
      name: 'usage',
      type: 'string',
      title: 'Usage',
      options: {
        list: ['casual', 'formal', 'sport', 'party'],
      },
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      type: 'string',
      title: 'Currency',
      initialValue: 'USD',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'sizes',
      type: 'array',
      title: 'Available Sizes',
      of: [{ type: 'string' }],
      options: {
        list: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'imageUrl',
      type: 'url',
      title: 'Image URL',
    }),
    defineField({
      name: 'stock',
      type: 'number',
      title: 'Stock',
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated At',
      readOnly: true,
    }),
  ],
})
