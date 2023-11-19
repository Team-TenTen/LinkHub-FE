import { cookies } from 'next/headers'

export function useServerCookie() {
  if (typeof window !== 'undefined') {
    throw new Error('This hook should be used in server-side only')
  }

  const cookieStore = cookies()
  const token = cookieStore.get('Auth-token')?.value!

  return { token }
}
