import { fetchAccetpSpaceInvitation } from '@/services/space/spaces'
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

  const handleAcceptInvite = async ({
    notificationId,
  }: HandleAcceptInviteProps) => {
    try {
      const { spaceId } = await fetchAccetpSpaceInvitation({ notificationId })
      notify('success', NOTIFICATION_INVITE.SUCCESS)
      router.push(`/space/${spaceId}`)
      await queryclient.invalidateQueries({ queryKey: ['notification', type] })
    } catch (e) {
      console.error(e)
    }
  }

  return { handleAcceptInvite }
}

export default useAcceptNotification
