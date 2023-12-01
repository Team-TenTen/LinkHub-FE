import { useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { PlusSmallIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import LoginModal from '../common/Modal/LoginModal'

const FloatingButton = () => {
  const router = useRouter()
  const { isLoggedIn } = useCurrentUser()
  const { Modal, isOpen, modalOpen, modalClose } = useModal(false)

  return (
    <>
      <div className="fixed bottom-4 left-[427px] right-0 z-50 mx-auto w-10">
        <button
          onClick={() =>
            isLoggedIn ? router.push(`/space/create`) : modalOpen()
          }
          className="z-50 h-10 w-10 cursor-pointer rounded-full border border-slate6 bg-bgColor text-slate6 shadow-lg">
          <PlusSmallIcon />
        </button>
      </div>
      <LoginModal
        Modal={Modal}
        isOpen={isOpen}
        modalClose={modalClose}
      />
    </>
  )
}

export default FloatingButton
