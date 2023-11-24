import MainLinkList from '@/components/Main/LinkList/MainLinkList'
import SpaceCategory from '@/components/Main/SpaceCategory/SpaceCategory'
import HydrateSpaceList from '@/components/SpaceList/HydrateSpaceList'

export default function Home() {
  return (
    <>
      <MainLinkList />
      <section>
        <SpaceCategory />
        <HydrateSpaceList />
      </section>
    </>
  )
}
