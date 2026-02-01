export const typeOptions = [
    { title: 'Oil Painting', value: 'oil-painting' },
    { title: 'Acrylic Painting', value: 'acrylic' },
    { title: 'Watercolor', value: 'watercolor' },
    { title: 'Sculpture', value: 'sculpture' },
    { title: 'Mixed Media', value: 'mixed-media' },
    { title: 'Installation', value: 'installation' },
    { title: 'Photography', value: 'photography' },
    { title: 'Digital Art', value: 'digital' },
    { title: 'Drawing', value: 'drawing' },
    { title: 'Limited Edition Print', value: 'print' },
    { title: 'Other', value: 'other' },
]

export type ArtworkType = (typeof typeOptions)[number]['value'];