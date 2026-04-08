import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
import AdminHeader from '@/components/admin/AdminHeader'
import DropForm from '../DropForm'
import type { Drop } from '@/types/database'

interface Props { params: { id: string } }

export default async function EditarDropPage({ params }: Props) {
  if (params.id === 'nuevo') {
    return (
      <div>
        <AdminHeader title="Nuevo drop" />
        <DropForm />
      </div>
    )
  }
  const supabase = getSupabase()
  const { data: dropRaw } = await supabase.from('drops').select('*').eq('id', params.id).single()
  if (!dropRaw) notFound()
  const drop = dropRaw as Drop

  return (
    <div>
      <AdminHeader title="Editar drop" subtitle={drop.nombre} />
      <DropForm drop={drop} />
    </div>
  )
}
