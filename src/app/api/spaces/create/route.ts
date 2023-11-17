import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const path = `/spaces`
  const headers = {
    Authorization: `Bearer ${req.cookies.get('token')?.value}`,
  }

  try {
    const response = await apiServer.post(path, body, {}, headers, 'multipart')
    console.log(response)
    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
