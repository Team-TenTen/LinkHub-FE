'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Avatar, CategoryList, Input } from '@/components'
import { fetchPostEmail, fetchPostEmailVerify } from '@/services/email'
import { fetchPostUserProfile } from '@/services/user/profile/profile'
import { UserProfileResBody } from '@/types'
import { cls } from '@/utils'
import { CheckIcon } from '@heroicons/react/24/solid'
import imageCompression from 'browser-image-compression'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Button from '../common/Button/Button'
import { CATEGORIES } from '../common/CategoryList/constants'
import { notify } from '../common/Toast/Toast'
import useToggle from '../common/Toggle/hooks/useToggle'
import { RegisterReqBody, useRegister } from './hooks/useRegister'

export interface EmailReqBody {
  email: string
}

export interface EmailVerifyReqBody {
  code: string
}

interface UserInfoFormProps {
  userData?: UserProfileResBody
  formType: 'Register' | 'Setting'
}

const UserInfoForm = ({ userData, formType }: UserInfoFormProps) => {
  const selectUserImage = useRef<HTMLInputElement | null>(null)
  const [thumnail, setThumnail] = useState(userData?.profileImagePath)
  const [isEmailAuthOpen, setIsEmailAuthOpen] = useState(false)
  const [checked, toggle] = useToggle(userData?.isSubscribed || false)
  const { registerLinkHub } = useRegister()
  const [imageFile, setImageFile] = useState<File>()
  const router = useRouter()
  const [isVerification, setVerification] = useState(false)

  useEffect(() => {
    setThumnail(userData?.profileImagePath)
  }, [userData?.profileImagePath])

  useEffect(() => {
    formType === 'Setting' && setVerification(true)
  }, [formType])

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?&_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/
  const nickNameRegex = /^[a-zA-Zㄱ-힣0-9]*$/

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterReqBody & EmailVerifyReqBody>({
    defaultValues: {
      nickname: userData?.nickname || '',
      aboutMe: userData?.aboutMe || '',
      newsEmail: userData?.newsEmail || '',
      favoriteCategory: userData?.favoriteCategory || '',
      isSubscribed: userData?.isSubscribed || false,
    },
  })

  const handleFileChange = async (e?: ChangeEvent<HTMLInputElement>) => {
    e?.preventDefault()

    if (e?.target.files) {
      const blob = new Blob([e.target.files[0]], {
        type: e.target.files[0].type,
      })

      const thumbNailImage = URL.createObjectURL(blob)
      setThumnail(thumbNailImage)
      const resizingBlob = await imageCompression(e?.target.files[0], {
        maxSizeMB: 0.5,
      })
      setImageFile(resizingBlob)
    }
  }

  const handleEmailInput = () => {
    setVerification(false)
    setIsEmailAuthOpen(false)
  }

  const handleEmailAuth = async (email: string) => {
    try {
      const response = await fetchPostEmail({ email })

      if (response.errorCode) {
        response.errorCode === 'M001' && setVerification(true)
        return
      }

      notify('success', '인증번호를 발송했습니다.')
      setIsEmailAuthOpen(true)
    } catch (e) {
      notify('error', '인증번호 발송에 실패했습니다.')
    }
  }

  const handleCheckAuthNum = async (code: string) => {
    try {
      const verification = await fetchPostEmailVerify({
        email: getValues('newsEmail'),
        code,
      })

      if (verification.isVerificate) {
        setVerification(verification.isVerificate)
        notify('success', '인증되었습니다.')
      } else {
        notify('error', '잘못된 인증번호 입니다.')
      }
    } catch (e) {
      notify('error', '인증에 실패했습니다.')
    }
  }

  const handleClickCheckButton = () => {
    toggle()
    setValue('isSubscribed', !getValues('isSubscribed'))
  }

  const handleRegisterLinkHub = async (
    data: RegisterReqBody & EmailVerifyReqBody,
  ) => {
    if (data.favoriteCategory === '') {
      notify('error', '카테고리를 선택해 주세요.')
    } else {
      try {
        const response = await registerLinkHub(data, imageFile)
        if (response?.jwt) {
          notify('success', '회원가입 되었습니다.')
          Cookies.set('Auth-token', response?.jwt || '')
          router.replace('/')
        }
      } catch (e) {
        notify('error', '회원가입에 실패하였습니다.')
      }
    }
  }

  const handleSettingUser = async (
    data: RegisterReqBody & EmailVerifyReqBody,
  ) => {
    try {
      userData?.memberId &&
        (await fetchPostUserProfile(userData?.memberId, data, imageFile))
      notify('success', '수정되었습니다.')
      router.back()
    } catch (e) {
      notify('error', '수정에 실패했습니다.')
    }
  }

  const handleWithdrawButton = () => {
    // Todo: 회원탈퇴 로직
    notify('info', '서비스 준비 중입니다.')
  }

  return (
    <form
      className="flex flex-col gap-3 px-4 pt-8"
      onSubmit={handleSubmit(async (data) => {
        formType === 'Register'
          ? handleRegisterLinkHub(data)
          : handleSettingUser(data)
      })}>
      <div className="flex justify-center">
        <input
          type="file"
          ref={selectUserImage}
          onChange={handleFileChange}
          hidden
          accept=".jpg, .png, .svg"
        />
        <div
          className="relative h-20 w-20"
          onClick={() => selectUserImage?.current?.click()}>
          <Avatar
            src={thumnail || '/member-default.png'}
            alt="프로필"
          />
        </div>
      </div>
      <div>
        <Input
          {...register('nickname', {
            required: '닉네임을 입력해 주세요.',
            minLength: {
              value: 2,
              message: '닉네임은 2자 이상 10자 이하로 작성해야 합니다.',
            },
            maxLength: {
              value: 10,
              message: '닉네임은 2자 이상 10자 이하로 작성해야 합니다.',
            },
            pattern: nickNameRegex,
          })}
          label="* 닉네임"
          placeholder="닉네임을 입력해 주세요."
          validation={
            errors.nickname?.type === 'pattern'
              ? '닉네임에는 공백이나 특수문자를 사용할 수 없습니다.'
              : errors.nickname?.message
          }
        />
      </div>
      <div>
        <Input
          {...register('aboutMe', {
            maxLength: {
              value: 50,
              message: '한줄 소개는 50자 이하로 작성해야 합니다.',
            },
          })}
          label="한줄 소개"
          placeholder="한줄 소개를 입력해 주세요."
          validation={errors.aboutMe?.message}
        />
      </div>
      <div>
        <Input
          {...register('newsEmail', {
            required: '이메일을 입력해 주세요',
            maxLength: {
              value: 300,
              message: '이메일은 300자 이하로 작성해야 합니다.',
            },
            pattern: emailRegex,
          })}
          validation={
            errors.newsEmail?.type === 'pattern'
              ? '이메일 형식이 아닙니다.'
              : errors.newsEmail?.message
          }
          label="* 이메일"
          placeholder="이메일을 입력해 주세요."
          inputButton={!isVerification}
          buttonText="인증번호 전송"
          buttonColor="gray"
          onButtonClick={() => handleEmailAuth(getValues('newsEmail'))}
          onChange={handleEmailInput}
        />
      </div>
      {isEmailAuthOpen && (
        <div>
          <Input
            {...register('code')}
            label="이메일 인증"
            placeholder="인증번호를 입력해 주세요"
            inputButton
            buttonText="인증번호 확인"
            buttonColor="gray"
            validation={errors.code?.message}
            onButtonClick={() => handleCheckAuthNum(getValues('code'))}
          />
        </div>
      )}
      <div className="flex flex-col">
        <div className="py-2 text-sm font-semibold text-gray9">
          * 관심 카테고리
        </div>
        <CategoryList
          type="default"
          horizontal={false}
          defaultIndex={Object.values(CATEGORIES['default']).indexOf(
            getValues('favoriteCategory').toLowerCase(),
          )}
          onChange={(e) =>
            setValue(
              'favoriteCategory',
              e?.currentTarget.value.toUpperCase() || '',
            )
          }
        />
      </div>
      <div className="flex items-center gap-3 py-2">
        <div>관심 카테고리로 뉴스레터 받아보기 동의하시겠습니까?</div>
        <label>
          <input
            type="checkBox"
            hidden
            onChange={handleClickCheckButton}
          />
          <CheckIcon
            className={cls(
              'h-5 w-5 rounded-sm text-white',
              checked ? 'bg-emerald5 ' : 'bg-gray9',
            )}
          />
        </label>
      </div>
      <div className="py-6">
        <Button
          type="submit"
          isDisabled={!isVerification}
          className={cls(
            'button button-lg px-4 py-2.5',
            isVerification ? 'button-emerald' : 'button-gray',
          )}>
          {formType === 'Setting' ? '수정하기' : '가입하기'}
        </Button>
      </div>
      {formType === 'Setting' && (
        <div className="flex flex-col items-center justify-center py-6">
          <button
            onClick={handleWithdrawButton}
            className="text-xs font-normal text-gray4 underline"
            type="button">
            회원탈퇴
          </button>
        </div>
      )}
    </form>
  )
}

export default UserInfoForm
