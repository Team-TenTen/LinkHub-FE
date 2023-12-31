import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { spaceId: number } },
) {
  const { token } = useServerCookie()
  const spaceId = params.spaceId
  const { searchParams } = new URL(req.url)
  const path = `/spaces/${spaceId}/links`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const data = await apiServer.get(`${path}?${searchParams}`, {}, headers)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.errorMessage },
      { status: error.response.status },
    )
  }
}

export async function POST(req: NextRequest) {
  const { token } = useServerCookie()
  const { spaceId, url, title, tagName, color } = await req.json()
  const path = `/spaces/${spaceId}/links`
  const body = { url, title, tagName, color }
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.post(path, body, {}, headers)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}

export async function PUT(req: NextRequest) {
  const { token } = useServerCookie()
  const { spaceId, linkId, url, title, tagName, color } = await req.json()
  const path = `/spaces/${spaceId}/links/${linkId}`
  const body = { url, title, tagName, color }
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.put(path, body, {}, headers)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}

export async function DELETE(req: NextRequest) {
  const { token } = useServerCookie()
  const { searchParams } = new URL(req.url)
  const spaceId = searchParams.get('spaceId')
  const linkId = searchParams.get('linkId')
  const path = `/spaces/${spaceId}/links/${linkId}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const data = await apiServer.delete(path, {}, headers)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
