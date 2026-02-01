import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'creator',
      title: 'Creator',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {type: 'image', options: {hotspot: true}},
      ],
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})