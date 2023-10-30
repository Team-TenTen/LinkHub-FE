'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  title: string
  children: React.ReactNode
  isClose?: boolean
  onClose?: VoidFunction
  onConfirm?: VoidFunction
}

const Modal = ({
  title,
  children,
  isClose,
  onClose,
  onConfirm,
}: ModalProps) => {
  const rootNode = document.getElementById('root')
  const [isModal, setIsModal] = useState()
  return (
    <>
      {rootNode &&
        createPortal(
          <div className="fixed left-0 right-0 top-0 mx-auto flex h-screen w-full max-w-[500px] flex-col justify-center bg-black/40 px-4">
            <div className="flex w-full flex-col gap-2 rounded-xl border border-gray-300 bg-white p-4 shadow-md">
              <div className="text-base font-semibold text-gray-900">
                {title}
              </div>
              {children}
              <div className="flex justify-end gap-2">
                {isClose && (
                  <button
                    className="flex items-center justify-center rounded-md border border-gray-500 bg-gray-400 px-2 py-1 text-sm font-bold text-white"
                    onClick={onClose}>
                    취소
                  </button>
                )}

                <button
                  className="flex items-center justify-center rounded-md border border-emerald-600 bg-emerald-500 px-2 py-1 text-sm font-bold text-white"
                  onClick={onConfirm}>
                  추가
                </button>
              </div>
            </div>
          </div>,
          rootNode,
        )}
    </>
  )
}

export default Modal
