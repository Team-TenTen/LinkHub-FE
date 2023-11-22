import { useCallback, useRef, useState } from 'react'
import {
  SubmitHandler,
  UseFormSetFocus,
  UseFormSetValue,
} from 'react-hook-form'
import { CommentFormValues } from '@/app/(routes)/space/[spaceId]/comment/page'
import { CommentProps } from '@/components/common/Comment/Comment'
import { mock_commentData, mock_replyData } from '@/data'
import { fetchCreateComment } from '@/services/comment/comment'
import { useQueryClient } from '@tanstack/react-query'

export interface SpaceComment extends CommentProps {
  replies?: CommentProps[]
}

export interface useSpaceCommentProps {
  spaceId: number
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
  spaceId,
  setValue,
  setFocus,
  modalOpen,
}: useSpaceCommentProps) => {
  const queryClient = useQueryClient()
  const [comments, setComments] = useState<SpaceComment[]>(mock_commentData)
  const [comment, setComment] = useState<Comment>(defaultComment)
  const commentListRef = useRef<HTMLDivElement>(null)

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

  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    if (comment.type === 'create') {
      await fetchCreateComment(spaceId, { content: data.comment })
      await queryClient.invalidateQueries({ queryKey: ['comments', spaceId] })
      commentListRef.current?.scrollIntoView(false)
    }
    setComment(defaultComment)
    setValue('comment', '')
  }

  return {
    comments,
    comment,
    commentListRef,
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
