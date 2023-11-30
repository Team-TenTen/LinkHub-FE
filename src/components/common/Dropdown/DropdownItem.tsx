import { useEffect } from 'react'
import { cls } from '@/utils'
import { CheckIcon } from '@heroicons/react/20/solid'

export interface DropdownItemProps {
  label: string
  value?: string
  active?: boolean
  border?: boolean
  danger?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const DropdownItem = ({
  label,
  value,
  active = false,
  border = false,
  danger = false,
  disabled,
  onClick,
}: DropdownItemProps) => {
  return (
    <button
      type="button"
      value={value || label}
      className={cls(
        'inline-flex items-center px-2.5 py-1 text-sm',
        active ? 'font-medium' : 'font-normal',
        border && 'rounded-md border',
        danger ? 'border-red6 text-red6' : 'border-slate6 text-slate6',
      )}
      disabled={disabled}
      onClick={onClick}>
      {label}
      {active && <CheckIcon className="ml-1 w-4" />}
    </button>
  )
}

export default DropdownItem
