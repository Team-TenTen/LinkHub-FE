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
import { fetchCreateReply } from '@/services/comment/reply'
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
  parentCommentUser?: string
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
    (
      commentId: number,
      comment: string,
      parentCommentId?: number,
      parentCommentUser?: string,
    ) => {
      setComment({
        type: 'edit',
        commentId,
        parentCommentId,
        parentCommentUser,
      })
      setValue('comment', comment)
      setFocus('comment')
    },
    [setFocus, setValue],
  )

  const handleReply = useCallback(
    (commentId: number, userName: string) => {
      setComment({ type: 'reply', commentId, userName })
      setValue('comment', '')
      setFocus('comment')
    },
    [setFocus, setValue],
  )

  const handleCancel = () => {
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
    } else if (comment.type === 'reply') {
      await fetchCreateReply(spaceId, comment.commentId, {
        content: data.comment,
      })
      await queryClient.invalidateQueries({ queryKey: ['comments', spaceId] })
      await queryClient.invalidateQueries({
        queryKey: ['replies', spaceId, comment.commentId],
      })
    }
    setComment(defaultComment)
    setValue('comment', '')
  }

  return {
    comment,
    commentListRef,
    handleEdit,
    handleReply,
    handleCancel,
    onSubmit,
  }
}

export default useSpaceComment
