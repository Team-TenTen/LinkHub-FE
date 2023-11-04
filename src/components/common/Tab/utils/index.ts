import { Space } from '@/types'
import { TabList } from '../hooks/useTab'

export const getCurrentTabList = (spaceData: Space): TabList[] => {
  const myName = 'dudwns'
  const { userName, spaceId, comment } = spaceData
  const tabList = [
    { text: '스페이스', content: '스페이스 페이지', dest: `/space/${spaceId}` },
  ]

  if (comment) {
    tabList.push({
      text: '댓글',
      content: '댓글 페이지',
      dest: `/space/${spaceId}/comment`,
    })
  }
  if (userName === myName) {
    tabList.push({
      text: '설정',
      content: '설정 페이지',
      dest: `/space/${spaceId}/setting`,
    })
  }

  return tabList
}
