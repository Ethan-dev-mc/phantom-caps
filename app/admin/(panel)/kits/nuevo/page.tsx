import AdminHeader from '@/components/admin/AdminHeader'
import KitForm from '../KitForm'

export default function NuevoKitPage() {
  return (
    <div>
      <AdminHeader title="Nuevo kit" />
      <KitForm />
    </div>
  )
}
export const dynamic = 'force-dynamic'
