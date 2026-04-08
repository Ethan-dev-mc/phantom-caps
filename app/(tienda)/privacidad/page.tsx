import type { Metadata } from 'next'
import { Heading } from '@/components/atoms/Typography'

export const metadata: Metadata = { title: 'Aviso de Privacidad' }

export default function PrivacidadPage() {
  return (
    <div className="container-site py-14 max-w-3xl">
      <Heading size="sm" className="mb-8">AVISO DE PRIVACIDAD</Heading>
      <div className="prose prose-invert prose-sm max-w-none text-vx-gray300 space-y-6 leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">1. Identidad del responsable</h2>
          <p>Veintiox (en adelante "el Responsable") es responsable del tratamiento de los datos personales que usted proporcione a través de nuestro sitio web veintiox.com y sus canales de venta.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">2. Datos personales recabados</h2>
          <p>Recabamos los siguientes datos para procesar sus pedidos: nombre completo, correo electrónico, número de teléfono, dirección de envío y datos de pago (estos últimos procesados directamente por las pasarelas de pago y nunca almacenados por nosotros).</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">3. Finalidades del tratamiento</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Procesar y entregar sus pedidos.</li>
            <li>Enviar confirmaciones y actualizaciones de su pedido.</li>
            <li>Atender solicitudes de soporte.</li>
            <li>Enviar comunicaciones de marketing (solo con consentimiento explícito).</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">4. Transferencia de datos</h2>
          <p>Sus datos podrán ser compartidos con proveedores de servicios de envío y pasarelas de pago, exclusivamente para cumplir con el proceso de compra. No vendemos ni cedemos sus datos a terceros para fines ajenos a los descritos.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">5. Derechos ARCO</h2>
          <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, envíe un correo a <a href="mailto:privacidad@veintiox.com" className="text-vx-cyan hover:underline">privacidad@veintiox.com</a>.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">6. Cambios al aviso</h2>
          <p>Nos reservamos el derecho de modificar este aviso. Cualquier cambio será publicado en esta página con la fecha de actualización.</p>
        </section>
        <p className="text-xs text-vx-gray500 pt-4">Última actualización: {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
