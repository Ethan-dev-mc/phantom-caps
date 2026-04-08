import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
import AdminHeader from '@/components/admin/AdminHeader'
import KitForm from '../KitForm'

interface Props { params: { id: string } }

export default async function EditarKitPage({ params }: Props) {
  const supabase = getSupabase()
  const { data } = await supabase.from('kits').select('*').eq('id', params.id).single()
  if (!data) notFound()
  const kit = data as any

  return (
    <div>
      <AdminHeader title={`Editar: ${kit.nombre}`} />
      <KitForm kit={kit} />
    </div>
  )
}
export const dynamic = 'force-dynamic'
