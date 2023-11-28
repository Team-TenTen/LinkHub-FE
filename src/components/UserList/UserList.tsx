import { Fragment } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { SearchUserReqBody } from '@/types'
import User from '../common/User/User'
import useUsersQuery from './hooks/useUsersQuery'

export interface UserListProps {
  keyword: string
  fetchFn: ({ pageNumber, pageSize }: SearchUserReqBody) => Promise<any>
}

export interface UserItem {
  isFollowing: boolean
  memberId: number
  nickname: string
  MemberImagePath: string
  aboutMe: string
}

const UserList = ({ keyword, fetchFn }: UserListProps) => {
  const { currentUser } = useCurrentUser()
  const { users, fetchNextPage, hasNextPage } = useUsersQuery({
    keyword,
    fetchFn,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return (
    <ul className="flex flex-col gap-y-2">
      {users?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.responses?.map((user: UserItem) => (
            <li key={user.memberId}>
              <User
                memberId={user.memberId}
                nickname={user.nickname}
                profileImagePath={user.MemberImagePath}
                aboutMe={user.aboutMe}
                isFollowing={user.isFollowing}
                isAuth={currentUser?.memberId === user.memberId}
                myId={currentUser?.memberId}
              />
            </li>
          ))}
        </Fragment>
      ))}
      <div ref={target}></div>
    </ul>
  )
}

export default UserList
