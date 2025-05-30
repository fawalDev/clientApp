import type { StoreApi } from 'zustand'

import { createStore } from 'zustand'

import modalStyle from '../Modal.module.css'
import type Res from '../../../models/response'
import type ErrorRes from '../../../models/errorResponse'


export type ModalType = 'inform' | 'error'

interface IModalStore {
    hidden: string
    // response indicate whether successRes or errorRes
    resonse: Res | ErrorRes,
    // type define the modal should be rendered <InformModal> or <ErrorModal>
    type: string,
    show: <T extends string = ModalType>(type?: T, responseData?: Res | ErrorRes) => void
    hide: () => void
    setResponse: (res: Res | ErrorRes) => void
    setType: <T extends string = ModalType>(type: T) => void
}
const modalStore: StoreApi<IModalStore> = createStore(set => ({
    hidden: modalStyle['hidden'],
    resonse: { message: '', name: '' },
    type: 'inform',

    show: (type, responseData) => set(state => ({
        ...state,
        hidden: '',
        type: type || state.type,
        resonse: responseData || state.resonse
    })),
    hide: () => {
        set(state => ({ ...state, hidden: modalStyle['fading-hidden'] }))
        setTimeout(() =>
            set(state => ({ ...state, hidden: modalStyle['hidden'] }))
            , 300
        )
    },
    setResponse: (res) => set((state) => ({
        ...state, resonse: res
    })),
    setType: (type: string) => set(state => ({
        ...state, type: type
    })),
}))

export default modalStore
