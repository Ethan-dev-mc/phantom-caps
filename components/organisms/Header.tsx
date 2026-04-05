'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { IconCart, IconMenu, IconSearch } from '@/components/atoms/Icon'
import NavItem from '@/components/molecules/NavItem'
import MobileMenu from './MobileMenu'
import SearchBar from '@/components/molecules/SearchBar'
import PromoBar from './PromoBar'

const NAV_LINKS = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/catalogo/hoodies', label: 'Hoodies' },
  { href: '/catalogo/tenis', label: 'Tenis' },
  { href: '/catalogo/perfumes', label: 'Perfumes' },
  { href: '/kits', label: 'Kits' },
  { href: '/drops', label: 'Drops' },
]

interface HeaderProps {
  cartCount?: number
  onCartOpen?: () => void
  promoText?: string
}

export default function Header({ cartCount = 0, onCartOpen, promoText }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <PromoBar />

      <header
        className={clsx(
          'sticky top-0 z-30 w-full transition-all duration-300',
          scrolled
            ? 'bg-vx-black/95 backdrop-blur-md border-b border-vx-gray800'
            : 'bg-vx-black border-b border-vx-gray900'
        )}
      >
        <div className="container-site h-16 flex items-center justify-between gap-4">
          {/* Hamburguesa mobile */}
          <button
            className="lg:hidden p-2 -ml-2 text-vx-gray300 hover:text-vx-white transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <IconMenu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl text-vx-white tracking-widest hover:text-vx-cyan transition-colors flex-shrink-0"
          >
            VEINTIOX
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            {/* Búsqueda desktop */}
            {searchOpen ? (
              <div className="hidden lg:block w-56">
                <SearchBar autoFocus onClose={() => setSearchOpen(false)} />
              </div>
            ) : (
              <button
                className="hidden lg:flex p-2 text-vx-gray300 hover:text-vx-white transition-colors"
                onClick={() => setSearchOpen(true)}
                aria-label="Buscar"
              >
                <IconSearch className="w-5 h-5" />
              </button>
            )}

            {/* Búsqueda mobile */}
            <button
              className="lg:hidden p-2 text-vx-gray300 hover:text-vx-white transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Buscar"
            >
              <IconSearch className="w-5 h-5" />
            </button>

            {/* Carrito */}
            <button
              onClick={onCartOpen}
              aria-label={`Carrito (${cartCount} artículos)`}
              className="relative p-2 text-vx-gray300 hover:text-vx-white transition-colors"
            >
              <IconCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-vx-cyan text-vx-black text-2xs font-bold rounded-full flex items-center justify-center leading-none">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
