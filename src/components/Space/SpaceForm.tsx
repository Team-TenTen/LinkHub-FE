'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Toggle } from '@/components'
import Image from 'next/image'
import Button from '../common/Button/Button'

interface FormValues {
  image: File | null
  name: string
  description: string
  public: boolean
  comment: boolean
  summary: boolean
  viewer: boolean
}

const SpaceForm = ({ buttonText }: { buttonText: string }) => {
  const selectSpaceImage = useRef<HTMLInputElement | null>(null)
  const [thumnail, setThumnail] = useState<string | null>(null)

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
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

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit((data) => {
        console.log(data)
      })}>
      <div>
        <input
          {...register('image')}
          type="file"
          ref={selectSpaceImage}
          onChange={handleFileChange}
          hidden
        />
        <div onClick={() => selectSpaceImage?.current?.click()}>
          {thumnail ? (
            <Image
              className="h-[188px] object-cover"
              src={thumnail}
              width={500}
              height={188}
              alt="spaceImage"
            />
          ) : (
            <div className="flex h-[188px] items-center justify-center border-4 border-dashed border-slate5">
              이미지 선택
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 pl-4 pr-4">
        <div>
          <Input
            {...register('name', {
              required: '스페이스명을 입력해 주세요',
            })}
            label="스페이스 이름"
            placeholder="스페이스 이름을 입력하세요"
            type="text"
            validation={errors.name?.message}
          />
        </div>
        <div>
          <Input
            {...register('description')}
            label="스페이스 설명"
            placeholder="스페이스 설명을 입력하세요"
            type="text"
          />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray9">관심 카테고리</div>
          <div>대충 카테고리 들어갈 영역</div>
        </div>
        <div>
          <div className="flex items-center justify-between border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">공개여부</div>
            <Toggle
              {...register('public')}
              name="public"
              onChange={() => setValue('public', !getValues('public'))}
            />
          </div>
          <div className="flex items-center justify-between border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">댓글 작성 여부</div>
            <Toggle
              {...register('comment')}
              name="comment"
              onChange={() => setValue('comment', !getValues('comment'))}
            />
          </div>
          <div className="flex items-center justify-between border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">
              링크 3줄 요약 여부
            </div>
            <Toggle
              {...register('summary')}
              name="summary"
              onChange={() => setValue('summary', !getValues('summary'))}
            />
          </div>
          <div className="flex items-center justify-between border-b border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">읽음 처리 여부</div>
            <Toggle
              {...register('viewer')}
              name="viewer"
              onChange={() => setValue('viewer', !getValues('viewer'))}
            />
          </div>
        </div>
        <div className="flex justify-end py-6">
          <Button
            type="submit"
            className="button button-md button-emerald">
            {buttonText}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SpaceForm
