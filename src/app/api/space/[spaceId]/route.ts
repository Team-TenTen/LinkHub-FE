import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const spaceId = req.nextUrl.pathname.replace('/api/space/', '')
  const path = `/spaces/${spaceId}`
  const headers = {
    cache: 'no-cache',
  }

  try {
    const space = await apiServer.get(path, {}, headers)
    return NextResponse.json({ space })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}

export async function PATCH(req: NextRequest) {
  const { token } = useServerCookie()
  const body = await req.formData()
  const spaceId = req.nextUrl.pathname.replace('/api/space/', '')
  const path = `/spaces/${spaceId}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.patch(path, body, {}, headers, 'multipart')
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}

export async function DELETE(req: NextRequest) {
  const { token } = useServerCookie()
  const spaceId = req.nextUrl.pathname.replace('/api/space/', '')
  const path = `/spaces/${spaceId}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.delete(path, {}, headers)
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
