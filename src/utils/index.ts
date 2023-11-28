import { COLOR_LIST, PROFILE_MSG } from '@/constants'
import dayjs from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'

dayjs.extend(duration)

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

export const getElapsedTime = (time: string) => {
  const timeDiff: Duration = dayjs.duration(dayjs().diff(time))
  const yearDiff: number = parseInt(timeDiff.format('Y'))
  const monthDiff: number = parseInt(timeDiff.format('M'))
  const dateDiff: number = parseInt(timeDiff.format('D'))
  const hourDiff: number = parseInt(timeDiff.format('H'))
  const minuteDiff: number = parseInt(timeDiff.format('m'))

  if (yearDiff > 0) {
    return `${yearDiff}년 전`
  } else if (monthDiff > 0) {
    return `${monthDiff}달 전`
  } else if (dateDiff > 0) {
    return `${dateDiff}일 전`
  } else if (hourDiff > 0) {
    return `${hourDiff}시간 전`
  } else if (minuteDiff > 0) {
    return `${minuteDiff}분 전`
  } else return '방금 전'
}
