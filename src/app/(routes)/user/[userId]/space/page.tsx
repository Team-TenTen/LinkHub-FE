'use client'

import { CategoryList, Input } from '@/components'
import Space from '@/components/common/Space/Space'
import { mock_userData2 } from '@/data'

const UserSpacePage = () => {
  const spaceData = mock_userData2.mySpaces
  return (
    <div className="px-4">
      <CategoryList
        type="all"
        horizontal={true}
        onChange={(e) => console.log(e?.currentTarget.value)}
      />
      <Input
        inputButton={true}
        buttonText="검색"
        buttonColor="gray"
        onButtonClick={() => console.log('검색 로직 추가')}
      />
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

export default UserSpacePage
