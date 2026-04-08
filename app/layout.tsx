import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Veintiox',
    template: '%s | Veintiox',
  },
  description: 'Hoodies, tenis y perfumes. Drops limitados cada semana. Kits para emprendedores. Envíos a todo México.',
  keywords: ['veintiox', 'hoodies', 'tenis', 'perfumes', 'streetwear', 'drops', 'kits emprendedor', 'mexico'],
  openGraph: {
    title: 'Veintiox',
    description: 'Drops limitados cada semana. Hoodies, tenis y perfumes.',
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veintiox',
    description: 'Drops limitados cada semana.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
