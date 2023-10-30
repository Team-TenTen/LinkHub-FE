import { cls } from '@/utils'

interface TabItemProps {
  active?: boolean
  text?: string
  onClick: (_e?: React.MouseEvent<HTMLButtonElement>) => void
}

const TabItem = ({ active, text, onClick }: TabItemProps) => {
  return (
    <div
      onClick={() => {
        onClick()
      }}
      className={cls(
        active ? 'border-emerald-500' : 'border-slate-300',
        `text-gray9 flex w-[100%] cursor-pointer items-center justify-center border-b py-4 font-['Pretendard'] text-sm font-bold transition ease-in-out`,
      )}>
      {text}
    </div>
  )
}

export default TabItem
