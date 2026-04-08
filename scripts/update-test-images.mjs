import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://aerypbbxibwgwmzgoxjk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const updates = [
  {
    slug: 'hoodie-phantom-negro-test',
    imagenes: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff7ef?w=800&q=80',
    ],
  },
  {
    slug: 'tenis-void-blanco-test',
    imagenes: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    ],
  },
  {
    slug: 'perfume-noir-100ml-test',
    imagenes: [
      'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    ],
  },
]

for (const { slug, imagenes } of updates) {
  const { error } = await supabase.from('productos').update({ imagenes }).eq('slug', slug)
  if (error) console.error(`Error en ${slug}:`, error)
  else console.log(`✓ ${slug}`)
}
