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
      <div className="fixed bottom-10 left-1/2 right-0 z-40 flex h-0 w-full -translate-x-1/2 items-center justify-end pr-4 font-bold text-gray9">
        <button
          onClick={() =>
            isLoggedIn ? router.push(`/space/create`) : modalOpen()
          }
          className="h-10 w-10 cursor-pointer rounded-full border border-slate6 bg-bgColor text-slate6 shadow-lg">
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
