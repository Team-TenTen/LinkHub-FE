'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Avatar, CategoryList, Input } from '@/components'
import { User } from '@/types'
import { cls } from '@/utils'
import { CheckIcon } from '@heroicons/react/24/solid'
import Button from '../common/Button/Button'
import useToggle from '../common/Toggle/hooks/useToggle'
import { useRegister } from './hooks/useRegister'

interface FormValues {
  image: File | null
  nickName: string
  introduce: string
  email: string
  category: string
  newsLetter: boolean
}

const UserInfoForm = ({ userData }: { userData?: User }) => {
  const selectUserImage = useRef<HTMLInputElement | null>(null)
  const [thumnail, setThumnail] = useState(userData?.profile)
  const [isEmailAuthOpen, setIsEmailAuthOpen] = useState(false)
  const [checked, toggle] = useToggle(false)
  const { registerLinkHub } = useRegister()

  useEffect(() => {
    setThumnail(userData?.profile)
  }, [userData?.profile])

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?&_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nickName: userData?.name || '',
      introduce: userData?.introduce || '',
      category: userData?.category || '엔터테인먼트•예술',
      newsLetter: userData?.newsLetter || false,
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
      setValue('image', e.target.files[0])
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
    setValue('newsLetter', !checked)
  }

  return (
    <form
      className="flex flex-col gap-3 px-4 pt-8"
      onSubmit={handleSubmit((data) => {
        registerLinkHub(data)
      })}>
      <div className="flex justify-center">
        <input
          {...register('image')}
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
          {...register('nickName', {
            required: '닉네임을 입력해 주세요',
          })}
          label="닉네임"
          placeholder="Nickname"
          validation={errors.nickName?.message}
        />
      </div>
      <div>
        <Input
          {...register('introduce')}
          label="한줄 소개"
          placeholder="Introduce"
        />
      </div>
      <div>
        <Input
          {...register('email', {
            required: '이메일을 입력해 주세요',
            pattern: emailRegex,
          })}
          validation={
            errors.email?.type === 'pattern'
              ? '이메일 양식에 맞게 입력해 주세요'
              : errors.email?.message
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
          onChange={(e) => setValue('category', e?.currentTarget.value || '')}
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
          가입하기
        </Button>
      </div>
    </form>
  )
}

export default UserInfoForm
