import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { token } = useServerCookie()
  const path = `/spaces/invitations`
  const body = await req.json()
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.post(path, body, {}, headers)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.errorMessage },
      { status: error.response.status },
    )
  }
}
