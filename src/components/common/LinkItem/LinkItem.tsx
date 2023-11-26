'use client'

import { useForm } from 'react-hook-form'
import { useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
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
import Chip, { ChipColors } from '../Chip/Chip'
import Input from '../Input/Input'
import { CreateLinkFormValue, linkViewHistories } from '../LinkList/LinkList'
import { URL_INPUT_VALIDATION_TEXT } from '../LinkList/constants'
import useGetMeta from '../LinkList/hooks/useGetMeta'
import LoginModal from '../Modal/LoginModal'
import { DELETE_TEXT } from './\bconstants'
import useDeleteLink from './hooks/useDeleteLink'
import useLikeLink from './hooks/useLikeLink'
import useReadSaveLink from './hooks/useReadSaveLink'
import useUpdateLink from './hooks/useUpdateLink'

export interface LinkItemProps {
  linkId: number
  spaceId?: number
  title: string
  url: string
  tagName: string
  tagColor: ChipColors
  readUsers?: linkViewHistories[]
  isInitLiked?: boolean
  likeInitCount: number
  read?: boolean
  summary?: boolean
  edit?: boolean
  type?: 'list' | 'card'
}

const LinkItem = ({
  spaceId,
  linkId,
  title,
  url,
  tagName,
  tagColor,
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
  const { register, getValues, setValue, handleSubmit, reset } =
    useForm<CreateLinkFormValue>({
      defaultValues: {
        url,
        title,
        tagName,
      },
    })
  const { isUrlCheck, setIsUrlCheck, isUrlError, handleGetMeta } =
    useGetMeta(setValue)
  const { handleUpdateLink } = useUpdateLink({ spaceId, linkId })
  const { handleDeleteLink } = useDeleteLink()
  const { handleSaveReadInfo } = useReadSaveLink()
  const { isLiked, likeCount, handleClickLike } = useLikeLink({
    linkId,
    isLikedValue: isInitLiked,
    likeCountValue: likeInitCount,
  })

  return (
    <>
      {type === 'list' ? (
        <div className="flex items-center justify-between gap-2 border-t border-slate3 px-3 py-2 last:border-b">
          <Link
            onClick={() => handleSaveReadInfo({ spaceId, linkId })}
            className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray9"
            href={url}
            target="_blank">
            {title}
          </Link>
          <div className="flex shrink-0 gap-1.5">
            {tagName && (
              <div>
                <Chip
                  label={tagName}
                  color={tagColor}
                />
              </div>
            )}
            {readUsers && readUsers.length > 0 && read && !edit ? (
              <AvatarGroup>
                {readUsers?.map((readUser) => (
                  <Avatar
                    key={readUser.memberName}
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
                      ? handleClickLike(isLiked)
                      : handleOpenCurrentModal('login')
                  }>
                  {isLiked ? (
                    <HeartIconSolid className="h-4 w-4 text-red-400" />
                  ) : (
                    <HeartIconOutline className="h-4 w-4 text-slate6" />
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
              tagName ? 'whitespace-nowrap' : 'text-overflow-2 mb-[9.5px]',
            )}>
            {title}
          </div>
          {tagName && (
            <div>
              <Chip
                label={tagName}
                color={tagColor}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            {readUsers && readUsers.length > 0 && read && !edit ? (
              <AvatarGroup>
                {readUsers?.map((readUser) => (
                  <Avatar
                    key={readUser.memberName}
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
                      ? handleClickLike(isLiked)
                      : handleOpenCurrentModal('login')
                  }>
                  {isLiked ? (
                    <HeartIconSolid className="h-4 w-4 text-red-400" />
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
          onClose={() => {
            modalClose()
            reset()
            setIsUrlCheck(false)
          }}
          onConfirm={() => {
            currentModal === 'update'
              ? handleSubmit(async ({ url, title, tagName }) => {
                  await handleUpdateLink({
                    url,
                    title,
                    tagName,
                    color: 'emerald',
                  })
                  reset()
                  setIsUrlCheck(false)
                })()
              : spaceId && handleDeleteLink({ spaceId, linkId })
          }}
          type="form">
          {currentModal === 'update' && (
            <div className="flex flex-col gap-2">
              <Input
                {...register('url')}
                label="URl"
                inputButton={true}
                onButtonClick={() => handleGetMeta({ url: getValues('url') })}
                validation={isUrlError ? URL_INPUT_VALIDATION_TEXT : ''}
              />
              <Input
                label="제목"
                {...register('title')}
                disabled={!isUrlCheck}
              />
              <Input
                label="태그"
                {...register('tagName')}
              />
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
