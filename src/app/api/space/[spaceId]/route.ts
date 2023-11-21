import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { token } = useServerCookie()
  const spaceId = req.nextUrl.pathname.replace('/api/space/', '')
  const path = `/spaces/${spaceId}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const data = await apiServer.get(path, { cache: 'no-cache' }, headers)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
