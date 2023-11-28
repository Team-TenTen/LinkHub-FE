'use client'

import { Input } from '@/components'
import { useModal } from '@/hooks'
import { fetchPatchRole } from '@/services/space/space'
import { UserDetailInfo } from '@/types'
import { PlusSmallIcon } from '@heroicons/react/24/solid'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import DropdownItem from '../Dropdown/DropdownItem'
import { SPACE_MEMBER } from './constants'

export interface SpaceMemberListProps {
  spaceId?: number
  members?: UserDetailInfo[]
  edit?: boolean
}

export interface ChangeRoleProps {
  targetMemberId: number
  role: string
}

const SpaceMemberList = ({
  spaceId,
  members,
  edit = false,
}: SpaceMemberListProps) => {
  const { Modal, isOpen, modalOpen, modalClose } = useModal(false)

  const handleConfirm = () => {
    // 멤버 추가 로직
    console.log('멤버가 추가 되었습니다.')
  }

  const handleChangeRole = async (data: ChangeRoleProps) => {
    try {
      spaceId && (await fetchPatchRole(spaceId, data))
      alert('권한을 수정했습니다.')
    } catch (e) {
      alert('권한 수정에 실패했습니다.')
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="py-4 text-base font-bold text-gray9">
          {SPACE_MEMBER}
        </div>
        {edit && (
          <Button
            className="button button-sm button-emerald"
            onClick={() => modalOpen()}>
            <PlusSmallIcon className="h-5 w-5" />
          </Button>
        )}
        {isOpen && (
          <Modal
            title="스페이스 멤버 추가"
            isConfirmButton={true}
            confirmText="추가"
            onClose={modalClose}
            onConfirm={handleConfirm}>
            <div className="flex items-end justify-between gap-3 pb-6">
              <div className="w-full">
                <Input
                  label="이메일"
                  placeholder="추가할 멤버"
                />
              </div>
              <div className="shrink-0">
                <Dropdown
                  size="large"
                  type="user_invite"
                  onChange={(e) => console.log(e?.currentTarget.value)}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
      {members?.map((member) => (
        <div
          key={member.memberId}
          className="flex items-center justify-between border-t border-slate3 p-2">
          <div className="flex items-center gap-2">
            {member.profilePath && (
              <Avatar
                src={member.profilePath}
                width={30}
                height={30}
                alt="프로필"
              />
            )}

            <div className="text-sm font-semibold">{member.nickname}</div>
          </div>
          {member.SpaceMemberRole === 'OWNER' ? (
            <DropdownItem
              label="관리자"
              border={true}
              disabled={true}
            />
          ) : (
            edit && (
              <Dropdown
                type="user_edit"
                size="small"
                placement="left"
                onChange={(e) => {
                  handleChangeRole({
                    targetMemberId: member.memberId,
                    role: e?.currentTarget.value,
                  })
                }}
              />
            )
          )}
        </div>
      ))}
    </div>
  )
}

export default SpaceMemberList
