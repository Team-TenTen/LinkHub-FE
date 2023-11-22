import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { token } = useServerCookie()
  const userId = req.nextUrl.pathname.replace('/api/user/profile/', '')
  const path = `/members/${userId}/profile`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const userData = await apiServer.get(path, { cache: 'no-cache' }, headers)
    return NextResponse.json(userData)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
