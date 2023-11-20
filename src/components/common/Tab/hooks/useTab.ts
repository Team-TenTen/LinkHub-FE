import { useMemo } from 'react'
import { useAuth } from '@/lib/contexts/AuthProvider'
import { SpaceDetailResBody, UserData } from '@/types'
import { usePathname } from 'next/navigation'
import { NOTIFICATION_TAB_LIST } from '../constants'
import {
  getCurrentSpaceTabList,
  getCurrentUserTabList,
  getPathname,
} from '../utils'

export interface UseTabProps {
  type: 'space' | 'notification' | 'user'
  space?: SpaceDetailResBody
  userData?: UserData
}

export interface TabList {
  text: string
  content: string
  dest: string
}

export interface useTabReturn {
  currentTab: string
  tabList: TabList[]
}

const useTab = ({ type, space, userData }: UseTabProps): useTabReturn => {
  const { currentUser } = useAuth()
  const cachedCurrentUser = useMemo(() => currentUser, [currentUser])

  const pathname = usePathname()
  if (space && type === 'space') {
    const currentTab = getPathname({ path: pathname, n: 3, defaultPath: type })
    const tabList = getCurrentSpaceTabList(space, cachedCurrentUser?.memberId!)
    return { currentTab, tabList }
  }

  if (type === 'notification') {
    const currentTab = getPathname({ path: pathname, n: 2, defaultPath: type })
    const tabList = NOTIFICATION_TAB_LIST

    return { currentTab, tabList }
  }

  if (type === 'user') {
    const currentTab = getPathname({ path: pathname, n: 3, defaultPath: type })
    const tabList = getCurrentUserTabList(userData!)
    return { currentTab, tabList }
  }

  return {
    currentTab: '',
    tabList: [{ text: '', content: '', dest: '' }],
  }
}

export default useTab
