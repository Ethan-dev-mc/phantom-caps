import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const schema = z.object({
  email:  z.string().email(),
  dropId: z.string().uuid().optional(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

  const supabase = createSupabaseServerClient()
  const sb = supabase as any
  const { error } = await sb.from('emails_notificame').upsert(
    { email: parsed.data.email, drop_id: parsed.data.dropId ?? null },
    { onConflict: 'email,drop_id', ignoreDuplicates: true }
  )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
