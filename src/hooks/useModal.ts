import { useCallback, useState } from 'react'
import { Modal } from '@/components'

export interface UseModalReturnType {
  Modal: typeof Modal
  isOpen: boolean
  modalOpen: VoidFunction
  modalClose: VoidFunction
  currentModal: string
  handleOpenCurrentModal: (current: string) => void
}

const useModal = (initialState = false): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState(initialState)
  const [currentModal, setCurrentModal] = useState('')

  const modalOpen = useCallback(() => setIsOpen(true), [])
  const modalClose = useCallback(() => setIsOpen(false), [])

  const handleOpenCurrentModal = useCallback(
    (current: string) => {
      setCurrentModal(current)
      modalOpen()
    },
    [modalOpen],
  )

  return {
    Modal,
    isOpen,
    modalOpen,
    modalClose,
    currentModal,
    handleOpenCurrentModal,
  }
}

export default useModal
