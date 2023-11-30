'use client'

import { useForm } from 'react-hook-form'
import { Input, Spinner } from '@/components'
import CommentList from '@/components/CommentList/CommentList'
import Button from '@/components/common/Button/Button'
import Space from '@/components/common/Space/Space'
import useGetSpace from '@/components/common/Space/hooks/useGetSpace'
import Tab from '@/components/common/Tab/Tab'
import TabItem from '@/components/common/Tab/TabItem'
import useTab from '@/components/common/Tab/hooks/useTab'
import { CATEGORIES_RENDER, MIN_TAB_NUMBER } from '@/constants'
import useSpaceComment from '@/hooks/useSpaceComment'
import { fetchGetComments } from '@/services/comment/comment'
import { XMarkIcon } from '@heroicons/react/20/solid'

export interface CommentFormValues {
  content: string
}

const SpaceCommentPage = ({ params }: { params: { spaceId: number } }) => {
  const { space, isSpaceLoading } = useGetSpace()
  const { register, setValue, setFocus, handleSubmit } =
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
  } = useSpaceComment({
    spaceId: params.spaceId,
    setValue,
    setFocus,
  })
  const { currentTab, tabList } = useTab({ type: 'space', space })

  return isSpaceLoading ? (
    <Spinner />
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
        className="fixed bottom-0 z-10 w-full max-w-[500px] bg-bgColor"
        onSubmit={handleSubmit(onSubmit)}>
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
            {...register('content', { required: true, maxLength: 1000 })}
            inputButton={true}
            buttonText="작성"
            buttonType="submit"
            buttonColor="gray"
            placeholder="댓글을 작성해 주세요"
          />
        </div>
      </form>
    </>
  )
}

export default SpaceCommentPage
