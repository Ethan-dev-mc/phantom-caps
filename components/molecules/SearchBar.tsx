'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { IconSearch, IconClose } from '@/components/atoms/Icon'

interface SearchBarProps {
  className?: string
  onClose?: () => void
  autoFocus?: boolean
}

export default function SearchBar({ className, onClose, autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/catalogo?q=${encodeURIComponent(q)}`)
    onClose?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('relative flex items-center', className)}
      role="search"
    >
      <IconSearch className="absolute left-3 w-4 h-4 text-vx-gray500 pointer-events-none" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        aria-label="Buscar productos"
        className="w-full bg-vx-gray900 border border-vx-gray700 rounded-lg pl-10 pr-10 py-2.5 text-sm text-vx-white placeholder:text-vx-gray500 focus:outline-none focus:border-vx-cyan transition-colors"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Limpiar búsqueda"
          className="absolute right-3 text-vx-gray500 hover:text-vx-white transition-colors"
        >
          <IconClose className="w-4 h-4" />
        </button>
      )}
    </form>
  )
}
