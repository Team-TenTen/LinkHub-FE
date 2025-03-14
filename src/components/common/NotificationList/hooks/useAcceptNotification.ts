import { usePostAccetpSpaceInvitation } from '@/services/space/useSpaces'
import { useRouter } from 'next/navigation'
import { notify } from '../../Toast/Toast'
import { NOTIFICATION_INVITE } from '../constants'

export interface HandleAcceptInviteProps {
  notificationId: number
}

const useAcceptNotification = () => {
  const router = useRouter()

  const { mutateAsync: acceptInvitation } = usePostAccetpSpaceInvitation()

  const handleAcceptInvite = async ({
    notificationId,
  }: HandleAcceptInviteProps) => {
    try {
      const { spaceId } = await acceptInvitation({ notificationId })
      notify('success', NOTIFICATION_INVITE.SUCCESS)
      router.push(`/space/${spaceId}`)
    } catch (e) {
      console.error(e)
    }
  }

  return { handleAcceptInvite }
}

export default useAcceptNotification
