import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { SearchFormValue } from '@/app/(routes)/user/[userId]/space/page'
import { notify } from '@/components/common/Toast/Toast'
import { useRouter } from 'next/navigation'

export interface UseSpaceSearchProps {
  userId: number
  category: string
  type: 'space' | 'favorite'
}

const useProfileSpacesSearch = ({
  userId,
  category,
  type,
}: UseSpaceSearchProps) => {
  const router = useRouter()
  const basePath =
    type === 'space' ? `/user/${userId}/space?` : `/user/${userId}/favorite?`

  const onSubmit: SubmitHandler<SearchFormValue> = (data) => {
    if (data.keyword.length === 1) {
      notify('info', '검색어는 최소 2글자여야 합니다.')
      return
    }
    if (category) {
      router.push(`${basePath}category=${category}&keyword=${data.keyword}`)
    } else {
      router.push(`${basePath}keyword=${data.keyword}`)
    }
  }

  return { onSubmit }
}

export default useProfileSpacesSearch
