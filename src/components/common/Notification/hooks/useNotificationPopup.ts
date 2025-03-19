import { useRouter } from 'next/navigation'

export interface HandleClickUserProps {
  notificationId: number
  userId: number
  isRead: boolean
}

export interface HandleClickSpaceProps {
  notificationId: number
  spaceId?: number
  isRead: boolean
}

export interface HandleClickCommentProps extends HandleClickSpaceProps {}

export interface UseNotificationReturn {
  handleClickUser: ({
    notificationId,
    userId,
    isRead,
  }: HandleClickUserProps) => void
  handleClickSpace: ({
    notificationId,
    spaceId,
    isRead,
  }: HandleClickSpaceProps) => void
  handleClickComment: ({
    notificationId,
    spaceId,
    isRead,
  }: HandleClickCommentProps) => void
}

const useNotificationPopup = (): UseNotificationReturn => {
  const router = useRouter()

  const handleClickUser = ({
    notificationId,
    userId,
    isRead,
  }: HandleClickUserProps) => {
    router.push(`/user/${userId}`)
    if (!isRead) {
      console.log(`${notificationId} 읽음 처리 추가`)
    }
  }

  const handleClickSpace = ({
    notificationId,
    spaceId,
    isRead,
  }: HandleClickSpaceProps) => {
    router.push(`/space/${spaceId}`)
    if (!isRead) {
      console.log(`${notificationId} 읽음 처리 추가`)
    }
  }

  const handleClickComment = ({
    notificationId,
    spaceId,
    isRead,
  }: HandleClickCommentProps) => {
    router.push(`/space/${spaceId}/comment`)
    if (!isRead) {
      console.log(`${notificationId} 읽음 처리 로직 추가`)
    }
  }

  return { handleClickUser, handleClickSpace, handleClickComment }
}

export default useNotificationPopup
