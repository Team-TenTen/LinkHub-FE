import { Space } from '@/types'
import { usePathname } from 'next/navigation'
import { getCurrentTabList } from '../utils'

export interface TabList {
  text: string
  content: string
  dest: string
}

const useTab = (
  spaceData: Space,
): {
  currentTab: string
  tabList: TabList[]
} => {
  const currentTab = usePathname().split('/')[3] ?? 'space'
  const tabList = getCurrentTabList(spaceData)

  return { currentTab, tabList }
}

export default useTab
