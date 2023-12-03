import Login from '@/components/Login/Login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인',
}

const LoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginPage
