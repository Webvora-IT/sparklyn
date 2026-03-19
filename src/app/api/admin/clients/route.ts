import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // Aggregate unique clients from bookings
    const bookings = await prisma.booking.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        service: true,
        status: true,
        price: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Group by email to get unique clients
    const clientMap = new Map<string, {
      email: string
      name: string
      phone: string
      city: string
      bookingCount: number
      totalSpent: number
      lastBooking: Date
      services: string[]
      statuses: string[]
    }>()

    for (const b of bookings) {
      const key = b.email.toLowerCase()
      if (!clientMap.has(key)) {
        clientMap.set(key, {
          email: b.email,
          name: b.name,
          phone: b.phone,
          city: b.city,
          bookingCount: 0,
          totalSpent: 0,
          lastBooking: b.createdAt,
          services: [],
          statuses: [],
        })
      }
      const c = clientMap.get(key)!
      c.bookingCount++
      c.totalSpent += b.price ?? 0
      if (b.createdAt > c.lastBooking) {
        c.lastBooking = b.createdAt
        c.name = b.name
        c.phone = b.phone
        c.city = b.city
      }
      if (!c.services.includes(b.service)) c.services.push(b.service)
      if (!c.statuses.includes(b.status)) c.statuses.push(b.status)
    }

    const clients = Array.from(clientMap.values()).sort(
      (a, b) => b.lastBooking.getTime() - a.lastBooking.getTime()
    )

    return NextResponse.json(clients)
  } catch (error) {
    console.error('GET admin/clients error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
