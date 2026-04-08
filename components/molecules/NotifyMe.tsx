'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import Button from '@/components/atoms/Button'
import { IconZap } from '@/components/atoms/Icon'

interface NotifyMeProps {
  dropId?: string
  className?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function NotifyMe({ dropId, className }: NotifyMeProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/notificame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, dropId }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={clsx('flex items-center gap-2 text-vx-cyan text-sm font-medium', className)}>
        <IconZap className="w-4 h-4" />
        Te avisamos cuando esté disponible
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={clsx('flex flex-col sm:flex-row gap-2', className)}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        aria-label="Correo electrónico"
        className="flex-1 bg-vx-gray900 border border-vx-gray700 rounded-lg px-4 py-3 text-sm text-vx-white placeholder:text-vx-gray500 focus:outline-none focus:border-vx-cyan transition-colors"
      />
      <Button type="submit" loading={status === 'loading'} size="md">
        Notifícame
      </Button>
      {status === 'error' && (
        <p className="text-xs text-red-400 w-full">Error al registrar. Intenta de nuevo.</p>
      )}
    </form>
  )
}
