import { Fragment } from 'react'
import { Comment } from '@/components'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { fetchGetReplies } from '@/services/comment/reply'
import { CommentReqBody, CommentResBody } from '@/types'
import ReplyList from '../ReplyList/ReplyList'
import useCommentsQuery from './hooks/useCommentsQuery'

export interface CommentListProps {
  spaceId: number
  openedComments?: number[]
  fetchFn: ({ pageNumber, pageSize }: CommentReqBody) => Promise<any>
  onOpen?: (commentId: number) => void
  onEdit?: (commentId: number, comment: string) => void
  onReply?: (commentId: number, userName: string) => void
}

const CommentList = ({
  spaceId,
  openedComments,
  fetchFn,
  onOpen,
  onEdit,
  onReply,
}: CommentListProps) => {
  const { comments, fetchNextPage, hasNextPage } = useCommentsQuery({
    spaceId,
    fetchFn,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return (
    <>
      <ul className="flex flex-col gap-y-2 pt-2">
        {comments?.pages.map((group, groupIdx) => (
          <Fragment key={groupIdx}>
            {group.responses.map(
              (comment: CommentResBody, commentIdx: number) => (
                <li key={comment.commentId}>
                  <Comment
                    commentId={comment.commentId}
                    spaceId={spaceId}
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
                    onOpen={onOpen}
                    onEdit={onEdit}
                    onReply={onReply}
                  />
                  {openedComments?.includes(comment.commentId) && (
                    <ReplyList
                      spaceId={spaceId}
                      commentId={comment.commentId}
                      parentCommentUser={comment.nickname}
                      fetchFn={fetchGetReplies}
                      onEdit={onEdit}
                    />
                  )}
                </li>
              ),
            )}
          </Fragment>
        ))}
        <div ref={target}></div>
      </ul>
    </>
  )
}

export default CommentList
