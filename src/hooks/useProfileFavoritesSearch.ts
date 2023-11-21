import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { SearchFormValue } from '@/app/(routes)/user/[userId]/space/page'
import '@/types'
import { useRouter } from 'next/navigation'

export interface UseSpaceSearchProps {
  userId: number
  category: string
  setValue: UseFormSetValue<SearchFormValue>
}

const useProfileFavoritesSearch = ({
  userId,
  category,
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
  }

  return { onSubmit }
}

export default useProfileFavoritesSearch
