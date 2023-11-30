import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { token } = useServerCookie()
  const body = await req.json()
  const path = `/spaces/invitations/accept`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.post(path, body, {}, headers)
    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
