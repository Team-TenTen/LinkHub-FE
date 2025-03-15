import { useMutation } from '@tanstack/react-query'

export const usePostMeta = () => {
  return useMutation({
    mutationFn: async ({ url }: { url: string }) => {
      const response = await fetch(`/api/meta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch meta data')
      }

      return response.json()
    },
    onError: (error: Error) => {
      console.error('Meta fetch error:', error)
    },
  })
}
