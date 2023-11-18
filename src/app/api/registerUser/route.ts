import { useServerCookie } from '@/hooks/useServerCookie'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { token } = useServerCookie()
  const { data, file } = await request.json()

  const formData = new FormData()

  const req = {
    socialId: data.socialId,
    provider: data.provider,
    nickname: data.nickname,
    aboutMe: data.aboutMe,
    newsEmail: data.newsEmail,
    favoriteCategory: data.favoriteCategory,
    isSubscribed: data.isSubscribed,
  }

  formData.append('request', JSON.stringify(req))
  formData.append('file', file)

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/members/join`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    )

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}
