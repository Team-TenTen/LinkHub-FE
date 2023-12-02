import { UserController } from '@/components'
import { fetchGetUserProfile } from '@/services/user/profile/profile'
import { Metadata } from 'next'

type Props = {
  params: { userId: number }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const userId = params.userId
  const user = await fetchGetUserProfile({ memberId: userId })

  return {
    title: user.nickname,
    openGraph: {
      title: `${user.nickname} • LinkHub`,
    },
  }
}

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return <UserController>{children}</UserController>
}

export default UserLayout
