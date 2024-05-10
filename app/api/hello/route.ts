// import type { NextRequest } from 'next/server'
import { NextResponse,NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const MY_KV = getRequestContext().env.KV_TEST
  await MY_KV.put(`kvTest`, `${Math.random()}`)
  const kvValue = await MY_KV.get(`kvTest`) || false

  return new NextResponse(`The value of kvTest in MY_KV is: ${kvValue}`)
}
