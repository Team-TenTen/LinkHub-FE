'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Avatar, CategoryList, Input } from '@/components'
import { UserProfileResBody } from '@/types'
import { cls } from '@/utils'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import Button from '../common/Button/Button'
import { CATEGORIES } from '../common/CategoryList/constants'
import useToggle from '../common/Toggle/hooks/useToggle'
import { RegisterReqBody, useRegister } from './hooks/useRegister'

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

  useEffect(() => {
    setThumnail(userData?.profileImagePath)
  }, [userData?.profileImagePath])

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?&_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterReqBody>({
    defaultValues: {
      nickname: userData?.nickname || '',
      aboutMe: userData?.aboutMe || '',
      favoriteCategory: 'ENTER_ART',
      isSubscribed: userData?.isSubscribed || false,
    },
  })

  const handleFileChange = (e?: ChangeEvent<HTMLInputElement>) => {
    e?.preventDefault()

    if (e?.target.files) {
      const blob = new Blob([e.target.files[0]], {
        type: e.target.files[0].type,
      })

      const thumbNailImage = URL.createObjectURL(blob)
      setThumnail(thumbNailImage)
      setImageFile(e.target.files[0])
    }
  }

  const handleEmailAuth = () => {
    // Todo: 이메일 로직

    setIsEmailAuthOpen(true)
  }

  const handleCheckAuthNum = () => {
    // Todo: 인증번호 확인 로직
  }

  const handleClickCheckButton = () => {
    toggle()
    setValue('isSubscribed', !getValues('isSubscribed'))
  }

  const handleWithdrawButton = () => {
    // Todo: 회원탈퇴 로직
  }

  return (
    <form
      className="flex flex-col gap-3 px-4 pt-8"
      onSubmit={handleSubmit(async (data) => {
        await registerLinkHub(data, imageFile)
        router.replace('/login')
      })}>
      <div className="flex justify-center">
        <input
          type="file"
          ref={selectUserImage}
          onChange={handleFileChange}
          hidden
        />
        <div onClick={() => selectUserImage?.current?.click()}>
          <Avatar
            // Todo: 기본 이미지로 변경
            src={thumnail || '/duck.jpg'}
            width={80}
            height={80}
            alt="프로필"
            className="h-20"
          />
        </div>
      </div>
      <div>
        <Input
          {...register('nickname', {
            required: '닉네임을 입력해 주세요',
          })}
          label="닉네임"
          placeholder="nickname"
          validation={errors.nickname?.message}
        />
      </div>
      <div>
        <Input
          {...register('aboutMe')}
          label="한줄 소개"
          placeholder="aboutMe"
        />
      </div>
      <div>
        <Input
          {...register('newsEmail', {
            required: '이메일을 입력해 주세요',
            pattern: emailRegex,
          })}
          validation={
            errors.newsEmail?.type === 'pattern'
              ? '이메일 양식에 맞게 입력해 주세요'
              : errors.newsEmail?.message
          }
          label="이메일"
          placeholder="Email"
          inputButton
          buttonText="인증번호 전송"
          buttonColor="gray"
          onButtonClick={handleEmailAuth}
        />
      </div>
      {isEmailAuthOpen && (
        <div>
          <Input
            label="이메일 인증"
            placeholder="인증번호를 입력해 주세요"
            inputButton
            buttonText="인증번호 확인"
            buttonColor="gray"
            onButtonClick={handleCheckAuthNum}
          />
        </div>
      )}
      <div className="flex flex-col">
        <div className="py-2 text-sm font-semibold text-gray9">
          관심 카테고리
        </div>
        <CategoryList
          type="default"
          horizontal={false}
          defaultIndex={Object.values(CATEGORIES['default']).indexOf(
            getValues('favoriteCategory'),
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
          className="button button-lg button-gray px-4 py-2.5">
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
