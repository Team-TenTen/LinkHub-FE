import { useEffect, useState } from 'react'
import { fetchGetPopularLinks } from '@/services/link/link'
import { PopularLinkResBody } from '@/types'

const useGetPopularLinks = () => {
  const [links, setLinks] = useState<PopularLinkResBody[]>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetPopularLinks()
      const linkData = data.responses
      setLinks(linkData)
    }
    fetchData()
  }, [])

  return links
}

export default useGetPopularLinks
