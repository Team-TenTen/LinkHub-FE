import { useCallback, useMemo, useState } from 'react'
import { fetchScrapSpace } from '@/services/space/space'
import { CreateSpaceReqBody } from '@/types'
import { debounce } from 'lodash'

export interface UseScrapProps {
  spaceId: number
  Scrap: number
  data: CreateSpaceReqBody
  imageFile?: File
}

const useScrap = ({ spaceId, Scrap, data, imageFile }: UseScrapProps) => {
  const [scrapCount, setScrapCount] = useState<number>(Scrap)

  const debouncefetchSpace = useMemo(
    () =>
      debounce(async () => {
        await fetchScrapSpace(spaceId, data, imageFile)
      }, 500),
    [data, imageFile, spaceId],
  )

  const handleClickScrap = useCallback(
    (isScrap: boolean) => {
      if (isScrap) {
        setScrapCount((prev) => prev + 1)
        debouncefetchSpace()
      }
    },
    [debouncefetchSpace],
  )

  return { scrapCount, handleClickScrap }
}

export default useScrap
