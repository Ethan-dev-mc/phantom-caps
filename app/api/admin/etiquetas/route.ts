import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { crearEnvio } from '@/lib/skydropx'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// POST /api/admin/etiquetas
// body: { pedidoIds: string[] }
export async function POST(req: NextRequest) {
  try {
    const { pedidoIds } = await req.json()
    if (!pedidoIds?.length) return NextResponse.json({ error: 'Sin pedidos seleccionados' }, { status: 400 })

    const supabase = getSupabase()

    // Leer configuración de origen desde la DB
    const { data: config } = await supabase.from('configuracion').select('clave, valor')
    const cfg: Record<string, string> = {}
    for (const { clave, valor } of (config ?? [])) cfg[clave] = valor

    const origen = {
      nombre:   cfg.envio_origen_nombre   ?? 'Veintiox',
      telefono: cfg.envio_origen_telefono ?? '3300000000',
      email:    cfg.envio_origen_email    ?? 'hola@veintiox.store',
      calle:    cfg.envio_origen_calle    ?? '',
      ciudad:   cfg.envio_origen_ciudad   ?? '',
      estado:   cfg.envio_origen_estado   ?? '',
      cp:       cfg.envio_origen_cp       ?? '',
    }

    const paquete = {
      peso:  Number(cfg.paquete_peso  ?? 1),
      largo: Number(cfg.paquete_largo ?? 20),
      ancho: Number(cfg.paquete_ancho ?? 15),
      alto:  Number(cfg.paquete_alto  ?? 10),
    }

    const resultados: { pedidoId: string; ok: boolean; etiqueta_url?: string; numero_rastreo?: string; error?: string }[] = []

    for (const pedidoId of pedidoIds) {
      try {
        const { data: pedido } = await supabase
          .from('pedidos')
          .select('*')
          .eq('id', pedidoId)
          .single()

        if (!pedido) { resultados.push({ pedidoId, ok: false, error: 'Pedido no encontrado' }); continue }

        const envio = await crearEnvio({
          origen,
          destino: {
            nombre:   pedido.cliente_nombre,
            telefono: pedido.cliente_telefono ?? '0000000000',
            calle:    pedido.direccion_calle,
            ciudad:   pedido.direccion_ciudad,
            estado:   pedido.direccion_estado,
            cp:       pedido.direccion_cp,
          },
          paquete,
          pedidoNumero: pedido.numero_pedido,
        })

        // Guardar rastreo y marcar como enviado
        await supabase
          .from('pedidos')
          .update({
            estado:           'enviado',
            numero_rastreo:   envio.numero_rastreo,
            carrier:          envio.carrier,
            etiqueta_url:     envio.etiqueta_url,
            costo_envio_real: envio.costo,
          })
          .eq('id', pedidoId)

        resultados.push({ pedidoId, ok: true, etiqueta_url: envio.etiqueta_url, numero_rastreo: envio.numero_rastreo })
      } catch (e: any) {
        resultados.push({ pedidoId, ok: false, error: e.message })
      }
    }

    return NextResponse.json({ resultados })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
