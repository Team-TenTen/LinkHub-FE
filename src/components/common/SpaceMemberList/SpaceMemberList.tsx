'use client'

import Avatar from '../Avatar/Avatar'
import Dropdown from '../Dropdown/Dropdown'
import DropdownItem from '../Dropdown/DropdownItem'

export interface Member {
  id: number
  name: string
  profile: string
  auth: string
}

export interface SpaceMemberListProps {
  members: Member[]
  edit: boolean
}

const SpaceMemberList = ({ members, edit }: SpaceMemberListProps) => {
  return (
    <div className="flex flex-col">
      <div className="py-4 text-base font-bold text-gray9">스페이스 멤버</div>
      {members.map((member) => (
        <div
          key={member.id}
          className="flex justify-between border-t border-slate3 p-2">
          <div className="flex items-center gap-2">
            <Avatar
              src={member.profile}
              width={30}
              height={30}
              alt="프로필"
            />
            <div className="text-sm font-semibold">name</div>
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
                size="medium"
                placement="left"
                onChange={(e) => {
                  console.log(e?.currentTarget.value)
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
