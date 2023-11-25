'use client'

import { useModal } from '@/hooks'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Avatar } from '../..'
import Button from '../Button/Button'
import useComment from './hooks/useComment'

export interface CommentProps {
  commentId: number
  spaceId: number
  user: { id: number; name: string; profile: string }
  comment: string
  date: Date
  auth?: boolean
  firstDepth?: boolean
  parentCommentId?: number
  replyCount?: number
  onEdit?: (
    commentId: number,
    comment: string,
    parentCommentId?: number,
  ) => void
  onOpen?: (commentId: number) => void
  onReply?: (commentId: number, userName: string) => void
}

const Comment = ({
  commentId,
  spaceId,
  parentCommentId,
  user,
  comment,
  date,
  auth = false,
  firstDepth = true,
  replyCount = 0,
  onEdit,
  onOpen,
  onReply,
}: CommentProps) => {
  const { Modal, isOpen, modalOpen, modalClose } = useModal(false)
  const { handleDelete, handleDeleteConfirm } = useComment({
    spaceId,
    parentCommentId,
    modalOpen,
  })

  return (
    <>
      <article className="flex gap-x-2 py-3">
        <Avatar
          src={user.profile}
          width={30}
          height={30}
          alt={user.name}
        />
        <div className="flex w-full flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <Link
              href={`/user/${user.id}`}
              className="text-sm font-semibold text-gray9">
              {user.name}
            </Link>
            {auth && (
              <div className="flex gap-x-1.5">
                <Button
                  className="p-0.5"
                  onClick={() => handleDelete(commentId)}>
                  <TrashIcon className="h-5 w-5 text-slate6" />
                </Button>
                <Button
                  className="p-0.5"
                  onClick={() =>
                    onEdit && onEdit(commentId, comment, parentCommentId)
                  }>
                  <PencilSquareIcon className="h-5 w-5 text-slate6" />
                </Button>
              </div>
            )}
          </div>
          <p className="py-1 text-sm text-gray9">{comment}</p>
          <div className="pt-1 text-xs text-gray6">
            {date.getFullYear().toString()}.{(date.getMonth() + 1).toString()}.
            {date.getDate().toString()}
            {firstDepth && (
              <>
                {' • '}
                <Button
                  className="font-medium"
                  onClick={() => replyCount > 0 && onOpen && onOpen(commentId)}>
                  {replyCount}개의 답글
                </Button>
                {' • '}
                <Button
                  className="font-medium"
                  onClick={() => onReply && onReply(commentId, user.name)}>
                  답글 달기
                </Button>
              </>
            )}
          </div>
        </div>
      </article>
      {isOpen && (
        <Modal
          title="댓글 삭제"
          isCancelButton={true}
          isConfirmButton={true}
          cancelText="취소"
          confirmText="삭제"
          onClose={modalClose}
          onConfirm={() => handleDeleteConfirm(!firstDepth)}>
          <div className="flex justify-center">삭제하시겠습니까?</div>
        </Modal>
      )}
    </>
  )
}

export default Comment
