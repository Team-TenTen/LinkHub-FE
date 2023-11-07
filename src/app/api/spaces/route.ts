import { NextRequest } from 'next/server'

async function fetchSpaceDetail(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/spaces/${id}`,
      {
        // option
      },
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch space details. Status: ${response.status}`,
      )
    }

    const spaceDetail = await response.json()
    return spaceDetail
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Failed to fetch space details: ${error.message}`)
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.replace('/api/spaces/', '')

  try {
    const spaceDetail = await fetchSpaceDetail(id)
    console.log(spaceDetail)

    return new Response(JSON.stringify({ space: spaceDetail }))
  } catch (error) {
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      })
  }
}
