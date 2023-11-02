import { cls } from '@/utils'
import LinkItem from '../LinkItem/LinkItem'
import { ADD_LINK } from './constants'

export interface LinkProps {
  id: number
  title: string
  tag: string
  readUsers: { id: string; profile: string }[]
  likes: number
}

export interface LinkListProps {
  links: LinkProps[]
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
  return (
    <div
      className={cls(
        type === 'list'
          ? 'flex flex-col border-slate3 last:border-b'
          : 'grid grid-cols-2 gap-2',
      )}>
      <button
        className={cls(
          'flex bg-slate-100 px-3 py-2.5 text-sm font-medium text-gray9 dark:bg-slate-800',
          type === 'list'
            ? 'border-t border-slate3'
            : 'items-center justify-center rounded-md border',
        )}>
        <div className="text-gray9">{ADD_LINK}</div>
      </button>
      {links.map((link) => (
        <LinkItem
          key={link.id}
          title={link.title}
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
  )
}

export default LinkList
