import type { postLoader } from "../Posts/loader"
import type { PostEmitVal } from "../../../types/socket.IO"

import { useEffect, useRef, useState } from "react"
import { useLoaderData } from "react-router"

import PostCard from "./post"
import Fallback from "../../../components/fallback"
import openSocket from 'socket.io-client'
import ServerUrl from "../../../ultilities/serverUrl"
import { useStore } from "zustand"
import postStore from "../store"


export default function PostList() {
    const { postListDefer }: postLoader = useLoaderData()

    // postList will be set after the deferred data is resolved in effect side
    const postList = useStore(postStore, state => state.postList)
    const setPostList = useRef(useStore(postStore, state => state.setPostList))
    const addPost = useRef(useStore(postStore, state => state.addPost))
    const updatePost = useRef(useStore(postStore, state => state.updatePost))
    const removePost = useRef(useStore(postStore, state => state.removePost))

    const [deferCompl, setDeferCompl] = useState(false)


    // socket.io in effect side to prevent infinity re-rendering
    useEffect(() => {
        const socket = openSocket(ServerUrl.base)
        socket.on('posts', (data: PostEmitVal) => {
            if (data.action === 'create')
                addPost.current(data.post!)
            else if (data.action === 'update') {
                updatePost.current(data.post!)
            }
            else if (data.action === 'delete')
                removePost.current(data.postId!)
        })
    }, [])


    useEffect(() => {
        postListDefer.then((posts) => {
            if (posts && posts.length !== 0) {
                setPostList.current(posts)
            }
            setDeferCompl(true)
        }).catch((error) => {
            console.error("Error loading posts:", error);
        });
    }, [])

    return (
        <div className="flex flex-col gap-3  mt-8">
            {!deferCompl && <Fallback />}
            {deferCompl && postList.length > 0
                ? postList.map(post => (
                    <PostCard key={post._id} post={post} />
                ))
                : <div className="text-center">No posts available</div>
            }
        </div>
    )

}
