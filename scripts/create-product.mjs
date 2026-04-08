import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://aerypbbxibwgwmzgoxjk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Obtener categoria hoodies
const { data: cats } = await supabase.from('categorias').select('id, slug')
const hoodieCat = cats.find(c => c.slug === 'hoodies')

// URL de imagen en tamaño completo (quitamos los parámetros de resize)
const imageUrl = 'https://cf.cjdropshipping.com/quick/product/e31a2066-455f-4092-b1d5-bec7006d4a17.jpg'

const { data, error } = await supabase.from('productos').insert({
  nombre: 'Hoodie 80DRIP Negro',
  slug: 'hoodie-80drip-negro',
  descripcion: 'Sudadera oversized con capucha y bordado 80DRIP en pecho. Tela gruesa 440g, corte extragrande estilo europeo. Perfecta para el frío sin perder el estilo.',
  precio: 299,
  precio_comparacion: 499,
  categoria_id: hoodieCat.id,
  stock: 99,
  tallas_disponibles: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  destacado: true,
  activo: true,
  imagenes: [imageUrl],
}).select('id, nombre')

if (error) console.error('Error:', error)
else console.log('✓ Producto creado:', data)
