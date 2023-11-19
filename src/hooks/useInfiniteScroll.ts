import { useCallback, useEffect, useRef } from 'react'
import { InfiniteQueryObserverResult } from '@tanstack/react-query'

interface useInfiniteScrollProps {
  threshold?: number
  hasNextPage: boolean | undefined
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>
}

const useInfiniteScroll = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: useInfiniteScrollProps) => {
  const target = useRef<HTMLDivElement>(null)

  const callback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })
    },
    [fetchNextPage, hasNextPage],
  )

  useEffect(() => {
    if (!target.current) return

    const observer = new IntersectionObserver(callback, {
      threshold,
    })

    observer.observe(target.current)

    return () => observer.disconnect()
  }, [callback, threshold, target])

  return { target }
}

export default useInfiniteScroll
