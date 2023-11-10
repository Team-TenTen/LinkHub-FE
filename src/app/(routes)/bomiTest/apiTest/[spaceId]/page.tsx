'use client'

import { getSpaceDetail } from '@/services/space/space'

interface ApiTestProps {
  params: {
    spaceId: string
  }
}

const ApiTest = ({ params }: ApiTestProps) => {
  const handleClickButton = async () => {
    const data = await getSpaceDetail(params.spaceId)
    console.log(data)
  }

  return (
    <div>
      <button onClick={handleClickButton}>버튼</button>
    </div>
  )
}

export default ApiTest
