import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
import AdminHeader from '@/components/admin/AdminHeader'
import Badge from '@/components/atoms/Badge'

export default async function UsuariosAdminPage() {
  const supabase = getSupabase()
  const { data: usuariosRaw } = await supabase.from('usuarios_admin').select('*').order('created_at')
  const usuarios = (usuariosRaw ?? []) as any[]

  const rolBadge: Record<string, 'cyan' | 'success' | 'default'> = { admin: 'cyan', editor: 'success', visor: 'default' }

  return (
    <div>
      <AdminHeader title="Usuarios admin" subtitle="Gestión de acceso al panel" />
      <div className="bg-vx-gray900 rounded-xl border border-vx-gray800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-vx-gray500 uppercase border-b border-vx-gray800 bg-vx-gray800/50">
              {['Nombre', 'Email', 'Rol', 'Estado'].map((h) => <th key={h} className="px-5 py-3 text-left">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {(usuarios ?? []).map((u) => (
              <tr key={u.id} className="border-b border-vx-gray800/50">
                <td className="px-5 py-3 text-vx-white">{u.nombre}</td>
                <td className="px-5 py-3 text-vx-gray400">{u.email}</td>
                <td className="px-5 py-3"><Badge variant={rolBadge[u.rol] ?? 'default'}>{u.rol}</Badge></td>
                <td className="px-5 py-3"><Badge variant={u.activo ? 'success' : 'danger'}>{u.activo ? 'Activo' : 'Inactivo'}</Badge></td>
              </tr>
            ))}
            {!usuarios?.length && <tr><td colSpan={4} className="px-5 py-10 text-center text-vx-gray500 text-xs">Sin usuarios</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic'
