import { cls } from '@/utils'
import Link from 'next/link'

interface TabItemProps {
  active?: boolean
  text?: string
  dest: string
}

const TabItem = ({ active, text, dest }: TabItemProps) => {
  return (
    <Link
      style={{ width: '100%' }}
      href={dest}>
      <div
        className={cls(
          active ? 'border-emerald5' : 'border-slate3',
          `flex w-[100%] cursor-pointer items-center justify-center border-b py-4 text-sm font-bold text-gray9`,
        )}>
        {text}
      </div>
    </Link>
  )
}

export default TabItem
