import { FadeLoader } from 'react-spinners'

export interface SpinnerProps {
  color?: string
}

const Spinner = ({ color = '#50B584' }: SpinnerProps) => {
  return (
    <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
      <FadeLoader
        color={color}
        speedMultiplier={1.3}
      />
    </div>
  )
}

export default Spinner
