'use client'

import { UseFormSetValue } from 'react-hook-form'
import { FetchCreateLinkProps, fetchCreateLink } from '@/services/link/link'
import { useQueryClient } from '@tanstack/react-query'
import { CreateLinkFormValue } from '../LinkList'

export interface UseCreateLinkReturnType {
  handleCreateLink: ({
    spaceId,
    url,
    title,
    tagName,
    color,
  }: FetchCreateLinkProps) => Promise<void>
}

const useCreateLink = (): UseCreateLinkReturnType => {
  const queryclient = useQueryClient()

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
    await queryclient.invalidateQueries({ queryKey: ['links', spaceId] })
  }

  return {
    handleCreateLink,
  }
}

export default useCreateLink
