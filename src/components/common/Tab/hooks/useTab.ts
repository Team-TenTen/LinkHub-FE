import { useCallback, useState } from 'react'
import { Space } from '@/types'
import { getCurrentTabList } from '../utils'

export interface TabList {
  text: string
  content: string
  dest: string
}

const useTab = (
  spaceData: Space,
): {
  currentTab: number
  handleChangeTab: (index: number) => void
  tabList: TabList[]
} => {
  const [currentTab, setCurrentTab] = useState(0)
  const handleChangeTab = useCallback(
    (index: number) => setCurrentTab(index),
    [],
  )
  const tabList = getCurrentTabList(spaceData)
  return { currentTab, handleChangeTab, tabList }
}

export default useTab
