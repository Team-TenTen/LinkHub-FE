import { useCallback, useEffect, useState } from 'react'
import { useGetUnCheckedNotifications } from '@/services/notification/useNotification'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useHeader = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isSearchModalOpen = searchParams.get('search')
  const currentPage = pathname.split(/\//)[1]
  const { data } = useGetUnCheckedNotifications()

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

  const openSearchModal = () => {
    router.replace(pathname + '?' + createQueryString('search', 'true'), {
      scroll: false,
    })
  }

  const closeSearchModal = () => {
    router.replace(pathname + '?' + deleteQueryString('search'), {
      scroll: false,
    })
  }

  useEffect(() => {
    if (isSidebarOpen || isSearchModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isSidebarOpen, isSearchModalOpen])

  return {
    currentPage,
    notificationCount: data?.unCheckedNotificationCount,
    isSidebarOpen,
    isSearchModalOpen,
    openSearchModal,
    closeSearchModal,
    setIsSidebarOpen,
  }
}

export default useHeader
