export interface Space {
  userName: string
  spaceId: number
  spaceImage: string
  spaceName: string
  description: string
  category: string
  favorite: number
  scrap: number
  comment: boolean
}

export interface UserData {
  id: number
  name: string
  profile: string
  email: string
  category: string
  description: string
  follower: {
    userId: number
    userName: string
    profile: string
    description: string
    isFollow: boolean
  }[]
  following: {
    userId: number
    userName: string
    profile: string
    description: string
    isFollow: boolean
  }[]
  mySpaces: Space[]
  favoriteSpaces: Space[]
}

export interface User {
  id: string
  name: string
  description: string
  profile: string
  email: string
  category: string
  newsLetter: boolean
  follower: number
  following: number
  mySpaces: {
    name?: string
    id?: string
  }[]
  favoriteSpaces: {
    name?: string
    id?: string
  }[]
}

// 유저 프로필 res body
export interface UserProfileResBody {
  memberId: number
  nickname: string
  aboutMe: string
  newsEmail: string
  followingCount: number
  followerCount: number
  favoriteCategory: string
  profileImagePath: string
  isSubscribed: boolean
  isFollowing: boolean
}

// 회원가입 req body
export interface RegisterReqBody {
  socialId: string
  provider: string
  nickname: string
  aboutMe: string
  newsEmail: string
  favoriteCategory: string
  isSubscribed: boolean
}

// 스페이스 상세 res body
export interface SpaceDetailResBody {
  spaceId: number
  spaceName: string
  description: string
  category: string
  isVisible: boolean
  isComment: boolean
  isLinkSummarizable: boolean
  isReadMarkEnabled: boolean
  viewCount: number
  scrapCount: number
  favoriteCount: number
  spaceImagePath: string
  hasFavorite: boolean
  isOwner: boolean
  isCanEdit: boolean
  memberDetailInfos: UserDetailInfo[]
}

export interface UserDetailInfo {
  memberId: number
  nickname: string
  aboutMe: string
  profilePath: string
  SpaceMemberRole: string
}

// 검색 req body
export interface SearchSpaceReqBody {
  pageNumber: number
  pageSize: number
  sort: string
  keyWord?: string
  filter: string
}

// 내 스페이스 검색 req body
export interface SearchMySpaceReqBody {
  pageNumber: number
  pageSize: number
  keyWord: string
  filter: string
}

// 스페이스 생성/수정 req body
export interface SpaceReqBody {
  request: {
    spaceName: string
    description: string
    category: string
    isVisible: boolean
    isComment: boolean
    isLinkSummarizable: boolean
    isReadMarkEnabled: boolean
  }
  file?: File
}

// 링크 생성 req body
export interface CreateLinkReqBody {
  url: string
  title: string
  tag: string
  color: string
}

export interface SpaceResBody {
  spaceId: number
  spaceName: string
  description: string
  userName: string
  category: string
  viewCount: number
  scrapCount: number
  favoriteCount: number
  spaceImagePath: string
}

export interface CreateSpaceReqBody {
  spaceName: string
  description: string
  category: string
  isVisible: boolean
  isComment: boolean
  isLinkSummarizable: boolean
  isReadMarkEnabled: boolean
}
