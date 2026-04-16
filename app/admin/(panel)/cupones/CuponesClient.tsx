'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

interface Cupon {
  id: string
  codigo: string
  tipo: 'porcentaje' | 'monto'
  valor: number
  minimo_compra: number | null
  usos_max: number | null
  usos_actuales: number
  activo: boolean
  created_at: string
}

const EMPTY: Omit<Cupon, 'id' | 'usos_actuales' | 'created_at'> = {
  codigo: '', tipo: 'porcentaje', valor: 10, minimo_compra: null, usos_max: null, activo: true,
}

export default function CuponesClient({ cupones: init }: { cupones: Cupon[] }) {
  const router = useRouter()
  const [cupones, setCupones] = useState(init)
  const [form, setForm] = useState({ ...EMPTY })
  const [editId, setEditId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const resetForm = () => { setForm({ ...EMPTY }); setEditId(null); setError('') }

  const guardar = async () => {
    if (!form.codigo.trim()) { setError('El código es requerido'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/cupones', {
        method: editId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editId, codigo: form.codigo.toUpperCase().trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Error al guardar'); return }
      resetForm()
      router.refresh()
      // optimistic update
      if (editId) {
        setCupones(prev => prev.map(c => c.id === editId ? { ...c, ...data.cupon } : c))
      } else {
        setCupones(prev => [data.cupon, ...prev])
      }
    } catch { setError('Error de red') }
    finally { setLoading(false) }
  }

  const toggleActivo = async (c: Cupon) => {
    await fetch('/api/admin/cupones', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: c.id, activo: !c.activo }),
    })
    setCupones(prev => prev.map(x => x.id === c.id ? { ...x, activo: !x.activo } : x))
  }

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar este cupón?')) return
    await fetch('/api/admin/cupones', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setCupones(prev => prev.filter(c => c.id !== id))
  }

  const editar = (c: Cupon) => {
    setEditId(c.id)
    setForm({ codigo: c.codigo, tipo: c.tipo, valor: c.valor, minimo_compra: c.minimo_compra, usos_max: c.usos_max, activo: c.activo })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Formulario */}
      <div className="bg-vx-gray900 rounded-xl border border-vx-gray800 p-5">
        <h2 className="text-sm font-medium text-vx-white mb-4">{editId ? 'Editar cupón' : 'Nuevo cupón'}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2">
            <label className="text-xs text-vx-gray500 mb-1 block">Código</label>
            <input
              value={form.codigo}
              onChange={e => setForm(f => ({ ...f, codigo: e.target.value.toUpperCase() }))}
              placeholder="VERANO20"
              className="w-full bg-vx-gray800 border border-vx-gray700 rounded-lg px-3 py-2 text-sm text-vx-white font-mono focus:outline-none focus:border-vx-cyan"
            />
          </div>
          <div>
            <label className="text-xs text-vx-gray500 mb-1 block">Tipo</label>
            <select
              value={form.tipo}
              onChange={e => setForm(f => ({ ...f, tipo: e.target.value as any }))}
              className="w-full bg-vx-gray800 border border-vx-gray700 rounded-lg px-3 py-2 text-sm text-vx-white focus:outline-none focus:border-vx-cyan"
            >
              <option value="porcentaje">% Porcentaje</option>
              <option value="monto">$ Monto fijo</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-vx-gray500 mb-1 block">{form.tipo === 'porcentaje' ? 'Descuento %' : 'Descuento $'}</label>
            <input
              type="number" min={1}
              value={form.valor}
              onChange={e => setForm(f => ({ ...f, valor: Number(e.target.value) }))}
              className="w-full bg-vx-gray800 border border-vx-gray700 rounded-lg px-3 py-2 text-sm text-vx-white focus:outline-none focus:border-vx-cyan"
            />
          </div>
          <div>
            <label className="text-xs text-vx-gray500 mb-1 block">Compra mínima $</label>
            <input
              type="number" min={0} placeholder="Sin mínimo"
              value={form.minimo_compra ?? ''}
              onChange={e => setForm(f => ({ ...f, minimo_compra: e.target.value ? Number(e.target.value) : null }))}
              className="w-full bg-vx-gray800 border border-vx-gray700 rounded-lg px-3 py-2 text-sm text-vx-white focus:outline-none focus:border-vx-cyan"
            />
          </div>
          <div>
            <label className="text-xs text-vx-gray500 mb-1 block">Usos máx.</label>
            <input
              type="number" min={1} placeholder="Ilimitado"
              value={form.usos_max ?? ''}
              onChange={e => setForm(f => ({ ...f, usos_max: e.target.value ? Number(e.target.value) : null }))}
              className="w-full bg-vx-gray800 border border-vx-gray700 rounded-lg px-3 py-2 text-sm text-vx-white focus:outline-none focus:border-vx-cyan"
            />
          </div>
        </div>
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={guardar} loading={loading}>{editId ? 'Guardar cambios' : 'Crear cupón'}</Button>
          {editId && <Button size="sm" onClick={resetForm} className="!bg-vx-gray700">Cancelar</Button>}
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-vx-gray900 rounded-xl border border-vx-gray800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-vx-gray500 uppercase tracking-wider border-b border-vx-gray800 bg-vx-gray800/50">
              {['Código', 'Tipo', 'Descuento', 'Mín. compra', 'Usos', 'Estado', ''].map(h => (
                <th key={h} className="px-5 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cupones.map(c => (
              <tr key={c.id} className="border-b border-vx-gray800/50 hover:bg-vx-gray800/30">
                <td className="px-5 py-3 font-mono font-bold text-vx-cyan">{c.codigo}</td>
                <td className="px-5 py-3 text-vx-gray400 capitalize">{c.tipo}</td>
                <td className="px-5 py-3 text-vx-white">
                  {c.tipo === 'porcentaje' ? `${c.valor}%` : `$${c.valor}`}
                </td>
                <td className="px-5 py-3 text-vx-gray400">
                  {c.minimo_compra ? `$${c.minimo_compra}` : '—'}
                </td>
                <td className="px-5 py-3 text-vx-gray400">
                  {c.usos_actuales}{c.usos_max ? `/${c.usos_max}` : ''}
                </td>
                <td className="px-5 py-3">
                  <button onClick={() => toggleActivo(c)}>
                    <Badge variant={c.activo ? 'success' : 'default'}>{c.activo ? 'Activo' : 'Inactivo'}</Badge>
                  </button>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => editar(c)} className="text-xs text-vx-cyan hover:underline">Editar</button>
                    <button onClick={() => eliminar(c.id)} className="text-xs text-red-400 hover:underline">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {!cupones.length && (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-vx-gray500 text-xs">Sin cupones. Crea el primero.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
