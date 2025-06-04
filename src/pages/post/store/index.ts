import type IPost from "../../../interfaces/post";

import { createStore } from "zustand";


type PostStore = {
    postList: IPost[],
    post: IPost
    edit: {
        postId?: string
    }

    setPostList: (posts: IPost[]) => void
    addPost: (post: IPost) => void
    updatePost: (post: IPost) => void
    removePost: (id: string) => void

    resetPost: () => void
    setContent: (content: string) => void
    setTitle: (title: string) => void

    setPost: () => void
    setEdit: (postId?: string) => void
}

const initialPost: IPost = { _id: '', content: '', imgUrl: '', title: '' }

const postStore = createStore<PostStore>(set => ({
    postList: [],
    post: initialPost,
    edit: {
        postId: undefined
    },

    setPostList: (posts) => set(state => ({ ...state, postList: posts })),
    addPost: (post) => set(state => ({ ...state, postList: [post, ...state.postList] })),
    updatePost: (post: IPost) => set(state => {
        const index = state.postList.findIndex(i => i._id === post._id)
        const uptList = [...state.postList]
        uptList[index] = post
        return {
            ...state, postList: uptList
        }
    }),

    removePost: (id) => set(state => {
        const updatedList = state.postList.filter(i => i._id !== id)
        return {
            ...state, postList: updatedList
        }
    }),

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