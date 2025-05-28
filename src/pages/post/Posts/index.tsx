import { useStore } from "zustand"
import Button from "../../../components/UI/Button"
import PostFormModal from "../comps/postFormModal"
import Search from "../comps/search"
import modalStore from "../../../components/modal/store"
import PostList from "../comps/postList"

export default function PostPage() {

    const showModal = useStore(modalStore, (state) => state.show)


    return (
        <div className="flex flex-col items-center justify-center my-2">

            <Search />
            <Button onClick={showModal} >NEW POST</Button>
            <PostList />

            <PostFormModal />
        </div>
    )
}