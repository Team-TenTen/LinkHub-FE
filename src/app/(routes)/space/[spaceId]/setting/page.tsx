'use client'

import { SpaceMemberList } from '@/components'
import { Spinner } from '@/components'
import SpaceForm from '@/components/Space/SpaceForm'
import Button from '@/components/common/Button/Button'
import DeferredComponent from '@/components/common/DeferedComponent/DeferedComponent'
import { notify } from '@/components/common/Toast/Toast'
import { useModal } from '@/hooks'
import { useDeleteSpace, useGetSpace } from '@/services/space/useSpace'
import { useRouter } from 'next/navigation'

const SpaceSettingPage = ({ params }: { params: { spaceId: number } }) => {
  const router = useRouter()
  const spaceId = params.spaceId
  const { data: space, isLoading: isSpaceLoading } = useGetSpace(spaceId)
  const { Modal, isOpen, modalOpen, modalClose } = useModal(false)
  const { mutate: deleteSpace } = useDeleteSpace()

  const handleConfirm = () => {
    deleteSpace({ spaceId })
    notify('info', '스페이스가 삭제되었습니다.')
    router.replace('/')
  }

  return isSpaceLoading ? (
    <DeferredComponent>
      <Spinner />
    </DeferredComponent>
  ) : (
    <div>
      {space && (
        <>
          <SpaceForm
            spaceType="Setting"
            space={space}
          />
          <div className="px-4">
            <div className="mb-10 border-b border-slate3">
              <SpaceMemberList
                spaceId={spaceId}
                members={space?.memberDetailInfos}
                edit={true}
              />
            </div>
            <div className="flex items-center justify-between pb-6">
              <div className="pb-4 pt-4 text-base font-bold text-gray9">
                스페이스 삭제
              </div>
              <Button
                className="button button-md button-gray"
                onClick={modalOpen}>
                스페이스 삭제
              </Button>
              {isOpen && (
                <Modal
                  title="스페이스 삭제"
                  isCancelButton={true}
                  isConfirmButton={true}
                  cancelText="취소"
                  confirmText="삭제"
                  onClose={modalClose}
                  onConfirm={handleConfirm}>
                  <div className="flex justify-center">삭제하시겠습니까?</div>
                </Modal>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SpaceSettingPage
