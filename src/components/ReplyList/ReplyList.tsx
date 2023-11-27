import { Fragment } from 'react'
import { Comment } from '@/components'
import { CommentReqBody, CommentResBody } from '@/types'
import Button from '../common/Button/Button'
import { MORE_TEXT } from './constants'
import useRepliesQuery from './hooks/useRepliesQuery'

export interface ReplyListProps {
  spaceId: number
  parentCommentId: number
  parentCommentUser?: string
  fetchFn: ({ pageNumber, pageSize }: CommentReqBody) => Promise<any>
  onEdit?: (commentId: number, content: string) => void
}

const ReplyList = ({
  spaceId,
  parentCommentId,
  parentCommentUser,
  fetchFn,
  onEdit,
}: ReplyListProps) => {
  const { replies, fetchNextPage, hasNextPage } = useRepliesQuery({
    spaceId,
    parentCommentId,
    fetchFn,
  })

  return (
    <ul className="ml-8 rounded-md bg-slate-50 px-3 dark:bg-slate-800">
      {replies?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.responses.map((comment: CommentResBody) => (
            <li key={comment.commentId}>
              <Comment
                spaceId={spaceId}
                commentId={comment.commentId}
                memberId={comment.memberId}
                nickname={comment.nickname}
                profileImagePath={comment.profileImagePath}
                content={comment.content}
                date={new Date(comment.createdAt)}
                isModifiable={comment.isModifiable}
                isRoot={false}
                parentCommentId={parentCommentId}
                parentCommentUser={parentCommentUser}
                onEdit={onEdit}
              />
            </li>
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <div className="flex justify-center pb-3">
          <Button
            className="button button-round button-white"
            onClick={() => fetchNextPage()}>
            {MORE_TEXT}
          </Button>
        </div>
      )}
    </ul>
  )
}

export default ReplyList
