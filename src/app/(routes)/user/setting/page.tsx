import UserInfoForm from '@/components/UserInfoForm/UserInfoForm'
import { mock_userData } from '@/data'

const UserSettingPage = () => {
  const userData = mock_userData

  return (
    <div>
      <UserInfoForm
        userData={userData}
        formType="Setting"
      />
    </div>
  )
}

export default UserSettingPage
