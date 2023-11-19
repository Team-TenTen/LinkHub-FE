import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { spaceId } = await req.json()
  const path = `/spaces/${spaceId}/favorites`
  const headers = {
    Authorization: `Bearer ${req.cookies.get('token')?.value}`,
  }

  try {
    const data = await apiServer.post(path, {}, {}, headers)
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}

export async function DELETE(req: NextRequest) {
  const spaceId = req.nextUrl.pathname.replace('/api/favorites/', '')
  const path = `/spaces/${spaceId}/favorites`
  const headers = {
    Authorization: `Bearer ${req.cookies.get('token')?.value}`,
  }

  try {
    const data = await apiServer.delete(path, {}, headers)
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
