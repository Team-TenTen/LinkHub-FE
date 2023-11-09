'use client'

interface ApiTestProps {
  params: {
    spaceId: string
  }
}

const fetchSpaceDetail = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/spaces/${id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    },
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch space details. Status: ${response.status}`)
  }

  const spaceDetail = await response.json()

  return spaceDetail
}

const ApiTest = ({ params }: ApiTestProps) => {
  const handleClickButton = async () => {
    const data = await fetchSpaceDetail(params.spaceId)
    console.log(data)
  }

  return (
    <div>
      <button onClick={handleClickButton}>버튼</button>
    </div>
  )
}

export default ApiTest
