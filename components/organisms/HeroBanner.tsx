'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'
import { IconArrowRight, IconArrowLeft } from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'

export interface HeroSlide {
  id: string
  titulo: string
  subtitulo?: string
  cta_label: string
  cta_href: string
  imagen: string
  imagen_alt?: string
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: '1',
    titulo: 'Nueva colección disponible',
    subtitulo: 'No te quedes sin la tuya. Stock limitado, drops exclusivos cada semana.',
    cta_label: 'Ver colección',
    cta_href: '/catalogo',
    imagen: '',
    imagen_alt: 'Colección Veintiox',
  },
  {
    id: '2',
    titulo: 'Kits para emprendedores',
    subtitulo: 'Empieza tu negocio hoy. Todo lo que necesitas en un solo kit.',
    cta_label: 'Ver kits',
    cta_href: '/kits',
    imagen: '',
    imagen_alt: 'Kits emprendedor Veintiox',
  },
]

interface HeroBannerProps {
  slides?: HeroSlide[]
}

export default function HeroBanner({ slides = DEFAULT_SLIDES }: HeroBannerProps) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 600)
  }, [animating])

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo])

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next, slides.length])

  const slide = slides[current]

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] max-h-[800px] overflow-hidden bg-vx-gray900">
      {/* Imagen de fondo */}
      {slide.imagen ? (
        <Image
          src={slide.imagen}
          alt={slide.imagen_alt ?? slide.titulo}
          fill
          priority
          sizes="100vw"
          className={clsx('object-cover transition-opacity duration-700', animating ? 'opacity-0' : 'opacity-100')}
        />
      ) : (
        /* Placeholder con grid pattern cuando no hay imagen */
        <div className="absolute inset-0 bg-grid opacity-30" />
      )}

      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-vx-black via-vx-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-vx-black/80 via-transparent to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 h-full container-site flex flex-col justify-center">
        <div
          className={clsx(
            'max-w-xl transition-all duration-500',
            animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          )}
        >
          <span className="inline-block text-vx-cyan text-2xs tracking-caps uppercase mb-4 font-body font-medium">
            Veintiox — Drops exclusivos
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-vx-white leading-none mb-4">
            {slide.titulo}
          </h1>
          {slide.subtitulo && (
            <p className="text-vx-gray300 text-base md:text-lg mb-8 max-w-md leading-relaxed">
              {slide.subtitulo}
            </p>
          )}
          <Link href={slide.cta_href}>
            <Button size="lg">
              {slide.cta_label}
              <IconArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Controles (solo si hay más de 1 slide) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Slide anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-vx-black/50 text-vx-white hover:bg-vx-cyan hover:text-vx-black transition-all"
          >
            <IconArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-vx-black/50 text-vx-white hover:bg-vx-cyan hover:text-vx-black transition-all"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir a slide ${i + 1}`}
                className={clsx(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === current ? 'w-8 bg-vx-cyan' : 'w-3 bg-vx-gray600 hover:bg-vx-gray400'
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
