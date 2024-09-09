'use client'

import useGetPopularLinks from '@/components/PopularLinkList/hooks/useGetPopularLinks'
import { ChipColors } from '@/components/common/Chip/Chip'
import LinkItem from '@/components/common/LinkItem/LinkItem'
import { PopularLinkResBody } from '@/types'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const PopularLinkList = () => {
  const { data } = useGetPopularLinks()
  return (
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
      {data?.responses.map((link: PopularLinkResBody) => (
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
  )
}

export default PopularLinkList
