import { cls } from '@/utils'
import LinkItem from '../LinkItem/LinkItem'

interface LinkListProps {
  links: {
    id: number
    title: string
    tag: string
    readUsers: { id: string; profile: string }[]
    likes: number
  }[] // 'TODO Link type으로 변환'
  read: boolean
  summary: boolean
  edit: boolean
  type?: 'list' | 'card'
}

const LinkList = ({
  type = 'list',
  links,
  read,
  summary,
  edit,
}: LinkListProps) => {
  return (
    <div
      className={cls(
        type === 'card'
          ? 'grid grid-cols-2 gap-2'
          : 'flex flex-col border-slate3 last:border-b',
      )}>
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
