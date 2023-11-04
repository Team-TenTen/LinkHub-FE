'use client'

import { LinkIcon } from '@heroicons/react/20/solid'
import { BellIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '../Button/Button'

const Header = () => {
  const pathName = usePathname()
  const currentPage = pathName
    .split(/[^a-zA-Z]/)[1] // 라우터명
    .replace(/^[a-z]/, (char) => char.toUpperCase()) // 첫글자 대문자 치환

  return (
    <div className="flex items-center justify-between bg-bgColor">
      <div className="flex items-center justify-center">
        <Button>
          <Link href="/">
            <LinkIcon className="h-8 w-8" />
          </Link>
        </Button>
      </div>
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center">
        {currentPage || 'Home'}
      </div>
      <div className="flex items-center justify-center">
        <Button className="flex h-8 w-8 items-center justify-center">
          <Link href="/notification">
            <BellIcon className="h-6 w-6" />
          </Link>
        </Button>
        <Button className="flex h-8 w-8 items-center justify-center">
          <MagnifyingGlassCircleIcon className="h-6 w-6" />
        </Button>
        <Button className="flex h-8 w-8 items-center justify-center">
          <Bars3Icon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

export default Header
