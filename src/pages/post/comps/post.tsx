import type { PostFormModalType } from "../types/PostFormModalType";
import type IPost from "../../../interfaces/post";

import { Link, useFetcher } from "react-router";
import { useStore } from "zustand";
import modalStore from "../../../components/modal/store";
import postStore from "../store";

type props = {
    post: IPost
}

export default function Post({ post }: props) {
    const fetcher = useFetcher()
    const createdAt = new Date(post.createdAt || '').toDateString()

    const showModal = useStore(modalStore, state => state.show)
    const setEdit = useStore(postStore, state => state.setEdit)
    const showEditModal = () => {
        setEdit(post._id)
        showModal<PostFormModalType>('editPost')
    }


    return (
        <div className="border border-purple-700 rounded p-4 mb-4 w-full max-w-xl">
            <p className="text-sm text-gray-600 mb-1">
                Posted by
                <span className="font-semibold"> {post.creator?.name || post.creator?.email} </span>
                on <span className="font-semibold">{createdAt}</span>
            </p>

            <h2 className="text-lg font-semibold text-purple-800">{post.title}</h2>

            <div className="flex justify-end space-x-4 mt-2">
                <Link to={`/post/${post._id}`}
                    className="text-purple-800 font-medium hover:underline">
                    VIEW
                </Link>
                <button onClick={showEditModal}
                    className="text-purple-800 font-medium hover:underline">
                    EDIT
                </button>
                <fetcher.Form method="delete" action={`/post/delete/${post._id}`}>
                    <button className="text-red-600 font-medium hover:underline">
                        DELETE
                    </button>
                </fetcher.Form>
            </div>
        </div >
    );
}

