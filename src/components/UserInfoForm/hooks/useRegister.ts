import { notify } from '@/components/common/Toast/Toast'
import { registerUser } from '@/services/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export interface RegisterReqBody {
  socialId: string
  provider: string
  nickname: string
  aboutMe: string
  newsEmail: string
  favoriteCategory: string
  isSubscribed: boolean
}

const useRegister = () => {
  const router = useRouter()
  const registerLinkHub = async (data: RegisterReqBody, imageFile?: File) => {
    if (Cookies.get('Social-Id') && Cookies.get('Provider')) {
      data.socialId = Cookies.get('Social-Id') || ''
      data.provider = Cookies.get('Provider') || ''
      const { jwt } = await registerUser(data, imageFile)
      Cookies.remove('Social-Id')
      Cookies.remove('Provider')

      return { jwt }
    } else {
      router.replace('/login')
      notify('warning', '5분이 지나 세션이 만료되었습니다. 다시 시도해주세요.')
    }
  }

  return { registerLinkHub }
}

export { useRegister }
