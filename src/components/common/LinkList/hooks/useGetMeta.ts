import { useState } from 'react'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { FetchGetMetaProps, fetchGetMeta } from '@/services/meta/meta'
import { CreateLinkFormValue } from '../LinkList'
import { LINK_FORM_VALIDATION } from '../constants'

export interface UseGetMetaProps {
  getValues: UseFormGetValues<CreateLinkFormValue>
  setValue: UseFormSetValue<CreateLinkFormValue>
  modalClose: VoidFunction
}

const useGetMeta = ({ getValues, setValue, modalClose }: UseGetMetaProps) => {
  const [isUrlCheck, setIsUrlCheck] = useState(false)
  const [urlErrorText, setUrlErrorText] = useState('')
  const [isShowFormError, setIsShowFormError] = useState(false)

  const getIsValidUrl = () => {
    const url = getValues('url')
    var urlPattern = /^(https?:\/\/|file:\/\/)/
    return urlPattern.test(url)
  }

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
      setUrlErrorText(LINK_FORM_VALIDATION.INCORRECT_URL)
    } else {
      setIsShowFormError(false)
      setIsUrlCheck(true)
      setUrlErrorText('')
    }
  }

  const handleGetMeta = async ({ url }: FetchGetMetaProps) => {
    if (getIsValidUrl()) {
      const { data, error } = await fetchGetMeta({
        url,
      })
      handleUrlValidation({ data, error })
    } else {
      setUrlErrorText(LINK_FORM_VALIDATION.URL_INVALID_FORM)
    }
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
    setIsUrlCheck,
    urlErrorText,
    setUrlErrorText,
    isShowFormError,
    setIsShowFormError,
    getIsValidUrl,
    handleModalClose,
    handleChangeUrl,
    handleGetMeta,
  }
}

export default useGetMeta
