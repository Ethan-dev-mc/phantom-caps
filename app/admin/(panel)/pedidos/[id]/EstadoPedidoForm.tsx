'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'

const ESTADOS = [
  { value: 'pendiente',  label: 'Pendiente' },
  { value: 'pagado',     label: 'Pagado' },
  { value: 'enviado',    label: 'Enviado' },
  { value: 'entregado',  label: 'Entregado' },
  { value: 'cancelado',  label: 'Cancelado' },
]

export default function EstadoPedidoForm({ pedidoId, estadoActual }: { pedidoId: string; estadoActual: string }) {
  const router = useRouter()
  const [estado, setEstado] = useState(estadoActual)
  const [loading, setLoading] = useState(false)

  const save = async () => {
    setLoading(true)
    await (supabase as any).from('pedidos').update({ estado }).eq('id', pedidoId)
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="bg-vx-gray900 rounded-xl p-4 border border-vx-gray800 flex flex-col gap-3">
      <p className="text-sm font-medium text-vx-white">Estado del pedido</p>
      <Select
        label=""
        options={ESTADOS}
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      />
      <Button onClick={save} loading={loading} size="sm">Guardar estado</Button>
    </div>
  )
}
