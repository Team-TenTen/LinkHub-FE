import { useCurrentUser } from '@/hooks/useCurrentUser'
import { fetchReadSaveLink } from '@/services/link/link'

export interface HandleSaveReadInfoProps {
  spaceId?: number
  linkId: number
}

const useReadSaveLink = () => {
  const { isLoggedIn } = useCurrentUser()

  const handleSaveReadInfo = ({ spaceId, linkId }: HandleSaveReadInfoProps) => {
    if (spaceId && linkId && isLoggedIn) {
      fetchReadSaveLink({ spaceId, linkId })
      console.log('접속 저장됨')
    }
  }

  return { handleSaveReadInfo }
}

export default useReadSaveLink
