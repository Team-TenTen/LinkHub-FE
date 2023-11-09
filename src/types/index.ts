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

export interface User {
  id: string
  profile: string
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
