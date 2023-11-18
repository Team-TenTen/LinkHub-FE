const DEFAULT = {
  '엔터테인먼트•예술': 'enter_art',
  '생활•노하우•쇼핑': 'life_knowhow_shopping',
  '취미•여가•여행': 'hobby_leisure_travel',
  '지식•이슈•커리어': 'knowledge_issue_career',
  기타: 'etc',
}

export const CATEGORIES = {
  default: DEFAULT,
  all: { 전체: 'all', ...DEFAULT },
  all_follow: { 전체: 'all', 팔로우: 'follow', ...DEFAULT },
}
