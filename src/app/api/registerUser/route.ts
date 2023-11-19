import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.formData()
  const path = `/members/join`

  try {
    const response = await apiServer.post(path, body, {}, {}, 'multipart')
    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
