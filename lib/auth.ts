import { createSupabaseServerClient } from './supabase-server'
import { createSupabaseAdminClient } from './supabase-server'

export async function getSession() {
  const supabase = createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getAdminUser(userId: string) {
  const supabase = createSupabaseAdminClient()
  const { data } = await supabase
    .from('usuarios_admin')
    .select('*')
    .eq('id', userId)
    .eq('activo', true)
    .single()
  return data
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session) return null
  return getAdminUser(session.user.id)
}
