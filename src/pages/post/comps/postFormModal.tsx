import { useStore } from "zustand";
import Modal from "../../../components/modal/Modal";
import PostForm from "./postForm";
import modalStore from "../../../components/modal/store";
import type { PostFormModalType } from "../types/PostFormModalType";



export default function PostFormModal() {
    const type = useStore(modalStore, state => state.type) as PostFormModalType

    if (type === 'createPost')
        return (
            <Modal>
                <PostForm />
            </Modal>
        )

    else if (type === 'editPost')
        return (
            <Modal>
                <PostForm isEdit />
            </Modal>
        )

    else
        return <></>
}
