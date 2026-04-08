import { clsx } from 'clsx'

// ─── HEADING ────────────────────────────────────────────────
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

const headingSizes: Record<HeadingSize, string> = {
  xs:  'text-2xl',
  sm:  'text-3xl',
  md:  'text-4xl',
  lg:  'text-5xl',
  xl:  'text-6xl',
  '2xl': 'text-7xl',
  '3xl': 'text-8xl',
}

interface HeadingProps {
  as?: HeadingLevel
  size?: HeadingSize
  className?: string
  children: React.ReactNode
}

export function Heading({ as: Tag = 'h2', size = 'md', className, children }: HeadingProps) {
  return (
    <Tag
      className={clsx(
        'font-display tracking-wide text-vx-white',
        headingSizes[size],
        className
      )}
    >
      {children}
    </Tag>
  )
}

// ─── TEXT ────────────────────────────────────────────────────
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
type TextColor = 'white' | 'muted' | 'dim' | 'cyan'

const textSizes: Record<TextSize, string> = {
  xs:   'text-xs',
  sm:   'text-sm',
  base: 'text-base',
  lg:   'text-lg',
  xl:   'text-xl',
}

const textColors: Record<TextColor, string> = {
  white: 'text-vx-white',
  muted: 'text-vx-gray400',
  dim:   'text-vx-gray300',
  cyan:  'text-vx-cyan',
}

interface TextProps {
  as?: 'p' | 'span' | 'div' | 'li'
  size?: TextSize
  color?: TextColor
  className?: string
  children: React.ReactNode
}

export function Text({ as: Tag = 'p', size = 'base', color = 'white', className, children }: TextProps) {
  return (
    <Tag className={clsx('font-body', textSizes[size], textColors[color], className)}>
      {children}
    </Tag>
  )
}

// ─── LABEL ───────────────────────────────────────────────────
interface LabelProps {
  className?: string
  children: React.ReactNode
}

export function Label({ className, children }: LabelProps) {
  return (
    <span className={clsx('text-2xs tracking-caps uppercase font-body font-medium text-vx-cyan', className)}>
      {children}
    </span>
  )
}
