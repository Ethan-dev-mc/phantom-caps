import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://aerypbbxibwgwmzgoxjk.supabase.co',
  'sb_secret_SetQXXZoxZbpbYEq526wmg_9obZnLJB'
)

const { data: cats } = await supabase.from('categorias').select('id, slug')
const perfumesCat = cats.find(c => c.slug === 'perfumes')

const { data, error } = await supabase.from('productos').insert({
  nombre: 'Carolina Herrera 212 Men NYC 100ml',
  slug: 'carolina-herrera-212-men-nyc-100ml',
  descripcion: 'Eau de Toilette de larga duración (~6 horas). Familia olfativa amaderada, aromática y floral con notas de almizcle y sándalo. Formato spray 100ml. Vegano y libre de crueldad.',
  precio: 299,
  precio_comparacion: 499,
  categoria_id: perfumesCat.id,
  stock: 99,
  tallas_disponibles: [],
  destacado: true,
  activo: true,
  imagenes: ['https://http2.mlstatic.com/D_Q_NP_2X_746923-MLA84186088534_052025-R.webp'],
}).select('id, nombre')

if (error) console.error('Error:', error)
else console.log('✓ Producto creado:', data)
