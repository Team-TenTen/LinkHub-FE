import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Avatar } from '..'
import Button from '../common/Button/Button'

export interface CommentProps {
  commentId: string
  user: { id: string; name: string; profile: string }
  comment: string
  date: Date
  auth?: boolean
  firstDepth?: boolean
  replyCount?: number
  onEdit?: (commentId: string) => void
  onDelete?: (commentId: string) => void
  onOpen?: (commentId: string) => void
  onReply?: (commentId: string, userName: string) => void
}

const Comment = ({
  commentId,
  user,
  comment,
  date,
  auth = false,
  firstDepth = true,
  replyCount = 0,
  onEdit,
  onDelete,
  onOpen,
  onReply,
}: CommentProps) => {
  return (
    <article className="flex gap-x-2 p-3">
      <Avatar
        src={user.profile}
        width={30}
        height={30}
        alt={user.name}
      />
      <div className="flex w-full flex-col gap-y-1">
        <div className="flex items-center justify-between">
          <Link
            href={`/user/${user.id}`}
            className="text-sm font-semibold text-gray9">
            {user.name}
          </Link>
          {auth && onEdit && onDelete && (
            <div className="flex gap-x-1.5">
              <Button
                className="p-0.5"
                onClick={() => onDelete(commentId)}>
                <TrashIcon className="h-5 w-5 text-slate6" />
              </Button>
              <Button
                className="p-0.5"
                onClick={() => onEdit(commentId)}>
                <PencilSquareIcon className="h-5 w-5 text-slate6" />
              </Button>
            </div>
          )}
        </div>
        <p className="py-1 text-sm text-gray9">{comment}</p>
        <div className="pt-1 text-xs text-gray6">
          {date.getFullYear().toString()}.{date.getMonth().toString()}.
          {date.getDate().toString()}
          {firstDepth && (
            <>
              {' • '}
              <Button
                className="font-medium"
                onClick={() => replyCount > 0 && onOpen && onOpen(commentId)}>
                {replyCount}개의 답글
              </Button>
              {' • '}
              <Button
                className="font-medium"
                onClick={() => onReply && onReply(commentId, user.name)}>
                답글 달기
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default Comment
