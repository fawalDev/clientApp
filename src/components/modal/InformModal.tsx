import type { IModalImplementProps } from "./ulties/IModalImplementProps"

import { useStore } from "zustand"

import informModalStyle from './InformModal.module.css'

import Modal from "./Modal"
import modalStore from "./store"
import Button from "../UI/Button"

import defFnc from "./ulties/defaultButtonAction"
import type { PropsWithChildren } from "react"




export default function InformModal({ truthyFnc = defFnc, falsyFnc = defFnc, oncloseFnc, children }: IModalImplementProps & PropsWithChildren) {

    const type = useStore(modalStore, state => state.type)
    if (type !== 'inform')
        return <></>

    return (
        <Modal onCloseFnc={oncloseFnc}>
            <div className={informModalStyle["container"]}>
                <div>{children}</div>
                <div className={informModalStyle["actions"]}>
                    <span><Button onClick={truthyFnc}>Ok</Button></span>
                    <span><Button isBgWhite onClick={falsyFnc}>Cancel</Button></span>
                </div>
            </div>

        </Modal>
    )
}