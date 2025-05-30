import type { PropsWithChildren } from "react";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import modalStore from "./store";
import { FaXmark } from 'react-icons/fa6'

// css
import style from './Modal.module.css'

import { useStore } from "zustand";


interface props extends PropsWithChildren {
    onCloseFnc?: () => void
}

function Modal({ children, onCloseFnc }: props) {
    const hidden = useStore(modalStore, state => state.hidden)
    const hide = useStore(modalStore, state => state.hide)

    const closeModal = useCallback(() => {
        onCloseFnc?.()
        hide()
    }, [hide, onCloseFnc])
    useEffect(() => {
        function handKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape')
                closeModal()
        }

        window.addEventListener('keydown', handKeyDown)

        // cleanup
        return () => window.removeEventListener('keydown', handKeyDown)
    }, [closeModal])

    return createPortal(
        <div className={hidden}>
            <div className={style['backdrop']} onClick={closeModal}></div>
            <div className={style['modal']}>
                <FaXmark onClick={closeModal} className={style['close-icon']} />
                {children}
            </div>
        </div>,
        document.getElementById('modal')!
    );
}

export default Modal;
