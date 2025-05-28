import { Await, useLoaderData } from "react-router"
import PostCard from "./postCard"
import type IPost from "../../../interfaces/post"
import type { postLoader } from "../Posts/loader"
import { Suspense } from "react"
import Fallback from "../../../components/fallback"


export default function PostList() {
    const { postList }: postLoader = useLoaderData()
    return (
        <div className="flex flex-col gap-3  mt-8">
            <Suspense fallback={<Fallback />}>
                <Await resolve={postList}>{(posts) =>
                    posts
                        ? posts.map((post: IPost) => (
                            <PostCard key={post._id} post={post} />
                        ))
                        : <div className="text-center">No posts available</div>
                }</Await>
            </Suspense>
        </div>
    )

}
