'use client'

import { useForm } from 'react-hook-form'
import { Input, Spinner } from '@/components'
import CommentList from '@/components/CommentList/CommentList'
import Button from '@/components/common/Button/Button'
import DeferredComponent from '@/components/common/DeferedComponent/DeferedComponent'
import Space from '@/components/common/Space/Space'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useTab from '@/components/common/Tab/hooks/useTab'
import { CATEGORIES_RENDER, MIN_TAB_NUMBER } from '@/constants'
import { useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import useSpaceComment from '@/hooks/useSpaceComment'
import { fetchGetComments } from '@/services/comment/comment'
import { useGetSpace } from '@/services/space/useSpace'
import { XMarkIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'

const LoginModal = dynamic(
  () => import('@/components/common/Modal/LoginModal'),
  { ssr: false },
)

export interface CommentFormValues {
  content: string
}

const SpaceCommentPage = ({ params }: { params: { spaceId: number } }) => {
  const { isLoggedIn } = useCurrentUser()
  const { data: space, isLoading: isSpaceLoading } = useGetSpace(params.spaceId)
  const { register, unregister, setValue, setFocus, handleSubmit } =
    useForm<CommentFormValues>({
      defaultValues: {
        content: '',
      },
    })
  const {
    comment,
    openedComments,
    commentListRef,
    handleOpen,
    handleEdit,
    handleReply,
    handleCancel,
    onSubmit,
    onSubmitError,
  } = useSpaceComment({
    spaceId: params.spaceId,
    setValue,
    setFocus,
  })
  const { currentTab, tabList } = useTab({ type: 'space', space })
  const { Modal, isOpen, modalOpen, modalClose } = useModal()

  return isSpaceLoading ? (
    <DeferredComponent>
      <Spinner />
    </DeferredComponent>
  ) : (
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
          isVisible={space.isVisible}
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
        <div ref={commentListRef} />
        <CommentList
          spaceId={params.spaceId}
          openedComments={openedComments}
          fetchFn={fetchGetComments}
          onOpen={handleOpen}
          onEdit={handleEdit}
          onReply={handleReply}
        />
      </section>
      <form
        className="fixed bottom-0 z-10 w-full bg-bgColor"
        onFocus={(e) => {
          if (!isLoggedIn) {
            modalOpen()
            e.target.blur()
          }
        }}
        onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        {comment.type === 'reply' && (
          <div className="flex items-center justify-between border-t border-slate3 px-4 py-2 text-xs font-medium text-gray6">
            <span>
              <b>@{comment.nickname}</b>
              님에게 답글 남기는 중
            </span>
            <Button onClick={handleCancel}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
        {comment.type === 'edit' && (
          <div className="flex items-center justify-between border-t border-slate3 px-4 py-2 text-xs font-medium text-gray6">
            <span>
              {comment.parentCommentUser ? (
                <>
                  <b>@{comment.parentCommentUser}</b>
                  님에게 남긴 답글 수정 중
                </>
              ) : (
                '댓글 수정 중'
              )}
            </span>
            <Button onClick={handleCancel}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
        <div className="border-t border-slate3 px-4 py-3">
          <Input
            {...register('content', {
              required: true,
              maxLength: {
                value: 1000,
                message: '댓글은 1000자 이하로 작성해야 합니다.',
              },
            })}
            inputButton={true}
            buttonText="작성"
            buttonType="submit"
            buttonColor="gray"
            placeholder="댓글을 입력해 주세요."
          />
        </div>
      </form>
      <LoginModal
        Modal={Modal}
        isOpen={isOpen}
        modalClose={modalClose}
      />
    </>
  )
}

export default SpaceCommentPage
