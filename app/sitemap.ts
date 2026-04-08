import type { MetadataRoute } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://veintiox.com'
  const supabase = createSupabaseServerClient()

  const { data: productosRaw } = await supabase
    .from('productos')
    .select('slug, updated_at')
    .eq('activo', true)
  const productos = (productosRaw ?? []) as { slug: string; updated_at: string }[]

  const { data: categoriasRaw } = await supabase
    .from('categorias')
    .select('slug')
  const categorias = (categoriasRaw ?? []) as { slug: string }[]

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/catalogo`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/kits`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/drops`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terminos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const productoRoutes: MetadataRoute.Sitemap = (productos ?? []).map((p) => ({
    url: `${base}/producto/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const categoriaRoutes: MetadataRoute.Sitemap = (categorias ?? []).map((c) => ({
    url: `${base}/catalogo/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [...staticRoutes, ...productoRoutes, ...categoriaRoutes]
}
