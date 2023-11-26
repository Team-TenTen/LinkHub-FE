import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { FetchGetMetaProps, fetchGetMeta } from '@/services/meta/meta'
import { CreateLinkFormValue } from '../LinkList'

const useGetMeta = (setValue: UseFormSetValue<CreateLinkFormValue>) => {
  const [isUrlCheck, setIsUrlCheck] = useState(false)
  const [isUrlError, setIsUrlError] = useState(false)

  const handleGetMeta = async ({ url }: FetchGetMetaProps) => {
    const { data, error } = await fetchGetMeta({
      url,
    })
    setValue('title', data)
    setIsUrlError(error)
    if (error === false) {
      setIsUrlCheck(true)
    }
  }

  return { isUrlCheck, setIsUrlCheck, isUrlError, handleGetMeta }
}

export default useGetMeta
