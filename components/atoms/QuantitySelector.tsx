'use client'

import { clsx } from 'clsx'
import { IconMinus, IconPlus } from './Icon'

interface QuantitySelectorProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  disabled?: boolean
  className?: string
}

export default function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const decrement = () => { if (value > min) onChange(value - 1) }
  const increment = () => { if (value < max) onChange(value + 1) }

  return (
    <div
      className={clsx(
        'inline-flex items-center border border-vx-gray700 rounded-lg overflow-hidden',
        disabled && 'opacity-40 pointer-events-none',
        className
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="Reducir cantidad"
        className="flex items-center justify-center w-9 h-9 text-vx-gray300 hover:text-vx-white hover:bg-vx-gray800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <IconMinus className="w-3.5 h-3.5" />
      </button>

      <span className="w-10 text-center text-sm font-body font-medium text-vx-white select-none">
        {value}
      </span>

      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        aria-label="Aumentar cantidad"
        className="flex items-center justify-center w-9 h-9 text-vx-gray300 hover:text-vx-white hover:bg-vx-gray800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <IconPlus className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
