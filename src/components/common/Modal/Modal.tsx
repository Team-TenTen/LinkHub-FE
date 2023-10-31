'use client'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useModalLogic } from './hooks'

export interface ModalProps {
  title: string
  isCancelButton?: boolean
  isConfirmButton?: boolean
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

const Modal = ({
  title,
  isCancelButton,
  isConfirmButton,
  onClose,
  onConfirm,
  children,
}: ModalProps) => {
  const rootNode = document.getElementById('root')
  const modalRef = useRef<HTMLDivElement | null>(null)
  const { handleClickOverlay, handleClickConfirm } = useModalLogic({
    onClose,
    onConfirm,
    modalRef,
  })

  return (
    <>
      {rootNode &&
        createPortal(
          <div
            ref={modalRef}
            onClick={handleClickOverlay}
            className="fixed left-0 right-0 top-0 mx-auto flex h-screen w-full max-w-[500px] flex-col justify-center bg-black/40 px-4">
            <div className="flex w-full flex-col gap-2 rounded-xl border border-gray3 bg-bgColor p-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold text-gray9">
                  {title}
                </div>
                <button onClick={onClose}>
                  <XMarkIcon className="h-6 w-6 text-slate6" />
                </button>
              </div>
              {children}
              <div className="flex justify-end gap-2">
                {isCancelButton && (
                  <button
                    className="flex items-center justify-center rounded-md border border-slate5 bg-slate4 px-2.5 py-1.5 text-sm font-bold text-white"
                    onClick={onClose}>
                    취소
                  </button>
                )}
                {isConfirmButton && (
                  <button
                    className="flex items-center justify-center rounded-md border border-emerald6 bg-emerald5 px-2.5 py-1.5 text-sm font-bold text-white"
                    onClick={handleClickConfirm}>
                    추가
                  </button>
                )}
              </div>
            </div>
          </div>,
          rootNode,
        )}
    </>
  )
}

export default Modal
