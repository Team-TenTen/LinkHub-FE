import { Dispatch, SetStateAction, useCallback } from 'react'

export interface useCommentListProps {
  openedComments: boolean[][]
  setOpenedComments: Dispatch<SetStateAction<boolean[][]>>
}

const useCommentList = ({
  openedComments,
  setOpenedComments,
}: useCommentListProps) => {
  const handleOpen = useCallback(
    (depth1: number, depth2: number) => {
      const nextOpenedComments = openedComments.map(
        (group: boolean[], groupIdx: number) =>
          group.map((_, commentIdx: number) =>
            groupIdx === depth1 && commentIdx === depth2
              ? true
              : openedComments[groupIdx][commentIdx],
          ),
      )
      setOpenedComments(nextOpenedComments)
    },
    [openedComments, setOpenedComments],
  )

  return {
    handleOpen,
  }
}

export default useCommentList
