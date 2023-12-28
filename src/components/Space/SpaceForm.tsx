'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CategoryList, Input, Toggle } from '@/components'
import { MIN_TAB_NUMBER } from '@/constants'
import {
  feachCreateSpace,
  fetchScrapSpace,
  fetchSettingSpace,
} from '@/services/space/space'
import { CreateSpaceReqBody, SpaceDetailResBody } from '@/types'
import imageCompression from 'browser-image-compression'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Button from '../common/Button/Button'
import { CATEGORIES } from '../common/CategoryList/constants'
import useGetSpace from '../common/Space/hooks/useGetSpace'
import Tab from '../common/Tab/Tab'
import TabItem from '../common/Tab/TabItem'
import useTab from '../common/Tab/hooks/useTab'
import { notify } from '../common/Toast/Toast'
import { SPACE_FORM_CONSTNAT } from './constant'

interface SpaceFormProps {
  space?: SpaceDetailResBody
  spaceType: 'Create' | 'Setting' | 'Scrap'
}

const SpaceForm = ({ spaceType, space }: SpaceFormProps) => {
  const selectSpaceImage = useRef<HTMLInputElement | null>(null)
  const [thumnail, setThumnail] = useState(space?.spaceImagePath)
  const [imageFile, setImageFile] = useState<File>()
  const { currentTab, tabList } = useTab({ type: 'space', space })
  const path = usePathname()
  const spaceId = Number(path.split('/')[2])
  const router = useRouter()
  const getSpace = useGetSpace()
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSpaceReqBody>({
    defaultValues: {
      spaceName: space?.spaceName || '',
      description: space?.description || '',
      category: space?.category || '',
      isVisible: space?.isVisible || false,
      isComment: space?.isComment || false,
      isLinkSummarizable: false,
      isReadMarkEnabled: space?.isReadMarkEnabled || false,
    },
  })

  useEffect(() => {
    setThumnail(space?.spaceImagePath)
  }, [space])

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

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(async (data) => {
        if (data.category === '') {
          notify('error', '카테고리를 선택해 주세요.')
        } else {
          if (spaceType === 'Create') {
            const { spaceId } = await feachCreateSpace(data, imageFile)
            notify('info', '스페이스가 생성되었습니다.')
            router.replace(`/space/${spaceId}`)
          } else if (spaceType === 'Setting') {
            try {
              const response = await fetchSettingSpace(spaceId, data, imageFile)
              if (!response.spaceId) {
                router.replace('/')
                return
              }
              notify('info', '스페이스를 수정했습니다.')
              router.push(`/space/${response.spaceId}`)
            } catch (e) {
              router.replace('/')
            }
          } else {
            const response = await fetchScrapSpace(spaceId, data, imageFile)
            notify('info', '스페이스가 생성되었습니다.')
            router.push(`/space/${response.spaceId}`)
          }
        }
      })}>
      <div>
        <input
          type="file"
          ref={selectSpaceImage}
          onChange={handleFileChange}
          accept=".jpg, .png, .svg"
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
      {spaceType === 'Setting' && tabList.length > MIN_TAB_NUMBER && (
        <Tab>
          {tabList.map((tabItem) => (
            <TabItem
              active={currentTab === tabItem.content}
              text={tabItem.text}
              dest={tabItem.dest}
              key={tabItem.content}
            />
          ))}
        </Tab>
      )}
      <div className="mt-3 flex flex-col gap-3 pl-4 pr-4">
        {spaceType === 'Scrap' && (
          <div className="flex items-center justify-start rounded-md border border-slate3 bg-emerald05 p-3">
            <div className="text-sm font-medium text-gray9">
              <span className="font-semibold">
                @{getSpace.space?.spaceName}{' '}
              </span>
              에서 가져오는 중
            </div>
          </div>
        )}
        <div>
          <Input
            {...register('spaceName', {
              required: '스페이스명을 입력해 주세요',
              minLength: {
                value: 2,
                message: '스페이스명은 최소 2글자 이상이어야 합니다.',
              },
              maxLength: {
                value: 20,
                message: '스페이스명은 20글자 이하여야 합니다.',
              },
              pattern: {
                value: /^\S+(\s*\S*\s*)*\S+$/,
                message: '스페이스명은 공백으로 시작하거나 끝날 수 없습니다.',
              },
            })}
            label="스페이스 이름"
            placeholder="스페이스 이름을 입력하세요"
            type="text"
            validation={errors.spaceName?.message}
          />
        </div>
        <div>
          <Input
            {...register('description', {
              maxLength: {
                value: 40,
                message: '스페이스 설명은 40글자 이하여야 합니다.',
              },
            })}
            label="스페이스 설명"
            placeholder="스페이스 설명을 입력하세요"
            type="text"
            validation={errors.description?.message}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-gray9">카테고리</div>
          <div>
            <CategoryList
              type="default"
              horizontal={false}
              defaultIndex={Object.values(CATEGORIES['default']).indexOf(
                getValues('category').toLowerCase(),
              )}
              onChange={(e) =>
                setValue('category', e?.currentTarget.value.toUpperCase() || '')
              }
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">공개여부</div>
            <Toggle
              {...register('isVisible')}
              name="isVisible"
              on={space?.isVisible || false}
              onChange={() => setValue('isVisible', !getValues('isVisible'))}
            />
          </div>
          <div className="flex items-center justify-between border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">댓글 작성 여부</div>
            <Toggle
              {...register('isComment')}
              on={space?.isComment || false}
              name="isComment"
              onChange={() => setValue('isComment', !getValues('isComment'))}
            />
          </div>
          {/* <div className="flex items-center justify-between border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9 opacity-50">
              링크 3줄 요약 여부
            </div>
            <Toggle
              {...register('isLinkSummarizable')}
              on={space?.isLinkSummarizable}
              name="isLinkSummarizable"
              isDisabled={true}
              onChange={() => {}}
            />
          </div> */}
          <div className="flex items-center justify-between border-b border-t border-slate3 p-3">
            <div className="text-sm font-medium text-gray9">읽음 처리 여부</div>
            <Toggle
              {...register('isReadMarkEnabled')}
              on={space?.isReadMarkEnabled}
              name="isReadMarkEnabled"
              onChange={() =>
                setValue('isReadMarkEnabled', !getValues('isReadMarkEnabled'))
              }
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
      </div>
    </form>
  )
}

export default SpaceForm
