import { useEffect, useState } from "react"
import { useLoaderData } from "react-router"

import PostCard from "./post"
import type IPost from "../../../interfaces/post"
import type { postLoader } from "../Posts/loader"
import Fallback from "../../../components/fallback"
import openSocket from 'socket.io-client'
import ServerUrl from "../../../ultilities/serverUrl"
import type IPostIO from "../../../interfaces/socket.io/post.io"


export default function PostList() {
    const { postListDefer }: postLoader = useLoaderData()

    // postList will be set after the deferred data is resolved in effect side
    const [postList, setPostList] = useState<IPost[]>([])
    const [deferCompl, setDeferCompl] = useState(false)


    // socket.io in effect side to prevent infinity re-rendering
    useEffect(() => {
        const socket = openSocket(ServerUrl.base)
        socket.on('posts', (data: IPostIO) => {
            if (data.action === 'create')
                setPostList(prev => [data.post, ...prev])

        })
    }, [setPostList])


    useEffect(() => {
        postListDefer.then((posts) => {
            if (posts && posts.length !== 0) {
                setPostList(posts)
            }
            setDeferCompl(true)
        }).catch((error) => {
            console.error("Error loading posts:", error);
        });
    }, [postListDefer])

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
