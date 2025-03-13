export const MIN_TAB_NUMBER = 1

export const PROFILE_MSG = {
  FOLLOWING: '팔로잉',
  FOLLOWER: '팔로워',
  FOLLOW: '팔로우',
  PROFILE_EDIT: '프로필 편집',
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
export const INITIAL_PAGE_NUMBER = 0

export const LOGIN = {
  LOGIN_SERVICE: '로그인이 필요한 서비스입니다.',
  LOGIN_ASK: '로그인하시겠습니까?',
}

export const NOT_FOUND = {
  NOT_FOUND: '404 NOT FOUND',
  TEXT_1: '죄송합니다. 페이지를 찾을 수 없습니다.',
  TEXT_2: '존재하지 않는 주소를 입력하셨거나,',
  TEXT_3: '요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.',
}

export const QUERY_KEYS = {
  SPACES: 'spaces',
  TAGS: 'tags',
  LINKS: 'links',
  POPULAR_LINKS: 'popularLinks',
}
