import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
import AdminHeader from '@/components/admin/AdminHeader'
import ProductForm from '../ProductForm'
import type { Producto, Categoria } from '@/types/database'

interface Props { params: { id: string } }

export default async function EditarProductoPage({ params }: Props) {
  const supabase = getSupabase()
  const [{ data: productoRaw }, { data: categoriasRaw }] = await Promise.all([
    supabase.from('productos').select('*').eq('id', params.id).single(),
    supabase.from('categorias').select('id, nombre').order('nombre'),
  ])

  if (!productoRaw) notFound()
  const producto = productoRaw as Producto
  const categorias = (categoriasRaw ?? []) as Pick<Categoria, 'id' | 'nombre'>[]

  return (
    <div>
      <AdminHeader title="Editar producto" subtitle={producto.nombre} />
      <ProductForm categorias={categorias} producto={producto} />
    </div>
  )
}
