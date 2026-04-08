'use client'

import { useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const ESTADO_BADGE: Record<string, 'default' | 'warning' | 'success' | 'cyan' | 'danger'> = {
  pendiente: 'warning', pagado: 'success', enviado: 'cyan', entregado: 'default', cancelado: 'danger',
}

interface Pedido {
  id: string
  numero_pedido: string
  cliente_nombre: string
  cliente_email: string
  total: number
  metodo_pago: string
  estado: string
  created_at: string
  etiqueta_url?: string | null
}

export default function PedidosClient({ pedidos }: { pedidos: Pedido[] }) {
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set())
  const [generando, setGenerando] = useState(false)
  const [resultados, setResultados] = useState<Record<string, { ok: boolean; url?: string; error?: string }>>({})

  const toggleAll = () => {
    if (seleccionados.size === pedidos.length) setSeleccionados(new Set())
    else setSeleccionados(new Set(pedidos.map(p => p.id)))
  }

  const toggle = (id: string) => {
    const s = new Set(seleccionados)
    s.has(id) ? s.delete(id) : s.add(id)
    setSeleccionados(s)
  }

  const generarEtiquetas = async () => {
    if (!seleccionados.size) return
    setGenerando(true)
    try {
      const res = await fetch('/api/admin/etiquetas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pedidoIds: Array.from(seleccionados) }),
      })
      const { resultados: data } = await res.json()
      const mapa: Record<string, { ok: boolean; url?: string; error?: string }> = {}
      for (const r of (data ?? [])) mapa[r.pedidoId] = { ok: r.ok, url: r.etiqueta_url, error: r.error }
      setResultados(mapa)

      // Abrir todas las etiquetas exitosas
      for (const r of (data ?? [])) {
        if (r.ok && r.etiqueta_url) window.open(r.etiqueta_url, '_blank')
      }
    } catch (e: any) {
      alert('Error generando etiquetas: ' + e.message)
    } finally {
      setGenerando(false)
      setSeleccionados(new Set())
    }
  }

  return (
    <div>
      {/* Barra de acciones */}
      {seleccionados.size > 0 && (
        <div className="mb-4 flex items-center gap-3 bg-vx-gray800 rounded-xl px-4 py-3">
          <span className="text-sm text-vx-white">{seleccionados.size} pedido{seleccionados.size > 1 ? 's' : ''} seleccionado{seleccionados.size > 1 ? 's' : ''}</span>
          <Button size="sm" onClick={generarEtiquetas} loading={generando}>
            Generar etiquetas
          </Button>
          <button onClick={() => setSeleccionados(new Set())} className="text-xs text-vx-gray400 hover:text-vx-white ml-auto">
            Cancelar
          </button>
        </div>
      )}

      <div className="bg-vx-gray900 rounded-xl border border-vx-gray800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-vx-gray500 uppercase tracking-wider border-b border-vx-gray800 bg-vx-gray800/50">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={seleccionados.size === pedidos.length && pedidos.length > 0}
                    onChange={toggleAll}
                    className="rounded border-vx-gray600 bg-vx-gray800 accent-white cursor-pointer"
                  />
                </th>
                {['Pedido', 'Cliente', 'Email', 'Total', 'Pago', 'Estado', 'Fecha', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => {
                const res = resultados[p.id]
                return (
                  <tr key={p.id} className={`border-b border-vx-gray800/50 hover:bg-vx-gray800/30 ${seleccionados.has(p.id) ? 'bg-vx-gray800/50' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={seleccionados.has(p.id)}
                        onChange={() => toggle(p.id)}
                        className="rounded border-vx-gray600 bg-vx-gray800 accent-white cursor-pointer"
                      />
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-vx-gray300">{p.numero_pedido}</td>
                    <td className="px-5 py-3 text-vx-white">{p.cliente_nombre}</td>
                    <td className="px-5 py-3 text-vx-gray400 text-xs">{p.cliente_email}</td>
                    <td className="px-5 py-3 text-vx-white">${Number(p.total).toFixed(2)}</td>
                    <td className="px-5 py-3 text-vx-gray400 capitalize">{p.metodo_pago}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={ESTADO_BADGE[p.estado] ?? 'default'}>{p.estado}</Badge>
                        {res && (
                          <span className={`text-xs ${res.ok ? 'text-green-400' : 'text-red-400'}`}>
                            {res.ok ? '✓ etiqueta' : `✗ ${res.error}`}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-vx-gray500 text-xs">{new Date(p.created_at).toLocaleDateString('es-MX')}</td>
                    <td className="px-5 py-3 flex items-center gap-3">
                      <Link href={`/admin/pedidos/${p.id}`} className="text-vx-cyan text-xs hover:underline">Ver</Link>
                      {p.etiqueta_url && (
                        <a href={p.etiqueta_url} target="_blank" rel="noopener noreferrer" className="text-green-400 text-xs hover:underline">Etiqueta</a>
                      )}
                    </td>
                  </tr>
                )
              })}
              {!pedidos.length && (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-vx-gray500 text-xs">Sin pedidos</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
