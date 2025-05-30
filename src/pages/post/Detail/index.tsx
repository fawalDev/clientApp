import { Await, useLoaderData } from "react-router"
import type { detailLoader } from "./loader"
import { Suspense } from "react"
import Fallback from "../../../components/fallback"
import type IPost from "../../../interfaces/post"
import ServerUrl from "../../../ultilities/serverUrl"

export default function Detail() {
    const { post }: detailLoader = useLoaderData()
    return (
        <Suspense fallback={<Fallback />}>
            <Await resolve={post}>
                {(post) => post
                    ? <Post post={post} />
                    : <div className="text-center">Post not found</div>
                }
            </Await>
        </Suspense>

    )
}



type props = { post: IPost }

function Post({ post }: props) {
    return (
        <div className="max-w-2xl mx-auto py-8 px-4 text-center">
            {/* Title */}
            <h1 className="text-2xl font-semibold text-purple-800">{post.title}</h1>

            {/* Date */}
            <p className="text-sm text-gray-700 mt-1">
                Created by on <span className="font-semibold">{new Date(post.createdAt || '').toDateString()}</span>
            </p>

            {/* Line Separator */}
            <hr className="border-t border-black my-4" />

            {/* Image */}
            {post.imgUrl && (
                <img
                    src={ServerUrl.base + '/' + post.imgUrl}
                    alt="Post"
                    className="mx-auto w-80 h-auto object-cover mb-4"
                />
            )}

            {/* Content */}
            <p className="text-purple-800 mt-2">{post.content}</p>
        </div>
    )
}