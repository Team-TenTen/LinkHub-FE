import { useCallback, useState } from 'react'
import { Modal } from '@/components'

export interface UseModalReturnType {
  Modal: typeof Modal
  isOpen: boolean
  modalOpen: VoidFunction
  modalClose: VoidFunction
}

const useModal = (initialState = false): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState(initialState)
  const modalOpen = useCallback(() => setIsOpen(true), [])
  const modalClose = useCallback(() => setIsOpen(false), [])

  return {
    Modal,
    isOpen,
    modalOpen,
    modalClose,
  }
}

export default useModal
