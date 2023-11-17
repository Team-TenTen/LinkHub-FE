import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  const userId = req.nextUrl.pathname.replace('/api/user/profile/', '')
  const path = `/members/${userId}/profile`

  try {
    const userData = await apiServer.get(path)
    return NextResponse.json(userData)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
