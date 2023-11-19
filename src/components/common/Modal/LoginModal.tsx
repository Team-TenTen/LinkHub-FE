import { LOGIN } from '@/constants'
import { useRouter } from 'next/navigation'
import Modal from './Modal'

export interface LoginModalProps {
  Modal: typeof Modal
  isOpen: boolean
  modalClose: VoidFunction
}

const LoginModal = ({ Modal, isOpen, modalClose }: LoginModalProps) => {
  const router = useRouter()

  return (
    <>
      {isOpen && (
        <Modal
          title={'알림'}
          isCancelButton
          isConfirmButton
          onClose={modalClose}
          onConfirm={() => router.push('/login')}>
          <div className="flex flex-col items-center text-base font-medium text-gray9">
            <div>{LOGIN.LOGIN_SERVICE}</div>
            <div>{LOGIN.LOGIN_ASK}</div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default LoginModal
