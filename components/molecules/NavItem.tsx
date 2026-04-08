'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

interface NavItemProps {
  href: string
  label: string
  className?: string
  onClick?: () => void
}

export default function NavItem({ href, label, className, onClick }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'relative text-sm font-body font-medium tracking-wide uppercase transition-colors duration-200',
        'after:absolute after:bottom-0 after:left-0 after:h-px after:bg-vx-cyan',
        'after:transition-all after:duration-200',
        isActive
          ? 'text-vx-cyan after:w-full'
          : 'text-vx-gray300 hover:text-vx-white after:w-0 hover:after:w-full',
        className
      )}
    >
      {label}
    </Link>
  )
}
