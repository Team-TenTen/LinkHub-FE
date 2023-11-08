'use client'

import React from 'react'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useTab from '@/components/common/Tab/hooks/useTab'
import { mock_userData2 } from '@/data'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const userData = mock_userData2
  const { currentTab, tabList } = useTab({ type: 'user', userData })

  const childrenComponent = React.Children.only(children) as React.ReactElement
  return (
    <>
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
      {React.cloneElement(childrenComponent, { userData })}
    </>
  )
}

export default UserLayout
