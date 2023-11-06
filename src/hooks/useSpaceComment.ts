import { useCallback, useState } from 'react'
import {
  SubmitHandler,
  UseFormSetFocus,
  UseFormSetValue,
} from 'react-hook-form'
import { CommentFormValues } from '@/app/(routes)/space/[spaceId]/comment/page'
import { CommentProps } from '@/components/Comment/Comment'
import { mock_commentData, mock_replyData, mock_spaceData } from '@/data'

export interface SpaceComment extends CommentProps {
  replies?: CommentProps[]
}

export interface useSpaceCommentProps {
  setValue: UseFormSetValue<CommentFormValues>
  setFocus: UseFormSetFocus<CommentFormValues>
  modalOpen: () => void
}

export interface Comment {
  type: 'create' | 'edit' | 'reply' | 'delete'
  commentId: number
  userName?: string
}

export const defaultComment: Comment = {
  type: 'create',
  commentId: -1,
}

const useSpaceComment = ({
  setValue,
  setFocus,
  modalOpen,
}: useSpaceCommentProps) => {
  const [comments, setComments] = useState<SpaceComment[]>(mock_commentData)
  const [comment, setComment] = useState<Comment>(defaultComment)

  const handleEdit = useCallback(
    (commentId: number, comment: string) => {
      setComment({ type: 'edit', commentId })
      setValue('comment', comment)
      setFocus('comment')
    },
    [setFocus, setValue],
  )

  const handleDelete = useCallback(
    (commentId: number) => {
      setComment({ type: 'delete', commentId })
      modalOpen()
    },
    [modalOpen],
  )

  const handleOpen = useCallback(
    (commentId: number) => {
      const commentsWithReplies = comments.map((comment) =>
        comment.commentId === commentId
          ? {
              ...comment,
              replies: mock_replyData,
            }
          : comment,
      )
      setComments(commentsWithReplies)
    },
    [comments],
  )

  const handleReply = useCallback(
    (commentId: number, userName: string) => {
      setComment({ type: 'reply', commentId, userName })
      setValue('comment', '')
      setFocus('comment')
    },
    [setFocus, setValue],
  )

  const handleDeleteConfirm = () => {
    console.log(comment.type, comment.commentId)
  }

  const handleReplyCancel = () => {
    setComment(defaultComment)
    setValue('comment', '')
  }

  const onSubmit: SubmitHandler<CommentFormValues> = (data) => {
    console.log(comment.type, comment.commentId, data)
    setComment(defaultComment)
    setValue('comment', '')
  }

  return {
    space: mock_spaceData,
    comments,
    comment,
    handleEdit,
    handleDelete,
    handleOpen,
    handleReply,
    handleDeleteConfirm,
    handleReplyCancel,
    onSubmit,
  }
}

export default useSpaceComment
