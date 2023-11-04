import { useCallback, useState } from 'react'

const useCurrentModal = (): [string, (current: string) => void] => {
  const [currentModal, setCurrentModal] = useState('')
  const handleChangeCurrentModal = useCallback((current: string) => {
    setCurrentModal(current)
  }, [])

  return [currentModal, handleChangeCurrentModal]
}

export default useCurrentModal
