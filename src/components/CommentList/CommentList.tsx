import { Fragment } from 'react'
import { Comment } from '@/components'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { fetchGetReplies } from '@/services/comment/reply'
import { CommentReqBody, CommentResBody } from '@/types'
import ReplyList from '../ReplyList/ReplyList'
import useCommentList from './hooks/useCommentList'
import useCommentsQuery from './hooks/useCommentsQuery'

export interface CommentListProps {
  spaceId: number
  fetchFn: ({ pageNumber, pageSize }: CommentReqBody) => Promise<any>
}

const CommentList = ({ spaceId, fetchFn }: CommentListProps) => {
  const {
    comments,
    openedComments,
    setOpenedComments,
    fetchNextPage,
    hasNextPage,
  } = useCommentsQuery({
    spaceId,
    fetchFn,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })
  const { handleOpen } = useCommentList({
    openedComments,
    setOpenedComments,
  })

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
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onOpen={() => handleOpen(groupIdx, commentIdx)}
                    onReply={() => {}}
                  />
                  {openedComments[groupIdx]?.[commentIdx] && (
                    <ReplyList
                      spaceId={spaceId}
                      commentId={comment.commentId}
                      fetchFn={fetchGetReplies}
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
