'use client'

import { useCallback, useState } from 'react'
import { LinkIcon } from '@heroicons/react/20/solid'
import { BellIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Button from '../Button/Button'
import SearchModal from '../SearchModal/SearchModal'
import Sidebar from '../Sidebar/Sidebar'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isSearchModalOpen = searchParams.get('search')
  const currentPage = pathname
    .split(/[^a-zA-Z]/)[1] // 라우터명
    .replace(/^[a-z]/, (char) => char.toUpperCase()) // 첫글자 대문자 치환

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams)
      params.delete(name)

      return params.toString()
    },
    [searchParams],
  )

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
            onClick={() =>
              router.replace(
                pathname + '?' + createQueryString('search', 'true'),
                { scroll: false },
              )
            }>
            <MagnifyingGlassCircleIcon className="h-6 w-6 text-slate9" />
          </Button>
          <Button
            className="flex h-8 w-8 items-center justify-center"
            onClick={() => setIsSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6 text-slate9" />
          </Button>
        </div>
      </div>
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
      {isSearchModalOpen && (
        <SearchModal
          onClose={() =>
            router.replace(pathname + '?' + deleteQueryString('search'), {
              scroll: false,
            })
          }
        />
      )}
    </>
  )
}

export default Header
