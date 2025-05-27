import modalStore from "../store";

import modalStyle from '../Modal.module.css'


export default function defFnc() {
    modalStore.setState({ hidden: modalStyle['fading-hidden'] })
    setTimeout(() => {
        modalStore.setState({ hidden: modalStyle['hidden'] })
    }, 300);
}