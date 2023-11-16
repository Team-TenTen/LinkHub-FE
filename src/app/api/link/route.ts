import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  const { spaceId, url, title, tag, color } = await req.json()
  const path = `/spaces/${spaceId}/links`
  const body = { url, title, tag, color }
  const authorization = {
    Authorization: `Bearer ${req.cookies.get('token')?.value}`,
  }

  try {
    const data = await apiServer.post(path, body, {}, authorization)
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
