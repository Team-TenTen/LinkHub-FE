'use client'

import { useForm } from 'react-hook-form'
import { Spinner } from '@/components'
import TagInput from '@/components/TagInput/TagInput'
import { useModal } from '@/hooks'
import { GetLinksReqBody } from '@/types'
import { cls } from '@/utils'
import Button from '../Button/Button'
import { ChipColors } from '../Chip/Chip'
import Input from '../Input/Input'
import LinkItem from '../LinkItem/LinkItem'
import { Tag } from '../Space/hooks/useGetTags'
import { RefetchTagsType } from '../Space/hooks/useGetTags'
import {
  ADD_LINK_TEXT,
  LINK_FORM,
  LINK_FORM_PLACEHOLDER,
  LINK_FORM_VALIDATION,
  MORE_TEXT,
  NONE_LINK_RESULT,
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
  tags: Tag[]
  isCanEdit: boolean
  isMember: boolean
  refetchTags?: RefetchTagsType
}

export interface CreateLinkFormValue {
  url: string
  title: string
  tagName: string
  color: string
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
  tags,
  isCanEdit,
  isMember,
  refetchTags,
}: LinkListProps) => {
  const { Modal, isOpen, modalOpen, modalClose } = useModal()
  const { handleCreateLink } = useCreateLink({
    spaceId,
    refetchTags,
  })
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<CreateLinkFormValue>({
    defaultValues: {
      url: '',
      title: '',
      tagName: '',
      color: '',
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
  const { links, fetchNextPage, hasNextPage, isLinksLoading } = useLinksQuery({
    spaceId,
    fetchFn,
    sort,
    tagId,
  })
  console.log(links?.pages[0].responses.length)
  return isLinksLoading ? (
    <Spinner />
  ) : (
    <>
      <div
        className={cls(
          type === 'list' ? 'flex flex-col' : 'grid grid-cols-2 gap-2',
          !hasNextPage && 'mb-0.5 pb-10',
        )}>
        {isCanEdit && (
          <button
            className={cls(
              'flex border-slate3 bg-slate-100 px-3 py-2.5 text-sm font-medium text-gray9 dark:bg-slate-800',
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
          {links?.pages[0].responses.length ? (
            links?.pages.map((group) =>
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
                  tags={tags}
                  refetchTags={refetchTags}
                  key={link.linkId}
                />
              )),
            )
          ) : type === 'list' ? (
            <div className="mt-14 flex justify-center text-sm text-gray9">
              {NONE_LINK_RESULT}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-md border border-slate3">
              <div className="flex text-sm text-gray9">{NONE_LINK_RESULT}</div>
            </div>
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
            handleSubmit(async ({ url, title, tagName, color }) => {
              if (!errors.title) {
                await handleCreateLink({
                  url,
                  title,
                  tagName,
                  color,
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
              buttonText={LINK_FORM.URL_INPUT_BUTTON}
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
            <TagInput
              tags={tags}
              register={register}
              setValue={setValue}
              clearErrors={clearErrors}
              validation={errors.tagName?.message}
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default LinkList
