import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { FetchGetMetaProps, fetchGetMeta } from '@/services/meta/meta'
import { CreateLinkFormValue } from '../LinkList'

export interface UseGetMetaProps {
  setValue: UseFormSetValue<CreateLinkFormValue>
  modalClose: VoidFunction
}

const useGetMeta = ({ setValue, modalClose }: UseGetMetaProps) => {
  const [isUrlCheck, setIsUrlCheck] = useState(false)
  const [urlErrorText, setUrlErrorText] = useState('')
  const [isShowTitleError, setIsShowTitleError] = useState(false)

  const handleUrlValidation = ({
    data,
    error,
  }: {
    data: string
    error: boolean
  }) => {
    if (data) {
      setValue('title', data)
    }

    if (error) {
      setUrlErrorText('올바르지 않은 URL입니다.')
    } else {
      setIsShowTitleError(false)
      setIsUrlCheck(true)
      setUrlErrorText('')
    }
  }

  const handleGetMeta = async ({ url }: FetchGetMetaProps) => {
    const { data, error } = await fetchGetMeta({
      url,
    })

    handleUrlValidation({ data, error })
  }

  const handleModalClose = () => {
    modalClose()
    setUrlErrorText('')
    if (isUrlCheck) {
      setIsUrlCheck(false)
    }
  }

  const handleChangeUrl = () => {
    if (urlErrorText) {
      setUrlErrorText('')
    }

    if (isUrlCheck) {
      setIsUrlCheck(false)
    }
  }

  return {
    isUrlCheck,
    urlErrorText,
    setUrlErrorText,
    isShowTitleError,
    setIsShowTitleError,
    handleModalClose,
    handleChangeUrl,
    handleGetMeta,
  }
}

export default useGetMeta
