'use client'

import { useState } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { Heading, Label } from '@/components/atoms/Typography'
import Badge from '@/components/atoms/Badge'
import CountdownTimer from '@/components/molecules/CountdownTimer'
import NotifyMe from '@/components/molecules/NotifyMe'
import ProductCard from '@/components/molecules/ProductCard'
import type { Producto } from '@/types/database'

type DropEstado = 'proximo' | 'activo' | 'agotado'

interface DropSectionProps {
  drop?: {
    id: string
    nombre: string
    descripcion: string
    fecha_inicio: string
    imagen?: string | null
    productos?: Producto[]
  }
  estado: DropEstado
  className?: string
  onAddToCart?: (id: string) => void
}

export default function DropSection({ drop, estado, className, onAddToCart }: DropSectionProps) {
  const [expired, setExpired] = useState(false)
  const currentEstado = expired && estado === 'proximo' ? 'activo' : estado

  // Sin drop configurado
  if (!drop) {
    return (
      <section className={clsx('py-20 text-center', className)}>
        <Label>Drops exclusivos</Label>
        <Heading size="lg" className="mt-3 mb-4">PRÓXIMAMENTE</Heading>
        <p className="text-vx-gray400 max-w-md mx-auto mb-8">
          Estamos preparando algo especial. Regístrate y sé el primero en enterarte.
        </p>
        <NotifyMe className="max-w-sm mx-auto" />
      </section>
    )
  }

  return (
    <section className={clsx('relative overflow-hidden', className)}>
      {/* Fondo con imagen */}
      {drop.imagen && (
        <>
          <Image src={drop.imagen} alt={drop.nombre} fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-vx-black via-vx-black/80 to-vx-black" />
        </>
      )}

      <div className="relative z-10 container-site py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            {currentEstado === 'proximo' && <Badge variant="warning">Próximo drop</Badge>}
            {currentEstado === 'activo'  && <Badge variant="drop">Drop activo — ¡Corre!</Badge>}
            {currentEstado === 'agotado' && <Badge variant="danger">Agotado</Badge>}
          </div>

          <Label>Drop exclusivo</Label>
          <Heading size="xl" className="mt-2 mb-3">{drop.nombre}</Heading>
          <p className="text-vx-gray300 mb-8 leading-relaxed">{drop.descripcion}</p>

          {/* Estado: PRÓXIMO — mostrar timer + notifícame */}
          {currentEstado === 'proximo' && (
            <div className="flex flex-col items-center gap-8">
              <div>
                <p className="text-vx-gray400 text-sm mb-4 uppercase tracking-wider">Disponible en</p>
                <CountdownTimer
                  targetDate={drop.fecha_inicio}
                  onExpire={() => setExpired(true)}
                  size="lg"
                />
              </div>
              <div className="w-full max-w-md">
                <p className="text-vx-gray400 text-sm mb-3">Recibe un aviso cuando esté disponible</p>
                <NotifyMe dropId={drop.id} />
              </div>
            </div>
          )}

          {/* Estado: AGOTADO */}
          {currentEstado === 'agotado' && (
            <div className="flex flex-col items-center gap-6">
              <p className="text-vx-gray400">Este drop terminó. Únete a la lista para el próximo.</p>
              <NotifyMe dropId={drop.id} className="max-w-sm w-full" />
            </div>
          )}
        </div>

        {/* Estado: ACTIVO — mostrar productos */}
        {currentEstado === 'activo' && drop.productos && drop.productos.length > 0 && (
          <div className="mt-12">
            <p className="text-center text-vx-gray400 text-sm mb-6 uppercase tracking-wider">
              Solo {drop.productos.reduce((acc, p) => acc + p.stock, 0)} piezas disponibles
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {drop.productos.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
