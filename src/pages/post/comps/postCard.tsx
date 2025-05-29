import { Link } from "react-router";
import type IPost from "../../../interfaces/post";

type props = {
    post: IPost
}

export default function PostCard({ post }: props) {
    const createdAt = new Date(post.createdAt).toDateString()
    return (
        <div className="border border-purple-700 rounded p-4 mb-4 w-full max-w-xl">
            <p className="text-sm text-gray-600 mb-1">
                Posted by on <span className="font-semibold">{createdAt}</span>
            </p>

            <h2 className="text-lg font-semibold text-purple-800">{post.title}</h2>

            <div className="flex justify-end space-x-4 mt-2">
                <Link to={`/detail/${post._id}`}
                    className="text-purple-800 font-medium hover:underline">
                    VIEW
                </Link>
                <Link to={`/edit/${post._id}`}
                    className="text-purple-800 font-medium hover:underline">
                    EDIT
                </Link>
                <Link to={`/delete/${post._id}`}
                    className="text-red-600 font-medium hover:underline">
                    DELETE
                </Link>
            </div>
        </div>
    );
}

