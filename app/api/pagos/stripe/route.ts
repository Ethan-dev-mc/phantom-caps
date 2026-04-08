import { NextRequest, NextResponse } from 'next/server'
import { createStripeSession } from '@/lib/payments/stripe'

export async function POST(req: NextRequest) {
  const { pedidoId, total } = await req.json()
  try {
    const url = await createStripeSession(pedidoId, total)
    return NextResponse.json({ url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
