'use client'

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { fetchGetSpace } from '@/services/space/space'
import { SpaceDetailResBody } from '@/types'
import { usePathname } from 'next/navigation'

const useGetSpace = (): {
  space: SpaceDetailResBody | undefined
  setSpace: Dispatch<SetStateAction<SpaceDetailResBody | undefined>>
  isSpaceLoading: boolean
} => {
  const [space, setSpace] = useState<SpaceDetailResBody>()
  const [isLoading, setIsLoading] = useState(false)
  const path = usePathname()
  const spaceId = Number(path.split('/')[2])

  const handleGetSpace = useCallback(async () => {
    setIsLoading(true)
    const data = spaceId && (await fetchGetSpace({ spaceId }))
    setSpace(data)
    setIsLoading(false)
  }, [spaceId, setIsLoading])

  useEffect(() => {
    handleGetSpace()
  }, [handleGetSpace])

  return { space, setSpace, isSpaceLoading: isLoading }
}

export default useGetSpace
