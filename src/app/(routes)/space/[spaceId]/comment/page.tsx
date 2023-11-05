'use client'

import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Comment, Input } from '@/components'
import Button from '@/components/common/Button/Button'
import Space from '@/components/common/Space/Space'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import { useModal } from '@/hooks'
import useSpaceComment from '@/hooks/useSpaceComment'
import { XMarkIcon } from '@heroicons/react/20/solid'

export interface CommentFormValues {
  comment: string
}

const SpaceCommentPage = () => {
  // TODO: useTab
  const { Modal, isOpen, modalOpen, modalClose } = useModal(false)
  const { register, setValue, setFocus, handleSubmit } =
    useForm<CommentFormValues>({
      defaultValues: {
        comment: '',
      },
    })
  const {
    space,
    comments,
    comment,
    handleEdit,
    handleDelete,
    handleOpen,
    handleReply,
    handleDeleteConfirm,
    handleReplyCancel,
    onSubmit,
  } = useSpaceComment({ setValue, setFocus, modalOpen })
  const [currentTab, setCurrentTab] = useState(1)
  const tabArr = [
    { text: '스페이스', content: '스페이스 페이지', dest: '/space/1' },
    { text: '댓글', content: '댓글 페이지', dest: '/space/1/comment' },
    { text: '설정', content: '설정 페이지', dest: '/space/1/setting' },
  ]

  return (
    <>
      <Space
        userName={space.userName}
        type="Header"
        spaceName={space.spaceName}
        spaceImage={space.spaceImage}
        description={space.description}
        category={space.category}
        scrap={space.scrap}
        favorite={space.favorite}
      />
      <Tab>
        {tabArr.map((tabItem, index) => (
          <TabItem
            active={currentTab === index ? true : false}
            dest={tabItem.dest}
            text={tabItem.text}
            onClick={() => setCurrentTab(index)}
            key={index}
          />
        ))}
      </Tab>
      <section className="px-4 pb-32 pt-1">
        {comments.map((comment) => (
          <Fragment key={comment.commentId}>
            <Comment
              commentId={comment.commentId}
              user={{
                id: comment.user.id,
                name: comment.user.name,
                profile: comment.user.profile,
              }}
              comment={comment.comment}
              date={comment.date}
              auth={comment.auth}
              firstDepth={true}
              replyCount={comment.replyCount}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onOpen={handleOpen}
              onReply={handleReply}
            />
            <div className="ml-8 rounded-md bg-slate-50 px-3 dark:bg-slate-800">
              {comment.replies?.map((reply) => (
                <Comment
                  commentId={reply.commentId}
                  user={{
                    id: reply.user.id,
                    name: reply.user.name,
                    profile: reply.user.profile,
                  }}
                  comment={reply.comment}
                  date={reply.date}
                  firstDepth={false}
                  auth={reply.auth}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  key={reply.commentId}
                />
              ))}
            </div>
          </Fragment>
        ))}
      </section>
      <form
        className="fixed bottom-0 z-10 w-full max-w-[500px] bg-bgColor"
        onSubmit={handleSubmit(onSubmit)}>
        {comment.type === 'reply' && (
          <div className="flex items-center justify-between border-t border-slate3 px-4 py-3 text-xs font-medium text-gray6">
            <span>
              <b>@{comment.userName}</b>
              님에게 답글을 남기는 중
            </span>
            <Button onClick={handleReplyCancel}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
        <div className="border-t border-slate3 px-4 py-3">
          <Input
            {...register('comment', { required: true })}
            inputButton={true}
            buttonText="작성"
            buttonColor="gray"
            placeholder="댓글을 작성해 주세요"
          />
        </div>
      </form>
      {isOpen && (
        <Modal
          title="댓글 삭제"
          isCancelButton={true}
          isConfirmButton={true}
          cancelText="취소"
          confirmText="삭제"
          onClose={modalClose}
          onConfirm={handleDeleteConfirm}>
          <div className="flex justify-center">삭제하시겠습니까?</div>
        </Modal>
      )}
    </>
  )
}

export default SpaceCommentPage
