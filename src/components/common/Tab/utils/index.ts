import { Space } from '@/types'
import { TabList } from '../hooks/useTab'

export const getCurrentTabList = (spaceData: Space): TabList[] => {
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
