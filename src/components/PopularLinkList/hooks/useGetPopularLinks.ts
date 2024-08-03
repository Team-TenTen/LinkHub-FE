import { fetchGetPopularLinks } from '@/services/link/link'
import { useSuspenseQuery } from '@tanstack/react-query'

const useGetPopularLinks = () => {
  return useSuspenseQuery({
    queryKey: ['popularLinks'],
    queryFn: () => fetchGetPopularLinks(),
  })
}

export default useGetPopularLinks
