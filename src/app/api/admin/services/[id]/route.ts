import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()
  const service = await prisma.service.update({ where: { id: params.id }, data })
  return NextResponse.json(service)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.service.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
