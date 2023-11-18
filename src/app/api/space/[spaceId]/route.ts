import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const spaceId = req.nextUrl.pathname.replace('/api/space/', '')
  const path = `/spaces/${spaceId}`

  try {
    const space = await apiServer.get(path)
    return NextResponse.json({ space })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
