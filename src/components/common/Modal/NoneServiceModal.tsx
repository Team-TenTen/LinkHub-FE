import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import { SEACH_MODAL_INFO } from '../SearchModal/constants'
import Modal from './Modal'

export interface LoginModalProps {
  Modal: typeof Modal
  isOpen: boolean
  modalClose: VoidFunction
}

const NoneServiceModal = ({ Modal, isOpen, modalClose }: LoginModalProps) => {
  return (
    <>
      {isOpen && (
        <Modal
          title={'알림'}
          isConfirmButton
          onClose={modalClose}>
          <p className="flex flex-col items-center px-3 py-5 text-center text-sm font-medium text-gray9">
            <RocketLaunchIcon className="mb-2 h-5 w-5" />
            {SEACH_MODAL_INFO}
          </p>
        </Modal>
      )}
    </>
  )
}

export default NoneServiceModal
