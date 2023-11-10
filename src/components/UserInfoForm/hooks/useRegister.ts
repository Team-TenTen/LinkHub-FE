interface RegisterReqBody {
  nickName: string
  introduce: string
  email: string
  category: string
  newsLetter: boolean
}

const useRegister = () => {
  const registerLinkHub = (data: RegisterReqBody) => {
    console.log('회원가입 로직', data)
  }

  return { registerLinkHub }
}

export { useRegister }
