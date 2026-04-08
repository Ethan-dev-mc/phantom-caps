import Link from 'next/link'
import Button from '@/components/atoms/Button'
import { Heading, Text } from '@/components/atoms/Typography'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-vx-black flex flex-col items-center justify-center text-center px-4">
      <p className="font-display text-[8rem] md:text-[12rem] text-vx-gray800 leading-none select-none">404</p>
      <Heading size="md" className="-mt-4 mb-3">PÁGINA NO ENCONTRADA</Heading>
      <Text color="muted" className="mb-8 max-w-sm">
        Esta página no existe o fue movida. Pero hay mucho más por explorar.
      </Text>
      <Link href="/">
        <Button size="lg">Ir al inicio</Button>
      </Link>
    </div>
  )
}
