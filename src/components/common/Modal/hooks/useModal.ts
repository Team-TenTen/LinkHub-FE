import { useCallback, useEffect, useState } from 'react'
import { Modal } from '@/components'

const useModal = (initialState = false) => {
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
