import { fetchGetPopularLinks } from '@/services/link/link'
import { useSuspenseQuery } from '@tanstack/react-query'

const useGetPopularLinks = () => {
  return useSuspenseQuery({
    queryKey: ['PopularLinks'],
    queryFn: fetchGetPopularLinks,
  })
}

export default useGetPopularLinks
