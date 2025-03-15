'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components'
import { useModal } from '@/hooks'
import { usePatchRole } from '@/services/space/useSpace'
import { usePostInviteSpace } from '@/services/space/useSpaces'
import { UserDetailInfo } from '@/types'
import { PlusSmallIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import DropdownItem from '../Dropdown/DropdownItem'
import { DROPDOWN_OPTIONS } from '../Dropdown/constants'
import { notify } from '../Toast/Toast'
import { SPACE_MEMBER } from './constants'

export interface SpaceMemberListProps {
  spaceId: number
  members?: UserDetailInfo[]
  edit?: boolean
}

export interface SpaceMemberFormValue {
  email: string
  role: string
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
  const router = useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpaceMemberFormValue>({
    defaultValues: {
      email: '',
      role: 'CAN_EDIT',
    },
  })
  const { Modal, isOpen, modalOpen, modalClose } = useModal(false)
  const { mutate: patchRole } = usePatchRole(spaceId)
  const { mutateAsync: inviteSpace } = usePostInviteSpace()
  const handleChangeRole = async (data: ChangeRoleProps) => {
    try {
      spaceId && patchRole({ ...data })
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
            type="form"
            title="스페이스 멤버 초대"
            isConfirmButton={true}
            confirmText="초대"
            onClose={() => {
              modalClose()
              reset()
            }}
            onConfirm={handleSubmit(async ({ email, role }) => {
              const res = await inviteSpace({ spaceId, email, role })
              if (res.errorCode === 'N001') {
                notify('error', '이미 초대 요청을 보낸 유저입니다.')
              } else if (res.errorCode === 'G004') {
                notify('error', '스페이스 관리자는 초대할 수 없습니다.')
              } else if (res.errorMessage) {
                notify('error', '유저를 찾을 수 없습니다.')
              } else {
                notify(
                  'success',
                  '초대 요청을 보냈습니다. 초대를 수락하면 스페이스 멤버에 추가됩니다.',
                )
                modalClose()
                reset()
              }
            })}>
            <div className="flex justify-between gap-3 pb-6">
              <div className="w-full">
                <Input
                  {...register('email', {
                    required: '필수 응답 항목입니다.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                      message: '이메일 형식이 아닙니다.',
                    },
                  })}
                  label="이메일"
                  placeholder="초대할 유저 이메일"
                  validation={errors.email?.message}
                />
              </div>
              <div className="shrink-0 pt-9">
                <Dropdown
                  size="large"
                  type="user_invite"
                  onChange={(e) => setValue('role', e.currentTarget.value)}
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
              <div className="relative h-[30px] w-[30px]">
                <Avatar
                  src={member.profilePath}
                  alt="프로필"
                />
              </div>
            )}
            <div
              onClick={() => router.push(`/user/${member.memberId}`)}
              className="cursor-pointer text-sm font-semibold">
              {member.nickname}
            </div>
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
                defaultIndex={Object.values(
                  DROPDOWN_OPTIONS['user_edit'],
                ).indexOf(member.SpaceMemberRole)}
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
