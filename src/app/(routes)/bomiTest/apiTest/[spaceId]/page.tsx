import Space from '@/components/common/Space/Space'
import { getSpaceDetail } from '@/services/space/space'

interface ApiTestProps {
  params: {
    spaceId: string
  }
}

interface MemberDetailInfo {
  memberId: number
  nickname: string
  aboutMe: string
  profilePath: string
  SpaceMemberRole: string
}
interface SpaceProps {
  spaceId: number
  spaceName: string
  description: string
  category: string
  isVisible: boolean
  isComment: boolean
  isLinkSummarizable: boolean
  isReadMarkEnabled: boolean
  viewCount: number
  scrapCount: number
  favoriteCount: number
  spaceImagePath: string
  memberDetailInfos: MemberDetailInfo[]
  isOwner: boolean
}

const getSpaceData = async (id: string): Promise<SpaceProps> => {
  const res = await getSpaceDetail(id)
  return res
}

const ApiTest = async ({ params }: ApiTestProps) => {
  const spaceData: SpaceProps = await getSpaceData(params.spaceId)

  // next에서 이러한 패턴을 권장했는데 왜 안될까용...?? ㅠㅠ
  const [space] = await Promise.all([spaceData])

  // 콘솔에는 잘찍히는데
  console.log(space)

  // 렌더링이 되지 않는 모습
  return (
    <div>
      <Space
        type="Card"
        userName="tester"
        spaceId={space.spaceId}
        spaceName={space.spaceName}
        spaceImage={space.spaceImagePath}
        description={space.description}
        category={space.category}
        scrap={space.scrapCount}
        favorite={space.favoriteCount}
      />
    </div>
  )
}

export default ApiTest
