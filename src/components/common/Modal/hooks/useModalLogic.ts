import { useCallback, useEffect } from 'react'

export interface useModalLogicProps {
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  modalRef: React.RefObject<HTMLDivElement | null>
}

export interface UseModalLogicReturnType {
  handleClickOverlay: (e: React.MouseEvent<HTMLDivElement>) => void
  handleClickConfirm: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const useModalLogic = ({
  onClose,
  onConfirm,
  modalRef,
}: useModalLogicProps): UseModalLogicReturnType => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onConfirm])

  const handleClickOverlay = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === modalRef.current) {
        onClose()
      }
    },
    [modalRef, onClose],
  )

  const handleClickConfirm = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      onConfirm?.()
      onClose()
    },
    [onConfirm, onClose],
  )

  return { handleClickOverlay, handleClickConfirm }
}

export default useModalLogic
