import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('GET admin/bookings error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
