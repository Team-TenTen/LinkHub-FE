import { fetchGetPopularLinks } from '@/services/link/link'
import { useQuery } from '@tanstack/react-query'

const useGetPopularLinks = () => {
  return useQuery({
    queryKey: ['PopularLinks'],
    queryFn: fetchGetPopularLinks,
  })
}

export default useGetPopularLinks
