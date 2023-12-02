'use client'

import { useForm } from 'react-hook-form'
import { CategoryList, Input, SpaceList } from '@/components'
import { useCategoryParam, useProfileSpacesSearch } from '@/hooks'
import { fetchSearchMySpaces } from '@/services/space/spaces'
import { usePathname, useSearchParams } from 'next/navigation'

export interface SearchFormValue {
  keyword: string
}

const UserSpacePage = () => {
  const pathname = usePathname()
  const userId = Number(pathname.split('/')[2])
  const searchparams = useSearchParams()
  const keyword = searchparams.get('keyword')
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
    type: 'space',
  })

  return (
    <div>
      <CategoryList
        type="all"
        defaultIndex={categoryIndex}
        horizontal={true}
        onChange={handleCategoryChange}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4">
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
          memberId={userId}
          queryKey="profile"
          category={category ?? ''}
          keyword={keyword ?? ''}
          fetchFn={fetchSearchMySpaces}
        />
      </div>
    </div>
  )
}

export default UserSpacePage
