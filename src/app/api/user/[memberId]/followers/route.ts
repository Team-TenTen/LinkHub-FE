import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { memberId: number } },
) {
  const { token } = useServerCookie()
  const { searchParams } = new URL(req.url)
  const memberId = params.memberId
  const path = `/members/${memberId}/followers`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const data = await apiServer.get(
      `${path}?${searchParams}`,
      { cache: 'no-cache' },
      headers,
    )
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.errorMessage },
      { status: error.response.status },
    )
  }
}
