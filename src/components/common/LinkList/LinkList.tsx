'use client'

import { useForm } from 'react-hook-form'
import { useModal } from '@/hooks'
import { GetLinksReqBody } from '@/types'
import { cls, getRandomColor } from '@/utils'
import Button from '../Button/Button'
import { ChipColors } from '../Chip/Chip'
import Input from '../Input/Input'
import LinkItem from '../LinkItem/LinkItem'
import { RefetchTagsType } from '../Space/hooks/useGetTags'
import {
  ADD_LINK_TEXT,
  LINK_FORM,
  LINK_FORM_PLACEHOLDER,
  LINK_FORM_VALIDATION,
  MORE_TEXT,
} from './constants'
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
  refetchTags?: RefetchTagsType
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
  refetchTags,
}: LinkListProps) => {
  const { Modal, isOpen, modalOpen, modalClose } = useModal()
  const { handleCreateLink } = useCreateLink({ spaceId, refetchTags })
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
                refetchTags={refetchTags}
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
              setUrlErrorText(LINK_FORM_VALIDATION.URL_NOT_BUTTTON)
              return
            }
            handleSubmit(async ({ url, title, tagName }) => {
              if (!errors.title) {
                await handleCreateLink({
                  url,
                  title,
                  tagName,
                  color: getRandomColor(),
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
                  message: LINK_FORM_VALIDATION.URL_NOT_BUTTTON,
                },
                onChange: handleChangeUrl,
              })}
              label={LINK_FORM.URL}
              placeholder={LINK_FORM_PLACEHOLDER.URL}
              inputButton={true}
              onButtonClick={() => handleGetMeta({ url: getValues('url') })}
              validation={isUrlCheck ? errors.url?.message : urlErrorText}
            />
            <Input
              {...register('title', {
                minLength: {
                  value: 2,
                  message: LINK_FORM_VALIDATION.TITLE_LENGTH,
                },
                maxLength: {
                  value: 50,
                  message: LINK_FORM_VALIDATION.TITLE_LENGTH,
                },
                required: {
                  value: true,
                  message: LINK_FORM_VALIDATION.NONE_TITLE,
                },
              })}
              label={LINK_FORM.TITLE}
              placeholder={LINK_FORM_PLACEHOLDER.TITLE}
              disabled={!isUrlCheck}
              validation={isShowFormError ? errors.title?.message : ''}
            />
            <Input
              {...register('tagName', {
                maxLength: {
                  value: 10,
                  message: LINK_FORM_VALIDATION.TAG_LENGTH,
                },
              })}
              label={LINK_FORM.TAG}
              placeholder={LINK_FORM_PLACEHOLDER.TAG}
              validation={errors.tagName?.message || ''}
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default LinkList
