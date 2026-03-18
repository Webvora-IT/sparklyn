import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Sparklyn | Premium Cleaning Services',
  description: 'Sparklyn offers premium eco-friendly cleaning services for homes and businesses.',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  return (
    <html lang={locale} className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
