import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const token = ''

  const { data } = await request.json()
  // const imageData = await request.formData()
  // console.log(imageData)

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

  console.log(formData.get('request'))
  //formData.append('file', imageData)

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
