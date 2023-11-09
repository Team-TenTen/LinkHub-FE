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
  id: number
  name: string
  introduce: string
  profile: string
  category: string
  newsLetter: boolean
  mySpaces: {
    name: string
    id: string
  }[]
  favoriteSpaces: {
    name: string
    id: string
  }[]
}
