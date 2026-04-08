'use client'

import { clsx } from 'clsx'

export interface FilterOption {
  value: string
  label: string
}

interface CategoryFilterProps {
  categories: FilterOption[]
  selected: string
  onSelect: (value: string) => void
  sortOptions?: FilterOption[]
  sortValue?: string
  onSortChange?: (value: string) => void
  className?: string
}

const DEFAULT_SORT: FilterOption[] = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
]

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  sortOptions = DEFAULT_SORT,
  sortValue = 'recientes',
  onSortChange,
  className,
}: CategoryFilterProps) {
  return (
    <div className={clsx('flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between', className)}>
      {/* Categorías */}
      <div className="flex flex-wrap gap-2">
        {[{ value: 'todos', label: 'Todos' }, ...categories].map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={clsx(
              'px-4 py-2 rounded-full text-xs font-body font-medium uppercase tracking-wider transition-all duration-200',
              selected === cat.value
                ? 'bg-vx-cyan text-vx-black'
                : 'bg-vx-gray900 border border-vx-gray700 text-vx-gray300 hover:border-vx-cyan hover:text-vx-cyan'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Ordenar */}
      {onSortChange && (
        <select
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-vx-gray900 border border-vx-gray700 rounded-lg px-3 py-2 text-xs text-vx-gray300 focus:outline-none focus:border-vx-cyan transition-colors"
          aria-label="Ordenar productos"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
    </div>
  )
}
