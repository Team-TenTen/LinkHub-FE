'use client'

import { useCallback, useState } from 'react'

const useViewLink = (): ['list' | 'card', VoidFunction, VoidFunction] => {
  const [state, setState] = useState<'list' | 'card'>('list')
  const handleChangeList = useCallback(() => setState('list'), [])
  const handleChangeCard = useCallback(() => setState('card'), [])

  return [state, handleChangeList, handleChangeCard]
}

export default useViewLink
