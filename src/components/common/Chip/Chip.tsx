import { cls } from '@/utils'
import { COLORS } from './constants'

export type ChipColors =
  | 'emerald'
  | 'red'
  | 'yellow'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'gray'

export interface ChipProps {
  label: string
  color?: ChipColors
}

const Chip = ({ label, color = 'emerald' }: ChipProps) => {
  return (
    <div
      className={cls(
        'inline-flex rounded-xl px-2.5 py-1 text-center text-xs font-medium',
        COLORS[color],
      )}>
      {label}
    </div>
  )
}

export default Chip
