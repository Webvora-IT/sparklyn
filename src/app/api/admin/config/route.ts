import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const configs = await prisma.siteConfig.findMany()
  const config = configs.reduce((acc, c) => ({ ...acc, [c.key]: c.value }), {} as Record<string, string>)
  return NextResponse.json(config)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const results = await Promise.all(
    Object.entries(data).map(([key, value]) =>
      prisma.siteConfig.upsert({
        where: { key },
        create: { key, value: String(value) },
        update: { value: String(value) },
      })
    )
  )
  return NextResponse.json({ success: true })
}
