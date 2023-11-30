import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MinusCircleIcon } from '@heroicons/react/20/solid'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

type ToastType = 'info' | 'success' | 'warning' | 'error'
export const displayIcon = (type: ToastType) => {
  switch (type) {
    case 'info':
      return <InformationCircleIcon className="h-5 w-5" />
    case 'success':
      return <CheckBadgeIcon className="h-5 w-5" />
    case 'warning':
      return <MinusCircleIcon className="h-5 w-5" />
    case 'error':
      return <XMarkIcon className="h-5 w-5" />
    default:
      return <InformationCircleIcon className="h-5 w-5" />
  }
}

const Toast = ({ type, message }: { type: ToastType; message: string }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="toast-icon">{displayIcon(type)}</div>
      <div className="toast-message text-sm">{message}</div>
    </div>
  )
}

export const notify = (type: ToastType, message: string) => {
  toast(
    <Toast
      type={type}
      message={message}
    />,
  )
}
