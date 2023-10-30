'use client'

import { createPortal } from 'react-dom'

export interface ModalProps {
  title: string
  isClose?: boolean
  isConfirm?: boolean
  onClose?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

const Modal = ({
  title,
  isClose,
  isConfirm,
  onClose,
  onConfirm,
  children,
}: ModalProps) => {
  const rootNode = document.getElementById('root')

  return (
    <>
      {rootNode &&
        createPortal(
          <div className="fixed left-0 right-0 top-0 mx-auto flex h-screen w-full max-w-[500px] flex-col justify-center bg-black/40 px-4">
            <div className="border-gray3 flex w-full flex-col gap-2 rounded-xl border bg-bgColor p-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="text-gray9 text-base font-semibold">
                  {title}
                </div>
                <button onClick={onClose}>X</button>
              </div>
              {children}
              <div className="flex justify-end gap-2">
                {isClose && (
                  <button
                    className="border-slate5 bg-slate4 flex items-center justify-center rounded-md border px-2.5 py-1.5 text-sm font-bold text-white"
                    onClick={onClose}>
                    취소
                  </button>
                )}
                {isConfirm && (
                  <button
                    className="border-emerald6 bg-emerald5 flex items-center justify-center rounded-md border px-2.5 py-1.5 text-sm font-bold text-white"
                    onClick={onConfirm}>
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
