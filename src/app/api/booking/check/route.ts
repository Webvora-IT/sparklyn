import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, bookingId } = await req.json()

    if (!email && !bookingId) {
      return NextResponse.json({ error: 'Email ou référence requis' }, { status: 400 })
    }

    const where: Record<string, unknown> = {}
    if (bookingId) where.id = { endsWith: bookingId.toUpperCase().slice(-8) }
    if (email) where.email = email.trim().toLowerCase()

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
        date: true,
        timeSlot: true,
        address: true,
        city: true,
        status: true,
        createdAt: true,
      },
    })

    // Filter by bookingId suffix if provided (since we can't do endsWith with CUID)
    let filtered = bookings
    if (bookingId) {
      const suffix = bookingId.toUpperCase().slice(-8)
      filtered = bookings.filter(b => b.id.toUpperCase().slice(-8) === suffix)
    }

    if (filtered.length === 0) {
      return NextResponse.json({ error: 'Aucune réservation trouvée' }, { status: 404 })
    }

    // Mask email for privacy
    const masked = filtered.map(b => ({
      ...b,
      email: b.email.replace(/(.{2}).+(@.+)/, '$1***$2'),
    }))

    return NextResponse.json({ bookings: masked })
  } catch (error) {
    console.error('Booking check error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
