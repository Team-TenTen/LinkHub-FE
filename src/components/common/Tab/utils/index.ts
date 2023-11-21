import { useCurrentUser } from '@/hooks/useCurrentUser'
import {
  Space,
  SpaceDetailResBody,
  UserData,
  UserProfileResBody,
} from '@/types'
import { TabList } from '../hooks/useTab'

export interface GetPathnameProps {
  path: string
  n: number
  defaultPath: string
}

export const getPathname = ({ path, n, defaultPath }: GetPathnameProps) => {
  const currentTab = path.split('/')[n] ?? defaultPath
  return currentTab
}

export const getCurrentSpaceTabList = (
  space: SpaceDetailResBody,
): TabList[] => {
  const { isOwner, spaceId, isComment } = space
  const tabList = [
    { text: '스페이스', content: 'space', dest: `/space/${spaceId}` },
  ]

  if (isComment) {
    tabList.push({
      text: '댓글',
      content: 'comment',
      dest: `/space/${spaceId}/comment`,
    })
  }
  if (isOwner) {
    tabList.push({
      text: '설정',
      content: 'setting',
      dest: `/space/${spaceId}/setting`,
    })
  }

  return tabList
}

export const getCurrentUserTabList = (
  userId?: number,
  myId?: number,
): TabList[] => {
  const tabList = [
    { text: '프로필', content: 'user', dest: `/user/${userId}` },
    { text: '스페이스', content: 'space', dest: `/user/${userId}/space` },
  ]

  if (userId === myId) {
    tabList.push({
      text: '즐겨찾기',
      content: 'favorite',
      dest: `/user/${userId}/favorite`,
    })
  }

  return tabList
}
