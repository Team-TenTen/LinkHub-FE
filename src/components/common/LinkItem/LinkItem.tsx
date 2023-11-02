import { cls } from '@/utils'
import {
  DocumentTextIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Avatar from '../Avatar/Avatar'
import AvatarGroup from '../AvatarGroup/AvatarGroup'
import Button from '../Button/Button'
import Chip from '../Chip/Chip'

export interface User {
  id: string
  profile: string
}

export interface LinkItemProps {
  title: string
  tag: string
  readUsers: User[]
  likes: number
  read?: boolean
  summary?: boolean
  edit?: boolean
  type?: 'list' | 'card'
}

const LinkItem = ({
  title,
  tag,
  readUsers,
  likes,
  read = false,
  summary = false,
  edit = false,
  type = 'list',
}: LinkItemProps) => {
  return (
    <>
      {type === 'list' ? (
        <div className="flex justify-between gap-2 border-t border-slate3 px-3 py-2">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray9">
            {title}
          </div>
          <div className="flex shrink-0 gap-1.5">
            {tag && (
              <div>
                <Chip label={tag} />
              </div>
            )}
            {readUsers.length > 0 && read && !edit ? (
              <AvatarGroup>
                {readUsers?.map((readUser) => (
                  <Avatar
                    key={readUser.id}
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
                <Button>
                  <TrashIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
                <Button>
                  <PencilSquareIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
              </>
            ) : (
              <Button className="button button-round button-white">
                {<HeartIcon className="h-4 w-4 text-slate6" />}
                <div>{likes}</div>
              </Button>
            )}
            {summary && !edit && (
              <Button>
                <DocumentTextIcon className="h-6 w-6 p-0.5 text-slate6" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-56 flex-col gap-1 rounded-md border px-3 py-2.5">
          <div
            className={cls(
              'block overflow-hidden text-ellipsis  text-sm font-medium text-gray9',
              tag ? 'whitespace-nowrap' : 'text-overflow-2 mb-[9.5px]',
            )}>
            {title}
          </div>
          {tag && (
            <div>
              <Chip label={tag} />
            </div>
          )}
          <div className="flex items-center justify-between">
            {readUsers.length > 0 && read && !edit ? (
              <AvatarGroup>
                {readUsers?.map((readUser) => (
                  <Avatar
                    key={readUser.id}
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
            <div className={cls('flex gap-1')}>
              {edit ? (
                <>
                  <Button>
                    <TrashIcon className="h-6 w-6 p-0.5 text-slate6" />
                  </Button>
                  <Button>
                    <PencilSquareIcon className="h-6 w-6 p-0.5 text-slate6" />
                  </Button>
                </>
              ) : (
                <Button className="button button-round button-white">
                  {<HeartIcon className="h-4 w-4 text-slate6" />}
                  <div>{likes}</div>
                </Button>
              )}
              {summary && !edit && (
                <Button>
                  <DocumentTextIcon className="h-6 w-6 p-0.5 text-slate6" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LinkItem
