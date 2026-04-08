'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { IconClose } from '@/components/atoms/Icon'
import { IconInstagram, IconTiktok } from '@/components/atoms/Icon'
import SearchBar from '@/components/molecules/SearchBar'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/catalogo/hoodies', label: 'Hoodies' },
  { href: '/catalogo/tenis', label: 'Tenis' },
  { href: '/catalogo/perfumes', label: 'Perfumes' },
  { href: '/kits', label: 'Kits Emprendedor' },
  { href: '/drops', label: 'Drops' },
  { href: '/contacto', label: 'Contacto' },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-vx-black/70 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={clsx(
          'fixed top-0 left-0 bottom-0 z-50 w-72 bg-vx-gray900 flex flex-col transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-vx-gray800">
          <span className="font-display text-2xl text-vx-white tracking-widest">VEINTIOX</span>
          <button onClick={onClose} aria-label="Cerrar menú" className="p-1.5 text-vx-gray400 hover:text-vx-white transition-colors">
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-4 border-b border-vx-gray800">
          <SearchBar onClose={onClose} autoFocus={false} />
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="block py-3 text-sm font-body font-medium text-vx-gray200 hover:text-vx-cyan border-b border-vx-gray800/50 transition-colors uppercase tracking-wide"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div className="px-5 py-4 border-t border-vx-gray800 flex gap-4">
          <a href="#" aria-label="Instagram" className="text-vx-gray400 hover:text-vx-cyan transition-colors">
            <IconInstagram className="w-5 h-5" />
          </a>
          <a href="#" aria-label="TikTok" className="text-vx-gray400 hover:text-vx-cyan transition-colors">
            <IconTiktok className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  )
}
