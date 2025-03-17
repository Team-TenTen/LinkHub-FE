import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { spaceId: string; linkId: string } },
) {
  const { token } = useServerCookie()
  const { spaceId, linkId } = params
  const path = `/spaces/${spaceId}/links/${linkId}/view`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const data = await apiServer.post(path, {}, {}, headers)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
