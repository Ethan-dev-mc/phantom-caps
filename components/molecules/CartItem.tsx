'use client'

import Image from 'next/image'
import { clsx } from 'clsx'
import Price from '@/components/atoms/Price'
import QuantitySelector from '@/components/atoms/QuantitySelector'
import { IconTrash } from '@/components/atoms/Icon'

export interface CartItemData {
  id: string
  productoId: string
  nombre: string
  precio: number
  imagen: string
  talla?: string
  cantidad: number
}

interface CartItemProps {
  item: CartItemData
  onQuantityChange: (id: string, cantidad: number) => void
  onRemove: (id: string) => void
  className?: string
}

export default function CartItem({ item, onQuantityChange, onRemove, className }: CartItemProps) {
  const { id, nombre, precio, imagen, talla, cantidad } = item
  const subtotal = precio * cantidad

  return (
    <div className={clsx('flex gap-3 py-4 border-b border-vx-gray800 last:border-0', className)}>
      {/* Imagen */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-vx-gray900">
        {imagen ? (
          <Image src={imagen} alt={nombre} fill sizes="80px" className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-vx-gray800" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <p className="text-sm text-vx-white font-medium line-clamp-2 leading-snug">{nombre}</p>
        {talla && (
          <p className="text-xs text-vx-gray400">Talla: <span className="text-vx-gray200">{talla}</span></p>
        )}

        <div className="flex items-center justify-between mt-auto pt-1">
          <QuantitySelector
            value={cantidad}
            min={1}
            max={99}
            onChange={(val) => onQuantityChange(id, val)}
          />
          <Price amount={subtotal} size="sm" />
        </div>
      </div>

      {/* Eliminar */}
      <button
        type="button"
        onClick={() => onRemove(id)}
        aria-label={`Eliminar ${nombre}`}
        className="flex-shrink-0 self-start p-1.5 text-vx-gray500 hover:text-red-400 transition-colors"
      >
        <IconTrash className="w-4 h-4" />
      </button>
    </div>
  )
}
