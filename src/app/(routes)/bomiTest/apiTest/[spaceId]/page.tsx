import Space from '@/components/common/Space/Space'
import { getSpaceDetail } from '@/services/space/space'

interface ApiTestProps {
  params: {
    spaceId: string
  }
}

const ApiTest = async ({ params }: ApiTestProps) => {
  const { space } = await getSpaceDetail(params.spaceId)

  return (
    <div>
      <Space
        type="Card"
        userName="tester"
        spaceId={space.spaceId}
        spaceName={space.spaceName}
        description={space.description}
        category={space.category}
        scrap={space.scrapCount}
        favorite={space.favoriteCount}
      />
    </div>
  )
}

export default ApiTest
