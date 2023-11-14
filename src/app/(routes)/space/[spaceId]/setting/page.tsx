import SpaceForm from '@/components/Space/SpaceForm'

const SpaceSettingPage = () => {
  const spaceObj = {
    userName: 'Bomi',
    spaceId: '123',
    spaceImage: '/TestImage.svg',
    spaceName: '강남역 맛집 리스트 모음 스페이스',
    description: '내 기준 강남역에서 맛있는 맛집 링크 모음집',
    category: '생활•노하우•쇼핑',
    favorite: 60,
    scrap: 40,
    spacePublic: true,
    comment: true,
    summary: false,
    viewer: false,
  }
  return (
    <div>
      <SpaceForm
        spaceType="Setting"
        spaceImage={spaceObj.spaceImage}
        spaceName={spaceObj.spaceName}
        description={spaceObj.description}
        category={spaceObj.category}
        spacePublic={spaceObj.spacePublic}
        comment={spaceObj.comment}
        summary={spaceObj.summary}
        viewer={spaceObj.viewer}
      />
    </div>
  )
}

export default SpaceSettingPage
