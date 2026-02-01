'use client';
import { MosaicSpinner } from '@/components/mosaic-spinner';
import { useArtList } from '../hooks/use-art-list';
import { ArtCard } from './art-card';
import { StatusMessage } from '@/components/status-message';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function ArtList() {
  const t = useTranslations('art');
  const router = useRouter();
  const pathname = usePathname();
  const { data: artworks, isLoading, isError, error, refetch } = useArtList();

  if (isLoading) {
    return <MosaicSpinner />;
  }

  if (isError) {
    return (
      <StatusMessage
        title={t('common:error.title')}
        message={t('common:error.message')}
        action={() => refetch()}
        actionText={t('common:error.actionText')}
      />
    );
  }
  if (!artworks || artworks.length === 0) {
    return (
      <StatusMessage
        title={t('empty.title')}
        message={t('empty.message')}
        action={() => {
          router.push(pathname)
          refetch()
        }}
        actionText={t('empty.actionText')}
      />
    );
  }

  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {artworks.map((art, index) => (
        <div key={art._id} className="mb-6 break-inside-avoid">
          <ArtCard artwork={art} />
        </div>
      ))}
    </div>
  );
}