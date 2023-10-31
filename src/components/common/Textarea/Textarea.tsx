import { ForwardedRef, forwardRef } from 'react'

export interface TextareaProps {
  label?: string
  placeholder?: string
  validation?: string
  disabled?: boolean
}

const Textarea = forwardRef(
  (
    { label, placeholder, validation, disabled, ...rest }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <div className="flex flex-col justify-center">
        {label && (
          <label className="py-2 text-sm font-semibold text-gray9">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className="rounded-md border border-slate5 bg-bgColor px-3 py-2.5 text-sm font-medium text-gray9 placeholder-gray4 outline-none disabled:border-gray3 disabled:placeholder-gray3"
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        {validation && (
          <span className="py-2 text-xs font-normal text-red6">
            {validation}
          </span>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
