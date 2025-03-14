import { useCallback, useState } from 'react'
import { useDeleteComment } from '@/services/comments/useComments'
import { useQueryClient } from '@tanstack/react-query'

export interface useCommentProps {
  spaceId: number
  parentCommentId?: number
  modalOpen: VoidFunction
  handleOpenCurrentModal: (current: string) => void
}

const useComment = ({
  spaceId,
  parentCommentId,
  modalOpen,
  handleOpenCurrentModal,
}: useCommentProps) => {
  const [deleteCommentId, setDeleteCommentId] = useState(0)
  const { mutate: deleteComment } = useDeleteComment(spaceId, parentCommentId)

  const handleDelete = useCallback(
    (commentId: number) => {
      setDeleteCommentId(commentId)
      modalOpen()
      handleOpenCurrentModal('delete')
    },
    [handleOpenCurrentModal, modalOpen],
  )

  const handleDeleteConfirm = useCallback(() => {
    deleteComment({ commentId: deleteCommentId })
  }, [deleteCommentId, deleteComment])

  return {
    handleDelete,
    handleDeleteConfirm,
  }
}

export default useComment
