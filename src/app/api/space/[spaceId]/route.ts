import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.replace('/api/space/', '')

  try {
    const spaceDetail = await apiServer.get(`/spaces/${id}`)

    return new Response(JSON.stringify({ space: spaceDetail }))
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
