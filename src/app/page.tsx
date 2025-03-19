import HydratePopularLinkList from '@/components/PopularLinkList/HydratePopularLinkList'
import FloatingBtnController from '@/components/common/MainSpaceList/FloatingBtnController'
import MainSpaceHeader from '@/components/common/MainSpaceList/MainSpaceHeader'
import SpaceListController from '@/components/common/MainSpaceList/SpaceListController'

export default function Home() {
  return (
    <>
      <section className="px-4 pb-8">
        <h2 className="py-4 font-bold text-gray9">인기있는 링크</h2>
        <div className="min-h-[101.5px]">
          <HydratePopularLinkList />
        </div>
      </section>
      <section>
        <MainSpaceHeader />
        <div>배포 반영 테스트</div>
        <SpaceListController />
      </section>
      <FloatingBtnController />
    </>
  )
}
