import { clsx } from 'clsx'
import KitCard from '@/components/molecules/KitCard'
import { Skeleton } from '@/components/atoms/Skeleton'
import type { Kit } from '@/types/database'

interface KitWithCount extends Kit {
  itemCount?: number
}

interface KitGridProps {
  kits: KitWithCount[]
  loading?: boolean
  className?: string
}

function KitCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-6 w-1/3" />
    </div>
  )
}

export default function KitGrid({ kits, loading = false, className }: KitGridProps) {
  if (loading) {
    return (
      <div className={clsx('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
        {Array.from({ length: 3 }).map((_, i) => <KitCardSkeleton key={i} />)}
      </div>
    )
  }

  if (kits.length === 0) {
    return (
      <div className="py-20 text-center text-vx-gray500 text-sm">
        No hay kits disponibles por el momento.
      </div>
    )
  }

  return (
    <div className={clsx('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {kits.map((kit) => (
        <KitCard key={kit.id} kit={kit} />
      ))}
    </div>
  )
}
