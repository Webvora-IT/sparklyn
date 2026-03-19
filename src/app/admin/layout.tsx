import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/SessionProvider'
import { Toaster } from 'react-hot-toast'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Sparklyn Admin Panel',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50 antialiased">
        <SessionProvider session={session}>
          {children}
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  )
}
