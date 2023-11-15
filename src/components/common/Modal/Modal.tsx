'use client'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { cls } from '@/utils'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Button from '../Button/Button'
import { DEFAULT_CANCEL_TEXT, DEFAULT_CONFIRM_TEXT } from './constants'
import { useModalLogic } from './hooks'

export interface ModalProps {
  title?: string
  isCancelButton?: boolean
  isConfirmButton?: boolean
  cancelText?: string
  confirmText?: string
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit: () => void
  type?: 'default' | 'follow' | 'form'
  children?: React.ReactNode
}

const Modal = ({
  title,
  isCancelButton,
  isConfirmButton,
  cancelText = DEFAULT_CANCEL_TEXT,
  confirmText = DEFAULT_CONFIRM_TEXT,
  onClose,
  onConfirm,
  onSubmit,
  type = 'default',
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
            className="fixed left-0 right-0 top-0 z-50 mx-auto flex h-screen w-full max-w-[500px] flex-col justify-center bg-black/40 px-4">
            <div
              className={cls(
                'flex w-full flex-col gap-2 overflow-auto overscroll-contain rounded-xl border border-gray3 bg-bgColor p-4 shadow-md scrollbar-hide',
                type === 'follow' && 'h-4/5',
              )}>
              {type === 'form' ? (
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-semibold text-gray9">
                      {title}
                    </div>
                    <Button onClick={onClose}>
                      <XMarkIcon className="h-6 w-6 p-0.5 text-slate6" />
                    </Button>
                  </div>
                  {children}
                  <div className="flex justify-end gap-2">
                    {isCancelButton && (
                      <Button
                        className="button button-gray flex items-center justify-center px-2.5 py-1.5"
                        onClick={onClose}>
                        {cancelText}
                      </Button>
                    )}
                    {isConfirmButton && (
                      <Button
                        type="submit"
                        className="button button-emerald flex items-center justify-center px-2.5 py-1.5">
                        {confirmText}
                      </Button>
                    )}
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="text-base font-semibold text-gray9">
                      {title}
                    </div>
                    <Button onClick={onClose}>
                      <XMarkIcon className="h-6 w-6 p-0.5 text-slate6" />
                    </Button>
                  </div>
                  {children}
                  <div className="flex justify-end gap-2">
                    {isCancelButton && (
                      <Button
                        className="button button-gray flex items-center justify-center px-2.5 py-1.5"
                        onClick={onClose}>
                        {cancelText}
                      </Button>
                    )}
                    {isConfirmButton && (
                      <Button
                        type="submit"
                        className="button button-emerald flex items-center justify-center px-2.5 py-1.5">
                        {confirmText}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>,
          rootNode,
        )}
    </>
  )
}

export default Modal
