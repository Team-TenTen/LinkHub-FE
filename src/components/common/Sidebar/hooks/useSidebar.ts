import { Dispatch, SetStateAction, useState } from 'react'
import { kakaoLogout } from '@/services/auth'
import Cookies from 'js-cookie'

type SpaceType = '내 스페이스' | '즐겨찾기'

export interface useSidebarProps {
  sidebarRef: React.RefObject<HTMLDivElement | null>
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
}

const useSidebar = ({ sidebarRef, setIsOpen, onClose }: useSidebarProps) => {
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

  const handleCloseClick = () => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, 400)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === sidebarRef.current) {
      setIsOpen(false)
      setTimeout(() => {
        onClose()
      }, 400)
    }
  }

  return {
    spaceType,
    handleSpaceType,
    handleCloseClick,
    handleOverlayClick,
    logout,
  }
}

export default useSidebar
