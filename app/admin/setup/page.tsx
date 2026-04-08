'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

export default function SetupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signUpError } = await (supabase as any).auth.signUp({ email, password })
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Auto login tras registro
    const { error: loginError } = await (supabase as any).auth.signInWithPassword({ email, password })
    if (loginError) {
      setError('Cuenta creada. Inicia sesión manualmente.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-vx-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-display text-3xl text-vx-white tracking-widest">VEINTIOX</span>
          <p className="text-xs text-vx-gray500 uppercase tracking-wider mt-1">Configuración inicial</p>
        </div>

        <form onSubmit={handleSetup} className="bg-vx-gray900 rounded-2xl p-6 flex flex-col gap-5">
          <div>
            <p className="text-sm text-vx-white font-semibold mb-1">Crear cuenta administrador</p>
            <p className="text-xs text-vx-gray500">Usa este formulario solo la primera vez para crear tu acceso.</p>
          </div>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@veintiox.store"
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <Button type="submit" fullWidth loading={loading}>Crear cuenta y entrar</Button>
          <p className="text-center text-xs text-vx-gray500">
            ¿Ya tienes cuenta?{' '}
            <a href="/admin/login" className="text-vx-cyan hover:underline">Iniciar sesión</a>
          </p>
        </form>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic'
