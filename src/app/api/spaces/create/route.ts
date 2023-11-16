import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const token = ''
  const { data } = await request.json()
  // const imageData = await request.formData()
  // console.log(imageData)

  const formData = new FormData()

  const req = {
    spaceName: data.spaceName,
    description: data.description,
    category: data.category,
    isVisible: data.isVisible,
    isComment: data.isComment,
    isLinkSummarizable: data.isLinkSummarizable,
    isReadMarkEnabled: data.isReadMarkEnabled,
  }

  formData.append('request', JSON.stringify(req))
  //formData.append('file', imageData)

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/spaces`,
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
