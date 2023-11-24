import { DROPDOWN_OPTIONS } from '@/components/common/Dropdown/constants'
import { Tag } from '@/components/common/Space/hooks/useGetTags'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useQueryString from './useQueryString'

export interface UseTagParams {
  tags?: Tag[]
}

const useTagParam = ({ tags = [] }: UseTagParams) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')
  const dropdownTagList = [{ name: '전체', color: '', tagId: 0 }, ...tags]
  const tagIndex = tag
    ? Object.values(dropdownTagList).findIndex(
        (tagValue) => tagValue.tagId === Number(tag),
      )
    : 0
  const { createQueryString } = useQueryString(searchParams)

  const getTagId = (tagName: string) => {
    const foundTag = dropdownTagList.find(
      (tagValue) => tagValue.name === tagName,
    )
    return foundTag?.tagId.toString() || ''
  }

  const handleTagChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (tags) {
      router.replace(
        pathname +
          '?' +
          createQueryString('tag', getTagId(e.currentTarget.value)),
        { scroll: false },
      )
    }
  }

  return {
    tag,
    tagIndex,
    handleTagChange,
  }
}

export default useTagParam
