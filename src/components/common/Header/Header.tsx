'use client'

import { LinkIcon } from '@heroicons/react/20/solid'
import { BellIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Button from '../Button/Button'
import SearchModal from '../SearchModal/SearchModal'
import Sidebar from '../Sidebar/Sidebar'
import useHeader from './hooks/useHeader'

const Header = () => {
  const {
    currentPage,
    isSidebarOpen,
    isSearchModalOpen,
    openSearchModal,
    closeSearchModal,
    setIsSidebarOpen,
  } = useHeader()

  return (
    <>
      <div className="fixed z-50 flex w-full max-w-[500px] items-center justify-between border-b border-slate-100 bg-bgColor px-4 py-2.5 dark:border-slate-800">
        <div className="flex items-center justify-center">
          <Button>
            <Link href="/">
              <LinkIcon className="h-8 w-8 text-slate9" />
            </Link>
          </Button>
        </div>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center font-bold text-gray9">
          {currentPage || 'Home'}
        </div>
        <div className="flex items-center justify-center gap-x-1">
          <Button className="flex h-8 w-8 items-center justify-center">
            <Link href="/notification/invite">
              <BellIcon className="h-6 w-6 text-slate9" />
            </Link>
          </Button>
          <Button
            className="flex h-8 w-8 items-center justify-center"
            onClick={openSearchModal}>
            <MagnifyingGlassCircleIcon className="h-6 w-6 text-slate9" />
          </Button>
          <Button
            className="flex h-8 w-8 items-center justify-center"
            onClick={() => setIsSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6 text-slate9" />
          </Button>
        </div>
      </div>
      {isSidebarOpen && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
    </>
  )
}

export default Header
