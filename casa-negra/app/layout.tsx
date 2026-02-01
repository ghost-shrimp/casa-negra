import './globals.css'
import Providers from '@/providers';

export const metadata = {
  title: 'Casa Negra',
  description: 'Casa Negra - Your space',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>

  )
}
