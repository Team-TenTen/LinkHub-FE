'use client'

import { Dropdown, LinkList, SpaceMemberList, Spinner } from '@/components'
import Button from '@/components/common/Button/Button'
import useViewLink from '@/components/common/LinkList/hooks/useViewLink'
import Space from '@/components/common/Space/Space'
import useGetSpace from '@/components/common/Space/hooks/useGetSpace'
import useGetTags from '@/components/common/Space/hooks/useGetTags'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useTab from '@/components/common/Tab/hooks/useTab'
import useToggle from '@/components/common/Toggle/hooks/useToggle'
import { CATEGORIES_RENDER, MIN_TAB_NUMBER } from '@/constants'
import { useSortParam } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import useTagParam from '@/hooks/useTagParam'
import { fetchGetLinks } from '@/services/link/link'
import { cls } from '@/utils'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  EyeIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'

const SpacePage = ({ params }: { params: { spaceId: number } }) => {
  const { currentUser } = useCurrentUser()
  const { space, isSpaceLoading } = useGetSpace()
  const [isEdit, editToggle] = useToggle(false)
  const [view, handleChangeList, handleChangeCard] = useViewLink()
  const { currentTab, tabList } = useTab({ type: 'space', space })
  const { sort, sortIndex, handleSortChange } = useSortParam('link')
  const { tags, refetchTags, isTagsLoading } = useGetTags({
    spaceId: space?.spaceId,
  })
  const { tag, tagIndex, handleTagChange } = useTagParam({ tags })

  return isSpaceLoading || isTagsLoading ? (
    <Spinner />
  ) : (
    <>
      {space && (
        <Space
          type="Header"
          userName={space.memberDetailInfos[0].nickname}
          spaceId={space.spaceId}
          spaceName={space.spaceName}
          spaceImage={space.spaceImagePath}
          description={space.description}
          category={CATEGORIES_RENDER[space.category]}
          scrap={space.scrapCount}
          favorite={space.favoriteCount}
          hasFavorite={space.hasFavorite}
          hasScrap={space.hasScrap}
        />
      )}
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
              tags={tags?.map((tag) => tag.name)}
              size="medium"
              placement="left"
              defaultIndex={tagIndex}
              onChange={handleTagChange}
            />
            <Dropdown
              type="link"
              size="medium"
              placement="left"
              defaultIndex={sortIndex}
              onChange={(e) => {
                handleSortChange(e)
              }}
            />
          </div>
          <div className="flex gap-2">
            {space?.isCanEdit && (
              <Button
                className="button button-white p-1.5"
                onClick={editToggle}>
                {isEdit ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <PencilSquareIcon className="h-5 w-5" />
                )}
              </Button>
            )}
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
        {space?.spaceId && (
          <LinkList
            spaceId={space?.spaceId}
            read={space?.isReadMarkEnabled}
            summary={space?.isLinkSummarizable}
            edit={isEdit}
            type={view}
            fetchFn={fetchGetLinks}
            sort={sort ?? 'created_at'}
            tagId={Number(tag) || undefined}
            tags={tags ?? []}
            isCanEdit={space.isCanEdit}
            isMember={
              !!space?.memberDetailInfos.find(
                (member) => member.memberId === currentUser?.memberId,
              )
            }
            refetchTags={refetchTags}
          />
        )}
        <SpaceMemberList
          spaceId={params.spaceId}
          members={space?.memberDetailInfos}
        />
      </div>
    </>
  )
}

export default SpacePage
