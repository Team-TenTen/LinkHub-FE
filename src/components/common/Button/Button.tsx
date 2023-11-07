interface ButtonProps {
  children?: React.ReactNode
  type?: 'button' | 'reset' | 'submit' | undefined
  className?: string
  style?: React.CSSProperties
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
  children,
  type = 'button',
  className,
  style,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{ ...style }}
      type={type}
      {...rest}>
      {children}
    </button>
  )
}

export default Button
