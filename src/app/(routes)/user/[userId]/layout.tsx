import { ProfileTap } from '@/components'
import { fetchGetUserProfile } from '@/services/user/profile/profile'
import { Metadata } from 'next'

type Props = {
  params: { userId: number }
}

export async function getProfile(userId: number) {
  const response = await fetchGetUserProfile({ memberId: userId })
  return response
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const userId = params.userId
  const user = await getProfile(userId)

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
