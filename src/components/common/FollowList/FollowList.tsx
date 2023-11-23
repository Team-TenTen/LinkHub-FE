import { Dispatch, Fragment, SetStateAction } from 'react'
import useFollowQuery from '@/components/common/FollowList/hooks/useFollowQuery'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { FetchGetFollowProps } from '@/services/user/follow/route'
import User from '../User/User'

export interface FollowListProps {
  memberId?: number
  fetchFn: ({ pageNumber, pageSize }: FetchGetFollowProps) => Promise<any>
  myId?: number
  type?: string
  followingCount?: number
  setFollowingCount?: Dispatch<SetStateAction<number | undefined>>
}

export interface FollowUserProps {
  isFollowing: boolean
  memberId?: number
  nickname: string
  profileImagePath: string
  aboutMe: string
}

const FollowList = ({
  memberId,
  fetchFn,
  myId,
  type,
  followingCount,
  setFollowingCount,
}: FollowListProps) => {
  const { followList, fetchNextPage, hasNextPage } = useFollowQuery({
    memberId,
    fetchFn,
    type,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return (
    <ul className="flex flex-col gap-y-2">
      {followList?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.responses?.map((user: FollowUserProps) => (
            <li key={user.memberId}>
              <User
                memberId={user.memberId}
                nickname={user.nickname}
                profileImagePath={user.profileImagePath}
                aboutMe={user.aboutMe}
                isFollowing={user.isFollowing}
                isAuth={myId === user.memberId}
                followingCount={followingCount}
                myId={myId}
                profileId={memberId}
                setFollowingCount={setFollowingCount}
              />
            </li>
          ))}
        </Fragment>
      ))}
      <div ref={target}></div>
    </ul>
  )
}

export default FollowList
