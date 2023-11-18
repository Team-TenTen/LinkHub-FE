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

const useGetSpace = (): [
  SpaceDetailResBody | undefined,
  Dispatch<SetStateAction<SpaceDetailResBody | undefined>>,
] => {
  const [space, setSpace] = useState<SpaceDetailResBody>()
  const path = usePathname()
  const spaceId = Number(path.split('/')[2])

  const handleGetSpace = useCallback(async () => {
    const { space } = await fetchGetSpace({ spaceId })
    setSpace(space)
  }, [spaceId])

  useEffect(() => {
    handleGetSpace()
  }, [])

  return [space, setSpace]
}

export default useGetSpace
