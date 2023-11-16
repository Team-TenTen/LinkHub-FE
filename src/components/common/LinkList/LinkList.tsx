'use client'

import { useForm } from 'react-hook-form'
import { useModal } from '@/hooks'
import { cls, getRandomColor } from '@/utils'
import { usePathname } from 'next/navigation'
import Input from '../Input/Input'
import LinkItem from '../LinkItem/LinkItem'
import { ADD_LINK_TEXT, URL_INPUT_VALIDATION_TEXT } from './constants'
import useCreateLink from './hooks/useCreateLink'

export interface Link {
  id: number
  title: string
  url: string
  tag: string
  readUsers: { id: string; profile: string }[]
  likes: number
}

export interface LinkListProps {
  links: Link[]
  read?: boolean
  summary?: boolean
  edit?: boolean
  type?: 'list' | 'card'
}

export interface CreateLinkFormValue {
  url: string
  title: string
  tag: string
}

const LinkList = ({
  links,
  read = false,
  summary = false,
  edit = false,
  type = 'list',
}: LinkListProps) => {
  const path = usePathname()
  const spaceId = Number(path.split('/')[2])
  const { Modal, isOpen, modalOpen, modalClose } = useModal()
  const { register, getValues, setValue, handleSubmit, reset } =
    useForm<CreateLinkFormValue>({
      defaultValues: {
        url: '',
        title: '',
        tag: '',
      },
    })
  const {
    isUrlCheck,
    setIsUrlCheck,
    isUrlError,
    handleGetMeta,
    handleCreateLink,
  } = useCreateLink(setValue)

  return (
    <>
      <div
        className={cls(
          type === 'list' ? 'flex flex-col' : 'grid grid-cols-2 gap-2',
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
        {links.map((link) => (
          <LinkItem
            key={link.id}
            title={link.title}
            url={link.url}
            tag={link.tag}
            readUsers={link.readUsers}
            likes={link.likes}
            read={read}
            summary={summary}
            edit={edit}
            type={type}
          />
        ))}
      </div>
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
          onSubmit={handleSubmit(async ({ url, title, tag }) => {
            await handleCreateLink({
              spaceId,
              url,
              title,
              tag,
              color: getRandomColor(),
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
              {...register('tag')}
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default LinkList
