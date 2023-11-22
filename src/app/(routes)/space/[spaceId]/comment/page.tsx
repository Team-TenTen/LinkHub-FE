'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components'
import CommentList from '@/components/CommentList/CommentList'
import Button from '@/components/common/Button/Button'
import Space from '@/components/common/Space/Space'
import useGetSpace from '@/components/common/Space/hooks/useGetSpace'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useTab from '@/components/common/Tab/hooks/useTab'
import { CATEGORIES_RENDER, MIN_TAB_NUMBER } from '@/constants'
import { useModal } from '@/hooks'
import useSpaceComment from '@/hooks/useSpaceComment'
import { fetchGetComments } from '@/services/comment/comment'
import { XMarkIcon } from '@heroicons/react/20/solid'

export interface CommentFormValues {
  comment: string
}

const SpaceCommentPage = ({ params }: { params: { spaceId: number } }) => {
  const [space] = useGetSpace()
  const { Modal, isOpen, modalOpen, modalClose } = useModal(false)
  const { register, setValue, setFocus, handleSubmit } =
    useForm<CommentFormValues>({
      defaultValues: {
        comment: '',
      },
    })
  const {
    comment,
    handleEdit,
    handleDelete,
    handleOpen,
    handleReply,
    handleDeleteConfirm,
    handleReplyCancel,
    onSubmit,
  } = useSpaceComment({ setValue, setFocus, modalOpen })
  const { currentTab, tabList } = useTab({ type: 'space', space })

  return (
    <>
      {space && (
        <Space
          type="Header"
          userName={space.memberDetailInfos[0].nickname}
          spaceId={space.spaceId}
          spaceName={space.spaceName}
          spaceImage={space.spaceImagePath}
          description={space.description}
          category={CATEGORIES_RENDER[space.category]}
          scrap={space.scrapCount}
          favorite={space.favoriteCount}
          hasFavorite={space.hasFavorite}
        />
      )}
      {tabList.length > MIN_TAB_NUMBER && (
        <Tab>
          {tabList.map((tabItem) => (
            <TabItem
              active={currentTab === tabItem.content}
              text={tabItem.text}
              dest={tabItem.dest}
              key={tabItem.content}
            />
          ))}
        </Tab>
      )}
      <section className="px-4 pb-32 pt-1">
        <CommentList
          spaceId={params.spaceId}
          fetchFn={fetchGetComments}
        />
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
            buttonType="submit"
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
