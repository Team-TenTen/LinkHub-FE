import { SearchController } from '@/components'
import { Metadata } from 'next'

type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { target, keyword } = searchParams

  return {
    title: `'${keyword ?? ''}' ${
      target === 'space' ? '스페이스' : target === 'user' ? '유저' : ''
    } 검색 결과`,
  }
}

const SearchPage = () => {
  return <SearchController />
}

export default SearchPage
