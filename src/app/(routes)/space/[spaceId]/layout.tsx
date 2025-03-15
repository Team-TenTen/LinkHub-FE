import { Metadata } from 'next'

type SpaceLayoutProps = {
  params: { spaceId: number }
}
const baseURL = process.env.NEXT_PUBLIC_API_ADDRESS

export async function generateMetadata({
  params: { spaceId },
}: SpaceLayoutProps): Promise<Metadata> {
  const space = await fetch(`${baseURL}/spaces/${spaceId}`, {
    method: 'GET',
  }).then((res) => res.json())

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
