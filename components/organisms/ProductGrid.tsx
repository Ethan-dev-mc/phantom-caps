'use client'

import { useState, useMemo } from 'react'
import { clsx } from 'clsx'
import ProductCard from '@/components/molecules/ProductCard'
import CategoryFilter, { type FilterOption } from './CategoryFilter'
import { ProductGridSkeleton } from '@/components/atoms/Skeleton'
import type { Producto } from '@/types/database'

interface ProductGridProps {
  products: Producto[]
  categories?: FilterOption[]
  loading?: boolean
  onAddToCart?: (id: string) => void
  className?: string
  showFilters?: boolean
}

export default function ProductGrid({
  products,
  categories = [],
  loading = false,
  onAddToCart,
  className,
  showFilters = true,
}: ProductGridProps) {
  const [selectedCat, setSelectedCat] = useState('todos')
  const [sort, setSort] = useState('recientes')

  const filtered = useMemo(() => {
    let list = selectedCat === 'todos' ? products : products.filter((p) => p.categoria_id === selectedCat)
    if (sort === 'precio-asc') list = [...list].sort((a, b) => a.precio - b.precio)
    if (sort === 'precio-desc') list = [...list].sort((a, b) => b.precio - a.precio)
    return list
  }, [products, selectedCat, sort])

  if (loading) return <ProductGridSkeleton />

  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      {showFilters && categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selected={selectedCat}
          onSelect={setSelectedCat}
          sortValue={sort}
          onSortChange={setSort}
        />
      )}

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-vx-gray500 text-sm">
          No se encontraron productos.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  )
}
