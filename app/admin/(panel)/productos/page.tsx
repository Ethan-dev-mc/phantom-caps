import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
import AdminHeader from '@/components/admin/AdminHeader'
import Button from '@/components/atoms/Button'
import ProductosTable from './ProductosTable'

export default async function AdminProductosPage() {
  const supabase = getSupabase()
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
      <ProductosTable productos={productos} />
    </div>
  )
}
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'
