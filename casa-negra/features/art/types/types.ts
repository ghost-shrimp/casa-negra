export type Artwork = {
    _id: string;
    title: string;
    year: string;
    price: number;
    type: ArtworkType;
    imageUrl: string;
    artistName: string;
};

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

export const typeLabels: Record<ArtworkType, string> = {
    'oil-painting': 'oilPainting',
    'acrylic': 'acrylic',
    'watercolor': 'watercolor',
    'sculpture': 'sculpture',
    'mixed-media': 'mixedMedia',
    'installation': 'installation',
    'photography': 'photography',
    'digital': 'digitalArt',
    'drawing': 'drawing',
    'print': 'print',
    'other': 'other',
}