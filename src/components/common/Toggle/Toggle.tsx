import { ForwardedRef, forwardRef } from 'react'
import { cls } from '@/utils'
import useToggle from './hooks/useToggle'

export interface ToggleProps {
  name: string
  on?: boolean
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled?: boolean
}

const Toggle = forwardRef(
  (
    { name, on = false, onChange, isDisabled }: ToggleProps,
    ref?: ForwardedRef<HTMLInputElement>,
  ) => {
    const [checked, toggle] = useToggle(on)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      toggle()
      onChange?.(e)
    }

    return (
      <label className="inline-flex cursor-pointer select-none">
        <input
          ref={ref}
          type="checkbox"
          className="appearance-none"
          name={name}
          onChange={handleChange}
          disabled={isDisabled}
        />
        <div
          className={cls(
            "after:borde h-6 w-11 rounded-xl border p-px transition-colors after:relative after:block after:h-5 after:w-5 after:rounded-xl after:border after:bg-white after:shadow after:transition-all after:content-['']",
            checked
              ? 'border-emerald-600  bg-emerald-500 after:left-5 after:border-emerald-600'
              : 'border-slate-400 bg-slate-300 after:left-0 after:border-slate-400',
          )}
        />
      </label>
    )
  },
)

Toggle.displayName = 'Toggle'

export default Toggle
