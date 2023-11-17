import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const path = `${process.env.NEXT_PUBLIC_API_ADDRESS}/spaces`
  const headers = {
    Authorization: `Bearer ${req.cookies.get('token')?.value}`,
  }

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers,
      body: data,
    })
    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
