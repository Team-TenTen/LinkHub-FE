import { registerUser } from '@/services/auth'
import Cookies from 'js-cookie'

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
  const registerLinkHub = async (data: RegisterReqBody, imageFile?: File) => {
    data.socialId = Cookies.get('Social-Id') || ''
    data.provider = Cookies.get('Provider') || ''
    const { jwt } = await registerUser(data, imageFile)
    Cookies.remove('Social-Id')
    Cookies.remove('Provider')

    return { jwt }
  }

  return { registerLinkHub }
}

export { useRegister }
