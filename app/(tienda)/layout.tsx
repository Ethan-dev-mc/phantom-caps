'use client'

import { useCartStore } from '@/stores/cartStore'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import CartProvider from '@/components/organisms/CartProvider'
import { ToastProvider } from '@/components/atoms/Toast'

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <TiendaLayoutInner>{children}</TiendaLayoutInner>
      </CartProvider>
    </ToastProvider>
  )
}

function TiendaLayoutInner({ children }: { children: React.ReactNode }) {
  const { totalItems, openCart } = useCartStore()
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartCount={totalItems()} onCartOpen={openCart} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
