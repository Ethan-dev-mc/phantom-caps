import { notFound } from 'next/navigation'
import { createSupabaseAdminClient } from '@/lib/supabase-server'
import AdminHeader from '@/components/admin/AdminHeader'
import Badge from '@/components/atoms/Badge'
import EstadoPedidoForm from './EstadoPedidoForm'
import CJSection from './CJSection'

interface Props { params: { id: string } }

export default async function DetallePedidoPage({ params }: Props) {
  const supabase = createSupabaseAdminClient()
  const { data: pedidoRaw } = await supabase
    .from('pedidos')
    .select('*, pedido_items(*)')
    .eq('id', params.id)
    .single()
  const pedido = pedidoRaw as any

  if (!pedido) notFound()

  return (
    <div className="max-w-2xl">
      <AdminHeader title={`Pedido ${pedido.numero_pedido}`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-vx-gray900 rounded-xl p-4 border border-vx-gray800">
          <p className="text-xs text-vx-gray500 uppercase mb-2">Cliente</p>
          <p className="text-vx-white font-medium">{pedido.cliente_nombre}</p>
          <p className="text-vx-gray400 text-sm">{pedido.cliente_email}</p>
          <p className="text-vx-gray400 text-sm">{pedido.cliente_telefono}</p>
        </div>
        <div className="bg-vx-gray900 rounded-xl p-4 border border-vx-gray800">
          <p className="text-xs text-vx-gray500 uppercase mb-2">Envío</p>
          <p className="text-vx-white text-sm">{pedido.direccion_calle}</p>
          <p className="text-vx-gray400 text-sm">{pedido.direccion_ciudad}, {pedido.direccion_estado}</p>
          <p className="text-vx-gray400 text-sm">CP {pedido.direccion_cp}</p>
        </div>
      </div>

      <div className="bg-vx-gray900 rounded-xl border border-vx-gray800 mb-6">
        <div className="px-4 py-3 border-b border-vx-gray800 flex items-center justify-between">
          <p className="text-sm font-medium text-vx-white">Artículos</p>
          <Badge variant="default" className="capitalize">{pedido.metodo_pago}</Badge>
        </div>
        {(pedido as any).pedido_items?.map((item: any) => (
          <div key={item.id} className="flex justify-between items-center px-4 py-3 border-b border-vx-gray800/50 text-sm">
            <span className="text-vx-gray200">{item.nombre} {item.talla ? `(${item.talla})` : ''} ×{item.cantidad}</span>
            <span className="text-vx-white">${Number(item.subtotal).toFixed(2)}</span>
          </div>
        ))}
        <div className="px-4 py-3 flex flex-col gap-1 text-sm">
          <div className="flex justify-between text-vx-gray400"><span>Subtotal</span><span>${Number(pedido.subtotal).toFixed(2)}</span></div>
          <div className="flex justify-between text-vx-gray400"><span>Envío</span><span>${Number(pedido.envio).toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-vx-white"><span>Total</span><span>${Number(pedido.total).toFixed(2)} MXN</span></div>
        </div>
      </div>

      {/* Sección CJ Dropshipping */}
      {pedido.estado === 'pagado' && (
        <div className="mb-6">
          <CJSection
            pedido={pedido}
            items={(pedido.pedido_items ?? []).map((i: any) => ({
              nombre: i.nombre,
              talla: i.talla,
              cantidad: i.cantidad,
              subtotal: i.subtotal,
            }))}
          />
        </div>
      )}

      <EstadoPedidoForm pedidoId={pedido.id} estadoActual={pedido.estado} />
    </div>
  )
}
export const dynamic = 'force-dynamic'
