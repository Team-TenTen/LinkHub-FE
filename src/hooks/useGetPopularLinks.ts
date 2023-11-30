import { useEffect, useState } from 'react'
import { fetchGetPopularLinks } from '@/services/link/link'
import { PopularLinkResBody } from '@/types'

const useGetPopularLinks = () => {
  const [links, setLinks] = useState<PopularLinkResBody[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await fetchGetPopularLinks()
      const linkData = data.responses
      setLinks(linkData)
      setIsLoading(false)
    }
    fetchData()
  }, [setIsLoading])

  return { links, isPopularLinksLoading: isLoading }
}

export default useGetPopularLinks
