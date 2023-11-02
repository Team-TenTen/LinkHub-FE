import Space from '@/components/common/Space/Space'

const TestPage = () => {
  const spaceObj = {
    spaceId: '123',
    spaceImage: '/TestImage.svg',
    spaceName: '강남역 맛집 리스트 모음 스페이스',
    description: '내 기준 강남역에서 맛있는 맛집 링크 모음집',
    category: '생활•노하우•쇼핑',
    favorite: 60,
    scrap: 40,
  }

  return (
    <div>
      <div className="m-4">
        <Space
          type="Card"
          spaceName={spaceObj.spaceName}
          spaceImage={spaceObj.spaceImage}
          description={spaceObj.description}
          category={spaceObj.category}
          scrap={spaceObj.scrap}
          favorite={spaceObj.favorite}
          _spaceId={spaceObj.spaceId}
        />
      </div>
      <div>
        <Space
          type="Header"
          spaceName={spaceObj.spaceName}
          spaceImage={spaceObj.spaceImage}
          description={spaceObj.description}
          category={spaceObj.category}
          scrap={spaceObj.scrap}
          favorite={spaceObj.favorite}
        />
      </div>
    </div>
  )
}

export default TestPage
