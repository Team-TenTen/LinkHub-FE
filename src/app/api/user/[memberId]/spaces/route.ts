import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const memberId = req.nextUrl.pathname.split('/')[3]

  const path = `/members/${memberId}/spaces/search`

  try {
    const data = await apiServer.get(`${path}?${searchParams}`, {
      cache: 'no-cache',
    })
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.errorMessage },
      { status: error.response.status },
    )
  }
}
