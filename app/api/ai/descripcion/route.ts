import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: NextRequest) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const { nombre, categoria } = await req.json()
  if (!nombre) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `Escribe una descripción de producto atractiva y concisa (máximo 3 oraciones) para una tienda streetwear llamada Veintiox. El producto es: "${nombre}"${categoria ? ` (categoría: ${categoria})` : ''}.

Tono: directo, joven, aspiracional. Sin emojis. Sin bullets. Solo el texto de la descripción.`,
        },
      ],
    })

    const descripcion = message.content[0].type === 'text' ? message.content[0].text.trim() : ''
    return NextResponse.json({ descripcion })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
