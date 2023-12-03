'use client'

import React from 'react'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useTab from '@/components/common/Tab/hooks/useTab'
import useGetProfile from '@/hooks/useGetProfile'

const UserController = ({ children }: { children: React.ReactNode }) => {
  const { user, myId, isProfileLoading } = useGetProfile()
  const { currentTab, tabList } = useTab({
    type: 'user',
    userId: user?.memberId,
    myId,
  })

  return (
    <>
      {!isProfileLoading && (
        <Tab>
          {tabList.map((tabItem) => (
            <TabItem
              active={currentTab === tabItem.content}
              text={tabItem.text}
              dest={tabItem.dest}
              key={tabItem.content}
            />
          ))}
        </Tab>
      )}
      {children}
    </>
  )
}

export default UserController
