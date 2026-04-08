import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/payments/stripe'
import { createSupabaseAdminClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const pedidoId = session.metadata?.pedidoId
    if (pedidoId) {
      const supabase = createSupabaseAdminClient() as any
      await supabase
        .from('pedidos')
        .update({ estado: 'pagado', pago_referencia: session.id })
        .eq('id', pedidoId)
    }
  }

  return NextResponse.json({ received: true })
}
