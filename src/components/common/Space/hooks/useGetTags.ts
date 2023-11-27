import { fetchGetTags } from '@/services/space/space'
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import { ChipColors } from '../../Chip/Chip'

export interface Tag {
  name: string
  color: ChipColors
  tagId: number
}

export interface UseGetTagsProps {
  spaceId?: number
}

export type RefetchTagsType = (
  options?: RefetchOptions | undefined,
) => Promise<QueryObserverResult<any, Error>>

export interface UseGetTagsReturnType {
  tags: Tag[]
  refetchTags?: RefetchTagsType
}

const useGetTags = ({ spaceId }: UseGetTagsProps): UseGetTagsReturnType => {
  const { data, refetch: refetchTags } = useQuery({
    queryKey: ['tagList', spaceId],
    queryFn: () => fetchGetTags({ spaceId }),
    enabled: !!spaceId,
  })

  return { tags: data?.tags, refetchTags }
}

export default useGetTags
