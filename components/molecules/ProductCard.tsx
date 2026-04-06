'use client'

import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'
import Badge from '@/components/atoms/Badge'
import Price from '@/components/atoms/Price'
import { IconCart } from '@/components/atoms/Icon'

interface ProductCardProps {
  product: {
    id: string
    slug: string
    nombre: string
    precio: number
    precio_comparacion?: number | null
    imagenes: string[]
    stock: number
    destacado?: boolean
  }
  className?: string
  onAddToCart?: (id: string) => void
}

export default function ProductCard({ product, className, onAddToCart }: ProductCardProps) {
  const { id, slug, nombre, precio, precio_comparacion, imagenes, stock, destacado } = product
  const agotado = stock === 0
  const imagen = imagenes?.[0] ?? ''
  const hasDiscount = precio_comparacion != null && precio_comparacion > precio

  return (
    <article className={clsx('group relative flex flex-col', className)}>
      {/* Imagen */}
      <Link href={`/producto/${slug}`} className="relative block overflow-hidden rounded-xl bg-vx-gray900 aspect-square">
        {imagen ? (
          <Image
            src={imagen}
            alt={nombre}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={clsx(
              'object-contain transition-transform duration-500 group-hover:scale-105',
              agotado && 'opacity-50'
            )}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-vx-gray600">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {agotado && <Badge variant="danger">Agotado</Badge>}
          {!agotado && hasDiscount && <Badge variant="cyan">Oferta</Badge>}
          {!agotado && destacado && !hasDiscount && <Badge variant="drop">Destacado</Badge>}
        </div>

        {/* Overlay CTA */}
        {!agotado && onAddToCart && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onAddToCart(id) }}
            aria-label={`Agregar ${nombre} al carrito`}
            className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-2 bg-vx-cyan text-vx-black text-xs font-bold uppercase tracking-wider py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          >
            <IconCart className="w-4 h-4" />
            Agregar
          </button>
        )}
      </Link>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-1">
        <Link
          href={`/producto/${slug}`}
          className="text-sm text-vx-gray200 hover:text-vx-white transition-colors line-clamp-2 leading-snug"
        >
          {nombre}
        </Link>
        <Price amount={precio} compare={precio_comparacion ?? undefined} size="sm" />
      </div>
    </article>
  )
}
