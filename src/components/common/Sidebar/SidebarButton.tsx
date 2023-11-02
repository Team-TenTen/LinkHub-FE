'use client'

import { useCallback, useState } from 'react'
import Sidebar from './Sidebar'

const SidebarButton = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarClose = useCallback(() => setIsSidebarOpen(false), [])

  return (
    <>
      <button
        className="absolute right-2 top-2 rounded-md border p-2 text-xs"
        onClick={() => setIsSidebarOpen(true)}>
        사이드바
      </button>
      {isSidebarOpen && <Sidebar onClose={sidebarClose} />}
    </>
  )
}

export default SidebarButton
