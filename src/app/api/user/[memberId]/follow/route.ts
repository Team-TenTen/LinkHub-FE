import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { memberId: number } },
) {
  const { token } = useServerCookie()
  const memberId = params.memberId
  const path = `/members/${memberId}/follow`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.post(path, {}, {}, headers)
    const data = await response.json()
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
  { params }: { params: { memberId: number } },
) {
  const { token } = useServerCookie()
  const memberId = params.memberId
  const path = `/members/${memberId}/follow`
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
