import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import KitGrid from '@/components/organisms/KitGrid'
import { Heading, Label, Text } from '@/components/atoms/Typography'

export const metadata: Metadata = {
  title: 'Kits Emprendedor',
  description: 'Kits para emprendedores. Todo lo que necesitas para arrancar tu negocio.',
}

export const revalidate = 60

export default async function KitsPage() {
  const supabase = createSupabaseServerClient()

  const { data: kits } = await supabase
    .from('kits')
    .select('*, kit_items(count)')
    .eq('activo', true)
    .order('created_at', { ascending: false })

  const kitsConCount = (kits ?? []).map((k: any) => ({
    ...k,
    itemCount: k.kit_items?.[0]?.count ?? 0,
  }))

  return (
    <div className="container-site py-10">
      <div className="mb-10 max-w-xl">
        <Label>Para emprendedores</Label>
        <Heading size="md" className="mt-1 mb-3">KITS</Heading>
        <Text color="muted">
          Todo lo que necesitas para arrancar tu negocio en un solo kit. Seleccionado para emprendedores que quieren empezar hoy.
        </Text>
      </div>
      <KitGrid kits={kitsConCount} />
    </div>
  )
}
