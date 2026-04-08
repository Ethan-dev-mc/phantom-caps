import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import DropSection from '@/components/organisms/DropSection'
import { Heading, Label } from '@/components/atoms/Typography'
import type { Drop } from '@/types/database'

export const metadata: Metadata = {
  title: 'Drops',
  description: 'Drops exclusivos de Veintiox. Stock limitado, sin restock.',
}

export const revalidate = 30

export default async function DropsPage() {
  const supabase = createSupabaseServerClient()

  const { data: dropRaw } = await supabase
    .from('drops')
    .select('*, drop_productos(*, productos(*))')
    .eq('activo', true)
    .order('fecha_inicio', { ascending: true })
    .limit(1)
    .maybeSingle()

  const drop = dropRaw as (Drop & { drop_productos: any[] }) | null

  const ahora = new Date()
  let estado: 'proximo' | 'activo' | 'agotado' = 'proximo'
  let productos: any[] = []

  if (drop) {
    const inicio = new Date(drop.fecha_inicio)
    const fin = drop.fecha_fin ? new Date(drop.fecha_fin) : null
    if (ahora < inicio) estado = 'proximo'
    else if (!fin || ahora <= fin) {
      estado = 'activo'
      productos = (drop as any).drop_productos
        ?.map((dp: any) => ({ ...dp.productos, stock: dp.stock_drop - dp.vendidos }))
        .filter((p: any) => p.stock > 0) ?? []
      if (productos.length === 0) estado = 'agotado'
    } else estado = 'agotado'
  }

  return (
    <div className="py-6">
      {!drop && (
        <div className="container-site mb-8">
          <Label>Exclusivos</Label>
          <Heading size="md" className="mt-1">DROPS</Heading>
        </div>
      )}
      <DropSection
        drop={drop ? {
          id: drop.id,
          nombre: drop.nombre,
          descripcion: drop.descripcion,
          fecha_inicio: drop.fecha_inicio,
          imagen: drop.imagen,
          productos,
        } : undefined}
        estado={estado}
      />
    </div>
  )
}
