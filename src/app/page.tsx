'use client'

import { CategoryList, Dropdown, LinkItem, Spinner } from '@/components'
import FloatingButton from '@/components/FloatingButton/FloatingButton'
import { ChipColors } from '@/components/common/Chip/Chip'
import DeferredComponent from '@/components/common/DeferedComponent/DeferedComponent'
import MainSpaceList from '@/components/common/MainSpaceList/MainSpaceList'
import { useCategoryParam, useSortParam } from '@/hooks'
import useGetPopularLinks from '@/hooks/useGetPopularLinks'
import { fetchGetSpaces } from '@/services/space/spaces'
import { PopularLinkResBody } from '@/types'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Home() {
  const { links, isPopularLinksLoading } = useGetPopularLinks()
  const { sort, sortIndex, handleSortChange } = useSortParam('space')
  const { category, categoryIndex, handleCategoryChange } =
    useCategoryParam('all')

  return isPopularLinksLoading ? (
    <DeferredComponent>
      <Spinner />
    </DeferredComponent>
  ) : (
    <>
      <section className="px-4 pb-8">
        <h2 className="py-4 font-bold text-gray9">인기있는 링크</h2>
        {links && (
          <Swiper
            slidesPerView={2.2}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
              743: {
                slidesPerView: 3.2,
              },
              1099: {
                slidesPerView: 4.2,
              },
              1455: {
                slidesPerView: 5.2,
              },
              1811: {
                slidesPerView: 6.2,
              },
              2152: {
                slidesPerView: 7.2,
              },

              2324: {
                slidesPerView: 8.2,
              },
            }}
            spaceBetween={16}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            className="mySwiper">
            {links.map((link: PopularLinkResBody) => (
              <SwiperSlide key={link.linkId}>
                <LinkItem
                  linkId={link.linkId}
                  title={link.title}
                  url={link.url}
                  tagName={link.tagName}
                  tagColor={link.tagColor as ChipColors}
                  isInitLiked={link.isLiked}
                  likeInitCount={link.likeCount}
                  type="card"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
      <section>
        <div className="sticky top-[53px] z-40 bg-bgColor">
          <div className="flex items-center justify-between px-4 pt-2">
            <h2 className="font-bold text-gray9">스페이스 모음</h2>
            <Dropdown
              type="space"
              placement="right"
              defaultIndex={sortIndex}
              onChange={handleSortChange}
            />
          </div>
          <CategoryList
            type="all"
            defaultIndex={categoryIndex}
            onChange={handleCategoryChange}
          />
        </div>
        <MainSpaceList
          queryKey="main"
          sort={sort ?? ''}
          category={category ?? ''}
          fetchFn={fetchGetSpaces}
        />
      </section>
      <FloatingButton />
    </>
  )
}
