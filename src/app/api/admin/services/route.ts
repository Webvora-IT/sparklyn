import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(services)
  } catch (error) {
    console.error('GET admin/services error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const data = await req.json()
    if (!data.title || !data.description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }
    const service = await prisma.service.create({ data })
    return NextResponse.json(service)
  } catch (error) {
    console.error('POST admin/services error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
