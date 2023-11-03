'use client'

import { useState } from 'react'
import { Dropdown, LinkList, SpaceMemberList } from '@/components'
import Button from '@/components/common/Button/Button'
import Space from '@/components/common/Space/Space'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import { mock_LinkData, mock_memberData } from '@/data'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  EyeIcon,
  ListBulletIcon,
  PlusSmallIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'

const SpacePage = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const [view, setView] = useState<'list' | 'card' | undefined>('list')
  const [isEdit, setIsEdit] = useState(false)
  const user = 'dudwns'
  const spaceObj = {
    userName: 'dudwns',
    spaceId: '123',
    spaceImage: '/TestImage.svg',
    spaceName: '강남역 맛집 리스트 모음 스페이스',
    description: '내 기준 강남역에서 맛있는 맛집 링크 모음집',
    category: '생활•노하우•쇼핑',
    favorite: 60,
    scrap: 40,
    comment: true,
  }

  const tabArr = [
    { text: '스페이스', content: '스페이스 페이지', dest: '/space/123' },
    { text: '댓글', content: '댓글 페이지', dest: '/space/123/comment' },
    { text: '설정', content: '설정 페이지', dest: '/space/123/setting' },
  ]

  const handleEditSpace = () => {
    setIsEdit(true)
  }
  return (
    <>
      <Space
        type="Header"
        userName={spaceObj.userName}
        spaceName={spaceObj.spaceName}
        spaceImage={spaceObj.spaceImage}
        description={spaceObj.description}
        category={spaceObj.category}
        scrap={spaceObj.scrap}
        favorite={spaceObj.favorite}
      />
      {user === spaceObj.userName && (
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
            onClick={() => setIsEdit((prev) => !prev)}>
            {isEdit ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <PencilSquareIcon className="h-5 w-5" />
            )}
          </Button>
          <div>
            <Button
              className="rounded-md rounded-r-none border border-slate3 bg-emerald5 p-1.5 text-sm font-bold text-white"
              onClick={() => setView('list')}>
              <ListBulletIcon className="h-5 w-5" />
            </Button>
            <Button
              className="rounded-md rounded-l-none border border-slate3  bg-slate4 p-1.5 text-sm font-bold text-white"
              onClick={() => setView('card')}>
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
    </>
  )
}

export default SpacePage
