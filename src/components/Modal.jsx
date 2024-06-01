import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({ onClose, isOpen, children }) => {
    return createPortal(
        <>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40 backdrop-blur h-screen w-screen" onClick={onClose} />
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <div className="relative m-auto min-h-[200px] max-w-[355px] bg-white p-4 rounded-lg pointer-events-auto">
                            <div className="flex justify-end">
                                <AiOutlineClose onClick={onClose} className="text-2xl self-end cursor-pointer hover:text-3xl hover:text-red-600" />
                            </div>
                            {children}
                        </div>
                    </div>
                </>
            )}
        </>,
        document.getElementById("modal-root")
    )
}

export default Modal
