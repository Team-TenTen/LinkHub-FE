import { NextRequest, NextResponse } from 'next/server'

const ogs = require('open-graph-scraper')

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

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  const options = {
    url: url,
    peekSize: 30000000,
  }

  const getOgData = async () => {
    try {
      const urlData = []
      const response = await fetch(options.url)
      const data = await response.text()
      const result = await ogs({ html: data })
      urlData.push({ ...result.result, url: options.url })
      return urlData[0].ogTitle
    } catch (error) {
      return NextResponse.json({ error })
    }
  }

  try {
    const data = await getOgData()
    if (typeof data === 'object') {
      return NextResponse.json({ data: '' })
    }
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error })
  }
}
