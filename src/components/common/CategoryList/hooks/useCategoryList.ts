import { useEffect, useState } from 'react'

export interface useCategoryListProps {
  defaultIndex?: number
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const useCategoryList = ({ defaultIndex, onChange }: useCategoryListProps) => {
  const [index, setIndex] = useState(defaultIndex ?? 0)

  useEffect(() => {
    setIndex(defaultIndex ?? 0)
  }, [defaultIndex])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    setIndex(i)
    onChange?.(e)
  }

  return { index, setIndex, handleClick }
}

export default useCategoryList
