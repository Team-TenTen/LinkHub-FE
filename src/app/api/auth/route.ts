import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextResponse } from 'next/server'

export async function GET(_request: Request) {
  const { token } = useServerCookie()
  try {
    const response = await apiServer.get(`/members/profile`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
