import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const configs = await prisma.siteConfig.findMany()
    const config = configs.reduce((acc, c) => ({ ...acc, [c.key]: c.value }), {} as Record<string, string>)
    return NextResponse.json(config)
  } catch (error) {
    console.error('GET admin/config error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const data = await req.json()
    await Promise.all(
      Object.entries(data).map(([key, value]) =>
        prisma.siteConfig.upsert({
          where: { key },
          create: { key, value: String(value) },
          update: { value: String(value) },
        })
      )
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('POST admin/config error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
