import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const [totalBookings, pendingBookings, totalReviews, totalContacts] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.review.count({ where: { published: true } }),
      prisma.contact.count({ where: { status: 'NEW' } }),
    ])
    const completedBookings = await prisma.booking.findMany({ where: { status: 'COMPLETED' }, select: { price: true } })
    const revenue = completedBookings.reduce((sum, b) => sum + (b.price || 0), 0)
    return NextResponse.json({ totalBookings, pendingBookings, totalReviews, totalContacts, revenue })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
