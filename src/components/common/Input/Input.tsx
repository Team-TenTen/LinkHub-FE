import { cls } from '@/utils'

export interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  inputButton?: boolean
  buttonText?: string
  buttonColor?: 'green' | 'gray'
  validation?: string
  disabled?: boolean
  multiLine?: boolean
  onButtonClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Input = ({
  label,
  type,
  placeholder,
  inputButton,
  buttonText = '추가',
  buttonColor = 'green',
  validation,
  disabled,
  multiLine,
  onButtonClick,
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col justify-center">
      {label && (
        <label className="text-gray9 py-2 text-sm font-semibold">{label}</label>
      )}
      {multiLine ? (
        <textarea
          className="text-gray9 placeholder-gray4 disabled:placeholder-gray3 border-slate5 disabled:border-gray3 rounded-md border bg-bgColor px-3 py-2.5 text-sm font-medium outline-none"
          placeholder={placeholder}
          disabled={disabled}
          {...rest}></textarea>
      ) : (
        <div className="relative flex flex-col">
          <input
            type={type}
            className={cls(
              'text-gray9 placeholder-gray4 disabled:placeholder-gray3 disabled:border-gray3 rounded-md border bg-bgColor px-3 py-2.5 text-sm font-medium outline-none',
              inputButton && buttonColor === 'green'
                ? 'border-emerald6 pr-20'
                : 'border-slate5',
            )}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
          {inputButton && (
            <button
              className={cls(
                'absolute right-0 top-0 flex rounded-r-md border px-4 py-2.5 text-sm font-semibold text-white',
                buttonColor === 'green'
                  ? 'bg-emerald5 border-emerald6'
                  : 'border-slate5 bg-slate4',
              )}
              onClick={onButtonClick}>
              {buttonText}
            </button>
          )}
        </div>
      )}
      {validation && (
        <span className="text-red6 py-2 text-xs font-normal">{validation}</span>
      )}
    </div>
  )
}

export default Input
