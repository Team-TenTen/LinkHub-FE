import { useState } from 'react'

export interface useCategoryListProps {
  defaultIndex?: number
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const useCategoryList = ({ defaultIndex, onChange }: useCategoryListProps) => {
  const [index, setIndex] = useState(defaultIndex ?? 0)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    setIndex(i)
    onChange?.(e)
  }

  return { index, setIndex, handleClick }
}

export default useCategoryList
