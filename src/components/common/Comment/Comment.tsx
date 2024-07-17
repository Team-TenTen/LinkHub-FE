'use client'

import React from 'react'
import { useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { getElapsedTime } from '@/utils'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Avatar } from '../..'
import Button from '../Button/Button'
import LoginModal from '../Modal/LoginModal'
import useComment from './hooks/useComment'

export interface CommentProps {
  spaceId: number
  commentId: number
  memberId: number
  nickname: string
  profileImagePath: string
  content: string
  createdAt: string
  replyCount?: number
  isModifiable?: boolean
  isRoot?: boolean
  parentCommentId?: number
  parentCommentUser?: string
  onEdit?: (
    commentId: number,
    content: string,
    parentCommentId?: number,
    parentCommentUser?: string,
  ) => void
  onOpen?: (commentId: number) => void
  onReply?: (commentId: number, nickname: string) => void
}

const Comment = ({
  spaceId,
  commentId,
  memberId,
  nickname,
  profileImagePath,
  content,
  createdAt,
  replyCount = 0,
  isModifiable = false,
  isRoot = true,
  parentCommentId,
  parentCommentUser,
  onEdit,
  onOpen,
  onReply,
}: CommentProps) => {
  const { isLoggedIn } = useCurrentUser()
  const {
    Modal,
    isOpen,
    modalOpen,
    currentModal,
    modalClose,
    handleOpenCurrentModal,
  } = useModal(false)
  const { handleDelete, handleDeleteConfirm } = useComment({
    spaceId,
    parentCommentId,
    modalOpen,
    handleOpenCurrentModal,
  })

  return (
    <>
      <article className="flex gap-x-2 py-3">
        {profileImagePath && (
          <div className="relative h-[30px] w-[30px] shrink-0">
            <Avatar
              src={profileImagePath}
              alt={nickname}
            />
          </div>
        )}
        <div className="flex w-full flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <Link
              href={`/user/${memberId}`}
              className="text-sm font-semibold text-gray9">
              {nickname}
            </Link>
            {isModifiable && (
              <div className="flex gap-x-1.5">
                <Button
                  className="p-0.5"
                  onClick={() => handleDelete(commentId)}>
                  <TrashIcon className="h-5 w-5 text-slate6" />
                </Button>
                <Button
                  className="p-0.5"
                  onClick={() =>
                    onEdit &&
                    onEdit(
                      commentId,
                      content,
                      parentCommentId,
                      parentCommentUser,
                    )
                  }>
                  <PencilSquareIcon className="h-5 w-5 text-slate6" />
                </Button>
              </div>
            )}
          </div>
          <p className="py-1 text-sm text-gray9">{content}</p>
          <div className="pt-1 text-xs text-gray6">
            {getElapsedTime(createdAt)}
            {isRoot && (
              <>
                {replyCount > 0 && (
                  <>
                    {' • '}
                    <Button
                      className="font-medium"
                      onClick={() =>
                        replyCount > 0 && onOpen && onOpen(commentId)
                      }>
                      {replyCount}개의 답글
                    </Button>
                  </>
                )}
                {' • '}
                <Button
                  className="font-medium"
                  onClick={() =>
                    isLoggedIn
                      ? onReply && onReply(commentId, nickname)
                      : handleOpenCurrentModal('login')
                  }>
                  답글 달기
                </Button>
              </>
            )}
          </div>
        </div>
      </article>
      {isOpen && currentModal === 'delete' && (
        <Modal
          title="댓글 삭제"
          isCancelButton={true}
          isConfirmButton={true}
          cancelText="취소"
          confirmText="삭제"
          onClose={modalClose}
          onConfirm={() => handleDeleteConfirm(!isRoot)}>
          <div className="flex justify-center">삭제하시겠습니까?</div>
        </Modal>
      )}
      {isOpen && currentModal === 'login' && (
        <LoginModal
          Modal={Modal}
          isOpen={isOpen}
          modalClose={modalClose}
        />
      )}
    </>
  )
}

export default React.memo(Comment)
