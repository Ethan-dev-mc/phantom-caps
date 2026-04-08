'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'
import Button from '@/components/atoms/Button'
import { IconCheck } from '@/components/atoms/Icon'

const schema = z.object({
  nombre:  z.string().min(2, 'Nombre requerido'),
  email:   z.string().email('Email inválido'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-vx-cyan/10 border border-vx-cyan/30 flex items-center justify-center">
          <IconCheck className="w-7 h-7 text-vx-cyan" />
        </div>
        <p className="text-vx-white font-medium text-lg">¡Mensaje enviado!</p>
        <p className="text-vx-gray400 text-sm">Te respondemos en menos de 24 horas.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input label="Nombre" placeholder="Tu nombre" error={errors.nombre?.message} {...register('nombre')} />
      <Input label="Email" type="email" placeholder="tu@email.com" error={errors.email?.message} {...register('email')} />
      <Textarea label="Mensaje" placeholder="¿En qué podemos ayudarte?" error={errors.mensaje?.message} {...register('mensaje')} />
      <Button type="submit" size="lg" loading={isSubmitting} fullWidth>Enviar mensaje</Button>
    </form>
  )
}
