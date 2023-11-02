'use client'

import Avatar from '../Avatar/Avatar'
import Dropdown from '../Dropdown/Dropdown'
import DropdownItem from '../Dropdown/DropdownItem'
import { SPACE_MEMBER } from './constants'

export interface Member {
  id: number
  name: string
  profile: string
  auth: string
}

export interface SpaceMemberListProps {
  members: Member[]
  edit?: boolean
}

const SpaceMemberList = ({ members, edit = false }: SpaceMemberListProps) => {
  return (
    <div className="flex flex-col">
      <div className="py-4 text-base font-bold text-gray9">{SPACE_MEMBER}</div>
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between border-t border-slate3 p-2">
          <div className="flex items-center gap-2">
            <Avatar
              src={member.profile}
              width={30}
              height={30}
              alt="프로필"
            />
            <div className="text-sm font-semibold">{member.name}</div>
          </div>
          {member.auth === 'owner' ? (
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