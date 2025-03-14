'use client'

import { Dropdown, LinkList, SpaceMemberList, Spinner } from '@/components'
import Button from '@/components/common/Button/Button'
import DeferredComponent from '@/components/common/DeferedComponent/DeferedComponent'
import useViewLink from '@/components/common/LinkList/hooks/useViewLink'
import Space from '@/components/common/Space/Space'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useTab from '@/components/common/Tab/hooks/useTab'
import useToggle from '@/components/common/Toggle/hooks/useToggle'
import { CATEGORIES_RENDER, MIN_TAB_NUMBER } from '@/constants'
import { useSortParam } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import useTagParam from '@/hooks/useTagParam'
import { fetchGetLinks } from '@/services/link/useLink'
import { useGetSpace, useGetTags } from '@/services/space/useSpace'
import { cls } from '@/utils'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  EyeIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'

const SpacePage = ({ params }: { params: { spaceId: number } }) => {
  const { currentUser } = useCurrentUser()
  const { data: space, isLoading: isSpaceLoading } = useGetSpace(params.spaceId)
  const [isEdit, editToggle] = useToggle(false)
  const [view, handleChangeList, handleChangeCard] = useViewLink()
  const { currentTab, tabList } = useTab({ type: 'space', space })
  const { sort, sortIndex, handleSortChange } = useSortParam('link')
  const { data: tags, isLoading: isTagsLoading } = useGetTags({
    spaceId: space?.spaceId,
  })
  const { tag, tagIndex, handleTagChange } = useTagParam({ tags })

  return isSpaceLoading || isTagsLoading ? (
    <DeferredComponent>
      <Spinner />
    </DeferredComponent>
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
          isVisible={space.isVisible}
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
      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-[1200px] flex-col px-4">
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
                  (member: { memberId: number }) =>
                    member.memberId === currentUser?.memberId,
                )
              }
            />
          )}
          <SpaceMemberList
            spaceId={params.spaceId}
            members={space?.memberDetailInfos}
          />
        </div>
      </div>
    </>
  )
}

export default SpacePage
