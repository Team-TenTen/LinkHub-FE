'use client'

import { useForm } from 'react-hook-form'
import { useModal } from '@/hooks'
import { GetLinksReqBody } from '@/types'
import { cls, getRandomColor } from '@/utils'
import Button from '../Button/Button'
import { ChipColors } from '../Chip/Chip'
import Input from '../Input/Input'
import LinkItem from '../LinkItem/LinkItem'
import {
  ADD_LINK_TEXT,
  MORE_TEXT,
  URL_INPUT_VALIDATION_TEXT,
} from './constants'
import useCreateLink from './hooks/useCreateLink'
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
}: LinkListProps) => {
  const { Modal, isOpen, modalOpen, modalClose } = useModal()
  const { register, getValues, setValue, handleSubmit, reset } =
    useForm<CreateLinkFormValue>({
      defaultValues: {
        url: '',
        title: '',
        tagName: '',
      },
    })
  const {
    isUrlCheck,
    setIsUrlCheck,
    isUrlError,
    handleGetMeta,
    handleCreateLink,
  } = useCreateLink(setValue)
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
        <button
          className={cls(
            'flex bg-slate-100 px-3 py-2.5 text-sm font-medium text-gray9 dark:bg-slate-800',
            type === 'list'
              ? 'border-t border-slate3'
              : 'items-center justify-center rounded-md border',
          )}
          onClick={modalOpen}>
          <div className="text-gray9">{ADD_LINK_TEXT}</div>
        </button>
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
          onClose={() => {
            modalClose()
            reset()
            setIsUrlCheck(false)
          }}
          onConfirm={handleSubmit(async ({ url, title, tagName }) => {
            await handleCreateLink({
              spaceId,
              url,
              title,
              tagName,
              color: 'emerald',
            })
            reset()
            setIsUrlCheck(false)
          })}
          type="form">
          <div className="flex flex-col gap-2">
            <Input
              {...register('url')}
              label="URl"
              inputButton={true}
              onButtonClick={() => handleGetMeta({ url: getValues('url') })}
              validation={isUrlError ? URL_INPUT_VALIDATION_TEXT : ''}
            />
            <Input
              {...register('title')}
              label="제목"
              disabled={!isUrlCheck}
            />
            <Input
              label="태그"
              {...register('tagName')}
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default LinkList
