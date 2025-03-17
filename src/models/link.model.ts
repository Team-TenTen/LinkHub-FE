export interface ILikeLink {
  query: {
    linkId: number
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
