'use client'

import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useTab from '@/components/common/Tab/hooks/useTab'

const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentTab, tabList } = useTab({ type: 'notification' })

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
      <div className="p-4">{children}</div>
    </>
  )
}

export default NotificationLayout
