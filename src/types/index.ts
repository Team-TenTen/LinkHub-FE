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
