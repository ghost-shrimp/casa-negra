import {defineField, defineType} from 'sanity'

export const artworkType = defineType({
    name: 'artwork',
    title: 'Artwork',
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
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'technique',
            title: 'Technique',
            type: 'string',
        }),
        defineField({
            name: 'materials',
            title: 'Materials',
            type: 'array',
            of: [{type: 'string'}],
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {hotspot: true},
                },
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
        defineField({
            name: 'artist',
            title: 'Artist',
            type: 'reference',
            to: [{type: 'artist'}],
        }),
    ],
})