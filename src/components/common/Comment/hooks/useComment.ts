import { useCallback, useState } from 'react'
import { fetchDeleteComment } from '@/services/comment/comment'
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
  const queryClient = useQueryClient()
  const [deleteCommentId, setDeleteCommentId] = useState(0)

  const handleDelete = useCallback(
    (commentId: number) => {
      setDeleteCommentId(commentId)
      modalOpen()
      handleOpenCurrentModal('delete')
    },
    [handleOpenCurrentModal, modalOpen],
  )

  const handleDeleteConfirm = useCallback(
    async (isReply: boolean) => {
      await fetchDeleteComment(spaceId, deleteCommentId)
      await queryClient.invalidateQueries({ queryKey: ['comments', spaceId] })
      if (isReply) {
        await queryClient.invalidateQueries({
          queryKey: ['replies', spaceId, parentCommentId],
        })
      }
    },
    [deleteCommentId, queryClient, spaceId, parentCommentId],
  )

  return {
    handleDelete,
    handleDeleteConfirm,
  }
}

export default useComment
