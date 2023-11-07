import returnFetch from 'return-fetch'

export const apiServer = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_API_ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  },
})
