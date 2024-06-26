import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { memberId: number } },
) {
  const { token } = useServerCookie()
  const memberId = params.memberId
  const path = `/members/${memberId}/profile`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const userData = await apiServer.get(path, {}, headers)
    return NextResponse.json(userData)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { memberId: number } },
) {
  const { token } = useServerCookie()
  const body = await req.formData()
  const userId = params.memberId
  const path = `/members/${userId}/profile`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.put(path, body, {}, headers, 'multipart')
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
