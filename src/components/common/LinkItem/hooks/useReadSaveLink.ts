import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePostReadSaveLink } from '@/services/link/useLink'

export interface HandleSaveReadInfoProps {
  spaceId?: number
  linkId: number
}

const useReadSaveLink = () => {
  const { isLoggedIn } = useCurrentUser()
  const { mutate: postReadSaveLink } = usePostReadSaveLink()

  const handleSaveReadInfo = ({ spaceId, linkId }: HandleSaveReadInfoProps) => {
    if (spaceId && linkId && isLoggedIn) {
      postReadSaveLink({ spaceId, linkId })
    }
  }

  return { handleSaveReadInfo }
}

export default useReadSaveLink
