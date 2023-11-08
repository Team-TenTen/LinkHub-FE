'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Avatar, CategoryList, Input } from '@/components'
import { cls } from '@/utils'
import { CheckIcon } from '@heroicons/react/24/solid'
import Button from '../common/Button/Button'
import useToggle from '../common/Toggle/hooks/useToggle'
import { useRegister } from './hooks/useRegister'

interface FormValues {
  nickName: string
  introduce: string
  email: string
  category: string
  newsLetter: boolean
  emailAuth: boolean
}

const UserInfoForm = () => {
  const [isEmailAuthOpen, setIsEmailAuthOpen] = useState(false)
  const [checked, toggle] = useToggle(false)
  const { registerLinkHub } = useRegister()

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?&_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: '엔터테인먼트•예술',
      newsLetter: false,
      emailAuth: false,
    },
  })

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
        <Avatar
          src="/duck.jpg"
          width={80}
          height={80}
          alt="프로필"
        />
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
          onButtonClick={() => setIsEmailAuthOpen(true)}
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
            onButtonClick={() => {}}
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
