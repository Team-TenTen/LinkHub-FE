'use client'

import { useForm } from 'react-hook-form'
import { CategoryList, Input } from '@/components'
import Space from '@/components/common/Space/Space'
import { mock_userData2 } from '@/data'
import useSearch from '@/hooks/useSearch'
import { SearchFormValue } from '../space/page'

const UserFavoritePage = () => {
  const spaceData = mock_userData2.favoriteSpaces
  const { register, setValue, handleSubmit } = useForm<SearchFormValue>({
    defaultValues: {
      keyword: '',
    },
  })
  const { handleCategoryChange, onSubmit } = useSearch({ setValue })

  return (
    <div className="px-4">
      <CategoryList
        type="all"
        horizontal={true}
        onChange={handleCategoryChange}
      />
      <form
        onSubmit={handleSubmit(({ keyword }) => {
          onSubmit({ keyword, path: `/user/${mock_userData2.id}/favorite` })
        })}>
        <Input
          {...register('keyword')}
          inputButton={true}
          buttonText="검색"
          buttonColor="gray"
        />
      </form>
      <div className="flex flex-col gap-2 py-4">
        {spaceData.map((space) => (
          <Space
            key={space.spaceId}
            type="Card"
            userName={space.userName}
            spaceName={space.spaceName}
            spaceImage={space.spaceImage}
            description={space.description}
            category={space.category}
            scrap={space.scrap}
            favorite={space.favorite}
          />
        ))}
      </div>
    </div>
  )
}

export default UserFavoritePage
