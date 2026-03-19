import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation, sendBookingNotificationToAdmin } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, address, city, service, frequency, date, timeSlot, rooms, notes } = body

    const required = ['name', 'email', 'phone', 'address', 'city', 'service', 'date', 'timeSlot']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    const bookingDate = new Date(body.date)
    if (isNaN(bookingDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
    }
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    if (bookingDate < yesterday) {
      return NextResponse.json({ error: 'Cannot book a date in the past' }, { status: 400 })
    }

    const booking = await prisma.booking.create({
      data: {
        name, email, phone,
        address: address || '',
        city: city || '',
        service, frequency, timeSlot,
        date: new Date(date),
        rooms: rooms ? parseInt(rooms) : null,
        notes,
        status: 'PENDING',
      },
    })

    // Send emails (non-blocking)
    Promise.all([
      sendBookingConfirmation({
        name, email, service, date, timeSlot,
        address: address || '',
        city: city || '',
        bookingId: booking.id,
      }),
      sendBookingNotificationToAdmin({
        name, email, phone, service, date, timeSlot,
        address: address || '',
        city: city || '',
        frequency, notes,
        bookingId: booking.id,
      }),
    ]).catch(err => console.error('Email send error:', err))

    return NextResponse.json({ success: true, id: booking.id })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

