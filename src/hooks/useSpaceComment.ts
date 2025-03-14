import { useCallback, useRef, useState } from 'react'
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormSetFocus,
  UseFormSetValue,
} from 'react-hook-form'
import { CommentFormValues } from '@/app/(routes)/space/[spaceId]/comment/page'
import { CommentProps } from '@/components/common/Comment/Comment'
import { notify } from '@/components/common/Toast/Toast'
import {
  usePostComment,
  usePostReply,
  usePutComment,
} from '@/services/comments/useComments'

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
  nickname?: string
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
  const [comment, setComment] = useState<Comment>(defaultComment)
  const [openedComments, setOpenedComments] = useState<number[]>([])
  const commentListRef = useRef<HTMLDivElement>(null)
  const { mutateAsync: createComment } = usePostComment(spaceId)
  const { mutateAsync: updateComment } = usePutComment(
    spaceId,
    comment.parentCommentId,
  )
  const { mutateAsync: createReply } = usePostReply(
    spaceId,
    comment.parentCommentId,
  )
  console.log(comment.parentCommentId)
  const handleOpen = useCallback(
    (commentId: number) => {
      if (openedComments.includes(commentId)) {
        const filteredIds = openedComments.filter(
          (comment) => comment !== commentId,
        )
        setOpenedComments(filteredIds)
      } else {
        setOpenedComments((prev) => [...prev, commentId])
      }
    },
    [openedComments],
  )

  const handleEdit = useCallback(
    (
      commentId: number,
      content: string,
      parentCommentId?: number,
      parentCommentUser?: string,
    ) => {
      setComment({
        type: 'edit',
        commentId,
        parentCommentId,
        parentCommentUser,
      })
      setValue('content', content)
      setFocus('content')
    },
    [setFocus, setValue],
  )

  const handleReply = useCallback(
    (commentId: number, nickname: string) => {
      setComment({ type: 'reply', commentId, nickname })
      setValue('content', '')
      setFocus('content')
    },
    [setFocus, setValue],
  )

  const handleCancel = () => {
    setComment(defaultComment)
    setValue('content', '')
  }

  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    if (comment.type === 'create') {
      await createComment({ spaceId, content: data.content })
      commentListRef.current?.scrollIntoView(false)
    } else if (comment.type === 'edit') {
      await updateComment({
        spaceId,
        commentId: comment.commentId,
        content: data.content,
      })
    } else if (comment.type === 'reply') {
      await createReply({
        spaceId,
        commentId: comment.commentId,
        content: data.content,
      })

      setOpenedComments((prev) => [...prev, comment.commentId])
    }
    setComment(defaultComment)
    setValue('content', '')
  }

  const onSubmitError: SubmitErrorHandler<CommentFormValues> = ({
    content,
  }) => {
    content?.message && notify('error', content?.message)
  }

  return {
    comment,
    openedComments,
    commentListRef,
    handleOpen,
    handleEdit,
    handleReply,
    handleCancel,
    onSubmit,
    onSubmitError,
  }
}

export default useSpaceComment
