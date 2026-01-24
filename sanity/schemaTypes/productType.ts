import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
        name: 'price',
        type: 'number',
    }),
    defineField({
        name: 'description',
        type: 'text',
    }),
    defineField({
        name: 'artist',
        type: 'text',
    }),
    defineField({
        name: 'dimensions',
        type: 'text',
    }),
  ],
})