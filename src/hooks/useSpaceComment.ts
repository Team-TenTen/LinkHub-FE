import { useCallback, useRef, useState } from 'react'
import {
  SubmitHandler,
  UseFormSetFocus,
  UseFormSetValue,
} from 'react-hook-form'
import { CommentFormValues } from '@/app/(routes)/space/[spaceId]/comment/page'
import { CommentProps } from '@/components/common/Comment/Comment'
import {
  fetchCreateComment,
  fetchUpdateComment,
} from '@/services/comment/comment'
import { useQueryClient } from '@tanstack/react-query'

export interface SpaceComment extends CommentProps {
  replies?: CommentProps[]
}

export interface useSpaceCommentProps {
  spaceId: number
  setValue: UseFormSetValue<CommentFormValues>
  setFocus: UseFormSetFocus<CommentFormValues>
}

export interface Comment {
  type: 'create' | 'edit' | 'reply'
  commentId: number
  userName?: string
  parentCommentId?: number
}

export const defaultComment: Comment = {
  type: 'create',
  commentId: -1,
}

const useSpaceComment = ({
  spaceId,
  setValue,
  setFocus,
}: useSpaceCommentProps) => {
  const queryClient = useQueryClient()
  const [comment, setComment] = useState<Comment>(defaultComment)
  const commentListRef = useRef<HTMLDivElement>(null)

  const handleEdit = useCallback(
    (commentId: number, comment: string, parentCommentId?: number) => {
      setComment({ type: 'edit', commentId, parentCommentId })
      setValue('comment', comment)
      setFocus('comment')
    },
    [setFocus, setValue],
  )

  const handleReply = useCallback(
    (commentId: number, userName: string, parentCommentId?: number) => {
      setComment({ type: 'reply', commentId, userName, parentCommentId })
      setValue('comment', '')
      setFocus('comment')
    },
    [setFocus, setValue],
  )

  const handleReplyCancel = () => {
    setComment(defaultComment)
    setValue('comment', '')
  }

  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    if (comment.type === 'create') {
      await fetchCreateComment(spaceId, { content: data.comment })
      await queryClient.invalidateQueries({ queryKey: ['comments', spaceId] })
      commentListRef.current?.scrollIntoView(false)
    } else if (comment.type === 'edit') {
      await fetchUpdateComment(spaceId, comment.commentId, {
        content: data.comment,
      })
      await queryClient.invalidateQueries({ queryKey: ['comments', spaceId] })
      if (comment.parentCommentId) {
        await queryClient.invalidateQueries({
          queryKey: ['replies', spaceId, comment.parentCommentId],
        })
      }
    }
    setComment(defaultComment)
    setValue('comment', '')
  }

  return {
    comment,
    commentListRef,
    handleEdit,
    handleReply,
    handleReplyCancel,
    onSubmit,
  }
}

export default useSpaceComment
