import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { spaceId: number } },
) {
  const spaceId = params.spaceId
  const { searchParams } = new URL(req.url)
  const path = `/spaces/${spaceId}/tags`

  try {
    const data = await apiServer.get(`${path}?${searchParams}`)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.errorMessage },
      { status: error.response.status },
    )
  }
}
