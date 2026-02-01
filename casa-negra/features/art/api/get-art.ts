import { sanityFetch } from '@/libs/sanity';
import { Artwork } from '../types/types';

export const getArt = async (filters: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    sortOrder?: 'asc' | 'desc' | 'newest';
}) => {
    const filterConditions = ['_type == "artwork"'];

    if (filters.type) {
        filterConditions.push(`type == "${filters.type}"`);
    }
    if (filters.minPrice !== undefined) {
        filterConditions.push(`price >= ${filters.minPrice}`);
    }
    if (filters.maxPrice !== undefined) {
        filterConditions.push(`price <= ${filters.maxPrice}`);
    }

    const filterString = filterConditions.join(' && ');

    const orderMap = {
        'asc': 'price asc',
        'desc': 'price desc',
        'newest': '_createdAt desc'
    };

    const query = `*[${filterString}] | order(${orderMap[filters.sortOrder || 'newest']}){
        _id,
        title,
        year,
        price,
        type,
        technique,
        "imageUrl": images[0].asset->url,
        "artistName": artist->name
    }`;

    return await sanityFetch<Artwork[]>({ query, tags: ['artwork'] });
};