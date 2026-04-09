import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// PATCH /api/admin/pedidos — actualizar estado de uno o varios pedidos
export async function PATCH(req: NextRequest) {
  const supabase = getSupabase()
  const { ids, estado } = await req.json()
  if (!ids?.length || !estado) return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })

  const { error } = await supabase.from('pedidos').update({ estado }).in('id', ids)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// DELETE /api/admin/pedidos — eliminar uno o varios pedidos
export async function DELETE(req: NextRequest) {
  const supabase = getSupabase()
  const { ids } = await req.json()
  if (!ids?.length) return NextResponse.json({ error: 'Faltan ids' }, { status: 400 })

  // Eliminar items primero (FK)
  await supabase.from('pedido_items').delete().in('pedido_id', ids)
  const { error } = await supabase.from('pedidos').delete().in('id', ids)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
