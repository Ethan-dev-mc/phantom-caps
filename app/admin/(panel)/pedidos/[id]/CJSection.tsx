'use client'

import { useState } from 'react'

interface Item {
  nombre: string
  talla?: string
  cantidad: number
  subtotal: number
}

interface Props {
  pedido: {
    cliente_nombre: string
    cliente_email: string
    cliente_telefono: string
    direccion_calle: string
    direccion_ciudad: string
    direccion_estado: string
    direccion_cp: string
  }
  items: Item[]
}

export default function CJSection({ pedido, items }: Props) {
  const [copied, setCopied] = useState(false)

  const texto = `━━━━━━━━━━━━━━━━━━━━━━━
📦 DATOS PARA PEDIR EN CJ DROPSHIPPING
━━━━━━━━━━━━━━━━━━━━━━━

👤 DESTINATARIO
Nombre: ${pedido.cliente_nombre}
Email: ${pedido.cliente_email}
Teléfono: ${pedido.cliente_telefono}

📍 DIRECCIÓN DE ENVÍO
${pedido.direccion_calle}
${pedido.direccion_ciudad}, ${pedido.direccion_estado}
CP: ${pedido.direccion_cp}
País: México

🛍️ PRODUCTOS
${items.map(i => `- ${i.nombre}${i.talla ? ` | Talla: ${i.talla}` : ''} | Cantidad: ${i.cantidad}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━`

  const copy = () => {
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-vx-gray900 rounded-xl border border-vx-gray800 overflow-hidden">
      <div className="px-4 py-3 border-b border-vx-gray800 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-vx-white">Pedir en CJ Dropshipping</p>
          <p className="text-xs text-vx-gray500 mt-0.5">Copia los datos y pégalos al crear la orden en CJ</p>
        </div>
        <button
          onClick={copy}
          className="px-3 py-1.5 rounded-lg bg-vx-white text-vx-black text-xs font-bold transition-all hover:bg-vx-gray200"
        >
          {copied ? '✓ Copiado' : 'Copiar todo'}
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Destinatario */}
        <div>
          <p className="text-xs text-vx-gray500 uppercase mb-2">Destinatario</p>
          <p className="text-sm text-vx-white">{pedido.cliente_nombre}</p>
          <p className="text-sm text-vx-gray400">{pedido.cliente_telefono}</p>
          <p className="text-sm text-vx-gray400">{pedido.cliente_email}</p>
        </div>

        {/* Dirección */}
        <div>
          <p className="text-xs text-vx-gray500 uppercase mb-2">Dirección de envío</p>
          <p className="text-sm text-vx-white">{pedido.direccion_calle}</p>
          <p className="text-sm text-vx-gray400">{pedido.direccion_ciudad}, {pedido.direccion_estado}</p>
          <p className="text-sm text-vx-gray400">CP {pedido.direccion_cp} · México</p>
        </div>
      </div>

      {/* Productos */}
      <div className="border-t border-vx-gray800">
        <p className="text-xs text-vx-gray500 uppercase px-4 pt-3 mb-2">Buscar en CJ y ordenar</p>
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-2 border-b border-vx-gray800/40 text-sm">
            <div>
              <span className="text-vx-white font-medium">{item.nombre}</span>
              {item.talla && <span className="ml-2 text-xs bg-vx-gray800 text-vx-gray300 px-2 py-0.5 rounded">{item.talla}</span>}
            </div>
            <span className="text-vx-gray400">×{item.cantidad}</span>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="px-4 py-3 bg-vx-gray800/30">
        <p className="text-xs text-vx-gray500 font-medium mb-2">Pasos:</p>
        <ol className="text-xs text-vx-gray500 flex flex-col gap-1 list-decimal list-inside">
          <li>Ve a <span className="text-vx-white">cjdropshipping.com</span> → Busca cada producto</li>
          <li>Agrega al carrito con la talla y cantidad correcta</li>
          <li>En checkout pega la dirección del cliente</li>
          <li>Confirma y paga — CJ envía directo al cliente</li>
          <li>Regresa aquí y cambia el estado a <span className="text-vx-white">Enviado</span></li>
        </ol>
      </div>
    </div>
  )
}
