import { NextRequest, NextResponse } from 'next/server'

export interface MetaResType {
  error: boolean
  result: Result
  response: Response
  html: string
}

export interface OgImage {
  url: string
  type: string
}

export interface TwitterImage {
  url: string
}

export interface Result {
  ogTitle: string
  ogUrl: string
  ogDescription: string
  twitterCard: string
  twitterUrl: string
  twitterDescription: string
  ogImage: OgImage[]
  twitterImage: TwitterImage[]
  ogLocale: string
  favicon: string
  charset: string
  requestUrl: string
  success: boolean
}

const ogs = require('open-graph-scraper')

export async function POST(req: NextRequest, res: NextResponse) {
  const { url } = await req.json()

  try {
    return await ogs({
      url: url,
      peekSize: 30000000,
    }).then((data: MetaResType) => {
      if (data) {
        return NextResponse.json({
          data: data.result.ogTitle,
          error: data.error,
        })
      } else {
        return NextResponse.json({})
      }
    })
  } catch ({ error }: any) {
    return NextResponse.json({ error })
  }
}
