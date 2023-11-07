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
  mySpaces: { name: string; id: string }[]
  favoriteSpaces: { name: string; id: string }[]
}
