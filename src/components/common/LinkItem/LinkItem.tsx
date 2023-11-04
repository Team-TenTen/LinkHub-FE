'use client'

import { useCurrentModal, useModal } from '@/hooks'
import { cls } from '@/utils'
import {
  DocumentTextIcon,
  HeartIcon as HeartIconOutline,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import Avatar from '../Avatar/Avatar'
import AvatarGroup from '../AvatarGroup/AvatarGroup'
import Button from '../Button/Button'
import Chip from '../Chip/Chip'
import Input from '../Input/Input'
import useToggle from '../Toggle/hooks/useToggle'
import { DELETE_TEXT } from './\bconstants'

export interface User {
  id: string
  profile: string
}

export interface LinkItemProps {
  title: string
  tag: string
  readUsers: User[]
  likes: number
  read?: boolean
  summary?: boolean
  edit?: boolean
  type?: 'list' | 'card'
}

const LinkItem = ({
  title,
  tag,
  readUsers,
  likes,
  read = false,
  summary = false,
  edit = false,
  type = 'list',
}: LinkItemProps) => {
  const [isLike, likeToggle] = useToggle()
  const { Modal, isOpen, modalOpen, modalClose } = useModal()
  const [currentModal, handleChangeCurrentModal] = useCurrentModal()

  return (
    <>
      {type === 'list' ? (
        <div className="flex items-center justify-between gap-2 border-t border-slate3 px-3 py-2 last:border-b">
          <div className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray9">
            {title}
          </div>
          <div className="flex shrink-0 gap-1.5">
            {tag && (
              <div>
                <Chip label={tag} />
              </div>
            )}
            {readUsers.length > 0 && read && !edit ? (
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
                    handleChangeCurrentModal('delete')
                    modalOpen()
                  }}>
                  <TrashIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
                <Button
                  onClick={() => {
                    handleChangeCurrentModal('update')
                    modalOpen()
                  }}>
                  <PencilSquareIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="button button-round button-white"
                  onClick={() => likeToggle()}>
                  {isLike ? (
                    <HeartIconSolid className="h-4 w-4 text-slate6" />
                  ) : (
                    <HeartIconOutline className="h-4 w-4  text-slate6" />
                  )}
                  <div>{likes}</div>
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
            {readUsers.length > 0 && read && !edit ? (
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
                    handleChangeCurrentModal('delete')
                    modalOpen()
                  }}>
                  <TrashIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
                <Button
                  onClick={() => {
                    handleChangeCurrentModal('update')
                    modalOpen()
                  }}>
                  <PencilSquareIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-1.5">
                <Button
                  className="button button-round button-white"
                  onClick={() => likeToggle()}>
                  {isLike ? (
                    <HeartIconSolid className="h-4 w-4 text-slate6" />
                  ) : (
                    <HeartIconOutline className="h-4 w-4  text-slate6" />
                  )}
                  <div>{likes}</div>
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
      {isOpen && currentModal === 'update' && (
        <Modal
          title="링크 수정"
          isConfirmButton={true}
          confirmText="수정"
          onClose={modalClose}>
          <div className="flex flex-col gap-2">
            <Input
              label="URl"
              inputButton={true}
            />
            <Input label="이름" />
            <Input label="태그" />
          </div>
        </Modal>
      )}
      {isOpen && currentModal === 'delete' && (
        <Modal
          title="링크 삭제"
          isCancelButton={true}
          isConfirmButton={true}
          confirmText="삭제"
          onClose={modalClose}>
          <div className="flex justify-center text-base text-gray9">
            {DELETE_TEXT}
          </div>
        </Modal>
      )}
    </>
  )
}

export default LinkItem
