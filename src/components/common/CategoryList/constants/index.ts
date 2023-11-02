const DEFAULT = [
  '엔터테인먼트•예술',
  '생활•노하우•쇼핑',
  '취미•여가•여행',
  '지식•이슈•커리어',
  '기타',
]

export const CATEGORIES = {
  default: DEFAULT,
  all: ['전체', ...DEFAULT],
  all_follow: ['전체', '팔로우', ...DEFAULT],
}
