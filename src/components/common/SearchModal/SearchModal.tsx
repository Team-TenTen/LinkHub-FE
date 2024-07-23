'use client'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Dropdown } from '@/components'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import Input from '../Input/Input'
import { SEACH_MODAL_INFO, SEARCH_MODAL_TITLE } from './constants'
import useSearchModal from './hooks/useSearchModal'

export interface SearchModalProps {
  onClose: () => void
}

export interface SearchFormValues {
  search: string
  target: string
}

const SearchModal = ({ onClose }: SearchModalProps) => {
  const { register, setValue, setFocus, handleSubmit } =
    useForm<SearchFormValues>({
      defaultValues: {
        search: '',
        target: 'space',
      },
    })
  const searchModalRef = useRef<HTMLDivElement>(null)
  const {
    handleOverlayClick,
    handleTargetChange,
    handleKeywordClick,
    onSubmit,
  } = useSearchModal({
    searchModalRef,
    setValue,
    setFocus,
    onClose,
  })

  return (
    <div
      ref={searchModalRef}
      onClick={handleOverlayClick}
      className="fixed left-0 right-0 top-0 z-50 mx-auto flex h-screen w-full flex-col justify-center bg-black/40 shadow-xl">
      <div className="max-h-content absolute top-0 flex w-full flex-col rounded-b-xl bg-bgColor px-4 pb-4">
        <form
          className="flex gap-x-1.5 py-1.5"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="shrink-0">
            <Dropdown
              type="search"
              size="large"
              onChange={handleTargetChange}
            />
          </div>
          <div className="grow">
            <Input
              {...register('search')}
              placeholder="검색어를 입력하세요."
              inputButton={true}
              buttonText="검색"
              buttonType="submit"
            />
          </div>
        </form>
        <h2 className="py-4 font-bold text-gray9">{SEARCH_MODAL_TITLE}</h2>
        <p className="flex flex-col items-center px-3 py-5 text-center text-sm font-medium text-gray9">
          <RocketLaunchIcon className="mb-2 h-5 w-5" />
          {SEACH_MODAL_INFO}
        </p>
      </div>
    </div>
  )
}

export default SearchModal
