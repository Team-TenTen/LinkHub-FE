import { usePostAccetpSpaceInvitation } from '@/services/space/useSpaces'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { notify } from '../../Toast/Toast'
import { NOTIFICATION_INVITE } from '../constants'

export interface UseAcceptNotificationProps {
  type: 'FOLLOW' | 'COMMENT' | 'INVITATION'
}

export interface HandleAcceptInviteProps {
  notificationId: number
}

const useAcceptNotification = ({ type }: UseAcceptNotificationProps) => {
  const router = useRouter()
  const queryclient = useQueryClient()
  const { mutateAsync: acceptInvitation } = usePostAccetpSpaceInvitation()

  const handleAcceptInvite = async ({
    notificationId,
  }: HandleAcceptInviteProps) => {
    try {
      const { spaceId } = await acceptInvitation({ notificationId })
      notify('success', NOTIFICATION_INVITE.SUCCESS)
      router.push(`/space/${spaceId}`)
      await queryclient.invalidateQueries({ queryKey: ['notification', type] })
      await queryclient.invalidateQueries({
        queryKey: ['notificationCount'],
      })
    } catch (e) {
      console.error(e)
    }
  }

  return { handleAcceptInvite }
}

export default useAcceptNotification
