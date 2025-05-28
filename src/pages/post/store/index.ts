import type IPost from "../../../interfaces/post";

import { createStore } from "zustand";


type PostStore = {
    post: IPost
    setPost: (post: IPost) => void
    resetPost: () => void
}

const initialPost: IPost = { _id: '', content: '', imgUrl: '', title: '', }

const postStore = createStore<PostStore>(set => ({
    post: initialPost,

    setPost: (post: IPost) => set(() => ({
        post: post
    })),

    resetPost: () => set(() => ({
        post: initialPost
    }))

}))

export default postStore;