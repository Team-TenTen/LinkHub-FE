'use client'

import { useForm } from 'react-hook-form'
import { useModal } from '@/hooks'
import { GetLinksReqBody } from '@/types'
import { cls } from '@/utils'
import Button from '../Button/Button'
import { ChipColors } from '../Chip/Chip'
import Input from '../Input/Input'
import LinkItem from '../LinkItem/LinkItem'
import { ADD_LINK_TEXT, MORE_TEXT } from './constants'
import useCreateLink from './hooks/useCreateLink'
import useGetMeta from './hooks/useGetMeta'
import useLinksQuery from './hooks/useLinksQuery'

export interface linkViewHistories {
  memberName: string
  memberProfileImage: string
}

export interface Link {
  linkId: number
  title: string
  url: string
  tagName: string
  tagColor: ChipColors
  canReadMark: boolean
  canLinkSummaraizable: boolean
  isLiked: false
  likeCount: number
  linkViewHistories: linkViewHistories[]
}

export interface LinkListProps {
  spaceId?: number
  read?: boolean
  summary?: boolean
  edit?: boolean
  type?: 'list' | 'card'
  fetchFn: ({ pageNumber, pageSize }: GetLinksReqBody) => Promise<any>
  sort: string
  tagId?: number
  isCanEdit: boolean
  isMember: boolean
}

export interface CreateLinkFormValue {
  url: string
  title: string
  tagName: string
}

const LinkList = ({
  spaceId,
  read = false,
  summary = false,
  edit = false,
  type = 'list',
  fetchFn,
  sort,
  tagId,
  isCanEdit,
  isMember,
}: LinkListProps) => {
  const { Modal, isOpen, modalOpen, modalClose } = useModal()
  const { handleCreateLink } = useCreateLink({ spaceId })
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLinkFormValue>({
    defaultValues: {
      url: '',
      title: '',
      tagName: '',
    },
  })
  const {
    isUrlCheck,
    urlErrorText,
    setUrlErrorText,
    isShowFormError,
    setIsShowFormError,
    handleModalClose,
    handleChangeUrl,
    handleGetMeta,
  } = useGetMeta({ setValue, modalClose })
  const { links, fetchNextPage, hasNextPage } = useLinksQuery({
    spaceId,
    fetchFn,
    sort,
    tagId,
  })

  return (
    <>
      <div
        className={cls(
          type === 'list' ? 'flex flex-col' : 'grid grid-cols-2 gap-2',
          !hasNextPage && 'mb-0.5 pb-10',
        )}>
        {isCanEdit && (
          <button
            className={cls(
              'flex bg-slate-100 px-3 py-2.5 text-sm font-medium text-gray9 dark:bg-slate-800',
              type === 'list'
                ? 'border-t border-slate3'
                : 'min-h-[101.5px] items-center justify-center rounded-md border',
            )}
            onClick={() => {
              reset()
              modalOpen()
            }}>
            <div className="text-gray9">{ADD_LINK_TEXT}</div>
          </button>
        )}
        <>
          {links?.pages.map((group) =>
            group.responses.map((link: Link) => (
              <LinkItem
                spaceId={spaceId}
                linkId={link.linkId}
                title={link.title}
                url={link.url}
                tagName={link.tagName}
                tagColor={link.tagColor}
                readUsers={link.linkViewHistories}
                isInitLiked={link.isLiked}
                likeInitCount={link.likeCount}
                read={read}
                summary={summary}
                edit={edit}
                isMember={isMember}
                type={type}
                key={link.linkId}
              />
            )),
          )}
        </>
      </div>
      {hasNextPage && (
        <div className="flex justify-center py-2">
          <Button
            className="button button-round button-white"
            onClick={() => fetchNextPage()}>
            {MORE_TEXT}
          </Button>
        </div>
      )}
      {isOpen && (
        <Modal
          title="링크 추가"
          isConfirmButton={true}
          confirmText="추가"
          onClose={handleModalClose}
          onConfirm={() => {
            setIsShowFormError(true)
            if (!isUrlCheck) {
              setUrlErrorText('URL 입력 후 추가 버튼을 눌러주세요.')
              return
            }
            handleSubmit(async ({ url, title, tagName }) => {
              if (!errors.title) {
                await handleCreateLink({
                  url,
                  title,
                  tagName,
                  color: 'emerald',
                })
                modalClose()
              }
            })()
          }}
          type="form">
          <div className="flex flex-col gap-2">
            <Input
              {...register('url', {
                required: {
                  value: true,
                  message: 'URL 입력 후 추가 버튼을 눌러주세요.',
                },
                onChange: handleChangeUrl,
              })}
              label="URl"
              inputButton={true}
              onButtonClick={() => handleGetMeta({ url: getValues('url') })}
              validation={isUrlCheck ? errors.url?.message : urlErrorText}
            />
            <Input
              {...register('title', {
                minLength: {
                  value: 2,
                  message: '제목은 2글자 이상 50글자 이하로 작성해야 합니다.',
                },
                maxLength: {
                  value: 50,
                  message: '제목은 2글자 이상 50글자 이하로 작성해야 합니다.',
                },
                required: {
                  value: true,
                  message: '제목을 입력해 주세요.',
                },
              })}
              label="제목"
              placeholder="제목을 입력해 주세요. (2 ~ 50글자)"
              disabled={!isUrlCheck}
              validation={isShowFormError ? errors.title?.message : ''}
            />
            <Input
              {...register('tagName', {
                maxLength: {
                  value: 10,
                  message: '태그는 10글자 이하로 작성해야 합니다.',
                },
              })}
              label="태그"
              placeholder="태그를 입력해 주세요. (0 ~ 10글자)"
              validation={errors.tagName?.message || ''}
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default LinkList
