import { useTranslations } from 'next-intl'

export default function Blog() {
  const t = useTranslations('blog')

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="text-neutral-600">
        {t('description')}
      </p>
    </div>
  )
}
