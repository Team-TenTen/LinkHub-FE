'use client'

import { useState } from 'react'
import { Dropdown, LinkList, SpaceMemberList } from '@/components'
import Button from '@/components/common/Button/Button'
import useViewLink from '@/components/common/LinkList/hooks/useViewLink'
import Space from '@/components/common/Space/Space'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useToggle from '@/components/common/Toggle/hooks/useToggle'
import { mock_LinkData, mock_memberData, mock_spaceData } from '@/data'
import { cls } from '@/utils'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  EyeIcon,
  ListBulletIcon,
  PlusSmallIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'

const SpacePage = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const [view, handleChangeList, handleChangeCard] = useViewLink()
  const [isEdit, editToggle] = useToggle(false)
  const user = 'dudwns'
  const spaceData = mock_spaceData

  const tabArr = [
    { text: '스페이스', content: '스페이스 페이지', dest: '/space/123' },
    { text: '댓글', content: '댓글 페이지', dest: '/space/123/comment' },
    { text: '설정', content: '설정 페이지', dest: '/space/123/setting' },
  ]

  return (
    <>
      <Space
        type="Header"
        userName={spaceData.userName}
        spaceName={spaceData.spaceName}
        spaceImage={spaceData.spaceImage}
        description={spaceData.description}
        category={spaceData.category}
        scrap={spaceData.scrap}
        favorite={spaceData.favorite}
      />
      {user === spaceData.userName && (
        <Tab>
          {tabArr.map((tabItem, index) => (
            <TabItem
              key={index}
              active={currentTab === index ? true : false}
              dest={tabItem.dest}
              text={tabItem.text}
              onClick={() => setCurrentTab(index)}
            />
          ))}
        </Tab>
      )}
      <div className="flex flex-col px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-1.5">
            <Dropdown
              type="tag"
              tags={['JavaScript', 'TypeScript', 'Java', 'Python']}
              size="medium"
              placement="left"
              onChange={(e) => {
                console.log(e?.currentTarget.value)
              }}
            />
            <Dropdown
              type="space"
              size="medium"
              placement="left"
              onChange={(e) => {
                console.log(e?.currentTarget.value)
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="button button-white p-1.5"
              onClick={editToggle}>
              {isEdit ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <PencilSquareIcon className="h-5 w-5" />
              )}
            </Button>
            <div>
              <Button
                className={cls(
                  'rounded-md rounded-r-none border border-slate3 p-1.5 text-sm font-bold text-white',
                  view === 'list' ? 'bg-emerald5' : 'bg-slate4',
                )}
                onClick={handleChangeList}>
                <ListBulletIcon className="h-5 w-5" />
              </Button>
              <Button
                className={cls(
                  'rounded-md rounded-l-none border border-l-0 border-slate3 p-1.5 text-sm font-bold text-white',
                  view === 'card' ? 'bg-emerald5' : 'bg-slate4',
                )}
                onClick={handleChangeCard}>
                <Squares2X2Icon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <LinkList
          links={mock_LinkData}
          read={true}
          summary={true}
          edit={isEdit}
          type={view}
        />
        <div className="flex justify-center py-2">
          <Button className="button button-round button-white">
            <PlusSmallIcon className="h-4 w-4" /> 더보기
          </Button>
        </div>
        <SpaceMemberList members={mock_memberData} />
      </div>
    </>
  )
}

export default SpacePage
