import { useCallback, useState } from 'react'

export interface UseCurrentModalProps {
  modalOpen: VoidFunction
}

const useCurrentModal = ({
  modalOpen,
}: UseCurrentModalProps): [string, (current: string) => void] => {
  const [currentModal, setCurrentModal] = useState('')

  const handleOpenCurrentModal = useCallback(
    (current: string) => {
      setCurrentModal(current)
      modalOpen()
    },
    [modalOpen],
  )

  return [currentModal, handleOpenCurrentModal]
}

export default useCurrentModal
