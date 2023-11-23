import { useEffect, useMemo, useRef, useState } from 'react'
import { fetchSearchMySpaces } from '@/services/space/spaces'
import { SearchMySpaceReqBody, SearchMySpaceResBody } from '@/types'

const useMySpace = (
  userId: number,
  params: SearchMySpaceReqBody,
): SearchMySpaceResBody | undefined => {
  const [spaces, setSpaces] = useState<SearchMySpaceResBody>()
  const memoizedParams = useMemo(
    () => ({
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      filter: params.filter,
      keyWord: params.keyWord,
    }),
    [params.filter, params.keyWord, params.pageNumber, params.pageSize],
  )

  useEffect(() => {
    const getMySpaces = async () => {
      try {
        if (userId) {
          const { responses } = await fetchSearchMySpaces(
            userId,
            memoizedParams,
          )
          setSpaces(responses)
        }
      } catch (error) {
        alert('스페이스를 불러오지 못했습니다.')
      }
    }

    getMySpaces()
  }, [memoizedParams, userId])

  return spaces
}

export { useMySpace }
