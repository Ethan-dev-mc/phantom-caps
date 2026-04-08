import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import ProductGrid from '@/components/organisms/ProductGrid'
import { Heading, Label } from '@/components/atoms/Typography'
import type { FilterOption } from '@/components/organisms/CategoryFilter'
import type { Producto, Categoria } from '@/types/database'

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Todos los productos Veintiox — hoodies, tenis y perfumes.',
}

export const revalidate = 60

export default async function CatalogoPage() {
  const supabase = createSupabaseServerClient()

  const [{ data: productosRaw }, { data: categoriasRaw }] = await Promise.all([
    supabase.from('productos').select('*').eq('activo', true).order('created_at', { ascending: false }),
    supabase.from('categorias').select('*').order('orden'),
  ])

  const productos = productosRaw as Producto[] | null
  const categorias = categoriasRaw as Categoria[] | null

  const filterCats: FilterOption[] = (categorias ?? []).map((c) => ({
    value: c.id,
    label: c.nombre,
  }))

  return (
    <div className="container-site py-10">
      <div className="mb-8">
        <Label>Tienda</Label>
        <Heading size="md" className="mt-1">CATÁLOGO</Heading>
      </div>
      <ProductGrid
        products={productos ?? []}
        categories={filterCats}
        showFilters
      />
    </div>
  )
}
