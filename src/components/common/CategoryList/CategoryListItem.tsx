import { cls } from '@/utils'

export interface CategoryListItemProps {
  label: string
  active: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CategoryListItem = ({
  label,
  active = false,
  disabled,
  onClick,
}: CategoryListItemProps) => {
  return (
    <button
      type="button"
      value={label}
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

export default CategoryListItem
