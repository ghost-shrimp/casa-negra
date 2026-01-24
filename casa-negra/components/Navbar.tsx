'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const t = useTranslations('common')
  const locale = useLocale()
  const router = useRouter()

  const links = [
    { href: '/', label: t('home') },
    { href: '/gallery', label: t('gallery') },
    { href: '/store', label: t('store') },
    { href: '/events', label: t('events') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
  ]

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en'
    router.push(`/${newLocale}`)
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <span className="font-semibold tracking-wide">
          Casa Negra
        </span>

        <div className="flex items-center gap-6">
          <ul className="flex gap-4 text-sm text-neutral-600">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-neutral-900 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleLanguage}
            className="ml-4 rounded bg-neutral-100 px-3 py-1 text-sm font-medium hover:bg-neutral-200 transition"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  )
}
