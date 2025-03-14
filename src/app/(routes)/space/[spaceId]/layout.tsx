import { getSpace } from '@/app/apis/space.api'
import { Metadata } from 'next'

type SpaceLayoutProps = {
  params: { spaceId: number }
}

export async function generateMetadata({
  params: { spaceId },
}: SpaceLayoutProps): Promise<Metadata> {
  const space = await getSpace({ spaceId })

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
