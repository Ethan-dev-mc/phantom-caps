'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'
import Button from '@/components/atoms/Button'

interface KitData {
  id?: string
  nombre?: string
  descripcion?: string
  precio?: number
  imagen?: string
  activo?: boolean
}

interface Props { kit?: KitData }

export default function KitForm({ kit }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    nombre:      kit?.nombre ?? '',
    descripcion: kit?.descripcion ?? '',
    precio:      kit?.precio?.toString() ?? '',
    imagen:      kit?.imagen ?? '',
    activo:      kit?.activo ?? true,
  })

  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }))

  const save = async () => {
    setSaving(true)
    const payload = {
      nombre:      form.nombre,
      descripcion: form.descripcion,
      precio:      parseFloat(form.precio) || 0,
      imagen:      form.imagen || null,
      activo:      form.activo,
    }
    const sb = supabase as any
    if (kit?.id) await sb.from('kits').update(payload).eq('id', kit.id)
    else await sb.from('kits').insert(payload)
    router.push('/admin/kits')
    router.refresh()
  }

  return (
    <div className="max-w-lg flex flex-col gap-4">
      <Input label="Nombre" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} required />
      <Textarea label="Descripción" value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)} />
      <Input label="Precio" type="number" step="0.01" value={form.precio} onChange={(e) => set('precio', e.target.value)} required />
      <Input label="URL imagen" value={form.imagen} onChange={(e) => set('imagen', e.target.value)} placeholder="https://..." />
      <label className="flex items-center gap-2 text-sm text-vx-gray300 cursor-pointer">
        <input type="checkbox" checked={form.activo} onChange={(e) => set('activo', e.target.checked)} className="accent-vx-cyan" />
        Activo
      </label>
      <div className="flex gap-3">
        <Button onClick={save} loading={saving}>{kit?.id ? 'Guardar' : 'Crear kit'}</Button>
        <Button variant="outline" onClick={() => router.back()}>Cancelar</Button>
      </div>
    </div>
  )
}
