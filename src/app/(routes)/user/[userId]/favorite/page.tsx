'use client'

import { useForm } from 'react-hook-form'
import { CategoryList, Input, SpaceList } from '@/components'
import { useCategoryParam, useProfileSpacesSearch } from '@/hooks'
import { fetchGetMyFavoriteSpaces } from '@/services/user/profile/route'
import { usePathname, useSearchParams } from 'next/navigation'
import { SearchFormValue } from '../space/page'

const UserFavoritePage = () => {
  const pathname = usePathname()
  const userId = Number(pathname.split('/')[2])
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')
  const { register, handleSubmit } = useForm<SearchFormValue>({
    defaultValues: {
      keyword: keyword ?? '',
    },
  })
  const { category, categoryIndex, handleCategoryChange } =
    useCategoryParam('all')
  const { onSubmit } = useProfileSpacesSearch({
    userId,
    category: category || '',
    type: 'favorite',
  })

  return (
    <div className="px-4">
      <CategoryList
        type="all"
        defaultIndex={categoryIndex}
        horizontal={true}
        onChange={handleCategoryChange}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('keyword')}
          inputButton={true}
          buttonText="검색"
          buttonColor="gray"
          buttonType="submit"
        />
      </form>
      <div className="flex flex-col gap-2 py-4">
        <SpaceList
          queryKey="profile"
          category={category ?? ''}
          keyword={keyword ?? ''}
          fetchFn={fetchGetMyFavoriteSpaces}
        />
      </div>
    </div>
  )
}

export default UserFavoritePage
