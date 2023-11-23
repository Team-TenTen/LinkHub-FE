import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { SearchFormValue } from '@/app/(routes)/user/[userId]/space/page'
import { useRouter } from 'next/navigation'

export interface UseSpaceSearchProps {
  userId: number
  category: string
  setValue: UseFormSetValue<SearchFormValue>
}

const useProfileFavoritesSearch = ({
  userId,
  category,
  setValue,
}: UseSpaceSearchProps) => {
  const router = useRouter()

  const onSubmit: SubmitHandler<SearchFormValue> = (data) => {
    if (category) {
      router.push(
        `/user/${userId}/favorite?&category=${category}&keyword=${data.keyword}`,
      )
    } else {
      router.push(`/user/${userId}/favorite?keyword=${data.keyword}`)
    }
    setValue('keyword', '')
  }

  return { onSubmit }
}

export default useProfileFavoritesSearch
