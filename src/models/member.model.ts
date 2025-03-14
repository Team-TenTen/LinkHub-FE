export interface IFollowList {
  memberId?: number
  pageNumber: number
  pageSize: number
}

export interface IFollow {
  memberId: number
}

export interface IMemberSearch {
  keyword: string
  pageNumber: number
  pageSize: number
}
