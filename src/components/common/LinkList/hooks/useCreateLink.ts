'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { FetchCreateLinkProps, fetchCreateLink } from '@/services/link/link'
import { FetchGetMetaProps, fetchGetMeta } from '@/services/meta/meta'
import { CreateLinkFormValue } from '../LinkList'

export interface UseCreateLinkReturnType {
  isUrlCheck: boolean
  setIsUrlCheck: Dispatch<SetStateAction<boolean>>
  isUrlError: boolean
  handleGetMeta: ({ url }: FetchGetMetaProps) => Promise<void>
  handleCreateLink: ({
    spaceId,
    url,
    title,
    tagName,
    color,
  }: FetchCreateLinkProps) => Promise<void>
}

const useCreateLink = (
  setValue: UseFormSetValue<CreateLinkFormValue>,
): UseCreateLinkReturnType => {
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

  const handleCreateLink = async ({
    spaceId,
    url,
    title,
    tagName,
    color,
  }: FetchCreateLinkProps) => {
    await fetchCreateLink({
      spaceId,
      url,
      title,
      tagName,
      color,
    })
  }

  return {
    isUrlCheck,
    setIsUrlCheck,
    isUrlError,
    handleGetMeta,
    handleCreateLink,
  }
}

export default useCreateLink
