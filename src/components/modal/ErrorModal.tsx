import type { IModalImplementProps } from "./ulties/IModalImplementProps"
import type ErrorRes from "../../models/errorResponse"

import { useStore } from "zustand"

import informModalStyle from './InformModal.module.css'

import Button from "../UI/Button"
import Modal from "./Modal"
import modalStore from "./store"
import defFnc from "./ulties/defaultButtonAction"




export default function ErrorModal({ truthyFnc = defFnc, falsyFnc = defFnc, oncloseFnc }: IModalImplementProps) {
    const status = useStore(modalStore, state => state.resonse.status)
    const message = useStore(modalStore, state => state.resonse.message ?? (state.resonse as ErrorRes)?.name)
    const errors = useStore(modalStore, state => (state.resonse as ErrorRes)?.cause)


    let errorEntries: [string, string][] = []
    if (errors)
        errorEntries = Object.entries(errors)


    const type = useStore(modalStore, state => state.type)
    if (type !== 'error')
        return <></>

    return (
        <Modal onCloseFnc={oncloseFnc}>
            <div className={informModalStyle["container"]}>
                <span className={informModalStyle["status"]}>{status}</span>
                <span>{message}</span>
                <span className={informModalStyle['error-list']}>{
                    errorEntries.map(i =>
                        <span key={i[0]} >{i[1]}</span>
                    )
                }</span>
                <div className={informModalStyle["actions"]}>
                    <span><Button onClick={truthyFnc}>Ok</Button></span>
                    <span><Button isBgWhite onClick={falsyFnc}>Cancel</Button></span>
                </div>
            </div>
        </Modal>
    )
}