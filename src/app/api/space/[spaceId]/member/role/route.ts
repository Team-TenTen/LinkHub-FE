import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { spaceId: number } },
) {
  const { token } = useServerCookie()
  const body = await req.json()
  const spaceId = params.spaceId
  const path = `/spaces/${spaceId}/members/role`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.patch(path, body, {}, headers)
    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
