'use client'

import { useState } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { IconArrowLeft, IconArrowRight } from '@/components/atoms/Icon'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-vx-gray900 flex items-center justify-center text-vx-gray600">
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  const prev = () => setSelected((s) => (s - 1 + images.length) % images.length)
  const next = () => setSelected((s) => (s + 1) % images.length)

  return (
    <div className="flex flex-col gap-3">
      {/* Imagen principal */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-vx-gray900 group">
        <Image
          src={images[selected]}
          alt={`${alt} - imagen ${selected + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-vx-black/60 text-vx-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-vx-cyan hover:text-vx-black"
            >
              <IconArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-vx-black/60 text-vx-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-vx-cyan hover:text-vx-black"
            >
              <IconArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={clsx(
                'relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
                i === selected ? 'border-vx-cyan' : 'border-transparent hover:border-vx-gray600'
              )}
            >
              <Image src={img} alt={`${alt} miniatura ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
