import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../apiServices'

export const usePostMeta = () => {
  return useMutation({
    mutationFn: async ({ url }: { url: string }) => {
      const response = await apiClient.post(`/api/meta`, { url })
      return response
    },
    onError: (error: Error) => {
      console.error('Meta fetch error:', error)
    },
  })
}
