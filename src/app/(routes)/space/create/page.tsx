import SpaceForm from '@/components/Space/SpaceForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '스페이스 생성',
}

const SpaceCreatePage = () => {
  return (
    <div>
      <SpaceForm spaceType="Create" />
    </div>
  )
}

export default SpaceCreatePage
