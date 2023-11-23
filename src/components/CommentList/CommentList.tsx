import { Fragment } from 'react'
import { Comment } from '@/components'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { CommentReqBody, CommentResBody } from '@/types'
import useCommentsQuery from './hooks/useCommentsQuery'

export interface CommentListProps {
  spaceId: number
  fetchFn: ({ pageNumber, pageSize }: CommentReqBody) => Promise<any>
}

const CommentList = ({ spaceId, fetchFn }: CommentListProps) => {
  const { comments, fetchNextPage, hasNextPage } = useCommentsQuery({
    spaceId,
    fetchFn,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return (
    <>
      <ul className="flex flex-col gap-y-2 pt-2">
        {comments?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.responses?.map((comment: CommentResBody) => (
              <li key={comment.commentId}>
                <Comment
                  commentId={comment.commentId}
                  user={{
                    id: comment.memberId,
                    name: comment.nickname,
                    profile: comment.profileImagePath,
                  }}
                  comment={comment.content}
                  date={new Date(comment.createdAt)}
                  firstDepth={true}
                  replyCount={comment.childCount}
                  auth={comment.isModifiable}
                />
              </li>
            ))}
          </Fragment>
        ))}
        <div ref={target}></div>
      </ul>
    </>
  )
}

export default CommentList
