import type { Metadata } from 'next'
import CartPageClient from './CartPageClient'

export const metadata: Metadata = { title: 'Carrito' }

export default function CarritoPage() {
  return <CartPageClient />
}
