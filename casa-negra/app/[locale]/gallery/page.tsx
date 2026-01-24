import { useTranslations } from 'next-intl'

export default function Gallery() {
  const t = useTranslations('gallery')

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="text-neutral-600">
        {t('description')}
      </p>
    </div>
  )
}
