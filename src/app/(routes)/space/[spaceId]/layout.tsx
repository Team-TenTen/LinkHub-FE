import { fetchGetSpace } from '@/services/space/space'
import { Metadata } from 'next'

type SpaceLayoutProps = {
  params: { spaceId: number }
}

export async function generateMetadata({
  params,
}: SpaceLayoutProps): Promise<Metadata> {
  const spaceId = params.spaceId
  const space = await fetchGetSpace({ spaceId })

  return {
    title: space.spaceName,
    description: space.description,
    openGraph: {
      title: `${space.spaceName} • LinkHub`,
      description: space.description,
      images: space.spaceImagePath,
    },
  }
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return children
}

export default layout
