import { useCallback, useEffect, useState } from 'react'
import { fetchGetTags } from '@/services/space/space'
import { ChipColors } from '../../Chip/Chip'

export interface Tag {
  name: string
  color: ChipColors
  tagId: number
}

export interface UseGetTagsProps {
  spaceId?: number
}

const useGetTags = ({ spaceId }: UseGetTagsProps) => {
  const [tags, setTags] = useState<Tag[]>()

  const handleGetTags = useCallback(async () => {
    if (spaceId) {
      const data = await fetchGetTags({ spaceId })
      setTags(data.tags)
    }
  }, [spaceId])

  useEffect(() => {
    handleGetTags()
  }, [handleGetTags])

  return { tags }
}

export default useGetTags
