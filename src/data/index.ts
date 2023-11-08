export const mock_LinkData = [
  {
    id: 1,
    title: '자바스크립트 클로저를 활용하는 방법 말줄임표 확인하는 제목입니다',
    tag: '개발',
    readUsers: [
      { id: 'user1', profile: '/duck.jpg' },
      { id: 'user2', profile: '/duck.jpg' },
      { id: 'user3', profile: '/duck.jpg' },
      { id: 'user4', profile: '/duck.jpg' },
      { id: 'user5', profile: '/duck.jpg' },
    ],
    likes: 6,
  },
  {
    id: 2,
    title: '링크 제목',
    tag: '오둥이',
    readUsers: [
      { id: 'user6', profile: '/duck.jpg' },
      { id: 'user7', profile: '/duck.jpg' },
      { id: 'user8', profile: '/duck.jpg' },
      { id: 'user9', profile: '/duck.jpg' },
      { id: 'user10', profile: '/duck.jpg' },
    ],
    likes: 6,
  },
  {
    id: 3,
    title: '링크 제목',
    tag: '데브코스',
    readUsers: [
      { id: 'user11', profile: '/duck.jpg' },
      { id: 'user12', profile: '/duck.jpg' },
      { id: 'user13', profile: '/duck.jpg' },
      { id: 'user14', profile: '/duck.jpg' },
      { id: 'user15', profile: '/duck.jpg' },
    ],
    likes: 6,
  },
  {
    id: 4,
    title: '링크 제목',
    tag: '개발',
    readUsers: [
      { id: 'user16', profile: '/duck.jpg' },
      { id: 'user17', profile: '/duck.jpg' },
      { id: 'user18', profile: '/duck.jpg' },
      { id: 'user19', profile: '/duck.jpg' },
      { id: 'user20', profile: '/duck.jpg' },
    ],
    likes: 6,
  },
  {
    id: 5,
    title: '링크 제목',
    tag: '개발',
    readUsers: [
      { id: 'user21', profile: '/duck.jpg' },
      { id: 'user22', profile: '/duck.jpg' },
      { id: 'user23', profile: '/duck.jpg' },
      { id: 'user24', profile: '/duck.jpg' },
      { id: 'user25', profile: '/duck.jpg' },
    ],
    likes: 0,
  },
  {
    id: 6,
    title:
      '자바스크립트 클로저를 활용하는 방법 말줄임표 확인하는 제목입니다 자바스크립트 클로저를 활용하는 방법 말줄임표 확인하는 제목입니다',
    tag: '',
    readUsers: [],
    likes: 6,
  },
]

export const mock_memberData = [
  {
    id: 1,
    profile: '/duck.jpg',
    name: '프롱이',
    auth: 'owner',
  },
  {
    id: 2,
    profile: '/duck.jpg',
    name: '백둥이',
    auth: 'view',
  },
  {
    id: 3,
    profile: '/duck.jpg',
    name: '풀택이',
    auth: 'view',
  },
]

export const mock_userData = {
  id: 3,
  name: '프롱이',
  profile: '/duck.jpg',
  mySpaces: [
    {
      name: 'My Space 1',
      id: 'my-space-1',
    },
    {
      name: 'My Space 2',
      id: 'my-space-2',
    },
    {
      name: 'My Space 3',
      id: 'my-space-3',
    },
    {
      name: 'My Space 4',
      id: 'my-space-4',
    },
    {
      name: 'My Space 5',
      id: 'my-space-5',
    },
  ],
  favoriteSpaces: [
    {
      name: 'Favorite Space 1',
      id: 'favorite-space-1',
    },
    {
      name: 'Favorite Space 2',
      id: 'favorite-space-2',
    },
    {
      name: 'Favorite Space 3',
      id: 'favorite-space-3',
    },
    {
      name: 'Favorite Space 4',
      id: 'favorite-space-4',
    },
    {
      name: 'Favorite Space 5',
      id: 'favorite-space-5',
    },
  ],
}

export const mock_spaceData = {
  userName: 'frong',
  spaceId: 123,
  spaceImage: '/TestImage.svg',
  spaceName: '강남역 맛집 리스트 모음 스페이스',
  description: '내 기준 강남역에서 맛있는 맛집 링크 모음집',
  category: '생활•노하우•쇼핑',
  favorite: 60,
  scrap: 40,
  comment: true,
}

export const mock_notificationData: {
  id: number
  type: 'comment' | 'follow' | 'space'
  userId: number
  userName: string
  spaceId?: number
  spaceName?: string
  isRead: boolean
  isAccept?: boolean
}[] = [
  {
    id: 1,
    type: 'follow',
    userId: 1,
    userName: '프롱이',
    isRead: false,
  },
  {
    id: 2,
    type: 'comment',
    userId: 1,
    userName: '프롱이',
    spaceId: 123,
    spaceName: '리액트 모음집',
    isRead: false,
    isAccept: false,
  },
  {
    id: 3,
    type: 'comment',
    userId: 1,
    userName: '백둥이',
    spaceId: 456,
    spaceName: '스프링',
    isRead: false,
    isAccept: false,
  },
  {
    id: 4,
    type: 'follow',
    userId: 1,
    userName: '백둥이',
    isRead: true,
  },
  {
    id: 5,
    type: 'comment',
    userId: 1,
    userName: '풀택이',
    spaceId: 789,
    spaceName: '풀스택 지식 모음집',
    isRead: true,
    isAccept: false,
  },
]

export const mock_notificationInviteData: {
  id: number
  type: 'comment' | 'follow' | 'space'
  userId: number
  userName: string
  spaceId?: number
  spaceName?: string
  isRead: boolean
  isAccept?: boolean
}[] = [
  {
    id: 3,
    type: 'space',
    userId: 1,
    userName: '프롱이',
    spaceId: 123,
    spaceName: '개발 모음',
    isRead: false,
    isAccept: false,
  },
  {
    id: 4,
    type: 'space',
    userId: 1,
    userName: '백둥이',
    spaceId: 123,
    spaceName: '스프링',
    isRead: false,
    isAccept: false,
  },
  {
    id: 5,
    type: 'space',
    userId: 1,
    userName: '풀택이',
    spaceId: 123,
    spaceName: '풀스택 지식 모음집',
    isRead: true,
    isAccept: true,
  },
]

export const mock_commentData = [
  {
    commentId: 1,
    user: { id: 1, name: '프롱이', profile: '/duck.jpg' },
    comment: '어쩌구',
    date: new Date(),
    auth: true,
    replyCount: 0,
  },
  {
    commentId: 2,
    user: { id: 2, name: '백둥이', profile: '/duck.jpg' },
    comment: '저쩌구',
    date: new Date(),
    auth: false,
    replyCount: 2,
  },
]

export const mock_replyData = [
  {
    commentId: 3,
    user: { id: 3, name: '풀택이', profile: '/duck.jpg' },
    comment: '쏼라쏼라',
    date: new Date(),
    auth: false,
  },
  {
    commentId: 4,
    user: { id: 1, name: '프롱이', profile: '/duck.jpg' },
    comment: '훌라훌라',
    date: new Date(),
    auth: true,
  },
]

export const mock_trendData = [
  {
    keyword: '어쩌구',
  },
  {
    keyword: '저쩌구',
  },
  {
    keyword: '쏼라쏼라',
  },
  {
    keyword: '훌라훌라',
  },
  {
    keyword: '나하항',
  },
]

export const mock_usersData = [
  {
    id: 1,
    name: 'dudwns',
    oneLiner: '안녕하세요',
    profile: '/duck.jpg',
    isFollow: true,
  },
  {
    id: 2,
    name: 'bomi',
    oneLiner: '안녕하세요',
    profile: '/duck.jpg',
    isFollow: false,
  },
  {
    id: 3,
    name: '프롱프롱프롱프롱프롱프롱프롱프롱프롱프롱프롱프롱프롱프롱프롱프롱프롱프롱이',
    oneLiner:
      '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
    profile: '/duck.jpg',
  },
]
