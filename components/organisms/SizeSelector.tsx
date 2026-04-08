'use client'

import { clsx } from 'clsx'

interface SizeSelectorProps {
  tallas: string[]
  selected: string | null
  onSelect: (talla: string) => void
  className?: string
}

export default function SizeSelector({ tallas, selected, onSelect, className }: SizeSelectorProps) {
  if (tallas.length === 0) return null

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-vx-gray300 font-medium">Talla</span>
        {selected && <span className="text-sm text-vx-cyan font-medium">{selected}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {tallas.map((talla) => (
          <button
            key={talla}
            type="button"
            onClick={() => onSelect(talla)}
            aria-pressed={selected === talla}
            className={clsx(
              'min-w-[44px] h-11 px-3 rounded-lg border text-sm font-body font-medium transition-all duration-150',
              selected === talla
                ? 'bg-vx-cyan text-vx-black border-vx-cyan font-bold'
                : 'bg-transparent text-vx-gray200 border-vx-gray700 hover:border-vx-cyan hover:text-vx-cyan'
            )}
          >
            {talla}
          </button>
        ))}
      </div>
    </div>
  )
}
