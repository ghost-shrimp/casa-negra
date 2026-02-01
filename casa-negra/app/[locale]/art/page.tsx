import { MosaicSpinner } from '@/components/mosaic-spinner'
import { ArtList } from '@/features/art'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'

export default function Gallery() {
  const t = useTranslations('art')

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="text-neutral-600">
        {t('description')}
      </p>
      <Suspense fallback={<MosaicSpinner />}>
        <ArtList />
      </Suspense>
    </div>
  )
}
