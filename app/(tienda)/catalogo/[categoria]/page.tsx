import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import ProductGrid from '@/components/organisms/ProductGrid'
import { Heading, Label } from '@/components/atoms/Typography'
import type { Categoria } from '@/types/database'

interface Props {
  params: { categoria: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.categoria.charAt(0).toUpperCase() + params.categoria.slice(1),
    description: `Todos los ${params.categoria} de Veintiox`,
  }
}

export const revalidate = 60

export default async function CategoriaPage({ params }: Props) {
  const supabase = createSupabaseServerClient()

  const { data: categoriaRaw } = await supabase
    .from('categorias')
    .select('*')
    .eq('slug', params.categoria)
    .single()

  if (!categoriaRaw) notFound()

  const cat = categoriaRaw as Categoria

  const { data: productos } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .eq('categoria_id', cat.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container-site py-10">
      <div className="mb-8">
        <Label>Catálogo</Label>
        <Heading size="md" className="mt-1">{cat.nombre.toUpperCase()}</Heading>
        {cat.descripcion && (
          <p className="text-vx-gray400 text-sm mt-2 max-w-xl">{cat.descripcion}</p>
        )}
      </div>
      <ProductGrid products={productos ?? []} showFilters={false} />
    </div>
  )
}
