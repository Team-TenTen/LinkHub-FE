'use client'

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

export interface useDropdownProps {
  el: React.RefObject<HTMLDivElement>
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const useDropdown = ({
  el,
  onChange,
}: useDropdownProps): {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  index: number
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, i: number) => void
} => {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (el.current !== null && !el.current?.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClose)

    return () => {
      document.removeEventListener('click', handleOutsideClose)
    }
  }, [isOpen, el])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
      setIndex(i)
      onChange?.(e)
      setIsOpen(false)
    },
    [onChange, setIsOpen],
  )

  return { isOpen, setIsOpen, index, handleClick }
}

export default useDropdown
