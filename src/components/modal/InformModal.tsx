import type { IModalImplementProps } from "./ulties/IModalImplementProps"
import type ErrorRes from "../../models/ErrorResponse"

import { useStore } from "zustand"

import informModalStyle from './InformModal.module.css'

import Button from "../layouts/Button"
import Modal from "./Modal"
import modalStore from "./store"
import defFnc from "./ulties/defaultButtonAction"




export default function InformModal({ truthyFnc = defFnc, falsyFnc = defFnc, oncloseFnc }: IModalImplementProps) {
    const message = useStore(modalStore,
        state => state.resonse.message || (state.resonse as ErrorRes).name
    )

    const type = useStore(modalStore, state => state.type)
    if (type !== 'inform')
        return <></>

    return (
        <Modal onCloseFnc={oncloseFnc}>
            <div className={informModalStyle["container"]}>
                <span>{message}</span>
                <div className={informModalStyle["actions"]}>
                    <span><Button onClick={truthyFnc}>Ok</Button></span>
                    <span><Button isBgWhite onClick={falsyFnc}>Cancel</Button></span>
                </div>
            </div>

        </Modal>
    )
}