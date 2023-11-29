'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components'
import { useModal } from '@/hooks'
import { fetchInviteSpace } from '@/services/space/invitation'
import { UserDetailInfo } from '@/types'
import { PlusSmallIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import DropdownItem from '../Dropdown/DropdownItem'
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
              await fetchInviteSpace({ spaceId, email, role })
              modalClose()
              reset()
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
              <Avatar
                src={member.profilePath}
                width={30}
                height={30}
                alt="프로필"
              />
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
                onChange={(e) => {
                  console.log(e?.currentTarget.value) // TODO: 멤버 리스트 권한 기능 구현할 때 여기에 함수 작성
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
