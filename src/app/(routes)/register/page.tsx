import UserInfoForm from '@/components/UserInfoForm/UserInfoForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '회원가입',
}

const RegisterPage = () => {
  return (
    <div>
      <UserInfoForm formType="Register" />
    </div>
  )
}

export default RegisterPage
