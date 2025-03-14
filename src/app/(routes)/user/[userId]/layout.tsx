import { getMemberProfile } from '@/app/apis/member.api'
import { ProfileTap } from '@/components'
import { Metadata } from 'next'

export type UserLayoutProps = {
  params: { userId: number }
}

export async function generateMetadata({
  params: { userId },
}: UserLayoutProps): Promise<Metadata> {
  const user = await getMemberProfile({ memberId: userId })

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
      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-[1200px] flex-col">{children}</div>
      </div>
    </>
  )
}

export default UserLayout
