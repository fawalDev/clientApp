import { useStore } from "zustand";
import Modal from "../../../components/modal/Modal";
import PostForm from "./postForm";
import modalStore from "../../../components/modal/store";
import type { PostFormModalType } from "../types/PostFormModalType";



export default function PostFormModal() {
    const type = useStore(modalStore, state => state.type) as PostFormModalType

    if (type !== 'createPost' && type !== 'editPost')
        return <></>

    const isEdit = type === 'editPost' // true or false
    return (
        <Modal>
            <PostForm isEdit={isEdit} />
        </Modal>
    )

}
