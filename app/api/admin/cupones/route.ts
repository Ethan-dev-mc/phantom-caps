import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  const body = await req.json()
  const { data: cupon, error } = await supabase
    .from('cupones')
    .insert({
      codigo: body.codigo,
      tipo: body.tipo,
      valor: body.valor,
      minimo_compra: body.minimo_compra ?? null,
      usos_max: body.usos_max ?? null,
      activo: body.activo ?? true,
    })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/admin/cupones')
  return NextResponse.json({ cupon })
}

export async function PATCH(req: NextRequest) {
  const supabase = getSupabase()
  const { id, ...updates } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
  const { data: cupon, error } = await supabase
    .from('cupones')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/admin/cupones')
  return NextResponse.json({ cupon })
}

export async function DELETE(req: NextRequest) {
  const supabase = getSupabase()
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
  const { error } = await supabase.from('cupones').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/admin/cupones')
  return NextResponse.json({ ok: true })
}
