import React from 'react'
import { LinkItem } from '@/components'
import { mock_LinkData } from '@/data'

const MainLinkList = () => {
  const links = mock_LinkData.slice(0, 5)

  return (
    <section className="px-4 pb-10">
      <h2 className="py-4 font-bold text-gray9">인기있는 링크</h2>
      {links.map((link) => (
        <LinkItem
          linkId={link.id}
          title={link.title}
          url={link.url}
          tag={link.tag}
          isInitLiked={link.isLiked}
          likeInitCount={link.likeCount}
          key={link.id}
        />
      ))}
    </section>
  )
}

export default MainLinkList
