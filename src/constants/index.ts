export const MIN_TAB_NUMBER = 1

export const PROFILE_MSG = {
  FOLLOWING: '팔로잉',
  FOLLOWER: '팔로워',
  FOLLOW: '팔로우',
  PROFILE_EDIT: '프로필 수정',
  FAVORITE_CATEGORY: '관심 카테고리',
  DESCRIPTION: '한 줄 소개',
  LIST_DIVIDER: '|',
}

export const COLOR_LIST = [
  'emerald',
  'red',
  'yellow',
  'blue',
  'indigo',
  'purple',
  'pink',
  'gray',
]

export interface CategoriesRenderType {
  [key: string]: string
}

export const CATEGORIES_RENDER: CategoriesRenderType = {
  ENTER_ART: '엔터테인먼트•예술',
  LIFE_KNOWHOW_SHOPPING: '생활•노하우•쇼핑',
  HOBBY_LEISURE_TRAVEL: '취미•여가•여행',
  KNOWLEDGE_ISSUE_CAREER: '지식•이슈•커리어',
  ETC: '기타',
}

export const PAGE_SIZE = 10
export const PAGE_NUMBER = 0
