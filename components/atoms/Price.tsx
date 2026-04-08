import { clsx } from 'clsx'

interface PriceProps {
  amount: number
  compare?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: { price: 'text-base', compare: 'text-sm' },
  md: { price: 'text-xl',  compare: 'text-base' },
  lg: { price: 'text-2xl', compare: 'text-lg' },
  xl: { price: 'text-3xl', compare: 'text-xl' },
}

function formatMXN(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export default function Price({ amount, compare, size = 'md', className }: PriceProps) {
  const s = sizes[size]
  const hasDiscount = compare !== undefined && compare > amount

  return (
    <div className={clsx('inline-flex items-center gap-2', className)}>
      <span className={clsx('font-body font-bold text-vx-white', s.price)}>
        {formatMXN(amount)}
      </span>
      {hasDiscount && (
        <span className={clsx('font-body text-vx-gray500 line-through', s.compare)}>
          {formatMXN(compare)}
        </span>
      )}
    </div>
  )
}
