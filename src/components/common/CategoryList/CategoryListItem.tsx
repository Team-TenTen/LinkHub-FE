'use client'

import React from 'react'
import { cls } from '@/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export interface CategoryListItemProps {
  label: string
  value?: string
  active: boolean
  disabled?: boolean
  as?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CategoryListItem = ({
  label,
  value,
  active = false,
  disabled,
  as,
  onClick,
}: CategoryListItemProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const target = searchParams.get('target')
  const keyword = searchParams.get('keyword')
  const sort = searchParams.get('sort')

  return as === 'link' ? (
    <Link
      href={{
        pathname,
        query: {
          ...(target && { target }),
          ...(keyword && { keyword }),
          ...(sort && { sort }),
          category: value,
        },
      }}
      className={cls(
        'inline-block rounded-3xl border px-4 py-2 text-sm font-medium',
        active
          ? 'border-slate-700 bg-slate5 text-white dark:border-slate-400'
          : 'border-slate3 text-slate6',
      )}>
      {label}
    </Link>
  ) : (
    <button
      type="button"
      value={value}
      className={cls(
        'rounded-3xl border px-4 py-2 text-sm font-medium',
        active
          ? 'border-slate-700 bg-slate5 text-white dark:border-slate-400'
          : 'border-slate3 text-slate6',
      )}
      disabled={disabled}
      onClick={onClick}>
      {label}
    </button>
  )
}

export default React.memo(CategoryListItem)
