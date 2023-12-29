import { useEffect } from 'react'
import {
  SubmitHandler,
  UseFormSetFocus,
  UseFormSetValue,
} from 'react-hook-form'
import { mock_trendData } from '@/data'
import { useRouter } from 'next/navigation'
import { notify } from '../../Toast/Toast'
import { SearchFormValues } from '../SearchModal'

export interface useSearchModalProps {
  searchModalRef: React.RefObject<HTMLDivElement>
  setValue: UseFormSetValue<SearchFormValues>
  setFocus: UseFormSetFocus<SearchFormValues>
  onClose: () => void
}

const useSearchModal = ({
  searchModalRef,
  setValue,
  setFocus,
  onClose,
}: useSearchModalProps) => {
  const router = useRouter()
  const trends = mock_trendData

  useEffect(() => {
    setFocus('search')
  }, [setFocus])

  const handleTargetChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue('target', e.currentTarget.value)
  }

  const handleKeywordClick = (e: React.MouseEvent<HTMLLIElement>) => {
    router.push(`/search?target=space&keyword=${e.currentTarget.innerText}`)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === searchModalRef.current) {
      onClose()
    }
  }

  const onSubmit: SubmitHandler<SearchFormValues> = (data) => {
    if (data.search.length === 1) {
      notify('info', '검색어는 최대 2글자여야 합니다.')
      return
    }

    router.push(`/search?target=${data.target}&keyword=${data.search}`)
  }

  return {
    trends,
    handleTargetChange,
    handleKeywordClick,
    handleOverlayClick,
    onSubmit,
  }
}

export default useSearchModal
