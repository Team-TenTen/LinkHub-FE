import { ProfileTap } from '@/components'
import { fetchGetUserProfile } from '@/services/user/profile/profile'
import { Metadata } from 'next'

export type UserLayoutProps = {
  params: { userId: number }
}

export async function generateMetadata({
  params: { userId },
}: UserLayoutProps): Promise<Metadata> {
  const user = await fetchGetUserProfile({ memberId: userId })

  return {
    title: user.nickname,
    openGraph: {
      title: `${user.nickname} • LinkHub`,
    },
  }
}

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileTap />
      {children}
    </>
  )
}

export default UserLayout
