import { COLOR_LIST, PROFILE_MSG } from '@/constants'
import { UserData } from '@/types'

export const cls = (...classnames: (string | boolean | undefined)[]) => {
  return classnames.join(' ')
}

export interface GetFollowCheckedProps {
  userData: UserData
  myId: number
}

export const getFollowChecked = ({
  userData,
  myId,
}: GetFollowCheckedProps): boolean => {
  if (userData.follower.find((user) => user.userId === myId)) {
    return true
  } else {
    return false
  }
}

export const getProfileButtonChecked = ({
  userData,
  myId,
}: GetFollowCheckedProps): string => {
  if (userData?.id === myId) {
    return PROFILE_MSG.PROFILE_EDIT
  } else if (userData.follower.find((user) => user.userId === myId)) {
    return PROFILE_MSG.FOLLOWING
  } else {
    return PROFILE_MSG.FOLLOW
  }
}

export const getRandomColor = () => {
  const colorIndex = Math.floor(Math.random() * COLOR_LIST.length)
  return COLOR_LIST[colorIndex]
}
