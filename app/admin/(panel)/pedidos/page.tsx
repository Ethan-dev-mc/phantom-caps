import { createClient } from '@supabase/supabase-js'
import AdminHeader from '@/components/admin/AdminHeader'
import PedidosClient from './PedidosClient'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export default async function PedidosAdminPage() {
  const supabase = getSupabase()
  const { data: pedidosRaw } = await supabase
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false })
  const pedidos = (pedidosRaw ?? []) as any[]

  return (
    <div>
      <AdminHeader title="Pedidos" subtitle={`${pedidos.length} pedidos`} />
      <PedidosClient pedidos={pedidos} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
