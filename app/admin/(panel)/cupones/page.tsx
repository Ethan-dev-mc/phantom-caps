import { createClient } from '@supabase/supabase-js'
import AdminHeader from '@/components/admin/AdminHeader'
import CuponesClient from './CuponesClient'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export default async function AdminCuponesPage() {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('cupones')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <AdminHeader title="Cupones" subtitle={`${data?.length ?? 0} cupones`} />
      <CuponesClient cupones={data ?? []} />
    </div>
  )
}
