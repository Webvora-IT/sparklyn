import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const reviews = await prisma.review.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('GET admin/reviews error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const data = await req.json()
    if (!data.name || !data.content) {
      return NextResponse.json({ error: 'Name and content are required' }, { status: 400 })
    }
    const review = await prisma.review.create({ data })
    return NextResponse.json(review)
  } catch (error) {
    console.error('POST admin/reviews error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
