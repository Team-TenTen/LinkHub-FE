export interface ICreateSpace {
  data: {
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

export interface IUpdateSpace {
  spaceId?: number
  data: {
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

export interface ISpaceQuery {
  query: {
    spaceId?: number
  }
}

export interface ISpaceLink {
  query: {
    spaceId: number
    linkId: number
  }
}

export interface IUpdateLink {
  query: {
    spaceId?: number
    linkId?: number
    url: string
    title?: string
    tagName?: string
    color?: string
  }
}

export interface IChangeRole {
  query: {
    spaceId?: number
    targetMemberId: number
    role: string
  }
}

export interface ISearchSpace {
  query: {
    memberId?: number
    pageNumber?: number
    lastSpaceId?: number
    lastFavoriteCount?: number
    pageSize: number
    sort?: string
    keyWord?: string
    filter: string
  }
}

export interface IInviteSpace {
  query: {
    email: string
    spaceId: number
    role: string
  }
  response: {
    errorCode: string
    errorMessage: string
    requestURI: string
    time: string
  }
}

export interface IAcceptSpaceInvitation {
  query: {
    notificationId: number
  }
}
