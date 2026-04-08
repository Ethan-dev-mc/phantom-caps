import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function createStripeSession(pedidoId: string, total: number) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'mxn',
    line_items: [
      {
        price_data: {
          currency: 'mxn',
          product_data: { name: 'Pedido Veintiox' },
          unit_amount: Math.round(total * 100),
        },
        quantity: 1,
      },
    ],
    metadata: { pedidoId },
    success_url: `${base}/checkout/confirmacion?pedido={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/carrito`,
  })

  return session.url
}
