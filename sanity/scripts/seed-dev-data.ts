import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { createClient } from '@sanity/client'
import { MockArtist, MockArtwork, MockEvent, MockProduct } from './interfaces'

const dataset = process.env.SANITY_STUDIO_DATASET || 'dev'
const token = process.env.SANITY_STUDIO_AUTH_TOKEN

if (!token) {
    console.error('SANITY_STUDIO_AUTH_TOKEN not found in environment variables')
    console.error('Make sure .env exists with SANITY_STUDIO_AUTH_TOKEN set')
    process.exit(1)
}

const artistCount = 20

console.log(`Using dataset: ${dataset}`)
console.log(`Token loaded: ${token.substring(0, 10)}...`)

const client = createClient({
    projectId: 'guvph4dz',
    dataset,
    useCdn: false,
    token,
    apiVersion: '2024-01-31',
})



const createBlockContent = (text: string) => [
    {
        _type: 'block' as const,
        style: 'normal' as const,
        _key: faker.string.uuid(),
        children: [
            {
                _type: 'span' as const,
                text,
                _key: faker.string.uuid(),
            },
        ],
    },
]

const randomImageSize = () => {
    const width = faker.number.int({ min: 400, max: 1200 })
    const height = faker.number.int({ min: 300, max: 900 })
    return { width, height }
}

const generateImageUrl = () => {
    const { width, height } = randomImageSize()
    const imageType = faker.helpers.arrayElement([
        'abstract',
        'animals',
        'business',
        'cats',
        'city',
        'food',
        'nature',
        'nightlife',
        'people',
        'sports',
        'technics',
        'transport',
    ])
    return faker.image.urlLoremFlickr({
        width,
        height,
        category: imageType,
    })
}

const downloadImage = async (imageUrl: string): Promise<Buffer> => {
    const response = await fetch(imageUrl)
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
    }
    const arrayBuffer = await response.arrayBuffer()
    if (arrayBuffer.byteLength === 0) {
        throw new Error('Downloaded image is empty')
    }
    return Buffer.from(arrayBuffer)
}

const uploadImageToSanity = async (imageUrl: string): Promise<string> => {
    try {
        const buffer = await downloadImage(imageUrl)
        const asset = await client.assets.upload('image', buffer, {
            filename: `image-${faker.string.uuid()}.jpg`,
        })
        return asset._id
    } catch (error) {
        console.error(`Failed to download/upload image from ${imageUrl}:`, error)
        throw error
    }
}

const generateArtists = async (count: number): Promise<MockArtist[]> => {
    const artists: MockArtist[] = []
    for (let i = 0; i < count; i++) {
        const imageId = await uploadImageToSanity(generateImageUrl())
        artists.push({
            _type: 'artist' as const,
            name: faker.person.fullName(),
            bio: createBlockContent(faker.lorem.paragraphs(2)),
            image: {
                _type: 'image' as const,
                asset: { _ref: imageId },
                alt: faker.lorem.sentence(),
            },
        })
    }
    return artists
}

const generateArtworks = async (
    artistIds: string[],
    count: number
): Promise<MockArtwork[]> => {
    const artworks: MockArtwork[] = []
    for (let i = 0; i < count; i++) {
        const imageCount = faker.number.int({ min: 1, max: 10 })
        const images = []
        for (let j = 0; j < imageCount; j++) {
            const imageId = await uploadImageToSanity(generateImageUrl())
            images.push({
                _type: 'image' as const,
                _key: faker.string.uuid(),
                asset: { _ref: imageId },
                alt: faker.lorem.sentence(),
                title: faker.lorem.words({ min: 2, max: 4 }),
            })
        }
        artworks.push({
            _type: 'artwork' as const,
            title: faker.lorem.words({ min: 2, max: 4 }),
            year: String(faker.date.past({ years: 30 }).getFullYear()),
            price: faker.number.float({ min: 500, max: 50000, fractionDigits: 2 }),
            technique: faker.helpers.arrayElement([
                'Oil on canvas',
                'Acrylic',
                'Watercolor',
                'Mixed media',
                'Sculpture',
                'Photography',
            ]),
            materials: faker.helpers.multiple(
                () =>
                    faker.helpers.arrayElement([
                        'Canvas',
                        'Paper',
                        'Metal',
                        'Wood',
                        'Clay',
                        'Glass',
                        'Bronze',
                        'Marble',
                    ]),
                { count: { min: 1, max: 3 } }
            ),
            images,
            dimensions: `${faker.number.int({ min: 30, max: 200 })}cm x ${faker.number.int({ min: 30, max: 200 })}cm`,
            description: createBlockContent(faker.lorem.paragraphs(3)),
            artist: {
                _type: 'reference' as const,
                _ref: faker.helpers.arrayElement(artistIds),
            },
        })
    }
    return artworks
}

const generateProducts = async (
    artistIds: string[],
    count: number
): Promise<MockProduct[]> => {
    const products: MockProduct[] = []
    for (let i = 0; i < count; i++) {
        const imageCount = faker.number.int({ min: 1, max: 10 })
        const images = []
        for (let j = 0; j < imageCount; j++) {
            const imageId = await uploadImageToSanity(generateImageUrl())
            images.push({
                _type: 'image' as const,
                _key: faker.string.uuid(),
                asset: { _ref: imageId },
                alt: faker.lorem.sentence(),
                title: faker.lorem.words({ min: 2, max: 4 }),
            })
        }
        products.push({
            _type: 'product' as const,
            title: faker.commerce.productName(),
            year: String(faker.date.past({ years: 5 }).getFullYear()),
            creator: {
                _type: 'reference' as const,
                _ref: faker.helpers.arrayElement(artistIds),
            },
            price: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
            images,
            dimensions: `${faker.number.int({ min: 10, max: 50 })}cm x ${faker.number.int({ min: 10, max: 50 })}cm`,
            description: createBlockContent(faker.lorem.paragraphs(2)),
        })
    }
    return products
}

const generateEvents = async (count: number): Promise<MockEvent[]> => {
    const events: MockEvent[] = []
    for (let i = 0; i < count; i++) {
        const startDate = faker.date.future()
        const endDate = faker.datatype.boolean()
            ? new Date(startDate.getTime() + faker.number.int({ min: 86400000, max: 604800000 }))
            : undefined
        const imageId = await uploadImageToSanity(generateImageUrl())
        events.push({
            _type: 'event' as const,
            title: faker.lorem.words({ min: 2, max: 4 }),
            image: {
                _type: 'image' as const,
                asset: { _ref: imageId },
                alt: faker.lorem.sentence(),
            },
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate ? endDate.toISOString().split('T')[0] : undefined,
            startTime: `${faker.number.int({ min: 9, max: 20 })}:${faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0')}`,
            duration: faker.number.int({ min: 30, max: 480 }),
            description: createBlockContent(faker.lorem.paragraphs(2)),
        })
    }
    return events;
}

async function seedData() {
    try {
        const artists = await generateArtists(artistCount)
        const artistIds = artists.map((_, i) => `artist-${i}`)

        const artworks = await generateArtworks(artistIds, artistCount * 4)
        const products = await generateProducts(artistIds, artistCount * 3)
        const events = await generateEvents(20)

        const allDocs = [
            ...artists.map((doc, i) => ({ ...doc, _id: artistIds[i] })),
            ...artworks.map((doc, i) => ({ ...doc, _id: `artwork-${i}` })),
            ...products.map((doc, i) => ({ ...doc, _id: `product-${i}` })),
            ...events.map((doc, i) => ({ ...doc, _id: `event-${i}` })),
        ]

        console.log(`Generated ${allDocs.length} documents`)
        console.log(`  - ${artists.length} artists`)
        console.log(`  - ${artworks.length} artworks`)
        console.log(`  - ${products.length} products`)
        console.log(`  - ${events.length} events`)

        let created = 0

        for (const doc of allDocs) {
            try {
                await client.create(doc as any)
                created++
            } catch (err) {
                console.error(`Failed to create ${doc._id}:`, err)
            }
        }

        console.log(`Created ${created}/${allDocs.length} documents in ${dataset} dataset`)
        process.exit(0)
    } catch (error) {
        console.error('Error:', error)
        process.exit(1)
    }
}

seedData()
