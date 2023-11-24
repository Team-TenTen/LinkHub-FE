import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { SearchFormValue } from '@/app/(routes)/user/[userId]/space/page'
import { useRouter } from 'next/navigation'

export interface UseSpaceSearchProps {
  userId: number
  category: string
  type: 'space' | 'favorite'
  setValue: UseFormSetValue<SearchFormValue>
}

const useProfileSpacesSearch = ({
  userId,
  category,
  type,
  setValue,
}: UseSpaceSearchProps) => {
  const router = useRouter()
  const basePath =
    type === 'space' ? `/user/${userId}/space?` : `/user/${userId}/favorite?`

  const onSubmit: SubmitHandler<SearchFormValue> = (data) => {
    if (category) {
      router.push(`${basePath}category=${category}&keyword=${data.keyword}`)
    } else {
      router.push(`${basePath}keyword=${data.keyword}`)
    }
    setValue('keyword', '')
  }

  return { onSubmit }
}

export default useProfileSpacesSearch
