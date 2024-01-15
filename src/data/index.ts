import { User } from '@/types'

export const mock_LinkData = [
  {
    id: 1,
    title: '자바스크립트 클로저를 활용하는 방법 말줄임표 확인하는 제목입니다',
    url: 'https://naver.com',
    tagName: '개발',
    tagColor: 'pink',
    readUsers: [
      { id: 'user1', profile: '/duck.jpg' },
      { id: 'user2', profile: '/duck.jpg' },
      { id: 'user3', profile: '/duck.jpg' },
      { id: 'user4', profile: '/duck.jpg' },
      { id: 'user5', profile: '/duck.jpg' },
    ],
    isLiked: false,
    likeCount: 7,
  },
  {
    id: 2,
    title: '배포!!!!!!!',
    url: 'https://github.com',
    tagName: '오둥이',
    tagColor: 'pink',
    readUsers: [
      { id: 'user6', profile: '/duck.jpg' },
      { id: 'user7', profile: '/duck.jpg' },
      { id: 'user8', profile: '/duck.jpg' },
      { id: 'user9', profile: '/duck.jpg' },
      { id: 'user10', profile: '/duck.jpg' },
    ],
    isLiked: true,
    likeCount: 5,
  },
  {
    id: 3,
    title: '링크 제목',
    url: 'https://programmers.co.kr',
    tagName: '데브코스',
    tagColor: 'pink',
    readUsers: [
      { id: 'user11', profile: '/duck.jpg' },
      { id: 'user12', profile: '/duck.jpg' },
      { id: 'user13', profile: '/duck.jpg' },
      { id: 'user14', profile: '/duck.jpg' },
      { id: 'user15', profile: '/duck.jpg' },
    ],
    isLiked: false,
    likeCount: 1,
  },
  {
    id: 4,
    title: '링크 제목',
    url: 'https://nextjs.org/docs/app/api-reference/components/link',
    tagName: '개발',
    tagColor: 'pink',
    readUsers: [
      { id: 'user16', profile: '/duck.jpg' },
      { id: 'user17', profile: '/duck.jpg' },
      { id: 'user18', profile: '/duck.jpg' },
      { id: 'user19', profile: '/duck.jpg' },
      { id: 'user20', profile: '/duck.jpg' },
    ],
    isLiked: true,
    likeCount: 2,
  },
  {
    id: 5,
    title: '링크 제목',
    url: 'https://tailwindcss.com/docs/installation',
    tagName: '개발',
    tagColor: 'pink',
    readUsers: [
      { id: 'user21', profile: '/duck.jpg' },
      { id: 'user22', profile: '/duck.jpg' },
      { id: 'user23', profile: '/duck.jpg' },
      { id: 'user24', profile: '/duck.jpg' },
      { id: 'user25', profile: '/duck.jpg' },
    ],
    isLiked: false,
    likeCount: 5,
  },
  {
    id: 6,
    title:
      '자바스크립트 클로저를 활용하는 방법 말줄임표 확인하는 제목입니다 자바스크립트 클로저를 활용하는 방법 말줄임표 확인하는 제목입니다',
    url: 'https://velog.io/',
    tagName: '개발',
    tagColor: 'pink',
    readUsers: [],
    isLiked: true,
    likeCount: 3,
  },
]

export const mock_memberData = [
  {
    memberId: 1,
    nickname: '오둥이',
    aboutMe: '안녕하세요',
    profilePath: '/duck.jpg',
    SpaceMemberRole: 'OWNER',
  },
  {
    memberId: 2,
    nickname: '백둥이',
    aboutMe: '안녕하세요',
    profilePath: '/duck.jpg',
    SpaceMemberRole: 'CANVIEW',
  },
  {
    memberId: 3,
    nickname: '풀택이',
    aboutMe: '안녕하세요',
    profilePath: '/duck.jpg',
    SpaceMemberRole: 'CANVIEW',
  },
]

export const mock_userData: User = {
  id: '3',
  name: '프롱이',
  profile: '/duck.jpg',
  category: 'ENTER_ART',
  newsLetter: false,
  email: 'abc@gmail.com',
  description: '쇼핑 정보를 모으고 있어요!',
  follower: 138,
  following: 182,
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

export const mock_userData2 = {
  id: 6,
  name: '프롱이',
  profile: '/duck.jpg',
  email: 'abc@gmail.com',
  category: '생활•노하우•쇼핑',
  description: '쇼핑 정보를 모으고 있어요!',
  follower: [
    {
      userId: 1,
      userName: '백둥이',
      profile: '/duck.jpg',
      description: '안녕 난 백둥이',
      isFollow: false,
    },
    {
      userId: 2,
      userName: '풀택이',
      profile: '/duck.jpg',
      description: '안녕 난 풀택이',
      isFollow: true,
    },
    {
      userId: 3,
      userName: '오둥이',
      profile: '/duck.jpg',
      description: '안녕 난 오둥이',
      isFollow: false,
    },
    {
      userId: 123,
      userName: '프롱이',
      profile: '/duck.jpg',
      description: '안녕 난 프롱이',
      isFollow: false,
    },
  ],

  following: [
    {
      userId: 1,
      userName: '육둥이',
      profile: '/duck.jpg',
      description: '안녕 난 육둥이',
      isFollow: false,
    },
    {
      userId: 2,
      userName: '칠둥이',
      profile: '/duck.jpg',
      description: '안녕 난 칠둥이',
      isFollow: true,
    },
    {
      userId: 3,
      userName: '팔둥이',
      profile: '/duck.jpg',
      description: '안녕 난 팔둥이',
      isFollow: false,
    },
    {
      userId: 123,
      userName: '프롱이',
      profile: '/duck.jpg',
      description: '안녕 난 프롱이',
      isFollow: false,
    },
  ],
  mySpaces: [
    {
      userName: '프롱이',
      spaceId: 1,
      spaceImage: '/TestImage.svg',
      spaceName: '강남역 맛집 리스트 모음 스페이스',
      description: '내 기준 강남역에서 맛있는 맛집 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 60,
      scrap: 40,
      comment: true,
    },
    {
      userName: '프롱이',
      spaceId: 2,
      spaceImage: '/TestImage.svg',
      spaceName: '홍대역 맛집 리스트 모음 스페이스',
      description: '내 기준 홍대역에서 맛있는 맛집 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 50,
      scrap: 40,
      comment: true,
    },
    {
      userName: '프롱이',
      spaceId: 3,
      spaceImage: '/TestImage.svg',
      spaceName: '구리역 맛집 리스트 모음 스페이스',
      description: '내 기준 구리역에서 맛있는 맛집 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 40,
      scrap: 40,
      comment: true,
    },
    {
      userName: '프롱이',
      spaceId: 4,
      spaceImage: '/TestImage.svg',
      spaceName: '신촌역 맛집 리스트 모음 스페이스',
      description: '내 기준 신촌역에서 맛있는 맛집 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 30,
      scrap: 40,
      comment: true,
    },
    {
      userName: '프롱이',
      spaceId: 5,
      spaceImage: '/TestImage.svg',
      spaceName: '수원역 맛집 리스트 모음 스페이스',
      description: '내 기준 수원역에서 맛있는 맛집 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 20,
      scrap: 40,
      comment: true,
    },
  ],
  favoriteSpaces: [
    {
      userName: '백둥이',
      spaceId: 1,
      spaceImage: '/TestImage.svg',
      spaceName: '스프링 지식 모음 스페이스',
      description: '스프링 관련 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 60,
      scrap: 40,
      comment: true,
    },
    {
      userName: '백둥이',
      spaceId: 2,
      spaceImage: '/TestImage.svg',
      spaceName: '코틀린 지식 모음 스페이스',
      description: '코틀린 관련 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 50,
      scrap: 40,
      comment: true,
    },
    {
      userName: '풀택이',
      spaceId: 3,
      spaceImage: '/TestImage.svg',
      spaceName: '클린 코드 모음 스페이스',
      description: '클린 코드 관련 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 40,
      scrap: 40,
      comment: true,
    },
    {
      userName: '백둥이',
      spaceId: 4,
      spaceImage: '/TestImage.svg',
      spaceName: '객체지향 모음 스페이스',
      description: '객체지향 관련 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 30,
      scrap: 40,
      comment: true,
    },
    {
      userName: '풀택이',
      spaceId: 5,
      spaceImage: '/TestImage.svg',
      spaceName: '알고리즘 모음 스페이스',
      description: '알고리즘 관련 링크 모음집',
      category: '생활•노하우•쇼핑',
      favorite: 20,
      scrap: 40,
      comment: true,
    },
  ],
}

export const mock_spaceData = {
  spaceId: 108,
  spaceName: '강남역 맛집 리스트 모음 스페이스',
  description: '내 기준 강남역에서 맛있는 맛집 링크 모음집',
  category: 'ENTER_ART',
  isVisible: true,
  isComment: true,
  isLinkSummarizable: true,
  isReadMarkEnabled: true,
  viewCount: 0,
  scrapCount: 0,
  favoriteCount: 0,
  spaceImagePath: '/TestImage.svg',
  isOwner: true,
  isCanEdit: true,
  hasFavorite: true,
  memberDetailInfos: [
    {
      memberId: 0,
      nickname: 'string',
      aboutMe: 'string',
      profilePath: 'string',
      SpaceMemberRole: 'OWNER',
    },
  ],
}

export const mock_notificationData: {
  id: number
  notificationType: 'COMMENT' | 'FOLLOW' | 'INVITATION'
  userId: number
  userName: string
  spaceId?: number
  spaceName?: string
  isRead: boolean
  isAccept?: boolean
}[] = [
  {
    id: 1,
    notificationType: 'FOLLOW',
    userId: 1,
    userName: '프롱이',
    isRead: false,
  },
  {
    id: 2,
    notificationType: 'COMMENT',
    userId: 1,
    userName: '프롱이',
    spaceId: 123,
    spaceName: '리액트 모음집',
    isRead: false,
    isAccept: false,
  },
  {
    id: 3,
    notificationType: 'COMMENT',
    userId: 1,
    userName: '백둥이',
    spaceId: 456,
    spaceName: '스프링',
    isRead: false,
    isAccept: false,
  },
  {
    id: 4,
    notificationType: 'FOLLOW',
    userId: 1,
    userName: '백둥이',
    isRead: true,
  },
  {
    id: 5,
    notificationType: 'COMMENT',
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

export const mock_spacesData = [
  {
    userName: 'frong',
    spaceId: 123,
    spaceImage: '/TestImage.svg',
    spaceName: '강남역 맛집 리스트 모음 스페이스',
    description: '내 기준 강남역에서 맛있는 맛집 링크 모음집',
    category: '생활•노하우•쇼핑',
    favorite: 60,
    scrap: 40,
    comment: true,
  },
  {
    userName: 'backdung',
    spaceId: 456,
    spaceImage: '/TestImage.svg',
    spaceName: '역삼역 맛집 리스트 모음 스페이스',
    description: '내 기준 역삼역에서 맛있는 맛집 링크 모음집',
    category: '생활•노하우•쇼핑',
    favorite: 0,
    scrap: 10,
    comment: true,
  },
  {
    userName: '프롱',
    spaceId: 0,
    spaceImage: '/TestImage.svg',
    spaceName: '삼성역 맛집 리스트 모음 스페이스',
    description: '내 기준 삼성역에서 맛있는 맛집 링크 모음집',
    category: '생활•노하우•쇼핑',
    favorite: 99,
    scrap: 24,
    comment: true,
  },
  {
    userName: '백둥',
    spaceId: 1,
    spaceImage: '/TestImage.svg',
    spaceName: '삼성역 맛집 리스트 모음 스페이스',
    description: '내 기준 삼성역에서 맛있는 맛집 링크 모음집',
    category: '생활•노하우•쇼핑',
    favorite: 99,
    scrap: 24,
    comment: true,
  },
  {
    userName: '머쓱',
    spaceId: 2,
    spaceImage: '/TestImage.svg',
    spaceName: '삼성역 맛집 리스트 모음 스페이스',
    description: '내 기준 삼성역에서 맛있는 맛집 링크 모음집',
    category: '생활•노하우•쇼핑',
    favorite: 99,
    scrap: 24,
    comment: true,
  },
  {
    userName: '타드',
    spaceId: 3,
    spaceImage: '/TestImage.svg',
    spaceName: '삼성역 맛집 리스트 모음 스페이스',
    description: '내 기준 삼성역에서 맛있는 맛집 링크 모음집',
    category: '생활•노하우•쇼핑',
    favorite: 99,
    scrap: 24,
    comment: true,
  },
]
