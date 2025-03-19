import { useState } from 'react'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { usePostMeta } from '@/services/meta/useMeta'
import { CreateLinkFormValue } from '../LinkList'
import { LINK_FORM_VALIDATION } from '../constants'

export interface UseGetMetaDataProps {
  getValues: UseFormGetValues<CreateLinkFormValue>
  setValue: UseFormSetValue<CreateLinkFormValue>
  modalClose: VoidFunction
}

const useGetMetaData = ({
  getValues,
  setValue,
  modalClose,
}: UseGetMetaDataProps) => {
  const [isUrlCheck, setIsUrlCheck] = useState(false)
  const [urlErrorText, setUrlErrorText] = useState('')
  const [isShowFormError, setIsShowFormError] = useState(false)
  const { mutateAsync: postMeta, isPending: isMetaLoading } = usePostMeta()

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
    setValue('title', data)

    if (error) {
      setUrlErrorText(LINK_FORM_VALIDATION.INCORRECT_URL)
    } else {
      setIsShowFormError(false)
      setIsUrlCheck(true)
      setUrlErrorText('')
    }
  }

  const handleGetMeta = async ({ url }: { url: string }) => {
    if (isMetaLoading) return
    if (getIsValidUrl()) {
      const { data, error } = await postMeta({
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
    isMetaLoading,
    getIsValidUrl,
    handleModalClose,
    handleChangeUrl,
    handleGetMeta,
  }
}

export default useGetMetaData
