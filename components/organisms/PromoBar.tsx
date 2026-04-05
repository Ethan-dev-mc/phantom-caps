'use client'

import { IconTruck } from '@/components/atoms/Icon'

const items = [
  'BIENVENIDO A VEINTIOX',
  'ENVÍO GRATIS EN COMPRAS MAYORES A $999',
  'DROPS LIMITADOS CADA SEMANA',
  'PRODUCTOS 100% ORIGINALES',
]

export default function PromoBar() {
  const repeated = [...items, ...items]

  return (
    <div className="bg-vx-cyan text-vx-black text-xs font-body font-bold tracking-widest uppercase py-2.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-3 mx-6">
            <IconTruck className="w-3.5 h-3.5 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
