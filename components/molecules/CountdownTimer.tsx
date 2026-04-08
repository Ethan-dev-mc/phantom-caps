'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

interface CountdownTimerProps {
  targetDate: string | Date
  onExpire?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

interface TimeLeft {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

function calcTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    dias:     Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas:    Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos:  Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  }
}

const unitLabel: Record<keyof TimeLeft, string> = {
  dias: 'Días', horas: 'Hrs', minutos: 'Min', segundos: 'Seg',
}

const sizeClasses = {
  sm: { digit: 'text-2xl', label: 'text-2xs', box: 'w-14 py-2' },
  md: { digit: 'text-4xl', label: 'text-xs',  box: 'w-20 py-3' },
  lg: { digit: 'text-5xl', label: 'text-sm',  box: 'w-24 py-4' },
}

export default function CountdownTimer({
  targetDate,
  onExpire,
  className,
  size = 'md',
}: CountdownTimerProps) {
  const target = targetDate instanceof Date ? targetDate : new Date(targetDate)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calcTimeLeft(target))
  const s = sizeClasses[size]

  useEffect(() => {
    if (!timeLeft) {
      onExpire?.()
      return
    }
    const id = setInterval(() => {
      const next = calcTimeLeft(target)
      setTimeLeft(next)
      if (!next) {
        clearInterval(id)
        onExpire?.()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [target, onExpire]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!timeLeft) {
    return (
      <div className={clsx('text-sm text-vx-cyan font-medium uppercase tracking-wider', className)}>
        ¡Disponible ahora!
      </div>
    )
  }

  const units = (Object.keys(timeLeft) as (keyof TimeLeft)[])

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {units.map((unit, i) => (
        <div key={unit} className="flex items-center gap-2">
          <div
            className={clsx(
              'flex flex-col items-center justify-center bg-vx-gray900 border border-vx-gray700 rounded-lg',
              s.box
            )}
          >
            <span
              className={clsx('font-display text-vx-white tabular-nums leading-none animate-countdown', s.digit)}
              key={timeLeft[unit]}
            >
              {String(timeLeft[unit]).padStart(2, '0')}
            </span>
            <span className={clsx('text-vx-gray400 uppercase tracking-wider mt-1', s.label)}>
              {unitLabel[unit]}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-vx-gray500 font-display text-2xl mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
