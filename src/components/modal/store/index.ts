import type { StoreApi } from 'zustand'
import type Res from '../../../models/Response'
import type ErrorRes from '../../../models/ErrorResponse'

import { createStore } from 'zustand'

import modalStyle from '../Modal.module.css'


type ModalType = 'inform' | 'error'
// type Hidden = 'fading-hidden' | 'hidden' | ''
interface IModalStore {
    hidden: string
    // response indicate whether successRes or errorRes
    resonse: Res | ErrorRes,
    // type define the modal should be rendered <InformModal> or <ErrorModal>
    type: ModalType,
    show: () => void
    setHidden: (hiddenClass: string) => void
    setResponse: (res: Res | ErrorRes) => void
    setType: (type: ModalType) => void
}
const modalStore: StoreApi<IModalStore> = createStore(set => ({
    hidden: modalStyle['hidden'],
    resonse: { message: '', name: '' },
    type: 'inform',

    show: () => set(state => ({ ...state, hidden: '' })),
    setHidden: (hiddenClass) => set(state => ({
        ...state, hidden: hiddenClass
    })),
    setResponse: (res) => set((state) => ({
        ...state, resonse: res
    })),
    setType: (type) => set(state => ({
        ...state, type: type
    })),
}))

export default modalStore