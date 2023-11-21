import { useState } from 'react'
import { kakaoLogout } from '@/services/auth'
import Cookies from 'js-cookie'

type SpaceType = '내 스페이스' | '즐겨찾기'

export interface useSidebarProps {
  sidebarRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
}

const useSidebar = ({ sidebarRef, onClose }: useSidebarProps) => {
  const [spaceType, setSpaceType] = useState<SpaceType>('내 스페이스')

  const logout = async () => {
    try {
      await kakaoLogout()
      Cookies.remove('Auth-token')
      location.reload()
      alert('로그아웃 되었습니다.')
      onClose()
    } catch (e) {
      alert('다시 시도해 주세요.')
    }
  }

  const handleSpaceType = (e?: React.MouseEvent<HTMLButtonElement>) => {
    setSpaceType(spaceType === '내 스페이스' ? '즐겨찾기' : '내 스페이스')
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === sidebarRef.current) {
      onClose()
    }
  }

  return {
    spaceType,
    handleSpaceType,
    handleOverlayClick,
    logout,
  }
}

export default useSidebar
