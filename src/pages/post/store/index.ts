import type IPost from "../../../interfaces/post";

import { createStore } from "zustand";


type PostStore = {
    post: IPost
    edit: {
        postId?: string
    }
    resetPost: () => void
    setContent: (content: string) => void
    setTitle: (title: string) => void

    setPost: () => void
    setEdit: (postId?: string) => void
}

const initialPost: IPost = { _id: '', content: '', imgUrl: '', title: '', }

const postStore = createStore<PostStore>(set => ({
    post: initialPost,
    edit: {
        postId: undefined
    },

    setContent: (content: string) => set(state => ({ ...state, post: { ...state.post, content: content } })),
    setTitle: (title: string) => set(state => ({ ...state, post: { ...state.post, title: title } })),

    resetPost: () => set(() => ({
        post: initialPost
    })),

    // for create post
    setPost: () => set(state => ({
        ...state,
        edit: { postId: undefined },
    })),
    // for edit post
    setEdit: (postId?: string) => set(state => ({
        ...state,
        edit: { postId: postId }
    })),

}))

export default postStore;