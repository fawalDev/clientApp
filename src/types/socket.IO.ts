import type IPost from "../interfaces/post.ts"
import type IO from "./io.ts"

export type PostEmitVal = {
    action: 'create' | 'update' | 'delete',
    post?: IPost
    postId?: string
} & IO
