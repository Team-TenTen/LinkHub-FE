export const DROPDOWN_OPTIONS = {
  space: { 최신순: 'recent', 즐겨찾기순: 'scrap' },
  link: { 최신순: 'recent', 좋아요순: 'favorite' },
  search: { 스페이스: 'space', 유저: 'user' },
  user_edit: { '편집 혀용': 'edit', '읽기 허용': 'view', 제거: 'remove' },
  user_invite: { '편집 허용': 'eidt', '읽기 허용': 'view' },
} as const

export const VERTICAL_PADDING = {
  large: 'py-2.5',
  medium: 'py-1.5',
  small: 'py-0.5',
} as const

export const PLACEMENTS = {
  left: 'left-0',
  right: 'right-0',
} as const
