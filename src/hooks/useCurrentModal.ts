import { useCallback, useState } from 'react'

const useCurrentModal = (): [string, (current: string) => void] => {
  const [currentModal, setCurrentModal] = useState('')
  const handleCurrentModal = useCallback((current: string) => {
    setCurrentModal(current)
  }, [])

  return [currentModal, handleCurrentModal]
}

export default useCurrentModal
