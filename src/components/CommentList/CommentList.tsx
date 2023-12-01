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
  onEdit?: (commentId: number, content: string) => void
  onReply?: (commentId: number, nickname: string) => void
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
    <ul className="flex flex-col gap-y-2 pt-2">
      {comments?.pages.map((group, groupIdx) => (
        <Fragment key={groupIdx}>
          {group.responses?.map((comment: CommentResBody) => (
            <li key={comment.commentId}>
              <Comment
                spaceId={spaceId}
                commentId={comment.commentId}
                memberId={comment.memberId}
                nickname={comment.nickname}
                profileImagePath={comment.profileImagePath}
                content={comment.content}
                createdAt={comment.createdAt}
                replyCount={comment.childCount}
                isModifiable={comment.isModifiable}
                isRoot={true}
                onEdit={onEdit}
                onOpen={onOpen}
                onReply={onReply}
              />
              {openedComments?.includes(comment.commentId) && (
                <ReplyList
                  spaceId={spaceId}
                  parentCommentId={comment.commentId}
                  parentCommentUser={comment.nickname}
                  fetchFn={fetchGetReplies}
                  onEdit={onEdit}
                />
              )}
            </li>
          ))}
        </Fragment>
      ))}
      <div ref={target}></div>
    </ul>
  )
}

export default CommentList
