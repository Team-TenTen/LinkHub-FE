import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authProhibitedPages = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('Auth-token')
  const currentPath = request.nextUrl.pathname

  if (!token && !authProhibitedPages.includes(currentPath)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && authProhibitedPages.includes(currentPath)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    '/notification',
    '/notification/invite',
    '/space/:spaceId/setting',
    '/user/setting',
    '/space/create',
    '/login',
    '/register',
  ],
}
