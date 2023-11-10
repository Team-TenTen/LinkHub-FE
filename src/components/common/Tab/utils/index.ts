import { Space, UserData } from '@/types'
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

export const getCurrentSpaceTabList = (spaceData: Space): TabList[] => {
  const myName = 'dudwns' // TODO: 실제 유저로 변경
  const { userName, spaceId, comment } = spaceData
  const tabList = [
    { text: '스페이스', content: 'space', dest: `/space/${spaceId}` },
  ]

  if (comment) {
    tabList.push({
      text: '댓글',
      content: 'comment',
      dest: `/space/${spaceId}/comment`,
    })
  }
  if (userName === myName) {
    tabList.push({
      text: '설정',
      content: 'setting',
      dest: `/space/${spaceId}/setting`,
    })
  }

  return tabList
}

export const getCurrentUserTabList = (userData: UserData): TabList[] => {
  const myName = 'dudwns' // TODO: 실제 유저로 변경
  const { id, name } = userData
  const tabList = [
    { text: '프로필', content: 'profile', dest: `/user/${id}` },
    { text: '스페이스', content: 'space', dest: `/user/${id}/space` },
  ]

  if (name === myName) {
    tabList.push({
      text: '즐겨찾기',
      content: 'favorite',
      dest: `/space/${id}/favorite`,
    })
  }

  return tabList
}
