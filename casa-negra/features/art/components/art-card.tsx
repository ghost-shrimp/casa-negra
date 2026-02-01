import Image from 'next/image';
import { Artwork, typeLabels } from '../types/types';
import { useTranslations } from 'next-intl';

export function ArtCard({ artwork }: { artwork: Artwork }) {
  const t = useTranslations('art');
  return (
    <div className="group overflow-hidden bg-white transition-all hover:shadow-md hover:cursor-pointer rounded">
      <div className="overflow-hidden bg-gray-100">
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          width={800}
          height={1200}
          className="h-auto w-full object-contain transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{artwork.title}</h3>
        <p className="text-sm text-gray-500">{t(`type.${typeLabels[artwork.type]}`)}</p>
        <p className="mt-2 font-medium text-black">
          ${artwork.price?.toLocaleString() || '0'}
        </p>
      </div>
    </div>
  );
}