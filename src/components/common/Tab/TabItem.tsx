import { cls } from '@/utils'
import Link from 'next/link'

interface TabItemProps {
  active?: boolean
  text?: string
  dest: string
  onClick: (_e?: React.MouseEvent<HTMLDivElement>) => void
}

const TabItem = ({ active, text, dest, onClick }: TabItemProps) => {
  return (
    <Link
      style={{ width: '100%' }}
      href={dest}>
      <div
        onClick={onClick}
        className={cls(
          active ? 'border-emerald5' : 'border-slate3',
          `flex w-[100%] cursor-pointer items-center justify-center border-b py-4 text-sm font-bold text-gray9 transition ease-in-out`,
        )}>
        {text}
      </div>
    </Link>
  )
}

export default TabItem
