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
        <label className="t-text-gray-900 py-2 text-sm font-semibold">
          {label}
        </label>
      )}
      {multiLine ? (
        <textarea
          className="text-t-gray-900 placeholder-t-gray-400 disabled:placeholder-t-gray-300 rounded-md border border-t-slate-600 bg-bgColor px-3 py-2.5 text-sm font-medium outline-none disabled:border-t-gray-300"
          placeholder={placeholder}
          disabled={disabled}
          {...rest}></textarea>
      ) : (
        <div className="relative flex flex-col">
          <input
            type={type}
            className={cls(
              'text-t-gray-900 placeholder-t-gray-400 disabled:placeholder-t-gray-300 rounded-md border border-t-slate-600 bg-bgColor px-3 py-2.5 text-sm font-medium outline-none disabled:border-t-gray-300',
              inputButton && 'border-t-emerald-600 pr-20',
            )}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
          {inputButton && (
            <button
              className="bg-t-emerald-500 absolute right-0 top-0 flex rounded-r-md border border-t-emerald-600  px-4 py-2.5 text-sm font-semibold text-white"
              onClick={onbuttonClick}>
              {buttonText}
            </button>
          )}
        </div>
      )}
      {validation && (
        <span className="text-t-red-600 py-2 text-xs font-normal">
          {validation}
        </span>
      )}
    </div>
  )
}

export default Input
