import { useEffect } from 'react'

export interface useModalLogicProps {
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  modalRef: React.RefObject<HTMLDivElement | null>
}

const useModalLogic = ({
  onClose,
  onConfirm,
  modalRef,
}: useModalLogicProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        onConfirm?.()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onConfirm])

  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  const handleClickConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    onConfirm?.()
    onClose()
  }

  return { handleClickOverlay, handleClickConfirm }
}

export default useModalLogic
