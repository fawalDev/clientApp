import type { PostFormModalType } from "../types/PostFormModalType"

import { useStore } from "zustand"

import modalStore from "../../../components/modal/store"

import Button from "../../../components/UI/Button"
import Search from "../comps/search"
import PostList from "../comps/postList"
import ErrorModal from "../../../components/modal/ErrorModal"
import InformModal from "../../../components/modal/InformModal"
import PostFormModal from "../comps/postFormModal"

export default function PostPage() {

    const showModal = useStore(modalStore, (state) => state.show)

    const showPostModal = () => {
        showModal<PostFormModalType>('createPost')
    }

    return (
        <div className="flex flex-col items-center justify-center my-2">

            <Search />
            <Button onClick={showPostModal} >NEW POST</Button>
            <PostList />

            <PostFormModal />
            <ErrorModal />
            <InformModal />
        </div>
    )
}