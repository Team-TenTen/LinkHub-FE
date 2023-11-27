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
  onEdit?: (
    commentId: number,
    comment: string,
    parentCommentId?: number,
  ) => void
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
    <>
      <ul className="ml-8 rounded-md bg-slate-50 px-3 dark:bg-slate-800">
        {replies?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.responses.map((comment: CommentResBody) => (
              <li key={comment.commentId}>
                <Comment
                  commentId={comment.commentId}
                  user={{
                    id: comment.memberId,
                    name: comment.nickname,
                    profile: comment.profileImagePath,
                  }}
                  spaceId={spaceId}
                  parentCommentId={parentCommentId}
                  parentCommentUser={parentCommentUser}
                  comment={comment.content}
                  firstDepth={false}
                  date={new Date(comment.createdAt)}
                  auth={comment.isModifiable}
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
    </>
  )
}

export default ReplyList
