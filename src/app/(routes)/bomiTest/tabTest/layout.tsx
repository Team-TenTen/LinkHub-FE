'use client'

import React, { useState } from 'react'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'

const TabTestPage = ({ children }: { children: React.ReactNode }) => {
  const [currentTab, setCurrentTab] = useState(0)

  const tabArr = [
    { text: '스페이스', content: '스페이스 페이지', dest: '/bomiTest/tabTest' },
    { text: '댓글', content: '댓글 페이지', dest: '/bomiTest/tabTest/comment' },
    { text: '설정', content: '설정 페이지', dest: '/bomiTest/tabTest/setting' },
  ]

  return (
    <div className="m-2">
      <Tab>
        {tabArr.map((tabItem, index) => (
          <TabItem
            key={index}
            active={currentTab === index ? true : false}
            dest={tabItem.dest}
            text={tabItem.text}
          />
        ))}
      </Tab>
      {children}
    </div>
  )
}

export default TabTestPage
