'use client'

import { useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { User } from '@/types'
import { cls } from '@/utils'
import {
  DocumentTextIcon,
  HeartIcon as HeartIconOutline,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Avatar from '../Avatar/Avatar'
import AvatarGroup from '../AvatarGroup/AvatarGroup'
import Button from '../Button/Button'
import Chip from '../Chip/Chip'
import Input from '../Input/Input'
import LoginModal from '../Modal/LoginModal'
import { DELETE_TEXT } from './\bconstants'
import useLikeLink from './hooks/useLikeLink'

export interface LinkItemProps {
  linkId: number
  title: string
  url: string
  tag: string
  readUsers?: Pick<User, 'id' | 'profile'>[]
  isInitLiked?: boolean
  likeInitCount: number
  read?: boolean
  summary?: boolean
  edit?: boolean
  type?: 'list' | 'card'
}

const LinkItem = ({
  linkId,
  title,
  url,
  tag,
  readUsers,
  isInitLiked,
  likeInitCount,
  read = false,
  summary = false,
  edit = false,
  type = 'list',
}: LinkItemProps) => {
  const { isLoggedIn } = useCurrentUser()
  const { Modal, isOpen, modalClose, currentModal, handleOpenCurrentModal } =
    useModal()
  const { isLiked, likeCount, handleLikeClick } = useLikeLink({
    linkId,
    isLikedValue: isInitLiked,
    likeCountValue: likeInitCount,
  })

  return (
    <>
      {type === 'list' ? (
        <div className="flex items-center justify-between gap-2 border-t border-slate3 px-3 py-2 last:border-b">
          <Link
            className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray9"
            href={url}
            target="_blank">
            {title}
          </Link>
          <div className="flex shrink-0 gap-1.5">
            {tag && (
              <div>
                <Chip label={tag} />
              </div>
            )}
            {readUsers && readUsers.length > 0 && read && !edit ? (
              <AvatarGroup>
                {readUsers?.map((readUser) => (
                  <Avatar
                    key={readUser.id}
                    src="/duck.jpg"
                    width={20}
                    height={20}
                    alt="아바타"
                  />
                ))}
              </AvatarGroup>
            ) : (
              <div />
            )}
            {edit ? (
              <>
                <Button
                  onClick={() => {
                    handleOpenCurrentModal('delete')
                  }}>
                  <TrashIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
                <Button
                  onClick={() => {
                    handleOpenCurrentModal('update')
                  }}>
                  <PencilSquareIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="button button-round button-white"
                  onClick={() =>
                    isLoggedIn
                      ? handleLikeClick(isLiked)
                      : handleOpenCurrentModal('login')
                  }>
                  {isLiked ? (
                    <HeartIconSolid className="h-4 w-4 text-slate6" />
                  ) : (
                    <HeartIconOutline className="h-4 w-4  text-slate6" />
                  )}
                  {likeCount}
                </Button>
                {summary && (
                  <Button>
                    <DocumentTextIcon className="h-6 w-6 p-0.5 text-slate6" />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-h-[101.5px] flex-col justify-between gap-1 rounded-md border px-3 py-2.5">
          <div
            className={cls(
              'block overflow-hidden text-ellipsis  text-sm font-medium text-gray9',
              tag ? 'whitespace-nowrap' : 'text-overflow-2 mb-[9.5px]',
            )}>
            {title}
          </div>
          {tag && (
            <div>
              <Chip label={tag} />
            </div>
          )}
          <div className="flex items-center justify-between">
            {readUsers && readUsers.length > 0 && read && !edit ? (
              <AvatarGroup>
                {readUsers?.map((readUser) => (
                  <Avatar
                    key={readUser.id}
                    src="/duck.jpg"
                    width={20}
                    height={20}
                    alt="아바타"
                  />
                ))}
              </AvatarGroup>
            ) : (
              <div />
            )}
            {edit ? (
              <div className="flex gap-1.5">
                <Button
                  onClick={() => {
                    handleOpenCurrentModal('delete')
                  }}>
                  <TrashIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
                <Button
                  onClick={() => {
                    handleOpenCurrentModal('update')
                  }}>
                  <PencilSquareIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-1.5">
                <Button
                  className="button button-round button-white"
                  onClick={() =>
                    isLoggedIn
                      ? handleLikeClick(isLiked)
                      : handleOpenCurrentModal('login')
                  }>
                  {isLiked ? (
                    <HeartIconSolid className="h-4 w-4 text-slate6" />
                  ) : (
                    <HeartIconOutline className="h-4 w-4  text-slate6" />
                  )}
                  {likeCount}
                </Button>
                {summary && (
                  <Button>
                    <DocumentTextIcon className="h-6 w-6 p-0.5 text-slate6" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {isOpen && (
        <Modal
          title={currentModal === 'update' ? '링크 수정' : '링크 삭제'}
          isCancelButton={currentModal === 'update' ? false : true}
          isConfirmButton={true}
          confirmText={currentModal === 'update' ? '수정' : '삭제'}
          onClose={modalClose}>
          {currentModal === 'update' && (
            <div className="flex flex-col gap-2">
              <Input
                label="URl"
                inputButton={true}
              />
              <Input label="이름" />
              <Input label="태그" />
            </div>
          )}
          {currentModal === 'delete' && (
            <div className="flex justify-center text-base text-gray9">
              {DELETE_TEXT}
            </div>
          )}
        </Modal>
      )}
      {currentModal === 'login' && (
        <LoginModal
          Modal={Modal}
          isOpen={isOpen}
          modalClose={modalClose}
        />
      )}
    </>
  )
}

export default LinkItem
