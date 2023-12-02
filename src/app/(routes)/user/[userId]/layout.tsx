import { UserController } from '@/components'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return <UserController>{children}</UserController>
}

export default UserLayout
