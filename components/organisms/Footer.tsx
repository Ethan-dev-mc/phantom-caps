import Link from 'next/link'
import { IconInstagram, IconTiktok, IconFacebook } from '@/components/atoms/Icon'

const CATEGORIAS = [
  { href: '/catalogo/hoodies', label: 'Hoodies' },
  { href: '/catalogo/tenis',   label: 'Tenis' },
  { href: '/catalogo/perfumes', label: 'Perfumes' },
  { href: '/kits',             label: 'Kits Emprendedor' },
  { href: '/drops',            label: 'Drops' },
]

const LEGALES = [
  { href: '/privacidad', label: 'Aviso de privacidad' },
  { href: '/terminos',   label: 'Términos y condiciones' },
  { href: '/contacto',   label: 'Contacto' },
]

interface FooterProps {
  instagramUrl?: string
  tiktokUrl?: string
  facebookUrl?: string
}

export default function Footer({
  instagramUrl = '#',
  tiktokUrl = '#',
  facebookUrl = '#',
}: FooterProps) {
  return (
    <footer className="bg-vx-gray900 border-t border-vx-gray800">
      <div className="container-site py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-3xl text-vx-white tracking-widest hover:text-vx-cyan transition-colors">
              VEINTIOX
            </Link>
            <p className="mt-3 text-sm text-vx-gray400 max-w-xs leading-relaxed">
              Hoodies, tenis y perfumes. Drops limitados cada semana. Kits para emprendedores.
            </p>
            <div className="flex gap-4 mt-5">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-vx-gray500 hover:text-vx-cyan transition-colors">
                <IconInstagram className="w-5 h-5" />
              </a>
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-vx-gray500 hover:text-vx-cyan transition-colors">
                <IconTiktok className="w-5 h-5" />
              </a>
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-vx-gray500 hover:text-vx-cyan transition-colors">
                <IconFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-xs font-body font-semibold text-vx-gray300 uppercase tracking-wider mb-4">Productos</h3>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIAS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-vx-gray500 hover:text-vx-cyan transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legales */}
          <div>
            <h3 className="text-xs font-body font-semibold text-vx-gray300 uppercase tracking-wider mb-4">Info</h3>
            <ul className="flex flex-col gap-2.5">
              {LEGALES.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-vx-gray500 hover:text-vx-cyan transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-vx-gray800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-vx-gray600">
          <span>© {new Date().getFullYear()} Veintiox. Todos los derechos reservados.</span>
          <span>Hecho en México 🇲🇽</span>
        </div>
      </div>
    </footer>
  )
}
