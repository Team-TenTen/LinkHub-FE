'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CategoryList, Input, SpaceMemberList, Toggle } from '@/components'
import { mock_memberData } from '@/data'
import { useModal } from '@/hooks'
import Image from 'next/image'
import Button from '../common/Button/Button'
import { CATEGORIES } from '../common/CategoryList/constants'
import { SPACE_FORM_CONSTNAT } from './constant'

interface FormValues {
  image: File | null
  name: string
  description: string
  category: string
  public: boolean
  comment: boolean
  summary: boolean
  viewer: boolean
}

interface SpaceFormProps {
  spaceType: 'Create' | 'Setting'
  spaceImage?: string
  spaceName?: string
  description?: string
  category?: string
  spacePublic?: boolean
  comment?: boolean
  summary?: boolean
  viewer?: boolean
}

const SpaceForm = ({
  spaceType,
  spaceImage,
  spaceName,
  description,
  category,
  spacePublic,
  comment,
  summary,
  viewer,
}: SpaceFormProps) => {
  const selectSpaceImage = useRef<HTMLInputElement | null>(null)
  const [thumnail, setThumnail] = useState(spaceImage)
  const { Modal, isOpen, modalOpen, modalClose } = useModal(false)

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: spaceName || '',
      description: description || '',
      category: category || '엔터테인먼트•예술',
      public: spacePublic || false,
      comment: comment || false,
      summary: summary || false,
      viewer: viewer || false,
    },
  })

  useEffect(() => {
    setThumnail(spaceImage)
  }, [spaceImage])

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

  const handleConfirm = () => {
    // 스페이스 나간 후 로직
    console.log('스페이스가 삭제되었습니다.')
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
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-gray9">관심 카테고리</div>
          <div>
            <CategoryList
              type="default"
              horizontal={false}
              defaultIndex={CATEGORIES['default'].indexOf(
                getValues('category'),
              )}
              onChange={(e) =>
                setValue('category', e?.currentTarget.value || '')
              }
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">공개여부</div>
            <Toggle
              {...register('public')}
              name="public"
              on={spacePublic || false}
              onChange={() => setValue('public', !getValues('public'))}
            />
          </div>
          <div className="flex items-center justify-between border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">댓글 작성 여부</div>
            <Toggle
              {...register('comment')}
              on={comment || false}
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
              on={summary}
              name="summary"
              onChange={() => setValue('summary', !getValues('summary'))}
            />
          </div>
          <div className="flex items-center justify-between border-b border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">읽음 처리 여부</div>
            <Toggle
              {...register('viewer')}
              on={viewer}
              name="viewer"
              onChange={() => setValue('viewer', !getValues('viewer'))}
            />
          </div>
        </div>
        <div className="flex justify-end py-6">
          <Button
            type="submit"
            className="button button-md button-emerald">
            {spaceType === 'Setting'
              ? SPACE_FORM_CONSTNAT.SETTING_SPACE
              : SPACE_FORM_CONSTNAT.CREATE_SPACE}
          </Button>
        </div>
        {spaceType === 'Setting' && (
          <div>
            <div className="mb-10 border-b border-slate3">
              <SpaceMemberList
                members={mock_memberData}
                edit
              />
            </div>
            <div className="flex items-center justify-between pb-6">
              <div className="pb-4 pt-4 text-base font-bold text-gray9">
                스페이스 삭제
              </div>
              <Button
                className="button button-md button-gray"
                onClick={modalOpen}>
                스페이스 삭제
              </Button>
              {isOpen && (
                <Modal
                  title="스페이스 삭제"
                  isCancelButton={true}
                  isConfirmButton={true}
                  cancelText="취소"
                  confirmText="삭제"
                  onClose={modalClose}
                  onConfirm={handleConfirm}>
                  <div className="flex justify-center">삭제하시겠습니까?</div>
                </Modal>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

export default SpaceForm
