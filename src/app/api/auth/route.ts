import { useServerCookie } from '@/hooks/useServerCookie'
import { NextResponse } from 'next/server'

const baseURL = process.env.NEXT_PUBLIC_API_ADDRESS

export async function GET(_request: Request) {
  const { token } = useServerCookie()
  const path = `${baseURL}/members/profile`

  try {
    const response = await fetch(path, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
