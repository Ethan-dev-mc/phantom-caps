import type { Metadata } from 'next'
import { Heading } from '@/components/atoms/Typography'

export const metadata: Metadata = { title: 'Términos y Condiciones' }

export default function TerminosPage() {
  return (
    <div className="container-site py-14 max-w-3xl">
      <Heading size="sm" className="mb-8">TÉRMINOS Y CONDICIONES</Heading>
      <div className="text-vx-gray300 space-y-6 leading-relaxed text-sm">
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">1. Aceptación</h2>
          <p>Al acceder y utilizar veintiox.com, usted acepta cumplir con los presentes términos y condiciones. Si no está de acuerdo, le pedimos no usar nuestros servicios.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">2. Productos y precios</h2>
          <p>Todos los precios están expresados en pesos mexicanos (MXN) e incluyen IVA. Nos reservamos el derecho de modificar precios sin previo aviso. El precio aplicable será el vigente al momento de confirmar el pedido.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">3. Pedidos y pagos</h2>
          <p>Los pedidos se consideran confirmados una vez recibido el pago. Aceptamos Stripe, PayPal y MercadoPago. En caso de error en el procesamiento, el pedido no se generará y el cargo será revertido.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">4. Envíos</h2>
          <p>Realizamos envíos a todo México. El tiempo de entrega estimado es de 2 a 5 días hábiles. Envío gratis en compras mayores a $999 MXN. No nos hacemos responsables por retrasos atribuibles a la paquetería.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">5. Devoluciones</h2>
          <p>Aceptamos devoluciones dentro de los 30 días naturales posteriores a la recepción del producto, siempre que esté en condiciones originales, sin uso y con etiquetas. Los productos de drops exclusivos no aplican para devolución salvo defecto de fabricación.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">6. Drops exclusivos</h2>
          <p>Los drops son lanzamientos de edición limitada. El stock es real y no hay restock. Las ventas son definitivas. Nos reservamos el derecho de cancelar pedidos en caso de errores técnicos o de stock.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">7. Propiedad intelectual</h2>
          <p>Todo el contenido del sitio (imágenes, textos, logotipos, diseños) es propiedad de Veintiox o sus licenciantes y está protegido por las leyes de propiedad intelectual aplicables.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-vx-white tracking-wide mb-2">8. Contacto</h2>
          <p>Para cualquier duda sobre estos términos, contáctenos en <a href="mailto:hola@veintiox.com" className="text-vx-cyan hover:underline">hola@veintiox.com</a>.</p>
        </section>
        <p className="text-xs text-vx-gray500 pt-4">Última actualización: {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
