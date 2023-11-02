import { useState } from 'react'

export interface useCategoryListProps {
  onChange: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const useCategoryList = ({ onChange }: useCategoryListProps) => {
  const [index, setIndex] = useState(0)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    setIndex(i)
    onChange?.(e)
  }

  return { index, handleClick }
}

export default useCategoryList
