import { clsx } from 'clsx'

type BadgeVariant = 'default' | 'cyan' | 'success' | 'warning' | 'danger' | 'drop'

const variants: Record<BadgeVariant, string> = {
  default: 'bg-vx-gray800 text-vx-gray200 border border-vx-gray700',
  cyan:    'bg-vx-cyan/10 text-vx-cyan border border-vx-cyan/30',
  success: 'bg-green-500/10 text-green-400 border border-green-500/30',
  warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
  danger:  'bg-red-500/10 text-red-400 border border-red-500/30',
  drop:    'bg-vx-cyan text-vx-black font-bold',
}

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

export default function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded text-2xs tracking-wider uppercase font-body font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
