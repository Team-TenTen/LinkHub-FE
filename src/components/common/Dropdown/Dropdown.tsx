'use client'

import { useRef } from 'react'
import { cls } from '@/utils'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSearchParams } from 'next/navigation'
import DropdownItem from './DropdownItem'
import { DROPDOWN_OPTIONS, PLACEMENTS, VERTICAL_PADDING } from './constants'
import useDropdown from './hooks/useDropdown'

export interface DropdownProps {
  type: 'space' | 'link' | 'search' | 'user_edit' | 'user_invite' | 'tag'
  size?: 'large' | 'medium' | 'small'
  placement?: 'left' | 'right'
  defaultIndex?: number
  tags?: string[]
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Dropdown = ({
  type,
  size = 'medium',
  placement = 'left',
  defaultIndex,
  tags,
  onChange,
}: DropdownProps) => {
  const optionKeys =
    type !== 'tag'
      ? Object.keys(DROPDOWN_OPTIONS[type])
      : tags && ['전체', ...tags]
  const optionValues =
    type !== 'tag'
      ? Object.values(DROPDOWN_OPTIONS[type])
      : tags && ['전체', ...tags]
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { isOpen, setIsOpen, index, handleClick } = useDropdown({
    defaultIndex,
    el: dropdownRef,
    onChange,
  })

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={cls(
          'inline-flex w-full justify-center gap-x-1.5 rounded-md border border-slate6 pl-2.5 pr-1.5 text-sm font-medium text-slate6',
          VERTICAL_PADDING[size],
        )}
        onClick={() => setIsOpen(!isOpen)}>
        {type === 'tag' ? optionKeys?.[index] : optionKeys?.[index]}
        <ChevronDownIcon className="h-5 w-5" />
      </button>
      <div
        ref={dropdownRef}
        className={cls(
          'flex flex-col rounded-md border border-slate6 bg-bgColor p-2 shadow-lg',
          isOpen
            ? 'absolute right-0 z-10 mt-2 min-w-max origin-top-right'
            : 'hidden',
          PLACEMENTS[placement],
        )}>
        {optionKeys?.map((option, i) => (
          <DropdownItem
            label={option}
            value={optionValues?.[i]}
            active={index === i}
            danger={type === 'user_edit' && i === optionKeys.length - 1}
            onClick={(e) => handleClick(e, i)}
            key={option}
          />
        ))}
      </div>
    </div>
  )
}

export default Dropdown
