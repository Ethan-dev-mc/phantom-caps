'use client'

import { useCartStore } from '@/stores/cartStore'
import CartDrawer from './CartDrawer'

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { items, open, closeCart, updateQuantity, removeItem } = useCartStore()

  return (
    <>
      {children}
      <CartDrawer
        open={open}
        onClose={closeCart}
        items={items}
        onQuantityChange={updateQuantity}
        onRemove={removeItem}
      />
    </>
  )
}
