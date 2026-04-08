import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://aerypbbxibwgwmzgoxjk.supabase.co',
  'sb_secret_SetQXXZoxZbpbYEq526wmg_9obZnLJB'
)

// Get category IDs
const { data: cats } = await supabase.from('categorias').select('id, slug')
console.log('Categorías:', cats)

const bySlug = Object.fromEntries(cats.map(c => [c.slug, c.id]))

const productos = [
  {
    nombre: 'Hoodie Phantom Negro',
    slug: 'hoodie-phantom-negro-test',
    descripcion: 'Sudadera oversized con capucha. Tela premium 380g. Edición limitada. [PRODUCTO DE PRUEBA]',
    precio: 1299,
    precio_comparacion: 1599,
    categoria_id: bySlug['hoodies'],
    stock: 10,
    tallas_disponibles: ['S', 'M', 'L', 'XL'],
    destacado: true,
    activo: true,
    imagenes: [],
  },
  {
    nombre: 'Tenis Void Blanco',
    slug: 'tenis-void-blanco-test',
    descripcion: 'Tenis urbanos suela chunky. Colorway blanco total. [PRODUCTO DE PRUEBA]',
    precio: 2499,
    precio_comparacion: 2999,
    categoria_id: bySlug['tenis'],
    stock: 8,
    tallas_disponibles: ['25', '26', '27', '28', '29'],
    destacado: true,
    activo: true,
    imagenes: [],
  },
  {
    nombre: 'Perfume Noir 100ml',
    slug: 'perfume-noir-100ml-test',
    descripcion: 'Fragancia amaderada intensa. Larga duración 12h+. [PRODUCTO DE PRUEBA]',
    precio: 899,
    precio_comparacion: null,
    categoria_id: bySlug['perfumes'],
    stock: 15,
    tallas_disponibles: [],
    destacado: false,
    activo: true,
    imagenes: [],
  },
]

const { data, error } = await supabase.from('productos').insert(productos).select('id, nombre')
if (error) console.error('Error:', error)
else console.log('Productos creados:', data)
