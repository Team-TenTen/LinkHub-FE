import { cls } from '@/utils'

interface Input {
  label?: string
  type?: string
  placeholder?: string
  inputButton?: boolean
  buttonText?: string
  validation?: string
  disabled?: boolean
  multiLine?: boolean
  onbuttonClick?: VoidFunction
}

const Input = ({
  label,
  type,
  placeholder,
  inputButton,
  buttonText = '추가',
  validation,
  disabled,
  multiLine,
  onbuttonClick,
  ...rest
}: Input) => {
  return (
    <div className="flex flex-col justify-center">
      {label && (
        <label className="py-2 text-sm font-semibold leading-5 text-gray-900">
          {label}
        </label>
      )}
      {multiLine ? (
        <textarea
          className="rounded-md border border-slate-600 bg-bgColor px-3 py-2.5 text-sm font-medium leading-5 text-gray-900 placeholder-gray-400 outline-none disabled:border-gray-300 disabled:placeholder-gray-300"
          placeholder={placeholder}
          disabled={disabled}
          {...rest}></textarea>
      ) : (
        <div className="relative flex flex-col">
          <input
            type={type}
            className={cls(
              'rounded-md border border-slate-600 bg-bgColor px-3 py-2.5 text-sm font-medium leading-5 text-gray-900 placeholder-gray-400 outline-none disabled:border-gray-300 disabled:placeholder-gray-300',
              inputButton && 'border-emerald-600 pr-20',
            )}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
          {inputButton && (
            <button
              className="absolute right-0 top-0 flex rounded-r-md border border-emerald-600 bg-emerald-500 px-4 py-2.5 text-sm font-semibold leading-5 text-white"
              onClick={onbuttonClick}>
              {buttonText}
            </button>
          )}
        </div>
      )}
      {validation && (
        <span className="py-2 text-xs font-normal leading-4 text-red-600">
          {validation}
        </span>
      )}
    </div>
  )
}

export default Input
