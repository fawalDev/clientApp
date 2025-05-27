import modalStyle from '../../../components/modal/Modal.module.css'


import modalStore from "../store";

export function useModalAction(trusthyFnc: () => void, falsyFnc: () => void) {
    const hide = modalStore.getState().setHidden

    function trueFnc() {
        trusthyFnc()
        hide(modalStyle['hidden'])
    }

    function falseFnc() {
        falsyFnc()
        hide(modalStyle['hidden'])
    }

    return [trueFnc, falseFnc]
}