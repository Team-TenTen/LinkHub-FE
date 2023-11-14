'use client'

import { useModal } from '@/hooks'
import { cls } from '@/utils'
import Input from '../Input/Input'
import LinkItem from '../LinkItem/LinkItem'
import { ADD_LINK_TEXT } from './constants'

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

const LinkList = ({
  links,
  read = false,
  summary = false,
  edit = false,
  type = 'list',
}: LinkListProps) => {
  const { Modal, isOpen, modalOpen, modalClose } = useModal()

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
          onClose={modalClose}>
          <div className="flex flex-col gap-2">
            <Input
              label="URl"
              inputButton={true}
            />
            <Input
              label="이름"
              disabled={true}
            />
            <Input label="태그" />
          </div>
        </Modal>
      )}
    </>
  )
}

export default LinkList
