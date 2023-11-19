import { COLOR_LIST, PROFILE_MSG } from '@/constants'

export const cls = (...classnames: (string | boolean | undefined)[]) => {
  return classnames.join(' ')
}

export interface GetFollowButtonFnProps {
  isFollowing?: boolean
  memberId?: number
  myId?: number
}

export const getProfileButtonColor = ({
  isFollowing,
  memberId,
  myId,
}: GetFollowButtonFnProps): string => {
  if (memberId === myId) {
    return 'button-white'
  } else if (isFollowing) {
    return 'button-gray'
  } else {
    return 'button-emerald'
  }
}

export const getProfileButtonText = ({
  isFollowing,
  memberId,
  myId,
}: GetFollowButtonFnProps): string => {
  if (memberId === myId) {
    return PROFILE_MSG.PROFILE_EDIT
  } else if (isFollowing) {
    return PROFILE_MSG.FOLLOWING
  } else {
    return PROFILE_MSG.FOLLOW
  }
}

export const getRandomColor = () => {
  const colorIndex = Math.floor(Math.random() * COLOR_LIST.length)
  return COLOR_LIST[colorIndex]
}
