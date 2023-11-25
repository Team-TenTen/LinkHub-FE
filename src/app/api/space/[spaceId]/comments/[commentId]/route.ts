import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: { spaceId: number; commentId: number } },
) {
  const { token } = useServerCookie()
  const { spaceId, commentId } = params
  const path = `/spaces/${spaceId}/comments/${commentId}`
  const body = await req.json()
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const data = await apiServer.put(path, body, {}, headers)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { spaceId: number; commentId: number } },
) {
  const { token } = useServerCookie()
  const { spaceId, commentId } = params
  const path = `/spaces/${spaceId}/comments/${commentId}`
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
