import { useStore } from "zustand";
import Modal from "../../../components/modal/Modal";
import PostForm from "./postForm";
import modalStore, { type ModalType } from "../../../components/modal/store";

type PostFormModalType = ModalType | 'postForm'

export default function PostFormModal() {
    const type = useStore(modalStore, state => state.type) as PostFormModalType
    const setType = useStore(modalStore, state => state.setType)
    setType<PostFormModalType>('postForm')

    if (type !== 'postForm')
        return <></>

    return (
        <Modal>
            <PostForm />
        </Modal>
    )
}
