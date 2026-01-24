import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import Navbar from '@/components/Navbar'

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar />
      <main className="mx-auto max-w-5xl p-6">
        {children}
      </main>
    </NextIntlClientProvider>
  )
}
