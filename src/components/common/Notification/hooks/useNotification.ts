import { useRouter } from 'next/navigation'

export interface handleClickUserProps {
  notificationId: number
  userId: number
  isRead: boolean
}

export interface handleClickSpaceProps {
  notificationId: number
  spaceId?: number
  isRead: boolean
}

export interface UseNotificationReturn {
  handleClickUser: ({
    notificationId,
    userId,
    isRead,
  }: handleClickUserProps) => void
  handleClickSpace: ({
    notificationId,
    spaceId,
    isRead,
  }: handleClickSpaceProps) => void
  handleClickComment: ({
    notificationId,
    spaceId,
    isRead,
  }: handleClickSpaceProps) => void
}

const useNotification = (): UseNotificationReturn => {
  const router = useRouter()

  const handleClickUser = ({
    notificationId,
    userId,
    isRead,
  }: handleClickUserProps) => {
    router.push(`/user/${userId}`)
    if (!isRead) {
      console.log(`${notificationId} 읽음 처리 추가`)
    }
  }

  const handleClickSpace = ({
    notificationId,
    spaceId,
    isRead,
  }: handleClickSpaceProps) => {
    router.push(`/space/${spaceId}`)
    if (!isRead) {
      console.log(`${notificationId} 읽음 처리 추가`)
    }
  }

  const handleClickComment = ({
    notificationId,
    spaceId,
    isRead,
  }: handleClickSpaceProps) => {
    router.push(`/space/${spaceId}/comment`)
    if (!isRead) {
      console.log(`${notificationId} 읽음 처리 로직 추가`)
    }
  }

  return { handleClickUser, handleClickSpace, handleClickComment }
}

export default useNotification
