import Avatar from '../Avatar/Avatar'

export interface Member {
  id: number
  name: string
  profile: string
  auth: string
}

export interface SpaceMemberListProps {
  members: Member[]
}

const SpaceMemberList = ({ members }: SpaceMemberListProps) => {
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
          {member.auth === 'owner' && (
            <div className="flex items-center justify-center rounded-md border border-slate6 px-2.5 py-1 text-xs font-normal text-slate6">
              Owner
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SpaceMemberList
