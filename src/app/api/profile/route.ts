import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  const path = '/members/profile'
  const authorization = {
    Authorization: `Bearer ${req.cookies.get('token')?.value}`,
  }

  try {
    const user = await apiServer.get(path, {}, authorization)
    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
