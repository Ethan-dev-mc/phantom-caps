import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // MP envía topic=payment cuando se aprueba un pago
    const { type, data } = body
    if (type !== 'payment') return NextResponse.json({ ok: true })

    const paymentId = data?.id
    if (!paymentId) return NextResponse.json({ ok: true })

    // Consultamos el pago a MP para verificar estado
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    })
    const payment = await mpRes.json()

    if (payment.status !== 'approved') return NextResponse.json({ ok: true })

    const pedidoId = payment.external_reference
    if (!pedidoId) return NextResponse.json({ ok: true })

    // Marcar pedido como pagado
    await supabase
      .from('pedidos')
      .update({ estado: 'pagado', mp_payment_id: String(paymentId) })
      .eq('id', pedidoId)

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[MP Webhook]', e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
