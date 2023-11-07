'use client'

import { Dropdown, LinkList, SpaceMemberList } from '@/components'
import Button from '@/components/common/Button/Button'
import { MORE_TEXT } from '@/components/common/LinkList/constants'
import useViewLink from '@/components/common/LinkList/hooks/useViewLink'
import Space from '@/components/common/Space/Space'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useTab from '@/components/common/Tab/hooks/useTab'
import useToggle from '@/components/common/Toggle/hooks/useToggle'
import { MIN_TAB_NUMBER } from '@/constants'
import { mock_LinkData, mock_memberData, mock_spaceData } from '@/data'
import { cls } from '@/utils'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  EyeIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'

const SpacePage = () => {
  const spaceData = mock_spaceData
  const [isEdit, editToggle] = useToggle(false)
  const [view, handleChangeList, handleChangeCard] = useViewLink()
  const { currentTab, tabList } = useTab(spaceData)

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
      {tabList.length > MIN_TAB_NUMBER && (
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
            {MORE_TEXT}
          </Button>
        </div>
        <SpaceMemberList members={mock_memberData} />
      </div>
    </>
  )
}

export default SpacePage
