import { ForwardedRef, forwardRef } from 'react'
import { cls } from '@/utils'

export interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  inputButton?: boolean
  buttonText?: string
  buttonType?: 'button' | 'submit' | 'reset'
  buttonColor?: 'green' | 'gray'
  validation?: string
  disabled?: boolean
  onButtonClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef(
  (
    {
      label,
      type,
      placeholder,
      inputButton,
      buttonText = '추가',
      buttonType = 'button',
      buttonColor = 'green',
      validation,
      disabled,
      onButtonClick,
      onChange,
      ...rest
    }: InputProps,
    ref?: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="flex flex-col justify-center">
        {label && (
          <label className="py-2 text-sm font-semibold text-gray9">
            {label}
          </label>
        )}
        <div className="relative flex flex-col">
          <input
            ref={ref}
            type={type}
            className={cls(
              'rounded-md border bg-bgColor px-3 py-2.5 text-sm font-medium text-gray9 placeholder-gray4 outline-none disabled:border-gray3 disabled:text-gray3 disabled:placeholder-gray3',
              inputButton
                ? buttonColor === 'green'
                  ? 'border-emerald6 pr-20'
                  : 'border-slate5 pr-20'
                : 'border-slate5',
            )}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            {...rest}
          />
          {inputButton && (
            <button
              type={buttonType}
              className={cls(
                'absolute right-0 top-0 flex rounded-r-md border px-4 py-2.5 text-sm font-semibold text-white',
                buttonColor === 'green'
                  ? 'border-emerald6 bg-emerald5'
                  : 'border-slate5 bg-slate4',
              )}
              onClick={onButtonClick}>
              {buttonText}
            </button>
          )}
        </div>
        {validation && (
          <span className="py-2 text-xs font-normal text-red6">
            {validation}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
