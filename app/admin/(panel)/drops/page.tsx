import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
import AdminHeader from '@/components/admin/AdminHeader'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import type { Drop } from '@/types/database'

export default async function DropsAdminPage() {
  const supabase = getSupabase()
  const { data: dropsRaw } = await supabase.from('drops').select('*').order('fecha_inicio', { ascending: false })
  const drops = (dropsRaw ?? []) as Drop[]

  return (
    <div>
      <AdminHeader title="Drops" actions={<Link href="/admin/drops/nuevo"><Button size="sm">+ Nuevo drop</Button></Link>} />
      <div className="bg-vx-gray900 rounded-xl border border-vx-gray800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-vx-gray500 uppercase border-b border-vx-gray800 bg-vx-gray800/50">
              {['Nombre', 'Inicio', 'Estado', ''].map((h) => <th key={h} className="px-5 py-3 text-left">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {(drops ?? []).map((d) => {
              const ahora = new Date()
              const inicio = new Date(d.fecha_inicio)
              const fin = d.fecha_fin ? new Date(d.fecha_fin) : null
              const est = ahora < inicio ? 'Próximo' : (!fin || ahora <= fin) ? 'Activo' : 'Terminado'
              const variant = est === 'Activo' ? 'drop' : est === 'Próximo' ? 'warning' : 'default'
              return (
                <tr key={d.id} className="border-b border-vx-gray800/50 hover:bg-vx-gray800/30">
                  <td className="px-5 py-3 text-vx-white font-medium">{d.nombre}</td>
                  <td className="px-5 py-3 text-vx-gray400 text-xs">{new Date(d.fecha_inicio).toLocaleString('es-MX')}</td>
                  <td className="px-5 py-3"><Badge variant={variant as any}>{est}</Badge></td>
                  <td className="px-5 py-3"><Link href={`/admin/drops/${d.id}`} className="text-vx-cyan text-xs hover:underline">Editar</Link></td>
                </tr>
              )
            })}
            {!drops?.length && <tr><td colSpan={4} className="px-5 py-10 text-center text-vx-gray500 text-xs">Sin drops</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic'
