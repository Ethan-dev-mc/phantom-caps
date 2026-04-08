import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
import AdminHeader from '@/components/admin/AdminHeader'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'

export default async function KitsAdminPage() {
  const supabase = getSupabase()
  const { data: kits } = await supabase.from('kits').select('*, kit_items(count)').order('created_at', { ascending: false })

  return (
    <div>
      <AdminHeader title="Kits" actions={<Link href="/admin/kits/nuevo"><Button size="sm">+ Nuevo kit</Button></Link>} />
      <div className="bg-vx-gray900 rounded-xl border border-vx-gray800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-vx-gray500 uppercase border-b border-vx-gray800 bg-vx-gray800/50">
              {['Nombre', 'Precio', 'Artículos', 'Estado', ''].map((h) => <th key={h} className="px-5 py-3 text-left">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {(kits ?? []).map((k: any) => (
              <tr key={k.id} className="border-b border-vx-gray800/50 hover:bg-vx-gray800/30">
                <td className="px-5 py-3 text-vx-white font-medium">{k.nombre}</td>
                <td className="px-5 py-3 text-vx-white">${Number(k.precio).toFixed(2)}</td>
                <td className="px-5 py-3 text-vx-gray400">{k.kit_items?.[0]?.count ?? 0}</td>
                <td className="px-5 py-3"><Badge variant={k.activo ? 'success' : 'danger'}>{k.activo ? 'Activo' : 'Inactivo'}</Badge></td>
                <td className="px-5 py-3"><Link href={`/admin/kits/${k.id}`} className="text-vx-cyan text-xs hover:underline">Editar</Link></td>
              </tr>
            ))}
            {!kits?.length && <tr><td colSpan={5} className="px-5 py-10 text-center text-vx-gray500 text-xs">Sin kits</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic'
