import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'
import Badge from '@/components/atoms/Badge'
import Price from '@/components/atoms/Price'
import { IconPackage } from '@/components/atoms/Icon'

interface KitCardProps {
  kit: {
    id: string
    slug: string
    nombre: string
    descripcion: string
    precio: number
    imagen: string
    itemCount?: number
  }
  className?: string
}

export default function KitCard({ kit, className }: KitCardProps) {
  const { slug, nombre, descripcion, precio, imagen, itemCount } = kit

  return (
    <article className={clsx('group flex flex-col', className)}>
      {/* Imagen */}
      <Link
        href={`/kits/${slug}`}
        className="relative block overflow-hidden rounded-xl bg-vx-gray900 aspect-[4/3]"
      >
        {imagen ? (
          <Image
            src={imagen}
            alt={nombre}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-vx-gray600">
            <IconPackage className="w-14 h-14" />
          </div>
        )}

        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-vx-black/70 via-transparent to-transparent" />

        {/* Badge items */}
        {itemCount != null && (
          <div className="absolute top-3 right-3">
            <Badge variant="cyan">{itemCount} artículos</Badge>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-2">
        <Link
          href={`/kits/${slug}`}
          className="text-base font-body font-semibold text-vx-white hover:text-vx-cyan transition-colors line-clamp-1"
        >
          {nombre}
        </Link>
        <p className="text-sm text-vx-gray400 line-clamp-2 leading-relaxed">{descripcion}</p>
        <div className="flex items-center justify-between pt-1">
          <Price amount={precio} size="md" />
          <Badge variant="default">Kit emprendedor</Badge>
        </div>
      </div>
    </article>
  )
}
