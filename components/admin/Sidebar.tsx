'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { supabase } from '@/lib/supabase'
import {
  IconDashboard, IconPackage, IconZap, IconCart,
  IconUsers, IconSettings, IconLogOut, IconTag,
} from '@/components/atoms/Icon'

const NAV = [
  { href: '/admin/dashboard',     label: 'Dashboard',     icon: IconDashboard },
  { href: '/admin/productos',     label: 'Productos',     icon: IconPackage },
  { href: '/admin/kits',          label: 'Kits',          icon: IconPackage },
  { href: '/admin/drops',         label: 'Drops',         icon: IconZap },
  { href: '/admin/pedidos',       label: 'Pedidos',       icon: IconCart },
  { href: '/admin/cupones',       label: 'Cupones',       icon: IconTag },
  { href: '/admin/usuarios',      label: 'Usuarios',      icon: IconUsers },
  { href: '/admin/configuracion', label: 'Configuración', icon: IconSettings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await (supabase as any).auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-60 flex-shrink-0 bg-vx-gray900 border-r border-vx-gray800 flex flex-col">
      <div className="px-5 py-5 border-b border-vx-gray800">
        <Link href="/admin/dashboard" className="font-display text-xl text-vx-white tracking-widest hover:text-vx-cyan transition-colors">
          VEINTIOX
        </Link>
        <p className="text-2xs text-vx-gray500 uppercase tracking-wider mt-0.5">Panel Admin</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-colors',
                    active
                      ? 'bg-vx-cyan/10 text-vx-cyan'
                      : 'text-vx-gray400 hover:text-vx-white hover:bg-vx-gray800'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-vx-gray800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-vx-gray400 hover:text-red-400 hover:bg-vx-gray800 transition-colors"
        >
          <IconLogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
