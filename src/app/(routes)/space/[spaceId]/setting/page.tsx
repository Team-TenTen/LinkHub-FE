'use client'

import SpaceForm from '@/components/Space/SpaceForm'
import useGetSpace from '@/components/common/Space/hooks/useGetSpace'

const SpaceSettingPage = () => {
  const [space] = useGetSpace()

  return (
    <div>
      {space && (
        <SpaceForm
          spaceType="Setting"
          space={space}
        />
      )}
    </div>
  )
}

export default SpaceSettingPage
