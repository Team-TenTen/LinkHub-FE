import Space from '@/components/common/Space/Space'
import { mock_spaceData } from '@/data'

const TestPage = () => {
  const spaceObj = mock_spaceData

  return (
    <div>
      <div className="m-4">
        <Space
          type="Card"
          userName={spaceObj.userName}
          spaceName={spaceObj.spaceName}
          spaceImage={spaceObj.spaceImage}
          description={spaceObj.description}
          category={spaceObj.category}
          scrap={spaceObj.scrap}
          favorite={spaceObj.favorite}
          spaceId={spaceObj.spaceId}
        />
      </div>
      <div>
        <Space
          type="Header"
          userName={spaceObj.userName}
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
