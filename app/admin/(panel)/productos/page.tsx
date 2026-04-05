import Link from 'next/link'
import { createSupabaseAdminClient } from '@/lib/supabase-server'
import AdminHeader from '@/components/admin/AdminHeader'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'

export default async function AdminProductosPage() {
  const supabase = createSupabaseAdminClient()
  const { data: productosRaw } = await supabase
    .from('productos')
    .select('*, categorias(nombre)')
    .order('created_at', { ascending: false })
  const productos = (productosRaw ?? []) as any[]

  return (
    <div>
      <AdminHeader
        title="Productos"
        subtitle={`${productos?.length ?? 0} productos`}
        actions={
          <Link href="/admin/productos/nuevo">
            <Button size="sm">+ Nuevo producto</Button>
          </Link>
        }
      />

      <div className="bg-vx-gray900 rounded-xl border border-vx-gray800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-vx-gray500 uppercase tracking-wider border-b border-vx-gray800 bg-vx-gray800/50">
                <th className="px-5 py-3 text-left">Nombre</th>
                <th className="px-5 py-3 text-left">Categoría</th>
                <th className="px-5 py-3 text-left">Precio</th>
                <th className="px-5 py-3 text-left">Stock</th>
                <th className="px-5 py-3 text-left">Estado</th>
                <th className="px-5 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {(productos ?? []).map((p) => (
                <tr key={p.id} className="border-b border-vx-gray800/50 hover:bg-vx-gray800/30 transition-colors">
                  <td className="px-5 py-3 text-vx-white font-medium max-w-xs truncate">{p.nombre}</td>
                  <td className="px-5 py-3 text-vx-gray400">{(p as any).categorias?.nombre ?? '—'}</td>
                  <td className="px-5 py-3 text-vx-white">${Number(p.precio).toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <span className={p.stock === 0 ? 'text-red-400' : p.stock <= 5 ? 'text-yellow-400' : 'text-green-400'}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={p.activo ? 'success' : 'danger'}>{p.activo ? 'Activo' : 'Inactivo'}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/productos/${p.id}`} className="text-vx-cyan text-xs hover:underline">Editar</Link>
                  </td>
                </tr>
              ))}
              {!productos?.length && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-vx-gray500 text-xs">Sin productos. Crea el primero.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'
