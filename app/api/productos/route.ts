import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const categoria = searchParams.get('categoria')
  const q = searchParams.get('q')
  const destacados = searchParams.get('destacados')
  const limit = Number(searchParams.get('limit') ?? 20)

  const supabase = createSupabaseServerClient()
  let query = supabase.from('productos').select('*, categorias(*)').eq('activo', true)

  if (categoria) query = query.eq('categoria_id', categoria)
  if (destacados === 'true') query = query.eq('destacado', true)
  if (q) query = query.ilike('nombre', `%${q}%`)

  query = query.order('created_at', { ascending: false }).limit(limit)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
