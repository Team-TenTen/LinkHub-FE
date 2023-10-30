interface ButtonProps {
  children?: React.ReactNode
  rounded?: 'rounded-md' | 'rounded-xl'
  type?: 'button' | 'reset' | 'submit' | undefined
  className?: string
  style?: React.CSSProperties
  onClick?: (_e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
  children,
  rounded = 'rounded-md',
  type = 'button',
  className,
  style,
  onClick,
  ...rests
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{ ...style }}
      type={type}
      {...rests}>
      {children}
    </button>
  )
}

export default Button
